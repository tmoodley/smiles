<template>
  <div class="content">
    <b-form @submit="beforeSave">
      <div class="row">
        <b-form-group Id="input-group-1" class="form-group col-md-6" label="Email" label-for="input-1" :class="{invalid: $v.form.EmailAddress.$error}">
          <b-form-input Id="input-1" v-model="$v.form.EmailAddress.$model" @blur="$v.form.EmailAddress.$touch()" type="text" :class="{'is-invalid':$v.form.EmailAddress.$error}" placeholder="Email"></b-form-input>
          <div class="invalid-feedback">
            <span v-if="!$v.form.EmailAddress.required">Please enter the Email</span>
            <span v-if="!$v.form.EmailAddress.email">Please enter a valid Email</span>
            <span v-if="!$v.form.EmailAddress.isUnique">Sorry, this user already in the system</span>
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
      <b-button class="mt-3 pull-right" @click="hideModel()">Cancel</b-button>
      <b-button type="submit" variant="primary" class="mt-3 pull-right">Save</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import { required, numeric, email } from 'vuelidate/lib/validators'
export default {
  props: ['closeaddpartner'],
  computed: {
    ...mapState({
      partnerStore: State => State.partner
    }),
    ...mapState({
      store: State => State.company
    })
  },
  components: {
  },
  data () {
    return {
      saveValidate: true,
      validate: true,
      action: '',
      email: JSON.parse(localStorage.getItem('user')).username,
      OrganizationId: JSON.parse(localStorage.getItem('organizationId')),
      partner: {},
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
      DefaultRoomId: {
        required,
        isUnique (value) {
          if (value === '') return true
          if (this.$v.form.DefaultRoomId.required) {
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
    hideModel () {
      this.closeaddpartner.click()
    },
    ...mapActions('company', [
      'getCompany'
    ]),
    ...mapActions('partner', [
      'getPartners'
    ]),
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
      console.log(this.partner)
      event.preventDefault()
      var self = this
      self.form.SubscriptionPlan = 'Free'
      self.form.OrganizationId = this.OrganizationId
      delete self.form.Id
      return axios
        .post('/portal/api/Customers', self.form)
        .then(response => {
          this.form = {
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
            WorkPhone: ''
          }
          this.$nextTick(() => { this.$v.form.$reset() })
          self.getPartners(this.OrganizationId)
          this.closeaddpartner.click()
        })
    },
    onComplete: function () {
      event.preventDefault()
      var self = this
      if (this.$v.$invalid == true) {
        this.validate = false
        self.$swal.fire('Please make sure the required field is filled properly')
      } else {
        this.save().then(function () {
          self.$swal.fire(
            'Saved',
            'Job Saved',
            'success'
          ).then(function () {
            self.$emit('hide')
          })
        })
      }
    }
  },
  mounted: function () { }
}
</script>

<style scoped>
  /* button.b-form-datepicker {
    margin: 0;
    border-radius: 2.1875rem;
  }

  button.btn.btn-sm.btn-outline-secondary.border-0.flex-fill.p-1.mx-1 {
    COLOR: blue;
  }

  .form-group.invalid label {
    color: red;
  }

  .form-group.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }

  .form-group p.invalided, .col-md-2 p.invalided {
    display: none;
  }*/

</style>
