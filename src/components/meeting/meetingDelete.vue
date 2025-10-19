<template>
  <div class="row">
    <div class="col-md-6 ml-5 mt-3">
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
        <b-button type="submit" variant="primary">Delete this meeting</b-button>
        <b-button type="reset" variant="danger" @click="bckMeetings()">Back to list</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import { BIcon, BIconArrowUp, BIconArrowDown, BIconXSquareFill } from 'bootstrap-vue'
const { DareFormatter } = require('../../_helpers/date-formatter')
export default {
  components: {
    BIcon,
    BIconArrowUp,
    BIconArrowDown,
    BIconXSquareFill
  },
  data () {
    return {

      disabled: false,
      form: {
        Topic: '',
        MeetingTime: '',
        Duration: '',
        Timezone: '',
        Invitees: '',
        IsDefaultRoomId: true,
        InviteLink: '',
        RoomId: '',
        Id: '',
        UserId: ''
      },
      show: true
    }
  },
  computed: {
    ...mapState({
      storeMeeting: state => state.meeting.meeting
    })
  },
  created: function () {
    let date = new DareFormatter()

    this.form.Topic = this.storeMeeting.topic
    this.form.MeetingTime = date.getFormatedTime(this.storeMeeting.meetingTime)
    this.form.Duration = this.storeMeeting.duration
    this.form.Timezone = this.storeMeeting.timezone
    this.form.Invitees = this.storeMeeting.invitees
    this.form.IsDefaultRoomId = this.storeMeeting.isDefaultRoomId
    this.form.RoomId = this.storeMeeting.roomId
    this.form.InviteLink = this.storeMeeting.inviteLink
    this.form.Id = this.storeMeeting.id
    this.form.UserId = this.storeMeeting.userId
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios
        .delete('/portal/api/Meetings/' + this.form.Id)
        .then((response) => {
          this.$router.push({ path: '/portal/meetings/' + this.form.UserId })
        })
    },
    bckMeetings () {
      this.$router.push({ path: '/portal/meetings/' + this.form.UserId })
    }
  }
}
</script>
