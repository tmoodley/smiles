<template>
<div> 
    <b-container fluid class="mb-7">
      <div class="messaging">
          <div class="row">
            <div class="col-lg-12">
              <div class="ibox chat-view">
                <div class="ibox-content">
                  <div class="row">
                     <div class="col-lg-3 chat-data-left scroller">
                       <div class="chat-sidebar-channel scroller mt-4 pl-3">
                            <tab-nav :pills="true" :vertical="true" class="iq-chat-ui" id="chat-list-data">
                              <template v-for="(item,index) in participants"> 
                                <tab-nav-items :key="index"
                                              :id="`v-pills-${item.userId}`"
                                              href="#v-pills-home"
                                              :ariaControls="`v-pills-${item.userId}`"
                                              role="tab">
                                  <template v-slot:title> 
                                      <div class="d-flex align-items-center">  
                                        <div class="avatar mr-2"> 
                                            <b-img v-if="item.logoUrl != null" class="rounded-circle avatar-50" :src="item.logoUrl" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
                                            <b-img v-if="item.logoUrl == null" class="rounded-circle avatar-50" src="/img/silhouette_large.png" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
                                        </div>
                                        <div class="chat-sidebar-name">
                                          <h6 class="mb-0">{{ item.name }}</h6> 
                                        </div> 
                                      </div>
                                  </template>
                                </tab-nav-items>
                              </template>
                            </tab-nav> 
                      </div>
                    </div>
                    <div class="col-lg-9 chat-data p-0 chat-data-right">
                       <div class="chat-content scroller">
                          <template v-for="(item,index) in messages">
                            <div class="chat chat-left" :key="index">
                              <div class="chat-user">
                                <a class="avatar m-0">
                                  <b-img v-if="item.user.logo != null" class="avatar-35" :src="getImage(item.user.userId,item.user.logo)" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
                                  <b-img v-if="item.user.logo == null" class="avatar-35" src="/img/silhouette_large.png" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
                                </a>
                                <span class="chat-time mt-1">{{item.createdAt | moment('from', 'now')}}</span>
                              </div>
                              <div class="chat-detail">
                                <div class="chat-message">
                                      <a class="message-author" href="#" @click="select(item.user)" :to="'/portal/messages'"> {{item.user.name}} </a>
                                       <p>
                                        {{item.message}}
                                      </p>
                                </div>
                              </div>
                            </div> 
                          </template>
                       </div> 
                    </div>  
                  </div> 
                  <div class="row mt-3">
                    <div class="col-md-12">
                      <b-container>
                          <form class="d-flex align-items-center"  action="javascript:void(0);"> 
                            <input type="text" class="form-control mr-3" v-model="message" placeholder="Type your message">
                            <button type="submit" class="btn btn-primary d-flex align-items-center p-2" @click="sendMessage"><i class="far fa-paper-plane"></i><span class="d-none d-lg-block ml-1">Send</span></button>
                          </form> 
                      </b-container>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </b-container>
</div>
</template>
<script>
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      isDisabled: false,
      connection: '',
      message: '',
      join: true,
      user: JSON.parse(localStorage.getItem('actualOrgId'))
    }
  },
  components: {
  },
  computed: {
    ...mapState({
      company: state => state.company.company
    }),
    ...mapState({
      room: state => state.chat.room
    }),
    ...mapState({
      messages: state => state.chat.messages
    }),
    ...mapState({
      participants: state => state.chat.participants
    })
  },
  methods: {
    ...mapActions('chat', [
      'getMessages',
      'addParticipants',
      'addParticipant',
      'getRoom',
      'addMessage',
      'clearMessages',
      'selectRoom'
    ]),
    ...mapActions({
      setMessages: 'messages/getMessages'
    }),
    ...mapActions('messages', [
      'selectContact',
      'saveHistory'
    ]),
    ...mapActions('alerts', [
      'setHeading'
    ]),
    ...mapActions('company', [
      'getCompany',
      'updateCompany'
    ]),
    sendMessage () {
      this.connection.invoke('SendMessage', this.company, this.message, this.room.id, this.join)
        .catch(function (err) {
          return console.error(err.toString())
        })
    },
    getImage (orgId, logo) {
      return 'https://stuttie-files.s3.us-east-2.amazonaws.com/' + orgId + '/' + logo
    },
    select (org) {
      var self = this
      var actualOrgId = JSON.parse(localStorage.getItem('actualOrgId'))

      // save history
      var history = {
        organizationsId: actualOrgId,
        toOrganizationsId: org.organizationId,
        createdBy: org.organizationId,
        isDeleted: false
      }
      this.saveHistory(history)

      var _contact = {
        toOrganizationsId: org.organizationId,
        toOrganizations: org,
        organizationsId: actualOrgId,
        organizations: self.company
      }
      self.selectContact(_contact)
      var payload = {
        id: actualOrgId,
        fromId: org.organizationId
      }
      self.setMessages(payload)
      this.$router.push({ path: `/portal/messages` })
    }
  },
  beforeDestroy: function () {
    this.connection.invoke('LeaveRoom', this.company, this.room.id)
      .catch(function (err) {
        return console.error(err.toString())
      })
  },
  destroyed: function () {
    this.connection.stop()
    this.setHeading('')
    this.selectRoom('')
  },
  mounted: function () {
    let self = this;
    this.clearMessages()
    this.addParticipants([])
    this.addParticipants(this.room.participants)
    this.connection = new HubConnectionBuilder()
      .withUrl('https://stuttie.com/chathub')
      .configureLogging(LogLevel.Information)
      .build()

    this.connection.start().then(function () {
      self.isDisabled = false
      self.connection.invoke('JoinRoom', self.company, self.room.id)
        .catch(function (err) {
          return console.error(err.toString())
        })
      self.connection.on('ReceiveJoined', function (user, room, createdAt) {
        self.addParticipants(room.participants)
        self.selectRoom(room)
        self.join = false
      })
    }).catch(function (err) {
      return console.error(err.toString())
    })

    // Disable send button until connection is established
    this.isDisabled = true

    this.connection.on('ReceiveMessage', function (user, message, createdAt) {
      var payload = {
        user: user,
        message: message,
        createdAt: createdAt
      }
      self.addMessage(payload)
      self.message = ''
    })

    this.connection.on('ReceiveLeaved', function (user, room, createdAt) {
      self.addParticipants(room.participants)
      self.selectRoom(room)
    })
  }
}
</script>

<style>

  /* WRAPPERS */
  #wrapper {
    width: 100%;
    overflow-x: hidden;
  }

  .wrapper-content {
    padding: 20px 10px 40px;
  }

  #page-wrapper {
    padding: 0 15px;
    min-height: 568px;
    position: relative !important;
  }

  @media (min-width: 768px) {
    #page-wrapper {
      position: inherit;
      margin: 0 0 0 240px;
      min-height: 2002px;
    }
  }

  .message-input {
    height: 90px !important;
  }

  .chat-avatar {
    width: 45px;
    height: 45px;
    float: left;
    margin-right: 10px;
  }

  .chat-user-name {
    padding: 10px;
  }

  .chat-user {
    padding: 8px 10px;
    border-bottom: 1px solid #e7eaec;
  }

    .chat-user a {
      color: inherit;
    }

  .chat-view {
    z-index: 20012;
  }

  .chat-users,
  .chat-statistic {
    margin-left: -30px;
  }

  @media (max-width: 992px) {
    .chat-users,
    .chat-statistic {
      margin-left: 0;
    }
  }

  .chat-view .ibox-content {
    padding: 0;
  }

  .chat-message {
    padding: 10px 20px;
  }

  .message-avatar {
    height: 48px;
    width: 48px;
    border: 1px solid #e7eaec;
    border-radius: 4px;
    margin-top: 1px;
  }

  .chat-discussion .chat-message.left .message-avatar {
    float: left;
    margin-right: 10px;
  }

  .chat-discussion .chat-message.right .message-avatar {
    float: right;
    margin-left: 10px;
  }

  .message {
    background-color: #fff;
    border: 1px solid #e7eaec;
    text-align: left;
    display: block;
    padding: 10px 20px;
    position: relative;
    border-radius: 4px;
  }

  .chat-discussion .chat-message.left .message-date {
    float: right;
  }

  .chat-discussion .chat-message.right .message-date {
    float: left;
  }

  .chat-discussion .chat-message.left .message {
    text-align: left;
    margin-left: 55px;
  }

  .chat-discussion .chat-message.right .message {
    text-align: right;
    margin-right: 55px;
  }

  .message-date {
    font-size: 10px;
    color: #888888;
  }

  .message-content {
    display: block;
  }

  .chat-discussion {
    background: #eee;
    padding: 15px;
    height: 400px;
    overflow-y: auto;
  }

  .chat-users {
    overflow-y: auto;
    height: 400px;
  }

  .chat-message-form .form-group {
    margin-bottom: 0;
  }

  .ibox {
    clear: both;
    margin-bottom: 25px;
    margin-top: 0;
    padding: 0;
  }

    .ibox.collapsed .ibox-content {
      display: none;
    }

    .ibox.collapsed .fa.fa-chevron-up:before {
      content: "\f078";
    }

    .ibox.collapsed .fa.fa-chevron-down:before {
      content: "\f077";
    }

    .ibox:after,
    .ibox:before {
      display: table;
    }

  .ibox-title {
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    background-color: #ffffff;
    border-color: #e7eaec;
    border-image: none;
    border-style: solid solid none;
    border-width: 3px 0 0;
    color: inherit;
    margin-bottom: 0;
    padding: 14px 15px 7px;
    min-height: 48px;
  }

  .ibox-content {
    background-color: #ffffff;
    color: inherit;
    padding: 15px 20px 20px 20px;
    border-color: #e7eaec;
    border-image: none;
    border-style: solid solid none;
    border-width: 1px 0;
  }

  .ibox-footer {
    color: inherit;
    border-top: 1px solid #e7eaec;
    font-size: 90%;
    background: #ffffff;
    padding: 10px 15px;
  }

  .message-input {
    height: 90px !important;
  }

  .form-control, .single-line {
    background-color: #FFFFFF;
    background-image: none;
    border: 1px solid #e5e6e7;
    border-radius: 1px;
    color: inherit;
    display: block;
    padding: 6px 12px;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    width: 100%;
    font-size: 14px;
  }

  /*---------chat window---------------*/
  .container {
    max-width: 900px;
  }

  .inbox_people {
    background: #fff;
    float: left;
    overflow: hidden;
    width: 30%;
    border-right: 1px solid #ddd;
  }

  .inbox_msg {
    border: 1px solid #ddd;
    clear: both;
    overflow: hidden;
  }

  .top_spac {
    margin: 20px 0 0;
  }

  .recent_heading {
    float: left;
    width: 40%;
  }

  .srch_bar {
    display: inline-block;
    text-align: right;
    width: 60%;
  }

  .headind_srch {
    padding: 10px 29px 10px 20px;
    overflow: hidden;
    border-bottom: 1px solid #c4c4c4;
  }

  .recent_heading h4 {
    color: #0465ac;
    font-size: 16px;
    margin: auto;
    line-height: 29px;
  }

  .srch_bar input {
    outline: none;
    border: 1px solid #cdcdcd;
    border-width: 0 0 1px 0;
    width: 80%;
    padding: 2px 0 4px 6px;
    background: none;
  }

  .srch_bar .input-group-addon button {
    background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
    border: medium none;
    padding: 0;
    color: #707070;
    font-size: 18px;
  }

  .srch_bar .input-group-addon {
    margin: 0 0 0 -27px;
  }

  .chat_ib h5 {
    font-size: 15px;
    color: #464646;
    margin: 0 0 8px 0;
  }

    .chat_ib h5 span {
      font-size: 13px;
      float: right;
    }

  .chat_ib p {
    font-size: 12px;
    color: #989898;
    margin: auto;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chat_img {
    float: left;
    width: 11%;
  }

    .chat_img img {
      width: 100%
    }

  .chat_ib {
    float: left;
    padding: 0 0 0 15px;
    width: 88%;
  }

  .chat_people {
    overflow: hidden;
    clear: both;
  }

  .chat_list {
    border-bottom: 1px solid #ddd;
    margin: 0;
    padding: 18px 16px 10px;
  }

  .inbox_chat {
    height: 550px;
    overflow-y: scroll;
  }

  .active_chat {
    background: #e8f6ff;
  }

  .incoming_msg_img {
    display: inline-block;
    width: 6%;
  }

    .incoming_msg_img img {
      width: 100%;
    }

  .received_msg {
    display: inline-block;
    padding: 0 0 0 10px;
    vertical-align: top;
    width: 92%;
  }

    .received_msg p {
      background: #0465ac;
      border-radius: 15px 15px 0 12px;
      font-size: 14px;
      margin: 0;
      color: #fff;
      padding: 5px 10px 5px 12px;
      width: 100%;
    }

  .received_withd_msg p {
    background: #ebebeb none repeat scroll 0 0;
    border-radius: 0 15px 15px 15px;
    color: #646464;
    font-size: 14px;
    margin: 0;
    padding: 5px 10px 5px 12px;
    width: 100%;
  }

  .time_date {
    color: #747474;
    display: block;
    font-size: 12px;
    margin: 8px 0 0;
  }

  .received_withd_msg {
    width: 57%;
  }

  .mesgs {
    float: left;
    padding: 30px 15px 0 25px;
    width: 70%;
  }

  .sent_msg p {
    background: #0465ac;
    border-radius: 12px 15px 15px 0;
    font-size: 14px;
    margin: 0;
    color: #fff;
    padding: 5px 10px 5px 12px;
    width: 100%;
  }

  .outgoing_msg {
    overflow: hidden;
    margin: 26px 0 26px;
  }

  .sent_msg {
    float: right;
    width: 85%;
  }

  .input_msg_write input {
    background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
    border: medium none;
    color: #4c4c4c;
    font-size: 15px;
    min-height: 48px;
    width: 100%;
    outline: none;
  }

  .type_msg {
    border-top: 1px solid #c4c4c4;
    position: relative;
  }

  .msg_send_btn {
    background: #05728f none repeat scroll 0 0;
    border: none;
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    font-size: 15px;
    height: 33px;
    position: absolute;
    right: 0;
    top: 11px;
    width: 33px;
  }

  .messaging {
    padding: 0px 15px 0px 15px;
    background-color: white;
    box-shadow: rgba(207, 222, 230, 0.424) 0px 4px 10px;
  }
  .chat-discussion .chat-message.left .message {
    text-align: left;
    margin-left: 55px;
    background-color: white;
    box-shadow: rgb(207 222 230 / 42%) 0px 4px 10px;
  }

  .msg_history {
    height: 450px;
    overflow-y: auto;
  }
  span.message-content {
    color: var(--iq-body-text);
  }
</style>
