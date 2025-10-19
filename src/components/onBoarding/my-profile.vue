<!--You can use this as a starting template-->
<template>
  <b-container class="main-container">
    <b-row>
      <b-col>
        <p class="heading-p">Decide how you’ll look on Stuttie</p>
        <div class="w-100"></div>
        <p class="sub-heading-p">You can always update this later in Settings.</p>
      </b-col>
    </b-row>
    <b-progress :value="value" :max="max" show-progress animated></b-progress>
    <div class="middle-div">
      <div class="container bootstrap snippets bootdey">
        <b-form @submit="UpdateProfile" @reset="">
          <div class="row">
            <!-- left column -->
            <div class="col-md-3">
              <div class="text-center">
                <div class="img-div">
                  <b-img center :src="imageFound ? dbImgURL: selectedImgURL" blank-color="blue" class="rounded-circle" fluid data-toggle="modal" data-target="#imageCropModalOrg" @error="imgError" ref="imageRef"></b-img>
                  <p style="font-weight:bold;text-align:center">Profile Picture</p>
                </div>
              </div>
            </div>
            <!-- edit form column -->
            <div class="col-md-9 personal-info">
              <form class="form-horizontal" role="form">
                <b-form-group style="margin-left:40px; margin-top:20px" id="input-group-1" class="input-label" label-for="input-1" :class="{invalid: $v.StuttieAddress.$error}">
                  <label class="input-label">Handle <span style="font-size:12px;color:#546064;">(meet.stuttie.com/{{StuttieAddress}})</span></label>
                  <b-form-input class="input-class" id="input-1" v-model="$v.StuttieAddress.$model" @blur="$v.StuttieAddress.$touch()" :class="{'is-invalid':$v.StuttieAddress.$error}" type="text" placeholder="meet.stuttie.com/"></b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.StuttieAddress.required">Please enter Stuttie address</span>
                    <span v-if="!$v.StuttieAddress.isUnique">Sorry, this room address already taken</span>
                  </div>
                </b-form-group>
                <b-form-group style="margin-left:40px; margin-top:20px" id="input-group-1" class="input-label" label="Name" label-for="input-1" :class="{invalid: $v.orgName.$error}">
                  <b-form-input class="input-class" id="input-1" v-model="$v.orgName.$model" @blur="$v.orgName.$touch()" :class="{'is-invalid':$v.orgName.$error}" type="text" placeholder="Enter your full name"></b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.orgName.required">Please enter your full name</span>
                  </div>
                </b-form-group>
                <b-form-group style="margin-left:40px; margin-top:20px" id="input-group-1" class="input-label" label="Hourly Rate (USD)" label-for="input-1" :class="{invalid: $v.hourlyRate.$error}" v-show="store.company.isTutor">
                  <b-form-input class="input-class" id="input-1" v-model="$v.hourlyRate.$model" @blur="$v.hourlyRate.$touch()" :class="{'is-invalid':$v.hourlyRate.$error}" type="text" placeholder="10.00"></b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.orgName.required">Please enter your hourly rate</span>
                  </div>
                </b-form-group>
                <b-row data-toggle="modal" data-target="#countryModalProfile">
                  <b-form-group style="margin-left:55px; margin-top:20px" id="input-group-2" class="input-label" label="Country" label-for="input-1">
                    <b-form-input class="input-class" id="input-country" :value="store.company.country != null ? store.company.country.name : ''" type="text"></b-form-input>
                  </b-form-group>
                </b-row>
                <b-row data-toggle="modal" data-target="#timezoneModalProfile">
                  <b-form-group style="margin-left:55px; margin-top:20px" id="input-group-2" class="input-label" label="Time Zone" label-for="input-1">
                    <b-form-input class="input-class" id="input-defaultTimezone" :value="partnerStore != null ? partnerStore.defaultTimezone : ''" type="text"></b-form-input>
                  </b-form-group>
                </b-row>
                <div class="form-group" style="margin-left:40px; margin-top:20px">
                  <label class="input-label">Bio <span style="font-size:15px;color:#546064;">(max 500 characters)</span></label>
                  <textarea v-model="orgBio" class="form-control textarea-class" id="exampleFormControlTextarea1" rows="3" maxlength="150" style="resize:none" placeholder="Describe yourself..."></textarea>
                  <span class="text-danger"></span>
                </div>
              </form>
            </div>
          </div>
          <b-row>
            <b-col cols="10">
              <div class="form-group">
                <b-button variant="primary" center block type="submit" style="margin-left:80px; margin-top:20px">Continue</b-button>
              </div>
            </b-col>
          </b-row>
        </b-form>
      </div>
      <imageCropModalOrg title="imageCropper" @update-org-logo="updateImage($event)"></imageCropModalOrg>
      <countryModalProfile></countryModalProfile>
      <timezoneModalProfile @update-location="updateLocation($event)"></timezoneModalProfile>
    </div>
  </b-container>
</template>

<script>
import imageCropModalOrg from './image-crop-organization.vue'
import { required, numeric, email } from 'vuelidate/lib/validators'
import countryModalProfile from 'components/settings/profile-sub-components/countryModalProfile.vue'
import timezoneModalProfile from 'components/settings/profile-sub-components/timezoneModalProfile.vue'
import { mapActions, mapState } from 'vuex'
import axios from 'axios'

export default {
  components: {
    countryModalProfile,
    'imageCropModalOrg': imageCropModalOrg,
    timezoneModalProfile
  },
  data () {
    return {
      value: 30,
      max: 100,
      organizationId: '',
      imageFound: false,
      dbImgURL: '',
      selectedImgURL: '/uploads/localhost/default-img.svg',
      StuttieAddress: '',
      orgName: '',
      hourlyRate: 10.00,
      orgBio: '',
      partnerobject: null,
      orgObject: null,
      roomIdIsUnique: false,
      displayCountry: '',
      timezoneInfo: '',
      showTimezone: '',
      timeZoneoptions: []
    }
  },
  validations: {
    StuttieAddress: {
      required,
      isUnique (value) {
        if (value === '') return true
        if (this.$v.StuttieAddress.required && (this.StuttieAddress != this.partnerobject.DefaultRoomId)) {
          return new Promise((resolve, reject) => {
            axios
              .get('/portal/api/Customers/IsRoomIdDuplicate?roomId=' + this.StuttieAddress)
              .then((response) => {
                resolve(!response.data)
              })
          })
        } else {
          return true
        }
      }
    },
    orgName: { required },
    hourlyRate: { required }
  },
  methods: {
    ...mapActions('onboarding', [
      'changeIsOnBoarding'
    ]),
    ...mapActions('partner', [
      'getPartner'
    ]),
    ...mapActions('company', [
      'getCompany'
    ]),
    imgError () {
      this.$refs.imageRef.src = '/uploads/localhost/profile_pic.png'
    },
    updateLocation (response) {
      if (response) {
        this.getPartner(JSON.parse(localStorage.getItem('userId'))).then(() => {
          this.showTimezone = this.partnerStore.defaultTimezone
        })
      }
    },
    updateImage (response) {
      this.imageFound = response
      // update done successfully and image found
      if (response) {
        var orgID = JSON.parse(localStorage.getItem('organizationId'))
        this.getCompany(orgID).then(() => {
          this.dbImgURL = '/uploads/' + orgID + '/' + this.store.company.logo
          var newObj = Object.assign({}, this.store.company)
          this.orgObject = this.convertAllToUpper(newObj)
        })
      }
    },
    initializeTimezones: function () {
      var timezonesStr = { 'Pacific/Midway': '(GMT-11:00) Midway Island, Samoa', 'Pacific/Pago_Pago': '(GMT-11:00) Pago Pago', 'Pacific/Honolulu': '(GMT-10:00) Hawaii', 'America/Anchorage': '(GMT-8:00) Alaska', 'America/Juneau': '(GMT-8:00) Juneau', 'America/Vancouver': '(GMT-7:00) Vancouver', 'America/Los_Angeles': '(GMT-7:00) Pacific Time (US and Canada)', 'America/Tijuana': '(GMT-7:00) Tijuana', 'America/Phoenix': '(GMT-7:00) Arizona', 'America/Edmonton': '(GMT-6:00) Edmonton', 'America/Denver': '(GMT-6:00) Mountain Time (US and Canada)', 'America/Mazatlan': '(GMT-6:00) Mazatlan', 'America/Regina': '(GMT-6:00) Saskatchewan', 'America/Guatemala': '(GMT-6:00) Guatemala', 'America/El_Salvador': '(GMT-6:00) El Salvador', 'America/Managua': '(GMT-6:00) Managua', 'America/Costa_Rica': '(GMT-6:00) Costa Rica', 'America/Tegucigalpa': '(GMT-6:00) Tegucigalpa', 'America/Chihuahua': '(GMT-6:00) Chihuahua', 'America/Winnipeg': '(GMT-5:00) Winnipeg', 'America/Chicago': '(GMT-5:00) Central Time (US and Canada)', 'America/Mexico_City': '(GMT-5:00) Mexico City', 'America/Panama': '(GMT-5:00) Panama', 'America/Bogota': '(GMT-5:00) Bogota', 'America/Lima': '(GMT-5:00) Lima', 'America/Monterrey': '(GMT-5:00) Monterrey', 'America/Montreal': '(GMT-4:00) Montreal', 'America/New_York': '(GMT-4:00) Eastern Time (US and Canada)', 'America/Indianapolis': '(GMT-4:00) Indiana (East)', 'America/Puerto_Rico': '(GMT-4:00) Puerto Rico', 'America/Caracas': '(GMT-4:00) Caracas', 'America/Santiago': '(GMT-4:00) Santiago', 'America/La_Paz': '(GMT-4:00) La Paz', 'America/Guyana': '(GMT-4:00) Guyana', 'America/Halifax': '(GMT-3:00) Halifax', 'America/Montevideo': '(GMT-3:00) Montevideo', 'America/Araguaina': '(GMT-3:00) Recife', 'America/Argentina/Buenos_Aires': '(GMT-3:00) Buenos Aires, Georgetown', 'America/Sao_Paulo': '(GMT-3:00) Sao Paulo', 'Canada/Atlantic': '(GMT-3:00) Atlantic Time (Canada)', 'America/St_Johns': '(GMT-2:30) Newfoundland and Labrador', 'America/Godthab': '(GMT-2:00) Greenland', 'Atlantic/Cape_Verde': '(GMT-1:00) Cape Verde Islands', 'Atlantic/Azores': '(GMT+0:00) Azores', 'UTC': '(GMT+0:00) Universal Time UTC', 'Etc/Greenwich': '(GMT+0:00) Greenwich Mean Time', 'Atlantic/Reykjavik': '(GMT+0:00) Reykjavik', 'Africa/Nouakchott': '(GMT+0:00) Nouakchott', 'Europe/Dublin': '(GMT+1:00) Dublin', 'Europe/London': '(GMT+1:00) London', 'Europe/Lisbon': '(GMT+1:00) Lisbon', 'Africa/Casablanca': '(GMT+1:00) Casablanca', 'Africa/Bangui': '(GMT+1:00) West Central Africa', 'Africa/Algiers': '(GMT+1:00) Algiers', 'Africa/Tunis': '(GMT+1:00) Tunis', 'Europe/Belgrade': '(GMT+2:00) Belgrade, Bratislava, Ljubljana', 'CET': '(GMT+2:00) Sarajevo, Skopje, Zagreb', 'Europe/Oslo': '(GMT+2:00) Oslo', 'Europe/Copenhagen': '(GMT+2:00) Copenhagen', 'Europe/Brussels': '(GMT+2:00) Brussels', 'Europe/Berlin': '(GMT+2:00) Amsterdam, Berlin, Rome, Stockholm, Vienna', 'Europe/Amsterdam': '(GMT+2:00) Amsterdam', 'Europe/Rome': '(GMT+2:00) Rome', 'Europe/Stockholm': '(GMT+2:00) Stockholm', 'Europe/Vienna': '(GMT+2:00) Vienna', 'Europe/Luxembourg': '(GMT+2:00) Luxembourg', 'Europe/Paris': '(GMT+2:00) Paris', 'Europe/Zurich': '(GMT+2:00) Zurich', 'Europe/Madrid': '(GMT+2:00) Madrid', 'Africa/Harare': '(GMT+2:00) Harare, Pretoria', 'Europe/Warsaw': '(GMT+2:00) Warsaw', 'Europe/Prague': '(GMT+2:00) Prague Bratislava', 'Europe/Budapest': '(GMT+2:00) Budapest', 'Africa/Tripoli': '(GMT+2:00) Tripoli', 'Africa/Cairo': '(GMT+2:00) Cairo', 'Africa/Johannesburg': '(GMT+2:00) Johannesburg', 'Africa/Khartoum': '(GMT+2:00) Khartoum', 'Europe/Helsinki': '(GMT+3:00) Helsinki', 'Africa/Nairobi': '(GMT+3:00) Nairobi', 'Europe/Sofia': '(GMT+3:00) Sofia', 'Europe/Istanbul': '(GMT+3:00) Istanbul', 'Europe/Athens': '(GMT+3:00) Athens', 'Europe/Bucharest': '(GMT+3:00) Bucharest', 'Asia/Nicosia': '(GMT+3:00) Nicosia', 'Asia/Beirut': '(GMT+3:00) Beirut', 'Asia/Damascus': '(GMT+3:00) Damascus', 'Asia/Jerusalem': '(GMT+3:00) Jerusalem', 'Asia/Amman': '(GMT+3:00) Amman', 'Europe/Moscow': '(GMT+3:00) Moscow', 'Asia/Baghdad': '(GMT+3:00) Baghdad', 'Asia/Kuwait': '(GMT+3:00) Kuwait', 'Asia/Riyadh': '(GMT+3:00) Riyadh', 'Asia/Bahrain': '(GMT+3:00) Bahrain', 'Asia/Qatar': '(GMT+3:00) Qatar', 'Asia/Aden': '(GMT+3:00) Aden', 'Africa/Djibouti': '(GMT+3:00) Djibouti', 'Africa/Mogadishu': '(GMT+3:00) Mogadishu', 'Europe/Kiev': '(GMT+3:00) Kiev', 'Europe/Minsk': '(GMT+3:00) Minsk', 'Asia/Dubai': '(GMT+4:00) Dubai', 'Asia/Muscat': '(GMT+4:00) Muscat', 'Asia/Baku': '(GMT+4:00) Baku, Tbilisi, Yerevan', 'Asia/Tehran': '(GMT+4:30) Tehran', 'Asia/Kabul': '(GMT+4:30) Kabul', 'Asia/Yekaterinburg': '(GMT+5:00) Yekaterinburg', 'Asia/Tashkent': '(GMT+5:00) Islamabad, Karachi, Tashkent', 'Asia/Calcutta': '(GMT+5:30) India', 'Asia/Kolkata': '(GMT+5:30) Mumbai, Kolkata, New Delhi', 'Asia/Kathmandu': '(GMT+5:45) Kathmandu', 'Asia/Almaty': '(GMT+6:00) Almaty', 'Asia/Dacca': '(GMT+6:00) Dacca', 'Asia/Dhaka': '(GMT+6:00) Astana, Dhaka', 'Asia/Rangoon': '(GMT+6:30) Rangoon', 'Asia/Novosibirsk': '(GMT+7:00) Novosibirsk', 'Asia/Krasnoyarsk': '(GMT+7:00) Krasnoyarsk', 'Asia/Bangkok': '(GMT+7:00) Bangkok', 'Asia/Saigon': '(GMT+7:00) Vietnam', 'Asia/Jakarta': '(GMT+7:00) Jakarta', 'Asia/Irkutsk': '(GMT+8:00) Irkutsk, Ulaanbaatar', 'Asia/Shanghai': '(GMT+8:00) Beijing, Shanghai', 'Asia/Hong_Kong': '(GMT+8:00) Hong Kong SAR', 'Asia/Taipei': '(GMT+8:00) Taipei', 'Asia/Kuala_Lumpur': '(GMT+8:00) Kuala Lumpur', 'Asia/Singapore': '(GMT+8:00) Singapore', 'Australia/Perth': '(GMT+8:00) Perth', 'Asia/Yakutsk': '(GMT+9:00) Yakutsk', 'Asia/Seoul': '(GMT+9:00) Seoul', 'Asia/Tokyo': '(GMT+9:00) Osaka, Sapporo, Tokyo', 'Australia/Darwin': '(GMT+9:30) Darwin', 'Australia/Adelaide': '(GMT+9:30) Adelaide', 'Asia/Vladivostok': '(GMT+10:00) Vladivostok', 'Pacific/Port_Moresby': '(GMT+10:00) Guam, Port Moresby', 'Australia/Brisbane': '(GMT+10:00) Brisbane', 'Australia/Sydney': '(GMT+10:00) Canberra, Melbourne, Sydney', 'Australia/Hobart': '(GMT+10:00) Hobart', 'Asia/Magadan': '(GMT+11:00) Magadan', 'SST': '(GMT+11:00) Solomon Islands', 'Pacific/Noumea': '(GMT+11:00) New Caledonia', 'Asia/Kamchatka': '(GMT+12:00) Kamchatka', 'Pacific/Fiji': '(GMT+12:00) Fiji Islands, Marshall Islands', 'Pacific/Auckland': '(GMT+12:00) Auckland, Wellington', 'Pacific/Apia': '(GMT+13:00)Independent State of Samoa' }

      // load time zones
      for (var key in timezonesStr) {
        if (timezonesStr.hasOwnProperty(key)) {
          var element = {}
          element.value = key
          element.text = timezonesStr[key]
          this.timeZoneoptions.push(element)
        }
      }
    },
    getTimezoneValue (timezone_key) {
      return this.timeZoneoptions.find(item => item.text == timezone_key)
    },
    handleHover (hovered) {
      this.isHovered = hovered
    },
    StuttieAddressChange (input) {
      var res = this.StuttieAddress.split('/')
      if (res.length > 1) {
        this.StuttieAddress = 'meet.stuttie.com/' + res[1]
      } else {
        this.StuttieAddress = 'meet.stuttie.com/' + input.target.value
      }
      if (res[1] != this.partnerobject.DefaultRoomId) {
        this.isRoomIdUnique()
      }
    },
    isRoomIdUnique () {
      var res = this.StuttieAddress.split('/')
      axios
        .get('/portal/api/Customers/IsRoomIdDuplicate?roomId=' + res[1])
        .then((response) => {
          this.roomIdIsUnique = response.data
        })
    },
    convertAllToUpper (obj) {
      var a = obj
      for (var key in a) {
        var temp
        if (a.hasOwnProperty(key)) {
          temp = a[key]
          delete a[key]
          a[key.charAt(0).toUpperCase() + key.substring(1)] = temp
        }
      }
      obj = a
      return obj
    },
    updateMyProfile () {
      this.partnerobject.DefaultRoomId = this.StuttieAddress
      this.partnerobject.hasUserLogged = true
      return axios.put('/portal/api/Customers/' + this.partnerobject.Id, this.partnerobject)
    },
    updateOrgProfile () {
      this.orgObject.Description = this.orgBio
      this.orgObject.HourlyRate = this.hourlyRate
      this.orgObject.Name = this.orgName
      this.orgObject.CountryId = this.store.company.countryId
      this.partnerStore.defaultTimezone = this.showTimezone
      return axios.put('/portal/api/Organization/' + this.orgObject.UserId, this.orgObject)
    },
    UpdateProfile (evt) {
      this.$v.$touch()
      evt.preventDefault()

      if (!this.$v.$invalid) {
        Promise.all([this.updateMyProfile(), this.updateOrgProfile()])
          .then(results => {
            this.getCompany(this.OrganizationId)

            this.$router.push({ path: '/portal/onBoarding/subjects' })
          })
      }
    }
  },
  computed: {
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
    ...mapState({
      store: state => state.company
    })
  },
  mounted: function () {
    this.$ga.page('/portal/onboarding')
    this.getPartner(JSON.parse(localStorage.getItem('userId'))).then(() => {
      var newObj = Object.assign({}, this.partnerStore)
      this.partnerobject = this.convertAllToUpper(newObj)
      this.StuttieAddress = this.partnerobject.DefaultRoomId
      this.orgName = this.partnerobject.Name
      this.orgBio = this.partnerobject.Description
      this.hourlyRate = this.orgObject.HourlyRate
    })

    this.OrganizationId = JSON.parse(localStorage.getItem('organizationId'))

    this.getCompany(this.OrganizationId).then(() => {
      var newObj = Object.assign({}, this.store.company)
      this.orgObject = this.convertAllToUpper(newObj)

      // checking if logo exist
      if (this.store.company.logo == null) {
        this.imageFound = false
      } else {
        this.imageFound = true
        this.dbImgURL = '/uploads/' + this.organizationId + '/' + this.store.company.logo
      }
    })
  }
}

</script>

<style scoped>
  .main-container {
    background: #FAFEFF;
  }

  .heading-p {
    text-align: center;
    font-weight: bold;
    font-size: 35px;
    letter-spacing: 0px;
    color: #01151C;
    opacity: 1;
    margin-top: 40px
  }

  .sub-heading-p {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    letter-spacing: 0px;
    color: #01151C;
    opacity: 1;
  }

  .add-card-btn {
    width: 100%;
    height: 62px;
    font-weight: bold;
    font-size: 18px;
    letter-spacing: 0px;
    color: #FFFFFF;
    background: #00AC4E 0% 0% no-repeat padding-box;
    border-radius: 7px;
    opacity: 1;
  }

  .middle-div {
    width: 100%;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 4px 10px #CFDEE66C;
    border-radius: 7px;
    opacity: 1;
  }

  .input-label {
    font-weight:  bold;
    font-size:18px;
    letter-spacing: 0px;
    color: #546064;
    opacity: 1;
  }

  .input-class {
    width: 100%;
    height: 68px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #A5ACAE;
    border-radius: 10px;
    opacity: 1;
    color: #01151C;
    font-size: 18px;
  }

  .textarea-class {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #A5ACAE;
    border-radius: 10px;
    opacity: 1;
    color: #01151C;
  }

  .sign-up-btn {
    width: 466px;
    height: 62px;
    background: #00AC4E 0% 0% no-repeat padding-box;
    border-radius: 7px;
    opacity: 1;
  }

  .sign-up-btn:hover {
    width: 466px;
    height: 62px;
    background: #00AC4E 0% 0% no-repeat padding-box;
    border-radius: 7px;
    opacity: 1;
  }
  .img-div {
    max-width: 50%;
    float: right;
    margin-top: 30px;
    margin-right: 78px;
  }

  input#country[type="text"] {
    padding: 1px 2px;
  }

  input#input-defaultTimezone {
    width: 382px;
  }
</style>
