<template>
  <b-container fluid>
    <b-progress :value="value" :max="max" show-progress animated></b-progress>
    <b-row no-gutters>
      <b-col>
        <p class="no-padding-margin heading">Education</p>
        <p class="no-padding-margin sub-title">Edit your Education here (this will display on your profile)</p>
      </b-col>
      <b-col offset-xl="6" md="4" lg="3" xl="2" class="mt-3">
        <b-button block variant="primary" @click="$bvModal.show('bv-modal-education')">Add University</b-button>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <b-table outlined responsive head-variant="light" :items="items" :fields="fields">
          <template v-slot:cell(actions)="row">
            <b-dropdown variant="white" no-caret style="margin-top: -7px;">
              <template v-slot:button-content>
                <b-icon style="font-size:100%" icon="three-dots-vertical"></b-icon>
              </template>
              <b-dropdown-item class="dropdown" @click="remove(row.item)"><span style="color:#FF7F7F">Remove</span></b-dropdown-item>
            </b-dropdown>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="10">
        <div class="form-group" style="margin-left:40px; margin-top:20px">
          <b-button variant="danger" @click="back">Back</b-button>
          <b-button variant="primary" @click="dashboard">Continue</b-button>
        </div>
      </b-col>
    </b-row>
    <b-modal id="bv-modal-education"
             ref="modal"
             title="Add Education"
             @show="resetModal"
             @hidden="resetModal"
             @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Name"
                      label-for="name-input"
                      invalid-feedback="Name is required"
                      :state="nameState">
          <b-form-input id="name-input"
                        v-model="form.name"
                        :state="nameState"
                        required></b-form-input>
        </b-form-group>
        <b-form-group label="Degree"
                      label-for="textarea-lazy"
                      class="mb-0">
          <b-form-textarea id="textarea-lazy"
                           v-model="form.degree"
                           placeholder="Enter your degree"
                           lazy-formatter
                           :formatter="formatter"></b-form-textarea>
        </b-form-group>
        <b-form-group label="Start Year"
                      label-for="textarea-lazy"
                      class="mb-0">
          <b-form-datepicker id="startYear-datepicker" v-model="form.startYear" required class="mb-2"></b-form-datepicker>
        </b-form-group>
        <b-form-group label="End Year"
                      label-for="textarea-lazy"
                      class="mb-0">
          <b-form-datepicker id="endYear-datepicker" v-model="form.endYear" required class="mb-2"></b-form-datepicker>
        </b-form-group>
      </form>
    </b-modal>

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
      value: 90,
      max: 100,
      partnerobject: null,
      dropDownIconToggale: false,
      form: {
        name: '', degree: '', startYear: '', endYear: ''
      },
      loggedInUser: JSON.parse(localStorage.getItem('org')),
      orgEmail: JSON.parse(localStorage.getItem('organizationEmail')),
      OrganizationId: JSON.parse(localStorage.getItem('organizationId')),
      validations: { isEmail: false, GivenName: false, FamilyName: false, isValid: true },
      users: [{ EmailAddress: '', GivenName: '', FamilyName: '', Role: 'Partner', OrganizationId: JSON.parse(localStorage.getItem('organizationId')), validations: { isEmail: false, isEmailDuplicate: false, GivenName: false, FamilyName: false, isValid: true } }],
      loading: false,
      nameState: null,
      fields: [
        {
          key: 'name',
          label: 'Name',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'degree',
          label: 'Degree',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'startYear',
          label: 'Start Year',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'endYear',
          label: 'End Year',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ]
    }
  },
  validations: {
  },
  methods: {
    ...mapActions('company', [
      'getCompany',
      'updateCompany'
    ]),
    ...mapActions('partner', [
      'getPartner'
    ]),
    ...mapActions('onboarding', [
      'changeIsOnBoarding'
    ]),
    remove (item) {
      return axios
        .delete('/api/Educations/' + item.id)
        .then(response => {
          this.getCompany(JSON.parse(localStorage.getItem('organizationId')))
        })
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal () {
      this.form = {
        name: '', degree: '', startYear: '', endYear: ''
      }
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
      var self = this

      this.form.organizationId = JSON.parse(localStorage.getItem('actualOrgId'))
      return axios
        .post('/api/Educations/', this.form)
        .then(response => {
          self.getCompany(JSON.parse(localStorage.getItem('organizationId')))
          // Hide the modal manually
          self.$bvModal.hide('bv-modal-education')
        })
    },
    back () {
      this.$router.push({ path: '/portal/onBoarding/subjects' })
    },
    dashboard () {
      this.changeIsOnBoarding(false)
      this.$router.push({ path: '/portal/forum' })
    }
  },
  computed: {
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
    ...mapState({
      store: state => state.company
    }),
    items () {
      if (this.store.company.educations != null) {
        return this.store.company.educations
      } else {
        return []
      }
    },
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
