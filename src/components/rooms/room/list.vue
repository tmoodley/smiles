<template>
  <b-modal id="modal-find-room"
           ref="modal"
           size="xl"
           title="Search For Group"
           hide-footer>
    <b-container fluid style="padding:34px">
      <b-row>
          <b-col cols="4" sm="12" md="3" lg="3" xl="3">
            <b-form-group id="fieldset-horizontal"
                          label-cols-sm="2"
                          label-cols-lg="4"
                          content-cols-sm
                          content-cols-lg="8"
                          description="Search by Group ID."
                          label="Search by Group ID"
                          label-for="input-horizontal">
              <b-form-input v-model="groupId" id="input-horizontal"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="3" sm="12" md="3" lg="3" xl="3">
            <b-input-group prepend="Subject" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-select v-model="selectedSubject" :options="subjectsList" @change="groupId=''"></b-form-select>
            </b-input-group>
          </b-col>
          <b-col cols="3" sm="12" md="3" lg="3" xl="3">
            <b-input-group prepend="Topic" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-select v-model="selectedTopics" :options="topicsList"></b-form-select>
            </b-input-group>
          </b-col>
          <b-col cols="2" sm="12" md="3" lg="3" xl="2">
            <b-button variant="success" @click="search">Search</b-button>
          </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="12" lg="12" xl="12"><room v-for="room in rooms" :room="room"></room></b-col>
      </b-row>
      <profile></profile>
    </b-container>
  </b-modal>
</template>
<script>
import profile from 'components/profile/profilemodal.vue'
import room from './room.vue'
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
var moment = require('moment')
export default {
  components: {
    room, profile
  },
  data () {
    return {
      selectedSubject: '',
      gapi: null,
      selected: ['m', 'f'],
      groupId: '',
      options: [
        { text: 'Male', value: 'm' },
        { text: 'Female', value: 'f' }
      ]
    }
  },
  methods: {
    ...mapActions('company', [
      'getUsers',
      'getUsersByFilter',
      'filterUserGender'
    ]),
    ...mapActions('posts', [
      'getSubjects',
      'saveSubject',
      'getSearchRooms',
      'searchRoomsByTopic',
      'getSchoolRooms',
      'searchRoomsById',
      'searchRoomsBySubject'
    ]),
    getPartnerList () {
      this.getTutors()
    },
    setSubject (subject) {
      this.saveSubject(subject)
      this.getUsersByFilter(subject.id)
    },
    onClick (evt) {
      if (evt == [2]) {
        this.getUsersByFilter(this.selectedSubject)
      } else if (evt == 'm' || evt == 'f') {
        var payload = {
          gender: evt,
          subjectId: this.selectedSubject
        }
        this.filterUserGender(payload)
      } else {
        this.getUsersByFilter(this.selectedSubject)
      }
    },
    onChange () {
      this.getUsersByFilter(this.selectedSubject)
    },
    search () {
      if (this.groupId != '') {
        this.searchRoomsById(this.groupId)
      } else if (this.selectedTopics != null) {
        this.searchRoomsByTopic(this.selectedTopics)
      } else {
        this.searchRoomsBySubject(this.selectedSubject)
      }
    }
  },
  computed: {
    ...mapState({
      rooms: state => {
      //remove user groups from search list
        if( state.posts.searchrooms){
          return state.posts.searchrooms.filter(room => {
            let result = state.posts.rooms.find(userRoom =>{
              return userRoom.name===room.name
            })
            return !result;
          })
        }
         return state.posts.searchrooms
        }
    }),
    ...mapState({
      genders: state => state.company.genders
    }),
    ...mapState({
      subjects: State => State.posts.subjects
    }),
    ...mapState({
      topics: State => State.posts.topics
    }),
    ...mapState({
      subject: State => State.posts.subject
    }),
    subjectsList () {
      var _subjects = this.subjects.map(function (item) {
        return {
          value: item.id,
          text: item.name
        }
      })
      _subjects.unshift({ value: null, text: 'Please select a subject' })
      return _subjects
    },
    topicsList () {
      var index = 0
      if (this.selectedSubject != '') {
        index = this.subjects.findIndex(x => x.id === this.selectedSubject)
      }
      var _topics = this.subjects[index].topics.map(function (item) {
        return {
          value: item.id,
          text: item.name
        }
      })
      _topics.unshift({ value: null, text: 'Please select a topic' })
      return _topics
    }
  },
  mounted: function () {
    this.$ga.page('/portal/Rooms/Search')
    this.getSearchRooms()
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
