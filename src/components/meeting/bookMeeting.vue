<template>
  <div>
    <b-container class="mt-3" fluid style="padding:0px; padding:34px">
      <b-row>
        <b-col cols="12" sm="12" md="12" lg="4" xl="3">
          <p style="margin-top: 10px; color: #01151C; font-size: 19px; font-weight: bold;">{{displayMonth}}</p>
        </b-col>
        <b-col cols="12" sm="12" md="12" lg="4" xl="4">
          <div>
            <b-form-group label="" label-for="ratio" label-cols-md="auto" class="mb-3">
              <div id="div1" style="z-index:3">
                <b-form-input v-model="selectedDate" disabled id="example-datepicker" type="text" class="mb-2 dateTextInput"> </b-form-input>
                <div class="calandarIcon">
                  <b-icon icon="calendar3" aria-hidden="true" @click="showDatePicker"></b-icon>
                </div>
                <div class="iconRight">
                  <b-icon icon="chevron-right" aria-hidden="true" @click="AddDate"></b-icon>
                </div>
                <div class="iconLeft">
                  <b-icon icon="chevron-left" aria-hidden="true" @click="subDate"></b-icon>
                </div>
              </div>
              <div id="div2" class="datePickerDiv">
                <datepicker @selected="dateSelected" v-model="selecteDatePicker" class="date" ref="datepick"></datepicker>
              </div>
            </b-form-group>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="6" lg="4" xl="1" v-for="item in days" v-bind:key="item.day" style="min-width:100px">
          <b-row>
            <b-col>
              <b-row>
                <b-col>
                  <p style="color:#566165;font-weight:bold; padding:0px;margin:0px; font-size:16px">
                    {{item.dayName}}
                  </p>
                </b-col>
                <div class="w-100"></div>
                <b-col>
                  <p style="float: left;width:30px; color: #01151C; font-weight: bold; padding: 0px; margin: 0px; font-size: 25px">
                    {{item.day}}
                  </p>
                  <div v-if="item.isToday" style="background:#00AC4E;width: 41px; float:right;border-radius: 7px 0px 0px 7px;margin-top: 12px;">
                    <p style="text-align:center; color:#F7F9F9;font-size:10px;font-weight:bold; margin:0px;">Today</p>
                  </div>
                </b-col>
              </b-row>
            </b-col>
            <div class="w-100"></div>
            <b-col>
              <b-row v-for="time in item.times" v-bind:key="time.time">
                <b-col class="mt-2" @click="bookMeetingClick(item,time)">
                  <div v-bind:class="{ active: !getIsActiveDisable(item,time), timeDiv: getIsActiveDisable(item,time) , isClicked: time.isClicked }">
                    <p style="margin:0px;text-align:center;position:relative;margin-top: 4px;">{{time.time}}</p>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <button v-b-toggle.sidebar-right-book ref="createMeeting" hidden> click</button>

    <meetingCreateSidebar @meetingCofrimation="showMeeingConfirmation($event)" ref="meetingCreateSidebar" @closeSideBar="closeSidebar()" @closeBookMeeting="closeBookMeeting"/>

    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#confirmMeetingAdd" hidden ref="confirmMeetingAdd">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div data-backdrop="static" data-keyboard="false" class="modal fade" id="confirmMeetingAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="width:84% !important;margin-left:auto;margin-right:auto">
          <div class="modal-body" style="padding: 2rem; padding-bottom: 4rem;">
            <meetingConfirmation ref="meetingConfirmation"/>
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
import Datepicker from 'vuejs-datepicker'
import { BIcon, BIconCalendar3, BIconChevronLeft, BIconChevronRight } from 'bootstrap-vue'
import meetingCreateSidebar from './meeting-sub-components//meetingCreateSidebar.vue'
import meetingConfirmation from '../models/meetingConfirmation.vue'
var moment = require('moment')
export default {
  components: {
    Datepicker,
    BIcon,
    BIconCalendar3,
    BIconChevronLeft,
    BIconChevronRight,
    meetingCreateSidebar,
    meetingConfirmation
  },
  data () {
    return {
      selectedTime: null,
      isSidebarOpen: false,
      displayMonth: '',
      selectedDate: '',
      selecteDatePicker: new Date(),
      days: []
    }
  },
  methods: {
    closeBookMeeting () {
      if (this.selectedTime != null) {
        this.selectedTime.isClicked = false
        this.isSidebarOpen = false
      }
    },
    showDatePicker () {
      this.$refs.datepick.showCalendar()
    },
    closeSidebar () {
      if (this.selectedTime != null) {
        this.selectedTime.isClicked = false
        this.isSidebarOpen = false
      }
      this.$refs.meetingCreateSidebar.openMeetingCreateSideBar()
    },
    dateSelected (date) {
      this.createDatesObject(date)
    },
    AddDate () {
      this.selecteDatePicker = moment(this.selecteDatePicker).add(7, 'days').toDate()
      this.createDatesObject(this.selecteDatePicker)
    },
    subDate () {
      this.selecteDatePicker = moment(this.selecteDatePicker).subtract(7, 'days').toDate()
      this.createDatesObject(this.selecteDatePicker)
    },
    bubbleSort (a, par) {
      var swapped
      do {
        swapped = false
        for (var i = 0; i < a.length - 1; i++) {
          if (a[i][par] > a[i + 1][par]) {
            var temp = a[i]
            a[i] = a[i + 1]
            a[i + 1] = temp
            swapped = true
          }
        }
      } while (swapped)
      return a
    },
    getIsActiveDisable (day, time) {
      var date = moment(day.dateObj).format('L') + ' ' + time.time
      var currentDateTime = new Date()
      var thisDate = new Date(date)

      if (thisDate < currentDateTime) {
        return false
      } else {
        return true
      }
    },
    createDatesObject (date) {
      // set displayMonth
      // get the current date
      // get the day find the day
      // have to for loops to add days (less than and greate)
      // sort the array by the date

      var tempDateArr = []

      var todayNumber = date.getDay()
      var todayDateName = moment(date).format('dddd')
      var todayDate = moment(date).format('DD')
      var dateObject = date

      console.log(date.getTime())
      console.log(new Date().getTime())

      var arrObj = {
        'day': todayDate,
        'dayName': todayDateName,
        'isToday': moment(date).format('l') === moment(new Date()).format('l'),
        'dateObj': dateObject,
        'todayNumber': todayNumber,
        'times': [
          { 'time': '9:00 AM', 'isClicked': false, 'isDisabled': false },
          { 'time': '9:15 AM', 'isClicked': false, 'isDisabled': false },
          { 'time': '9:30 AM', 'isClicked': false, 'isDisabled': false },
          { 'time': '9:45 AM', 'isClicked': false, 'isDisabled': false },
          { 'time': '10:00 AM', 'isClicked': false, 'isDisabled': false },
          { 'time': '10:15 AM', 'isClicked': false, 'isDisabled': false },
          { 'time': '10:30 AM', 'isClicked': false, 'isDisabled': false },
          { 'time': '11:00 AM', 'isClicked': false, 'isDisabled': false },
          { 'time': '11:15 AM', 'isClicked': false, 'isDisabled': false },
          { 'time': '11:30 AM', 'isClicked': false, 'isDisabled': false },
          { 'time': '11:45 AM', 'isClicked': false, 'isDisabled': false },
          { 'time': '12:00 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '12:15 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '12:30 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '12:45 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '1:00 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '1:15 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '1:30 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '1:45 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '2:00 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '2:15 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '2:30 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '2:45 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '3:00 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '3:15 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '3:30 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '3:45 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '4:00 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '4:15 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '4:30 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '4:45 PM', 'isClicked': false, 'isDisabled': false },
          { 'time': '5:00 PM', 'isClicked': false, 'isDisabled': false }
        ]
      }

      tempDateArr.push(arrObj)

      // add less dates
      var numberOfDatesToSubstract = 0
      for (var i = todayNumber - 1; i >= 0; i--) {
        numberOfDatesToSubstract++
        var tempDate = moment(date).subtract(numberOfDatesToSubstract, 'days').toDate()
        var todayNumberLes = tempDate.getDay()
        var todayDateNameLes = moment(tempDate).format('dddd')
        var todayDateLes = moment(tempDate).format('DD')

        var arrObjTemp = {
          'day': todayDateLes,
          'dayName': todayDateNameLes,
          'isToday': moment(tempDate).format('l') === moment(new Date()).format('l'),
          'dateObj': tempDate,
          'todayNumber': todayNumberLes,
          'times': [
            { 'time': '9:00 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '9:15 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '9:30 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '9:45 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '10:00 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '10:15 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '10:30 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '11:00 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '11:15 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '11:30 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '11:45 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '12:00 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '12:15 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '12:30 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '12:45 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '1:00 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '1:15 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '1:30 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '1:45 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '2:00 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '2:15 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '2:30 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '2:45 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '3:00 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '3:15 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '3:30 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '3:45 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '4:00 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '4:15 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '4:30 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '4:45 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '5:00 PM', 'isClicked': false, 'isDisabled': false }
          ]
        }

        tempDateArr.push(arrObjTemp)
      }

      // add greater dates
      var numberOfDatesToAdd = 0
      for (var i = todayNumber + 1; i < 7; i++) {
        numberOfDatesToAdd++
        var tempDateG = moment(date).add(numberOfDatesToAdd, 'days').toDate()
        var todayNumberG = tempDateG.getDay()
        var todayDateNameG = moment(tempDateG).format('dddd')
        var todayDateG = moment(tempDateG).format('DD')

        var arrObjTemp = {
          'day': todayDateG,
          'dayName': todayDateNameG,
          'isToday': moment(tempDateG).format('l') === moment(new Date()).format('l'),
          'dateObj': tempDateG,
          'todayNumber': todayNumberG,
          'times': [
            { 'time': '9:00 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '9:15 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '9:30 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '9:45 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '10:00 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '10:15 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '10:30 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '11:00 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '11:15 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '11:30 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '11:45 AM', 'isClicked': false, 'isDisabled': false },
            { 'time': '12:00 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '12:15 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '12:30 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '12:45 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '1:00 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '1:15 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '1:30 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '1:45 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '2:00 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '2:15 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '2:30 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '2:45 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '3:00 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '3:15 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '3:30 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '3:45 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '4:00 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '4:15 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '4:30 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '4:45 PM', 'isClicked': false, 'isDisabled': false },
            { 'time': '5:00 PM', 'isClicked': false, 'isDisabled': false }
          ]
        }
        tempDateArr.push(arrObjTemp)
      }

      this.days = this.bubbleSort(tempDateArr, 'todayNumber')

      // set displayMonth
      var firstMonth = moment(this.days[0]['dateObj']).format('MMMM')
      var secondMoth = moment(this.days[6]['dateObj']).format('MMMM')
      var firstYear = moment(this.days[0]['dateObj']).format('YYYY')
      var secondYear = moment(this.days[6]['dateObj']).format('YYYY')
      if (firstYear == secondYear) {
        if (firstMonth == secondMoth) {
          this.displayMonth = firstMonth + ' ' + firstYear
        } else {
          this.displayMonth = firstMonth + ',' + secondMoth + ' ' + firstYear
        }
      } else {
        this.displayMonth = firstMonth + ' ' + firstYear + ' , ' + secondMoth + ' ' + secondYear
      }

      // set DisplayDate
      var firstDate = moment(this.days[0]['dateObj']).format('DD')
      var secondDate = moment(this.days[6]['dateObj']).format('DD')
      var firstMoth = moment(this.days[0]['dateObj']).format('MMMM')
      var secondMonth = moment(this.days[6]['dateObj']).format('MMMM')

      if (firstMoth == secondMonth) {
        this.selectedDate = firstDate + ' - ' + secondDate + ' ' + firstMoth
      } else {
        this.selectedDate = firstDate + ' ' + firstMoth + ' - ' + secondDate + ' ' + secondMonth
      }
    },
    showMeeingConfirmation (meeting) {
      this.$refs.meetingCreateSidebar.openMeetingCreateSideBar()

      this.$refs.meetingConfirmation.setModelValues(meeting)
      this.$refs.confirmMeetingAdd.click()

      if (this.selectedTime != null) {
        this.selectedTime.isClicked = false
        this.isSidebarOpen = false
      }
    },
    bookMeetingClick (day, time) {
      var date = moment(day.dateObj).format('L') + ' ' + time.time
      var currentDateTime = new Date()
      var thisDate = new Date(date)

      if (thisDate > currentDateTime) {
        if (!this.isSidebarOpen) {
          this.isSidebarOpen = true
          this.$refs.meetingCreateSidebar.openMeetingCreateSideBar()
          // this.$refs.createMeeting.click();
        }

        if (this.selectedTime != null) {
          this.selectedTime.isClicked = false
        }

        this.selectedTime = time
        this.selectedTime.isClicked = true
        this.$refs.meetingCreateSidebar.onReset()
        this.$refs.meetingCreateSidebar.bookMeeting(day, time.time)
      }
    },
    isHidden () {
      this.isSidebarOpen = false
    }
  },
  computed: {},
  mounted: function () {
    this.$ga.page('/portal/bookmeeting')
    this.createDatesObject(new Date())
  }
}

</script>

<style scoped>
  .date {

  }
  .dateTextInput {
    background: white;
    color: #01151C;
    font-weight:bold
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
  .datePickerDiv {
    float: left;
    position: relative;
  }
  .datePickerDiv >>> input {
    border: none;
    background: transparent;
    color:transparent;
    display:none
  }
  .timeDiv{
    color: #01151C;
    padding: 6px;
    background: #FFFFFF;
    border: 1px solid #00AC4E;
    border-radius: 10px;
    font-weight: bold;
    font-size: 13px;
    height:40px
  }
  .timeDiv:hover {
    color: #FFFFFF;
    background: #00AC4E;
    cursor:pointer
  }
  .active {
    color: #566165;
    padding: 6px;
    background: rgba(207, 222, 230, 0.424);
    border: 1px solid #566165;
    border-radius: 10px;
    font-weight: bold;
    font-size: 13px;
    height: 40px;
    cursor:not-allowed
  }
  .isClicked {
    color: #FFFFFF;
    background: #00AC4E;
    cursor: pointer
  }
</style>
