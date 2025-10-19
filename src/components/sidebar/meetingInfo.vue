<template>
  <div>
    <b-sidebar no-header width="400px" :id="msg.meetingId" right shadow>
      <!--<template v-slot:footer="{ hide }">
        <div class="d-flex text-light align-items-center px-3 py-2">
          <strong class="mr-auto"></strong>
        </div>
      </template>-->
      <b-container class="pl-2">
        <b-row style="height:66px; border-bottom:1px solid #D2D5D6">
          <b-col style="margin-top:20px">
            <b-row>
              <b-col>
                <p style="font-size:18px;font-weight:bold; margin:0px; color:#01151C; width:200px; float:left; margin-left:15px">Details</p>
                <b-img class="no-border" style="cursor:pointer; float: right; height: 15px; margin-top: 3px;" v-b-toggle="msg.meetingId" src="/images/sidebar-close.svg" fluid alt="Responsive image"></b-img>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mt-3" :no-gutters="true" style="margin-left: 15px">
          <b-col cols="1">
            <b-icon-circle-fill aria-hidden="true" variant="primary"></b-icon-circle-fill>
          </b-col>
          <b-col cols="11">
            <p class="m-0" style="color:#01151C; font-size:15px; font-weight:bold">{{msg.meetingTopic}}</p>
          </b-col>
        </b-row>
        <b-row class="mt-3" :no-gutters="true" style="margin-left: 15px">
          <b-col cols="1">
            <i class="fa fa-calendar" aria-hidden="true"></i>
          </b-col>
          <b-col cols="11">
            <p class="m-0" style="color:#01151C; font-size:15px; font-weight:bold">{{msg.meetingTime | moment(" h:mm A ") }} on {{msg.meetingTime | moment("dddd, Do MMMM, YYYY") }} </p>
          </b-col>
        </b-row>
        <b-row class="mt-3" :no-gutters="true" style="margin-left: 15px">
          <b-col cols="1">
            <i class="fas fa-chalkboard-teacher"></i>
          </b-col>
          <b-col cols="11">
            <p class="m-0" style="color:#42b3f5; font-size:15px; font-weight:bold">meet.stuttie.com/{{info.roomId}}</p>
          </b-col>
        </b-row>
        <b-row class="mt-3" :no-gutters="true" style="margin-left: 15px">
          <b-col cols="1">
            <i class="fas fa-user"></i>
          </b-col>
          <b-col cols="11">
            <p class="m-0" style="color:#01151C; font-size:15px; font-weight:bold"> {{msg.partnerName}}</p>
          </b-col>
        </b-row>
        <b-row class="mt-3" :no-gutters="true" style="margin-left: 15px">
          <b-col cols="1">
            <i class="fa fa-users" aria-hidden="true"></i>
          </b-col>
          <b-col cols="11">
            <p class="m-0 mt-1" style="color:#576367; font-size:12px;">  {{info.patientDisplayName}}</p>
          </b-col>
        </b-row>
        <!--<b-row class="mt-3">
    <b-col cols="1">
      <b-icon-cursor-fill aria-hidden="true"></b-icon-cursor-fill>
    </b-col>
    <b-col cols="11">
      <p class="m-0" style="color:#808080; font-size:15px; font-weight:bold"> {{info.timezone}} </p>
    </b-col>
  </b-row>-->
        <b-row class="mt-3" :no-gutters="true" style="margin-left: 15px">
          <b-col cols="8">
            <p class="m-0 mt-1" style="color:#576367;">Scheduled by {{info.createdBy}}</p>
            <p class="m-0 mt-1" style="color:#576367; font-size:12px;">On {{info.createdDate | moment("Do MMMM, YYYY h:mm A ") }}</p>
          </b-col>
          <b-col cols="4">
            <b-row>
              <b-col cols="1" v-if="info.sequenceId != null">
                <img class="mt-2 hoverClass" src="/images/Google_Calendar_icon.png" alt="Responsive image" v-b-popover.hover.bottom="'Event created on Google Calandar'">
              </b-col>
              <b-col cols="1">
              </b-col>
              <b-col cols="1" v-if="info.isEmailNotificationSent">
                <img class="mt-2 hoverClass" src="/images/sent.svg" alt="Responsive image" v-b-popover.hover.bottom="'Email invites sent'">
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <!--<b-row>
    <b-col>
      <b-button variant="outline-primary" class="mt-5" @click="deleteMeeting(msg)">Delete</b-button>
    </b-col>
  </b-row>-->

      </b-container>
    </b-sidebar>
  </div>
</template>
<script>
import axios from 'axios'
import { BIcon, BIconEnvelope, BIconCircleFill, BIconCalendar3, BIconLock, BIconPlus, BIconPerson, BIconCursorFill } from 'bootstrap-vue'
export default {
  props: ['msg'],
  components: {
    BIcon,
    BIconEnvelope,
    BIconCircleFill,
    BIconCalendar3,
    BIconLock,
    BIconPlus,
    BIconPerson,
    BIconCursorFill
  },
  data () {
    return {
      info: ''
    }
  },
  methods: {
    deleteMeeting (meeting) {
      this.$emit('meetingWasDelete', meeting)
    },
    getMeetingInfor () {
      axios
        .get('/portal/api/Meetings/' + this.msg.meetingId)
        .then(response => (this.info = response.data))
    }
  },
  mounted () {
    axios
      .get('/portal/api/Meetings/' + this.msg.meetingId)
      .then(response => (this.info = response.data))
  }
}

</script>
<style>

  .no-padding {
    padding: 4px;
    width: 24%;
  }

  .hoverClass {
    transition: 3s;
    width: 23px;
    height: 23px;
  }

  .hoverClass:hover {
    width: 15px;
    height: 15px;
  }

  .no-border:focus {
    border:none;
    outline:none;
  }

</style>
