<template>
  <b-container fluid class="background"> 
    <b-row no-gutters="true" class="mt-4">
      <b-col cols="12" sm="12" md="12" lg="12" xl="12" class="card">
        <b-row no-gutters="true" class="border-bottom row-hover">
          <b-col md="5" lg="5" xl="5">
            <div class="content-div">
              <p class="content-p content-heading-fonts">Tutor</p>
            </div>
          </b-col>
          <b-col md="6" lg="6" xl="6">
            <div class="content-div">
              <b-row>
                <b-col>
                  <b-form-checkbox v-model="store.company.isTutor"
                                   name="check-button"
                                   switch
                                   size="lg"
                                   @input="onClick">
                  </b-form-checkbox>
                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col md="1" lg="1" xl="1">

          </b-col>
        </b-row>
        <b-row no-gutters="true" class="border-bottom row-hover">
          <b-col md="5" lg="5" xl="5">
            <div class="content-div">
              <p class="content-p content-heading-fonts">Email Address</p>
            </div>
          </b-col>
          <b-col md="6" lg="6" xl="6">
            <div class="content-div" style="color:#576267">
              <b-row>
                <b-col>
                  <p class="content-p content-desc-fonts" style="margin-bottom:0px; color:#576267">{{EmailAddress}}</p>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <p class="content-p content-desc-fonts" style="color:#576267; font-size:12px; width:100%; overflow:hidden">Email address cannot be changed</p>
                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col md="1" lg="1" xl="1">
            <div class="content-div">
              <b-icon class="content-p" icon="chevron-right" hidden aria-hidden="true"></b-icon>
            </div>
          </b-col>
        </b-row>
        <b-row no-gutters="true" class="border-bottom row-hover" v-b-modal.modal-email>
          <b-col md="5" lg="5" xl="5">
            <div class="content-div">
              <p class="content-p content-heading-fonts">Paypal Address</p>
            </div>
          </b-col>
          <b-col md="6" lg="6" xl="6">
            <div class="content-div" style="color:#576267">
              <b-row>
                <b-col>
                  <p class="content-p content-desc-fonts">{{PaypalEmail}}</p>

                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col md="1" lg="1" xl="1">
            <div class="content-div">
              <b-icon class="content-p" icon="pencil" aria-hidden="true"></b-icon>
            </div>
          </b-col>
        </b-row>
        <b-row no-gutters="true" class="border-bottom row-hover" v-b-modal.password-change>
          <b-col md="5" lg="5" xl="5">
            <div class="content-div">
              <p class="content-p content-heading-fonts">Password</p>
            </div>
          </b-col>
          <b-col md="6" lg="6" xl="6">
            <div class="content-div">
              <p class="content-p content-desc-fonts">Change password</p>
            </div>
          </b-col>
          <b-col md="1" lg="1" xl="1">
            <div class="content-div">
              <b-icon class="content-p" icon="pencil" aria-hidden="true"></b-icon>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="5" xl="5">
      </b-col>
    </b-row>
    <emailModalProfile></emailModalProfile>
    <passwordChange></passwordChange>
  </b-container>
</template>

<script> 
  import { mapState, mapActions } from 'vuex';
  import emailModalProfile  from 'components/settings/profile-sub-components/emailModalProfile.vue'
  import passwordChange  from 'components/settings/account-settings-save/password-change.vue'
  export default {
    components: { 
      emailModalProfile,
      passwordChange
    },
    data() {
      return {
        EmailAddress: '', 
        checked: false
      }
    },
    methods: { 
      ...mapActions('company', [
        'getCompany',
        'updateCompany'
      ]),
      navigateTosave(navigateTo) {
        switch (navigateTo) {
          case 'password':
            this.$router.push({ path: '/portal/settings/passwordChange' })
            break;
        }
      }, 
      onClick(evt) {
        var _company = { ...this.store.company }; 
        _company.isTutor = evt;
        this.updateCompany(_company);
      }
    },
    computed: {
      ...mapState({
        store: state => state.company
      }),
      PaypalEmail: function () {
        return this.store.company.paypalEmail;
      }
    },
    mounted: function () { 
      this.$ga.page('/portal/accountsettings');
      this.EmailAddress = JSON.parse(localStorage.getItem('org'));
    },
  }

</script>

<style scoped>
  .custom-control.custom-switch {
    margin-top: 20px;
    margin-left: 18px;
  }

  .no-padding-margin {
    padding: 0px !important;
    margin: 0px !important;
    padding-left: 0px !important;
  }

  .heading {
    color: #01151C;
    font-size: 30px;
    font-weight: bold
  }

  .sub-title {
    color: #576367;
    font-size: 13px
  }
  .content-div {
    position: relative;
    width: 100%;
    min-height: 15px;
    overflow: hidden;
  }

  .content-p {
    position: relative;
    float: left;
    margin-left: 20px;
    margin-top: 5px;
  }

  .content-heading-fonts {
    font-weight: 500;
    color: #01151C;
  }

  .content-desc-fonts {
    font-weight: 500;
    color: #4B95E9;
  }

  .border-bottom {
    border-bottom: 1px solid #BFCED5;
  }

  @media (min-width: 768px) {
    .content-div {
      position: relative;
      width: 100%;
      min-height: 75px;
      overflow: hidden;
    }

    .content-p {
      position: relative;
      float: left;
      margin-left: 20px;
      margin-top: 20px;
    }

    .font-background-pic {
      color: #01151C;
      font-size: 18px;
      font-weight: bold
    }

    .row-hover:hover {
      cursor: pointer
    }

    .dragginImage {
      background: #E8F4ED;
    }

    .template-img {
      width: 100%;
      min-width: 100px;
      height: 60px;
      cursor: pointer
    }
  }
</style>
