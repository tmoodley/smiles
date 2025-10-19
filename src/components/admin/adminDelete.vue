<template>
  <div class="row">
    <div class="col">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Name" label-for="input-1">
          <b-form-input id="input-1" disabled="true" v-model="form.Name" type="text" required placeholder="Name"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="Email Address" label-for="input-1">
          <b-form-input id="input-1" disabled="true" v-model="form.EmailAddress" type="text" required placeholder="Email Address"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="Subject" label-for="input-1">
          <b-form-input id="input-1" disabled="true" v-model="form.Subject" type="text" required placeholder="Subject"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="Note" label-for="input-1">
          <b-form-input id="input-1" disabled="true" v-model="form.Note" type="text" required placeholder="Note"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Delete</b-button>
        <b-button type="reset" variant="danger">Close</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
export default {
  props: ['selectedadmin'],
  data () {
    return {

      form: {
        Name: '',
        EmailAddress: '',
        Subject: '',
        Note: '',
        Id: '',
        OrganizationId: ''
      },
      show: true
    }
  },
  methods: {
    ...mapActions('admins', [
      'getAdmins'
    ]),
    onSubmit (evt) {
      evt.preventDefault()
      axios
        .delete('/portal/api/Admins/' + this.form.Id)
        .then((response) => {
          this.getAdmins(this.form.OrganizationId)
          this.$bvModal.hide('modal-delete-admin')
        })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.Name = ''
      this.form.EmailAddress = ''
      this.form.Subject = ''
      this.form.Note = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  mounted: function () {
    if (this.selectedadmin != null) {
      console.log('Edit admin: ' + this.selectedadmin)

      this.form.Name = this.selectedadmin.name
      this.form.EmailAddress = this.selectedadmin.emailAddress
      this.form.Subject = this.selectedadmin.subject
      this.form.Note = this.selectedadmin.note
      this.form.Id = this.selectedadmin.id
      this.form.OrganizationId = this.selectedadmin.organizationId
    }
  }
}
</script>

<style scoped>
</style>
