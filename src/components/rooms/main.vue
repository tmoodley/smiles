<template>
  <div>
     <b-container class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>  
        <router-link to="/groups">
          <i class="fas fa-arrow-left fa-4x"></i>
        </router-link>
        <b-col>
              <channels></channels>
        </b-col>
        <b-col cols="3" sm="12" md="3" lg="3" xl="3">
          <b-button block variant="primary" class="mt-2" @click="$bvModal.show('modal-create-post')">Create Post</b-button>
          <b-button block variant="secondary" :disabled="room.maxStudents - room.organizationRooms.length == 0" @click="$bvModal.show('modal-find-handle')">Add Member</b-button>
          <b-button block variant="danger" @click="inviteTutor" v-if="mode == 'Public'">Invite Tutor</b-button>
          <b-button block variant="primary" @click="$bvModal.show('modal-find-tutor')" v-else>Assign Tutor</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="mt--7">
      <div class="row mt-2">
        <div class="col-md-9 gedf-main">
          <div v-for="post in posts">
            <post :post="post" isshowcomments="false"></post>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card gedf-card">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="ml-2">
                    <div class="h5 m-0">About Group</div>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <h6 class="card-title"><b>{{room.name}}</b></h6>
              <p class="card-text">
                {{room.description}}
              </p>
              <p class="card-text">
                Created: {{room.createdAt | moment("MMM DD, YYYY")}}
              </p>
              <p class="card-text">
                <a href="#" @click="members">Members</a>: {{room.organizationRooms.length}}
              </p>
              <p class="card-text">
                <a href="#" @click="meetings">Meetings</a>: {{room.meetings.length}}
              </p>
              <p class="card-text">
                <a href="#" @click="documents">Documents</a>: {{room.roomDocuments.length}}
              </p>
              <p class="card-text">
                Start Meeting <a :href="'https://meet.stuttie.com/' + room.name" target="_blank">https://meet.stuttie.com/{{room.name}}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </b-container>
    <b-modal id="modal-create-post" ref="create-modal" size="lg" hide-footer title="Create a Post">
      <createpost @close="onClosed"></createpost>
    </b-modal>
    <users :room="room"></users>
    <b-modal id="modal-Invite-Tutor" hide-footer title="Invite Tutor">
      <div class="d-block text-center">
        <h3>How do you want to Invite Tutors?</h3>
      </div>
      <b-button class="mt-3" variant="primary" block @click="onFindAvailableTutor">Find available Tutor now</b-button>
      <b-button class="mt-2" variant="primary" block @click="onRequestTutorBySubject">Request Tutors by Subject</b-button>
      <b-button class="mt-2" variant="primary" block @click="onRequestTutorByTopic">Request Tutors by Topic</b-button>
    </b-modal>
    <job :room="room" :selected="selectedItem"></job>
    <tutors :room="room"></tutors>
    <profile></profile>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import post from 'components/rooms/post/card.vue'
import channels from 'components/rooms/channels.vue'
import createpost from 'components/rooms/post/create.vue'
import users from 'components/rooms/user/list.vue'
import tutors from 'components/rooms/tutor/list.vue'
import job from 'components/rooms/job/job.vue'
import profile from 'components/profile/profilemodal.vue'
export default {
  props: ['msg'],
  data () {
    return {
      searchHandle: '',
      nameState: null,
      organizationId: JSON.parse(localStorage.getItem('actualOrgId')),
      selectedItem: ''
    }
  },
  components: {
    post,
    createpost,
    channels,
    users,
    job,
    tutors,
    profile
  },
  methods: {
    ...mapActions('posts', [
      'getSubjects',
      'getPostsByRoom',
      'addMemberToRoom',
      'getChannels',
      'addRoomUser'
    ]),
    ...mapActions('messages', [
      'filterContacts'
    ]),
    ...mapActions('company', [
      'findAvailableTutor',
      'requestTutorBySubject',
      'requestTutorByTopic'
    ]),
    onFindAvailableTutor () {
      this.$bvModal.hide('modal-Invite-Tutor')
      this.$bvModal.show('bv-modal-job')
      this.selectedItem = 'AvailableTutor'
      // this.findAvailableTutor(this.room.id);
    },
    onRequestTutorBySubject () {
      this.$bvModal.hide('modal-Invite-Tutor')
      this.$bvModal.show('bv-modal-job')
      this.selectedItem = 'RequestTutorBySubject'
      // this.requestTutorBySubject(this.room.id);
    },
    onRequestTutorByTopic () {
      this.$bvModal.hide('modal-Invite-Tutor')
      this.$bvModal.show('bv-modal-job')
      this.selectedItem = 'RequestTutorByTopic'
      // this.requestTutorByTopic(this.room.id);
    },
    inviteTutor () {
      this.$bvModal.show('modal-Invite-Tutor')
    },
    members () {
      this.$router.push({ path: `/portal/group/members` })
    },
    documents () {
      this.$router.push({ path: `/portal/group/documents` })
    },
    meetings () {
      this.$router.push({ path: `/portal/group/meetings` })
    },
    onClosed () {
      this.$refs['create-modal'].hide()
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal () {
      this.searchHandle = ''
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
      var payload = {
        name: this.searchHandle,
        roomId: this.room.id
      }
      // Push the name to submitted names
      this.addMemberToRoom(payload)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-find-user')
      })
    },
    getData () {
      // Exit when the form isn't valid
      var payload = {
        filter: this.searchHandle,
        handle: this.companystore.name
      }
      this.filterContacts(payload)
    }
  },
  mounted () {
    this.getPostsByRoom(this.room)
    this.getChannels(this.room.id)
  },
  computed: {
    ...mapState({
      posts: state => state.posts.posts
    }),
    ...mapState({
      room: state => state.posts.room
    }),
    ...mapState({
      searchContacts: state => state.messages.searchContacts
    }),
    ...mapState({
      companystore: state => state.company.company
    })
  }
}

</script>
<style>

  .no-padding {
    padding: 4px;
    width: 24%;
  }

  .hoverClass {
    transition: 3s;
    width: 23px;
    height: 23px;
  }

    .hoverClass:hover {
      width: 15px;
      height: 15px;
    }

  .no-border:focus {
    border: none;
    outline: none;
  }
</style>
