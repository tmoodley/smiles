<template>
  <div>
    <b-container class="p-0 mt-3" fluid>
      <b-row>
        <b-col cols="12" sm="12" md="10" lg="11" xl="10" @click="meetingItemClick($event)" class="main-container main-hover-div">
          <b-row class="mt-2" style="background-color: white; box-shadow: 0px 4px 10px #CFDEE66C;">
            <b-col cols="12" sm="4" md="5" lg="3" xl="3">
              <div style="border-right:1px solid; border-color:#D0D4D5;min-height: 88px;width:100%;float:left;margin-top: 20px !important;margin-bottom: 20px !important;" class="p-2 mt-2 mb-2">
                <b-row :no-gutters="true">
                  <b-col cols="12">
                    <b-row class="mt-2">
                      <b-col>
                        <p style="font-size:20px;color:#01151C; font-weight:bold; margin:0px; text-align:center">{{meeting.meetingTime | moment("MMM Do")}}</p>
                        <p style="font-size: 18px; text-align:center;margin:0px;">{{meeting.meetingTime | moment("h:mm a") }}</p>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <b-col cols="12" sm="8" md="7" lg="5" xl="6" class="p-2">
              <b-row class="mt-3">
                <b-col cols="12">
                  <b-row>
                    <b-col>
                      <p class=" ml-2 mt-2" style="font-size:24px;color:#01151C; font-weight:bold; margin:0px">{{meeting.meetingTopic}}</p>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <p class=" ml-2" style="font-size: 14px;">
                        <!--<b-icon icon="envelope" aria-hidden="true"></b-icon>-->
                        {{meeting.partnerName}}, {{getPatientToDisplay()}} <span v-if="getNumberRemain() > 0">,</span> <span v-if="getNumberRemain() == 1" style="color:#00AC4E">+{{getNumberRemain()}} other</span> <span v-if="getNumberRemain() > 1" style="color:#00AC4E">+{{getNumberRemain()}} others</span>
                      </p>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
            <!--<b-col cols="4" sm="4" md="4" lg="1" xl="1" class="p-2">

            </b-col>-->
            <b-col cols="6" sm="6" md="6" lg="2" xl="2" class="p-2">
              <!--<b-button variant="outline-primary" class="mt-4" @click="startMeeting(meeting.inviteLink)">Start Meeting</b-button>-->
              <b-button variant="light" style="float:right" :href="'https://my-hosted-video-jitsi.s3.us-east-2.amazonaws.com/' +  meeting.RecordingId + '.mp4'" v-if="meeting.RecordingId != null"><i class="fas fa-download"></i> Download Recording</b-button>
            </b-col>
            <b-col cols="1" sm="1" md="1" lg="1" xl="1">
              <div style="margin-top: 12px;">
                <b-dropdown variant="white" no-caret class="p-0 mt-3 hover-drop">
                  <template v-slot:button-content>
                    <b-icon icon="three-dots-vertical" class="mt-2" font-scale="2"></b-icon>
                  </template>
                  <b-dropdown-item v-b-toggle="meeting.meetingId" @click="getMeetingIfo()" class="dropdown"><span style="color:#01151C">View Details</span></b-dropdown-item>
                  <b-dropdown-item @click="resendInvite(meeting)" class="dropdown"><span style="color:#01151C">Resend Invites</span></b-dropdown-item>
                  <b-dropdown-item class="dropdown" @click="deleteMeeting(meeting)" v-if="meetingStatus != 2"><span style="color:red">Delete Meeting</span></b-dropdown-item>
                </b-dropdown>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <meetingInfo :msg="meeting" @meetingWasDelete="deleteMeeting($event)" ref="meetingInfo"></meetingInfo>
    <button ref="meetingSidebarOPenDrop" v-b-toggle="meeting.meetingId" @click="getMeetingIfo()" hidden></button>
  </div>
</template>

<script>
import axios from 'axios'
import { BIcon, BIconEnvelope, BIconThreeDotsVertical } from 'bootstrap-vue'
import meetingInfo from 'components/sidebar/meetingInfo.vue'

export default {
  props: ['meeting', 'meetingStatus'],
  components: {
    BIcon,
    BIconEnvelope,
    BIconThreeDotsVertical,
    meetingInfo
  },
  data () {
    return {
      meetingTodeleteId: '',
      colorArr: ['#F76C91', '#3F9BF7', '#A173D8', '#35B8D8', '#FFAD05', '#FF5555'],
      participantCount: ''
    }
  },
  methods: {
    meetingItemClick (e) {
      if ($(e.target).is('div') || $(e.target).is('p')) {
        this.$refs.meetingSidebarOPenDrop.click()
      }
    },
    imgUserDError (id) {
      this.$refs[id].src = '/uploads/localhost/profile_pic.png'
    },
    getPatientToDisplay () {
      var patientsArr = this.meeting.patientDisplayName.split(',')
      if (patientsArr.length > 2) {
        return patientsArr[0] + ',' + patientsArr[1]
      } else { return this.meeting.patientDisplayName }
    },
    getNumberRemain () {
      var patientsArr = this.meeting.patientDisplayName.split(',')
      if (patientsArr.length > 2) { return patientsArr.length - 2 } else { return 0 }
    },
    getMeetingIfo () {
      this.$refs.meetingInfo.getMeetingInfor()
    },
    resendInvite (meeting) {
      this.$emit('meetingCofrimation', meeting)
    },
    getInitials (name) {
      if (name != '' || name != null) {
        var FirstLetter
        var secondLetter
        var res = name.split(' ')
        if (res.length == 1) {
          FirstLetter = res[0].substring(0, 1).toUpperCase()
          return FirstLetter
        } else {
          FirstLetter = res[0].substring(0, 1).toUpperCase()
          secondLetter = res[1].substring(0, 1).toUpperCase()
          return FirstLetter + secondLetter
        }
      }
    },
    getColor () {
      var random = Math.floor(Math.random() * 6)
      return this.colorArr[random]
    },
    deleteMeeting (meeting) {
      this.$emit('meetingWasDelete', meeting)
    },
    startMeeting (meetingID) {
      window.open(meetingID, '_blank')
    },
    getParticipants: function () {
      axios
        .get('/portal/api/Participants/' + `${this.meeting.meetingId}`)
        .then(response => {
          if (response.data.count == 0) {
            this.participantCount = '-'
          } else {
            this.participantCount = response.data.count
          }
        })
    }
  },
  computed: {},

  mounted: function () {
    console.log(this.meeting)
    this.getParticipants()
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

  .main-container {
    cursor:pointer
  }

  .hover-drop {
    visibility: hidden
  }

  .main-container:hover .hover-drop, .main-container.hover .hover-drop {
    visibility: visible
  }

  .main-hover-div:focus {
      outline:none
  }

</style>
