<template>
<!-- Modal -->
  <b-modal id="profile-address" hide-footer button-size="lg">
    <template #modal-title> Public URL </template> 
          <b-row>
            <b-col cols="12" sm="12" md="12" lg="12" xl="12" class="mb-3"> 
                  <b-form @submit="onSubmit" @reset="">
                    <b-form-group id="input-group-1" label="Stuttie Address" label-for="input-1" style="color:#546064" :class="{invalid: $v.form.DefaultRoomId.$error}">
                      <b-form-input :disabled="isDisabled" id="input-1" v-model="$v.form.DefaultRoomId.$model" @blur="$v.form.DefaultRoomId.$touch()" :class="{'is-invalid':$v.form.DefaultRoomId.$error}" type="text" placeholder="Enter Stuttie Address" style="color:#01151C;font-weight:bold"></b-form-input>
                      <div class="invalid-feedback">
                        <span v-if="!$v.form.DefaultRoomId.required">Please enter Stuttie address</span>
                        <span v-if="!$v.form.DefaultRoomId.isUnique">Sorry, this room address already taken</span>
                      </div>
                      <span v-if="isDisabled" style="color:red; font-size:80%">Sorry, you cannot change your Stuttie address at this time because you have future meetings scheduled</span>
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
      isDisabled: false,
      OrganizationId: '',
      form: null
    }
  },
  validations: {
    form: {
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
      }
    }
  },
  methods: {
    ...mapActions('partner', [
      'getPartner'
    ]),
    cancelFunction () {
      this.$nextTick(() => { this.$v.form.$reset() })
      this.$bvModal.hide('profile-address')
    },
    onSubmit (evt) {
      this.$v.$touch()
      evt.preventDefault()
      if (!this.$v.$invalid) {
        return axios
          .put('/portal/api/Customers/' + this.form.Id, this.form)
          .then(response => {
            this.$bvModal.hide('profile-address')
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

    // check for room name change

    axios
      .get('/portal/api/Meetings/IsUpcomingMeeting?id=' + JSON.parse(localStorage.getItem('userId')))
      .then(response => {
        this.isDisabled = response.data
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
