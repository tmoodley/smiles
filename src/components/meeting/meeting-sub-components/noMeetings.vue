<template>
  <div>
    <b-container v-if="mettingLoading && storeTodayMeetings.length == 0 &&  storeUpcomingMeetings.length == 0">
      <b-row class="justify-content-md-center">
        <b-col md="auto">
          <b-jumbotron style="background:none">
            <b-row class="justify-content-md-center">
              <b-col md="auto">
                <Lottie class="animation"
                        renderer="canvas"
                        :loop="true"
                        :autoplay="true"
                        :animationData="lottieData"
                        :width="56"
                        :height="56" />
              </b-col>
            </b-row>
          </b-jumbotron>
        </b-col>
      </b-row>
    </b-container>
    <div v-if="!mettingLoading && storeTodayMeetings.length == 0 &&  storeUpcomingMeetings.length == 0 ">
      <b-container fluid class="outer-container" :no-gutters="true" style="min-height:80vh">
        <b-row class="justify-content-md-center">
          <b-col md="auto">
            <b-jumbotron class="main-container">
              <template v-slot:header>
                <b-row class="justify-content-md-center">
                  <b-col md="auto">
                    <p class="noMeetingText" style="font-weight: 600;letter-spacing: 0.1px;">You don’t have any Stuttie calls scheduled!</p>
                  </b-col>
                </b-row>
                <b-row class="justify-content-md-center" style="margin-top:30px">
                  <b-col md="auto">
                    <b-button @click="meetingSideBarOPen()" variant="primary" block ref="createMeeting">Schedule Appointment</b-button>
                  </b-col>
                </b-row>
              </template>
              <b-row class="justify-content-md-center" style=" margin-top: 15px;">
                <b-col md="auto">
                  <p class="noMeetingDes" style="letter-spacing: 0.1px; max-width:610px">
                    Whenever you schedule an appointment on Stuttie, it will appear here. Schedule a call by clicking below.
                  </p>
                </b-col>
              </b-row>
            </b-jumbotron>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <meetingCreateSidebar @meetingCofrimation="showMeeingConfirmation($event)" @closeSideBar="closeSidebar()" ref="meetingSideBar" />

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#confirmMeetingAddNoMeeting" hidden ref="confirmMeetingAdd">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div data-backdrop="static" data-keyboard="false"  class="modal fade" id="confirmMeetingAddNoMeeting" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import meetingCreateSidebar from './meetingCreateSidebar.vue'
import meetingConfirmation from '../../models/meetingConfirmation.vue'
import { BIcon, BIconCalendar3, BIconChevronLeft, BIconChevronRight } from 'bootstrap-vue'
import Lottie from 'vue-lottie-web'
import lottieData from './loader.json'
var moment = require('moment')
export default {
  components: {
    meetingCreateSidebar,
    BIcon,
    BIconCalendar3,
    BIconChevronLeft,
    BIconChevronRight,
    meetingConfirmation,
    Lottie
  },
  data () {
    return {
      lottieData,
      lottieInstance: '',
      user: 'Marc',
      patnerName: '',
      participantName: '',
      meetingTopic: '',
      MeetingTimeDate: '',
      meetingID: ''
    }
  },
  methods: {
    meetingSideBarOPen () {
      this.$refs.meetingSideBar.setMeetingTimes()
      this.$refs.meetingSideBar.onReset()
      this.$refs.meetingSideBar.openMeetingCreateSideBar()
    },
    closeSidebar () {
      this.$refs.meetingSideBar.openMeetingCreateSideBar()
    },
    showMeeingConfirmation (meeting) {
      this.$refs.meetingSideBar.openMeetingCreateSideBar()

      this.$refs.meetingConfirmation.setModelValues(meeting)
      this.$refs.confirmMeetingAdd.click()

      if (this.selectedTime != null) {
        this.selectedTime.isClicked = false
      }
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
      profile: state => state.company
    }),
    ...mapState({
      mettingLoading: state => state.meeting.meetingLoading
    }),
    ...mapState({
      partnerStore: State => State.partner.partner
    })
  },
  mounted: function () {}
}
</script>

<style scoped>

  .main-container {
    position: relative;
    margin-top: 80px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    opacity: 1;
    text-align: center;
    color: #01151C;
    padding:0px
  }

  p {
      text-align:center
  }
  .btnCls {
    background-color: var(--success);
    width: 250px;
    height: 62px;
    font-size: 19px;
    border: none;
    padding-left: 40px;
    padding-right: 40px;
    border-radius:7px;
  }

    .btnCls:hover {
      background-color: #02A04A;
    }

  .confir-body p {
    text-align: left !important
  }

  .outer-container {
    position: relative;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 4px 10px #CFDEE66C;
    opacity: 1;
    padding: 0px;
    border-radius:7px
  }

  .userNameP {
    font-size: 22px;
  }

  .noMeetingText {
    font-size: 14px;
  }

  .noMeetingDes {
    font-size: 10px;
  }

  @media (min-width: 768px) {

    .userNameP {
      font-size: 32px;
    }

    .noMeetingText {
      font-size: 24px;
    }

    .noMeetingDes {
      font-size: 20px;
    }
  }

</style>
