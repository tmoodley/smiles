<template>
  <div>
    <div class="inbox_people">
      <div class="headind_srch">
        <div class="recent_heading">
          <h4>Recent</h4>
        </div>
        <div class="srch_bar">
          <b-button block variant="primary" @click="$bvModal.show('modal-find-handle')"><i class="fas fa-edit fa-fw"></i>Find User</b-button>
        </div>
      </div>
      <div class="inbox_chat scroll"> 
        <div class="chat_list" :class="contact.id == _contact.id ? 'active_chat' : ''" v-for="(contact,index) in orderByResults" :key="index"  @click="select(contact)">
          <div class="chat_people">
            <div class="chat_img" v-if="organizationId == contact.toOrganizationsId">
              <b-img v-if="contact.organizations.logo != null" class="rounded-circle" :src="getImage(contact.organizations.userId,contact.organizations.logo)" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
              <b-img v-if="contact.organizations.logo == null" class="rounded-circle" src="/img/silhouette_large.png" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
            </div>
            <div class="chat_img" v-else>
              <b-img v-if="contact.toOrganizations.logo != null" class="rounded-circle" :src="getImage(contact.toOrganizations.userId,contact.toOrganizations.logo)" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
              <b-img v-if="contact.toOrganizations.logo == null" class="rounded-circle" src="/img/silhouette_large.png" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
            </div>
            <div class="chat_ib" v-if="organizationId == contact.toOrganizationsId">
              <h5>{{contact.organizations.name}} <span class="chat_date">{{contact.createdAt | moment('from', 'now')}}</span></h5>
              <h5>{{contact.organizations.contactPersonFirstName}} {{contact.organizations.contactPersonLastName}} <span class="chat_date" v-if="!contact.organizations.isTutor"> <a href="#" @click="meetingSideBarOPen(contact.organizations)">Schedule Lesson</a></span></h5>
            </div>
            <div class="chat_ib" v-else>
              <h5>{{contact.toOrganizations.name}} <span class="chat_date">{{contact.createdAt | moment('from', 'now')}}</span></h5>
              <h5>{{contact.toOrganizations.contactPersonFirstName}} {{contact.toOrganizations.contactPersonLastName}} <span class="chat_date" v-if="!contact.toOrganizations.isTutor"> <a href="#" @click="meetingSideBarOPen(contact.toOrganizations)">Schedule Lesson</a></span></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <users></users>
    <meetingCreateSidebar @meetingCofrimation="showMeeingConfirmation($event)" @closeSideBar="closeSidebar()" ref="meetingSideBar" :date="selecteDatePicker" :partnerStatus="showCreated" />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'
import meetingCreateSidebar from '../meeting/meeting-sub-components/meetingCreateSidebar.vue'
import users from '../user/list.vue'
export default {
  components: {
    meetingCreateSidebar,
    users
  },
  computed: {
    ...mapState({
      contacts: state => state.messages.contacts
    }),
    ...mapState({
      _contact: state => state.messages.contact
    }),
    ...mapState({
      searchContacts: state => state.messages.searchContacts
    }),
    ...mapState({
      companystore: state => state.company.company
    }),
    orderByResults: function () {
      return _.orderBy(this.contacts, ['createdAt'], ['desc'])
    },
    searchResults: function () {
      var self = this
      if (this.searchHandle != '') {
        return _.filter(this.contacts, function (obj) {
          if (self.organizationId == obj.toOrganizationsId) {
            if (obj.organization.name.indexOf(self.searchHandle) > -1) {
              return org
            }
          } else {
            if (obj.toOrganizations.name.indexOf(self.searchHandle) > -1) {
              return org
            }
          }
        })
      } else {
        return _.filter(this.contacts, function (obj) {
          return obj
        })
      }
    }
  },
  data () {
    return {
      searchHandle: '',
      nameState: null,
      selecteDatePicker: new Date(),
      options: [],
      organizationId: JSON.parse(localStorage.getItem('actualOrgId'))
    }
  },
  methods: {
    ...mapActions('messages', [
      'getContacts',
      'getContact',
      'saveHistory',
      'selectContact',
      'getMessages',
      'filterContacts',
      'setSelectedContact'
    ]),
    closeSidebar () {
      this.meetingSideBarOPen()
      this.$refs.meetingSideBar.openMeetingCreateSideBar()
    },
    showMeeingConfirmation (meeting) {
      this.$refs.meetingSideBar.openMeetingCreateSideBar()
      this.$refs.meetingConfirmation.setModelValues(meeting)
      this.$refs.confirmMeetingAddlist.click()
    },
    meetingSideBarOPen (contact) {
      this.setSelectedContact(contact)
      this.$refs.meetingSideBar.setMeetingTimes()
      this.$refs.meetingSideBar.onReset()
      this.$refs.meetingSideBar.openMeetingCreateSideBar()
    },
    search () {
      var self = this
      this.getContact(this.searchHandle).then(function (data) {
        var organizationId = JSON.parse(localStorage.getItem('organizationId'))
        var actualOrgId = JSON.parse(localStorage.getItem('actualOrgId'))
        // save history
        var history = {
          organizationsId: actualOrgId,
          toOrganizationsId: data.organizationId,
          createdBy: organizationId,
          isDeleted: false
        }
        self.saveHistory(history)
        self.selectContact(data)
      })
    },
    getImage (orgId, logo) {
      return 'https://stuttie-files.s3.us-east-2.amazonaws.com/' + orgId + '/' + logo
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.search()
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-find-user')
      })
    },
    select (org) {
      this.selectContact(org)
      var self = this
      var actualOrgId = JSON.parse(localStorage.getItem('actualOrgId'))
      //if the user is the recipient of the message
      if (actualOrgId == org.toOrganizationsId) {
        var payload = {
          id: org.organizationsId,
          fromId: actualOrgId,
          recipientId: actualOrgId
        }
        self.getMessages(payload)
      } else {
        //the user is the sender of the message
        var payload = {
          id: actualOrgId,
          fromId: org.toOrganizationsId,
          recipientId: actualOrgId
        }
        self.getMessages(payload)
      }
    }
  },
  mounted: function () {
    var self = this
    if (this._contact == '') {
      this.getContacts(JSON.parse(localStorage.getItem('actualOrgId'))).then(function () {
        self.selectContact(self.contacts[0])
        var actualOrgId = JSON.parse(localStorage.getItem('actualOrgId'))

        if (actualOrgId == self.contacts[0].toOrganizationsId) {
          var payload = {
            id: self.contacts[0].organizationsId,
            fromId: actualOrgId,
            recipientId: actualOrgId
          }
          self.getMessages(payload)
        } else {
          var payload = {
            id: actualOrgId,
            fromId: self.contacts[0].toOrganizationsId,
            recipientId: actualOrgId
          }
          self.getMessages(payload)
        }
      })
    } else {
      this.getContacts(JSON.parse(localStorage.getItem('actualOrgId')))
    }
  }
}
</script>

<style>
.chat_people {
    cursor: pointer;
}
</style>
