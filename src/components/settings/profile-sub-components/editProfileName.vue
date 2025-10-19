<template>  
<!-- Modal -->
  <b-modal id="profile-name" hide-footer button-size="lg">
    <template #modal-title> Profile Name </template>
   <b-container fluid class="mt--7 pb-8">
      <b-card>
          <b-row class="ml-3">
            <b-col>
              <b-form @submit="onSubmit" @reset="">
                <b-form-group id="input-group-1" label="First Name" label-for="input-1" style="color:#546064" :class="{invalid: $v.form.GivenName.$error}">
                  <b-form-input id="input-1" v-model="$v.form.GivenName.$model" @blur="$v.form.GivenName.$touch()" :class="{'is-invalid':$v.form.GivenName.$error}" type="text" placeholder="First Name" style="color:#01151C;font-weight:bold"></b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.form.GivenName.required">Please enter the first name</span>
                  </div>
                </b-form-group>
                <b-form-group id="input-group-2" label="Last Name" label-for="input-1" style="color:#546064" :class="{invalid: $v.form.FamilyName.$error}">
                  <b-form-input id="input-1" v-model="$v.form.FamilyName.$model" @blur="$v.form.FamilyName.$touch()" :class="{'is-invalid':$v.form.FamilyName.$error}" type="text" placeholder="Last Name" style="color:#01151C;font-weight:bold"></b-form-input>
                  <div class="invalid-feedback">
                    <span v-if="!$v.form.FamilyName.required">Please enter the last name</span>
                  </div>
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
      </b-card>
   </b-container>
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
      form: null
    }
  },
  validations: {
    form: {
      FamilyName: { required },
      GivenName: { required }
    }
  },
  methods: {
    ...mapActions('partner', [
      'getPartner'
    ]),
    cancelFunction () {
      this.$nextTick(() => { this.$v.form.$reset() })
      this.$bvModal.hide('profile-name')
    },
    onSubmit (evt) {
      this.$v.$touch()
      evt.preventDefault()
      if (!this.$v.$invalid) {
        return axios
          .put('/portal/api/Customers/' + this.form.Id, this.form)
          .then(response => {
            this.$bvModal.hide('profile-name')
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
      console.log('y')
      return obj
    }
  },
  computed: {
    ...mapState({
      store: state => state.company
    }),
    ...mapState({
      partnerStore: State => State.partner.partner
    })
  },
  mounted: function () {
    this.OrganizationId = JSON.parse(localStorage.getItem('organizationId'))

    this.getPartner(JSON.parse(localStorage.getItem('userId'))).then(() => {
      var newObj = Object.assign({}, this.partnerStore)
      this.form = this.convertAllToUpper(newObj)
    })
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
