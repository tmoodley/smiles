<template>
  <b-container fluid>
    <b-row no-gutters>
      <b-col>
        <p class="no-padding-margin heading">User Directory</p>
        <p class="no-padding-margin sub-title">Manage your organization members from here</p>
      </b-col>
      <b-col offset-xl="6" md="4" lg="3" xl="2">
        <b-button class="btnInviteUser" @click="openAddUserWindow()" style="width: 100%; margin-top:10px">Invite new users</b-button>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <b-table outlined responsive head-variant="light" :items="items" :fields="fields" :busy="isBusy">
          <template v-slot:table-busy>
            <div class="text-center text-success my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
          <template v-slot:cell(memberImage)="data">

            <b-img v-if="data.item.memberImage != null" class="imageT" :src="getProfilePicURL(data)" fluid alt="Responsive image" @error="imgUserDError(data.item.memberEmail)" :ref="data.item.memberEmail"></b-img>
            <div v-if="data.item.memberImage == null" class="nameDiv" :style="{backgroundColor: data.item.memberColorCode}">
              <p class="nameP">{{getInitials(data.item.memberName)}}</p>
            </div>
          </template>
          <template v-slot:cell(memberAccess)="data">
            {{getAccessString(data.item)}}
          </template>
          <template v-slot:cell(memberStatus)="data">
            <p :class="{activeClass: data.item.memberStatus , deacriveClass: !data.item.memberStatus}">{{getStatusString(data.item.memberStatus)}}</p>
          </template>
          <template v-slot:cell(actions)="row">
            <b-dropdown variant="white" no-caret style="margin-top: -7px;" v-if="showActions(row.item)">
              <template v-slot:button-content>
                <b-icon style="font-size:100%" icon="three-dots-vertical"></b-icon>
              </template>
              <b-dropdown-item v-b-toggle="toggle" class="dropdown" @click="changeRole(row.item, row.index, $event.target)"><span class="dropDownColor">Change Role</span></b-dropdown-item>
              <b-dropdown-item class="dropdown" v-if="row.item.memberStatus" @click="inactivateUser(row.item)"><span class="dropDownColor">Mark as inactive</span></b-dropdown-item>
              <b-dropdown-item class="dropdown" v-if="!row.item.memberStatus" @click="activateUser(row.item)"><span class="dropDownColor">Mark as active</span></b-dropdown-item>
              <b-dropdown-item class="dropdown" @click="removeUser(row.item, row.index, $event.target)"><span style="color:#FF7F7F">Remove user</span></b-dropdown-item>
            </b-dropdown>
          </template>
        </b-table>
      </b-col>
    </b-row>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#changeRole" hidden ref="changeRole">
      Launch Delete modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="changeRole" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header mb-0 pb-0">
            <p class="pl-2 mt-2" style="color:#01151C; font-size:20px; font-weight:bold" id="exampleModalLabel">Change Role</p>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <b-row>
              <b-col cols="11">
                <p style="color:#546064; font-size:14px; padding: 0px; margin:0px; font-weight:bold">Role</p>
              </b-col>
              <div class="w-100"></div>
              <!--<b-col cols="11" class="mt-1">
              <b-form-select v-model="selectedRole" class="mb-3" style="color:#01151C; font-weight:500;" @change="userChangeRole()">
                <b-form-select-option value="Administrator" style="height:10px">Super Admin</b-form-select-option>
                <b-form-select-option value="Coordinator">Coordinator</b-form-select-option>
                <b-form-select-option value="Partner">User</b-form-select-option>
              </b-form-select>
            </b-col>-->
              <b-col cols="11" class="mt-1">
                <div id="customDropMain" class="customDropMain" @blur="fakeSelectBlur">
                  <div id="fakeSelectDiv" class="fakeSelectDiv" @click="fakeDropDownClick()" :class="{fakeSelectDivBoarder:!dropDownIconToggale, fakeSelectDivBorderForcus:dropDownIconToggale}">
                    <p class="seletedUserRoleP">{{selectedRoleName}}</p>
                    <div class="fakeDropDownArrow" v-if="!dropDownIconToggale">
                      <b-icon icon="chevron-down" aria-hidden="true"></b-icon>
                    </div>
                    <div class="fakeDropDownArrow" v-if="dropDownIconToggale">
                      <b-icon icon="chevron-up" aria-hidden="true"></b-icon>
                    </div>
                  </div>
                  <div id="fakeDropDownItemDiv" class="fakeDropDownItemDiv" v-if="dropDownIconToggale">
                    <div id="fakeDropDownItem" class="fakeDropDownItem" v-for="(role,index) in userRoles" v-bind:key="index" @click="fakeDropDownRoleChnage(role)">
                      <span class="userRoleP">{{role.name}}</span><br>
                      <span class="userRollDesP">{{role.des}}</span>
                    </div>
                  </div>
                </div>
              </b-col>
              <div class="w-100"></div>
              <b-col cols="10">
                <p style="color:#01151C;font-size:13px">{{slectedRoleText}}</p>
              </b-col>
            </b-row>
            <b-row class="mt-4">
              <b-col cols="3" offset-xl="6">
                <b-button variant="#546064" data-toggle="modal" data-target="#changeRole" style="float:right;width:100%;border:1px solid #546064">Cancel</b-button>
              </b-col>
              <b-col cols="3">
                <b-button variant="success" @click="changeRoleConfirm()" style="width: 100%">Update</b-button>
              </b-col>
            </b-row>
          </div>
          <div class="modal-footer" hidden>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="deleteMeetingClose">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- End of change role Modal -->
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addUsers" hidden ref="addUsers">
      Launch Delete modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="addUsers" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header mb-0 pb-0">
            <p class="pl-2 mt-2" style="color:#01151C; font-size:20px; font-weight:bold" id="exampleModalLabel">Invite Users</p>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <b-row class="mt-1">
              <b-col xl="3">
                <p>Email:</p>
              </b-col>
              <b-col xl="2">
                <p>First name</p>
              </b-col>
              <b-col xl="3">
                <p>Last name</p>
              </b-col>
              <b-col xl="3">
                <p>Roles:</p>
              </b-col>
              <b-col xl="1">
                <b-button variant="#4B95E9" class="mb-2" style="color:#4B95E9;font-size:25px;margin-top:-14px" v-b-popover.hover="popoverConfig">
                  <i class="fa fa-info-circle" aria-hidden="true"></i>
                </b-button>
              </b-col>
            </b-row>
            <b-form @submit="sendInvitation">
              <b-row v-for="(user,index) in users" v-bind:key="index">
                <b-col xl="3">
                  <b-form-group id="input-group-1" label="" label-for="input-1" style="color:#546064">
                    <b-form-input :class="{errorInput: user.validations.isEmail}" id="input-1" @input="validateEmail(user)" required v-model="user.EmailAddress" type="text" placeholder="Enter email" style="color:#01151C;font-weight:500; font-size:15px"></b-form-input>
                    <div v-if="user.validations.isEmail">
                      <p class="errorMsg">Please enter a valid email</p>
                    </div>
                    <div v-if="user.validations.isEmailDuplicate">
                      <p class="errorMsg">Sorry, this user already in the system</p>
                    </div>
                  </b-form-group>
                </b-col>
                <b-col xl="2">
                  <b-form-group id="input-group-1" label="" label-for="input-1" style="color:#546064">
                    <b-form-input id="input-1" required v-model="user.GivenName" type="text" placeholder="Enter first name" style="color:#01151C;font-weight:500; font-size:15px"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col xl="3">
                  <b-form-group id="input-group-1" label="" label-for="input-1" style="color:#546064">
                    <b-form-input id="input-1" required v-model="user.FamilyName" type="text" placeholder="Enter last name" style="color:#01151C;font-weight:500; font-size:15px"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col xl="3">
                  <b-form-group id="input-group-1" label="" label-for="input-1" style="color:#546064;width:80%">
                    <b-form-select v-model="user.Role" style="color:#01151C; font-weight:500;" @change="userChangeRole()">
                      <b-form-select-option value="Administrator" style="height:10px">Super Admin</b-form-select-option>
                      <b-form-select-option value="Coordinator">Coordinator</b-form-select-option>
                      <b-form-select-option value="Partner">User</b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col xl="1">
                  <b-button variant="#707070" class="mb-2" @click="deleteUser(index)" v-if="index != 0">
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-button variant="#4B95E9" class="mb-2" style="color:#4B95E9;margin-right: 133px !important;float: right;" @click="addUser()">
                    <i class="fa fa-plus" aria-hidden="true"></i> Add new
                  </b-button>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col cols="3" offset-xl="5">
                  <b-button variant="#546064" data-toggle="modal" data-target="#addUsers" style="float:right;width:100%;border:1px solid #546064">Cancel</b-button>
                </b-col>
                <b-col cols="3">
                  <b-button class="btnInviteUser" :disabled="loading" type="submit" @click="" style="width: 100%">
                    Send Invitation
                    <img v-show="loading" style="color:#546064" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </div>

          <div class="modal-footer" hidden>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="deleteMeetingClose">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <!------ upgrade the solo account model--------->

    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#upgradePackadge" hidden ref="upgradePackadge">
      Launch demo modal
    </button>

    <div class="modal fade" id="upgradePackadge" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="color: rgb(1, 21, 28); font-size: 20px; font-weight: bold;" >Upgrade your package</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style="color: rgb(1, 21, 28); font-size: 18px;">
            <pr>Your current plan is the "Stuttie PERSONAL" plan and does not include the User Invite feature.</pr>
            <br><br>
            <pr style="">Would you like to upgrade to the "Stuttie BUSINESS" plan so that you can Invite Users?</pr>
          </div>
          <div class="modal-footer">
            <button ref="upGradePackadgeClose" style="background:white; border: 1px solid rgb(84, 96, 100);color:rgb(84, 96, 100)" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button @click="upGradePackadge()" type="button" class="btn btn-primary" style="background-color: var(--success); border: none; color:white}">Upgrade</button>
          </div>
        </div>
      </div>
    </div>

    <!------ upgrade the solo account model--------->

  </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { BIcon, BIconEnvelope, BIconThreeDotsVertical, BIconChevronDown, BIconChevronUp } from 'bootstrap-vue'
import { required, numeric, email } from 'vuelidate/lib/validators'
import axios from 'axios'
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
      partnerobject: null,
      dropDownIconToggale: false,
      loggedInUser: JSON.parse(localStorage.getItem('org')),
      orgEmail: JSON.parse(localStorage.getItem('organizationEmail')),
      OrganizationId: JSON.parse(localStorage.getItem('organizationId')),
      validations: { isEmail: false, GivenName: false, FamilyName: false, isValid: true },
      users: [{ EmailAddress: '', GivenName: '', FamilyName: '', Role: 'Partner', OrganizationId: JSON.parse(localStorage.getItem('organizationId')), validations: { isEmail: false, isEmailDuplicate: false, GivenName: false, FamilyName: false, isValid: true } }],
      WaitRoomBio: '',
      userRoles: [
        { name: 'Super Admin', systemRole: 'Administrator', des: 'All User privileges, plus the ability to manage organization settings.' },
        { name: 'Coordinator', systemRole: 'Coordinator', des: 'All User privileges, plus the ability to manage appointments and reports for others.' },
        { name: 'User', systemRole: 'Partner', des: 'Users can manage their own appointments and reports, and update their personal profile.' }
      ],
      slectedRoleText: 'All User privileges, plus the ability to manage organization settings.',
      adminText: 'All User privileges, plus the ability to manage organization settings.',
      coordinatorText: 'All User privileges, plus the ability to manage appointments and reports for others.',
      userText: 'Users can manage their own appointments and reports, and update their personal profile.',
      selectedRole: 'Super Admin',
      selectedRoleName: 'Super Admin',
      isBusy: true,
      OrganizationId: '',
      toggle: false,
      selectedUser: null,
      loading: false,
      fields: [
        {
          key: 'memberImage',
          label: '',
          thStyle: 'width:10%'
        },
        {
          key: 'memberName',
          label: 'Name',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'memberEmail',
          label: 'Email',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'memberAccess',
          label: 'Access',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'memberStatus',
          label: 'Status',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],
      items: []
    }
  },
  validations: {
  },
  methods: {
    upGradePackadge () {
      this.partnerobject.SubscriptionPlan = 'Monthly'
      return axios
        .put('/portal/api/Customers/' + this.partnerobject.Id, this.partnerobject)
        .then(response => {
          this.getPartner(JSON.parse(localStorage.getItem('userId'))).then(() => {
            var newObj = Object.assign({}, this.partnerStore)
            this.partnerobject = this.convertAllToUpper(newObj)

            this.users = [{ EmailAddress: '', GivenName: '', FamilyName: '', Role: 'Administrator', OrganizationId: JSON.parse(localStorage.getItem('organizationId')), validations: { isEmail: false, isEmailDuplicate: false, GivenName: false, FamilyName: false, isValid: true } }]
            this.$refs.addUsers.click()
            this.$refs.upGradePackadgeClose.click()
          })
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
      console.log('y')
      return obj
    },
    ...mapActions('partner', [
      'getPartner'
    ]),
    fakeSelectBlur () {
      alert()
    },
    fakeDropDownClick () {
      this.dropDownIconToggale = !this.dropDownIconToggale
    },
    imgUserDError (email) {
      this.$refs[email].src = '/uploads/localhost/profile_pic.png'
    },
    getProfilePicURL (data) {
      return 'https://stuttie-files.s3.us-east-2.amazonaws.com/' + data.item.memberId + '/' + data.item.memberImage
    },
    showActions (user) {
      // if the super admin just hide his actions if user email and org mail match
      // if an admin hide all actions for all admins role admin

      if (user.memberAccess == 'Administrator') {
        // if loged in user is super admin
        // else logged in user an admin
        if (this.loggedInUser == this.orgEmail) {
          if (user.memberEmail == this.orgEmail) {
            return false
          } else {
            return true
          }
        } else {
          return false
        }
      } else {
        return true
      }
      console.log(user)
    },
    isEmailDuplicate (email) {
      return new Promise((resolve, reject) => {
        axios
          .get('/portal/api/Customers/IsEmailIdDuplicate?email=' + email)
          .then((response) => {
            resolve(response.data)
          })
      })
    },
    modelIsValid () {
      for (var user of this.users) {
        if (!user.validations.isValid) {
          return false
        }
      }
      return true
    },
    validateEmail (user) {
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
      console.log(user.EmailAddress)
    },
    sendInvitation () {
      event.preventDefault()
      this.loading = true
      if (this.modelIsValid()) {
        axios.post('/portal/api/Customers/InviteBulkCustomer',
          this.users
        ).then((response) => {
          this.selectedUser = null
          this.getOrgUsers()
          this.$refs.addUsers.click()
          this.loading = false
          this.users = [{ EmailAddress: '', GivenName: '', FamilyName: '', Role: 'Partner', OrganizationId: JSON.parse(localStorage.getItem('organizationId')), validations: { isEmail: false, isEmailDuplicate: false, GivenName: false, FamilyName: false, isValid: true } }]
        }).catch((response) => {
          this.loading = false
        })
      } else {
        console.log('Errors in form')
      }
    },
    getAccessString (strr) {
      console.log(strr)
      let newStr
      switch (strr.memberAccess) {
        case 'Partner':
          newStr = 'User'
          break
        case 'Coordinator':
          newStr = 'Coordinator'
          break
        case 'Administrator':
          console.log(this.loggedInUser)
          console.log(strr.memberEmail)
          if (this.orgEmail == strr.memberEmail) {
            newStr = 'Super Admin (owner)'
          } else {
            if (strr.memberEmail == this.loggedInUser) {
              newStr = 'Super Admin (me)'
            } else {
              newStr = 'Super Admin'
            }
          }
          break
      }
      return newStr
    },
    fakeDropDownRoleChnage (role) {
      this.selectedRole = role.systemRole
      this.selectedRoleName = role.name
      this.changeDescriptionText()
      this.dropDownIconToggale = !this.dropDownIconToggale
    },
    userChangeRole () {
      this.changeDescriptionText()
    },
    changeDescriptionText () {
      switch (this.selectedRole) {
        case 'Administrator':
          this.slectedRoleText = this.adminText
          this.selectedRoleName = 'Super Admin'
          break
        case 'Coordinator':
          this.slectedRoleText = this.coordinatorText
          this.selectedRoleName = 'Coordinator'
          break
        case 'Partner':
          this.slectedRoleText = this.userText
          this.selectedRoleName = 'User'
          break
      }
    },
    changeRole (item, index, target) {
      console.log(item)
      this.selectedUser = item
      this.selectedRole = item.memberAccess
      this.changeDescriptionText()
      this.dropDownIconToggale = false
      this.$refs.changeRole.click()
    },
    changeRoleConfirm () {
      let formData = new FormData()
      formData.append('role', this.selectedRole)

      axios.put('/portal/api/Customers/PutCustomerRole/' + this.selectedUser.memberId,
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
        this.selectedUser = null
        this.getOrgUsers()
        this.$refs.changeRole.click()
      })
    },
    removeUser (item, index, target) {
      console.log(item)
      this.isBusy = true

      axios
        .delete('/portal/api/Customers/' + item.memberId)
        .then((response) => {
          this.isBusy = false
          this.getOrgUsers()
        })
    },
    getInitials (name) {
      if (name != '' || name != null) {
        var res = name.split(' ')
        var FirstLetter = res[0].substring(0, 1).toUpperCase()
        var secondLetter = res[1].substring(0, 1).toUpperCase()
        return FirstLetter + secondLetter
      }
    },
    getStatusString (status) {
      if (status) {
        return 'Active'
      } else {
        return 'Inactive'
      }
    },
    getOrgUsers () {
      this.isBusy = true
      axios
        .get('/portal/api/Organization/GetOrganizationMembers?id=' + this.OrganizationId)
        .then((response) => {
          console.log(response.data)

          // find the spuer admin and exchage it to the top
          for (var index in response.data) {
            if (response.data[index].memberEmail == JSON.parse(localStorage.getItem('organizationEmail'))) {
              if (index != 0) {
                var temp = response.data[0]
                response.data[0] = response.data[index]
                response.data[index] = temp
              }
            }
          }

          this.items = response.data
          this.isBusy = false
        })
    },
    activateUser (user) {
      axios
        .put('/portal/api/Customers/UpdateActivate/' + user.memberId)
        .then((response) => {
          this.getOrgUsers()
        })
    },
    inactivateUser (user) {
      axios
        .put('/portal/api/Customers/UpdateDeactivate/' + user.memberId)
        .then((response) => {
          this.getOrgUsers()
        })
    },
    openAddUserWindow () {
      if (this.partnerobject.SubscriptionPlan == 'Solo') {
        this.$refs.upgradePackadge.click()
      } else {
        this.users = [{ EmailAddress: '', GivenName: '', FamilyName: '', Role: 'Administrator', OrganizationId: JSON.parse(localStorage.getItem('organizationId')), validations: { isEmail: false, isEmailDuplicate: false, GivenName: false, FamilyName: false, isValid: true } }]
        this.$refs.addUsers.click()
      }
    },
    deleteUser (index) {
      this.users.splice(index, 1)
    },
    addUser () {
      this.users.push({ EmailAddress: '', GivenName: '', FamilyName: '', Role: 'Administrator', OrganizationId: JSON.parse(localStorage.getItem('organizationId')), validations: { isEmail: false, isEmailDuplicate: false, GivenName: false, FamilyName: false, isValid: true } })
    }
  },
  computed: {
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
    popoverConfig () {
      return {
        html: true,
        title: () => {
          return '<b>User Role Details:</b>'
        },
        content: () => {
          return 'Super Admin:<br> <em>All User previlages, plus the ability to administrate organization. </em> <br><br> Coordinator:<br> <em>All User previlages, plus the ability to manage appointments and reports for others. </em> <br><br>User:<br><em>Users can manage their own appointments and reports, and update their personal profile. </em>'
        }
      }
    }
  },
  mounted: function () {
    this.$ga.page('/portal/userDirectory')
    this.OrganizationId = JSON.parse(localStorage.getItem('organizationId'))
    this.getOrgUsers()
    this.getPartner(JSON.parse(localStorage.getItem('userId'))).then(() => {
      var newObj = Object.assign({}, this.partnerStore)
      this.partnerobject = this.convertAllToUpper(newObj)
    })
  }
}

</script>

<style scoped>
  .no-padding-margin {
    padding: 0px !important;
    margin: 0px !important;
    padding-left: 0px !important;
  }

  .heading {
    color: #01151C;
    font-size: 30px;
    font-weight: bold
  }

  .sub-title {
    color: #576367;
    font-size: 13px;
    font-weight: bold
  }

</style>

<style>

  .tbHeadingClass {
    border: none;
    color: #546064;
    font-weight: bold
  }

  .tbBodyClass {
    color: #01151C;
  }
  .nameDiv {
    width: 40px;
    height: 40px;
    border-radius: 7px;
    float: left;
    position: relative;
    margin-left: 23%;
  }
  .nameP {
    text-align: center;
    margin-top: 7px;
    position: relative;
    color: white;
  }
  .imageT {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 7px;
    float: left;
    margin-left: 23%;
  }

  .deacriveClass {
    background: #E6EAEC;
    color: #01151C;
    text-align: center;
    position: relative;
    width: 87px;
    border-radius: 22px;
  }

  .activeClass {
    background: #D7FCE7;
    color: #00AC4E;
    text-align: center;
    position: relative;
    width: 87px;
    border-radius: 22px;
  }
  .dropdown {
    color: #01151C;
    font-size: 15px;
    font-weight: bold
  }
  .dropDownColor {
    color: #01151C;
    font-weight: bold;
    font-size: 14px
  }

  table.b-table[aria-busy='true'] {
    color:green;
    opacity: 0.6;
  }

  .errorInput {
    border: 1px solid #e74a3b;
  }

  .errorMsg {
    font-size: 80%;
    color: #e74a3b;
  }

  .btnInviteUser {
    background-color: var(--success);
    border: none
  }

  .customDropMain {
    width: 425px;
    height: 39px;
  }

  .fakeSelectDiv {
    width: 425px;
    height: 39px;
    border-radius: 7px;
  }

  .fakeSelectDivBoarder {
    border: 1px solid rgb(84, 96, 100);
  }

  .fakeSelectDivBorderForcus {
    border: 1px solid var(--success);
  }

  .seletedUserRoleP {
    position: relative;
    float: left;
    margin-left: 12px;
    margin-top: 5px;
    padding: 0px;
    color: rgb(1, 21, 28);
  }

  .fakeDropDownArrow {
    position: relative;
    float: right;
    margin-right: 10px;
    margin-top: 5px;
  }
  .fakeDropDownItemDiv {
    box-shadow: rgba(207, 222, 230, 0.424) 0px 4px 10px;
    border-radius: 7px;
    background: white;
    width: 425px;
    height: 280px;
    z-index: 9;
    position:fixed
  }

  .userRoleP {
    margin: 0px;
    float: left;
    margin-left: 10px;
    color: rgb(1, 21, 28);
    font-weight:bold
  }

  .userRollDesP {
    margin: 0px;
    float: left;
    margin-left: 10px;
    margin-top: 3px;
    color: rgb(1, 21, 28);
    font-size:80%;
    font-weight:400
  }

  .fakeDropDownItem {
    height: 80px;
    margin-top: 10px;
  }

  .fakeDropDownItem:hover {
    background: #DEEFE6;
    cursor:pointer
  }

</style>
