<template>
  <div>
    <b-container class="p-0 mt-3" fluid>
      <b-row>
        <b-col class="main-container main-hover-div">
          <b-row class="mt-2" style="background-color: white; box-shadow: 0px 4px 10px #CFDEE66C;">
            <b-col cols="12" sm="4" md="5" lg="3" xl="3" >
              <div style="border-right:1px solid; border-color:#D0D4D5;min-height: 88px; width:70%;float:left;margin-top: 20px !important;margin-bottom: 20px !important;" class="p-2 mt-2 mb-2">
                <b-row :no-gutters="true">
                  <b-col cols="12">
                    <b-img @click="view(tutor)" v-b-modal.bv-modal-profile v-if="tutor.logo != null" class="rounded-circle" :src="getImage(tutor.userId,tutor.logo)" fluid alt="Responsive image" ref="imageReforg" width="85"></b-img>
                    <b-img @click="view(tutor)" v-b-modal.bv-modal-profile v-if="tutor.logo == null" class="rounded-circle" src="/img/silhouette_large.png" fluid alt="Responsive image" ref="imageReforg" width="85"></b-img>
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <b-col cols="12" sm="8" md="7" lg="5" xl="6" class="p-2" >
              <b-row class="mt-3">
                <b-col cols="12">
                  <b-row>
                    <b-col>
                      <p class=" ml-2 mt-2" style="font-size:24px;color:#01151C; font-weight:bold; margin:0px" v-b-modal.bv-modal-profile @click="view(tutor)">{{ tutor.name }}</p>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <p class=" ml-2 mt-2" style="font-size: 14px;">{{ tutor.description }}</p>

                      <span v-for="education in tutor.educations">{{education.name}} {{education.degree}} <br />{{education.startYear}} - {{education.endYear}}</span>

                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="6" sm="6" md="6" lg="2" xl="2" class="p-2">
              <i class="fa fa-female" aria-hidden="true" v-if="tutor.gender == 'f'"></i>
              <i class="fa fa-male" aria-hidden="true" v-if="tutor.gender == 'm'"></i>
              <span style="float: right;">${{tutor.hourlyRate}}</span>
              <b-button style="width: 160px; height: 52px; background: white; color: #576367; border: 1px solid #576367;" class="mt-4" @click="select(tutor)" :to="'/portal/messages'">Schedule Lesson</b-button>
            </b-col>
            <b-col cols="1" sm="1" md="1" lg="1" xl="1">
                 <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
                   <template #button-content>
                    <i class="fa fa-ellipsis-h"></i>
                  </template>
                  <b-dropdown-item class="dropdown"><span style="color:#01151C">View Details</span></b-dropdown-item>
                  <b-dropdown-item class="dropdown"><span style="color:#01151C">Resend Invites</span></b-dropdown-item>
                </b-dropdown>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['tutor'],
  components: {

  },
  data () {
    return {
      meetingTodeleteId: ''
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
    ...mapActions('posts', [
      'selectUser'
    ]),
    getImage (orgId, logo) {
      return 'https://stuttie-files.s3.us-east-2.amazonaws.com/' + orgId + '/' + logo
    },
    view (org) {
      this.selectUser(org)
      this.$refs['modal-profile'].show()
      // this.$bvModal.show('bv-modal-profile');
    },
    select (org) {
      var self = this
      var actualOrgId = JSON.parse(localStorage.getItem('actualOrgId'))
      // save history
      var history = {
        organizationsId: actualOrgId,
        toOrganizationsId: org.organizationId,
        createdBy: organizationId,
        isDeleted: false
      }
      self.saveHistory(history)

      var _contact = {
        toOrganizationsId: org.organizationId,
        toOrganizations: org,
        organizationsId: actualOrgId,
        organizations: this.companystore
      }
      self.selectContact(_contact)
    }
  },
  computed: {
    ...mapState({
      companystore: state => state.company.company
    })
  },
  mounted: function () {
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
  .fadeClass {
      opacity:0.5
  }
  .fadeBackground {
    background: #FCFCFE
  }

  .main-container {
    cursor: pointer
  }

  .hover-drop {
    visibility: hidden
  }

  .main-container:hover .hover-drop, .main-container.hover .hover-drop {
    visibility: visible
  }

  .main-hover-div:focus {
    outline: none
  }

</style>
