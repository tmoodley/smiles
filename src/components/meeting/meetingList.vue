<template>
 <div> 
    <b-container fluid class="mb-7">
   
      <b-row class="mt-3" v-if="storeTodayMeetings.length > 0 || storeUpcomingMeetings.length > 0" style=" margin-left: -18px;">
        <b-col cols="12" sm="12" md="12" lg="4" xl="3">
          <div>
            <b-form-group label="" label-for="ratio" label-cols-md="auto" class="mb-3">
              <div id="div1" style="z-index:3">
                <b-form-input v-model="selectedDate" disabled id="example-datepicker" type="text" class="mb-2 dateTextInput"> </b-form-input>
                <div class="calandarIcon">
                  <b-icon icon="calendar3" aria-hidden="true" @click="showDatePicker"></b-icon>
                </div>
                <div class="iconRight">
                  <b-icon icon="chevron-right" aria-hidden="true" @click="AddDate"></b-icon>
                </div>
                <div class="iconLeft">
                  <b-icon icon="chevron-left" aria-hidden="true" @click="subDate"></b-icon>
                </div>
              </div>
              <div id="div2" class="datePickerDiv">
                <datepicker @selected="dateSelected" v-model="selecteDatePicker" class="date" ref="datepick"></datepicker>
              </div>
            </b-form-group>
          </div>
        </b-col>
        <!--<b-col cols="12" sm="12" md="12" lg="4" xl="3" v-if="toShow">
          <b-form-group label="Created by" id="lbl-form-group" label-for="ratio" label-cols-md="auto" class="mb-3">
            <div id="div3" style="z-index:3" @focusout="focusOut">
              <b-form-select id="ratio" @change="onChange()" v-on:focus.native="focusIn" class="dateTextInput" v-model="showCreated" :options="createdSelect" ref="bselectclick">
              </b-form-select>
              <div v-if="dropdownArrow" class="iconDropdown">
                <b-icon icon="chevron-right" aria-hidden="true" scale="1.2" rotate="90"></b-icon>
              </div>
              <div v-if="!dropdownArrow" class="iconDropdown-up">
                <b-icon icon="chevron-left" aria-hidden="true" scale="1.2" rotate="90"></b-icon>
              </div>
            </div>
          </b-form-group>
        </b-col>-->
        <b-col cols="12" sm="12" md="12" lg="4" xl="3" V-if="false">
        </b-col>
        <b-col cols="12" sm="12" md="12" lg="4" xl="3" class="ml-md-auto">
          <div id="div3" style="float: right;">
            <b-button variant="primary" @click="meetingSideBarOPen()" block>Schedule Lesson</b-button>
          </div>
          <meetingCreateSidebar @meetingCofrimation="showMeeingConfirmation($event)" @closeSideBar="closeSidebar()" ref="meetingSideBar" :date="selecteDatePicker" :partnerStatus="showCreated" />
        </b-col>
      </b-row> 
    <noMeetings v-if="dateChanges" />
    <todayMeetings v-if="dateChanges" :selectedPartner="selectedPartner" @meetingWasDelete="deleteMeeting($event)" @meetingCofrimation="resendMeetingInvites($event)" @createMeetingEmit="createMeetingFromChild()" />
    <upComingMeeting v-if="dateChanges" :selectedPartner="selectedPartner" @meetingWasDelete="deleteMeeting($event)" @meetingCofrimation="resendMeetingInvites($event)" />
    <meetingsByDate :date="selecteDatePicker" :selectedPartner="selectedPartner" @meetingWasDelete="deleteMeeting($event)" :meetingStatus="ShowMeeting" :partnerStatus="showCreated" v-if="!dateChanges" @meetingCofrimation="resendMeetingInvites($event)" />
    <students></students>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalList" hidden ref="confirmMeetingAddlist">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div data-backdrop="static" data-keyboard="false" class="modal fade" id="exampleModalList" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="width:84% !important;margin-left:auto;margin-right:auto">
          <div class="modal-body" style="padding: 2rem; padding-bottom: 4rem;">
            <meetingConfirmation ref="meetingConfirmation" />
          </div>
          <div class="modal-footer" hidden>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#deleteModal" hidden ref="deleteMeeting">
      Launch Delete modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <img src="/uploads/localhost/worning.svg" style="width:25px;height:25px" class="img-fluid" alt="Responsive image">
            <p class="pl-2" style="color:#01151C; font-size:20px; font-weight:bold" id="exampleModalLabel">Cancel Meeting</p>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <b-row>
              <b-col cols="11">
                <p style="color:#01151C; font-size:14px; padding: 0px; margin:0px;">Are you sure you want to cancel meeting with <span style="font-weight:bold"> {{deleteMeting.partnerName}}</span>?</p>
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col cols="4">
                <b-button data-dismiss="modal" variant="#546064" style="width:100%; border:1px solid #546064">
                  Go back
                </b-button>
              </b-col>
              <b-col cols="4">
                <b-button style="width:100%; background:#FF5555" href="#" @click="confirmDelete()">
                  Delete meeting
                </b-button>
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col>
                <p style="color:#546064; font-size:12px">If you added this meeting to Google Calendar, you must delete it there also.</p>
              </b-col>
            </b-row>
          </div>
          <div class="modal-footer" hidden>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="deleteMeetingClose">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </b-container>
  </div>
</template>
<script>
import noMeetings from './meeting-sub-components/noMeetings.vue'
import todayMeetings from './meeting-sub-components/todayMeeting.vue'
import upComingMeeting from './meeting-sub-components/upcomingMeeting.vue'
import meetingsByDate from './meeting-sub-components/previousMeeting.vue'
import meetingCreateSidebar from './meeting-sub-components/meetingCreateSidebar.vue'
import meetingConfirmation from '../models/meetingConfirmation.vue'
import { mapState, mapActions } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import students from '../student/list.vue'
import { BIcon, BIconCalendar3, BIconChevronLeft, BIconChevronRight } from 'bootstrap-vue'
import axios from 'axios'
var moment = require('moment')
export default {
  components: {
    noMeetings,
    todayMeetings,
    upComingMeeting,
    meetingsByDate,
    Datepicker,
    BIcon,
    BIconCalendar3,
    BIconChevronLeft,
    BIconChevronRight,
    meetingCreateSidebar,
    meetingConfirmation,
    students
  },
  data () {
    return {
      gapi: null,
      toShow: true,
      deleteMeting: '',
      selectedDate: moment().format('MMMM DD'),
      selecteDatePicker: new Date(),
      ShowMeeting: 1,
      meetingSelect: [
        { text: 'Active meetings', value: 1 },
        { text: 'Deleted', value: 2 }
      ],
      showCreated: 1,
      createdSelect: [{ value: 1, text: 'Anyone' }],
      selectedPartner: 'Everyone',
      dropdownArrow: true,
      dropdownArrowShow: true
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    },
    meetingSideBarOPen () {
      // this.$refs.bselectclick.press();
      this.$refs.meetingSideBar.setMeetingTimes()
      this.$refs.meetingSideBar.onReset()
      this.$refs.meetingSideBar.openMeetingCreateSideBar()
    },
    createMeetingFromChild () {
      this.meetingSideBarOPen()
      // this.$refs.meetingSideBar.openMeetingCreateSideBar();
    },
    closeSidebar () {
      this.meetingSideBarOPen()
      this.$refs.meetingSideBar.openMeetingCreateSideBar()
    },
    ...mapActions('partner', [
      'getPartners'
    ]),
    ...mapActions('meeting', [
      'getTodayMeeting'
    ]),
    ...mapActions('meeting', [
      'getUpcomingMeeting'
    ]),
    ...mapActions('meeting', [
      'getMeetingsByDate'
    ]),
    showDatePicker () {
      this.$refs.datepick.showCalendar()
    },
    dateSelected (date) {
      this.selectedDate = moment(date).format('MMMM DD')
    },
    AddDate () {
      this.selecteDatePicker = moment(this.selecteDatePicker).add(1, 'days').toDate()
      this.selectedDate = moment(this.selecteDatePicker).format('MMMM DD')
    },
    subDate () {
      this.selecteDatePicker = moment(this.selecteDatePicker).subtract(1, 'days').toDate()
      this.selectedDate = moment(this.selecteDatePicker).format('MMMM DD')
    },
    deleteMeeting (meeting) {
      this.deleteMeting = meeting
      this.$refs.deleteMeeting.click()
    },
    confirmDelete () {
      axios
        .delete('/portal/api/Meetings/' + this.deleteMeting.meetingId)
        .then((response) => {
          // get meeting with the reference ID
          axios
            .get('/portal/api/Meetings/' + this.deleteMeting.meetingId)
            .then((res) => {
              if (typeof res.data.sequenceId === 'string') {
                // delete meeting from google
                this.$getGapiClient().then((gapi) => {
                  this.gapi = gapi
                  this.gapi.auth2.getAuthInstance().signIn().then(() => {
                    var request = this.gapi.client.calendar.events.delete({
                      'calendarId': 'primary',
                      'eventId': res.data.sequenceId,
                      'sendNotifications': true
                    })
                    request.execute((response) => {
                      if (response.error || response == false) {
                      } else {
                      }
                      this.gapi.auth2.getAuthInstance().signOut()
                      this.gapi = null
                    })
                  })
                })
              }
            })

          this.organizationId = JSON.parse(localStorage.getItem('organizationId'))
          this.getTodayMeeting(this.organizationId)
          this.getUpcomingMeeting(this.organizationId)
          this.organizationId = JSON.parse(localStorage.getItem('organizationId'))
          if (this.partnerStatus != 1) {
            var payload = { 'organizationId': this.organizationId, 'date': moment(this.selecteDatePicker).format('YYYY-MM-DD'), 'partnerId': this.showCreated }
          } else {
            var payload = { 'organizationId': this.organizationId, 'date': moment(this.selecteDatePicker).format('YYYY-MM-DD'), 'partnerId': '' }
          }
          console.log(payload)
          this.getMeetingsByDate(payload)
          this.$refs.deleteMeetingClose.click()
        })
    },
    showMeeingConfirmation (meeting) {
      this.$refs.meetingSideBar.openMeetingCreateSideBar()
      this.$refs.meetingConfirmation.setModelValues(meeting)
      this.$refs.confirmMeetingAddlist.click()
    },
    resendMeetingInvites (meeting) {
      axios
        .get('/portal/api/Meetings/' + meeting.meetingId)
        .then((res) => {
          this.$refs.meetingConfirmation.setModelValues(res.data)
          this.$refs.confirmMeetingAddlist.click()
        })
    },
    getPartnerList () {
      console.log('getting partner list')
      this.getPartners(JSON.parse(localStorage.getItem('organizationId'))).then(() => {
        for (var partner of this.storePartners) {
          var item = { text: partner.givenName + ' ' + partner.familyName, value: partner.id }
          this.createdSelect.push(item)
        }

        this.isCoordiator = JSON.parse(localStorage.getItem('isCoordiator'))
        this.isUser = JSON.parse(localStorage.getItem('isUser'))
        if (this.isUser == 'True') {
          this.toShow = false
          this.showCreated = JSON.parse(localStorage.getItem('userId'))
          this.onChange()
        }
      })
    },
    onChange (value) {
      console.log('This is the value that is being generated!')
      console.log(this.showCreated)
      this.selectedPartner = (this.createdSelect.find(item => item.value == this.showCreated)).text
      // to change the status of the dropdown arrow
      this.dropdownArrow = true
    },
    onChangeShow (value) {
      // to change the status of the dropdown arrow
      this.dropdownArrowShow = true
    },
    focusIn () {
      console.log('entered focusIn status function')
      this.dropdownArrow = false
    },
    focusOut () {
      console.log('entered focusOut status function')
      this.dropdownArrow = true
    },
    focusInShow () {
      console.log('entered focusInShow status function')
      this.dropdownArrowShow = false
    },
    focusOutShow () {
      console.log('entered focusOutShow status function')
      this.dropdownArrowShow = true
    }
  },
  computed: {
    ...mapState({
      storeTodayMeetings: state => state.meeting.todayMeetings
    }),
    ...mapState({
      storeUpcomingMeetings: state => state.meeting.upcomingMeetings
    }),
    ...mapState({
      storeMeetingsByDate: state => state.meeting.meetingByDate
    }),
    ...mapState({
      storePartners: state => state.partner.partners
    }),
    dateChanges () {
      this.selectedDate = moment(this.selecteDatePicker).format('ll')
      if (moment().format('L') != moment(this.selectedDate).format('L') || this.ShowMeeting == 2) {
        this.selectedDate = moment(this.selecteDatePicker).format('MMMM DD')
        return false
      } else {
        this.selectedDate = moment(this.selecteDatePicker).format('MMMM DD')
        return true
      }
    }
  },
  mounted: function () {
    this.$ga.page('/portal/meetinglist')
    this.getPartnerList()
  }
}

</script>

<style scoped>
  .btnCls {
    background-color: var(--success);
    border: none
  }
  .date {

  }
  .dateTextInput {
    background: white;
    color: #01151C;
    font-weight: bold
  }
  .calandarIcon {
    position: relative;
    float: right;
    margin-top: -37px;
    margin-right: 10px;
  }
  .iconRight {
    position: relative;
    float: right;
    margin-top: -37px;
    margin-right: 35px;
  }
  .iconLeft {
    position: relative;
    float: right;
    margin-top: -37px;
    margin-right: 65px;
  }
  .iconLeft :hover{
      cursor:pointer
  }
  .calandarIcon :hover {
    cursor: pointer
  }
  .iconRight :hover {
    cursor: pointer
  }
  .iconDropdown {
    position: relative;
    float: right;
    margin-top: -30px;
    margin-right: 20px;
  }

  .iconDropdown-up {
    position: relative;
    float: right;
    margin-top: -30px;
    margin-right: 20px;
  }
  .datePickerDiv {
    float: left;
    position: relative;
  }
  .datePickerDiv >>> input {
    border: none;
    background: transparent;
    color:transparent;
    display:none
  }
  .sideBar {
    background: #FFFFFF;
  }
  input#example-datepicker {
    background: white;
}
</style>
