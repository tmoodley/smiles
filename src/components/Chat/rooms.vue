<template>
    <div>
    <b-container class="pb-6 pt-2 pt-md-1 bg-gradient-success">
    </b-container>
    <b-container fluid class="mb-7">
    <b-row>
      <b-col cols="9" sm="12" md="9" lg="9" xl="9">
        <room v-for="room in rooms" :room="room"></room>
      </b-col>
      <b-col cols="3" sm="12" md="3" lg="3" xl="3" class="mt-4">
        <b-button block variant="primary" @click="$bvModal.show('bv-modal-room')">Add Room</b-button>
      </b-col>
    </b-row>
    <b-modal id="bv-modal-room"
             ref="modal"
             title="Add Room Name"
             @show="resetModal"
             @hidden="resetModal"
             @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Name"
                      label-for="name-input"
                      invalid-feedback="Name is required"
                      :state="nameState">
          <b-form-input id="name-input"
                        v-model="name"
                        :state="nameState"
                        required></b-form-input>
        </b-form-group>
        <b-form-group label="Description"
                      label-for="textarea-lazy"
                      description="This room discusses stuff about school..."
                      class="mb-0">
          <b-form-textarea id="textarea-lazy"
                           v-model="description"
                           placeholder="Enter your text"
                           lazy-formatter
                           :formatter="formatter"></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>
  </b-container>
  </div>
</template>
<script>
import room from './room.vue'
import { mapState, mapActions } from 'vuex'
var moment = require('moment')
export default {
  components: {
    room
  },
  data () {
    return {
      selected: ['m', 'f'],
      options: [
        { text: 'Male', value: 'm' },
        { text: 'Female', value: 'f' }
      ],
      name: '',
      description: '',
      isPrivate: '',
      nameState: null
    }
  },
  methods: {
    ...mapActions('company', [
      'getTutors',
      'getTutorsByFilter',
      'filterGender',
      'getCompany'
    ]),
    ...mapActions('chat', [
      'getRooms',
      'addRoom'
    ]),
    setSubject (subject) {
      this.addRoom(subject)
    },
    onClick (evt) {
      if (evt == [2]) {
        this.getTutorsByFilter(this.subject.id)
      } else if (evt == 'm' || evt == 'f') {
        var payload = {
          gender: evt,
          subjectId: this.subject.id
        }
        this.filterGender(payload)
      } else {
        this.getTutorsByFilter(this.subject.id)
      }
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal () {
      this.name = ''
      this.nameState = null
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      var self = this
      // save the room
      var payload = {
        name: this.name,
        description: this.description,
        organizationsId: JSON.parse(localStorage.getItem('actualOrgId'))
      }
      this.addRoom(payload).then(function () {
        self.getRooms()
      })
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('bv-modal-room')
      })
    }
  },
  computed: {
    ...mapState({
      rooms: state => state.chat.rooms
    }),
    ...mapState({
      genders: state => state.company.genders
    }),
    ...mapState({
      subjects: State => State.posts.subjects
    }),
    ...mapState({
      subject: State => State.posts.subject
    })
  },
  mounted: function () {
    this.$ga.page('/portal/chat/rooms')
    this.getRooms()
    this.getPartner(JSON.parse(localStorage.getItem('userId')))
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
