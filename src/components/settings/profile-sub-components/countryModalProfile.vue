<template>
  <!-- Modal -->
  <b-modal id="country-modal" hide-footer button-size="lg">
    <template #modal-title> Country </template> 
        <b-form>
          <div class="modal-body">
            <p style="margin-left: 3%;font-size:15px;color:#808080 ;font-weight:bold">Country</p>
            <b-form-group label="" label-for="ratio" label-cols-md="auto" class="mb-3">
              <b-form-select id="ratio" v-model="selected" style="font-size:15px; font-weight:bold; color:#01151C" :options="countries"></b-form-select>
            </b-form-group>
          </div>
          <div class="modal-footer">
                  <button @click="updateCountry" class="btn btn-primary mr-2">Save</button>
                  <button type="reset" class="btn iq-bg-danger" @click="cancelFunction">Cancel</button> 
          </div>
        </b-form>
  </b-modal>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      countries: [],
      selected: null
    }
  },
  methods: {
    ...mapActions('company', [
      'getCompany',
      'updateCompany'
    ]),
    updateCountry () {
      this.getCompany(JSON.parse(localStorage.getItem('organizationId')))
      var _company = { ...this.store.company }
      _company.countryId = this.selected
      this.updateCompany(_company)
      this.$bvModal.hide('country-modal')
    },
    cancelFunction () { 
        this.$bvModal.hide('country-modal')
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
      store: state => state.company
    })
  },
  mounted: function () {
    this.selected = this.store.company.countryId
    this.getCountries()
  }
}
</script>
