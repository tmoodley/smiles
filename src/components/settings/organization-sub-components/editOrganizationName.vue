<template>
  <!-- Modal -->
  <b-modal id="organization-name" hide-footer button-size="lg">
    <template #modal-title> Tutor Name </template>
        <b-row class="ml-3">
          <b-col>
            <b-form @submit="onSubmit" @reset="">
              <b-form-group id="input-group-1" label="Tutor Name" label-for="input-1" style="color:#546064" :class="{invalid: $v.form.Name.$error}">
                <b-form-input id="input-1" v-model="$v.form.Name.$model" @blur="$v.form.Name.$touch()" :class="{'is-invalid':$v.form.Name.$error}" type="text" placeholder="Enter Tutor Name" style="color:#01151C;font-weight:bold"></b-form-input>
                <div class="invalid-feedback">
                  <span v-if="!$v.form.Name.required">Please enter tutor name</span>
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
      Name: { required }
    }
  },
  methods: {
    ...mapActions('company', [
      'getCompany'
    ]),
    cancelFunction () { 
        this.$bvModal.hide('organization-name')
    },
    onSubmit (evt) {
      this.$v.$touch()
      evt.preventDefault()
      if (!this.$v.$invalid) {
        return axios
          .put('/portal/api/Organization/' + this.form.UserId, this.form)
          .then(response => {
            this.$bvModal.hide('organization-name')
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
    })
  },
  mounted: function () {
    this.OrganizationId = JSON.parse(localStorage.getItem('organizationId'))
    this.getCompany(this.OrganizationId).then(() => {
      var newObj = Object.assign({}, this.store.company)
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
