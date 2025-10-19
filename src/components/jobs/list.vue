<template>
  <div>
    <b-container class="pb-6 pt-2 pt-md-1 bg-gradient-success">
    </b-container>
    <b-container fluid class="mb-7">
          <b-row>
            <b-col cols="9" sm="12" md="9" lg="9" xl="9">
              <myjob v-for="job in jobs" :job="job"></myjob>
              <h2 style="margin-top: 10px" v-if="jobs.length <=0 && !isTutor">You haven't created any jobs.</h2>
              <h2 style="margin-top: 10px" v-if="registeredJobs.length > 0 && isTutor">Jobs Applied To.</h2>
              <h2 style="margin-top: 10px" v-if="isTutor && registeredJobs.length == 0">You have not applied to any Jobs.</h2>
              <registeredjob v-for="job in registeredJobs" :job="job"></registeredjob>
            </b-col>
            <b-col cols="3" sm="12" md="3" lg="3" xl="3" class="mt-4">
              <b-button block variant="primary" v-b-modal.bv-modal-job v-if="!isTutor">Create New Job Request</b-button>
              <b-button block variant="primary" v-b-modal.modal-find-job v-if="isTutor">Find Jobs</b-button>
            </b-col>
        </b-row>
    <job></job>
    <editjob></editjob>
    <viewjob></viewjob>
    <findjobs></findjobs>
    <applications></applications>
  </b-container>
  </div>
</template>
<script>
import job from './job.vue'
import editjob from './editjob.vue'
import viewjob from './viewjob.vue'
import myjob from './myjob.vue'
import registeredjob from './registeredjob.vue'
import findjobs from './jobs/list.vue'
import applications from './applications/list.vue'
import { mapState, mapActions } from 'vuex'
var moment = require('moment')
export default {
  components: {
    job,
    myjob,
    registeredjob,
    editjob,
    viewjob,
    findjobs,
    applications
  },
  data () {
    return {
      selected: ['m', 'f'],
      options: [
        { text: 'Male', value: 'm' },
        { text: 'Female', value: 'f' }
      ],
      nameState: null,
      selecteDatePicker: new Date()
    }
  },
  methods: {
    ...mapActions('job', [
      'setJob',
      'getJobs',
      'getRegisteredJobs'
    ]),
    setSubject (subject) {
      this.addRoom(subject)
    },
    onClick (evt) {
      if (evt == [2]) {
        this.getTutorsByFilter(this.subject.id)
      } else if (evt == 'm' || evt == 'f') {
        var payload = {
          gender: evt,
          subjectId: this.subject.id
        }
        this.filterGender(payload)
      } else {
        this.getTutorsByFilter(this.subject.id)
      }
    },
    closeSidebar () {
      this.meetingSideBarOPen()
      this.$refs.meetingSideBar.openMeetingCreateSideBar()
    },
    showMeeingConfirmation (meeting) {
      this.$refs.meetingSideBar.openMeetingCreateSideBar()
      this.$refs.meetingConfirmation.setModelValues(meeting)
      this.$refs.confirmMeetingAddlist.click()
    },
    meetingSideBarOPen () {
      this.$refs.meetingSideBar.setMeetingTimes()
      this.$refs.meetingSideBar.onReset()
      this.$refs.meetingSideBar.openMeetingCreateSideBar()
    },
    onCreatedMeeting () {
      this.$refs.meetingSideBar.setMeetingTimes()
      this.$refs.meetingSideBar.onReset()
      this.$refs.meetingSideBar.openMeetingCreateSideBar()
    }
  },
  computed: {
    ...mapState({
      jobs: state => state.job.jobs
    }),
    ...mapState({
      registeredJobs: state => state.job.registeredJobs
    }),
    ...mapState({
      genders: state => state.company.genders
    }),
    ...mapState({
      companystore: state => state.company.company
    }),
    isTutor () {
      return this.companystore.isTutor
    }
  },
  mounted: function () {
    this.$ga.page('/portal/courses/list')
    this.getJobs(JSON.parse(localStorage.getItem('actualOrgId')))
    this.getRegisteredJobs(JSON.parse(localStorage.getItem('actualOrgId')))
  }
}

</script>

<style scoped>
  .card.gedf-card {
    margin-top: 24px;
  }

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
  .datePickerDiv > input {
    border: none;
    background: transparent;
    color:transparent;
    display:none
  }
  .sideBar {
    background: #FFFFFF;
  }
</style>
