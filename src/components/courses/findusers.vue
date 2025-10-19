<template>
  <div>
    <!--- \\\\\\\Create Post-->

    <b-form @submit="onSubmit">
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
          <b-form-group id="input-group-1" label="Topic" label-for="Title-1">
            <b-form-input id="Title-1" v-model="post.name" type="text" required placeholder="Enter Title"></b-form-input>
          </b-form-group>
          <b-form-group id="input-post-1" label="Body" label-for="post">
            <textarea class="form-control" id="message" v-model="post.body" rows="3" placeholder="Ask a Question..."></textarea>
          </b-form-group>
        </div>
      </div>
      <b-row style="margin-top:30px">
        <b-col md="auto">
          <b-button type="submit" :disabled="post.body == '' || post.channelsId == ''" class="right">Share</b-button>
        </b-col>
      </b-row>
    </b-form>

    <!-- Create Post /////-->
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['msg'],
  components: {
  },
  data () {
    return {
      tags: '',
      topics: [],
      post: {
        body: '',
        name: '',
        roomId: ''
      }
    }
  },
  methods: {
    ...mapActions('posts', [
      'getSubjects',
      'getChannels',
      'getPosts',
      'createPost'
    ]),
    getSelectedItem: function () { // Just a regular js function that takes 1 arg
      var index = this.subjects.findIndex(x => x.id === this.subjectsId)
      var _channels = this.subjects[index].topics.map(function (item) {
        return {
          value: item.id,
          text: item.name
        }
      })
      _channels.unshift({ value: null, text: 'Please select some item' })
      this.topics = _channels
    },
    onSubmit (evt) {
      evt.preventDefault()
      var organizationId = JSON.parse(localStorage.getItem('organizationId'))
      var actualOrgId = JSON.parse(localStorage.getItem('actualOrgId'))
      this.post.createdBy = organizationId
      this.post.organizationsId = actualOrgId
      this.post.roomsId = this.room.id
      var self = this
      this.createPost(this.post).then(function () {
        self.$emit('close')
      })
    }
  },
  created: function () {
    this.subjectsId = this.subject.id
  },
  computed: {
    alert () {
      return this.$store.state.alert
    },
    ...mapState({
      subjects: State => State.posts.subjects
    }),
    ...mapState({
      subject: state => state.posts.subject
    }),
    ...mapState({
      room: state => state.posts.room
    }),
    subjectsObjects () {
      var _subjects = this.subjects.map(function (item) {
        return {
          value: item.id,
          text: item.name
        }
      })
      _subjects.unshift({ value: null, text: 'Please select some item' })
      this.getSelectedItem()
      return _subjects
    }
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
    border:none;
    outline:none;
  }

</style>
