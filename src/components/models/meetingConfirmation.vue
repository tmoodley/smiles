 <template>
    <b-container>
      <b-row class="justify-content-center">
        <b-col cols="2">
          <img src="/uploads/localhost/e-lesson.png" class="img-fluid" alt="Responsive image">
        </b-col>
      </b-row>
      <b-row class="justify-content-center mt-3">
        <b-col cols="12">
          <p style="text-align:center; color:#01151C; font-weight:bold; font-size:20px; margin:0px">Send Lesson invitations now?</p>
        </b-col>
        <div class="w-100"></div>
        <b-col cols="12">
          <p style="text-align:center; color:#01151C; font-size:16px; margin:0px">
            <!--Scheduled with {{patnerName}} and {{participantName}}-->
            <hr style=" margin-top: 15px;">
          </p>
        </b-col>
      </b-row>
      <b-row no-gutters="true" class="confir-body" style="margin-top: 28px;">
        <b-col cols="1">
          <div style="background:#FBBD08 0% 0% no-repeat padding-box; height:15px; width:15px; border-radius:50px"></div>
        </b-col>
        <b-col cols="11" class="col-space">
          <p style="color:#01151C; font-weight:bold; font-size:18px; padding: 0px; margin:0px; margin-top:-5px;">{{meetingTopic}}</p>
        </b-col>
        <div class="w-100" style="margin-top:6px"></div>
        <b-col cols="1" class="col-space">
          <b-icon style="height: 15px; width: 15px" icon="calendar3" aria-hidden="true"></b-icon>
        </b-col>
        <b-col cols="11" class="col-space">
          <p style="color:#01151C; font-size:16px; padding: 0px; margin:0px;font-weight:bold">{{MeetingTimeDate}}</p>
        </b-col>
        <div class="w-100" style="margin-top:6px"></div>
        <b-col cols="1" class="col-space">
          <img src="/uploads/localhost/password.svg" style="width:15px;height:15px" class="img-fluid" alt="Responsive image">
        </b-col>
        <b-col cols="11" @click="copyLink" class="col-space">
          <input class="coptText" readonly style="color:#00B2E2; font-size:16px; padding: 0px; margin:0px;width:100%;border:none;background:none;cursor:pointer" ref="StuttieLink" @click="copyLink"  v-model="inviteLink"/>
          <p v-if="showClipBoard" style="margin: 0px; color: #00ac4e; font-size: 10px;">Copied to clipboard!</p>
        </b-col>
        <div class="w-100"></div>
        <b-col cols="1">
          <img src="/uploads/localhost/world.svg" style="width:15px;height:15px" class="img-fluid" alt="Responsive image">
        </b-col>
        <b-col cols="11">
          <p style="color:#7F888B; font-weight:bold; font-size:16px; padding: 0px; margin:0px;">{{timezone}}</p>
        </b-col>
        <div class="w-100" style="margin-top:6px"></div>
        <b-col cols="1" class="col-space">
          <img src="/uploads/localhost/user.svg" style="width:15px;height:15px" class="img-fluid" alt="Responsive image">
        </b-col>
        <b-col cols="11" class="col-space">
          <p style="color:#01151C; font-weight:bold; font-size:16px; padding: 0px; margin:0px;font-weight:bold">{{patnerName}}</p>
        </b-col>
        <div class="w-100" style="margin-top:6px"></div>
        <b-col cols="1" class="col-space">
          <img src="/uploads/localhost/userGroup.svg" style="width:15px;height:15px" class="img-fluid" alt="Responsive image">
        </b-col>
        <b-col cols="11" class="col-space">
          <p style="color:#7F888B; font-size:13px; padding: 0px; margin:0px;padding-top: 2px;">{{patientDisplayName}}</p>
        </b-col>
        <div class="w-100" style="margin-top:6px"></div>
        <b-col cols="10" class="mt-4">
        </b-col>
      </b-row>
      <b-row style="margin-top:15px">
        <b-col cols="11">
          <b-button class="btnCls" style="width: 87%;float: right;" @click="sendNotification()">
            <span style="font-size: 15px; font-weight: bold;">Send email notifications</span>
          </b-button>
        </b-col>
        <!--<b-col cols="6">
          <b-button variant="outline-primary" style="width: 87%; " @click="handleAuthClick()">
            <img src="/uploads/localhost/Google_Calendar_icon.png" style="width: 16px; height: 15px; float: left; margin-top: 6px; margin-left: 5px;" class="img-fluid" alt="Responsive image">
            <span style="font-size: 14px; font-weight: bold;">Add to Google Calendar</span>
          </b-button>
        </b-col>-->
      </b-row>
      <b-row class="mt-2 justify-content-center" style="margin-top:20px !important">
        <b-col md="auto">
          <a style="color: #7F888B;text-decoration:none; cursor:pointer" href="#" type="button" data-dismiss="modal" ref="closeModel">Dismiss without sending notfications</a>
        </b-col>
      </b-row>
    </b-container>
  </template>

<script>
import { BIcon, BIconCalendar3 } from 'bootstrap-vue'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
var moment = require('moment')
export default {
  components: {
    BIcon,
    BIconCalendar3
  },
  data () {
    return {
      organizationId: '',
      patnerName: '',
      participantName: '',
      meetingTopic: '',
      MeetingTimeDate: '',
      partnerEmail: '',
      patientEmail: '',
      meetingID: '',
      duration: '',
      gapi: null,
      partner: null,
      inviteLink: '',
      timezone: '',
      InviteesArr: [],
      duration: '',
      googleTime: '',
      roomId: '',
      showClipBoard: false,
      patientDisplayName: ''
    }
  },
  methods: {
    copyLink () {
      var copyText = this.$refs.StuttieLink
      copyText.select()
      document.execCommand('copy')
      this.showClipBoard = true
      setTimeout(() => {
        this.showClipBoard = false
      }, 3000)
    },
    ...mapActions('meeting', [
      'getTodayMeeting'
    ]),
    ...mapActions('meeting', [
      'getUpcomingMeeting'
    ]),
    setModelValues (meeting) {
      console.log('setModelValues')
      console.log(meeting)
      this.patnerName = meeting.partnerName
      this.participantName = meeting.patientName
      this.meetingTopic = meeting.meetingTopic
      this.MeetingTimeDate = moment(meeting.meetingTime).format('LLLL')
      this.meetingID = meeting.meetingId
      this.partnerEmail = meeting.partnerEmail
      this.patientEmail = meeting.patientEmails
      this.duration = meeting.duration
      this.InviteesArr = [{ 'email': this.partnerEmail }]
      this.inviteLink = meeting.inviteLink
      this.duration = meeting.duration
      this.timezone = meeting.timezone
      this.googleTime = meeting.meetingTime
      this.roomId = meeting.roomId
      this.patientDisplayName = meeting.patientDisplayName

      // add patients to the InviteesArr array
      var patientsArr = this.patientEmail.split(',')

      for (email of patientsArr) {
        this.InviteesArr.push({ 'email': email })
      }

      console.log(this.InviteesArr)
    },
    getParter (partnerID) {
      axios.get('/portal/api/Customers/GetCustomerByID?id=' + partnerID)
        .then(function (response) {
          this.partner = response
        })
    },
    PostMeetingNotificationPatient () {
      return axios.post('/portal/api/Meetings/PostMeetingNotificationPatient?meetingId=' + this.meetingID)
    },
    PostMeetingNotificationProvider () {
      return axios.post('/portal/api/Meetings/PostMeetingNotificationProvider?meetingId=' + this.meetingID)
    },
    sendNotification () {
      Promise.all([this.PostMeetingNotificationPatient(), this.PostMeetingNotificationProvider()])
        .then(results => {
          this.$refs.closeModel.click()
        })
    },
    addEvent () {
      var startDate = new Date(this.googleTime)
      var msDuration = (Number(this.duration.split(':')[0]) * 60 * 60 + Number(this.duration.split(':')[1]) * 60 + Number(this.duration.split(':')[2])) * 1000
      var endDate = new Date(startDate.getTime() + msDuration)
      var isoStartDate = new Date(startDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split('.')[0]
      var isoEndDate = new Date(endDate.getTime() - (new Date().getTimezoneOffset()) * 60 * 1000).toISOString().split('.')[0]

      var inviteDes = '<!DOCTYPE html>' +
          '<html>' +
          '<body>' +
          '<p>If joining from a laptop or desktop:</p>' +
          '<ul><li><b>Please use the Chrome web browser.</b></li></ul>' +
          '<p>If joining from a mobile device:</p>' +
          '<ul><li>Download Stuttie Meet: <a href="https://apps.apple.com/us/app/Stuttie-meet/id1512655643">iPhone</a> or <a href="https://play.google.com/store/apps/details?id=org.Stuttie.meet&hl=en">Android</a>.</li><li>After installation, enter meeting ID: ' + this.roomId + '</li></ul>' +
          '<p>JOIN Stuttie CALL:</p>' +
          '<a href="' + this.inviteLink + '">' + this.inviteLink + '</a>' +
          '</body>' +
          '</html>'

      this.event = {
        'summary': this.meetingTopic,
        'location': this.inviteLink,
        'description': inviteDes,
        'start': {
          'dateTime': isoStartDate,
          'timeZone': this.timezone
        },
        'end': {
          'dateTime': isoEndDate,
          'timeZone': this.timezone
        },
        'attendees': this.InviteesArr,
        'conferenceData': null

      }

      // gapi.sheets.spreadsheet.get(...)
      var request = this.gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'conferenceDataVersion': 1,
        'sendNotifications': true,
        'resource': this.event
      })

      request.execute((event) => {
        console.log(event)
        window.open(event.htmlLink, '_blank')

        // update the metting
        let formData = new FormData()
        formData.append('referenceId', event.id)

        axios.put('/portal/api/Meetings/PutMeetingReference?id=' + this.meetingID,
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((response) => {
          console.log('Updated')
          // this.organizationId = JSON.parse(localStorage.getItem('organizationId'));
          // this.getTodayMeeting(this.organizationId);
          // this.getUpcomingMeeting(this.organizationId);
        }).catch((error) => {

        })
      })

      this.gapi.auth2.getAuthInstance().signOut()
      this.gapi = null
      this.$refs.closeModel.click()
    },
    handleAuthClick () {
      this.$getGapiClient().then((gapi) => {
        this.gapi = gapi
        this.gapi.auth2.getAuthInstance().signIn().then(() => {
          this.addEvent()
        })
      })
    }
  },
  computed: {},
  mounted: function () {},
  created: function () {
  }
}

</script>

<style scoped>
  .btnCls {
    background-color: var(--success);
    border: none
  }

  input:focus {
    outline: none
  }

  .col-space {
    margin-top:5px;
  }

</style>
