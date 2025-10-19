<template>
  <!-- Right Sidebar Panel Start-->
  <div :class="`right-sidebar-mini `+miniClass">
    <div class="right-sidebar-panel p-0">
        <div class="iq-card shadow-none">
          <div class="iq-card-body p-0">
          <!-- chat and theme button!-->
            <div class="iq-customizer-btn p-3">
              <div class="btn-group w-100" role="group" aria-label="Basic example">
                <button class="btn-chat-data btn" :class="showChat ? 'active' : ''" @click="showChat = true">Friends</button>
              </div>

            </div>
            <!-- chat!-->
            <div class="media-height iq-chat-data-block active-block p-3" v-show="showChat">
                <div v-for="(item,index) in friends" :key="index" class="media align-items-center mb-4">
                    <div class="iq-profile-avatar status-online">
                      <img @click="view(item)" class="rounded-circle avatar-50" v-if="item.logo != null" :src="item.logoUrl" alt="">
                      <img @click="view(item)" v-if="item.logo == null" class="rounded-circle avatar-50" src="/img/silhouette_large.png" alt="Responsive image"></img>
                    </div>
                    <div class="media-body ml-3">
                      <h6 class="mb-0"><a href="#" @click="view(item)">{{item.name}}</a></h6> 
                    </div>
                </div>
               </div> 
            <!-- toogle!-->
            <div class="right-sidebar-toggle bg-primary mt-3" @click="toggleMini">
                <i class="ri-arrow-left-line side-left-icon"></i>
                <i class="ri-arrow-right-line side-right-icon"><span class="ml-3 d-inline-block">Close Menu</span></i>
              </div>
          </div>
        </div>

    </div> 
  </div>
  <!-- Right Sidebar Panel End-->
</template>
<script> 
import loader from '../../../assets/images/logo.png'
import darkLoader from '../../../assets/images/logo-white.png'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'RightSideBarStyle1',
  components: { 
  },
  data () {
    return {
      miniClass: '',
      showChat: true,
      animated: { enter: 'zoomIn', exit: 'zoomOut' },
      animateClass: [
        { value: { enter: 'zoomIn', exit: 'zoomOut' }, text: 'Zoom' },
        { value: { enter: 'fadeInUp', exit: 'fadeOutDown' }, text: 'Fade' },
        { value: { enter: 'slideInLeft', exit: 'slideOutRight' }, text: 'Slide' },
        { value: { enter: 'rotateInDownLeft', exit: 'rotateOutDownLeft' }, text: 'Roll' }
      ],
      logo: loader,
      rtl: false, 
    }
  },
  props: {
    toggleClass: { type: String, default: '' }
  },
  computed: {
    ...mapState({
      friends: State => State.friend.friends
    }),
    hasIconSlot () {
      return !!this.$slots.icon
    },
    hasOpenIconSlot () {
      return !!this.$slots.openIcon
    },
    hasCloseIconSlot () {
      return !!this.$slots.closeIcon
    }
  },
  methods: {
    ...mapActions('friend', [
      'getFriends',
      'getFriendRequests',
      'getFriendSuggestions',
      'getUsers',
      'getUsersByFilter',
      'filterUserGender',
      'filterUserByEmail',
      'filterUserByName'
    ]),
    ...mapActions('posts', [
      'selectUser', 
    ]), 
    toggleMini () {
      this.rightSideBarMini = !this.rightSideBarMini
      this.checkRightSideBar()
    },
    checkRightSideBar () {
      if (this.rightSideBarMini) {
        this.miniClass = 'right-sidebar'
      } else {
        this.miniClass = ''
      }
    },
    themeMode (mode) {
      this.dark = mode
      this.modeChange({ rtl: this.rtl, dark: mode })
      if (mode) {
        this.logo = darkLoader
      } else {
        this.logo = loader
      }
      this.$emit('onLogo', this.logo)
    },
    rtlChange (mode) {
      this.rtl = mode
      this.modeChange({ rtl: mode, dark: this.darkMode })
      if (this.darkMode) {
        this.logo = darkLoader
      } else {
        this.logo = loader
      }
    },
    reset () {
      this.animated = { enter: 'zoomIn', exit: 'zoomOut' }
      this.themeMode(false)
      this.rtlChange(false)
    },
    ...mapActions({
      modeChange: 'Setting/layoutModeAction'
    }),
    view(org) { 
      this.selectUser(org);
      this.$bvModal.show('bv-modal-profile');
    },
  },
  mounted: function () {  
    this.getFriends(JSON.parse(localStorage.getItem('actualOrgId')));      
  },
}
</script>
