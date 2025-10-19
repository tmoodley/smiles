<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">

            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">

            </navbar-toggle-button>
            <router-link class="navbar-brand" to="/">
                <img :src="logo" class="navbar-brand-img" alt="...">
            </router-link>

            <slot name="mobile-right">
                <ul class="nav align-items-center d-md-none">
                  <alerts></alerts>
                  <messages></messages>

                    <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
                        <a slot="title-container" class="nav-link" href="#" role="button">
                            <div class="media align-items-center">
                              <span class="avatar avatar-sm rounded-circle">
                                <img alt="Image placeholder" :src="user.data.logoURL">
                              </span>
                            </div>
                        </a>

                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome!</h6>
                        </div>
                        <router-link class="dropdown-item"  :to="'/profile'">
            <i class="ni ni-single-02"></i>
            <span>My profile</span>
          </router-link>
         <router-link class="dropdown-item"  :to="'/portal/settings/organization'">
            <i class="ni ni-single-02"></i>
            <span>Tutor Profile</span>
          </router-link>
          <router-link class="dropdown-item"  :to="'/portal/settings/accountSettings'">
            <i class="ni ni-settings-gear-65"></i>
            <span>Account Settings</span>
          </router-link>
          <router-link class="dropdown-item"  :to="'/portal/settings/school'">
            <i class="ni ni-calendar-grid-58"></i>
            <span>School Profile</span>
          </router-link>
          <router-link class="dropdown-item"  :to="'/portal/settings/subjects'">
            <i class="ni ni-support-16"></i>
            <span>Subjects</span>
          </router-link>
          <router-link class="dropdown-item"  :to="'/portal/settings/schedules'">
            <i class="ni ni-support-16"></i>
            <span>Schedules</span>
          </router-link>
          <router-link class="dropdown-item"  :to="'/portal/settings/reviews'">
            <i class="ni ni-support-16"></i>
            <span>Reviews</span>
          </router-link>
          <router-link class="dropdown-item"  :to="'/portal/settings/education'">
            <i class="ni ni-support-16"></i>
            <span>Education</span>
          </router-link>
          <router-link class="dropdown-item"  :to="'/portal/settings/languages'">
            <i class="ni ni-support-16"></i>
            <span>Languages</span>
          </router-link>
          <router-link class="dropdown-item"  :to="'/portal/settings/billing'">
            <i class="ni ni-support-16"></i>
            <span>Billing and Invoicing</span>
          </router-link>
          <div class="dropdown-divider"></div>
          <router-link class="dropdown-item"  href="#!" @click="logout">
            <i class="ni ni-user-run"></i>
            <span>Logout</span>
           </router-link>
                    </base-dropdown>
                </ul>
            </slot>
            <slot></slot>
            <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">

                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link class="dropdown-item"  to="/">
                                <img :src="logo">
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav">
                    <slot name="links">
                    </slot>
                </ul>
            </div>
            </div>
    </nav>
</template>
<script>
import messages from '@/components/messages/notification.vue'
import alerts from '@/components/alerts/notification.vue'
import NavbarToggleButton from '@/components/NavbarToggleButton'
import Notification from '../NotificationPlugin/Notification.vue'

export default {
  name: 'sidebar',
  components: {
    NavbarToggleButton,
    messages,
    alerts,
    Notification
  },
  data () {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  props: {
    logo: {
      type: String,
      default: '/img/brand/logo.png',
      description: 'Sidebar app logo'
    },
    autoClose: {
      type: Boolean,
      default: true,
      description: 'Whether sidebar should autoclose on mobile when clicking an item'
    }
  },
  provide () {
    return {
      autoClose: this.autoClose
    }
  },
  methods: {
    closeSidebar () {
      this.$sidebar.displaySidebar(false)
    },
    showSidebar () {
      this.$sidebar.displaySidebar(true)
    },
    logout () {
      const { dispatch } = this.$store
      dispatch('authentication/logout', self.model)
    }
  },
  beforeDestroy () {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false
    }
  }
}
</script>
