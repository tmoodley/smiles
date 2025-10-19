<template>
  <div v-if="!mettingLoading && storeMeetings.length > 0">
    <div>
      <template>
        <div class="p-0 mt-3">
          <p style="color:#01151C; font-size:34px; font-weight:bold">
            Upcoming
          </p>
        </div>
      </template>
      <template v-if="storeMeetings.length > 0">
        <div v-for="item in storeMeetings" v-bind:key="item.meetingId" style="margin-left:14px">
          <meetingItem  v-if="selectedPartner == 'Everyone'" :meeting="item" @meetingWasDelete="deleteMeeting($event)" @meetingCofrimation="resendInvite($event)"/>
          <meetingItem v-else-if="item.partnerName == selectedPartner && selectedPartner != 'Everyone'" :meeting="item" @meetingWasDelete="deleteMeeting($event)" @meetingCofrimation="resendInvite($event)"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import meetingItem from './meetingItem.vue'
export default {
  props: ['selectedPartner'],
  components: {
    meetingItem
  },
  data () {
    return {
      organizationId: ''
    }
  },
  methods: {
    resendInvite (meeting) {
      this.$emit('meetingCofrimation', meeting)
    },
    ...mapActions('meeting', [
      'getUpcomingMeeting'
    ]),
    deleteMeeting (meeting) {
      this.$emit('meetingWasDelete', meeting)
    }
  },
  computed: {
    ...mapState({
      storeMeetings: state => state.meeting.upcomingMeetings
    }),
    ...mapState({
      mettingLoading: state => state.meeting.meetingLoading
    })
  },
  mounted: function () {
    this.organizationId = JSON.parse(localStorage.getItem('organizationId'))
    this.getUpcomingMeeting(this.organizationId)
  }
}

</script>

<style scoped>
</style>
