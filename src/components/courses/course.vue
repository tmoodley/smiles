<template>
  <b-modal id="bv-modal-course"
           size="xl"
           ref="modal"
           title="Add Course"
           @show="resetModal"
           @hidden="resetModal"
           @ok="handleOk">
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-row>
        <b-col>
          <b-form-group label="Course Name"
                        label-for="name-input"
                        invalid-feedback="Course Name is required"
                        :state="nameState">
            <b-form-input id="name-input"
                          v-model="form.name"
                          :state="nameState"
                          required></b-form-input>
          </b-form-group>
          <b-form-group label="Description"
                        label-for="textarea-lazy"
                        invalid-feedback="Description is required"
                        description="Describe the course offering"
                        :state="descriptionState"
                        class="mb-0">
            <b-form-textarea id="textarea-lazy"
                             v-model="form.description"
                             placeholder="Enter your text"
                             lazy-formatter
                             :state="descriptionState"
                             required
                             :formatter="formatter"></b-form-textarea>
          </b-form-group>
          <wysiwyg v-model="form.body" />
          <b-form-group label="Subject" label-for="subjects">
            <b-form-select v-model="form.subjectId" :options="subjectsObjects" v-on:change="getSelectedItem"></b-form-select>
          </b-form-group>
          <b-form-group label="Topic" label-for="topics">
            <b-form-select v-model="form.topicId" :options="topics"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <b-form-group label="Start Date"
                            label-for="start-datepicker"
                            invalid-feedback="Start Date is required">
                <b-form-datepicker id="start-datepicker" v-model="form.startDate" class="mb-2" required></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="End Date"
                            label-for="end-datepicker"
                            invalid-feedback="End Date is required">
                <b-form-datepicker id="end-datepicker" v-model="form.endDate" class="mb-2" required></b-form-datepicker>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Registration Start Date"
                            label-for="registrationStartDate"
                            invalid-feedback="Registration Start Date is required">
                <b-form-datepicker id="registrationStartDate" v-model="form.registrationStartDate" class="mb-2" required></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Registration End Date"
                            label-for="registrationEndDate"
                            invalid-feedback="Registration End Date is required">
                <b-form-datepicker id="registrationEndDate" v-model="form.registrationEndDate" class="mb-2" required></b-form-datepicker>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <label for="sb-maxStudents">Max Students</label>
              <b-form-spinbutton id="sb-maxStudents"
                                 v-model="form.maxStudents"
                                 min="1"
                                 max="50"
                                 step="1"></b-form-spinbutton>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <label for="sb-Billing">Billing Info</label>
              <b-form-checkbox switch v-model="form.hasBilling" size="lg">Has Billing (USD)</b-form-checkbox>
            </b-col>
            <b-col v-if="form.hasBilling">
              <label for="sb-billingRate">Billing Rate</label>
              <currency-input v-model="form.billingRate"
                              currency="USD"
                              class="form-control"
                              locale="en" />
            </b-col>
          </b-row>
          <label for="sb-billingRate">Schedule</label>
          <b-form-checkbox switch v-model="form.monday" size="lg">Monday</b-form-checkbox>
          <b-row v-if="form.monday">
            <b-col>
              <label for="example-datepicker">Monday Start Date</label>
              <b-time v-model="form.mondayStartDate" locale="en" @context="onContext"></b-time>
            </b-col>
            <b-col>
              <label for="example-datepicker">Monday End Date</label>
              <b-time v-model="form.mondayEndDate" locale="en" @context="onContext"></b-time>
            </b-col>
          </b-row>
          <b-form-checkbox switch v-model="form.tuesday" size="lg">Tuesday</b-form-checkbox>
          <b-row v-if="form.tuesday">
            <b-col>
              <label for="example-datepicker">Tuesday Start Date</label>
              <b-time v-model="form.tuesdayStartDate" locale="en" @context="onContext"></b-time>
            </b-col>
            <b-col>
              <label for="example-datepicker">Tuesday End Date</label>
              <b-time v-model="form.tuesdayEndDate" locale="en" @context="onContext"></b-time>
            </b-col>
          </b-row>
          <b-form-checkbox switch v-model="form.wednesday" size="lg">Wednesday</b-form-checkbox>
          <b-row v-if="form.wednesday">
            <b-col>
              <label for="example-datepicker">Wednesday Start Date</label>
              <b-time v-model="form.wednesdayStartDate" locale="en" @context="onContext"></b-time>
            </b-col>
            <b-col>
              <label for="example-datepicker">Wednesday End Date</label>
              <b-time v-model="form.wednesdayEndDate" locale="en" @context="onContext"></b-time>
            </b-col>
          </b-row>
          <b-form-checkbox switch v-model="form.thursday" size="lg">Thursday</b-form-checkbox>
          <b-row v-if="form.thursday">
            <b-col>
              <label for="example-datepicker">Thursday Start Date</label>
              <b-time v-model="form.thursdayStartDate" locale="en" @context="onContext"></b-time>
            </b-col>
            <b-col>
              <label for="example-datepicker">Thursday End Date</label>
              <b-time v-model="form.thursdayEndDate" locale="en" @context="onContext"></b-time>
            </b-col>
          </b-row>
          <b-form-checkbox switch v-model="form.friday" size="lg">Friday</b-form-checkbox>
          <b-row v-if="form.friday">
            <b-col>
              <label for="example-datepicker">Friday Start Date</label>
              <b-time v-model="form.fridayStartDate" locale="en" @context="onContext"></b-time>
            </b-col>
            <b-col>
              <label for="example-datepicker">Friday End Date</label>
              <b-time v-model="form.fridayEndDate" locale="en" @context="onContext"></b-time>
            </b-col>
          </b-row>
          <b-form-checkbox switch v-model="form.saturday" size="lg">Saturday</b-form-checkbox>
          <b-row v-if="form.saturday">
            <b-col>
              <label for="example-datepicker">Saturday Start Date</label>
              <b-time v-model="form.saturdayStartDate" locale="en" @context="onContext"></b-time>
            </b-col>
            <b-col>
              <label for="example-datepicker">Saturday End Date</label>
              <b-time v-model="form.saturdayEndDate" locale="en" @context="onContext"></b-time>
            </b-col>
          </b-row>
          <b-form-checkbox switch v-model="form.sunday" size="lg">Sunday</b-form-checkbox>
          <b-row v-if="form.sunday">
            <b-col>
              <label for="example-datepicker">Sunday Start Date</label>
              <b-time v-model="form.sundayStartDate" locale="en" @context="onContext"></b-time>
            </b-col>
            <b-col>
              <label for="example-datepicker">Sunday End Date</label>
              <b-time v-model="form.sundayEndDate" locale="en" @context="onContext"></b-time>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['room'],
  components: {
  },
  data () {
    return {
      topics: [],
      nameState: null,
      descriptionState: null,
      form: {
        name: '',
        description: '',
        hasBilling: '',
        startDate: '',
        endDate: '',
        registrationStartDate: '',
        registrationEndDate: '',
        maxStudents: '',
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        subjectId: '',
        topicId: ''
      }
    }
  },
  methods: {
    ...mapActions('posts', [
      'getSubjects',
      'getChannels',
      'getRooms',
      'addRoom'
    ]),
    ...mapActions('course', [
      'addCourse'
    ]),
    getSelectedItem: function () { // Just a regular js function that takes 1 arg
      var index = this.subjects.findIndex(x => x.id === this.form.subjectId)
      if (this.form.subjectId == '') {
        index = 0
      }

      var _channels = this.subjects[index].topics.map(function (item) {
        return {
          value: item.id,
          text: item.name
        }
      })
      _channels.unshift({ value: null, text: 'Please select some item' })
      this.topics = _channels
    },
    select (room) {
      this.selectRoom(room)
      this.getPostsByRoom(room)
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      this.descriptionState = valid
      return valid
    },
    resetModal () {
      this.name = ''
      this.nameState = null
      this.description = ''
      this.descriptionState = null
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      var self = this
      this.form.organizationsId = JSON.parse(localStorage.getItem('actualOrgId'))
      this.form.tuturId = JSON.parse(localStorage.getItem('actualOrgId'))
      this.form.createdBy = JSON.parse(localStorage.getItem('actualOrgId'))
      // save the course
      this.addCourse(this.form).then(function () {
        self.getCourses(JSON.parse(localStorage.getItem('actualOrgId')))
      })
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('bv-modal-course')
      })
    }
  },
  computed: {
    ...mapState({
      companystore: state => state.company.company
    }),
    ...mapState({
      subjects: State => State.posts.subjects
    }),
    ...mapState({
      subject: state => state.posts.subject
    }),
    ...mapState({
      topic: state => state.posts.topic
    }),
    subjectsObjects () {
      var _subjects = this.subjects.map(function (item) {
        return {
          value: item.id,
          text: item.name
        }
      })
      _subjects.unshift({ value: null, text: 'Please select some item' })
      this.getSelectedItem()
      return _subjects
    }
  },
  mounted: function () {
    this.getSubjects()
  }
}

</script>

<style scoped>
  .left-align {
    position: relative;
    float: right
  }
  .dropdown {
    color: #01151C;
    font-size: 15px;
    font-weight: bold
  }
  .fadeClass {
      opacity:0.5
  }
  .fadeBackground {
    background: #FCFCFE
  }

  .main-container {
    cursor: pointer
  }

  .hover-drop {
    visibility: hidden
  }

  .main-container:hover .hover-drop, .main-container.hover .hover-drop {
    visibility: visible
  }

  .main-hover-div:focus {
    outline: none
  }
  a.btn-primary.btn-block {
      color: #fff;
  }
</style>
