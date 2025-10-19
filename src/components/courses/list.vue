<template>
<div>
    <b-container class="pb-6 pt-5 pt-md-5 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col>
          <h2 style="margin-top: 10px" v-if="registeredCourses.length <=0">You haven't registered for any courses</h2>
          <h2 style="margin-top: 10px" v-if="registeredCourses.length > 0">Registered Course</h2>
        </b-col>
        <b-col cols="3" sm="12" md="3" lg="3" xl="3" class="mt-4">
          <b-button block variant="primary" @click="$bvModal.show('bv-modal-course')" v-if="isTutor">Add Course</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-row>
        <b-col cols="12" sm="12" md="12" lg="12" xl="12">
          <mycourse v-for="course in courses" :course="course" @createCourseMeeting="onCreatedMeeting()"></mycourse>
          <registeredcourse v-for="course in registeredCourses" :course="course"></registeredcourse>
        </b-col>
      </b-row>
      <course></course>
      <editcourse></editcourse>
      <viewcourse></viewcourse>
      <createMeetingSidebar @meetingCofrimation="showMeeingConfirmation($event)" @closeSideBar="closeSidebar()" ref="meetingSideBar" :date="selecteDatePicker" :partnerStatus="showCreated" />
  </b-container>
  </div>
</template>
<script>
import course from './course.vue'
import editcourse from './editcourse.vue'
import viewcourse from './viewcourse.vue'
import mycourse from './mycourse.vue'
import registeredcourse from './registeredcourse.vue'
import createMeetingSidebar from './createMeetingSidebar.vue'
import { mapState, mapActions } from 'vuex'
var moment = require('moment')
export default {
  components: {
    course,
    mycourse,
    registeredcourse,
    editcourse,
    viewcourse,
    createMeetingSidebar
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
    ...mapActions('company', [
      'getTutors',
      'getTutorsByFilter',
      'filterGender'
    ]),
    ...mapActions('posts', [
      'getSubjects',
      'getChannels',
      'getRooms',
      'addRoom'
    ]),
    ...mapActions('course', [
      'setCourse',
      'getCourses',
      'getRegisteredCourses'
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
      courses: state => state.course.courses
    }),
    ...mapState({
      registeredCourses: state => state.course.registeredCourses
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
    this.getCourses(JSON.parse(localStorage.getItem('actualOrgId')))
    this.getRegisteredCourses(JSON.parse(localStorage.getItem('actualOrgId')))
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
