<template>
  <b-modal id="bv-modal-school"
           size="xl"
           ref="modal"
           title="Enter School Info"
           @show="resetModal"
           @hidden="resetModal"
           @ok="handleOk">
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-row>
        <b-col cols="4">
          <div class="form-group">
            <label for="Name" class="control-label">Name</label>
            <b-form-input v-model="form.name" class="form-control" placeholder="Enter School Name" />
            <span asp-validation-for="Name" class="text-danger"></span>
          </div>
        </b-col>
        <b-col cols="4">
          <div class="form-group">
            <label for="Code" class="control-label">Access Code</label>
            <b-form-input v-model="form.code" class="form-control" placeholder="Enter Access Code" />
            <span asp-validation-for="Code" class="text-danger"></span>
          </div>
        </b-col>
        <b-col cols="4">
          <div class="form-group">
            <b-form-checkbox switch v-model="form.showOnHomePage" size="lg">Show On Homepage</b-form-checkbox>
            <span asp-validation-for="Code" class="text-danger"></span>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="8">
          <div class="form-group">
            <label for="Description" class="control-label">Description</label>
            <b-form-input v-model="form.description" class="form-control" />
            <span asp-validation-for="Description" class="text-danger"></span>
          </div>
        </b-col>
        <b-col cols="2">
          <div class="form-group">
            <label for="PhoneNumber" class="control-label">Phone Number</label>
            <b-form-input v-model="form.phoneNumber" class="form-control" />
            <span asp-validation-for="PhoneNumber" class="text-danger"></span>
          </div>
        </b-col>
        <b-col cols="2">
          <div class="form-group">
            <label for="Website" class="control-label">Website</label>
            <b-form-input v-model="form.website" class="form-control" />
            <span asp-validation-for="Website" class="text-danger"></span>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <div class="form-group">
            <label for="Address1" class="control-label">Address1</label>
            <b-form-input v-model="form.address1" class="form-control" />
            <span asp-validation-for="Address1" class="text-danger"></span>
          </div>
        </b-col>
        <b-col cols="4">
          <div class="form-group">
            <label for="Address2" class="control-label">Address2</label>
            <b-form-input v-model="form.address2" class="form-control" />
            <span asp-validation-for="Address2" class="text-danger"></span>
          </div>
        </b-col>
        <b-col cols="4">
          <div class="form-group">
            <label for="City" class="control-label">City</label>
            <b-form-input v-model="form.city" class="form-control" />
            <span asp-validation-for="City" class="text-danger"></span>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <div class="form-group">
            <label for="State" class="control-label">State/Province</label>
            <b-form-input v-model="form.state" class="form-control" />
            <span asp-validation-for="State" class="text-danger"></span>
          </div>
        </b-col>
        <b-col cols="4">
          <div class="form-group">
            <label for="PostalCode" class="control-label">Postal Code</label>
            <b-form-input v-model="form.postalCode" class="form-control" />
            <span asp-validation-for="PostalCode" class="text-danger"></span>
          </div>
        </b-col>
        <b-col cols="4">
          <div class="form-group">
            <label for="Country" class="control-label">Country</label>
            <b-form-select id="ratio" v-model="form.countryId" style="font-size:15px; font-weight:bold; color:#01151C" :options="countries"></b-form-select>
          </div>
        </b-col>
      </b-row>
    </form>
  </b-modal>

</template>

<script>
import { required, numeric, email } from 'vuelidate/lib/validators'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      OrganizationId: '',
      countries: [],
      form: {
        name: ''
      }
    }
  },
  methods: {
    ...mapActions('school', [
      'getSchoolByOrg',
      'getSchoolAdminByOrg',
      'addSchool',
      'updateSchool'
    ]),
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      this.descriptionState = valid
      return valid
    },
    resetModal () {
      this.name = ''
      this.nameState = null
      this.description = ''
      this.descriptionState = null
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
      this.form.organizationsId = this.OrganizationId

      if (this.form.id != null) {
        // update course
        this.updateSchool(this.form)
      } else {
        // create course
        this.addSchool(this.form)
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('bv-modal-school')
      })
    },
    getCountries: function () {
      axios
        .get('/api/Countries')
        .then(response => {
          this.countries = response.data.map(function (country) {
            return {
              value: country.id,
              text: country.name
            }
          })
        })
    }
  },
  computed: {
    ...mapState({
      store: state => state.school.school
    })
  },
  updated () {
    this.form = this.store
  },
  mounted: function () {
    this.OrganizationId = JSON.parse(localStorage.getItem('actualOrgId'))
    this.form = this.store
    this.getCountries()
  }
}

</script>

<style scoped>

  .heading-font {
    color: #01151C;
    font-weight: bold;
    font-size: 18px;
  }

  .btnSubmit {
    background: #00AC4E 0% 0% no-repeat padding-box;
    border-radius: 7px;
    opacity: 1;
    border: none;
    width: 100%;
    border: 1px solid #00AC4E;
  }

  .btnCancel {
    background: white;
    color: #546064;
    border: 1px solid #546064;
    margin-right: 15px;
    width: 100%;
    border-radius: 7px;
  }
</style>
