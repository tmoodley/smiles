<template> 
  <!-- Modal -->
  <b-modal id="address-modal" hide-footer button-size="lg">
    <template #modal-title> Address </template> 
        <b-row class="ml-3">
          <b-col>
            <b-form @submit="onSubmit" @reset="">
              <b-form-group id="input-group-1" label="Address line 1*" label-for="input-1" style="color:#546064" :class="{invalid: $v.form.Address1.$error}">
                <b-form-input id="input-1" v-model="$v.form.Address1.$model" @blur="$v.form.Address1.$touch()" :class="{'is-invalid':$v.form.Address1.$error}" type="text" placeholder="Enter Headline" style="color:#01151C;font-weight:bold"></b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.form.Address1.required">Please enter the address line 1</span>
                </div>
              </b-form-group>
              <b-form-group id="input-group-2" label="" label-for="input-1" style="color:#546064">
                <b-form-input id="input-1" v-model="form.Address2" type="text" placeholder="Address line 2 (optional)" style="color:#01151C;font-weight:bold"></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-3" label="City" label-for="input-1" style="color:#546064" :class="{invalid: $v.form.City.$error}">
                <b-form-input id="input-1" v-model="$v.form.City.$model" @blur="$v.form.City.$touch()" :class="{'is-invalid':$v.form.City.$error}" type="text" placeholder="Enter City" style="color:#01151C;font-weight:bold"></b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.form.City.required">Please enter the city</span>
                </div>
              </b-form-group>
              <b-row>
                <b-col cols="6">
                  <b-form-group id="input-group-4" label="State" label-for="input-1" style="color:#546064" :class="{invalid: $v.form.State.$error}">
                    <b-form-input id="input-1" v-model="$v.form.State.$model" @blur="$v.form.State.$touch()" :class="{'is-invalid':$v.form.State.$error}" type="text" placeholder="State" style="color:#01151C;font-weight:bold"></b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.form.State.required">Please enter the state</span>
                    </div>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group id="input-group-5" label="Zipcode" label-for="input-1" style="color:#546064" >
                    <b-form-input id="input-1" v-model="form.PostalCode" type="text" placeholder="Zipcode" style="color:#01151C;font-weight:bold"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-form-group label="" label-for="ratio" label-cols-md="auto" class="mb-3">
                <b-form-select id="ratio" v-model="form.CountryId" style="font-size:15px; font-weight:bold; color:#01151C" :options="countries"></b-form-select>
              </b-form-group>
              <b-row>
                <b-col cols="8">
                  <button type="submit" class="btn btn-primary mr-2">Save</button>
                  <button type="reset" class="btn iq-bg-danger" @click="cancelFunction">Cancel</button>
                </b-col>
                <b-col cols="4">
                </b-col>
              </b-row>
            </b-form>
          </b-col>
        </b-row>
  </b-modal>
</template>

<script>
import { required, numeric, email } from 'vuelidate/lib/validators'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      OrganizationId: '',
      countries: [],
      form: null
    }
  },
  validations: {
    form: {
      Address1: { required },
      City: { required },
      State: { required }
    }
  },
  methods: {
    ...mapActions('company', [
      'getCompany'
    ]),
    cancelFunction () {
      this.$nextTick(() => { this.$v.form.$reset() })
        this.$bvModal.hide('address-modal')
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
    },
    onSubmit (evt) {
      this.$v.$touch()
      evt.preventDefault()
      if (!this.$v.$invalid) {
        return axios
          .put('/portal/api/Organization/' + this.form.UserId, this.form)
          .then(response => {
        this.$bvModal.hide('address-modal')
          })
      }
    },
    convertAllToUpper (obj) {
      var a = obj
      for (var key in a) {
        var temp
        if (a.hasOwnProperty(key)) {
          temp = a[key]
          delete a[key]
          a[key.charAt(0).toUpperCase() + key.substring(1)] = temp
        }
      }
      obj = a
      return obj
    }
  },
  computed: {
    ...mapState({
      store: state => state.company
    })
  },
  mounted: function () {
    this.OrganizationId = JSON.parse(localStorage.getItem('organizationId'))

    this.getCompany(this.OrganizationId).then(() => {
      var newObj = Object.assign({}, this.store.company)
      this.form = this.convertAllToUpper(newObj)
    })

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
