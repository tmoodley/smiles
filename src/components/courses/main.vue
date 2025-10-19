<template>
  <div>
       <b-container class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col>
              <channels></channels>
        </b-col>
        <b-col cols="3" sm="12" md="3" lg="3" xl="3">
          <b-button block variant="primary" class="mt-2" @click="$bvModal.show('modal-create-post')">Create Post</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
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
                    <div class="h5 m-0">About Course</div>
                  </div>
                </div>
                <div>
                  <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                    <template #button-content>
                      <i class="fa fa-ellipsis-h"></i>
                    </template>
                    <b-dropdown-item @click="report">Report</b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </div>
            <div class="card-body">
              <h6 class="card-title"><b>{{course.name}}</b></h6>
              <p class="card-text">
                {{course.description}}
              </p>
              <p class="card-text">
                Created: {{course.createdAt | moment("MMM DD, YYYY")}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </b-container>
    <b-modal id="modal-create-post" ref="create-modal" size="lg" hide-footer title="Create a Post">
      <createpost @close="onClosed"></createpost>
    </b-modal>
    <b-modal id="modal-find-user"
             ref="modal"
             title="Search For User"
             @show="resetModal"
             @hidden="resetModal"
             @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Username"
                      label-for="name-input"
                      invalid-feedback="Username is required"
                      :state="nameState">
          <label class="sr-only" for="inline-form-input-username">Username</label>
          <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input list="input-list" id="input-with-list" v-model="searchHandle" placeholder="Username" required :state="nameState" @keyup="getData"></b-form-input>
            <b-form-datalist id="input-list" :options="searchContacts"></b-form-datalist>
          </b-input-group>
        </b-form-group>
      </form>
    </b-modal>
    <profile></profile>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import post from './post/card.vue'
import channels from './channels.vue'
import createpost from './post/create.vue'
import profile from '../profile/profilemodal.vue'
export default {
  props: ['msg'],
  data () {
    return {
      searchHandle: '',
      nameState: null,
      organizationId: JSON.parse(localStorage.getItem('actualOrgId'))
    }
  },
  components: {
    post,
    createpost,
    channels,
    profile
  },
  methods: {
    ...mapActions('posts', [
      'getSubjects',
      'getPostsByCourse',
      'addMemberToRoom'
    ]),
    ...mapActions('course', [
      'getCourse'
    ]),
    ...mapActions('messages', [
      'filterContacts'
    ]),
    members () {
      this.$router.push({ path: `/portal/room/members` })
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
    if (this.$route.params.id != null) {
      this.getCourse(this.$route.params.id)
      this.getPostsByCourse(this.$route.params.id)
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.posts
    }),
    ...mapState({
      course: state => state.course.course
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
