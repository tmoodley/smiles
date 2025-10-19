<template>
<!-- Modal -->
  <b-modal id="profile-display-name" hide-footer button-size="lg">
    <template #modal-title> Display Name </template>  
        <b-form @submit="onSubmit" @reset="">
          <b-form-group id="input-group-1" label="Name" label-for="input-1" style="color:#546064" :class="{invalid: $v.form.DisplayName.$error}">
            <b-form-input id="input-1" v-model="$v.form.DisplayName.$model" @blur="$v.form.DisplayName.$touch()" :class="{'is-invalid':$v.form.DisplayName.$error}" type="text" placeholder="Enter Display Name" style="color:#01151C;font-weight:bold"></b-form-input>
            <div class="invalid-feedback">
              <span v-if="!$v.form.DisplayName.required">Please enter display name</span>
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
      DisplayName: { required }
    }
  },
  methods: {
    ...mapActions('partner', [
      'getPartner'
    ]),
    cancelFunction () {
      this.$nextTick(() => { this.$v.form.$reset() })
            this.$bvModal.hide('profile-display-name')
    },
    onSubmit (evt) {
      this.$v.$touch()
      evt.preventDefault()
      if (!this.$v.$invalid) {
        return axios
          .put('/portal/api/Customers/' + this.form.Id, this.form)
          .then(response => {
            this.$bvModal.hide('profile-display-name')
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

      if (this.partnerStore.displayName == null) {
        this.form.DisplayName = this.partnerStore.givenName
      } else {
        this.form.DisplayName = this.partnerStore.displayName
      }
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
