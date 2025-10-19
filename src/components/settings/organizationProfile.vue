<template>
<div>
  <b-container class="pb-6 pb-8 pt-2 pt-md-8 bg-gradient-success">
      <b-row no-gutters>
        <b-col>
          <p class="no-padding-margin heading text-white">Profile</p>
          <p class="no-padding-margin sub-title text-white">Customize your display info from here.</p>
        </b-col>
      </b-row>
  </b-container>
   <b-container fluid class="mt--7 pb-8">
      <b-card>
        <div>
          <div class="row eachRow" v-b-modal.organization-name>
            <b-col cols="4">
              <div class="form-group">
                <label class="fontDetails">Tutor Name</label>
              </div>
            </b-col>
            <b-col cols="7">
              <div class="form-group">
                <label style="color:#12b7e0" href="#foo">{{organizationName}}</label>
              </div>
            </b-col>
            <b-col cols="1">
                <b-icon icon="pencil" class="icon" aria-hidden="true"></b-icon>
              </b-col>
          </div>
          <hr />
          <div class="row eachRow" v-b-modal.tutor-rate>
            <b-col cols="4">
              <div class="form-group">
                <label class="fontDetails">Hourly Rate</label>
              </div>
            </b-col>
            <b-col cols="7">
              <div class="form-group">
                <label style="color:#12b7e0" href="#foo">{{store.company.hourlyRate}}</label>
              </div>
            </b-col>
            <b-col cols="1">
                <b-icon icon="pencil" class="icon" aria-hidden="true"></b-icon>
            </b-col>
          </div>
          <hr />
          <div class="row eachRow" v-b-modal.address-modal>
            <b-col cols="4">
              <div class="form-group">
                <label class="fontDetails">Tutor Address</label>
              </div>
            </b-col>
            <b-col cols="7">
              <div class="form-group">
                <label style="color:#12b7e0" href="#foo">{{organizationAddress}}</label>
              </div>
            </b-col>
            <b-col cols="1">
                <b-icon icon="pencil" class="icon" aria-hidden="true"></b-icon>
            </b-col>
          </div>
          <hr />
          <div class="row eachRow" v-b-modal.tutor-phone>
            <b-col cols="4">
              <div class="form-group">
                <label class="fontDetails">Tutor Phone</label>
              </div>
            </b-col>
            <b-col cols="7">
              <div class="form-group">
                <label style="color:#12b7e0" href="#foo">{{organizationPhone}}</label>
              </div>
            </b-col>
            <b-col cols="1">
                <b-icon icon="pencil" class="icon" aria-hidden="true"></b-icon>
            </b-col>
          </div>
          <hr />
          <div class="row eachRow" data-toggle="modal" v-b-modal.country-modal>
            <b-col cols="4">
              <div class="form-group">
                <label class="fontDetails">Country</label>
              </div>
            </b-col>
            <b-col cols="7">
              <div class="form-group">
                <label style="color:#12b7e0" href="#foo">{{store.company.country != null ? store.company.country.name : ''}}</label>
              </div>
            </b-col>
            <b-col cols="1">
                <b-icon icon="pencil" class="icon" aria-hidden="true"></b-icon>
            </b-col>
          </div>
          <hr />
          <div class="row eachRow" v-b-modal.about-tutor>
            <b-col cols="4">
              <div class="form-group">
                <label class="fontDetails">About Tutor </label>
              </div>
            </b-col>
            <b-col cols="7">
              <div class="form-group">
                <label style="color:#12b7e0" href="#foo">{{organizationAbout}}</label>
              </div>
            </b-col>
            <b-col cols="1">
                <b-icon icon="pencil" class="icon" aria-hidden="true"></b-icon>
            </b-col>
          </div>
        </div> 
      </b-card>
    <countryModalProfile></countryModalProfile>
    <editOrganizationName></editOrganizationName>
    <editRate></editRate>
    <editPhone></editPhone>
    <aboutOrganization></aboutOrganization>
    <editAddress></editAddress>
  </b-container>
</div>
</template>

<script>
import editOrganizationName from 'components/settings/organization-sub-components/editOrganizationName.vue'
import aboutOrganization from 'components/settings/organization-sub-components/aboutOrganization.vue'
import imageCropModalOrg from 'components/settings/organization-sub-components/image-crop-organization.vue'
import countryModalProfile from 'components/settings/profile-sub-components/countryModalProfile.vue' 
import editRate from 'components/settings/organization-sub-components/editRate.vue'
import editPhone from 'components/settings/organization-sub-components/editPhone.vue'
import editAddress from 'components/settings/organization-sub-components/editOrganizationAddress.vue'
import { mapActions, mapState } from 'vuex'
import { BIcon, BIconChevronRight, VBHover, BIconPencil } from 'bootstrap-vue'
export default { 
  components: { 
    BIcon,
    BIconChevronRight,
    VBHover,
    BIconPencil,
    editOrganizationName,
    aboutOrganization,
    imageCropModalOrg,
    countryModalProfile,
    editRate,
    editPhone,
    editAddress
  },
  data () {
    return {
      organizationId: '',
      organizationName: '',
      organizationPhone: '',
      organizationAbout: '',
      organizationAddress: '',
      imageFound: false,
      selectedImgURL: '/uploads/localhost/default-img.svg',
      dbImgURL: ''
    }
  },
  methods: {
    imgError () {
      this.$refs.imageRef.src = '/uploads/localhost/profile_pic.png'
    },
    updateImage (response) {
      this.imageFound = response
      // update done successfully and image found
      if (response) {
        this.getCompany(this.organizationId).then(() => {
          this.dbImgURL = '/uploads/' + this.organizationId + '/' + this.store.company.logo
        })
      }
    },
    ...mapActions('company', [
      'getCompany'
    ]),
    navigateTosave (navigateTo) {
      switch (navigateTo) {
        case 'organizationName':
          this.$router.push({ path: '/portal/settings/edit/name' })
          break
        case 'aboutOrganization':
          this.$router.push({ path: '/portal/settings/edit/about' })
          break
        case 'editOrganizationAddress':
          this.$router.push({ path: '/portal/settings/edit/address' })
          break
        case 'editOrganizationPhone':
          this.$router.push({ path: '/portal/settings/edit/Phone' })
          break
        case 'editOrganizationRate':
          this.$router.push({ path: '/portal/settings/edit/Rate' })
          break
      }
    }
  },
  computed: {
    ...mapState({
      store: state => state.company
    })
  },
  mounted: function () {
    this.organizationId = JSON.parse(localStorage.getItem('organizationId'))

    this.$ga.page('/portal/settings/organization')

    this.getCompany(this.organizationId).then(() => {
      if (this.store.company.name != null) {
        this.organizationName = this.store.company.name
      }
      if (this.store.company.phoneNumber != null) {
        this.organizationPhone = this.store.company.phoneNumber
      }
      if (this.store.company.description != null) {
        this.organizationAbout = this.store.company.description
      }

      if (this.store.company.address1 != null) {
        if (this.store.company.address2 == null || this.store.company.address2 == '') { this.organizationAddress = this.store.company.address1 + ', ' + this.store.company.city + ', ' + this.store.company.state + ' ' + this.store.company.country.name + ' ' + this.store.company.postalCode } else { this.organizationAddress = this.store.company.address1 + ', ' + this.store.company.address2 + ', ' + this.store.company.city + ', ' + this.store.company.state + ' ' + this.store.company.country.name + ' ' + this.store.company.postalCode }
      }

      // checking if logo exist
      if (this.store.company.logo == null) {
        this.imageFound = false
      } else {
        this.imageFound = true
        this.dbImgURL = '/uploads/' + this.organizationId + '/' + this.store.company.logo
      }
    })
  },
  created: function () {

  }

}
</script>

<style scoped>
  .iconDropdown {
    position: relative;
    float: right;
    margin-top: -30px;
    margin-right: 20px;
  }
  .fontDetails {
    font-weight: bold;
    color: #01151C;
  }
  .eachRow {
    padding-left: 5%;
    padding-top:1%;
  }
  .icon {
    color: #01151C;
  }
  .menu :hover {
    cursor: pointer
  }
  .header {
    padding-left: 1%;
    padding-top: 1%;
  }
</style>
