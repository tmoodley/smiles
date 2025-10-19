<template>
  <div>
    <b-sidebar no-header id="sidebar-right-list" width="400px" class="sideBar" right shadow>
      <div>
        <div class="outerDiv">
          <div class="mainDiv">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <b-row style="height:66px; border-bottom:1px solid #D2D5D6">
                <b-col>
                  <p style="font-size:18px;font-weight:bold; margin:0px; color:#01151C;">Schedule Lesson</p>
                  <b-img @click="closeSideBarIMG" ref="meetingSidebarCloseopenBtn" v-b-toggle.sidebar-right-list class="no-border" style="cursor:pointer; float: right; height: 15px;" src="/images/sidebar-close.svg" fluid alt="Responsive image"></b-img>
                </b-col>
              </b-row>
              <b-row v-if="selectedContact != ''" mt-2>
                <b-col>
                  <p style="letter-spacing: 0.2px; color: #00AC4E;font-weight:bold;font-size:12px;cursor:pointer;margin-top:20px;">Student: {{selectedContact.emailAddress}} <i class="fa fa-trash" aria-hidden="true" @click="$bvModal.show('modal-find-handle')"></i></p>
                  {{partnerStore.defaultTimezone}}
                </b-col>
              </b-row>
              <b-row v-if="selectedContact == ''">
                <b-col>
                  <b-button block variant="danger" @click="$bvModal.show('modal-find-handle')" style=" margin-bottom: 10px;">Select Student</b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-form-group id="input-group-2" label="Date" class="inputLabels mt-3" label-for="input-2">
                    <b-form-input id="example-datepicker" type="date" @input="dateChange" v-model="selectedDate" class="mb-2 selectBoxFont"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group id="input-group-2" label="Time" class="inputLabels mt-3" label-for="input-2">
                    <b-form-select class="selectBoxFont" style="background: none !important;" v-model="selectedWhenTime" @input="dateChange" :options="whentimeoptions"></b-form-select>
                  </b-form-group>
                </b-col>
                <b-row>
                  <b-col>
                    <label class="pl-3 pt-0" v-if="dateError" style="color:#c90a14;font-size:80%">Start time is earlier than the current time</label>
                  </b-col>
                </b-row>
              </b-row>

              <!--<b-form-group id="input-group-2" label="Meeting Time" class="inputLabels mt-3" label-for="input-2">
    <div class="col d-flex flex-row p-0">
      <b-form-input id="example-datepicker" type="date" @input="dateChange" v-model="selectedDate" class="mb-2 selectBoxFont"></b-form-input>
      <b-form-select class="ml-3 selectBoxFont" style="background: none !important;" v-model="selectedWhenTime" @input="dateChange" :options="whentimeoptions"></b-form-select>
    </div>
    <div class="col p-0">
      <label v-if="dateError" style="color:#c90a14;">Start time is earlier than the current time</label>
    </div>
  </b-form-group>-->
              <b-form-group id="input-group-2" label="Duration" class="inputLabels" label-for="input-2">
                <div class="col d-flex flex-row p-0 ">
                  <b-form-select class="selectBoxFont" style="background: none !important;" v-model="form.Duration" :options="durationOptions"></b-form-select>
                  <!--<b-form-select class="ml-3 selectBoxFont" style="background: none !important;" v-model="selectedMin" :options="minitoptions" @input="onDurationChange"></b-form-select>-->
                </div>
                <div class="col p-0">
                  <label v-if="durationError" style="color:#c90a14;">Please check the selected duration</label>
                </div>
              </b-form-group>
              <b-form-group id="input-group-2" label="Hourly Rate" class="inputLabels" label-for="input-2">
                <b-form-input id="input-1" v-model="$v.form.Rate.$model" @blur="$v.form.Rate.$touch()" :class="{'is-invalid':$v.form.Rate.$error}" type="text"
                              placeholder="Hourly Rate" class="textInputs selectBoxFont"></b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.form.Rate.required">Please enter Hourly Rate</span>
                  <span v-if="!$v.form.Rate.decimal">Please enter a valid Hourly Rate</span>
                </div>
              </b-form-group>
              <!--<b-form-group id="input-group-3" label="Time Zone" class="inputLabels" label-for="input-3">
                <b-form-select v-model="form.Timezone" :options="timeZoneoptions" class="textInputs selectBoxFont"></b-form-select>
              </b-form-group>-->
              <b-form-group id="input-group-4" label="Tutor" class="inputLabels mt-3" label-for="input-4" :class="{invalid: $v.form.UserId.$error, isPartnerShoe:isProviderDropDownDisabled}">
                <b-form-select :disabled="isProviderDropDownDisabled" id="input-4" v-model="$v.form.UserId.$model" @blur="$v.form.UserId.$touch()" :class="{'is-invalid':$v.form.UserId.$error}" @change="onpartnerchange()" :options="options" class="textInputs selectBoxFont"></b-form-select>
                <div class="invalid-feedback">
                  <span v-if="!$v.form.UserId.required">Select the Tutor</span>
                </div>
              </b-form-group>
              <b-form-group id="input-group-1" label="Topic" class="inputLabels" label-for="input-1" :class="{invalid: $v.form.Topic.$error}">
                <b-form-input id="input-1" v-model="$v.form.Topic.$model" @blur="$v.form.Topic.$touch()" :class="{'is-invalid':$v.form.Topic.$error}" type="text"
                              placeholder="Appointment subject" class="textInputs selectBoxFont"></b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.form.Topic.required">Please enter a topic</span>
                </div>
              </b-form-group>
              <b-form-group class="inputLabels" v-for="(patientEmail,index) in PatientEmails" v-bind:key="index" :label="patientEmail.label" v-if="selectedContact == null">
                <b-form-input autocomplete="false" :class="{addRedBoarder:!patientEmail.validations.isValid}" v-model="patientEmail.email" type="text" class="textInputs selectBoxFont" placeholder="username@email.com" @input="validateEmail(patientEmail,index)" @focus="emailExists(patientEmail,index)" @blur="emailExists(patientEmail,index)">
                </b-form-input>
                <b-img class="no-border" @click="deleteGuestEmail(index)" v-if="index != 0" style=" cursor: pointer; float: right; height: 10px; margin-top: -20px; margin-right: 8px;" src="/images/sidebar-close.svg" fluid alt="Responsive image"></b-img>
                <div class="errorMsg">
                  <span v-if="patientEmail.validations.isEmailExists">Please enter the guest email</span>
                  <span v-if="patientEmail.validations.isEmail">Please enter a valid email address</span>
                </div>
              </b-form-group>
              <b-row v-if="isDuplicateEmail" style=" margin-bottom: 10px;">
                <b-col>
                  <div class="errorMsg">
                    <span>Please enter a different email</span>
                  </div>
                </b-col>
              </b-row>
              <b-row v-if="selectedContact == null">
                <b-col>
                  <p style="letter-spacing: 0.2px; color: #00AC4E;font-weight:bold;font-size:12px;cursor:pointer" @click="addGuestEmail()">Add another guest</p>
                </b-col>
              </b-row>

              <!--<b-form-group id="input-group-5" label="Guest Name" label-for="input-5" class="inputLabels" :class="{invalid: $v.form.PatientName.$error}">
    <b-form-input id="input-5" v-model="$v.form.PatientName.$model" @blur="$v.form.PatientName.$touch()" type="text" :class="{'is-invalid':$v.form.PatientName.$error}" class="textInputs selectBoxFont" placeholder="Enter guest name"></b-form-input>
    <div class="invalid-feedback">
      <span v-if="!$v.form.PatientName.required">Please enter the guest's name</span>
    </div>
  </b-form-group>-->
              <b-row>
                <b-col>
                  <b-button :disabled="loading" type="submit" block variant="primary">
                    Confirm
                    <img v-show="loading" style="color:#546064" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </div>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>
<script>
import { BIcon, BIconArrowUp, BIconArrowDown, BIconXSquareFill } from 'bootstrap-vue'
import { required, numeric, decimal, email } from 'vuelidate/lib/validators'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
var moment = require('moment')

const validateMeetingTopic =
    (value, vm) => {
      if (vm.IsDefaultRoomId == false && value == '') { return false } else { return true }
    }

export default {
  props: ['date', 'partnerStatus'],
  components: {
    BIcon,
    BIconArrowUp,
    BIconArrowDown,
    BIconXSquareFill
  },
  computed: {
    ...mapState({
      store: state => state.company
    }),
    ...mapState({
      selectedContact: state => state.messages.selectedContact
    }),
    ...mapState({
      storePartners: state => state.partner.partners
    }),
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
    ...mapState({
      contacts: state => state.messages.contacts
    }),
    ...mapState({
      _contact: state => state.messages.contact
    }),
    ...mapState({
      searchContacts: state => state.messages.searchContacts
    }),
    ...mapState({
      searchCompanies: state => state.messages.searchCompanies
    }),
    orderByResults: function () {
      return _.orderBy(this.contacts, ['createdAt'], ['desc'])
    },
    searchResults: function () {
      var self = this
      if (this.searchHandle != '') {
        return _.filter(this.contacts, function (obj) {
          if (self.organizationId == obj.toOrganizationsId) {
            if (obj.organization.name.indexOf(self.searchHandle) > -1) {
              return org
            }
          } else {
            if (obj.toOrganizations.name.indexOf(self.searchHandle) > -1) {
              return org
            }
          }
        })
      } else {
        return _.filter(this.contacts, function (obj) {
          return obj
        })
      }
    }
  },
  data () {
    return {
      isDuplicateEmail: false,
      showTimeZone: '',
      isProviderDropDownDisabled: false,
      selectedPartnerName: '',
      options: [{ value: null, text: 'Select the tutor' }],
      participantEmail: '',
      participants: [],
      durationError: false,
      dateError: false,
      emailEr: false,
      selectedDate: new Date().toISOString().slice(0, 10),
      selectedWhenTime: '12:00 PM',
      selectedHour: '01',
      selectedMin: '00',
      timeZoneoptions: [],
      hoursoptions: [],
      minitoptions: [],
      whentimeoptions: [],
      testTime: '',
      defaultroomId: '',
      form: {
        Topic: '',
        MeetingTime: '',
        Duration: '1:00:00',
        Rate: '15.00',
        Timezone: '',
        Invitees: '',
        IsDefaultRoomId: false,
        UserId: null,
        // PatientName:'',
        PatientEmails: ''
      },
      show: true,
      loading: false,
      PatientEmails: [{ email: '', label: 'Guest Email', validations: { isEmail: true, isEmailExists: false, isValid: true } }],
      durationOptions: [
        { value: '01:00:00', text: '1 hour' },
        { value: '02:00:00', text: '2 hours' },
        { value: '03:00:00', text: '3 hour' }
      ]

    }
  },
  validations: {
    form: {
      Topic: { required },
      UserId: { required },
      Rate: { required, decimal }
    }
  },
  methods: {
    closeSideBarIMG () {
      this.$emit('closeBookMeeting')
    },
    openMeetingCreateSideBar () {
      this.$refs.meetingSidebarCloseopenBtn.click()
    },
    checkGuestEmails () {
      for (var user of this.PatientEmails) {
        this.validateEmail(user)
      }
    },
    modelIsValid () {
      this.checkGuestEmails()
      for (var user of this.PatientEmails) {
        if (!user.validations.isValid) {
          return false
        }
      }
      return true
    },
    validateEmail (patientEmail, index) {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      if (regex.test(patientEmail.email)) {
        patientEmail.validations.isEmail = false
        patientEmail.validations.isEmailExists = false
        patientEmail.validations.isValid = true
        this.duplicateEmail(patientEmail, index)
      } else {
        patientEmail.validations.isEmail = true
        patientEmail.validations.isEmailExists = false
        patientEmail.validations.isValid = false
      }
    },
    emailExists (patientEmail, index) {
      if (patientEmail.email == '') {
        patientEmail.validations.isEmailExists = true
        patientEmail.validations.isEmail = false
        patientEmail.validations.isValid = false
      } else {
        patientEmail.validations.isEmailExists = false
        patientEmail.validations.isEmail = false
        patientEmail.validations.isValid = true
        this.validateEmail(patientEmail, index)
      }
    },
    hasDuplicates (arr) {
      return new Set(arr).size !== arr.length
    },
    duplicateEmail (patientEmail, index) {
      var emails = []
      for (var Patient of this.PatientEmails) {
        emails.push(Patient.email)
      }

      if (this.hasDuplicates(emails)) {
        this.isDuplicateEmail = true
        this.PatientEmails.splice(index, 1)
        setTimeout(() => {
          this.isDuplicateEmail = false
        }, 3000)
      }
    },
    deleteGuestEmail (index) {
      this.PatientEmails.splice(index, 1)
    },
    addGuestEmail () {
      this.PatientEmails.push({ email: '', label: '', validations: { isEmail: false, isEmailExists: false, isValid: true } })
    },
    setInputIDsabledStatus (value) {
      if (value == true && this.form.Topic == '') {
        this.form.Topic = 'Appointment in Personal Stuttie Room'
      }
    },
    bookMeeting (date, time) {
      this.selectedDate = moment(date.dateObj).format('YYYY-MM-DD')
      this.selectedWhenTime = time
      this.dateChange()
    },
    openConfirmationDialog (meeting) {
      this.$emit('meetingCofrimation', meeting)
    },
    closeSideBar () {
      this.$nextTick(() => { this.$v.form.$reset() })
      this.$emit('closeBookMeeting')
    },
    ...mapActions('partner', [
      'getPartners'
    ]),
    ...mapActions('partner', [
      'getPartner'
    ]),
    ...mapActions('company', [
      'getCompany'
    ]),
    ...mapActions('meeting', [
      'getTodayMeeting'
    ]),
    ...mapActions('meeting', [
      'getUpcomingMeeting'
    ]),
    ...mapActions('meeting', [
      'getMeetingsByDate'
    ]),
    onSubmit (evt) {
      this.form.TutorId = JSON.parse(localStorage.getItem('organizationId'))
      this.form.StudentId = this.selectedContact.organizationId
      this.form.defaultTimezone = this.partnerStore.defaultTimezone
      this.$v.$touch()
      evt.preventDefault()
      this.form.PatientEmails = ''
      var emails = []
      for (var Patient of this.PatientEmails) {
        emails.push(Patient.email)
      }

      if (this.selectedContact == null) {
        this.form.PatientEmails = emails.join(',')
        this.modelIsValid()
      } else {
        this.form.PatientEmails = this.selectedContact.emailAddress
      }
      if (!this.$v.$invalid) {
        this.loading = true
        axios
          .post('/portal/api/Meetings', this.form)
          .then((response) => {
            this.loading = false
            this.openConfirmationDialog(response.data)
            this.organizationId = JSON.parse(localStorage.getItem('organizationId'))
            this.getTodayMeeting(this.organizationId)
            this.getUpcomingMeeting(this.organizationId)
            if (this.date && this.partnerStatus) {
              this.organizationId = JSON.parse(localStorage.getItem('organizationId'))
              if (this.partnerStatus != 1) {
                var payload = { 'organizationId': this.organizationId, 'date': moment(this.date).format('YYYY-MM-DD'), 'partnerId': this.partnerStatus }
              } else {
                var payload = { 'organizationId': this.organizationId, 'date': moment(this.date).format('YYYY-MM-DD'), 'partnerId': '' }
              }
              this.getMeetingsByDate(payload)
            }
            this.onReset(evt)
          }).catch(() => {
            this.loading = false
          })
      }
    },
    onReset (evt) {
      if (evt != null) { evt.preventDefault() }
      this.form = {
        Topic: '',
        MeetingTime: '',
        Duration: '00:15:00',
        Rate: '',
        Timezone: '',
        Invitees: '',
        IsDefaultRoomId: false,
        UserId: null,
        // PatientName: '',
        PatientEmails: ''
      }

      this.selectedHour = '01'
      this.selectedMin = '00'
      this.form.Duration = '00:15:00'

      var currentTimeInHrMin = this.setCurrentHour(new Date())

      var currentAMPM = this.setCurrentAMPM(new Date())
      this.selectedWhenTime = currentTimeInHrMin + ' ' + currentAMPM

      // set default meeting time
      var date = this.selectedDate
      var time = this.selectedWhenTime
      var AMPM = currentAMPM
      var temptime = date + ' ' + this.dateConvertTo24h(time.split(' ')[0], AMPM)
      this.form.MeetingTime = this.setDateTimeToModel(temptime)
      this.$nextTick(() => { this.$v.form.$reset() })
      this.setMeetingTimes()
      this.PatientEmails = [{ email: '', label: 'Guest Email', validations: { isEmail: false, isEmailExists: false, isValid: true } }]
    },
    CheckUserInput () {
      console.log('')
    },
    setCurrentHour (date) {
      var d = new Date(date)
      var hours = (d.getHours() >= 12) ? d.getHours() - 12 : d.getHours()// check this on meeting
      return hours + 1 + ':00'
    },
    setCurrentAMPM (date) {
      var hours = date.getHours()
      var ampm = hours + 1 >= 12 ? 'PM' : 'AM'
      return ampm
    },
    dateConvertTo24h (time, ampm) {
      var time = time
      var hours = Number(time.split(':')[0])
      var minutes = Number(time.split(':')[1])
      var AMPM = ampm
      if (AMPM == 'PM' && hours < 12) hours = hours + 12
      if (AMPM == 'AM' && hours == 12) hours = hours - 12
      var sHours = hours.toString()
      var sMinutes = minutes.toString()
      if (hours < 10) sHours = sHours
      if (minutes < 10) sMinutes = '0' + sMinutes
      return (sHours + ':' + sMinutes)
    },
    setDateTimeToModel (date) {
      var currentdate = new Date(date)
      var year = currentdate.getFullYear()
      var month = currentdate.getMonth() + 1
      var monthFomt = (month < 10) ? '0' + month : month
      var date = (currentdate.getDate() < 10) ? '0' + currentdate.getDate() : currentdate.getDate()
      var hour = (currentdate.getHours() < 10) ? '0' + currentdate.getHours() : currentdate.getHours()
      var mins = (currentdate.getMinutes() < 10) ? '0' + currentdate.getMinutes() : currentdate.getMinutes()
      var dateString = year + '-' + monthFomt + '-' + date + 'T' + hour + ':' + mins + ':00'
      return dateString
    },
    dateChange () {
      // set MeetingTime
      var today = new Date()
      var date = this.selectedDate
      var time = this.selectedWhenTime
      var temptime = date + ' ' + moment(date + ' ' + time).format('HH:mm')
      var currentDate = new Date(temptime)
      if (currentDate.getTime() < today.getTime()) {
        this.dateError = true
        setTimeout(() => {
          this.dateError = false
          this.selectedDate = new Date().toISOString().slice(0, 10)
          var currentTimeInHrMin = this.setCurrentHour(new Date())
          var currentAMPM = this.setCurrentAMPM(new Date())
          this.selectedWhenTime = currentTimeInHrMin + ' ' + currentAMPM
          this.setMeetingTimes()
        }, 2000)
      } else {
        this.form.MeetingTime = this.setDateTimeToModel(temptime)
      }
    },
    onDurationChange () {
      var hr = this.selectedHour
      var min = this.selectedMin
      var sec = ':00'
      if (hr === '00' && min === '00') {
        setTimeout(() => {
          this.selectedMin = '15'
          this.form.Duration = this.selectedHour + this.selectedMin + sec
        }, 500)
      } else {
        this.form.Duration = hr + ':' + min + sec
      }
    },
    isDecimal (n) {
      if (n == '') { return false }

      var strCheck = '0123456789'
      var i

      for (i in n) {
        if (strCheck.indexOf(n[i]) == -1) { return false }
      }
      return true
    },
    isEmail (email) {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      return regex.test(email)
    },
    isEmailExist (email) {
      var bool = false
      for (var i = 0; i < this.participants.length; i++) {
        if (this.participants[i] === email) { bool = true }
      }
      return bool
    },
    addParticipants () {
      var email = this.participantEmail
      if (this.isEmail(email) && !this.isEmailExist(email)) {
        this.participants.push(email)
        this.participantEmail = ''
        this.createEmailStr()
      } else {
        this.emailEr = true
        setTimeout(() => {
          this.emailEr = false
        }, 2000)
      }
    },
    createEmailStr () {
      var emailStr = ''
      for (var i = 0; i < this.participants.length; i++) {
        if (i == 0) {
          emailStr = emailStr + this.participants[i]
        } else {
          emailStr = emailStr + ',' + this.participants[i]
        }
      }
      this.form.Invitees = emailStr
    },
    deleteParticipants (item) {
      var filteredAry = this.participants.filter(e => e !== item)
      this.participants = filteredAry
      this.createEmailStr()
    },
    onpartnerchange () {
      var partnerId = this.form.UserId
      axios
        .get('/portal/api/Customers/GetCustomerByID?id=' + partnerId)
        .then(response => {
          this.form.DefaultRoomId = response.data.defaultRoomId
          this.defaultroomId = response.data.defaultRoomId
          this.selectedPartnerName = response.data.givenName + ' ' + response.data.familyName
        })
    },
    getTimeZone (timeZone) {
      for (var Zone of this.timeZoneoptions) {
        if (Zone.text == timeZone) {
          return Zone.value
        }
      }
    },
    setMeetingTimes () {
      this.getPartner(JSON.parse(localStorage.getItem('userId'))).then(() => {
        this.showTimeZone = this.partnerStore.defaultTimezone
        this.form.Timezone = this.getTimeZone(this.partnerStore.defaultTimezone)
      })
      if (JSON.parse(localStorage.getItem('isUser')) == 'True') {
        this.form.UserId = JSON.parse(localStorage.getItem('userId'))
        this.onpartnerchange()
        this.isProviderDropDownDisabled = true
      }

      // if the current time is in between 8 Am and 5 pm -- do normal
      // else if the current time is grater than 5 pm and 11:59 pm -- add a day to the current date and set time to 9:00 AM
      // if the current time is grater than 12 AM and less than 8 am -- set the same date and set the time to 9:00
      var nowTime = new Date()// current time
      var todat8AM = new Date(moment().format('L') + ' ' + '8:00 AM')
      var today5PM = new Date(moment().format('L') + ' ' + '5:00 PM')
      var today1159PM = new Date(moment().format('L') + ' ' + '11:59 PM')
      var tommorow12AM = new Date(moment().format('L') + ' ' + '12:00 AM')

      if (todat8AM.getTime() < nowTime.getTime() && nowTime.getTime() < today5PM.getTime()) {
        var currentTimeInHrMin = this.setCurrentHour(new Date())
        var currentAMPM = this.setCurrentAMPM(new Date())
        this.selectedWhenTime = currentTimeInHrMin + ' ' + currentAMPM

        // set default meeting time
        var date = this.selectedDate
        var time = this.selectedWhenTime
        var AMPM = currentAMPM

        var temptime = date + ' ' + this.dateConvertTo24h(currentTimeInHrMin, AMPM)
        this.form.MeetingTime = this.setDateTimeToModel(temptime)
        console.log('this.form.MeetingTime :' + this.form.MeetingTime)
      } else if (today5PM.getTime() < nowTime.getTime() && nowTime.getTime() < today1159PM.getTime()) {
        this.selectedDate = moment().add(1, 'days').format('YYYY-MM-DD')
        this.selectedWhenTime = '9:00 AM'
        this.dateChange()
      } else if (tommorow12AM.getTime() < nowTime.getTime() && nowTime.getTime() < todat8AM) {
        this.selectedDate = moment().format('YYYY-MM-DD')
        this.selectedWhenTime = '9:00 AM'
        this.dateChange()
      }
      this.form.Duration = '00:15:00'
    }
  },
  mounted: function () {
    this.getPartners(JSON.parse(localStorage.getItem('organizationId'))).then(() => {
      for (var partner of this.storePartners) {
        var item = { text: partner.givenName + ' ' + partner.familyName, value: partner.id }
        this.options.push(item)
      }
    })
    // this.form.UserId = this.$route.params.id;
    var timezonesStr = { 'Pacific/Midway': '(GMT-11:00) Midway Island, Samoa', 'Pacific/Pago_Pago': '(GMT-11:00) Pago Pago', 'Pacific/Honolulu': '(GMT-10:00) Hawaii', 'America/Anchorage': '(GMT-8:00) Alaska', 'America/Juneau': '(GMT-8:00) Juneau', 'America/Vancouver': '(GMT-7:00) Vancouver', 'America/Los_Angeles': '(GMT-7:00) Pacific Time (US and Canada)', 'America/Tijuana': '(GMT-7:00) Tijuana', 'America/Phoenix': '(GMT-7:00) Arizona', 'America/Edmonton': '(GMT-6:00) Edmonton', 'America/Denver': '(GMT-6:00) Mountain Time (US and Canada)', 'America/Mazatlan': '(GMT-6:00) Mazatlan', 'America/Regina': '(GMT-6:00) Saskatchewan', 'America/Guatemala': '(GMT-6:00) Guatemala', 'America/El_Salvador': '(GMT-6:00) El Salvador', 'America/Managua': '(GMT-6:00) Managua', 'America/Costa_Rica': '(GMT-6:00) Costa Rica', 'America/Tegucigalpa': '(GMT-6:00) Tegucigalpa', 'America/Chihuahua': '(GMT-6:00) Chihuahua', 'America/Winnipeg': '(GMT-5:00) Winnipeg', 'America/Chicago': '(GMT-5:00) Central Time (US and Canada)', 'America/Mexico_City': '(GMT-5:00) Mexico City', 'America/Panama': '(GMT-5:00) Panama', 'America/Bogota': '(GMT-5:00) Bogota', 'America/Lima': '(GMT-5:00) Lima', 'America/Monterrey': '(GMT-5:00) Monterrey', 'America/Montreal': '(GMT-4:00) Montreal', 'America/New_York': '(GMT-4:00) Eastern Time (US and Canada)', 'America/Indianapolis': '(GMT-4:00) Indiana (East)', 'America/Puerto_Rico': '(GMT-4:00) Puerto Rico', 'America/Caracas': '(GMT-4:00) Caracas', 'America/Santiago': '(GMT-4:00) Santiago', 'America/La_Paz': '(GMT-4:00) La Paz', 'America/Guyana': '(GMT-4:00) Guyana', 'America/Halifax': '(GMT-3:00) Halifax', 'America/Montevideo': '(GMT-3:00) Montevideo', 'America/Araguaina': '(GMT-3:00) Recife', 'America/Argentina/Buenos_Aires': '(GMT-3:00) Buenos Aires, Georgetown', 'America/Sao_Paulo': '(GMT-3:00) Sao Paulo', 'Canada/Atlantic': '(GMT-3:00) Atlantic Time (Canada)', 'America/St_Johns': '(GMT-2:30) Newfoundland and Labrador', 'America/Godthab': '(GMT-2:00) Greenland', 'Atlantic/Cape_Verde': '(GMT-1:00) Cape Verde Islands', 'Atlantic/Azores': '(GMT+0:00) Azores', 'UTC': '(GMT+0:00) Universal Time UTC', 'Etc/Greenwich': '(GMT+0:00) Greenwich Mean Time', 'Atlantic/Reykjavik': '(GMT+0:00) Reykjavik', 'Africa/Nouakchott': '(GMT+0:00) Nouakchott', 'Europe/Dublin': '(GMT+1:00) Dublin', 'Europe/London': '(GMT+1:00) London', 'Europe/Lisbon': '(GMT+1:00) Lisbon', 'Africa/Casablanca': '(GMT+1:00) Casablanca', 'Africa/Bangui': '(GMT+1:00) West Central Africa', 'Africa/Algiers': '(GMT+1:00) Algiers', 'Africa/Tunis': '(GMT+1:00) Tunis', 'Europe/Belgrade': '(GMT+2:00) Belgrade, Bratislava, Ljubljana', 'CET': '(GMT+2:00) Sarajevo, Skopje, Zagreb', 'Europe/Oslo': '(GMT+2:00) Oslo', 'Europe/Copenhagen': '(GMT+2:00) Copenhagen', 'Europe/Brussels': '(GMT+2:00) Brussels', 'Europe/Berlin': '(GMT+2:00) Amsterdam, Berlin, Rome, Stockholm, Vienna', 'Europe/Amsterdam': '(GMT+2:00) Amsterdam', 'Europe/Rome': '(GMT+2:00) Rome', 'Europe/Stockholm': '(GMT+2:00) Stockholm', 'Europe/Vienna': '(GMT+2:00) Vienna', 'Europe/Luxembourg': '(GMT+2:00) Luxembourg', 'Europe/Paris': '(GMT+2:00) Paris', 'Europe/Zurich': '(GMT+2:00) Zurich', 'Europe/Madrid': '(GMT+2:00) Madrid', 'Africa/Harare': '(GMT+2:00) Harare, Pretoria', 'Europe/Warsaw': '(GMT+2:00) Warsaw', 'Europe/Prague': '(GMT+2:00) Prague Bratislava', 'Europe/Budapest': '(GMT+2:00) Budapest', 'Africa/Tripoli': '(GMT+2:00) Tripoli', 'Africa/Cairo': '(GMT+2:00) Cairo', 'Africa/Johannesburg': '(GMT+2:00) Johannesburg', 'Africa/Khartoum': '(GMT+2:00) Khartoum', 'Europe/Helsinki': '(GMT+3:00) Helsinki', 'Africa/Nairobi': '(GMT+3:00) Nairobi', 'Europe/Sofia': '(GMT+3:00) Sofia', 'Europe/Istanbul': '(GMT+3:00) Istanbul', 'Europe/Athens': '(GMT+3:00) Athens', 'Europe/Bucharest': '(GMT+3:00) Bucharest', 'Asia/Nicosia': '(GMT+3:00) Nicosia', 'Asia/Beirut': '(GMT+3:00) Beirut', 'Asia/Damascus': '(GMT+3:00) Damascus', 'Asia/Jerusalem': '(GMT+3:00) Jerusalem', 'Asia/Amman': '(GMT+3:00) Amman', 'Europe/Moscow': '(GMT+3:00) Moscow', 'Asia/Baghdad': '(GMT+3:00) Baghdad', 'Asia/Kuwait': '(GMT+3:00) Kuwait', 'Asia/Riyadh': '(GMT+3:00) Riyadh', 'Asia/Bahrain': '(GMT+3:00) Bahrain', 'Asia/Qatar': '(GMT+3:00) Qatar', 'Asia/Aden': '(GMT+3:00) Aden', 'Africa/Djibouti': '(GMT+3:00) Djibouti', 'Africa/Mogadishu': '(GMT+3:00) Mogadishu', 'Europe/Kiev': '(GMT+3:00) Kiev', 'Europe/Minsk': '(GMT+3:00) Minsk', 'Asia/Dubai': '(GMT+4:00) Dubai', 'Asia/Muscat': '(GMT+4:00) Muscat', 'Asia/Baku': '(GMT+4:00) Baku, Tbilisi, Yerevan', 'Asia/Tehran': '(GMT+4:30) Tehran', 'Asia/Kabul': '(GMT+4:30) Kabul', 'Asia/Yekaterinburg': '(GMT+5:00) Yekaterinburg', 'Asia/Tashkent': '(GMT+5:00) Islamabad, Karachi, Tashkent', 'Asia/Calcutta': '(GMT+5:30) India', 'Asia/Kolkata': '(GMT+5:30) Mumbai, Kolkata, New Delhi', 'Asia/Kathmandu': '(GMT+5:45) Kathmandu', 'Asia/Almaty': '(GMT+6:00) Almaty', 'Asia/Dacca': '(GMT+6:00) Dacca', 'Asia/Dhaka': '(GMT+6:00) Astana, Dhaka', 'Asia/Rangoon': '(GMT+6:30) Rangoon', 'Asia/Novosibirsk': '(GMT+7:00) Novosibirsk', 'Asia/Krasnoyarsk': '(GMT+7:00) Krasnoyarsk', 'Asia/Bangkok': '(GMT+7:00) Bangkok', 'Asia/Saigon': '(GMT+7:00) Vietnam', 'Asia/Jakarta': '(GMT+7:00) Jakarta', 'Asia/Irkutsk': '(GMT+8:00) Irkutsk, Ulaanbaatar', 'Asia/Shanghai': '(GMT+8:00) Beijing, Shanghai', 'Asia/Hong_Kong': '(GMT+8:00) Hong Kong SAR', 'Asia/Taipei': '(GMT+8:00) Taipei', 'Asia/Kuala_Lumpur': '(GMT+8:00) Kuala Lumpur', 'Asia/Singapore': '(GMT+8:00) Singapore', 'Australia/Perth': '(GMT+8:00) Perth', 'Asia/Yakutsk': '(GMT+9:00) Yakutsk', 'Asia/Seoul': '(GMT+9:00) Seoul', 'Asia/Tokyo': '(GMT+9:00) Osaka, Sapporo, Tokyo', 'Australia/Darwin': '(GMT+9:30) Darwin', 'Australia/Adelaide': '(GMT+9:30) Adelaide', 'Asia/Vladivostok': '(GMT+10:00) Vladivostok', 'Pacific/Port_Moresby': '(GMT+10:00) Guam, Port Moresby', 'Australia/Brisbane': '(GMT+10:00) Brisbane', 'Australia/Sydney': '(GMT+10:00) Canberra, Melbourne, Sydney', 'Australia/Hobart': '(GMT+10:00) Hobart', 'Asia/Magadan': '(GMT+11:00) Magadan', 'SST': '(GMT+11:00) Solomon Islands', 'Pacific/Noumea': '(GMT+11:00) New Caledonia', 'Asia/Kamchatka': '(GMT+12:00) Kamchatka', 'Pacific/Fiji': '(GMT+12:00) Fiji Islands, Marshall Islands', 'Pacific/Auckland': '(GMT+12:00) Auckland, Wellington', 'Pacific/Apia': '(GMT+13:00)Independent State of Samoa' }
    var hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08']
    var minutes = ['00', '15', '30', '45']
    var whenSelection = ['12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM', '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30']
    var meetingTimes = ['12:00 AM', '12:15 AM', '12:30 AM', '12:45 AM', '1:00 AM', '1:15 AM', '1:30 AM', '1:45 AM', '2:00 AM', '2:15 AM', '2:30 AM', '2:45 AM', '3:00 AM', '3:15 AM',
      '4:00 AM', '4:15 AM', '4:30 AM', '4:45 AM', '5:00 AM', '5:15 AM', '5:30 AM', '5:45 AM', '6:00 AM', '6:15 AM', '6:30 AM', '6:45 AM', '7:00 AM', '7:15 AM', '7:30 AM', '7:45 AM', '8:00 AM', '8:15 AM', '8:30 AM', '8:45 AM',
      '9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM', '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM',
      '1:00 PM', '1:15 PM', '1:30 PM', '1:45 PM', '2:00 PM', '2:15 PM', '2:30 PM', '2:45 PM', '3:00 PM', '3:15 PM', '3:30 PM', '3:45 PM', '4:00 PM', '4:15 PM', '4:30 PM', '4:45 PM', '5:00 PM',
      '5:15 PM', '5:30 PM', '5:45 PM', '6:00 PM', '6:15 PM', '6:30 PM', '6:45 PM', '7:00 PM', '7:15 PM', '7:30 PM', '7:45 PM', '8:00 PM', '8:15 PM', '8:30 PM', '8:45 PM', '9:00 PM', '9:15 PM', '9:30 PM', '9:45 PM',
      '10:00 PM', '10:15 PM', '10:30 PM', '10:45 PM', '11:00 PM', '11:15 PM', '11:30 PM', '11:45 PM'
    ]
    // load time zones
    for (var key in timezonesStr) {
      if (timezonesStr.hasOwnProperty(key)) {
        var element = {}
        element.value = key
        element.text = timezonesStr[key]
        this.timeZoneoptions.push(element)
      }
    }
    // load hours
    for (var key of hours) {
      var element = {}
      element.value = key
      element.text = key
      this.hoursoptions.push(element)
    }
    // load minutes
    for (var key of minutes) {
      var element = {}
      element.value = key
      element.text = key
      this.minitoptions.push(element)
    }
    // load whenTime
    for (var key of meetingTimes) {
      var element = {}
      element.value = key
      element.text = key
      this.whentimeoptions.push(element)
    }
    this.setMeetingTimes()
  }
}
</script>
<style>
  .addRedBoarder {
    border: 1px solid #e74a3b;
  }
  .errorMsg {
    font-size: 80%;
    color: #e74a3b;
  }
  .btnSubmit {
    background: #00AC4E 0% 0% no-repeat padding-box;
    border-radius: 7px;
    opacity: 1;
    border: none;
    float: right;
  }

  .btnCancel {
    border-radius: 7px;
    opacity: 1;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }

  .avator {
    position: relative;
    background: #ececec;
    min-width: 131px;
    padding: 2px;
    border-radius: 30px;
    float: left;
    margin-left: 5px;
    height: 30px;
    margin-top: 5px;
  }

  .mainDiv {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    margin-top: 5px;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 10px;
    padding-top: 5px;
    position: relative;
  }

  .outerDiv {
    background: #FFFFFF;
    position: relative;
  }

  .inputLabels {
    font: Bold 12px/22px Lato;
    text-align: left;
    letter-spacing: 0px;
    opacity: 1;

  }

  .textInputs {
    text-align: left;
    letter-spacing: 0.2px;
    opacity: 1;
    margin-left: 0px;
  }

  .radioInput {
    border: 1px solid #707070;
  }
  .selectBoxFont {
    color: #01151C;
    font-weight: bold;
    font-size: 12px
  }
  .b-sidebar-body {
    background:white
  }

  .form-group label {
    margin:0px
  }

  .selected {
    color: #4285f4 !important;
  }

  .div-table {
    display: table;
    width: 370px;
    border: 1px solid #d2cece;
    border-spacing: 5px; /* cellspacing:poor IE support for  this */
    border-radius: 10px;
  }

  .div-table-row {
    display: table-row;
    border: 2px solid #d2cece;
  }

  /* This is the checked state */
  .custom-radio .custom-control-input:checked ~ .custom-control-label::before,
  .custom-radio .custom-control-input:checked ~ .custom-control-label::after {
    background-color: #00AC4E; /* green */
    /* this bg image SVG is just a white circle, you can replace it with any valid SVG code */
    background-image: url(data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23fff'/%3E%3C/svg%3E);
    border-radius: 50%;
  }

  /* active state i.e. displayed while the mouse is being pressed down */
  .custom-radio .custom-control-input:active ~ .custom-control-label::before {
    color: #fff;
    background-color: #00AC4E; /* red */
  }

  /* the shadow; displayed while the element is in focus */
  .custom-radio .custom-control-input:focus ~ .custom-control-label::before {
    box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(255, 123, 255, 0.25); /* pink, 25% opacity */
  }

  .selected {
    color: #00AC4E
  }

  .isPartnerShoe {
      display:none
  }

</style>
