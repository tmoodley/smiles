<template>
  <div>  
      <div class="iq-sub-dropdown">
          <div class="iq-card shadow-none m-0">
            <div class="iq-card-body p-0 ">
                <div class="bg-primary p-3">
                  <h5 class="mb-0 text-white">All Messages<small class="badge badge-light float-right pt-1">{{messages.length}}</small></h5>
                </div>
                <a href="#" class="iq-sub-card" v-for="(message,index) in messages" :key="index" @click="select(message)">
                  <div class="media align-items-center">
                      <div class="">
                        <img class="avatar-40 rounded" :src="message.organizations.logoUrl" alt="">
                      </div>
                      <div class="media-body ml-3">
                        <h6 class="mb-0 "> {{truncate(message.body)}}</h6>
                        <small class="float-left font-size-12">{{message.createdAt | moment('from', 'now')}}</small>
                      </div>
                  </div>
                </a> 
            </div>
          </div>
      </div> 
    <!-- Nav Item - Messages -->
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Lottie from 'components/socialvue/lottie/Lottie'
export default {
  computed: {
    ...mapState({
      messages: state => state.messages.unreadMessages
    })
  },
  components: {
    Lottie
  },
  methods: {
    ...mapActions('messages', [
      'getContacts',
      'getContact',
      'saveHistory',
      'selectContact',
      'getMessages',
      'getUnreadMessages'
    ]),
    truncate (input) {
      if (input.length > 5) {
        return input.substring(0, 25) + '...'
      }
      return input
    },
    select (org) { 
      var self = this
      var actualOrgId = JSON.parse(localStorage.getItem('actualOrgId')) 
      //if the user is the recipient of the message
      if (actualOrgId == org.toOrganizationsId) {
        var _contact = {
          toOrganizationsId: org.toOrganizationsId,
          toOrganizations: org.toOrganizations,
          organizationsId: org.organizationsId,
          organizations: org.organizations
        }
        self.selectContact(_contact)
        var payload = {
          id: org.organizationsId,
          fromId: actualOrgId,
          recipientId: actualOrgId
        }
        self.getMessages(payload)
      } else {
        //the user is the sender of the message
        var _contact = {
          toOrganizationsId: org.organizationsId,
          toOrganizations: org.organizations,
          organizationsId: org.toOrganizationsId,
          organizations: org.toOrganizations
        }
        self.selectContact(_contact)
        var payload = {
          id: actualOrgId,
          fromId: org.toOrganizationsId
        }
        self.getMessages(payload)
      }
      this.$router.push({ path: '/portal/messages/'})  
    }
  },
  mounted: function () {
    var actualOrgId = JSON.parse(localStorage.getItem('actualOrgId'))
    let self = this;
    setTimeout(function(){ self.getUnreadMessages(actualOrgId) }, 10000);
  }
}
</script>

<style>

</style>
