<template> 
  <!-- TOP Nav Bar -->
    <div class="iq-top-navbar">
      <div class="iq-navbar-custom">
        <nav class="navbar navbar-expand-lg navbar-light p-0">
            <div class="iq-navbar-logo d-flex justify-content-between">
              <a href="#">
                <img :src="logo" class="img-fluid" alt="logo">
              </a>
              <div class="iq-menu-bt align-self-center">
                <div class="wrapper-menu" @click="miniSidebar">
                    <div class="main-circle"><i class="ri-menu-line"></i></div>
                </div>
              </div>
            </div>           
            <b-navbar-toggle target="nav-collapse" class="mr-2">
              <i class="ri-menu-3-line"></i>
            </b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <ul class="navbar-nav ml-auto navbar-list">
                  <li>
                    <a href="#" class=" d-flex align-items-center">

                          <b-img v-if="logoUrl != null" class="rounded-circle" :src="logoUrl" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
                          <b-img v-if="logoUrl == null" class="rounded-circle" src="/img/silhouette_large.png" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
         

                        <div class="caption">
                          <h6 class="mb-0 line-height">{{fullName}}</h6>
                        </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class=" d-flex align-items-center">
                    <i class="ri-home-line"></i>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="search-toggle " href="#"><i class="ri-group-line"></i></a>
                    <div class="iq-sub-dropdown iq-sub-dropdown-large">
                        <div class="iq-card shadow-none m-0">
                          <div class="iq-card-body p-0 ">
                              <div class="bg-primary p-3">
                                <h5 class="mb-0 text-white">Friend Request<small class="badge  badge-light float-right pt-1">{{friends.length}}</small></h5>
                              </div> 
                              <div class="iq-friend-request" v-for="(item,index) in friends" :key="index"> 
                                <div class="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between" >
                                    <div class="d-flex align-items-center">
                                      <div class="">
                                          <img class="avatar-40 rounded" v-if="item.logoUrl != null" :src="item.logoUrl" alt="">
                                          <img v-if="item.logoUrl == null" class="avatar-40 rounded" src="/img/silhouette_large.png" alt="Image Not Found"></img>

                                      </div>
                                      <div class="media-body ml-3">
                                          <h6 class="mb-0 ">{{item.name}}</h6> 
                                      </div>
                                    </div>
                                    <div class="d-flex align-items-center">
                                      <a href="#" class="mr-3 btn btn-primary rounded" @click="approve(item)">Approve</a>
                                      <a href="#" class="mr-3 btn btn-secondary rounded" @click="remove(item)">Remove</a>
                                    </div>
                                </div>
                              </div>
                              <div class="text-center">
                                <a href="#" class="mr-3 btn text-primary">View More Request</a>
                              </div>
                          </div>
                        </div>
                    </div>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="search-toggle ">                      
                      <i class="far fa-bell fa-fw" v-if="alerts.length <= 0"></i>
                      <lottie :option="require('../../../assets/images/small/lottie-bell')" id="lottie-beil" v-if="alerts.length > 0"/>
                      <span class="bg-danger dots" v-if="alerts.length > 0"></span>
                    </a>
                    <alerts></alerts> 
                  </li>
                  <li class="nav-item">
                     <li class="nav-item dropdown">
                    <a href="#" class="search-toggle ">
                      <i class="far fa-envelope fa-fw" v-if="messages.length <= 0"></i>
                      <lottie :option="require('../../../assets/images/small/lottie-mail')" id="lottie-mail" v-if="messages.length > 0" />
                      <span class="bg-primary count-mail" v-if="messages.length > 0"></span>
                    </a>
                    <messages></messages>
                  </li>
              </ul>
              <ul class="navbar-list">
                  <li>
                    <a href="#" class="search-toggle  d-flex align-items-center">
                    <i class="ri-arrow-down-s-fill"></i>
                    </a>
                    <div class="iq-sub-dropdown iq-user-dropdown">
                        <div class="iq-card shadow-none m-0">
                          <div class="iq-card-body p-0 ">
                              <div class="bg-primary p-3 line-height">
                                <h5 class="mb-0 text-white line-height">Hello {{fullName}}</h5>
                                <!-- <span class="text-white font-size-12">Available</span> -->
                              </div>
                              <router-link to="/" class="iq-sub-card iq-bg-primary-hover">
                                <div class="media align-items-center">
                                    <div class="rounded iq-card-icon iq-bg-primary">
                                      <i class="ri-file-user-line"></i>
                                    </div>
                                    <div class="media-body ml-3">
                                      <h6 class="mb-0 ">My Profile</h6>
                                      <p class="mb-0 font-size-12">View personal profile details.</p>
                                    </div>
                                </div>
                              </router-link>
                              <router-link to="/user/profile-edit"  class="iq-sub-card iq-bg-warning-hover">
                                <div class="media align-items-center">
                                    <div class="rounded iq-card-icon iq-bg-warning">
                                      <i class="ri-profile-line"></i>
                                    </div>
                                    <div class="media-body ml-3">
                                      <h6 class="mb-0 ">Edit Profile</h6>
                                      <p class="mb-0 font-size-12">Modify your personal details.</p>
                                    </div>
                                </div>
                              </router-link>
                              <router-link to="/account-setting" class="iq-sub-card iq-bg-info-hover">
                                <div class="media align-items-center">
                                    <div class="rounded iq-card-icon iq-bg-info">
                                      <i class="ri-account-box-line"></i>
                                    </div>
                                    <div class="media-body ml-3">
                                      <h6 class="mb-0 ">Account settings</h6>
                                      <p class="mb-0 font-size-12">Manage your account parameters.</p>
                                    </div>
                                </div>
                              </router-link>
                              <div class="d-inline-block w-100 text-center p-3">
                                <a class="bg-primary iq-sign-btn" href="#" role="button" @click="logout()">Sign out<i class="ri-login-box-line ml-2"></i></a>
                              </div>
                          </div>
                        </div>
                    </div>
                  </li>
              </ul>
            </b-collapse>
        </nav>
      </div>
    </div>
  <!-- TOP Nav Bar END -->
</template>
<script>
import messages from 'components/messages/notification.vue'
import alerts from 'components/alerts/notification.vue'
import SideBarItems from '../../../FackApi/json/SideBar' 
import { mapState, mapGetters, mapActions } from 'vuex'
import Lottie from '../../../components/socialvue/lottie/Lottie'
export default {
  name: 'NavBarStyle1',
  props: {
    homeURL: { type: Object, default: () => ({ name: 'layout1.dashboard' }) },
    title: { type: String, default: 'Dashboard' },
    logo: { type: String, default: require('../../../assets/images/logo.jpeg') },
    horizontal: { type: Boolean, default: false },
    items: { type: Array }
  },
  mounted () {
    document.addEventListener('click', this.closeSearch, true)
    this.getPartner(JSON.parse(localStorage.getItem('userId'))); 
    this.getCompany(JSON.parse(localStorage.getItem('organizationId')));
    this.getFriendRequests(JSON.parse(localStorage.getItem("actualOrgId")));
  },
  components: {
    Lottie,
    messages,
    alerts
  },
  computed: {
    ...mapGetters({
      bookmark: 'Setting/bookmarkState'
    }),
    ...mapState({
      store: state => state.company
    }),
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
    ...mapState({
      friends: State => State.friend.friendRequests
    }),
    fullName(){ 
      return this.partnerStore != null ? this.partnerStore.givenName + " " + this.partnerStore.familyName : ''; 
    },
    user () { 
      return this.$store.state.authentication.user.data
    },
    logoUrl(){ 
      return this.store.company != null ? this.store.company.logoUrl : '';
    },
    ...mapState({
      alerts: State => State.alerts.alerts
    }),
    ...mapState({
      messages: state => state.messages.unreadMessages
    })
  }, 
  data () {
    return {
      sidebar: SideBarItems,
      globalSearch: '',
      showSearch: false,
      showMenu: false, 
    }
  },
  methods: {
    ...mapActions('partner', [
      'getPartner'
    ]),
    ...mapActions('company', [
        'getCompany', 
    ]),
    ...mapActions('friend', [ 
      'getFriendRequests', 
      'addFriend',
      'approveFriend',
      'removeFriend',
      'getFriends'
    ]),
    miniSidebar () {
      this.$emit('toggle')
    },
    openSearch () {
      this.showSearch = true
      this.showMenu = 'iq-show'
      this.globalSearch = ''
    },
    closeSearch (event) {
      let classList = event.target.classList
      if (!classList.contains('searchbox') && !classList.contains('search-input')) {
        this.removeClass()
      }
    },
    removeClass () {
      this.showSearch = false
      this.showMenu = ''
      this.globalSearch = ''
    },
    logout () {
      var routeID = localStorage.getItem('userId')
      localStorage.removeItem(routeID) 
      this.$router.push({ name: 'login' })
    },
    approve(org) { 
        var actualOrgId = JSON.parse(localStorage.getItem('actualOrgId')); 
        //save history
        var orgFriend = {
          createAt: new Date(),
          organizationId: actualOrgId,
          friendId: org.organizationId,
        }
        //if approve successfully than update friend list from server
        let self = this;
        this.approveFriend(orgFriend)
        .then(function(){
          self.getFriends(JSON.parse(localStorage.getItem("actualOrgId")));
        })

    },
    remove(org) {
      var actualOrgId = JSON.parse(localStorage.getItem('actualOrgId'));
      //save history
      var orgFriend = {
        createAt: new Date(),
        organizationId: actualOrgId,
        friendId: org.organizationId,
      }
      this.removeFriend(orgFriend);
    },
  }
}
</script>
<style scoped>
.btn.btn-primary.rounded {
    color: #fff;
}
.btn.btn-secondary.rounded {
    color: #fff;
}
</style>