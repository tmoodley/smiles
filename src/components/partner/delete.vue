<template>
  <div class="content">
    <b-form @submit="beforeDelete">
      <div class="row">
        <div class="form-group col-md-6">
          <label for="EmailAddress" class="control-label">Email Address</label>
          <input v-model="partner.emailAddress" class="form-control" placeholder="Email Address"/>
        </div>
        <div class="form-group col-md-6">
          <label for="GivenName" class="control-label">First Name</label>
          <input v-model="partner.givenName" class="form-control" />
        </div>
        <div class="form-group col-md-6">
          <label for="FamilyName" class="control-label">Last Name</label>
          <input v-model="partner.familyName" class="form-control" />
        </div>
      </div>
      <b-button class="mt-3 pull-right" @click="hideModel()">Cancel</b-button>
      <b-button type="submit" variant="primary" class="mt-3 pull-right">Delete</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
export default {
  props: ['editpartner'],
  data () {
    return {
      partner: {},
      OrganizationId: JSON.parse(localStorage.getItem('organizationId'))
    }
  },
  mounted: function () {
    if (this.editpartner != null) {
      this.partner = this.editpartner
    }
  },
  methods: {
    ...mapActions('partner', [
      'deletePartnerdb'
    ]),
    ...mapActions('partner', [
      'getPartners'
    ]),
    beforeDelete () {
      event.preventDefault()
      this.deletePartner()
    },
    deletePartner () {
      var self = this
      return axios
        .delete('/api/Customers/deletecustomer/' + self.partner.id)
        .then(response => {
          self.getPartners(this.OrganizationId)
          self.$bvModal.hide('modal-add-partner')
          this.hideModel()
        })
    },
    hideModel () {
      this.$bvModal.hide('modal-delete-partner')
    }
  }
}
</script>

<style scoped>

</style>
