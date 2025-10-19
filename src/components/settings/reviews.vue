<template>
   <div> 
  <b-container fluid class="mt--7 pb-8">
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
    <b-modal id="bv-modal-review"
             ref="modal"
             title="Request Review"
             @show="resetModal"
             @hidden="resetModal"
             @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Email"
                      label-for="name-input"
                      invalid-feedback="Email is required"
                      :state="emailState">
          <b-form-input id="name-input"
                        v-model="form.email"
                        placeholder="Enter the email to send request"
                        :state="emailState"
                        required></b-form-input>
        </b-form-group>

      </form>
    </b-modal>

  </b-container>
  </div>
</template>

<script>
import document from 'components/shared/document.vue'
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
    BIconChevronUp,
    document
  },
  data () {
    return {
      partnerobject: null,
      dropDownIconToggale: false,
      form: {
        name: '', degree: '', startYear: '', endYear: '', documentId: ''
      },
      loggedInUser: JSON.parse(localStorage.getItem('org')),
      orgEmail: JSON.parse(localStorage.getItem('organizationEmail')),
      OrganizationId: JSON.parse(localStorage.getItem('organizationId')),
      validations: { isEmail: false, GivenName: false, FamilyName: false, isValid: true },
      users: [{ EmailAddress: '', GivenName: '', FamilyName: '', Role: 'Partner', OrganizationId: JSON.parse(localStorage.getItem('organizationId')), validations: { isEmail: false, isEmailDuplicate: false, GivenName: false, FamilyName: false, isValid: true } }],
      loading: false,
      nameState: null,
      degreeState: null,
      startYearState: null,
      endYearState: null,
      fields: [
        {
          key: 'givenName',
          label: 'First Name',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'familyName',
          label: 'Last Name',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'email',
          label: 'Email',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'comment',
          label: 'Comment',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'rating',
          label: 'Rating',
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
    setDocumentId (id) {
      this.form.documentId = id
    },
    ...mapActions('company', [
      'getCompany',
      'updateCompany'
    ]),
    ...mapActions('partner', [
      'getPartner'
    ]),
    remove (item) {
      return axios
        .delete('/api/Reviews/' + item.id)
        .then(response => {
          this.getCompany(JSON.parse(localStorage.getItem('organizationId')))
        })
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
      if (this.store.company.reviews != null) {
        return this.store.company.reviews
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
    this.$ga.page('/portal/settings/reviews')
    this.getPartner(JSON.parse(localStorage.getItem('userId')))
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

  td{
    background: white;
  }
</style>
