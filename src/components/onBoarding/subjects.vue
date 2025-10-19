<!--You can use this as a starting template-->
<template>
  <b-container class="main-container">
    <b-row>
      <b-col>
        <p class="heading-p">Decide which subjects you will be teaching.</p>
        <div class="w-100"></div>
        <p class="sub-heading-p">Please select the subjects you are interested in teaching.</p>
      </b-col>
    </b-row>
    <b-progress :value="value" :max="max" show-progress animated></b-progress>
    <b-row data-toggle="modal" data-target="#gradeModalProfile" v-show="!store.company.isTutor">
      <b-form-group style="margin-left:55px; margin-top:20px" id="input-group-2" class="input-label" label="Grade" label-for="input-1">
        <b-form-input class="input-class" id="input-defaultTimezone" :value="store.company.grades != null ? store.company.grades.name : 'Select Grade'" type="text"></b-form-input>
      </b-form-group>
    </b-row>
    <subjects></subjects>
    <b-row>
      <b-col cols="10">
        <div class="form-group" style="margin-left:40px; margin-top:20px">
          <b-button variant="danger" @click="back">Back</b-button>
          <b-button variant="primary" @click="next">Continue</b-button>
        </div>
      </b-col>
    </b-row>
    <gradeModalProfile></gradeModalProfile>
  </b-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import subjects from '../settings/subjects.vue'
import gradeModalProfile from 'components/settings/profile-sub-components/gradeModalProfile.vue'
export default {
  components: {
    subjects,
    gradeModalProfile
  },
  data () {
    return {
      value: 60,
      max: 100,
      user: '',
      timeZoneoptions: []
    }
  },
  methods: {
    ...mapActions('onboarding', [
      'changeIsOnBoarding'
    ]),
    ...mapActions('partner', [
      'getPartner'
    ]),
    dashboard () {
      this.changeIsOnBoarding(false)
      this.$router.push({ path: '/portal/forum' })
    },
    back () {
      this.$router.push({ path: '/portal/onBoarding/my-profile' })
    },
    next () {
      if (this.store.company.isTutor) {
        this.$router.push({ path: '/portal/onBoarding/education' })
      } else {
        this.changeIsOnBoarding(false)
        this.$router.push({ path: '/portal/forum' })
      }
    }
  },
  computed: {
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
    ...mapState({
      store: state => state.company
    }),
    showGrade: function () {
      return this.store.company.grades != null ? this.store.company.grades.name : ''
    }
  },
  mounted: function () {
    this.$ga.page('/portal/onboarding/subjects')
  }
}

</script>

<style scoped>

  .background.container-fluid {
    background: none;
  }

  .heading-p {
    text-align: center;
    font-weight: bold;
    font-size: 35px;
    letter-spacing: 0px;
    color: #01151C;
    opacity: 1;
    margin-top: 40px
  }

  .sub-heading-p {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    letter-spacing: 0px;
    color: #01151C;
    opacity: 1;
  }

  .middle-div {
    width: 70%;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 4px 10px #CFDEE66C;
    border-radius: 7px;
    opacity: 1;
    margin-left: auto;
    margin-right: auto;
    margin-top:25px;
  }

  .input-class {
    width: 100%;
    height: 68px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #A5ACAE;
    border-radius: 10px;
    opacity: 1;
    color: #01151C;
    font-size: 18px;
  }

  .input-select-class {
    width: 100%;
    height: 68px;
    border: 1px solid #A5ACAE;
    border-radius: 10px;
    opacity: 1;
    color: #01151C;
    font-size: 18px;
  }

  .sign-up-btn {
    width: 90%;
    height: 62px;
    border-radius: 7px;
    opacity: 1;
    margin-bottom:30px
  }

    .sign-up-btn:hover {
      width: 90%;
      height: 62px;
      border-radius: 7px;
      opacity: 1;
    }
  input#input-defaultTimezone {
    width: 400px;
  }
</style>
