<template>
  <div>
    <div class="container-fluid gedf-wrapper">
      <div class="row">
        <div class="col-md-9 gedf-main">
          <!--- \\\\\\\Post-->
          <div class="card gedf-card">
            <div class="card-body">
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="posts"
                  role="tabpanel"
                  aria-labelledby="posts-tab"
                >
                  <div class="form-group">
                    <label class="sr-only" for="message">Post</label>
                    <textarea
                      v-b-modal.modal-1
                      class="form-control border border-0"
                      id="message"
                      rows="3"
                      placeholder="Start a Post..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Post /////-->
          <post :post="post" isshowcomments="true"></post>
          <b-list-group>
            <b-list-group-item
              active
              class="flex-column align-items-start"
              v-for="comment in post.comments"
            >
              <b-row>
                <b-col cols="1">
                  <b-img
                    v-if="comment.organizations.logo != null"
                    class="rounded-circle"
                    :src="
                      getImage(
                        comment.organizations.userId,
                        comment.organizations.logo
                      )
                    "
                    fluid
                    alt="Responsive image"
                    ref="imageReforg"
                    width="45"
                  ></b-img>
                  <b-img
                    v-if="comment.organizations.logo == null"
                    class="rounded-circle"
                    src="/img/silhouette_large.png"
                    fluid
                    alt="Responsive image"
                    ref="imageReforg"
                    width="45"
                  ></b-img>
                </b-col>
                <b-col cols="9"
                  ><h7>@{{ comment.organizations.name }}</h7>
                  <a
                    href="#"
                    v-if="comment.organizations.isTutor"
                    @click="message(comment.organizations)"
                    >Message</a
                  ></b-col
                >
                <b-col cols="2"
                  ><small>{{
                    comment.createdAt | moment("from", "now")
                  }}</small></b-col
                >
              </b-row>
              <p class="mb-1">
                {{ comment.body }}
              </p>
            </b-list-group-item>
          </b-list-group>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
    <b-modal
      id="modal-1"
      ref="create-modal"
      size="lg"
      hide-footer
      title="Create a Post"
    >
      <createpost @close="onClosed"></createpost>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import post from 'components/forum/post/card.vue'
import createpost from 'components/forum/post/create.vue'
import {
  BIcon,
  BIconEnvelope,
  BIconCircleFill,
  BIconCalendar3,
  BIconLock,
  BIconPlus,
  BIconPerson,
  BIconCursorFill
} from 'bootstrap-vue'
export default {
  props: ['msg'],
  components: {
    BIcon,
    BIconEnvelope,
    BIconCircleFill,
    BIconCalendar3,
    BIconLock,
    BIconPlus,
    BIconPerson,
    BIconCursorFill,
    post,
    createpost
  },
  methods: {
    ...mapActions('posts', [
      'getSubjects',
      'getChannels',
      'getPost',
      'saveSubject',
      'getPostsBySubject'
    ]),
    getImage (orgId, logo) {
      return (
        'https://stuttie-files.s3.us-east-2.amazonaws.com/' + orgId + '/' + logo
      )
    },
    onClosed () {
      this.$refs['create-modal'].hide()
    },
    setSubject (subject) {
      this.saveSubject(subject)
    }
  },
  mounted () {
    var self = this
    this.getSubjects().then(function () {
      if (self.subject != '') {
        self.setSubject(self.subject)
      } else {
        self.setSubject(self.subjects[0])
      }
    })
  },
  computed: {
    ...mapState({
      subjects: State => State.posts.subjects
    }),
    ...mapState({
      channels: State => State.posts.channels
    }),
    ...mapState({
      post: state => state.posts.post
    }),
    ...mapState({
      subject: state => state.posts.subject
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
