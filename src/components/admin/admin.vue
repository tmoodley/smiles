<template>
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
          <b-form-input id="input-1" v-model="$v.form.EmailAddress.$model" @blur="$v.form.EmailAddress.$touch()" type="text" :class="{'is-invalid':$v.form.EmailAddress.$error}" placeholder="Email Address"></b-form-input>
          <!--@input="myData = $event.target.value" :value="myData"-->
          <div class="invalid-feedback">
            <span v-if="!$v.form.EmailAddress.required">Please enter the Email</span>
            <span v-if="!$v.form.EmailAddress.email">Please enter a valid Email</span>
            <span v-if="!$v.form.EmailAddress.isUnique">Sorry, this user already in the system</span>
          </div>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="button" @click="closemodelbtn" variant="danger">Close</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  props: ['closemodel'],
  data () {
    return {
      form: {
        Name: '',
        EmailAddress: '',
        OrganizationId: JSON.parse(localStorage.getItem('organizationId'))
      },
      show: true
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
    ...mapActions('admins', [
      'getAdmins'
    ]),
    beforeSave (event) {
      this.$v.$touch()
      event.preventDefault()
      if (!this.$v.$invalid) {
        this.onSubmit(event)
      }
    },
    onSubmit (evt) {
      evt.preventDefault()
      axios
        .post('/portal/api/Admins', this.form)
        .then((response) => {
          this.form = {
            Name: '',
            EmailAddress: '',
            OrganizationId: JSON.parse(localStorage.getItem('organizationId'))
          }

          this.$nextTick(() => { this.$v.form.$reset() })
          this.getAdmins(this.form.OrganizationId)
          this.closemodel.click()
        })
    },
    onReset (evt) {
      evt.preventDefault()
      this.$bvModal.hide('modal-edit-admin')
      this.$bvModal.hide('modal-add-admin')
    },
    closemodelbtn () {
      this.closemodel.click()
    }
  }
}
</script>

<style scoped>
</style>
