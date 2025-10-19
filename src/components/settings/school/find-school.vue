<template>
  <b-modal id="bv-modal-find-school"
           size="xl"
           ref="modal"
           title="Find School"
           @show="resetModal"
           @hidden="resetModal"
           @ok="handleOk">
    <b-container>
      <b-row>
            <b-col cols="7">
              <div class="form-group">
                <label for="Name" class="control-label">Name</label>
                <b-form-input v-model="name" class="form-control" placeholder="Enter School Name" />
                <span asp-validation-for="Name" class="text-danger"></span>
              </div>
            </b-col>
            <b-col cols="4">
              <div class="form-group">
                <label for="Country" class="control-label">Country</label>
                <b-form-select id="ratio" v-model="countryId" style="font-size:15px; font-weight:bold; color:#01151C" :options="countries"></b-form-select>
              </div>
            </b-col>
            <b-col cols="1">
              <div class="form-group">
                <b-button @click="search()" style="margin-top:22px">Search</b-button>
              </div>
            </b-col>
          </b-row>
      <b-list-group>
        <b-list-group-item @click="select(school)" active class="flex-column align-items-start" v-for="school in schools">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{school.name}}</h5>
            <small>{{school.city}} {{school.state}}</small>
          </div>
          <p class="mb-1">
            {{school.description}}
          </p>
          <small>{{school.address1}}</small>
        </b-list-group-item>
      </b-list-group>
    </b-container>
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
      name: '',
      countryId: ''
    }
  },
  methods: {
    ...mapActions('school', [
      'getSchoolByOrg',
      'getSchoolAdminByOrg',
      'addSchool',
      'updateSchool',
      'findSchools',
      'addMemberToSchool',
      'findSchoolsByCountryId'
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
    search () {
      if (this.name == '') {
        this.findSchoolsByCountryId(this.countryId)
      } else {
        let payload = {
          countryId: this.countryId,
          name: this.name
        }
        this.findSchools(payload)
      }
    },
    select (school) {
      let payload = {
        schoolId: school.id,
        organizationId: this.OrganizationId
      }
      let self = this
      // add member to school
      this.addMemberToSchool(payload).then(function () {
        self.getSchoolByOrg(self.OrganizationId)
      })
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('bv-modal-find-school')
      })
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
        this.$bvModal.hide('bv-modal-find-school')
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
      schools: state => state.school.schools
    })
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
