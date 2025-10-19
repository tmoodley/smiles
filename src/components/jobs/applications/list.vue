<template>
  <b-modal id="modal-job-applications"
           ref="modal"
           size="xl"
           title="Job Applications"
           hide-footer>
    <b-container fluid style="padding:34px">
      <b-row>
        <b-col cols="12" sm="12" md="12" lg="12" xl="12"><user v-for="user in users" :user="user"></user></b-col>
      </b-row>
      <profile></profile>
    </b-container>
  </b-modal>
</template>
<script>
import profile from 'components/profile/profilemodal.vue'
import user from './user.vue'
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
var moment = require('moment')
export default {
  components: {
    user, profile
  },
  data () {
    return {
      name: '',
      email: ''
    }
  },
  methods: {
    ...mapActions('posts', [
      'getSubjects',
      'saveSubject'
    ])
  },
  computed: {
    ...mapState({
      users: state => state.company.users
    })
  },
  mounted: function () {
    this.$ga.page('/portal/jobs/applications')
  }
}

</script>

<style scoped>
  .card.gedf-card {
    margin-top: 24px;
  }

  .btnCls {
    background-color: var(--success);
    border: none
  }
  .date {

  }
  .dateTextInput {
    background: white;
    color: #01151C;
    font-weight: bold
  }
  .calandarIcon {
    position: relative;
    float: right;
    margin-top: -37px;
    margin-right: 10px;
  }
  .iconRight {
    position: relative;
    float: right;
    margin-top: -37px;
    margin-right: 35px;
  }
  .iconLeft {
    position: relative;
    float: right;
    margin-top: -37px;
    margin-right: 65px;
  }
  .iconLeft :hover{
      cursor:pointer
  }
  .calandarIcon :hover {
    cursor: pointer
  }
  .iconRight :hover {
    cursor: pointer
  }
  .iconDropdown {
    position: relative;
    float: right;
    margin-top: -30px;
    margin-right: 20px;
  }

  .iconDropdown-up {
    position: relative;
    float: right;
    margin-top: -30px;
    margin-right: 20px;
  }
  .datePickerDiv {
    float: left;
    position: relative;
  }
  .datePickerDiv > input {
    border: none;
    background: transparent;
    color:transparent;
    display:none
  }
  .sideBar {
    background: #FFFFFF;
  }
</style>
