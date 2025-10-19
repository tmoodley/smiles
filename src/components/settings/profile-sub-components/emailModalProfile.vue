<template>
  <!-- Modal -->
  <b-modal id="modal-email" hide-footer button-size="lg">
    <template #modal-title>
      Update Paypal Email
    </template>
    <b-form @submit="onSubmit" @reset="">
      <div class="modal-body">
          <b-form-group id="input-group-1" label="Paypal Email" label-for="input-1" style="color:#546064" :class="{invalid: $v.form.paypalEmail.$error}">
            <b-form-input id="input-1" v-model="$v.form.paypalEmail.$model" @blur="$v.form.paypalEmail.$touch()" :class="{'is-invalid':$v.form.paypalEmail.$error}" type="text" placeholder="Enter Paypal Email" style="color:#01151C;font-weight:bold"></b-form-input>
            <div class="invalid-feedback">
              <span v-if="!$v.form.paypalEmail.email">Please enter a valid Email</span>
              <span v-if="!$v.form.paypalEmail.required">Please enter Paypal Email</span>
              <span v-if="!$v.form.paypalEmail.isUnique">Sorry, this paypal email already taken</span>
            </div>
          </b-form-group>
        </div>
        <div class="modal-footer">
          <b-button type="button" variant="outline-primary" @click="cancelFunction">Cancel</b-button>
          <b-button type="submit" variant="success">Save</b-button>
        </div>
    </b-form>
  </b-modal>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
export default {
  components: {
  },
  data () {
    return {
      isDisabled: false,
      OrganizationId: '',
      form: null
    }
  },
  validations: {
    form: {
      paypalEmail: {
        email,
        required,
        isUnique (value) {
          if (value === '') return true
          if (this.$v.form.paypalEmail.required) {
            if (this.form.paypalEmail != this.store.company.paypalEmail) {
              return new Promise((resolve, reject) => {
                axios
                  .get('/portal/api/Organization/IsPaypalEmailIdDuplicate/' + this.form.paypalEmail)
                  .then((response) => {
                    resolve(!response.data)
                  })
              })
            } else {
              return true
            }
          } else {
            return true
          }
        }
      }
    }
  },
  methods: {
    ...mapActions('company', [
      'getCompany',
      'updateCompany'
    ]),
    cancelFunction () {
      this.$nextTick(() => {
        this.$v.form.$reset()
        this.form = { ...this.store.company }
        this.$bvModal.hide('modal-email')
      })
    },
    onSubmit (evt) {
      this.$v.$touch()
      evt.preventDefault()
      if (this.form.paypalEmail != this.store.company.paypalEmail) {
        if (!this.$v.$invalid) {
          this.updateCompany(this.form)
          // Hide the modal manually
          this.$nextTick(() => {
            this.$bvModal.hide('modal-email')
          })
        }
      }
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
    this.form = { ...this.store.company }
  }
}
</script>
<style>
  .modal-footer {
    border-top: 0px transparent;
  }
</style>
