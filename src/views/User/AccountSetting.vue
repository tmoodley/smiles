<template>
  <div class="row">
    <div class="col-lg-6">
      <div class="iq-card">
        <div class="iq-card-header d-flex justify-content-between">
          <div class="iq-header-title">
            <h4 class="card-title">Account Setting</h4>
          </div>
        </div>
        <div class="iq-card-body">
          <div class="acc-edit">
            <accountSettings></accountSettings>
            <languages></languages>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="iq-card">
        <div class="iq-card-header d-flex justify-content-between">
          <div class="iq-header-title">
            <h4 class="card-title">Social Media</h4>
          </div> 
        </div>
        <div class="iq-card-body">  
          <div class="acc-edit">
            <b-form @submit="onSubmit">
              <div class="form-group">
                <label for="facebook">Facebook:</label>
                <input type="text" class="form-control" id="facebook" v-model="store.facebookUrl">
              </div>
              <div class="form-group">
                <label for="twitter">Twitter:</label>
                <input type="text" class="form-control" id="twitter" v-model="store.twitterUrl">
              </div>
              <div class="form-group">
                <label for="linkedin">LinkedIn:</label>
                <input type="text" class="form-control" id="linkedin" v-model="store.linkedInUrl">
              </div>
              <div class="form-group">
                <label for="instagram">Instagram:</label>
                <input type="text" class="form-control" id="instagram" v-model="store.instagramUrl">
              </div>
              <div class="form-group">
                <label for="youtube">You Tube:</label>
                <input type="text" class="form-control" id="youtube" v-model="store.youtubeUrl">
              </div> 
              <div class="form-group">
                <label for="youtube">Personal Website:</label>
                <input type="text" class="form-control" id="youtube" v-model="store.personalWebsiteUrl">
              </div> 
              <div class="form-group">
                <label for="youtube">Favorite Quotes:</label>
                <input type="text" class="form-control" id="youtube" v-model="store.favoriteQuotes">
              </div>
              <div class="form-group">
                <label for="youtube">Relationship Status:</label>
                <input type="text" class="form-control" id="youtube" v-model="store.relationshipStatus">
              </div>
              <button type="submit" class="btn btn-primary">Submit</button> 
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import accountSettings from 'components/settings/account-settings.vue' 
import languages from 'components/settings/languages.vue' 
import { socialvue } from '../../config/pluginInit'
import { mapState,mapActions } from 'vuex'
export default {
  name: 'AccountSetting',
  components: { 
    accountSettings,
    languages
  },
  mounted () {
    socialvue.index()
  }, 
  computed: { 
    ...mapState({
      friends: State => State.friend.friends
    }),
    ...mapState({
      store: state => state.company.company
    }),
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
  },
  methods: { 
    ...mapActions('company', [
      'getCompany',
      'updateCompany'
    ]),
    onSubmit(evt) {   
        evt.preventDefault()
        let self = this;
        var _company = { ...this.store }; 
        this.updateCompany(_company);
        this.$swal.fire({
          title: 'Saved!',
          text: 'Account information saved.',
          icon: 'success',
          timer: 3000
        })
    }
  }
}
</script>
