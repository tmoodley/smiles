<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="iq-card">
        <div class="iq-card-body p-0">
          <div class="iq-edit-list">
            <ul class="iq-edit-profile d-flex nav nav-pills">
              <li class="col-md-3 p-0">
                <a class="nav-link active" data-toggle="pill" href="#personal-information">
                  Profile Information
                </a>
              </li>
              <li class="col-md-3 p-0">
                <a class="nav-link" data-toggle="pill" href="#chang-pwd">
                  Subjects
                </a>
              </li>
              <li class="col-md-3 p-0">
                <a class="nav-link" data-toggle="pill" href="#emailandsms">
                  Tutor Information
                </a>
              </li>
              <li class="col-md-3 p-0">
                <a class="nav-link" data-toggle="pill" href="#manage-contact">
                  Billing and Invoicing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="iq-edit-list-data">
        <div class="tab-content">
          <div class="tab-pane fade active show" id="personal-information" role="tabpanel">
            <div class="iq-card">
              <div class="iq-card-header d-flex justify-content-between">
                <div class="iq-header-title">
                  <h4 class="card-title">Profile Information</h4>
                </div>
              </div>
              <div class="iq-card-body">
                <profileInformation></profileInformation>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="chang-pwd" role="tabpanel">
            <div class="iq-card">
              <div class="iq-card-header d-flex justify-content-between">
                <div class="iq-header-title">
                  <h4 class="card-title">Subjects</h4>
                </div>
              </div>
              <div class="iq-card-body">
                <subjects></subjects>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="emailandsms" role="tabpanel">
            <div class="iq-card">
              <div class="iq-card-header d-flex justify-content-between">
                <div class="iq-header-title">
                  <h4 class="card-title">Tutor Information</h4>
                </div>
              </div>
              <div class="iq-card-body">
                 <b-tabs content-class="mt-3" justified>
                  <b-tab title="Tutor Profile" active><tutorprofile></tutorprofile></b-tab>
                  <b-tab title="Education"><education></education></b-tab> 
                  <b-tab title="Schedule"><schedule></schedule></b-tab> 
                  <b-tab title="Reviews"><reviews></reviews></b-tab> 
                </b-tabs>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="manage-contact" role="tabpanel">
            <div class="iq-card">
              <div class="iq-card-header d-flex justify-content-between">
                <div class="iq-header-title">
                  <h4 class="card-title">Billing and Invoicing</h4>
                </div>
              </div>
              <div class="iq-card-body">
                <billing></billing>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { socialvue } from '../../config/pluginInit'
import profileInformation from 'components/settings/profile.vue' 
import subjects from 'components/settings/subjects.vue' 
import tutorprofile from 'components/settings/organizationProfile.vue' 
import education from 'components/settings/education.vue'
import schedule from 'components/settings/schedule.vue'
import billing from 'components/settings/billing.vue'
import reviews from 'components/settings/reviews.vue'
export default {
  name: 'ProfileEdit',
  components: {  
    profileInformation,
    subjects,
    tutorprofile,
    education,
    schedule,
    billing,
    reviews
  },
  mounted () {
    socialvue.index()
  },
  data () {
    return {
      user: {
        fname: '',
        lname: '',
        name: '',
        username: '',
        email: '',
        password: '',
        address1: '',
        address2: '',
        company_name: '',
        profile_image: require('../../assets/images/user/user-11.png'),
        mobile_no: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        role: '',
        gender: '',
        dob: '',
        url: ''
      },
      currentPassword: '',
      countries: [
        { value: 'Canada', text: 'Canada' },
        { value: 'Niada', text: 'Niada' },
        { value: 'USA', text: 'USA' },
        { value: 'India', text: 'India' },
        { value: 'Africa', text: 'Africa' }
      ],
      states: [
        { value: 'California', text: 'California' },
        { value: 'Florida', text: 'Florida' },
        { value: 'Georgia', text: 'Georgia' },
        { value: 'Connecticut', text: 'Connecticut' },
        { value: 'Louisiana', text: 'Louisiana' }
      ]
    }
  },
  methods: {
    onSubmit () {
      this.user.name = this.user.fname + ' ' + this.user.lname
      this.$router.replace('/user/user-list')
    },
    previewImage: function (event) {
      const input = event.target

      if (input.files && input.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.user.profile_image = e.target.result
        }

        reader.readAsDataURL(input.files[0])
      }
    },
    changePassword: function () {
    }
  }
}
</script>
