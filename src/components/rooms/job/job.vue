<template>
  <b-modal id="bv-modal-job"
           size="xl"
           ref="modal"
           title="Create New Job Request"
           @show="resetModal"
           @hidden="resetModal"
           @ok="handleOk">
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-row>
        <b-col>
          <b-form-group label="Name"
                        label-for="name-input"
                        invalid-feedback="Name is required"
                        :state="nameState">
            <b-form-input id="name-input"
                          v-model="form.name"
                          :state="nameState"
                          required></b-form-input>
          </b-form-group>
          <b-form-group label="Description"
                        label-for="textarea-lazy"
                        invalid-feedback="Description is required"
                        description="Describe the tutoring job"
                        :state="descriptionState"
                        class="mb-0">
            <b-form-textarea id="textarea-lazy"
                             v-model="form.description"
                             placeholder="Provide additonal detail for the required tutoring job, ie what are you trying to improve."
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
              <b-form-group label-for="registrationStartDate"
                            invalid-feedback="Start Start is required">
                <template v-slot:label>
                  Bid Start Date
                  <i class="fas fa-info-circle" id="tooltip-target-bid-start"></i>
                  <b-tooltip target="tooltip-target-bid-start" triggers="hover">
                    This is the date that you start accepting bid applications from tutors.
                  </b-tooltip>
                </template>
                <b-form-datepicker id="registrationStartDate" v-model="form.registrationStartDate" class="mb-2" required></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label-for="registrationEndDate"
                            invalid-feedback="Start End is required">
                <template v-slot:label>
                  Bid End Date
                  <i class="fas fa-info-circle" id="tooltip-target-bid-end"></i>
                  <b-tooltip target="tooltip-target-bid-end" triggers="hover">
                    This is the date that you end accepting bid applications from tutors.
                  </b-tooltip>
                </template>
                <b-form-datepicker id="registrationEndDate" v-model="form.registrationEndDate" class="mb-2" required></b-form-datepicker>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label-for="start-datepicker"
                            invalid-feedback="Start Date is required">
                <template v-slot:label>
                  Start Date
                  <i class="fas fa-info-circle" id="tooltip-target-start"></i>
                  <b-tooltip target="tooltip-target-start" triggers="hover">
                    This is the date that your lessons start.
                  </b-tooltip>
                </template>
                <b-form-datepicker id="start-datepicker" v-model="form.startDate" class="mb-2" required></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label-for="end-datepicker"
                            invalid-feedback="Start End is required">
                <template v-slot:label>
                  End Date
                  <i class="fas fa-info-circle" id="tooltip-target-end"></i>
                  <b-tooltip target="tooltip-target-end" triggers="hover">
                    This is the date that your lessons end.
                  </b-tooltip>
                </template>
                <b-form-datepicker id="end-datepicker" v-model="form.endDate" class="mb-2" required></b-form-datepicker>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <label for="sb-billingRate">Hourly Billing Rate</label>
              <i class="fas fa-info-circle" id="tooltip-target-billing"></i>
              <b-tooltip target="tooltip-target-billing" triggers="hover">
                This is the amount you are willing to pay.
              </b-tooltip>
              <currency-input v-model="form.billingRate"
                              currency="USD"
                              class="form-control"
                              locale="en" />
            </b-col>
          </b-row>
          <label for="sb-billingRate">Required Schedule</label>
          <i class="fas fa-info-circle" id="tooltip-target-schedule"></i>
          <b-tooltip target="tooltip-target-schedule" triggers="hover">
            This is the date and time you are available.
          </b-tooltip>
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
  props: ['room', 'selected'],
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
        startDate: '',
        endDate: '',
        registrationStartDate: '',
        registrationEndDate: '',
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
    ...mapActions('job', [
      'addJob',
      'getJobs'
    ]),
    ...mapActions('company', [
      'findAvailableTutor',
      'requestTutorBySubject',
      'requestTutorByTopic'
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
      this.form.roomId = this.room.id
      this.form.organizationsId = JSON.parse(localStorage.getItem('actualOrgId'))
      this.form.createdBy = JSON.parse(localStorage.getItem('actualOrgId'))
      this.form.createdAt = new Date()
      // save the job
      this.addJob(this.form).then(function (data) {
        if (self.selected == 'AvailableTutor') {
          self.findAvailableTutor(data.id)
        } else if (self.selected == 'RequestTutorBySubject') {
          self.requestTutorBySubject(data.id)
        } else if (self.selected == 'RequestTutorByTopic') {
          self.requestTutorByTopic(data.id)
        }
        self.getJobs(JSON.parse(localStorage.getItem('actualOrgId')))
      })
      // Hide the modal manually
      this.$nextTick(() => {
        this.$swal.fire({
          title: 'Saved!',
          text: 'Your Job Request has been saved.',
          icon: 'success',
          timer: 3000
        })
        this.$bvModal.hide('bv-modal-job')
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
    this.setJob('')
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

</style>
