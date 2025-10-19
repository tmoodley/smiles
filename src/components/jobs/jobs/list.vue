<template>
  <b-modal id="modal-find-job"
           ref="modal"
           size="xl"
           title="Search For Available Jobs"
           hide-footer>
    <b-container fluid style="padding:34px">
      <b-row>
        <b-col cols="9" sm="12" md="9" lg="9" xl="9"><myjob v-for="job in jobs" :job="job"></myjob></b-col>
        <b-col cols="3" sm="12" md="3" lg="3" xl="3">
          <div class="card gedf-card">
            <div class="card-body">
              <h5 class="card-title">Filter</h5>
              <h6 class="card-subtitle mb-2 text-muted">Subjects</h6>
              <p class="card-text">
                <b-form-select v-model="selectedSubject" @change="onChange()" :options="subjectsList"></b-form-select>
              </p>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script>
import myjob from './myjob.vue'
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
var moment = require('moment')
export default {
  components: {
    myjob
  },
  data () {
    return {
      selectedSubject: '',
      gapi: null,
      selected: ['m', 'f'],
      name: '',
      email: '',
      options: [
        { text: 'Male', value: 'm' },
        { text: 'Female', value: 'f' }
      ]
    }
  },
  methods: {
    ...mapActions('job', [
      'filterJobsBySubject'
    ]),
    ...mapActions('posts', [
      'getSubjects',
      'saveSubject'
    ]),
    getPartnerList () {
      this.getTutors()
    },
    setSubject (subject) {
      this.saveSubject(subject)
      this.filterJobsBySubject(subject.id)
    },
    onChange () {
      this.filterJobsBySubject(this.selectedSubject)
    }
  },
  computed: {
    ...mapState({
      jobs: state => state.job.filteredJobs
    }),
    ...mapState({
      genders: state => state.company.genders
    }),
    ...mapState({
      subjects: State => State.posts.subjects
    }),
    ...mapState({
      subject: State => State.posts.subject
    }),
    subjectsList () {
      var _subjects = this.subjects.map(function (item) {
        return {
          value: item.id,
          text: item.name
        }
      })
      _subjects.unshift({ value: null, text: 'Please select a subject' })
      return _subjects
    }
  },
  mounted: function () {
    this.$ga.page('/portal/jobs/list')
    var self = this
    if (this.subjects.length == 0) {
      this.getSubjects().then(function () {
        if (self.subject != '') {
          self.setSubject(self.subject)
          self.filterJobsBySubject(self.subject.id)
          self.selectedSubject = self.subject.id
        } else {
          self.setSubject(self.subjects[0])
          self.filterJobsBySubject(self.subjects[0].id)
          self.selectedSubject = self.subjects[0].id
        }
      })
    } else {
      this.selectedSubject = this.subjects[0].id
    }
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
