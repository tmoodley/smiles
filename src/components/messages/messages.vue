<template>
  <div>
    <div class="mesgs">
      <div class="msg_history" ref="container">
        <div class="outgoing_msg" v-for="(message,index) in messages" :key="index" >
          <div class="chat_img">
            <b-img v-if="message.organizations.logo != null" class="rounded-circle" :src="getImage(message.organizations.userId,message.organizations.logo)" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
            <b-img v-if="message.organizations.logo == null" class="rounded-circle" src="/img/silhouette_large.png" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
          </div>
          <div class="sent_msg">
            <p>
              {{message.body}}
            </p>
            <span class="time_date"> {{message.createdAt | moment('from', 'now')}} </span>
          </div>
        </div>
      </div>
      <div class="type_msg">
        <div class="input_msg_write">
          <input type="text" class="write_msg" v-model="message" v-on:keyup.enter="save" placeholder="Type a message">
          <button class="msg_send_btn" type="button" @click="save"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      message: '',
      actualOrgId: JSON.parse(localStorage.getItem('actualOrgId')),
      connection: '',
      join: true
    }
  },
  computed: {
    ...mapState({
      messages: state => state.messages.messages
    }),
    ...mapState({
      contacts: state => state.messages.contacts
    }),
    ...mapState({
      contact: state => state.messages.contact
    })
  },
  methods: {
    ...mapActions('messages', [
      'getMessages',
      'sendMessage',
      'getUnreadMessages',
      'addMessage'
    ]),
    save () {
      var organizationId = JSON.parse(localStorage.getItem('organizationId'))
      var actualOrgId = JSON.parse(localStorage.getItem('actualOrgId'))
      var contactId = this.contact.toOrganizationsId

      if (this.contact.toOrganizationsId == actualOrgId) {
        contactId = this.contact.organizationsId
      }
      var _message = {
        body: this.message,
        createdBy: organizationId,
        createdAt: new Date(),
        organizationsId: actualOrgId,
        toOrganizationsId: contactId,
        recipientId: contactId,
        isRecipientRead: false
      }

      this.connection.invoke('SendMessage', _message, this.join, this.contact.id)
        .catch(function (err) {
          return console.error(err.toString())
        })

      this.message = ''
    },
    getImage (orgId, logo) {
      return 'https://stuttie-files.s3.us-east-2.amazonaws.com/' + orgId + '/' + logo
    },
    scrollToEnd () {
      var content = this.$refs.container
      content.scrollTop = content.scrollHeight
    }
  },
  beforeDestroy: function () {
    this.connection.invoke('LeaveRoom', this.contact.id)
      .catch(function (err) {
        return console.error(err.toString())
      })
  },
  destroyed: function () {
    this.connection.stop()
  },
  updated () {
    // This will be called when the component updates
    this.scrollToEnd()
    this.getUnreadMessages(this.actualOrgId)
  },
  mounted () {
    let self = this
    // This will be called on load
    this.scrollToEnd()
    this.connection = new HubConnectionBuilder()
      .withUrl('https://stuttie.com/messagehub')
      .configureLogging(LogLevel.Information)
      .build()

    var messageHistoryId = this.contact.id
    this.connection.start().then(function () {
      self.isDisabled = false
      self.connection.invoke('JoinRoom', messageHistoryId)
        .catch(function (err) {
          return console.error(err.toString())
        })
    }).catch(function (err) {
      return console.error(err.toString())
    })

    this.connection.on('ReceiveMessage', function (message) {
      self.addMessage(message)
    })
  }
}
</script>

<style>

</style>
