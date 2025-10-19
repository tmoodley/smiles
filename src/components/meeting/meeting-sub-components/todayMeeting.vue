<template>
  <div>
    <template v-if="!mettingLoading && storeMeetings.length == 0 && storeUpcomingMeetings.length > 0">
      <div class="p-0">
        <p style="color:#01151C; font-size:34px; font-weight:bold">
          Today, {{today | moment("MMMM Do") }}
        </p>
      </div>
      <b-container class="p-0 mt-3" fluid style=" margin-left:14px">
        <div class="no-meeting-main-container">
          <b-row>
            <b-col xl="10">
              <b-row style="background-color: white; box-shadow: rgba(207, 222, 230, 0.424) 0px 4px 10px;min-height: 180px;">
                  <b-col cols="12" sm="12" md="12" lg="6" xl="6" style="margin-top: 35px; ">
                    <div class="ml-5 mt-4" >
                      <b-row no-gutters="true">
                        <b-col cols="12" sm="12">
                          <p class="m-0" style="color:#01151C; font-size:20px; font-weight:bold">No upcoming lessons today!</p>
                        </b-col>
                      </b-row>
                      <b-row no-gutters="true">
                        <b-col cols="12" sm="12">
                          <p class="m-0" style="color:#01151C; font-size:16px; font-weight:500">Click <a href="#" @click="createMeetingEmit()">here</a> to schedule one? </p>
                        </b-col>
                      </b-row>
                    </div>
                  </b-col>
                  <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </template>
    <template v-if="storeMeetings.length > 0" >
      <div class="p-0">
        <p style="color:#01151C; font-size:34px; font-weight:bold">
          Today, {{today | moment("MMMM Do") }}
        </p>
      </div>
      <div v-for="item in storeMeetings" v-bind:key="item.meetingId" style="margin-left:14px">
        <todayMeetingItem v-if="selectedPartner == 'Everyone'" :meeting="item" @meetingWasDelete="deleteMeeting($event)" @meetingCofrimation="resendInvite($event)"/>
        <todayMeetingItem v-else-if="item.partnerName == selectedPartner && selectedPartner != 'Everyone'" :meeting="item" @meetingWasDelete="deleteMeeting($event)" @meetingCofrimation="resendInvite($event)" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions, setState } from 'vuex'
import todayMeetingItem from './todayMeetingItem.vue'
import todayMeeting from './todayMeeting.vue'
import { BIcon, BIconCalendar3, BIconChevronLeft, BIconChevronRight } from 'bootstrap-vue'
export default {
  props: ['selectedPartner'],
  components: {
    todayMeetingItem,
    BIcon,
    BIconCalendar3,
    BIconChevronLeft,
    BIconChevronRight
  },
  data () {
    return {
      organizationId: '',
      today: new Date(),
      todaymeeting: []
    }
  },
  methods: {
    resendInvite (meeting) {
      this.$emit('meetingCofrimation', meeting)
    },
    createMeetingEmit () {
      this.$emit('createMeetingEmit')
    },
    ...mapActions('meeting', [
      'getTodayMeeting'
    ]),
    deleteMeeting (meeting) {
      this.$emit('meetingWasDelete', meeting)
    },
    addLine (newMeetingList) {
      if (newMeetingList.length > 0) {
        var isFirst = true
        for (var meeting of newMeetingList) {
          var nowTime = new Date()
          var meetingTime = new Date(meeting.meetingTime)

          if ((nowTime.getTime() < meetingTime) && isFirst) {
            meeting.isLine = true
            meeting.isLast = false
            meeting.isDisabled = false
            isFirst = false
          } else {
            if ((nowTime.getTime() < meetingTime)) {
              meeting.isLine = false
              meeting.isLast = false
              meeting.isDisabled = false
            } else {
              meeting.isLine = false
              meeting.isLast = false
              meeting.isDisabled = true
            }
          }
        }
        if (isFirst) {
          newMeetingList[newMeetingList.length - 1].isLast = true
        }
      }

      // console.log('newMeetingList');
      // console.log(newMeetingList);
      // this.$store.commit('setTodayMeetings', this.storeMeetings);
      // console.log(this.storeMeetings);
      // console.log('this.storeMeetings');
    }
  },
  computed: {
    ...mapState({
      storeMeetings: state => state.meeting.todayMeetings
    }),
    ...mapState({
      storeUpcomingMeetings: state => state.meeting.upcomingMeetings
    }),
    ...mapState({
      mettingLoading: state => state.meeting.meetingLoading
    }),
    todayMeetings () {
      return this.storeMeetings
    }
  },
  mounted: function () {
    this.organizationId = JSON.parse(localStorage.getItem('organizationId'))
    this.getTodayMeeting(this.organizationId)

    // this.addLine(this.storeMeetings);

    setInterval(function () {
      this.addLine(this.storeMeetings)
    }.bind(this), 2000)
  },
  watch: {
    todayMeetings (newMeetingList, oldMeetingList) {
      // alert();
      // this.addLine(newMeetingList);
    }
  }
}

</script>

<style scoped>

  .no-padding {
    padding: 0px;
  }

  .no-meeting-main-container {
    color: #01151C;
  }

  .no-meeting-img {
    position: relative;
    margin-left: auto;
    margin-right: auto
  }
  .btnCls {
    background-color: var(--success);
    border: none
  }
</style>
