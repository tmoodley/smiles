<template>
  <div>
     <div class="iq-sub-dropdown">
        <div class="iq-card shadow-none m-0">
          <div class="iq-card-body p-0 ">
              <div class="bg-primary p-3">
                <h5 class="mb-0 text-white">All Notifications<small class="badge  badge-light float-right pt-1">{{alerts.length}}</small></h5>
              </div> 
              <a @click="markAsRead(alert)" class="iq-sub-card" v-for="(alert,index) in alerts" :key="index" >
                <div class="media align-items-center">
                    <div class="">
                          <b-img v-if="alert.organizations.logo != null" class="avatar-40 rounded" :src="alert.organizations.logoUrl" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
                          <b-img v-if="alert.organizations.logo == null" class="avatar-40 rounded" src="/img/silhouette_large.png" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
                    </div>
                    <div class="media-body ml-3"> 
                      <h6 class="mb-0 ">{{alert.body}}</h6>
                      <small class="float-right font-size-12">{{ alert.createdAt  | moment('from', 'now') }}</small>
                      <p class="mb-0">{{truncate(alert.posts.body)}}</p>
                    </div>
                </div>
              </a> 
          </div>
        </div>
    </div> 
    <!-- Nav Item - Alerts -->
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { BIcon, BIconEnvelope, BIconCircleFill, BIconCalendar3, BIconLock, BIconPlus, BIconPerson, BIconCursorFill } from 'bootstrap-vue'
export default {
  props: ['msg'],
  components: {
    BIcon,
    BIconEnvelope,
    BIconCircleFill,
    BIconCalendar3,
    BIconLock,
    BIconPlus,
    BIconPerson,
    BIconCursorFill
  },
  methods: {
    ...mapActions('alerts', [
      'getAlerts',
      'markAlertAsRead'
    ]),
    ...mapActions('posts', [
      'getPost'
    ]),
    onClosed () {
      this.$refs['create-modal'].hide()
    },
    markAsRead (alert) { 
      this.markAlertAsRead(alert)
      this.getPost(alert.posts.id)
      this.$router.push({ path: '/portal/post/'+ alert.posts.id }) 
    },
    getImage (orgId, logo) {
      return 'https://stuttie-files.s3.us-east-2.amazonaws.com/' + orgId + '/' + logo
    },
    truncate (input) {
      if (input.length > 5) {
        return input.substring(0, 15) + '...'
      }
      return input
    }
  },
  mounted () {
    this.getAlerts(JSON.parse(localStorage.getItem('actualOrgId')))
  },
  computed: {
    ...mapState({
      alerts: State => State.alerts.alerts
    })
  }
}

</script>

<style>
</style>
