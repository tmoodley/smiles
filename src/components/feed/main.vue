<template>
  <div>
    <div class="container-fluid gedf-wrapper">
      <div class="row">
        <div class="col-md-9 gedf-main">
          <!--- \\\\\\\Post-->
          <div class="card gedf-card mb-3">
            <div class="">
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="posts"
                  role="tabpanel"
                  aria-labelledby="posts-tab"
                >
                  <h4 class="border-bottom px-3 py-3">Create a post</h4>
                  <div class=" px-3 py-3">
                    <div class="d-flex align-items-center border-bottom pb-3">
                      <img
                        class="avatar"
                        :src="companystore.logoUrl"
                      />
                      <textarea
                        rows="1"
                        v-b-modal.modal-1
                        class="text-area border border-0 w-100 resize-none ml-3"
                        id="message"
                        placeholder="Start a Post..."
                      ></textarea>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
          </div> 
        <DynamicScroller
          class="scroller"
          :items="posts"
          :min-item-size="300"
          style="height: 500px;"
          :emitResize="true"
          :prerender="10"
          v-infinite-scroll="loadMore"
          infinite-scroll-distance="10"
          infinite-scroll-disabled="busy"
          key-field="id"
        >
          <template v-slot="{ item, index, active }">
            <DynamicScrollerItem
              :item="item"
              :active="active"
              :size-dependencies="[
                item.body,
              ]"
              :data-index="index"
            > 
              <SocialPost :post="item"></SocialPost>  
            </DynamicScrollerItem>
          </template>
        </DynamicScroller> 
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="">
              <!-- <div class="mr-2">
                <b-img
                  v-if="org.logoUrl != null"
                  class="rounded-circle"
                  :src="org.logoUrl"
                  fluid
                  alt="Responsive image"
                  ref="imageReforg"
                  width="45"
                ></b-img>

                <div class="h5 m-0">
                  <a href="#">@{{ user.rooms }}</a>
                  <i
                    class="fa fa-female"
                    aria-hidden="true"
                    v-if="org.gender == 'f'"
                  ></i>
                  <i
                    class="fa fa-male"
                    aria-hidden="true"
                    v-if="org.gender == 'm'"
                  ></i>
                  <i
                    class="fas fa-chalkboard-teacher"
                    v-if="org.isTutor"
                    v-b-tooltip.hover
                    title="Tutor"
                  ></i>
                  <i
                    class="fas fa-graduation-cap"
                    v-if="!org.isTutor"
                    v-b-tooltip.hover
                    title="Student"
                  ></i>
                </div>
              </div> -->
              <!-- <h4 class="border-bottom px-3 py-3">Stories</h4>
              <div class="p-3">
                <Story
                  v-for="i in 4"
                  :key="i"
                  :image="
                    'https://stuttie-files.s3.us-east-2.amazonaws.com/c92d4698-34e1-4c1b-82ed-b55dba59b34c/21:16:33.1173037-Org-Logo.jpg'
                  "
                  :name="'Anna Mull'"
                  :time="'1 hour ago'"
                />
                <button class="btn btn-primary w-100 mt-2">See All</button>
              </div> -->
            </div> 
          </div>
        </div>
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
      <!-- <CreatePost /> -->
    </b-modal>
    <!-- <profile></profile> -->
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex"; 
import SocialPost from 'components/forum/SocialPost.vue';
import post from "components/feed/post/card.vue";
import comment from "components/feed/post/comment.vue";
import topics from "components/feed/topics.vue";
import channels from "components/feed/channels.vue";
import createpost from "components/feed/post/create.vue";
import profile from "components/profile/profilemodal.vue";
import Story from "./rusable/story.vue";
// import CreatePost from './create-post/index.vue'
 
import _ from "lodash";
import {
  BIcon,
  BIconEnvelope,
  BIconCircleFill,
  BIconCalendar3,
  BIconLock,
  BIconPlus,
  BIconPerson,
  BIconCursorFill
} from "bootstrap-vue";
export default {
  props: ["msg"],
  data() {
    return {
      selectedSubject: "",
      busy: false,
      page: 1 
    };
  },
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
    createpost,
    topics,
    channels,
    profile,
    comment,
    Story,
    // CreatePost,
    SocialPost
  },
  mounted() {
    console.log("post", this.socialPosts);
  },
  methods: {
    ...mapActions("posts", [
      "getSubjects",
      "getChannels",
      "getPosts",
      "saveSubject",
      "getPostsBySubject",
      "getSchoolPostsBySubject",
      "getPostsBySubjectPage",
      "getPostsByTopicPage",
      "getPostsByChannelPage",
      "selectUser",
      "getFilterPosts",
      "getPostsByUser",
      "getOrgByHandle"
    ]),
    ...mapActions("friend", [
      "getFriends",
      "getFriendRequests",
      "getFriendSuggestions",
      "getUsers",
      "getUsersByFilter",
      "filterUserGender",
      "filterUserByEmail",
      "filterUserByName"
    ]),
    addPost(post) {
      this.socialPosts.unshift(post);
    }, 
    download(id) {
      axios({
        url: "https://stuttie.com/api/documents/" + id,

        method: "GET"
      }).then(function(doc) {
        axios({
          url: "https://stuttie.com/api/document/" + id,

          method: "GET",

          responseType: "blob"
        }).then(response => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));

          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", doc.data.name);

          document.body.appendChild(fileLink);

          fileLink.click();
        });
      });
    },
    view(org) {
      this.selectUser(org);
      this.$bvModal.show("bv-modal-profile");
    },
    getImage(orgId, logo) {
      return (
        "https://stuttie-files.s3.us-east-2.amazonaws.com/" + orgId + "/" + logo
      );
    },
    onClosed() {
      this.$refs["create-modal"].hide();
    },
    filter() {
      let payload = {
        channelId: this.channel,
        subjectId: this.subject.id,
        topicId: this.topic,
        page: 1
      };
      this.getFilterPosts(payload);
    },
    setSubject(subject) {
      let self = this;
      this.saveSubject(subject);
      // check if default view is public
      if (
        self.companystore.defaultView == null ||
        self.companystore.defaultView == "Public"
      ) {
        self.getPostsBySubject(subject);
      } else {
        // if default view is school
        let payload = {
          schoolId: self.school.id,
          subjectId: subject.id
        };
        self.getSchoolPostsBySubject(payload);
      }
    },
    onChange() {
      let self = this;
      self.page = 1;
      var _subject = _.filter(self.subjects, function(obj) {
        if (obj.id == self.selectedSubject) {
          return obj;
        }
      });
      this.saveSubject(_subject[0]);
      // check if default view is public
      if (
        self.companystore.defaultView == null ||
        self.companystore.defaultView == "Public"
      ) {
        self.getPostsBySubject(self.selectedSubject);
      } else {
        // if default view is school
        let payload = {
          schoolId: self.school.id,
          subjectId: self.selectedSubject
        };
        self.getSchoolPostsBySubject(payload);
      }
    },
    loadMore() {
      var self = this;
      if (!self.busy) {
        self.busy = true;
        if (this.topic != "") {
          var payload = {
            topicId: self.topic,
            page: self.page
          };
          self.getPostsByTopicPage(payload);
          self.page = self.page + 1;
        } else if (this.channel != "") {
          var payload = {
            channelId: self.channel,
            page: self.page
          };
          self.getPostsByChannelPage(payload);
          self.page = self.page + 1;
        } else {
          var payload = {
            subjectId: self.selectedSubject,
            page: self.page
          };
          self.getPostsBySubjectPage(payload);
          self.page = self.page + 1;
        }
      }
      setTimeout(function() {
        self.busy = false;
      }, 2000);
    }
  },
  mounted() { 
    let user = JSON.parse(localStorage.getItem('user')); 
    this.getPostsByUser(user.data.defaultRoomId); 
    this.getFriends(JSON.parse(localStorage.getItem("actualOrgId")));
  },
  computed: {
    ...mapState({
      subjects: State => State.posts.subjects
    }),
    ...mapState({
      channels: State => State.posts.channels
    }),
    ...mapState({
      posts: state => state.posts.posts
    }),
    ...mapState({
      subject: state => state.posts.subject
    }),
    ...mapState({
      topic: state => state.posts.topic
    }),
    ...mapState({
      channel: state => state.posts.channel
    }),
    ...mapState({
      companystore: state => state.company.company
    }),
    ...mapState({
      school: state => state.school.school
    }),
    ...mapState({
      org: state => state.posts.org
    }),
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
    subjectsList() {
      var _subjects = this.subjects.map(function(item) {
        return {
          value: item.id,
          text: item.name
        };
      });
      _subjects.unshift({ value: null, text: "Please select a subject" });
      return _subjects;
    },
    ...mapState({
      friends: State => State.friend.friends
    }),
    user() {
      return this.$store.state.authentication.user.data;
    }
  }
};
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
.text-14 {
  font-size: 14px;
}
.hoverClass:hover {
  width: 15px;
  height: 15px;
}

.no-border:focus {
  border: none;
  outline: none;
}

.scroller {
  height: 100%;
}

.post {
  height: 100%;
  padding: 0 12px;
}
.resize-none {
  resize: none;
}
.text-area:focus {
  outline: none;
}
.text-area {
  font-size: 14px;
}
.avatar {
  height: 60px;
  width: 60px;
  border-radius: 100%;
}
</style>
