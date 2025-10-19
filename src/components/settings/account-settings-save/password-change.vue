<template>
  <!-- Modal -->
  <b-modal id="password-change" hide-footer button-size="lg">
    <template #modal-title> Change Password </template>
    <b-row class="mt-3"> 
          <b-col cols="12" sm="12" md="12" lg="12" xl="12" class="mb-3">
            <b-row class="mt-3 ml-3">
              <b-col>
                <p class="heading-font">Change password</p>
              </b-col>
            </b-row>
            <b-row class="ml-3">
              <b-col>
                <b-form @submit="onSubmit" @reset="">
                  <b-form-group id="input-group-1" label="Enter old password" label-for="input-1" style="color:#546064" :class="{invalid: $v.form.CurrentPassword.$error}">
                    <b-form-input id="input-1" v-model="$v.form.CurrentPassword.$model" autocomplete="off" readonly onfocus="this.removeAttribute('readonly')"  @blur="$v.form.CurrentPassword.$touch()" :class="{'is-invalid':$v.form.CurrentPassword.$error}" @input="textToPassword('CurrentPassword')" :type="typeCurrentPassword" placeholder="Old password" style="color:#01151C;font-weight:bold;background: white;"></b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.form.CurrentPassword.required">Please enter the old password</span>
                    </div>
                  </b-form-group>
                  <b-form-group id="input-group-1" label="Enter new password" label-for="input-1" style="color:#546064" :class="{invalid: $v.form.NewPassword.$error}">
                    <b-form-input id="input-1" v-model="$v.form.NewPassword.$model" autocomplete="off" readonly onfocus="this.removeAttribute('readonly')"   @blur="$v.form.NewPassword.$touch()" :class="{'is-invalid':$v.form.NewPassword.$error}" :type="typeNewPassword" @input="textToPassword('typeNewPassword')" placeholder="New password" style="color:#01151C;font-weight:bold;background: white;"></b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.form.NewPassword.required">Please enter the new password</span>
                    </div>
                  </b-form-group>
                  <b-form-group id="input-group-1" label="Re-enter new password" label-for="input-1" style="color:#546064" :class="{invalid: $v.form.ConfirmPassword.$error}">
                    <b-form-input id="input-1" v-model="$v.form.ConfirmPassword.$model"  autocomplete="off" readonly onfocus="this.removeAttribute('readonly')"  @blur="$v.form.ConfirmPassword.$touch()" :class="{'is-invalid':$v.form.ConfirmPassword.$error}" :type="typeConfirmPassword"  @input="textToPassword('typeConfirmPassword')" placeholder="Re-enter new password" style="color:#01151C;font-weight:bold;background: white;"></b-form-input>
                    <div class="invalid-feedback">
                      <span v-if="!$v.form.ConfirmPassword.sameAsPassword">Passwords must be identical</span>
                    </div>
                  </b-form-group>
                  <b-row>
                    <b-col>
                      <p style="color: #e74a3b; font-size: 80%;font-weight:400">{{error}}</p>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="8"> 
                      <b-button type="submit" variant="primary" class="mr-2">Submit</b-button>
                      <b-button variant="danger" @click="cancelFunction">Cancel</b-button>
                    </b-col>
                    <b-col cols="4">
                    </b-col>
                  </b-row>
                </b-form>
              </b-col>
            </b-row>
          </b-col>   
    </b-row> 
  </b-modal>
</template>

<script>
import { required, sameAs, email } from 'vuelidate/lib/validators'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      error: '',
      errorShow: false,
      typeCurrentPassword: 'text',
      typeNewPassword: 'text',
      typeConfirmPassword: 'text',
      OrganizationId: '',
      form: {
        CurrentPassword: '',
        NewPassword: '',
        ConfirmPassword: ''
      }
    }
  },
  validations: {
    form: {
      CurrentPassword: { required },
      NewPassword: { required },
      ConfirmPassword: {
        sameAsPassword: sameAs('NewPassword')
      }
    }
  },
  methods: {
    textToPassword (e) {
      if (e == 'CurrentPassword') {
        if (this.form.CurrentPassword != '' || this.form.CurrentPassword != null && e != 'Old password') { this.typeCurrentPassword = 'password' } else {
          this.typeCurrentPassword = 'text'
        }
      } else if (e == 'typeNewPassword') {
        if (this.form.NewPassword != '' || this.form.NewPassword != null) {
          this.typeNewPassword = 'password'
        } else {
          this.typeNewPassword = 'text'
        }
      } else if (e == 'typeConfirmPassword') {
        if (this.form.ConfirmPassword != '' || this.form.ConfirmPassword != null) { this.typeConfirmPassword = 'password' } else {
          this.typeConfirmPassword = 'text'
        }
      }
    },
    cancelFunction () {
        this.$bvModal.hide('password-change') 
    },
    onSubmit (evt) {
      this.$v.$touch()
      evt.preventDefault()
      if (!this.$v.$invalid) {
        return axios
          .post('/portal/api/Customers/ChangePassword', this.form)
          .then(response => { 
            if (response.data.succeeded) {
              this.$bvModal.hide('password-change') 
              this.error = ''
            } else {
              this.error = response.data.errors[0].description
            }
          }).catch(response => {
            console.log(response)
          })
      }
    }
  },
  computed: {
  },
  mounted: function () {
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
