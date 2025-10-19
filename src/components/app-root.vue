<template>
  <div id="wrapper">
    <!-- Sidebar -->
    <ul class="navbar-nav sticky-top bg-black sidebar sidebar-dark accordion" v-bind:class="{ 'toggled': toggle }" id="accordionSidebar" v-if="!isSettings && !isOnBoarding" style="z-index:1040">
      <ul class="navbar-nav fixed-top sticky-top bg-black sidebar sidebar-dark accordion" v-bind:class="{ 'toggled': toggle }" id="accordionSidebar" v-if="!isSettings">
        <div style="padding-top:10px">
          <a class="sidebar-brand d-flex noNameMobile" href="/" :class="{'withName':!toggle, 'noName':toggle}" style="width: 96px;">
            <div v-if="companystore.logo != null" class="displayImageOrg-outer-div" style="background:white">
              <b-img v-if="companystore.logo != null" class="displayImageOrg" :src="computedUrlOrg" fluid alt="Responsive image" @error="imgErrorOrg" ref="imageReforg"></b-img>
            </div>
            <div v-if="companystore.logo == null" class="displayImageOrg-outer-div" style="background:white">
              <b-img class="displayImageOrg" src="/img/silhouette_large.png" fluid alt="Responsive image"></b-img>
            </div>
          </a>
          <p v-if="!toggle" class="OrgName">@{{partnerStore.defaultRoomId}}</p>
        </div>
        <!-- Sidebar - Brand -->
        <div v-for="item in meetingsSideBarLinkArray" v-bind:key="item.displayName" class="parent-meeting" v-if="setAccsessRights(item) && !toggleOnMobile">
          <!--<hr class="sidebar-divider my-0">-->
          <li class="nav-item" @click="linkedClickedActivate(item)" style="margin:10px 0px 0px 0px">
            <div style="overflow: hidden; position: relative; width: 100%;">
              <div :class="{hoverMenueNoToggle:!toggle, hoverMenueToggle:toggle}">
                <div class="hover-meeting-div">
                  <router-link class="nav-link hover-meeting-div" :to='item.Link' :class="{meetingLinkToggeled:toggle}" v-b-popover.hover="{ customClass: 'hoverPopUpclass', content:item.displayName}" :disabled="!toggle" active-class="active">
                    <b-img :src="item.img" fluid alt="Responsive image" style="width:18px" :class="{meetingImgToggle: toggle}"></b-img>
                    <!--<b-icon :class="{activessIcon:item.isActive && toggle , notactivessIcon:!item.isActive}" :icon="item.icon" aria-hidden="true"></b-icon>-->
                    <span v-if="!toggle" class="DisplayName" style="padding-left: 8px; color: white">{{item.displayName}}</span>
                  </router-link>
                </div>
              </div>
            </div>
          </li>
        </div>
        <!--test start-->
        <div v-for="item in meetingsSideBarLinkArray" v-bind:key="item.displayName" class="parent-meeting" v-if="setAccsessRights(item) && toggleOnMobile">
          <!--<hr class="sidebar-divider my-0">-->
          <li class="nav-item" @click="linkedClickedActivate(item)" style="margin:10px 0px 0px 0px">
            <div style="overflow: hidden; position: relative; width: 100%;">
              <div style="padding-right:3px; width:95%;float:left; margin-left: 4px;">
                <div class="childContentDivTogled">
                  <router-link class="nav-link" :to='item.Link' :class="{meetingLinkToggeled:true}" v-b-popover.hover="{ customClass: 'hoverPopUpclass', content:item.displayName}" :disabled="!toggle" active-class="active">
                    <b-img :src="item.img" fluid alt="Responsive image" style="width:18px" class="meetingImgToggle"></b-img>
                    <span v-if="!toggle" class="DisplayName" style="padding-left: 8px; color: white">{{item.displayName}}</span>
                  </router-link>
                </div>
              </div>
              <div>
              </div>
            </div>
          </li>
        </div>
        <div id="publicview">
          <span v-if="!toggle" class="DisplayName" style="padding-left: 8px; color: white">Use Stuttie As:</span>
          <b-list-group v-for="option in options">
            <b-list-group-item href="#" @click="switchView(option.value)">
              {{option.text}}  <i class="fas fa-check" v-if="option.value == mode"></i>
            </b-list-group-item>
          </b-list-group>
        </div>
      </ul>
    </ul>
    <!-- End Sidebar -->
    <!-- Starting the settings Sidebar -->
    <ul class="navbar-nav sticky-top bg-light sidebar sidebar-settings accordion" v-bind:class="{ 'toggled': toggle }" id="accordionSidebar" v-if="isSettings && !isOnBoarding" style="z-index:1040">
      <ul class="navbar-nav fixed-top sticky-top bg-light sidebar sidebar-settings accordion" v-bind:class="{ 'toggled': toggle }" id="accordionSidebar" v-if="isSettings">
        <!-- Sidebar - Brand -->
        <a class="sidebar-brand bg-white d-flex" href="/">
          <img style="height: 50px; margin-top: -14px;" src="/images/settings-logo.png" alt="" class="img-fluid">
        </a>
        <li class="nav-item" @click="showHideSideBar('forum')">
          <router-link class="nav-link" to="/portal/forum">
            <b-icon icon="arrow-left" aria-hidden="true" @click="showHideSideBar('forum')"></b-icon>
            <span class="back-text">Back to Stuttie</span>
          </router-link>
        </li>
        <li class="nav-item mt-1" v-for="item in userSettingsLinkArray" v-bind:key="item.displayName" @click="linkedClickedActivate(item)" v-if="setAccsessRights(item)">
          <div class="parent" style="overflow: hidden; position: relative; width: 100%;">
            <div :class="{activeName:item.isActive}" class="hover-div settings-item-div">
              <router-link class="nav-link pt-0" :to='item.Link' style="margin-top:10px !important">
                <span class="ml-3 sidebar-settings-item setting-menue-item-font">{{item.displayName}}</span>
              </router-link>
            </div>
            <div class="hover-active-div" :class="{activess:item.isActive}" style="height: 100%; width: 3%; position: absolute; top: 0; border-radius:14px">
            </div>
          </div>
        </li>
        <hr class="sidebar-divider my-0 mt-2" v-if="toShow">
        <li class="nav-item mt-1" v-for="item in orgSettingsLinkArray" v-bind:key="item.displayName" @click="linkedClickedActivate(item)" v-if="setAccsessRights(item)">
          <div class="parent" style="overflow: hidden; position: relative; width: 100%;">
            <div :class="{activeName:item.isActive}" class="hover-div settings-item-div">
              <router-link class="nav-link pt-0" :to='item.Link' style="margin-top:10px !important">
                <span class="ml-3 sidebar-settings-item setting-menue-item-font">{{item.displayName}}</span>
              </router-link>
            </div>
            <div class="hover-active-div" :class="{activess:item.isActive}" style="height: 100%; width: 3%; position: absolute; right: 0; top: 0; border-radius:14px">
            </div>
          </div>
        </li>
      </ul>
    </ul>
    <!-- End settings Sidebar -->
    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column" :class="{onBoardBackground:isOnBoarding}">
      <!-- Main Content -->
      <div id="content" :class="{whiteBackground : isSettings, onBoardBackground:isOnBoarding}">

        <b-navbar toggleable="lg" variant="white" type="#546064" class="navbar fixed-top   navbar-expand navbar-light bg-white topbar mb-1">
          <!--<button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3" @click="toggle=!toggle">
          <i class="fa fa-bars"></i>
        </button>-->
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <a class="sidebar-brand bg-white d-flex" href="/" v-if="isOnBoarding">
              <img style="height: 50px; margin-top: -14px;" src="/images/settings-logo.png" alt="" class="img-fluid">
            </a>
            <b-img src="/images/toggleIcon.svg" fluid alt="Responsive image" @click="toggle=!toggle" :class="{toggleImage:!toggle, toggleImageToggled:toggle}" v-if="!isOnBoarding && !isSettings"></b-img>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto userDropDownText" v-if="!isOnBoarding">
              <!--<search></search>-->
              <alerts></alerts>
              <messages></messages>
              <b-nav-item-dropdown right menu-class="dropDownMenue">
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                  <div class="tileDiv">
                    <p><i class="fas fa-cog fa-fw"></i></p>
                  </div>
                </template>
                <div style="min-width: 215px;">
                  <b-dropdown-item v-if="setAccsessRightsDropDown('profile')" @click="showHideSideBar('profile')" :to="'/portal/settings/profile'">
                    <b-img src="/images/dropdown-profile.svg" fluid alt="Responsive image"></b-img>
                    <span style="color:#01151C;margin-left: 15px;font-weight: bold;">My Profile</span>
                  </b-dropdown-item>
                  <b-dropdown-item v-if="setAccsessRightsDropDown('settings')" @click="showHideSideBar('settings')" :to="'/portal/settings/accountSettings'">
                    <b-img src="/images/dropdown-settings.svg" fluid alt="Responsive image"></b-img>
                    <span style="color:#01151C;margin-left: 15px;font-weight: bold;">Settings</span>
                  </b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item @click="Logout()">
                    <b-img src="/images/dropdown-logout.svg" fluid alt="Responsive image"></b-img>
                    <span style="color:#01151C;margin-left: 15px;font-weight: bold;">Sign Out</span>
                  </b-dropdown-item>
                </div>
              </b-nav-item-dropdown>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto userDropDownText" v-if="isOnBoarding">
              <b-nav-item-dropdown right menu-class="dropDownMenue" toggle-class="toogleButn">
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                  <div style="position:relative;margin-top: -23px;">
                    <div style="position:relative;float:right;margin-right:10px" class="d-none d-sm-none d-md-block">
                      <em style="margin-left:2%; font-style:normal; color: var(--success); font-weight:400">{{partnerStore.givenName + " " + partnerStore.familyName}} </em>
                    </div>
                    <div style="position:relative;float:right;margin-top:-9px;margin-right:3px">
                      <b-img v-if="partnerStore.displayPicture != null" class="displayImage" :src="computedUrl" fluid alt="Responsive image" @error="imgError" ref="imageRef"></b-img>
                      <div v-if="partnerStore.displayPicture == null" class="tileDiv" :style="{backgroundColor: colorCode}">
                        <p class="tileInitialProf ">{{setInitials}}</p>
                      </div>
                    </div>
                  </div>
                </template>
                <b-dropdown-item @click="Logout()">
                  <b-img src="/images/dropdown-logout.svg" fluid alt="Responsive image"></b-img>
                  <span style="color:#01151C;margin-left: 15px;font-weight: bold;">Sign Out</span>
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        <!-- Begin Page Content -->
        <div class="container-fluid" style="padding:0px;margin-top:70px">
          <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
          <router-view></router-view>
        </div>
        <!-- /.container-fluid -->
        <!--testing the add timezone modal-->
        <div id="app">
          <div class="container">
            <timezone-modal></timezone-modal>
          </div>
        </div>

      </div>
      <!-- End of Main Content -->
      <!-- Footer -->
      <footer class="sticky-footer bg-white mt-3" v-if="storeTodayMeetings.length > 0 ||  storeUpcomingMeetings.length > 0">

        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; 2020 Stuttie, Inc.</span>
          </div>
        </div>
      </footer>
      <!-- End of Footer -->
      <!-- Create Project modal -->
      <b-modal id="modal-project" title="Add Project" hide-footer>
        <project></project>
      </b-modal>
    </div>
    <!-- End Content Wrapper -->
  </div>
</template>

<script>
import messages from './messages/notification.vue'
import alerts from './alerts/notification.vue'
import search from './search/main.vue'
import timezoneModal from './timezoneModal.vue'
import axios from 'axios'
import NavMenu from './nav-menu'
import { BIcon, BIconArrowLeft, BIconCalendar3, BIconCardList, BIconBuilding, BIconBoxArrowRight } from 'bootstrap-vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    'nav-menu': NavMenu,
    'timezone-modal': timezoneModal,
    BIcon,
    BIconArrowLeft,
    BIconCalendar3,
    BIconCardList,
    BIconBuilding,
    BIconBoxArrowRight,
    alerts,
    messages,
    search
  },
  data () {
    return {
      toShow: true,
      OrganizationId: '',
      isTutor: '',
      isCoordiator: '',
      isAdminstrator: '',
      isUser: '',
      user: '',
      mode: 'Public',
      options: [
        { text: 'Public View', value: 'Public' },
        { text: 'School View', value: 'School' }
      ],
      toggle: false,
      toggleOnMobile: false,
      isSettings: false,
      meetingsSideBarLinkArray: [
        { 'displayName': 'Forum', 'Link': '/portal/forum', isActive: true, img: '/images/hashtag.svg' },
        { 'displayName': 'Groups', 'Link': '/portal/groups/list', isActive: false, img: '/images/group.svg' },
        { 'displayName': 'Courses', 'Link': '/portal/courses/list', isActive: false, img: '/images/educationcap.svg' },
        { 'displayName': 'Chat', 'Link': '/portal/chat/rooms', isActive: false, img: '/images/chat.svg' },
        { 'displayName': 'Jobs', 'Link': '/portal/jobs', isActive: false, img: '/images/job.svg' },
        { 'displayName': 'Tutors', 'Link': '/portal/tutors/list', isActive: false, img: '/images/tutor.svg' },
        { 'displayName': 'Lessons', 'Link': '/portal/meetingList', isActive: false, img: '/images/meeting.svg' },
        { 'displayName': 'Messages', 'Link': '/portal/messages', isActive: false, img: '/images/mail.svg' }
      ],
      userSettingsLinkArray: [
        { 'displayName': 'Profile', 'Link': '/portal/settings/profile', isActive: true },
        { 'displayName': 'School Profile', 'Link': '/portal/settings/school', isActive: false },
        { 'displayName': 'Tutor Profile', 'Link': '/portal/settings/organization', isActive: false },
        { 'displayName': 'Education', 'Link': '/portal/settings/education', isActive: false },
        { 'displayName': 'Account Settings', 'Link': '/portal/settings/accountSettings', isActive: false },
        { 'displayName': 'Subjects', 'Link': '/portal/settings/subjects', isActive: false },
        { 'displayName': 'Languages', 'Link': '/portal/settings/languages', isActive: false },
        { 'displayName': 'Billing & Invoices', 'Link': '/portal/settings/billing', isActive: false }
      ],
      orgSettingsLinkArray: [
      ],
      userName: '',
      tileInitial: '',
      colorCode: '',
      displayImage: '',
      memberId: '',
      windowHeight: window.outerWidth,
      txt: ''
    }
  },
  computed: {
    alert () {
      return this.$store.state.alert
    },
    ...mapState({
      isOnBoarding: state => state.onboarding.isOnBoarding
    }),
    ...mapState({
      storeTodayMeetings: state => state.meeting.todayMeetings
    }),
    ...mapState({
      storeUpcomingMeetings: state => state.meeting.upcomingMeetings
    }),
    ...mapState({
      companystore: state => state.company.company
    }),
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
    ...mapState({
      school: state => state.school.school
    }),
    computedUrl () {
      return 'https://stuttie-files.s3.us-east-2.amazonaws.com/' + JSON.parse(localStorage.getItem('userId')) + '/' + this.partnerStore.displayPicture
    },
    computedUrlOrg () {
      return 'https://stuttie-files.s3.us-east-2.amazonaws.com/' + JSON.parse(localStorage.getItem('organizationId')) + '/' + this.companystore.logo
    },
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
    setInitials () {
      var FirstLetter = this.partnerStore.givenName.substring(0, 1).toUpperCase()
      var secondLetter = this.partnerStore.familyName.substring(0, 1).toUpperCase()
      return FirstLetter + secondLetter
    },
    setInitialsOrg () {
      var name = this.companystore.name
      var res = name.split(' ')
      if (res.length == 1) { return res[0].substring(0, 1).toUpperCase() } else { return res[0].substring(0, 1).toUpperCase() + res[1].substring(0, 1).toUpperCase() }
    }
  },
  watch: {
    $route (to, from) {
      var routeID = localStorage.getItem('userId')
      document.title = to.meta.title
      if (to.name == 'onBoardingAddCreditCard' || to.name == 'onBoardingMyProfile' || to.name == 'onBoardingInviteUsers' || to.name == 'onBoardingInvitedUsers') {
        var routeID = localStorage.getItem('userId')
        localStorage.removeItem(routeID)
      } else {
        localStorage.setItem(routeID, JSON.stringify(to))
        this.handleReloard()
      }
      // clear alert on location change
      this.$store.dispatch('alert/clear')
    },
    windowHeight (newHeight, oldHeight) {
      this.txt = `it changed to ${newHeight} from ${oldHeight}`
    }
  },
  methods: {
    switchView (name) {
      let _company = { ...this.companystore }
      if (name == 'Public') {
        _company.defaultView = 'Public'
        this.updateCompany(_company)
        this.mode = 'Public'
        localStorage.setItem('mode', 'Public')
        this.$router.go()
      } else {
        if (this.school == '') {
          this.$router.push({ path: '/portal/settings/school' })
        }
        _company.defaultView = 'School'
        this.updateCompany(_company)
        this.mode = 'School'
        localStorage.setItem('mode', 'School')
        this.$router.go()
      }
    },
    Logout () {
      var routeID = localStorage.getItem('userId')
      localStorage.removeItem(routeID)
      window.location = '/Portal/Dashboard/Logout'
    },
    imgErrorOrg () {
      this.$refs.imageReforg.src = '/uploads/localhost/profile_pic.png'
    },
    imgError () {
      this.$refs.imageRef.src = '/uploads/localhost/profile_pic.png'
    },
    ...mapActions('partner', [
      'getPartner'
    ]),
    updateImage (response) {
      if (response) {
        this.getOrgUsers()
        return 'https://stuttie-files.s3.us-east-2.amazonaws.com/' + this.memberId + '/' + this.displayImage
      } else {
        this.displayImage = ''
      }
    },
    getInitials (name) {
      if (name != '' || name != null) {
        var res = name.split(' ')
        var FirstLetter = res[0].substring(0, 1).toUpperCase()
        var secondLetter = res[1].substring(0, 1).toUpperCase()
        return FirstLetter + secondLetter
      }
    },
    getOrgUsers () {
      axios
        .get('/portal/api/Organization/GetOrganizationMembers?id=' + JSON.parse(localStorage.getItem('organizationId')))
        .then((response) => {
          // find the user and display the image/tile in profile section
          for (var index in response.data) {
            if (response.data[index].memberId == JSON.parse(localStorage.getItem('userId'))) {
              this.displayImage = response.data[index].memberImage
              this.colorCode = response.data[index].memberColorCode
              this.memberId = response.data[index].memberId
            }
          }
        })
    },
    setAccsessRights (link) {
      this.isCoordiator = JSON.parse(localStorage.getItem('isCoordiator'))
      this.isUser = JSON.parse(localStorage.getItem('isUser'))
      this.isTutor = JSON.parse(localStorage.getItem('isTutor'))

      if (this.companystore.isTutor && this.isTutor == 'False') { // user is not part of the tutor group - ie they are a student that added tutor flag
        if (link.displayName == 'Forum' || link.displayName == 'Groups' || link.displayName == 'Courses' || link.displayName == 'Chat' || link.displayName == 'Jobs' || link.displayName == 'Tutors' || link.displayName == 'Messages' || link.displayName == 'Lessons' || link.displayName == 'Profile' || link.displayName == 'Education' || link.displayName == 'Subjects' || link.displayName == 'Languages' || link.displayName == 'Account Settings' || link.displayName == 'School Profile' || link.displayName == 'Tutor Profile' || link.displayName == 'Billing & Invoices') { return true }
        return false
      } else if (this.companystore.isTutor) {
        if (link.displayName == 'Forum' || link.displayName == 'Groups' || link.displayName == 'Courses' || link.displayName == 'Chat' || link.displayName == 'Jobs' || link.displayName == 'Messages' || link.displayName == 'Lessons' || link.displayName == 'Profile' || link.displayName == 'Education' || link.displayName == 'Subjects' || link.displayName == 'Languages' || link.displayName == 'Account Settings' || link.displayName == 'School Profile' || link.displayName == 'Tutor Profile' || link.displayName == 'Billing & Invoices') { return true }
        return false
      } else if (!this.companystore.isTutor) {
        if (link.displayName == 'Forum' || link.displayName == 'Groups' || link.displayName == 'Courses' || link.displayName == 'Chat' || link.displayName == 'Jobs' || link.displayName == 'Tutors' || link.displayName == 'Messages' || link.displayName == 'Profile' || link.displayName == 'Subjects' || link.displayName == 'Account Settings' || link.displayName == 'School Profile' || link.displayName == 'Organization Profile' || link.displayName == 'Billing & Invoices') { return true }
        return false
      } else {
        return true
      }
    },
    setAccsessRightsDropDown (tab) {
      this.isCoordiator = JSON.parse(localStorage.getItem('isCoordiator'))
      this.isUser = JSON.parse(localStorage.getItem('isUser'))

      if (this.isCoordiator == 'True' || this.isUser == 'True') {
        if (tab == 'profile' || tab == 'settings') { return true }
        return false
      } else {
        return true
      }
    },
    ...mapActions('company', [
      'getCompany',
      'updateCompany'
    ]),
    ...mapActions('onboarding', [
      'changeIsOnBoarding'
    ]),
    ...mapActions('school', [
      'getSchoolByOrg',
      'getSchoolAdminByOrg',
      'setMode'
    ]),
    showHideSideBar (tab) {
      if (tab == 'forum') {
        this.linkedClickedActivate({ 'displayName': 'Forum', 'Link': '/portal/forum', isActive: false, img: '/images/bookMeeting.svg' })
        this.isSettings = false
      } else if (tab == 'profile') {
        this.linkedClickedActivate({ 'displayName': 'Profile', 'Link': '/portal/settings/profile', isActive: true })
        this.isSettings = true
      } else if (tab == 'organization') {
        this.linkedClickedActivate({ 'displayName': 'Tutor Profile', 'Link': '/portal/settings/organization', isActive: true })
        this.isSettings = true
      } else if (tab == 'userDirectory') {
        this.linkedClickedActivate({ 'displayName': 'Users', 'Link': '/portal/userDirectory', isActive: true })
        this.isSettings = true
      } else if (tab == 'settings') {
        this.linkedClickedActivate({ 'displayName': 'Account Settings', 'Link': '/portal/settings/accountSettings', isActive: true })
        this.isSettings = true
      }
    },
    linkedClickedActivate (link) {
      for (var item of this.userSettingsLinkArray) {
        if (item.displayName == link.displayName) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      }

      for (var item of this.orgSettingsLinkArray) {
        if (item.displayName == link.displayName) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      }

      for (var item of this.meetingsSideBarLinkArray) {
        if (item.displayName == link.displayName) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      }
    },
    onResize () {
      this.windowHeight = window.outerWidth
      if (this.windowHeight <= 781) {
        this.toggleOnMobile = true
      } else {
        this.toggleOnMobile = false
      }
    },
    handleReloard () {
      // check local storage exist with email prefix
      //
      // check user priviladges
      // remove from local storage if user logs out -- pending

      var routeID = localStorage.getItem('userId')

      if (localStorage.getItem(routeID) == null) {
        this.$router.push({ path: '/portal/forum' })
      } else {
        var route = JSON.parse(localStorage.getItem(routeID))
        this.$router.push({ path: route.path })

        if (route.name == 'forum') {
          this.isSettings = false
          this.linkedClickedActivate({ 'displayName': 'Forum', 'Link': '/portal/forum', isActive: true, img: '/images/meetingList.svg' })
        } else if (route.name == 'bookMeetings') {
          this.isSettings = false
          this.linkedClickedActivate({ 'displayName': 'Scheduler', 'Link': '/portal/bookMeetings', isActive: false, img: '/images/bookMeeting.svg' })
        } else if (route.name == 'profile' || route.name == 'editProfileName' || route.name == 'editDisplayName' || route.name == 'editStuttieAddress') {
          this.isSettings = true
          this.linkedClickedActivate({ 'displayName': 'Profile', 'Link': '/portal/settings/profile', isActive: true })
        } else if (route.name == 'accountSettings' || route.name == 'passwordChange') {
          this.isSettings = true
          this.linkedClickedActivate({ 'displayName': 'Account Settings', 'Link': '/portal/settings/accountSettings', isActive: true })
        } else if (route.name == 'organizationProfile' || route.name == 'editOrganizationAddress' || route.name == 'editOrganizationName' || route.name == 'editOrganizationPhone' || route.name == 'aboutOrganization') {
          this.isSettings = true
          this.linkedClickedActivate({ 'displayName': 'Tutor Profile', 'Link': '/portal/settings/organization', isActive: true })
        } else if (route.name == 'userDirectory') {
          this.isSettings = true
          this.linkedClickedActivate({ 'displayName': 'Users', 'Link': '/portal/userDirectory', isActive: true })
        } else if (route.name == 'billing' || route.name == 'paymentInfo') {
          this.isSettings = true
          this.linkedClickedActivate({ 'displayName': 'Billing', 'Link': '/portal/settings/billing', isActive: true })
        }
      }
    }
  },
  mounted: function () {
    this.getSchoolAdminByOrg(JSON.parse(localStorage.getItem('actualOrgId')))
    this.getSchoolByOrg(JSON.parse(localStorage.getItem('actualOrgId')))
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })

    if (this.windowHeight <= 781) {
      this.toggleOnMobile = true
    } else {
      this.toggleOnMobile = false
    }

    this.isCoordiator = JSON.parse(localStorage.getItem('isCoordiator'))
    this.OrganizationId = JSON.parse(localStorage.getItem('organizationId'))
    this.isUser = JSON.parse(localStorage.getItem('isUser'))

    this.getOrgUsers()
    // to fetch the name for User Profile
    this.getPartner(JSON.parse(localStorage.getItem('userId'))).then(() => {
      this.userName = this.partnerStore.givenName + ' ' + this.partnerStore.familyName
      // getting the initals of the name
      var FirstLetter = this.partnerStore.givenName.substring(0, 1).toUpperCase()
      var secondLetter = this.partnerStore.familyName.substring(0, 1).toUpperCase()
      this.tileInitial = FirstLetter + secondLetter
    })

    if (this.isCoordiator == 'True' || this.isUser == 'True') { this.toShow = false }

    var isFirstTime = JSON.parse(localStorage.getItem('isFirstLogin'))
    var userEmail = JSON.parse(localStorage.getItem('org'))
    var orgEmail = JSON.parse(localStorage.getItem('organizationEmail'))

    if (isFirstTime == true && (userEmail == orgEmail)) {
      this.changeIsOnBoarding(true)
      this.$router.push({ path: '/portal/onboarding/my-profile' })
    } else if (isFirstTime == true && (userEmail != orgEmail)) {
      this.changeIsOnBoarding(true)
      this.$router.push({ path: '/portal/onboarding/invited-user' })
    } else {
      this.handleReloard()
    }

    let self = this
    this.getCompany(this.OrganizationId).then(function () {
      self.mode = self.companystore.defaultView == null ? 'Public' : self.companystore.defaultView
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  }

}
</script>

<style>

  .dropDownMenue {
    box-shadow: 0px 4px 10px #CFDEE66C;
    width:400px
  }

  .bg-black {
    background-color: #4285f4;
    background-image: linear-gradient(180deg, #4285f4 10%, #4285f4 100%);
    background-size: cover;
  }

  .img-large {
    width: 100%;
    max-width: 40px;
    min-width: 40px;
  }

  .img-small {
    width: 70%;
  }

  .userDropDownText {
    font: Medium 16px/19px Lato;
    height: 56px;
    border-radius: 7px;
    min-width: 60px;
  }
    .userDropDownText:hover {
      background: #F8F9FC
    }

    .settings-sub-headings {
      text-align: left;
      font: Medium 16px/19px Lato;
      letter-spacing: 0px;
      color: #01151C;
      opacity: 0.46;
      width: 100%
    }

  .sidebar-settings-item {
    color: #01151C;
    font-weight: bold
  }

  #no-hover:hover {
    cursor: default;
    color: #9A9A9A;
  }

  .parent:hover .hover-div span {
    color: #4285f4;
  }

  .activess {
    background: #4285f4;
  }

  .activeName span {
    color: #4285f4;
  }

  .whiteBackground {
    background: white;
  }

  .onBoardBackground {
    background: #FAFEFF !important;
    height: 100vh
  }

  .hoverPopUpclass {
    color:black
  }

  .activeNameMeeting {
    background: #223339;
    border-radius: 9px;
  }

  a.nav-link.hover-meeting-div.router-link-exact-active.active {
    background: #223339;
    border-radius: 9px;
  }
  .activeNameMeetingToggle {
    background: #00AC4E;
    border-radius: 9px;
  }

  .parent-meeting:hover .hover-active-div {
    background: #00AC4E
  }
  .displayImage{
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 7px;
   /* float: left;
    margin-left: 15%;*/
    margin-bottom: 38%;
  }
  .tileDiv {
    width: 40px;
    height: 40px;
    min-width:40px;
    border-radius: 7px;
    float: left;
    /*position: relative;
    margin-left: 22%;*/
    margin-bottom: 30%;
  }
  .tileInitial {
    text-align: center;
    margin-top: 17px;
    position: relative;
    color: white;
  }

  .tileInitialProf {
    text-align: center;
    margin-top: 8px;
    position: relative;
    color: white;
  }
  .meetingImgToggle {
    margin-top:7px
  }
  .OrgName {
    white-space: nowrap;
    width: 165px;
    overflow: hidden;
    text-overflow: ellipsis;
    float: left;
    color: white !important;
    margin-top: 25px;
    display: none
  }

  .displayImageOrg-outer-div {
    position: relative;
    width: 60px;
    height: 59px;
    border-radius: 7px;
    float: left;
    margin-top: -17px;
  }

  .displayImageOrg {
    position: relative;
    width: 60px;
    height: 59px;
    border-radius: 7px;
    float: left;
  }

  .noNameMobile {
    width: 70px;
    margin-left: auto;
    margin-right: auto
  }
  .DisplayName {
    display:none !important;
  }
  .tileOrgDiv {
    position: relative;
    width: 60px;
    height: 59px;
    border-radius: 7px;
    float: left;
    margin-top: -17px;
  }

  .childContentDiv {
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }
  .childContentDivTogled {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    width: 60px;
    height: 59px;
    border-radius: 9px;
  }

  .childContentDivTogled:hover {
    background: #00AC4E;
    border-radius: 9px;
  }

  .meetingLinkToggeled {
    width:100% !important
  }

  .notActiveitemBackgroundToggled {
    background: #223339;
  }

  .toggleImage {
    width: 21px;
    cursor: pointer;
    margin-left: 100px;
  }

  .toggleImageToggled {
    width: 21px;
    cursor: pointer;
    margin-left: 0px;
  }

  .settings-item-div {
    padding-right: 3px;
    width: 87%;
    float: left;
    margin-left: 5px;
  }

  .setting-menue-item-font {
    padding-top: 10px !important;
  }

  @media (min-width: 768px) {

    .setting-menue-item-font {
      padding-top: 10px !important;
      font-size:18px !important;
    }

    .back-text {
      font-size:16px !important;
    }

    .settings-item-div {
      padding-right: 3px;
      width: 90%;
      float: left;
      margin-left: 13px;
    }

    .hoverMenueNoToggle {
      padding-right: 3px;
      width: 89%;
      float: left;
      margin-left: 16px;
    }

    .hoverMenueToggle {
      padding-right: 3px;
      width: 95%;
      float: left;
      margin-left: 4px;
    }

    .sticky {
      position: -webkit-sticky;
      position: sticky;
      align-self: flex-start;
      top: 0;
    }

    .hoverPopUpclass {
      color: red;

    }

    .displayImage {
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: 7px;/*
      float: left;
      margin-left: 15%;*/
      margin-bottom: 38%;
    }

    .tileDiv {
      width: 40px;
      height: 40px;
      border-radius: 7px;
      float: left;
      position: relative;
     /* margin-left: 22%;*/
      margin-bottom: 30%;
    }

    .tileInitial {
      text-align: center;
      margin-top: 17px;
      position: relative;
      color: white;
    }

    .tileInitialProf {
      text-align: center;
      margin-top: 8px;
      position: relative;
      color: white;
    }

    .OrgName {
      white-space: nowrap;
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      float: left;
      color: white !important;
      margin-top: 25px;
      display: block
    }

    .displayImageOrg-outer-div {
      position: relative;
      width: 60px;
      height: 59px;
      border-radius: 7px;
      float: left;
      margin-top: -17px;
    }

    .displayImageOrg {
      position: relative;
      width: 60px;
      height: 59px;
      border-radius: 7px;
      float: left;
    }

    .withName {
      width: 70px;
      float: left;
    }

    .noName {
      width: 70px;
      margin-left: auto;
      margin-right: auto
    }
    .DisplayName {
      display: block !important;
      display: inline !important;
    }
    .tileOrgDiv {
      position: relative;
      width: 60px;
      height: 59px;
      border-radius: 7px;
      float: left;
      margin-bottom: 38%;
      margin-top: -17px;
    }

    .childContentDiv {
      position: relative;
      margin-left: auto;
      margin-right: auto;
    }

    .childContentDivTogled {
      position: relative;
      margin-left: auto;
      margin-right: auto;
      width: 60px;
      height: 59px;
    }

    .childContentDivTogled:hover {
      background: #00AC4E;
      border-radius: 9px;
    }

    .notActiveitemBackgroundToggled {
      background: #223339;
    }

    .meetingLinkToggeled {
      width: 100% !important
    }

    .toggleImage {
      width: 21px;
      cursor: pointer;
      margin-left: 290px;
    }

    .toggleImageToggled {
      width: 21px;
      cursor: pointer;
      margin-left: 100px;
    }

  }

  li.nav-item a {
    color: #9A9A9A;
  }
  li.nav-item a:hover {
    color: black;
  }
  .badge {
    font-size: 85%;
  }
  .dropdown-toggle::after {
    display: none;
  }
  .custom-control.custom-switch {
    padding-left: 35px;
  }

  span.DisplayName {
    font-size: 0.85rem;
  }

  a.list-group-item.list-group-item-action {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    background-color: #4285f4;
    color: #fff;
  }

  #container {
    position: relative;
  }

  #publicview {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

</style>
