<template>
  <div class="content">
    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="4">
          <b-button @click="addAdmin">Add New Admin</b-button>
        </b-col>
      </b-row>
    </b-container>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="title">Manage Admins</h5>
          </div>
          <div class="card-body">
            <b-container fluid>

            </b-container>
            <div v-if="!storeAdmins" class="text-center">
              <p><em>Loading...</em></p>
              <h1><icon icon="spinner" pulse /></h1>
            </div>
            <template v-if="storeAdmins">
              <b-table hover :items="storeAdmins" :fields="fields">
                <template v-slot:cell(actions)="row">
                  <b-button size="sm" @click="editAdmin(row.item, row.index, $event.target)">Edit</b-button>
                  <b-button size="sm" @click="deleteAdmin(row.item, row.index, $event.target)" class="mr-1">
                    Delete
                  </b-button>
                </template>
              </b-table>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- Add Admin modal -->
    <button type="button" ref="addAdmin" class="btn btn-primary" data-toggle="modal" data-target="#addAdminModal" style="display:none">
      Launch demo modal
    </button>
    <div class="modal fade" id="addAdminModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Admin</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <admin :closemodel="closeaddAdmin"></admin>
          </div>
          <div class="modal-footer" style="display:none">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="closeaddAdmin">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <!-- Edit Admin modal -->
    <button type="button" ref="editAdmin" class="btn btn-primary" data-toggle="modal" data-target="#editAdminModal" style="display:none">
      Launch demo modal
    </button>
    <div class="modal fade" id="editAdminModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Admin</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col">
                <b-form @submit="beforeSave" @reset="onReset" v-if="show">
                  <b-form-group id="input-group-1" label="Name" label-for="input-1" :class="{invalid: $v.form.Name.$error}">
                    <b-form-input id="input-1" v-model="$v.form.Name.$model" @blur="$v.form.Name.$touch()" type="text" :class="{'is-invalid':$v.form.Name.$error}" placeholder="Name"></b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.form.Name.required">Please enter the name</span>
                    </div>
                  </b-form-group>
                  <b-form-group id="input-group-1" label="Email Address" label-for="input-2" :class="{invalid: $v.form.EmailAddress.$error}">
                    <b-form-input id="input-1"  disabled="disabled" v-model="$v.form.EmailAddress.$model" @blur="$v.form.EmailAddress.$touch()" type="text" :class="{'is-invalid':$v.form.EmailAddress.$error}" placeholder="Email Address"></b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.form.EmailAddress.required">Please enter the Email</span>
                      <span v-if="!$v.form.EmailAddress.email">Please enter a valid Email</span>
                      <span v-if="!$v.form.EmailAddress.isUnique">Sorry, this user already in the system</span>
                    </div>
                  </b-form-group>
                  <b-button type="submit" variant="primary">Submit</b-button>
                  <b-button type="button" @click="closeEditadminPopUp" variant="danger">Close</b-button>
                </b-form>
              </div>
            </div>
          </div>
          <div class="modal-footer" style="display:none">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="closeEditAdmin">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <!-- Delete Admin modal -->
    <button type="button" ref="deleteAdmin" class="btn btn-primary" data-toggle="modal" data-target="#deleteAdminModal" style="display:none">
      Launch demo modal
    </button>
    <div class="modal fade" id="deleteAdminModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete Admin</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col">
                <b-form @submit="onSubmitDelete" @reset="onReset" v-if="show">
                  <b-form-group id="input-group-1" label="Name" label-for="input-1">
                    <b-form-input id="input-1" disabled="true" v-model="form.Name" type="text" required placeholder="Name"></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-group-1" label="Email Address" label-for="input-1">
                    <b-form-input id="input-1" disabled="true" v-model="form.EmailAddress" type="text" required placeholder="Email Address"></b-form-input>
                  </b-form-group>
                  <b-button type="submit" variant="primary">Delete</b-button>
                  <b-button type="button" @click="closeDeleteadminPopUp" variant="danger">Close</b-button>
                </b-form>
              </div>
            </div>
          </div>
          <div class="modal-footer" style="display:none">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="closeDeleteAdmin">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import admin from './admin'
import admindelete from './adminDelete'
import { required, email } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  components: {
    admin,
    admindelete
  },
  data () {
    return {
      disabled: false,
      OrganizationId: '',
      fields: ['name', 'emailAddress', 'actions'],
      selectedadmin: null,
      closeaddAdmin: null,
      closeEditAdmin: null,
      show: true,
      form: {
        Name: '',
        EmailAddress: '',
        OrganizationId: JSON.parse(localStorage.getItem('organizationId')),
        Id: ''
      }
    }
  },
  validations: {
    form: {
      EmailAddress: {
        required,
        email,
        isUnique (value) {
          if (value === '') return true
          if (this.$v.form.EmailAddress.email) {
            return new Promise((resolve, reject) => {
              axios
                .get('/portal/api/Customers/IsEmailIdDuplicate?email=' + this.form.EmailAddress)
                .then((response) => {
                  resolve(!response.data)
                })
            })
          } else {
            return true
          }
        }
      },
      Name: { required }
    }
  },
  methods: {
    closeDeleteadminPopUp () {
      this.$refs.closeDeleteAdmin.click()
    },
    closeEditadminPopUp () {
      this.$refs.closeEditAdmin.click()
    },
    ...mapActions('admins', [
      'getAdmins'
    ]),
    addAdmin (item, index, button) {
      this.selectedadmin = null
      this.closeaddAdmin = this.$refs.closeaddAdmin
      this.$refs.addAdmin.click()
    },
    editAdmin (item) {
      if (item != null) {
        this.selectedadmin = item
        this.form.Name = this.selectedadmin.name
        this.form.EmailAddress = this.selectedadmin.emailAddress
        this.form.Id = this.selectedadmin.id
      }
      this.form.OrganizationId = this.selectedadmin.organizationId
      this.$refs.editAdmin.click()
    },
    deleteAdmin (item) {
      if (item != null) {
        this.selectedadmin = item
        this.form.Name = this.selectedadmin.name
        this.form.EmailAddress = this.selectedadmin.emailAddress
        this.form.Id = this.selectedadmin.id
      }
      this.form.OrganizationId = this.selectedadmin.organizationId
      this.$refs.deleteAdmin.click()
    },
    onSubmit (evt) {
      evt.preventDefault()
      axios.put('/portal/api/Admins/' + this.form.Id, this.form)
        .then((response) => {
          this.getAdmins(this.form.OrganizationId)
          this.closeEditadminPopUp()
        })
    },
    reset () { },
    beforeSave (event) {
      this.$v.$touch()
      event.preventDefault()
      if (!this.$v.$invalid) {
        this.onSubmit(event)
      }
    },
    onReset () { },
    onSubmitDelete (evt) {
      evt.preventDefault()
      axios
        .delete('/portal/api/Admins/' + this.form.Id)
        .then((response) => {
          this.getAdmins(this.form.OrganizationId)
          this.closeDeleteadminPopUp()
        })
    }
  },
  computed: {
    ...mapState({
      storeAdmins: state => state.admins.admins
    })
  },
  mounted: function () {
    console.log(this.storeAdmins)
    this.OrganizationId = JSON.parse(localStorage.getItem('organizationId'))
    console.log('mounted' + this.OrganizationId)
    this.getAdmins(this.OrganizationId)
  }
}
</script>
