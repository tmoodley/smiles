<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
        v-bind:style="{ backgroundImage: 'url(' + user.logoURL + ')' }"
        style="min-height: 600px; background-size: cover; background-position: center top;">
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row >
            <b-col lg="7" md="10">
              <h1 class="display-2 text-white">Hello {{user.firstName}}</h1>
              <p class="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your
                work and manage your projects or assigned tasks</p>
              <a href="#!" class="btn btn-info">Edit profile</a>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <b-col xl="4" class="order-xl-2 mb-5">
          <user-card></user-card>
        </b-col>
        <b-col xl="8" class="order-xl-1">
          <edit-profile-form></edit-profile-form>
        </b-col>
      </b-row>
    </b-container>
    <imageCropModalOrg title="imageCropper" @update-org-logo="updateImage($event)"></imageCropModalOrg>
  </div>
</template>
<script>
import EditProfileForm from 'components/settings/profile.vue'
import UserCard from './UserProfile/UserCard.vue'
import imageCropModalOrg from 'components/settings/organization-sub-components/image-crop-organization.vue'
export default {
  components: {
    EditProfileForm,
    UserCard,
    imageCropModalOrg
  },
  computed: {
    user () {
      return this.$store.state.authentication.user
    }
  }
}
</script>
<style>
</style>
