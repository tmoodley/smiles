<template>
  <div class="row">
    <div class="col-md-6 ml-5 mt-3">
      <b-breadcrumb :items="items"></b-breadcrumb>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Topic" label-for="input-1">
          <b-form-input disabled="true" id="input-1" v-model="form.Topic" type="text" required placeholder="Enter Topic"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Meeting Time" label-for="input-2">
          <b-form-input disabled="true" id="input-1" v-model="form.MeetingTime" type="text" required placeholder="Enter Topic"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Duaration" label-for="input-2">
          <b-form-input id="input-1" disabled="true" v-model="form.Duration" type="text" required placeholder="Enter Topic"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="Time Zone" label-for="input-3">
          <b-form-input id="input-1" disabled="true" v-model="form.Timezone" type="text" required placeholder="Enter Topic"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="Invite Link" label-for="input-3">
          <b-form-input id="input-1" disabled="true" v-model="form.InviteLink" type="text" required placeholder="Enter Topic"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" v-if="disabled" label-for="input-3">
          <b-form-checkbox id="checkbox-1" v-model="form.IsDefaultRoomId" name="checkbox-1" value="true" unchecked-value="flase">
            Use personal meeting room
          </b-form-checkbox>
        </b-form-group>
        <b-form-group id="input-group-2" label="Participants" label-for="input-2">
          <b-form-input id="input-1" disabled="true" v-model="form.Invitees" type="text" required placeholder="Enter Topic"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Add to" label-for="input-2">
          <b-button variant="outline-primary" @click="handleAuthClick">
            <b-icon icon="calendar3" aria-hidden="true"></b-icon> Google Calendar
          </b-button>
        </b-form-group>
        <b-button type="submit" variant="primary" @click="EditMeeting">Edit this meeting</b-button>
        <b-button type="reset" variant="danger" @click="deleteMeeting()">Delete this meeting</b-button>
      </b-form>
    </div>
</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { BIcon, BIconArrowUp, BIconArrowDown, BIconXSquareFill, BIconCalendar3 } from 'bootstrap-vue'
import axios from 'axios'
const { DareFormatter } = require('../../_helpers/date-formatter')
export default {
  components: {
    BIcon,
    BIconArrowUp,
    BIconArrowDown,
    BIconXSquareFill,
    BIconCalendar3
  },
  data () {
    return {
      form: {
        Topic: '',
        MeetingTime: '',
        Duration: '',
        Timezone: '',
        Invitees: '',
        IsDefaultRoomId: false,
        InviteLink: '',
        RoomId: '',
        UserId: ''
      },
      show: true,
      disabled: false,
      items: '',
      event: '',
      gapi: null,
      partnerEmail: '',
      listner: null
    }
  },
  computed: {
    ...mapState({
      storeMeeting: state => state.meeting.meeting
    })
  },
  created: function () {
    console.log(this.storeMeeting)

    let date = new DareFormatter()

    console.log(this.storeMeeting)
    this.form.Topic = this.storeMeeting.topic
    this.form.MeetingTime = date.getFormatedTime(this.storeMeeting.meetingTime)
    this.form.Duration = this.storeMeeting.duration
    this.form.Timezone = this.storeMeeting.timezone
    this.form.Invitees = this.storeMeeting.invitees
    this.form.IsDefaultRoomId = this.storeMeeting.isDefaultRoomId
    this.form.RoomId = this.storeMeeting.roomId
    this.form.InviteLink = this.storeMeeting.inviteLink
    this.form.UserId = this.storeMeeting.userId

    this.items = [
      {
        text: 'Meetings',
        to: { path: '/portal/meetings/' + this.storeMeeting.userId }
      },
      {
        text: 'Meeting Details',
        active: true
      }
    ]

    // get partner email
    axios
      .get('/portal/api/Customers/GetCustomerByID?id=' + this.form.UserId)
      .then(response => {
        this.partnerEmail = response.data.emailAddress
      })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      // alert(JSON.stringify(this.form));
      // this.meetingEdit(this.form);
      this.$router.push({ path: '/portal/meetingEdit/' })
    },
    deleteMeeting () {
      this.$router.push({ path: '/portal/meetingDelete/' })
    },
    addEvent () {
      var startDate = new Date(this.form.MeetingTime)
      var msDuration = (Number(this.form.Duration.split(':')[0]) * 60 * 60 + Number(this.form.Duration.split(':')[1]) * 60 + Number(this.form.Duration.split(':')[2])) * 1000
      var endDate = new Date(startDate.getTime() + msDuration)
      var isoStartDate = new Date(startDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split('.')[0]
      var isoEndDate = new Date(endDate.getTime() - (new Date().getTimezoneOffset()) * 60 * 1000).toISOString().split('.')[0]
      var InviteesArr = []
      var tempArr = this.form.Invitees.trim().split(',')
      for (var email of tempArr) {
        if (email !== '') {
          var obg = { 'email': email }
          InviteesArr.push(obg)
        }
      }

      var partner = { 'email': this.partnerEmail }
      InviteesArr.push(partner)

      this.event = {
        'summary': this.form.Topic,
        'location': this.form.InviteLink,
        'description': this.form.inviteDes,
        'start': {
          'dateTime': isoStartDate,
          'timeZone': this.form.Timezone
        },
        'end': {
          'dateTime': isoEndDate,
          'timeZone': this.form.Timezone
        },
        'attendees': InviteesArr,
        'conferenceData': null
      }

      this.$getGapiClient().then((gapi) => {
        // gapi.sheets.spreadsheet.get(...)
        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'conferenceDataVersion': 1,
          'resource': this.event
        })

        request.execute((event) => {
          console.log(event)
          window.open(event.htmlLink, '_blank')
        })

        this.gapi.auth2.getAuthInstance().signOut()
        this.gapi = null
      })
    },
    updateSigninStatus (bool) {
      if (bool) {
        console.log('login D')
        this.addEvent()
      } else {
        console.log('not login')
      }
    },
    handleAuthClick () {
      this.$getGapiClient().then((gapi) => {
        this.gapi = gapi
        this.listner = this.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus)
        this.updateSigninStatus(this.gapi.auth2.getAuthInstance().isSignedIn.get())

        if (this.gapi.auth2.getAuthInstance().isSignedIn.get()) {
          this.addEvent()
        } else {
          this.gapi.auth2.getAuthInstance().signIn()
        }
      })
    }
  }
}
</script>
