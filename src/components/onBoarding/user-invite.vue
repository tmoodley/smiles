<!--You can use this as a starting template-->

<template>
  <b-container class="main-container">
    <b-row>
      <b-col>
        <p class="heading-p">Ready to add your teammates?</p>
        <div class="w-100"></div>
        <p class="sub-heading-p">Send invites to up to 14 others to join your team.</p>
      </b-col>
    </b-row>

    <div class="middle-div">
      <b-form @submit="sendInvitation">
        <b-row v-for="(user,index) in users" v-bind:key="index">

          <b-col cols="6">
            <b-form-group id="input-group-1" class="label-font" :label="user.labelEmail" label-for="input-1" style="color:#546064;margin-top:20px;margin-left:20px">
              <b-form-input :class="{errorInput: user.validations.isEmail}" @change="validateUserEmail(user)" class="input-style input-font" v-model="user.EmailAddress" type="text" placeholder="Work email"></b-form-input>
              <div v-if="user.validations.isEmail">
                <p class="errorMsg">Please enter a valid email</p>
              </div>
              <div v-if="user.validations.isEmailDuplicate">
                <p class="errorMsg">Sorry, this user already in the system</p>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="5">
            <b-form-group id="input-group-1" class="label-font" :label="user.labelRole" label-for="input-1" style="color:#546064;margin-top:20px;">
              <div id="customDropMain" class="customDropMain">
                <div id="fakeSelectDiv" class="fakeSelectDiv" @click="fakeDropDownClick(user)" :class="{fakeSelectDivBoarder:!user.dropDownIconToggale, fakeSelectDivBorderForcus:user.dropDownIconToggale}">
                  <p class="seletedUserRoleP">{{user.selectedRoleName}}</p>
                  <div class="fakeDropDownArrow" v-if="!user.dropDownIconToggale">
                    <b-icon icon="chevron-down" aria-hidden="true"></b-icon>
                  </div>
                  <div class="fakeDropDownArrow" v-if="user.dropDownIconToggale">
                    <b-icon icon="chevron-up" aria-hidden="true"></b-icon>
                  </div>
                </div>

                <div id="fakeDropDownItemDiv" class="fakeDropDownItemDiv" v-if="user.dropDownIconToggale">
                  <div id="fakeDropDownItem" class="fakeDropDownItem" v-for="(role,index) in userRoles" v-bind:key="index" @click="fakeDropDownRoleChnage(role,user)">
                    <span class="userRoleP">{{role.name}}</span><br>
                    <span class="userRollDesP">{{role.des}}</span>
                  </div>
                </div>

              </div>
            </b-form-group>
          </b-col>

          <b-col cols="1">
            <b-img v-if="index != 0" src="/images/remove-user.svg" fluid alt="Responsive image" style="color:#546064;margin-top:40px; cursor:pointer" @click="deleteUser(index)"></b-img>
          </b-col>

        </b-row>
      </b-form>
      <b-row>
        <b-col>
          <b-button variant="#4B95E9" class="mb-2" style="color:#4B95E9" @click="addUser()">
            <i class="fa fa-plus" aria-hidden="true"></i> Add new
          </b-button>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3">
          <b-button class="sign-up-btn" @click="sendInvitation()" style="margin-left:20px;margin-top:50px;margin-bottom:50px">Send now</b-button>
        </b-col>

        <b-col cols="5">
          <b-button class="skip-to-dashnord" @click="SkipTomeetingList()" style="margin-left:20px;margin-top:50px;margin-bottom:50px">Skip to dashboard</b-button>
        </b-col>
      </b-row>

    </div>
  </b-container>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import { BIcon, BIconEnvelope, BIconThreeDotsVertical, BIconChevronDown, BIconChevronUp } from 'bootstrap-vue'
export default {
  components: {
    BIcon,
    BIconEnvelope,
    BIconThreeDotsVertical,
    BIconChevronDown,
    BIconChevronUp
  },
  data () {
    return {
      userRoles: [
        { name: 'Super Admin', systemRole: 'Administrator', des: 'All User privileges, plus the ability to manage organization settings.' },
        { name: 'Coordinator', systemRole: 'Coordinator', des: 'All User privileges, plus the ability to manage appointments and reports for others.' },
        { name: 'User', systemRole: 'Partner', des: 'Users can manage their own appointments and reports, and update their personal profile.' }
      ],
      users: [{ EmailAddress: '', selectedRoleName: 'Super Admin', selectedRole: 'Administrator', dropDownIconToggale: false, labelEmail: 'Work Email', labelRole: 'Role', OrganizationId: JSON.parse(localStorage.getItem('organizationId')), validations: { isEmail: false, isEmailDuplicate: false, isValid: true } }],
      userInivte: []
    }
  },
  methods: {
    ...mapActions('onboarding', [
      'changeIsOnBoarding'
    ]),
    modelIsValid () {
      for (var user of this.users) {
        if (!user.validations.isValid) {
          return false
        }
      }
      return true
    },
    sendInvitation () {
      this.userInivte = []

      for (var user of this.users) {
        this.validateUserEmail(user)
      }

      if (this.modelIsValid()) {
        for (var user of this.users) {
          var userItem = { 'EmailAddress': user.EmailAddress, 'Role': user.selectedRole, 'OrganizationId': JSON.parse(localStorage.getItem('organizationId')) }
          this.userInivte.push(userItem)
        }

        axios.post('/portal/api/Customers/InviteBulkCustomer',
          this.userInivte
        ).then((response) => {
          users: [{ EmailAddress: '', selectedRoleName: 'Super Admin', selectedRole: 'Administrator', dropDownIconToggale: false, labelEmail: 'Work Email', labelRole: 'Role', OrganizationId: JSON.parse(localStorage.getItem('organizationId')), validations: { isEmail: false, isEmailDuplicate: false, isValid: true } }]
          this.changeIsOnBoarding(false)
          this.$router.push({ path: '/portal/meetingList' })
        }).catch((response) => {
        })
      }

      console.log(this.userInivte)
    },
    addUser () {
      this.users.push({ EmailAddress: '', selectedRoleName: 'Super Admin', selectedRole: 'Administrator', dropDownIconToggale: false, labelEmail: '', labelRole: '', OrganizationId: JSON.parse(localStorage.getItem('organizationId')), validations: { isEmail: false, isEmailDuplicate: false, isValid: true } })
    },
    deleteUser (index) {
      this.users.splice(index, 1)
    },
    validateUserEmail (user) {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

      if (regex.test(user.EmailAddress)) {
        axios
          .get('/portal/api/Customers/IsEmailIdDuplicate?email=' + user.EmailAddress)
          .then((response) => {
            if (response.data) {
              user.validations.isValid = false
              user.validations.isEmail = false
              user.validations.isEmailDuplicate = true
            } else {
              user.validations.isValid = true
              user.validations.isEmail = false
              user.validations.isEmailDuplicate = false
            }
          })
      } else {
        user.validations.isEmail = true
        user.validations.isValid = false
      }
    },
    fakeDropDownClick (user) {
      user.dropDownIconToggale = !user.dropDownIconToggale
    },
    fakeDropDownRoleChnage (role, user) {
      user.selectedRole = role.systemRole
      user.selectedRoleName = role.name
      user.dropDownIconToggale = !user.dropDownIconToggale
    },
    SkipTomeetingList () {
      this.changeIsOnBoarding(false)
      this.$router.push({ path: '/portal/meetingList' })
    }
  },
  computed: {
    ...mapState({
      isOnBoarding: state => state.onboarding.isOnBoarding
    })
  },
  mounted: function () {
    this.$ga.page('/portal/onboarding/userinvite')
  }
}

</script>

<style scoped>
  .main-container {
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

  .middle-div {
    width: 75%;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 4px 10px #CFDEE66C;
    border-radius: 7px;
    opacity: 1;
    margin-left: auto;
    margin-right: auto;
  }

  .label-font {
    text-align: left;
    font-size: 18px;
    font-weight:bold;
    letter-spacing: 0px;
    color: #546064;
    opacity: 1;
  }

  .input-style {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #BFCED5;
    border-radius: 10px;
    opacity: 1;
    width: 100%;
    height: 58px;
  }

  .input-font {
    text-align: left;
    font-size: 20px;
    font-weight:bold;
    letter-spacing: 0.2px;
    color: #01151C;
    opacity: 1;
  }

  .errorInput {
    border: 1px solid #e74a3b;
  }

  .errorMsg {
    font-size: 80%;
    color: #e74a3b;
  }

  .sign-up-btn {
    width: 100%;
    height: 62px;
    background: #00AC4E 0% 0% no-repeat padding-box;
    border-radius: 7px;
    opacity: 1;
  }

    .sign-up-btn:hover {
      width: 100%;
      height: 62px;
      border: 1px solid #BFCED5;
      color: #BFCED5;
      border-radius: 7px;
      opacity: 1;
    }

  .skip-to-dashnord {
    width: 100%;
    height: 62px;
    background: white 0% 0% no-repeat padding-box;
    border: 1px solid #BFCED5;
    color: #707070;
    border-radius: 7px;
    opacity: 1;
  }

    .skip-to-dashnord:hover {
      width: 100%;
      height: 62px;
      background: white 0% 0% no-repeat padding-box;
      border: 1px solid #BFCED5;
      color: #707070;
      border-radius: 7px;
      opacity: 1;
    }

  .customDropMain {
    width: 100%;
    height: 58px;
  }
  .fakeSelectDiv {
    width: 100%;
    height: 58px;
    border-radius: 7px;
  }

  .fakeSelectDivBoarder {
    border: 1px solid #BFCED5;
  }

  .fakeSelectDivBorderForcus {
    border: 1px solid var(--success);
  }

  .fakeDropDownArrow {
    position: relative;
    float: right;
    margin-right: 10px;
    margin-top: 14px;
  }

  .seletedUserRoleP {
    position: relative;
    float: left;
    margin-left: 12px;
    margin-top: 12px;
    padding: 0px;
    color: #01151C;
    font-size: 18px;
  }

  .fakeDropDownItemDiv {
    box-shadow: rgba(207, 222, 230, 0.424) 0px 4px 10px;
    border-radius: 7px;
    background: white;
    width: 425px;
    height: 280px;
    z-index: 9;
    position: fixed
  }

  .fakeDropDownItem {
    height: 80px;
    margin-top: 10px;
  }

  .userRoleP {
    margin: 0px;
    float: left;
    margin-left: 10px;
    color: rgb(1, 21, 28);
    font-weight: bold
  }

  .userRollDesP {
    margin: 0px;
    float: left;
    margin-left: 10px;
    margin-top: 3px;
    color: rgb(1, 21, 28);
    font-size: 80%;
    font-weight: 400
  }

  .fakeDropDownItem:hover {
    background: #DEEFE6;
    cursor: pointer
  }

</style>
