<template>
  <div class="content">
    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="4">
          <b-button @click="addPartner">Add New Partner</b-button>
        </b-col>
      </b-row>
    </b-container>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="title">Manage Partners</h5>
          </div>
          <div class="card-body">
            <b-container fluid>
            </b-container>
            <div v-if="!storePartners" class="text-center">
              <p><em>Loading...</em></p>
              <h1><icon icon="spinner" pulse /></h1>
            </div>
            <template v-if="storePartners">
              <b-table hover :items="storePartners" :fields="fields">
                <template v-slot:cell(actions)="row">
                  <b-button size="sm" @click="editPartner(row.item, row.index, $event.target)" class="mr-1" pill>
                    Edit
                  </b-button>
                  <b-button size="sm" @click="deletePartnerM(row.item, row.index, $event.target)" class="mr-1" pill>
                    Delete
                  </b-button>
                  <b-button size="sm" @click="meetings(row.item, row.index, $event.target)" class="mr-1" pill>
                    Meetings
                  </b-button>
                </template>
              </b-table>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- Add partner modal -->
    <button type="button" ref="addPartner" class="btn btn-primary" data-toggle="modal" data-target="#addPartnerModal" style="display:none">
      Launch demo modal
    </button>
    <div class="modal fade" id="addPartnerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Partner</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <partner :closeaddpartner="closeaddpartner"></partner>
          </div>
          <div class="modal-footer" style="display:none">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="closeaddpartner">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <!-- Edit partner modal -->
    <button type="button" ref="editPartner" class="btn btn-primary" data-toggle="modal" data-target="#editPartnerModal" style="display:none">
      Launch demo modal
    </button>
    <div class="modal fade" id="editPartnerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Partner</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="content">
              <b-form @submit="beforeSave">
                <div class="row">
                  <b-form-group Id="input-group-1" class="form-group col-md-6" label="Email" label-for="input-1" :class="{invalid: $v.form.EmailAddress.$error}">
                    <b-form-input Id="input-1" disabled="disabled" v-model="$v.form.EmailAddress.$model" @blur="$v.form.EmailAddress.$touch()" type="text" :class="{'is-invalid':$v.form.EmailAddress.$error}" placeholder="Email"></b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.form.EmailAddress.required">Please enter the Email</span>
                      <span v-if="!$v.form.EmailAddress.email">Please enter the Email</span>
                    </div>
                  </b-form-group>

                  <b-form-group Id="input-group-1" class="form-group col-md-6" label="Custom Room Id" label-for="input-1" :class="{invalid: $v.form.DefaultRoomId.$error}">
                    <b-form-input Id="input-1" v-model="$v.form.DefaultRoomId.$model" @blur="$v.form.DefaultRoomId.$touch()" type="text" :class="{'is-invalid':$v.form.DefaultRoomId.$error}" placeholder="Custom Room Id"></b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.form.DefaultRoomId.required">Please enter the room id</span>
                      <span v-if="!$v.form.DefaultRoomId.isUnique">Sorry, this room id already taken</span>
                    </div>
                  </b-form-group>

                  <b-form-group Id="input-group-1" class="form-group col-md-6" label="First Name" label-for="input-1" :class="{invalid: $v.form.GivenName.$error}">
                    <b-form-input Id="input-1" v-model="$v.form.GivenName.$model" @blur="$v.form.GivenName.$touch()" type="text" :class="{'is-invalid':$v.form.GivenName.$error}" placeholder="First Name"></b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.form.GivenName.required">Please enter the First Name</span>
                    </div>
                  </b-form-group>
                  <b-form-group Id="input-group-1" class="form-group col-md-6" label="Last Name" label-for="input-1" :class="{invalid: $v.form.FamilyName.$error}">
                    <b-form-input Id="input-1" v-model="$v.form.FamilyName.$model" @blur="$v.form.FamilyName.$touch()" type="text" :class="{'is-invalid':$v.form.FamilyName.$error}" placeholder="Last Name"></b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.form.FamilyName.required">Please enter the Last Name</span>
                    </div>
                  </b-form-group>
                  <b-form-group Id="input-group-1" class="form-group col-md-6" label="Address" label-for="input-1" :class="{invalid: $v.form.Address1.$error}">
                    <b-form-input Id="input-1" v-model="$v.form.Address1.$model" @blur="$v.form.Address1.$touch()" type="text" :class="{'is-invalid':$v.form.Address1.$error}" placeholder="Address"></b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.form.Address1.required">Please enter the Address</span>
                    </div>
                  </b-form-group>
                  <b-form-group Id="input-group-1" class="form-group col-md-6" label="City" label-for="input-1" :class="{invalid: $v.form.City.$error}">
                    <b-form-input Id="input-1" v-model="$v.form.City.$model" @blur="$v.form.City.$touch()" type="text" :class="{'is-invalid':$v.form.City.$error}" placeholder="City"></b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.form.City.required">Please enter the City</span>
                    </div>
                  </b-form-group>
                  <b-form-group Id="input-group-1" class="form-group col-md-6" label="State/Province" label-for="input-1" :class="{invalid: $v.form.State.$error}">
                    <b-form-input Id="input-1" v-model="$v.form.State.$model" @blur="$v.form.State.$touch()" type="text" :class="{'is-invalid':$v.form.State.$error}" placeholder="State/Province"></b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.form.State.required">Please enter the State</span>
                    </div>
                  </b-form-group>
                  <b-form-group Id="input-group-1" class="form-group col-md-6" label="Zip/Postal" label-for="input-1" :class="{invalid: $v.form.PostalCode.$error}">
                    <b-form-input Id="input-1" v-model="$v.form.PostalCode.$model" @blur="$v.form.PostalCode.$touch()" type="text" :class="{'is-invalid':$v.form.PostalCode.$error}" placeholder="Zip/Postal"></b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.form.PostalCode.required">Please enter the State</span>
                    </div>
                  </b-form-group>
                  <b-form-group Id="input-group-1" class="form-group col-md-6" label="Work Phone" label-for="input-1" :class="{invalid: $v.form.WorkPhone.$error}">
                    <b-form-input Id="input-1" v-model="$v.form.WorkPhone.$model" @blur="$v.form.WorkPhone.$touch()" type="text" :class="{'is-invalid':$v.form.WorkPhone.$error}" placeholder="### ###-####"></b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.form.WorkPhone.numeric">Please enter the Cell</span>
                    </div>
                  </b-form-group>
                  <b-form-group Id="input-group-1" class="form-group col-md-6" label="Cell" label-for="input-1" :class="{invalid: $v.form.CellPhone.$error}">
                    <b-form-input Id="input-1" v-model="$v.form.CellPhone.$model" @blur="$v.form.CellPhone.$touch()" type="text" :class="{'is-invalid':$v.form.CellPhone.$error}" placeholder="### ###-####"></b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.form.CellPhone.numeric">Please enter the Cell</span>
                    </div>
                  </b-form-group>
                </div>
                <b-button class="mt-3 pull-right" @click="hideEditPatner">Cancel</b-button>
                <b-button type="submit" variant="primary" class="mt-3 pull-right">Save</b-button>
              </b-form>
            </div>
          </div>
          <div class="modal-footer" style="display:none">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="closeeditpartner">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <!-- Add partner modal -->
    <button type="button" ref="deletePartnerM" class="btn btn-primary" data-toggle="modal" data-target="#deletePartnerModal" style="display:none">
      Launch demo modal
    </button>
    <div class="modal fade" id="deletePartnerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete Partner</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="content">
              <b-form @submit="beforeDelete">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="EmailAddress" class="control-label">Email Address</label>
                    <input v-model="form.EmailAddress" class="form-control" placeholder="Email Address" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="GivenName" class="control-label">First Name</label>
                    <input v-model="form.GivenName" class="form-control" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="FamilyName" class="control-label">Last Name</label>
                    <input v-model="form.FamilyName" class="form-control" />
                  </div>
                </div>
                <b-button class="mt-3 pull-right" @click="hideDeletePartner()">Cancel</b-button>
                <b-button type="submit" variant="primary" class="mt-3 pull-right">Delete</b-button>
              </b-form>
            </div>
          </div>
          <div class="modal-footer" style="display:none">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="closedeletepartner">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import { required, numeric, email } from 'vuelidate/lib/validators'
import partner from './partner'
export default {
  components: {
    partner
  },
  data () {
    return {
      disabled: true,
      form: {
        Id: '',
        OrganizationId: '',
        SubscriptionPlan: '',
        Address1: '',
        City: '',
        DefaultRoomId: '',
        EmailAddress: '',
        FamilyName: '',
        GivenName: '',
        PostalCode: '',
        State: '',
        CellPhone: '',
        WorkPhone: '',
        DefaultRoomTopic: 'DummyRoomTopic'
      },
      storeProjects: '',
      email: JSON.parse(localStorage.getItem('user')).username,
      OrganizationId: JSON.parse(localStorage.getItem('organizationId')),
      jobs: null,
      selectedProject: null,
      total: 0,
      pageSize: 5,
      currentPage: 1,
      date1: '',
      selectMode: 'multi',
      fields: ['givenName', 'familyName', 'actions'],
      value: 45,
      max: 100,
      selected: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        job: null
      },
      mypartner: '',
      closeaddpartner: null,
      selectedpartner: null
    }
  },
  validations: {
    form: {
      EmailAddress: { required, email },
      DefaultRoomId: {
        required,
        isUnique (value) {
          if (value === '') return true
          if (this.$v.form.DefaultRoomId.required && this.selectedpartner != null) {
            if (this.form.DefaultRoomId == this.selectedpartner.defaultRoomId) return true
            return new Promise((resolve, reject) => {
              axios
                .get('/portal/api/Customers/IsRoomIdDuplicate?roomId=' + this.form.DefaultRoomId)
                .then((response) => {
                  resolve(!response.data)
                })
            })
          } else {
            return true
          }
        }
      },
      Address1: { required },
      City: { required },
      FamilyName: { required },
      GivenName: { required },
      PostalCode: { required },
      State: { required },
      CellPhone: { numeric },
      WorkPhone: { numeric }
    }
  },
  methods: {
    hideDeletePartner () {
      this.$refs.closedeletepartner.click()
    },
    hideEditPatner () {
      this.$refs.closeeditpartner.click()
    },
    beforeSave () { },
    ...mapActions('company', [
      'getCompany'
    ]),
    ...mapActions('partner', [
      'getPartners'
    ]),
    resetInfoModal () {
      this.$bvModal.hide(this.infoModal.id)
    },
    addPartner (item, index, button) {
      this.selectedProject = item.id
      this.closeaddpartner = this.$refs.closeaddpartner
      this.$refs.addPartner.click()
    },
    editPartner (item, index, button) {
      if (item != null) {
        this.selectedpartner = item
        console.log(this.selectedpartner)
        this.form.OrganizationId = this.selectedpartner.organizationId
        this.form.SubscriptionPlan = this.selectedpartner.subscriptionPlan
        this.form.Address1 = this.selectedpartner.address1
        this.form.City = this.selectedpartner.city
        this.form.DefaultRoomId = this.selectedpartner.defaultRoomId
        this.form.EmailAddress = this.selectedpartner.emailAddress
        this.form.FamilyName = this.selectedpartner.familyName
        this.form.GivenName = this.selectedpartner.givenName
        this.form.PostalCode = this.selectedpartner.postalCode
        this.form.State = this.selectedpartner.state
        this.form.CellPhone = this.selectedpartner.cellPhone
        this.form.WorkPhone = this.selectedpartner.workPhone
        this.form.Id = this.selectedpartner.id
        this.$refs.editPartner.click()
      }
    },
    deletePartnerM (item, index, button) {
      if (item != null) {
        this.selectedpartner = item
        this.form.OrganizationId = this.selectedpartner.organizationId
        this.form.SubscriptionPlan = this.selectedpartner.subscriptionPlan
        this.form.Address1 = this.selectedpartner.address1
        this.form.City = this.selectedpartner.city
        this.form.DefaultRoomId = this.selectedpartner.defaultRoomId
        this.form.EmailAddress = this.selectedpartner.emailAddress
        this.form.FamilyName = this.selectedpartner.familyName
        this.form.GivenName = this.selectedpartner.givenName
        this.form.PostalCode = this.selectedpartner.postalCode
        this.form.State = this.selectedpartner.state
        this.form.CellPhone = this.selectedpartner.cellPhone
        this.form.WorkPhone = this.selectedpartner.workPhone
        this.form.Id = this.selectedpartner.id
        this.$refs.deletePartnerM.click()
      }
    },
    info (item, index, button) {
      this.$router.push({ path: '/portal/tender/manage/' + item.id })
    },
    meetings (item, index, button) {
      this.$router.push({ path: '/portal/meetings/' + item.id })
    },
    beforeSave (event) {
      this.$v.$touch()
      event.preventDefault()
      if (!this.$v.$invalid) {
        if (this.form.WorkPhone == '' || this.form.WorkPhone == null) {
          delete this.form.WorkPhone
        }
        if (this.form.CellPhone == '' || this.form.CellPhone == null) {
          delete this.form.CellPhone
        }
        this.save(event)
      }
    },
    save (event) {
      event.preventDefault()
      var self = this
      return axios
        .put('/portal/api/Customers/' + self.form.Id, self.form)
        .then(response => {
          self.getPartners(this.OrganizationId)
          this.hideEditPatner()
        })
    },
    beforeDelete (event) {
      event.preventDefault()
      this.deletePartner()
    },
    deletePartner () {
      var self = this
      return axios
        .delete('/api/Customers/deletecustomer/' + self.form.Id)
        .then(response => {
          self.getPartners(this.OrganizationId)
          this.hideDeletePartner()
        })
    }
  },
  computed: {
    ...mapState({
      store: state => state.company
    }),
    ...mapState({
      storePartners: state => state.partner.partners
    })
  },
  async created () {
    var self = this
    // this.getCompany(this.email).then(function () {
    //  self.getPartners('63f50f4e-2f98-4424-8a64-82ce33101898')
    // });3e905b90-2a2f-497c-a502-82b8222e57de
    self.getPartners(this.OrganizationId)
    console.log('created')
  },
  mounted: function () {
    console.log('mounted')
  }
}
</script>

<style>
</style>
