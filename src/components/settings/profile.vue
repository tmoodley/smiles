<template>
  <b-container fluid>
    <div class="content col-md-12" style="margin-left:-2%;margin-bottom:30px">
      <div
        class="col-md-12 col-sm-12 menu"
        style="padding-top:2%;margin-bottom:30px"
      >
        <div class="card">
          <div>
            <div class="row">
              <div class="container" style="padding-top:3%">
                <div class="profile-img">
                  <b-img
                    v-b-hover="handleHover"
                    style="max-width:20%;"
                    center
                    :src="imageFound ? dbImgURL : selectedImgURL"
                    blank-color="blue"
                    fluid
                    data-toggle="modal" 
                    v-b-modal.profile-org-images
                    @error="imgError"
                    ref="imageRef"
                  ></b-img>  
                    <imageCropModalOrg
                        title="imageCropper"
                        @update-org-logo="updateImage($event)"
                      ></imageCropModalOrg> 
                </div>
              </div>
            </div>
            <hr />
            <div class="row eachRow" v-b-modal.profile-name>
              <b-col cols="4">
                <div class="form-group">
                  <label class="fontDetails">Full Name</label>
                </div>
              </b-col>
              <b-col cols="7">
                <div class="form-group">
                  <label style="color:#12b7e0" href="#foo">{{
                    fullName
                  }}</label>
                </div>
              </b-col>
              <b-col cols="1">
                <b-icon icon="pencil" class="icon" aria-hidden="true"></b-icon>
              </b-col>
            </div>
            <hr />
            <div class="row eachRow">
              <b-col cols="4">
                <div class="form-group">
                  <label class="fontDetails">Gender</label>
                </div>
              </b-col>
              <b-col cols="8">
                <div class="form-group">
                  <b-form-checkbox-group
                    v-model="genderselected"
                    :options="genderoptions"
                    @click.native="onClick"
                    :aria-describedby="ariaDescribedby"
                    plain
                  ></b-form-checkbox-group>
                </div>
              </b-col>
            </div>
            <hr />
            <div class="row eachRow" v-b-modal.profile-display-name>
              <b-col cols="4">
                <div class="form-group">
                  <label class="fontDetails">Display Name</label>
                </div>
              </b-col>
              <b-col cols="7">
                <div class="form-group">
                  <label style="color:#12b7e0" href="#foo">{{
                    displayName
                  }}</label>
                </div>
              </b-col>
              <b-col cols="1">
                <b-icon icon="pencil" class="icon" aria-hidden="true"></b-icon>
              </b-col>
            </div>
            <hr />
            <div class="row eachRow" v-b-modal.profile-address>
              <b-col cols="4">
                <div class="form-group">
                  <label class="fontDetails">Public URL</label>
                </div>
              </b-col>
              <b-col cols="7">
                <div class="form-group">
                  <label style="color:#12b7e0" href="#foo">{{
                    StuttieUrl
                  }}</label>
                </div>
              </b-col>
              <b-col cols="1">
                <b-icon icon="pencil" class="icon" aria-hidden="true"></b-icon>
              </b-col>
            </div>
            <hr />
            <div
              class="row eachRow"
              data-toggle="modal"
              v-b-modal.profile-grade
            >
              <b-col cols="4">
                <div class="form-group">
                  <label class="fontDetails">Grade</label>
                </div>
              </b-col>
              <b-col cols="7">
                <div class="form-group">
                  <label style="color:#12b7e0" href="#foo">{{
                    showGrade
                  }}</label>
                </div>
              </b-col>
              <b-col cols="1">
                <b-icon icon="pencil" class="icon" aria-hidden="true"></b-icon>
              </b-col>
            </div>
            <hr />
            <div
              class="row eachRow"
              data-toggle="modal"
              v-b-modal.timezoneModalProfile
            >
              <b-col cols="4">
                <div class="form-group">
                  <label class="fontDetails">Time Zone</label>
                </div>
              </b-col>
              <b-col cols="7">
                <div class="form-group">
                  <label style="color:#12b7e0" href="#foo">{{
                    showTimezone
                  }}</label>
                </div>
              </b-col>
              <b-col cols="1">
                <b-icon icon="pencil" class="icon" aria-hidden="true"></b-icon>
              </b-col>
            </div>
          </div> 
          <timezoneModalProfile
            @update-location="updateLocation($event)"
          ></timezoneModalProfile>
          <gradeModalProfile></gradeModalProfile>
          <editProfileName></editProfileName>
          <editStuttieAddress></editStuttieAddress>
          <editDisplayName></editDisplayName>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
import editOrganizationName from "components/settings/organization-sub-components/editOrganizationName.vue";
import aboutOrganization from "components/settings/organization-sub-components/aboutOrganization.vue";
import imageCropModalOrg from "components/settings/organization-sub-components/image-crop-organization.vue";
import timezoneModalProfile from "components/settings/profile-sub-components/timezoneModalProfile.vue";
import gradeModalProfile from "components/settings/profile-sub-components/gradeModalProfile.vue";
import editProfileName from "components/settings/profile-sub-components/editProfileName.vue";
import editStuttieAddress from "components/settings/profile-sub-components/editStuttieAddress.vue";
import editDisplayName from "components/settings/profile-sub-components/editDisplayName.vue";
import { BIcon, BIconChevronRight, VBHover, BIconPencil } from "bootstrap-vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    BIcon,
    BIconChevronRight,
    editOrganizationName,
    aboutOrganization,
    VBHover,
    BIconPencil,
    imageCropModalOrg: imageCropModalOrg,
    timezoneModalProfile: timezoneModalProfile,
    gradeModalProfile,
    editProfileName,
    editStuttieAddress,
    editDisplayName
  },
  watch:{
    showTimezone(newVAl){
      console.log('TIme',newVAl)
    }
  },
  data() {
    return {
      fullName: "",
      displayName: "",
      displayCountry: "",
      StuttieUrl: "",
      timezoneInfo: "",
      showTimezone: "",
      organizationId: "",
      timeZoneoptions: [],
      partnerId: "",
      options: [{ value: null, text: "Please select an Provider" }],
      selectedImgURL: "/uploads/localhost/default-img.svg",
      dbImgURL: "/img/silhouette_large.png",
      isHovered: false,
      imageFound: false,
      genderselected: [], // Must be an array reference!
      genderoptions: [
        { text: "Male", value: "m" },
        { text: "Female", value: "f" }
      ]
    };
  },
  methods: {
    onClick(evt) {
      // React only to the events fired from the `input`
      if (evt.target.tagName === "INPUT") {
        this.genderselected = [evt.target.value];
        var _company = { ...this.store.company };
        _company.gender = evt.target.value;
        this.updateCompany(_company);
      }
    },
    imgError() {
      this.$refs.imageRef.src = "/img/silhouette_large.png";
    },
    updateImage(response) {
      this.imageFound = response;
      //update done successfully and image found
      if (response) {
        this.getCompany(this.organizationId).then(() => {
          this.dbImgURL =
            "https://stuttie-files.s3.us-east-2.amazonaws.com/" +
            this.organizationId +
            "/" +
            this.store.company.logo;
        });
      }
    },
    updateLocation(response) {
      if (response) {
        this.getPartner(JSON.parse(localStorage.getItem("userId"))).then(() => {
          this.showTimezone = this.partnerStore.defaultTimezone;
          console.log("timezone",this.showTimezone)
        });
      }
    },
    handleHover(hovered) {
      this.isHovered = hovered;
    },
    ...mapActions("company", ["getCompany", "updateCompany"]),
    ...mapActions("partner", ["getPartner"]),
    ...mapActions("partner", ["getPartners"]),
    navigateTosave(navigateTo) {
      switch (navigateTo) {
        case "fullname":
          this.$router.push({ path: "/portal/settings/profile/name" });
          break;
        case "displayname":
          this.$router.push({ path: "/portal/settings/profile/displayname" });
          break;
        case "Stuttieaddress":
          this.$router.push({
            path: "/portal/settings/profile/Stuttieaddress"
          });
          break;
        case "displaypicture":
          break;
      }
    },
    initializeTimezones: function() {
      var timezonesStr = {
        "Pacific/Midway": "(GMT-11:00) Midway Island, Samoa",
        "Pacific/Pago_Pago": "(GMT-11:00) Pago Pago",
        "Pacific/Honolulu": "(GMT-10:00) Hawaii",
        "America/Anchorage": "(GMT-8:00) Alaska",
        "America/Juneau": "(GMT-8:00) Juneau",
        "America/Vancouver": "(GMT-7:00) Vancouver",
        "America/Los_Angeles": "(GMT-7:00) Pacific Time (US and Canada)",
        "America/Tijuana": "(GMT-7:00) Tijuana",
        "America/Phoenix": "(GMT-7:00) Arizona",
        "America/Edmonton": "(GMT-6:00) Edmonton",
        "America/Denver": "(GMT-6:00) Mountain Time (US and Canada)",
        "America/Mazatlan": "(GMT-6:00) Mazatlan",
        "America/Regina": "(GMT-6:00) Saskatchewan",
        "America/Guatemala": "(GMT-6:00) Guatemala",
        "America/El_Salvador": "(GMT-6:00) El Salvador",
        "America/Managua": "(GMT-6:00) Managua",
        "America/Costa_Rica": "(GMT-6:00) Costa Rica",
        "America/Tegucigalpa": "(GMT-6:00) Tegucigalpa",
        "America/Chihuahua": "(GMT-6:00) Chihuahua",
        "America/Winnipeg": "(GMT-5:00) Winnipeg",
        "America/Chicago": "(GMT-5:00) Central Time (US and Canada)",
        "America/Mexico_City": "(GMT-5:00) Mexico City",
        "America/Panama": "(GMT-5:00) Panama",
        "America/Bogota": "(GMT-5:00) Bogota",
        "America/Lima": "(GMT-5:00) Lima",
        "America/Monterrey": "(GMT-5:00) Monterrey",
        "America/Montreal": "(GMT-4:00) Montreal",
        "America/New_York": "(GMT-4:00) Eastern Time (US and Canada)",
        "America/Indianapolis": "(GMT-4:00) Indiana (East)",
        "America/Puerto_Rico": "(GMT-4:00) Puerto Rico",
        "America/Caracas": "(GMT-4:00) Caracas",
        "America/Santiago": "(GMT-4:00) Santiago",
        "America/La_Paz": "(GMT-4:00) La Paz",
        "America/Guyana": "(GMT-4:00) Guyana",
        "America/Halifax": "(GMT-3:00) Halifax",
        "America/Montevideo": "(GMT-3:00) Montevideo",
        "America/Araguaina": "(GMT-3:00) Recife",
        "America/Argentina/Buenos_Aires": "(GMT-3:00) Buenos Aires, Georgetown",
        "America/Sao_Paulo": "(GMT-3:00) Sao Paulo",
        "Canada/Atlantic": "(GMT-3:00) Atlantic Time (Canada)",
        "America/St_Johns": "(GMT-2:30) Newfoundland and Labrador",
        "America/Godthab": "(GMT-2:00) Greenland",
        "Atlantic/Cape_Verde": "(GMT-1:00) Cape Verde Islands",
        "Atlantic/Azores": "(GMT+0:00) Azores",
        UTC: "(GMT+0:00) Universal Time UTC",
        "Etc/Greenwich": "(GMT+0:00) Greenwich Mean Time",
        "Atlantic/Reykjavik": "(GMT+0:00) Reykjavik",
        "Africa/Nouakchott": "(GMT+0:00) Nouakchott",
        "Europe/Dublin": "(GMT+1:00) Dublin",
        "Europe/London": "(GMT+1:00) London",
        "Europe/Lisbon": "(GMT+1:00) Lisbon",
        "Africa/Casablanca": "(GMT+1:00) Casablanca",
        "Africa/Bangui": "(GMT+1:00) West Central Africa",
        "Africa/Algiers": "(GMT+1:00) Algiers",
        "Africa/Tunis": "(GMT+1:00) Tunis",
        "Europe/Belgrade": "(GMT+2:00) Belgrade, Bratislava, Ljubljana",
        CET: "(GMT+2:00) Sarajevo, Skopje, Zagreb",
        "Europe/Oslo": "(GMT+2:00) Oslo",
        "Europe/Copenhagen": "(GMT+2:00) Copenhagen",
        "Europe/Brussels": "(GMT+2:00) Brussels",
        "Europe/Berlin":
          "(GMT+2:00) Amsterdam, Berlin, Rome, Stockholm, Vienna",
        "Europe/Amsterdam": "(GMT+2:00) Amsterdam",
        "Europe/Rome": "(GMT+2:00) Rome",
        "Europe/Stockholm": "(GMT+2:00) Stockholm",
        "Europe/Vienna": "(GMT+2:00) Vienna",
        "Europe/Luxembourg": "(GMT+2:00) Luxembourg",
        "Europe/Paris": "(GMT+2:00) Paris",
        "Europe/Zurich": "(GMT+2:00) Zurich",
        "Europe/Madrid": "(GMT+2:00) Madrid",
        "Africa/Harare": "(GMT+2:00) Harare, Pretoria",
        "Europe/Warsaw": "(GMT+2:00) Warsaw",
        "Europe/Prague": "(GMT+2:00) Prague Bratislava",
        "Europe/Budapest": "(GMT+2:00) Budapest",
        "Africa/Tripoli": "(GMT+2:00) Tripoli",
        "Africa/Cairo": "(GMT+2:00) Cairo",
        "Africa/Johannesburg": "(GMT+2:00) Johannesburg",
        "Africa/Khartoum": "(GMT+2:00) Khartoum",
        "Europe/Helsinki": "(GMT+3:00) Helsinki",
        "Africa/Nairobi": "(GMT+3:00) Nairobi",
        "Europe/Sofia": "(GMT+3:00) Sofia",
        "Europe/Istanbul": "(GMT+3:00) Istanbul",
        "Europe/Athens": "(GMT+3:00) Athens",
        "Europe/Bucharest": "(GMT+3:00) Bucharest",
        "Asia/Nicosia": "(GMT+3:00) Nicosia",
        "Asia/Beirut": "(GMT+3:00) Beirut",
        "Asia/Damascus": "(GMT+3:00) Damascus",
        "Asia/Jerusalem": "(GMT+3:00) Jerusalem",
        "Asia/Amman": "(GMT+3:00) Amman",
        "Europe/Moscow": "(GMT+3:00) Moscow",
        "Asia/Baghdad": "(GMT+3:00) Baghdad",
        "Asia/Kuwait": "(GMT+3:00) Kuwait",
        "Asia/Riyadh": "(GMT+3:00) Riyadh",
        "Asia/Bahrain": "(GMT+3:00) Bahrain",
        "Asia/Qatar": "(GMT+3:00) Qatar",
        "Asia/Aden": "(GMT+3:00) Aden",
        "Africa/Djibouti": "(GMT+3:00) Djibouti",
        "Africa/Mogadishu": "(GMT+3:00) Mogadishu",
        "Europe/Kiev": "(GMT+3:00) Kiev",
        "Europe/Minsk": "(GMT+3:00) Minsk",
        "Asia/Dubai": "(GMT+4:00) Dubai",
        "Asia/Muscat": "(GMT+4:00) Muscat",
        "Asia/Baku": "(GMT+4:00) Baku, Tbilisi, Yerevan",
        "Asia/Tehran": "(GMT+4:30) Tehran",
        "Asia/Kabul": "(GMT+4:30) Kabul",
        "Asia/Yekaterinburg": "(GMT+5:00) Yekaterinburg",
        "Asia/Tashkent": "(GMT+5:00) Islamabad, Karachi, Tashkent",
        "Asia/Calcutta": "(GMT+5:30) India",
        "Asia/Kolkata": "(GMT 5:30) Mumbai, Kolkata, New Delhi",
        "Asia/Kathmandu": "(GMT+5:45) Kathmandu",
        "Asia/Almaty": "(GMT+6:00) Almaty",
        "Asia/Dacca": "(GMT+6:00) Dacca",
        "Asia/Dhaka": "(GMT+6:00) Astana, Dhaka",
        "Asia/Rangoon": "(GMT+6:30) Rangoon",
        "Asia/Novosibirsk": "(GMT+7:00) Novosibirsk",
        "Asia/Krasnoyarsk": "(GMT+7:00) Krasnoyarsk",
        "Asia/Bangkok": "(GMT+7:00) Bangkok",
        "Asia/Saigon": "(GMT+7:00) Vietnam",
        "Asia/Jakarta": "(GMT+7:00) Jakarta",
        "Asia/Irkutsk": "(GMT+8:00) Irkutsk, Ulaanbaatar",
        "Asia/Shanghai": "(GMT+8:00) Beijing, Shanghai",
        "Asia/Hong_Kong": "(GMT+8:00) Hong Kong SAR",
        "Asia/Taipei": "(GMT+8:00) Taipei",
        "Asia/Kuala_Lumpur": "(GMT+8:00) Kuala Lumpur",
        "Asia/Singapore": "(GMT+8:00) Singapore",
        "Australia/Perth": "(GMT+8:00) Perth",
        "Asia/Yakutsk": "(GMT+9:00) Yakutsk",
        "Asia/Seoul": "(GMT+9:00) Seoul",
        "Asia/Tokyo": "(GMT+9:00) Osaka, Sapporo, Tokyo",
        "Australia/Darwin": "(GMT+9:30) Darwin",
        "Australia/Adelaide": "(GMT+9:30) Adelaide",
        "Asia/Vladivostok": "(GMT+10:00) Vladivostok",
        "Pacific/Port_Moresby": "(GMT+10:00) Guam, Port Moresby",
        "Australia/Brisbane": "(GMT+10:00) Brisbane",
        "Australia/Sydney": "(GMT+10:00) Canberra, Melbourne, Sydney",
        "Australia/Hobart": "(GMT+10:00) Hobart",
        "Asia/Magadan": "(GMT+11:00) Magadan",
        SST: "(GMT+11:00) Solomon Islands",
        "Pacific/Noumea": "(GMT+11:00) New Caledonia",
        "Asia/Kamchatka": "(GMT+12:00) Kamchatka",
        "Pacific/Fiji": "(GMT+12:00) Fiji Islands, Marshall Islands",
        "Pacific/Auckland": "(GMT+12:00) Auckland, Wellington",
        "Pacific/Apia": "(GMT+13:00)Independent State of Samoa"
      };

      //load time zones
      for (var key in timezonesStr) {
        if (timezonesStr.hasOwnProperty(key)) {
          var element = {};
          element.value = key;
          element.text = timezonesStr[key];
          this.timeZoneoptions.push(element);
        }
      }
    },
    getTimezoneValue(timezone_key) {
      return this.timeZoneoptions.find(item => item.text == timezone_key);
    },
    getUnits: function() {
      axios.get("/portal/api/Customers/GetTimeZone").then(response => {
        this.timezoneInfo = response.data;
        console.log("val",response.data)
        if (response.statusText == "No Content") {
          //setting the timezone to some default value if api returns null- (GMT-4:00) Eastern Time (US and Canada)
          this.showTimezone = "America/New_York";
          console.log("timezone",this.showTimezone)
        } else {
              console.log("val",  this.timezoneInfo)
          this.showTimezone = this.getTimezoneValue(this.timezoneInfo).text;
          console.log("timezone",this.showTimezone)
        }
      });
    }
  },
  computed: {
    ...mapState({
      store: state => state.company
    }),
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
    ...mapState({
      storePartners: state => state.partner.partners
    }),
    showGrade: function() {
      return this.store.company.grades != null
        ? this.store.company.grades.name
        : "";
    }
  },
  mounted: function() {
    this.genderselected.push(this.store.company.gender);
    this.$ga.page("/portal/settings/profile");
    this.organizationId = JSON.parse(localStorage.getItem("organizationId"));
    this.initializeTimezones();
    this.getUnits();

    this.getPartner(JSON.parse(localStorage.getItem("userId"))).then(() => {
      this.fullName =
        this.partnerStore.givenName + " " + this.partnerStore.familyName;
      if (this.partnerStore.displayName == null) {
        this.displayName = this.partnerStore.givenName;
      } else {
        this.displayName = this.partnerStore.displayName;
      }
      this.StuttieUrl = "meet.stuttie.com/" + this.partnerStore.defaultRoomId;

      //checking if logo exist
      if (this.store.company.logo == null) {
        this.imageFound = false;
      } else {
        this.imageFound = true;
        this.dbImgURL =
          "https://stuttie-files.s3.us-east-2.amazonaws.com/" +
          this.organizationId +
          "/" +
          this.store.company.logo;
      }
    });
  },
  created: function() {}
};
</script>

<style scoped>
.iconDropdown {
  position: relative;
  float: right;
  margin-top: -30px;
  margin-right: 20px;
}

.heading-font {
  font-weight: bold;
  color: #01151c;
}

.fontDetails {
  font-weight: bold;
  color: #01151c;
}

.eachRow {
  padding-left: 5%;
  padding-top: 1%;
}

.icon {
  color: #01151c;
}

.menu :hover {
  cursor: pointer;
}

.header {
  padding-left: 1%;
  padding-top: 1%;
}
</style>
