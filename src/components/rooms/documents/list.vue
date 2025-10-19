<template>
<div>
      <b-container class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
       <b-row no-gutters>
      <b-col>
        <router-link to="/portal/group/main">
          <i class="fas fa-arrow-left fa-4x"></i>
        </router-link> 
        <p class="no-padding-margin heading">Group Documents</p>
        <p class="no-padding-margin sub-title">Manage your group documents from here</p>
      </b-col>
      <b-col offset-xl="6" md="4" lg="3" xl="2">
        <div style="float: right; margin-top:30px">
          <b-button block variant="primary" @click="addDocument">Add Document</b-button>
        </div>
      </b-col>
    </b-row>
    </b-container>
    <b-container fluid class="mb-7">
    <b-row class="mt-3">
      <b-col>
        <b-table outlined responsive head-variant="light" :items="room.roomDocuments" :fields="fields">
          <template #cell(actions)="row">
            <button class="btn btn-primary btn-sm" :href="row.item.document.name" target="self">
              Download
            </button>
            <button class="btn btn-danger btn-sm" @click="remove(row.item)" v-if="room.organizationsId == actualOrgId">
              Remove
            </button>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-modal id="bv-modal-doc"
             ref="modal"
             title="Add Document"
             @show="resetModal"
             @hidden="resetModal"
             @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Name"
                      label-for="name-input"
                      invalid-feedback="Name is required"
                      :state="nameState">
          <b-form-input id="name-input"
                        v-model="name"
                        required
                        :state="nameState">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Description"
                      label-for="textarea-lazy"
                      required
                      description="Please drag and drop a file or click to upload..."
                      class="mb-0">
          <b-form-textarea id="textarea-lazy"
                           v-model="description"
                           placeholder="Enter your text"
                           lazy-formatter
                           :formatter="formatter"></b-form-textarea>
        </b-form-group>
        <upload @setid="setDocumentId"></upload>
      </form>
    </b-modal>
  </b-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { BIcon, BIconEnvelope, BIconThreeDotsVertical, BIconChevronDown, BIconChevronUp } from 'bootstrap-vue'
import { required, numeric, email } from 'vuelidate/lib/validators'
import upload from './document'
import axios from 'axios'
export default {
  components: {
    BIcon,
    BIconEnvelope,
    BIconThreeDotsVertical,
    BIconChevronDown,
    BIconChevronUp,
    upload
  },
  data () {
    return {
      loggedInUser: JSON.parse(localStorage.getItem('org')),
      orgEmail: JSON.parse(localStorage.getItem('organizationEmail')),
      OrganizationId: JSON.parse(localStorage.getItem('organizationId')),
      actualOrgId: JSON.parse(localStorage.getItem('actualOrgId')),
      isBusy: true,
      toggle: false,
      documentId: '',
      selectedUser: null,
      loading: false,
      searchHandle: '',
      nameState: null,
      fields: [
        {
          key: 'name',
          label: 'Name',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'description',
          label: 'Description',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],
      items: [],
      name: '',
      description: ''
    }
  },
  validations: {
  },
  methods: {
    ...mapActions('posts', [
      'removeRoomUser',
      'addRoomUser',
      'getRoom',
      'approveRoomUser',
      'addRoomDocument',
      'removeRoomDocument'
    ]),
    download (id) {
      axios({

        url: 'https://stuttie.com/api/documents/' + id,

        method: 'GET'

      }).then(function (doc) {
        axios({

          url: 'https://stuttie.com/api/document/' + id,

          method: 'GET',

          responseType: 'blob'

        }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]))

          var fileLink = document.createElement('a')

          fileLink.href = fileURL
          fileLink.setAttribute('download', doc.data.name)

          document.body.appendChild(fileLink)

          fileLink.click()
        })
      })
    },
    remove (data) {
      var self = this
      this.removeRoomDocument(data.documentId).then(function () {
        self.getRoom(self.room.id)
      })
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    setDocumentId (id) {
      this.documentId = id
    },
    addDocument () {
      this.$bvModal.show('bv-modal-doc')
    },
    resetModal () {
      this.searchHandle = ''
      this.nameState = null
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      let self = this
      var payload = {
        name: this.name,
        description: this.description,
        documentId: this.documentId,
        roomId: this.room.id
      }
      // save the document to the room
      this.addRoomDocument(payload).then(function () {
        self.getRoom(self.room.id)
      })

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('bv-modal-doc')
      })
    },
    getProfilePicURL (data) {
      return 'https://stuttie-files.s3.us-east-2.amazonaws.com/' + data.item.memberId + '/' + data.item.memberImage
    },
    approve (data) {
      var payload = {
        organizationId: data.item.organizationId,
        roomId: this.room.id
      }
      var self = this
      this.approveRoomUser(payload).then(function () {
        self.getRoom(self.room.id)
      })
    },
    onClickChild (data) {
      var payload = {
        organizationId: data.organizationId,
        roomId: this.room.id
      }
      var self = this
      this.addRoomUser(payload).then(function () {
        self.getRoom(self.room.id)
      })
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
    ...mapState({
      room: state => state.posts.room
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
