<template>
  <div class="row">
    <div class="col-md-6 ml-5 mt-3">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Topic" label-for="input-1">
          <b-form-input id="input-1" v-model="form.Topic" type="text" required placeholder="Enter Topic"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Meeting Time" label-for="input-2">
          <div class="col d-flex flex-row p-0">
            <b-form-input id="example-datepicker" type="date" @input="dateChange" v-model="selectedDate" class="mb-2"></b-form-input>
            <b-form-select class="ml-3" v-model="selectedWhenTime" @input="dateChange" :options="whentimeoptions"></b-form-select>
            <b-form-select class="ml-3" v-model="selectedAmPm" :options="ampmoptions" @input="dateChange"></b-form-select>
          </div>
          <div class="col p-0">
            <label v-if="dateError" style="color:#c90a14;">Start time is earlier than the current time</label>
          </div>
        </b-form-group>
        <b-form-group id="input-group-2" label="Duaration" label-for="input-2">
          <div class="col d-flex flex-row p-0">
            <b-form-select v-model="selectedHour" :options="hoursoptions" @input="onDurationChange"></b-form-select>
            <b-form-select class="ml-3" v-model="selectedMin" :options="minitoptions" @input="onDurationChange"></b-form-select>
          </div>
          <div class="col p-0">
            <label v-if="durationError" style="color:#c90a14;">Please check the selected duration</label>
          </div>
        </b-form-group>
        <b-form-group id="input-group-3" label="Time Zone" label-for="input-3">
          <b-form-select v-model="form.Timezone" :options="timeZoneoptions"></b-form-select>
        </b-form-group>
        <b-form-group id="input-group-3" label-for="input-3">
          <b-form-checkbox id="checkbox-1" v-model="form.IsDefaultRoomId"  name="checkbox-1" value="true" unchecked-value="false">
            Use personal meeting room
          </b-form-checkbox>
        </b-form-group>
        <b-form-group id="input-group-2" label="Add Participants" label-for="input-2">
          <div class="col d-flex flex-row p-0">
            <b-form-input id="input-1" v-model="participantEmail" type="text" placeholder="Enter Email"></b-form-input>
            <b-button class="ml-3" variant="outline-primary" @click="addParticipants()">Add</b-button>
          </div>
          <div class="col mt-3">
            <label id="emailEr" v-if="emailEr" style="color:#c90a14; margin-left:-15px" class="p-0">Please check the email</label>
            <div class="row" id="participantsDiv" v-if="participants" style="background: #fcfcfc;border: 1px solid #ececec;border-radius: 6px; min-height:100px;max-height:200px; overflow-y:auto">
              <div id="avator" class="avator" v-for="item in participants" v-bind:key="item">
                <label class="vaerotLbl">{{item}}</label>
                <b-icon-x-square-fill aria-hidden="true" @click="deleteParticipants(item)"></b-icon-x-square-fill>
              </div>
            </div>
          </div>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Back to List</b-button>
      </b-form>
  </div>
  </div>
</template>

<style>
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
</style>

<script>
import { BIcon, BIconArrowUp, BIconArrowDown, BIconXSquareFill } from 'bootstrap-vue'
import axios from 'axios'
export default {
  components: {
    BIcon,
    BIconArrowUp,
    BIconArrowDown,
    BIconXSquareFill

  },
  data () {
    return {
      participantEmail: '',
      participants: [],
      durationError: false,
      dateError: false,
      emailEr: false,
      selectedDate: new Date().toISOString().slice(0, 10),
      selectedWhenTime: '12:00',
      selectedAmPm: 'AM',
      selectedHour: '01',
      selectedMin: '00',
      timeZoneoptions: [],
      hoursoptions: [],
      minitoptions: [],
      whentimeoptions: [],
      testTime: '',
      ampmoptions: [
        { value: 'AM', text: 'AM' },
        { value: 'PM', text: 'PM' }
      ],
      form: {
        Topic: 'My Meeting',
        MeetingTime: '',
        Duration: '',
        Timezone: 'America/New_York',
        Invitees: '',
        IsDefaultRoomId: false,
        UserId: ''

      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()

      if (this.form.IsDefaultRoomId == 'true') {
        this.form.IsDefaultRoomId = true
      } else if (this.form.IsDefaultRoomId == 'false' || this.form.IsDefaultRoomId == false) {
        this.form.IsDefaultRoomId = false
      }

      axios
        .post('/portal/api/Meetings', this.form)
        .then((response) => {
          this.$router.push({ path: '/portal/meetings/' + this.form.UserId })
        })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.$router.push({ path: '/portal/meetings/' + this.form.UserId })
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
      var ampm = hours >= 12 ? 'PM' : 'AM'
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
      if (hours < 10) sHours = '0' + sHours
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
      var date = this.selectedDate
      var time = this.selectedWhenTime
      var AMPM = this.selectedAmPm

      var temptime = date + ' ' + this.dateConvertTo24h(time, AMPM)
      var toDate = new Date()
      var currentDate = new Date(temptime)

      if (currentDate.getTime() < toDate.getTime()) {
        this.dateError = true
        setTimeout(() => {
          this.dateError = false
          this.selectedDate = new Date().toISOString().slice(0, 10)
          this.selectedWhenTime = this.setCurrentHour(new Date())
          this.selectedAmPm = this.setCurrentAMPM(new Date())
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
        this.durationError = true
        setTimeout(() => {
          this.durationError = false
          this.selectedHour = '01'
          this.selectedMin = '00'
          this.form.Duration = this.selectedHour + this.selectedMin + sec
        }, 2000)
      } else {
        this.form.Duration = hr + ':' + min + sec
      }
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
    }
  },
  mounted: function () {
    this.$ga.page('/portal/createmeeting')

    this.form.UserId = this.$route.params.id

    var timezonesStr = { 'Pacific/Midway': '(GMT-11:00) Midway Island, Samoa', 'Pacific/Pago_Pago': '(GMT-11:00) Pago Pago', 'Pacific/Honolulu': '(GMT-10:00) Hawaii', 'America/Anchorage': '(GMT-8:00) Alaska', 'America/Juneau': '(GMT-8:00) Juneau', 'America/Vancouver': '(GMT-7:00) Vancouver', 'America/Los_Angeles': '(GMT-7:00) Pacific Time (US and Canada)', 'America/Tijuana': '(GMT-7:00) Tijuana', 'America/Phoenix': '(GMT-7:00) Arizona', 'America/Edmonton': '(GMT-6:00) Edmonton', 'America/Denver': '(GMT-6:00) Mountain Time (US and Canada)', 'America/Mazatlan': '(GMT-6:00) Mazatlan', 'America/Regina': '(GMT-6:00) Saskatchewan', 'America/Guatemala': '(GMT-6:00) Guatemala', 'America/El_Salvador': '(GMT-6:00) El Salvador', 'America/Managua': '(GMT-6:00) Managua', 'America/Costa_Rica': '(GMT-6:00) Costa Rica', 'America/Tegucigalpa': '(GMT-6:00) Tegucigalpa', 'America/Chihuahua': '(GMT-6:00) Chihuahua', 'America/Winnipeg': '(GMT-5:00) Winnipeg', 'America/Chicago': '(GMT-5:00) Central Time (US and Canada)', 'America/Mexico_City': '(GMT-5:00) Mexico City', 'America/Panama': '(GMT-5:00) Panama', 'America/Bogota': '(GMT-5:00) Bogota', 'America/Lima': '(GMT-5:00) Lima', 'America/Monterrey': '(GMT-5:00) Monterrey', 'America/Montreal': '(GMT-4:00) Montreal', 'America/New_York': '(GMT-4:00) Eastern Time (US and Canada)', 'America/Indianapolis': '(GMT-4:00) Indiana (East)', 'America/Puerto_Rico': '(GMT-4:00) Puerto Rico', 'America/Caracas': '(GMT-4:00) Caracas', 'America/Santiago': '(GMT-4:00) Santiago', 'America/La_Paz': '(GMT-4:00) La Paz', 'America/Guyana': '(GMT-4:00) Guyana', 'America/Halifax': '(GMT-3:00) Halifax', 'America/Montevideo': '(GMT-3:00) Montevideo', 'America/Araguaina': '(GMT-3:00) Recife', 'America/Argentina/Buenos_Aires': '(GMT-3:00) Buenos Aires, Georgetown', 'America/Sao_Paulo': '(GMT-3:00) Sao Paulo', 'Canada/Atlantic': '(GMT-3:00) Atlantic Time (Canada)', 'America/St_Johns': '(GMT-2:30) Newfoundland and Labrador', 'America/Godthab': '(GMT-2:00) Greenland', 'Atlantic/Cape_Verde': '(GMT-1:00) Cape Verde Islands', 'Atlantic/Azores': '(GMT+0:00) Azores', 'UTC': '(GMT+0:00) Universal Time UTC', 'Etc/Greenwich': '(GMT+0:00) Greenwich Mean Time', 'Atlantic/Reykjavik': '(GMT+0:00) Reykjavik', 'Africa/Nouakchott': '(GMT+0:00) Nouakchott', 'Europe/Dublin': '(GMT+1:00) Dublin', 'Europe/London': '(GMT+1:00) London', 'Europe/Lisbon': '(GMT+1:00) Lisbon', 'Africa/Casablanca': '(GMT+1:00) Casablanca', 'Africa/Bangui': '(GMT+1:00) West Central Africa', 'Africa/Algiers': '(GMT+1:00) Algiers', 'Africa/Tunis': '(GMT+1:00) Tunis', 'Europe/Belgrade': '(GMT+2:00) Belgrade, Bratislava, Ljubljana', 'CET': '(GMT+2:00) Sarajevo, Skopje, Zagreb', 'Europe/Oslo': '(GMT+2:00) Oslo', 'Europe/Copenhagen': '(GMT+2:00) Copenhagen', 'Europe/Brussels': '(GMT+2:00) Brussels', 'Europe/Berlin': '(GMT+2:00) Amsterdam, Berlin, Rome, Stockholm, Vienna', 'Europe/Amsterdam': '(GMT+2:00) Amsterdam', 'Europe/Rome': '(GMT+2:00) Rome', 'Europe/Stockholm': '(GMT+2:00) Stockholm', 'Europe/Vienna': '(GMT+2:00) Vienna', 'Europe/Luxembourg': '(GMT+2:00) Luxembourg', 'Europe/Paris': '(GMT+2:00) Paris', 'Europe/Zurich': '(GMT+2:00) Zurich', 'Europe/Madrid': '(GMT+2:00) Madrid', 'Africa/Harare': '(GMT+2:00) Harare, Pretoria', 'Europe/Warsaw': '(GMT+2:00) Warsaw', 'Europe/Prague': '(GMT+2:00) Prague Bratislava', 'Europe/Budapest': '(GMT+2:00) Budapest', 'Africa/Tripoli': '(GMT+2:00) Tripoli', 'Africa/Cairo': '(GMT+2:00) Cairo', 'Africa/Johannesburg': '(GMT+2:00) Johannesburg', 'Africa/Khartoum': '(GMT+2:00) Khartoum', 'Europe/Helsinki': '(GMT+3:00) Helsinki', 'Africa/Nairobi': '(GMT+3:00) Nairobi', 'Europe/Sofia': '(GMT+3:00) Sofia', 'Europe/Istanbul': '(GMT+3:00) Istanbul', 'Europe/Athens': '(GMT+3:00) Athens', 'Europe/Bucharest': '(GMT+3:00) Bucharest', 'Asia/Nicosia': '(GMT+3:00) Nicosia', 'Asia/Beirut': '(GMT+3:00) Beirut', 'Asia/Damascus': '(GMT+3:00) Damascus', 'Asia/Jerusalem': '(GMT+3:00) Jerusalem', 'Asia/Amman': '(GMT+3:00) Amman', 'Europe/Moscow': '(GMT+3:00) Moscow', 'Asia/Baghdad': '(GMT+3:00) Baghdad', 'Asia/Kuwait': '(GMT+3:00) Kuwait', 'Asia/Riyadh': '(GMT+3:00) Riyadh', 'Asia/Bahrain': '(GMT+3:00) Bahrain', 'Asia/Qatar': '(GMT+3:00) Qatar', 'Asia/Aden': '(GMT+3:00) Aden', 'Africa/Djibouti': '(GMT+3:00) Djibouti', 'Africa/Mogadishu': '(GMT+3:00) Mogadishu', 'Europe/Kiev': '(GMT+3:00) Kiev', 'Europe/Minsk': '(GMT+3:00) Minsk', 'Asia/Dubai': '(GMT+4:00) Dubai', 'Asia/Muscat': '(GMT+4:00) Muscat', 'Asia/Baku': '(GMT+4:00) Baku, Tbilisi, Yerevan', 'Asia/Tehran': '(GMT+4:30) Tehran', 'Asia/Kabul': '(GMT+4:30) Kabul', 'Asia/Yekaterinburg': '(GMT+5:00) Yekaterinburg', 'Asia/Tashkent': '(GMT+5:00) Islamabad, Karachi, Tashkent', 'Asia/Calcutta': '(GMT+5:30) India', 'Asia/Kolkata': '(GMT+5:30) Mumbai, Kolkata, New Delhi', 'Asia/Kathmandu': '(GMT+5:45) Kathmandu', 'Asia/Almaty': '(GMT+6:00) Almaty', 'Asia/Dacca': '(GMT+6:00) Dacca', 'Asia/Dhaka': '(GMT+6:00) Astana, Dhaka', 'Asia/Rangoon': '(GMT+6:30) Rangoon', 'Asia/Novosibirsk': '(GMT+7:00) Novosibirsk', 'Asia/Krasnoyarsk': '(GMT+7:00) Krasnoyarsk', 'Asia/Bangkok': '(GMT+7:00) Bangkok', 'Asia/Saigon': '(GMT+7:00) Vietnam', 'Asia/Jakarta': '(GMT+7:00) Jakarta', 'Asia/Irkutsk': '(GMT+8:00) Irkutsk, Ulaanbaatar', 'Asia/Shanghai': '(GMT+8:00) Beijing, Shanghai', 'Asia/Hong_Kong': '(GMT+8:00) Hong Kong SAR', 'Asia/Taipei': '(GMT+8:00) Taipei', 'Asia/Kuala_Lumpur': '(GMT+8:00) Kuala Lumpur', 'Asia/Singapore': '(GMT+8:00) Singapore', 'Australia/Perth': '(GMT+8:00) Perth', 'Asia/Yakutsk': '(GMT+9:00) Yakutsk', 'Asia/Seoul': '(GMT+9:00) Seoul', 'Asia/Tokyo': '(GMT+9:00) Osaka, Sapporo, Tokyo', 'Australia/Darwin': '(GMT+9:30) Darwin', 'Australia/Adelaide': '(GMT+9:30) Adelaide', 'Asia/Vladivostok': '(GMT+10:00) Vladivostok', 'Pacific/Port_Moresby': '(GMT+10:00) Guam, Port Moresby', 'Australia/Brisbane': '(GMT+10:00) Brisbane', 'Australia/Sydney': '(GMT+10:00) Canberra, Melbourne, Sydney', 'Australia/Hobart': '(GMT+10:00) Hobart', 'Asia/Magadan': '(GMT+11:00) Magadan', 'SST': '(GMT+11:00) Solomon Islands', 'Pacific/Noumea': '(GMT+11:00) New Caledonia', 'Asia/Kamchatka': '(GMT+12:00) Kamchatka', 'Pacific/Fiji': '(GMT+12:00) Fiji Islands, Marshall Islands', 'Pacific/Auckland': '(GMT+12:00) Auckland, Wellington', 'Pacific/Apia': '(GMT+13:00)Independent State of Samoa' }
    var hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
    var minutes = ['00', '15', '30', '45']
    var whenSelection = ['12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30']

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
    for (var key of whenSelection) {
      var element = {}
      element.value = key
      element.text = key
      this.whentimeoptions.push(element)
    }

    this.selectedWhenTime = this.setCurrentHour(new Date())
    this.selectedAmPm = this.setCurrentAMPM(new Date())

    // set default meeting time
    var date = this.selectedDate
    var time = this.selectedWhenTime
    var AMPM = this.selectedAmPm

    var temptime = date + ' ' + this.dateConvertTo24h(time, AMPM)
    this.form.MeetingTime = this.setDateTimeToModel(temptime)
    this.form.Duration = '01:00:00'
  },
  computed: {
  }
}
</script>
