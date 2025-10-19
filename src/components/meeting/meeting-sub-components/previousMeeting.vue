<template>
  <div>
    <div>
      <template>
        <div class="p-0 mt-3">
          <p style="color:#01151C; font-size:24px; font-weight:bold">
            <span v-if="storeMeetings.length == 0">There are no meetings scheduled on </span>{{showMeetingStatusChanged}} {{ dateChanges  | moment("MMMM Do") }}
          </p>
        </div>
      </template>
      <template v-if="storeMeetings.length > 0" >
        <div v-for="item in storeMeetings" v-bind:key="item.meetingId" style="margin-left:14px">
          <meetingItem v-if="selectedPartner == 'Everyone'" :meeting="item" :meetingStatus="meetingStatus" @meetingWasDelete="deleteMeeting($event)" @meetingCofrimation="resendInvite($event)"/>
          <meetingItem v-else-if="item.partnerName == selectedPartner && selectedPartner != 'Everyone'" :meeting="item" :meetingStatus="meetingStatus" @meetingWasDelete="deleteMeeting($event)" @meetingCofrimation="resendInvite($event)"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import meetingItem from './meetingItem.vue'
var moment = require('moment')
export default {
  props: ['date', 'meetingStatus', 'partnerStatus', 'selectedPartner'],
  components: {
    meetingItem
  },
  data () {
    return {
      selectedDate: '',
      organizationId: '',
      showMeetingStatus: ''
    }
  },
  methods: {
    resendInvite (meeting) {
      this.$emit('meetingCofrimation', meeting)
    },
    deleteMeeting (meeting) {
      this.$emit('meetingWasDelete', meeting)
    },
    ...mapActions('meeting', [
      'getMeetingsByDate'
    ]),
    ...mapActions('meeting', [
      'getMeetingsDeleted'
    ]),
    getDeleted () {
      this.organizationId = JSON.parse(localStorage.getItem('organizationId'))
      var payload = { 'organizationId': this.organizationId, 'date': moment(this.selectedDate).format('YYYY-MM-DD') }
      console.log(payload)
      this.getMeetingsDeleted(payload)
    }
  },
  computed: {
    ...mapState({
      storeMeetings: state => state.meeting.meetingByDate
    }),
    dateChanges () {
      this.selectedDate = this.date
      console.log(this.showMeetingStatus)
      if (moment().format('L') != moment(this.selectedDate).format('L') && this.showMeetingStatus == '1') {
        this.organizationId = JSON.parse(localStorage.getItem('organizationId'))
        if (this.partnerStatus != 1) {
          var payload = { 'organizationId': this.organizationId, 'date': moment(this.selectedDate).format('YYYY-MM-DD'), 'partnerId': this.partnerStatus }
        } else {
          var payload = { 'organizationId': this.organizationId, 'date': moment(this.selectedDate).format('YYYY-MM-DD'), 'partnerId': '' }
        }
        console.log(payload)
        this.getMeetingsByDate(payload)
      }
      return this.date
    },
    showMeetingStatusChanged () {
      this.showMeetingStatus = this.meetingStatus
      var payload = { 'organizationId': this.organizationId, 'date': moment(this.selectedDate).format('YYYY-MM-DD') }
      console.log('Here')
      if (this.showMeetingStatus == '2') {
        this.organizationId = JSON.parse(localStorage.getItem('organizationId'))
        if (this.partnerStatus != 1) {
          var payload = { 'organizationId': this.organizationId, 'date': moment(this.selectedDate).format('YYYY-MM-DD'), 'partnerId': this.partnerStatus }
        } else {
          var payload = { 'organizationId': this.organizationId, 'date': moment(this.selectedDate).format('YYYY-MM-DD'), 'partnerId': '' }
        }
        console.log(payload)
        this.getMeetingsDeleted(payload)
        return 'Deleted'
      } else {
        return ''
      }
    }
  },
  created: function () {
    console.log('created')
    this.selectedDate = this.date
  }
}

</script>

<style scoped>
</style>
