<template>
  <div>
    <b-container class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success"> 
      <!-- Card stats -->
      <b-row>
        <b-col md="9" sm="12">
          <!--- \\\\\\\Post-->
          <div class="card gedf-card">
            <div class="">
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="posts"
                  role="tabpanel"
                  aria-labelledby="posts-tab"
                >
                  <h4 class="border-bottom px-3 py-3">Create a post</h4>
                  <div class="px-3 pb-3">
                    <div
                      class="d-flex align-items-center border-bottom pb-3 pt-3"
                    >
                      <img
                        class="avatar"
                        :src="companystore.logoUrl"
                      />
                      <textarea
                        rows="1"
                        v-b-modal.modal-1
                        class="text-area border no-border border-0 w-100 resize-none ml-3"
                        id="message"
                        placeholder="Start a Post..."
                      ></textarea>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3 card">
            <div class="mt--7">
              <div class="row">
                <div class="col-md-12">   
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
              </div>
            </div>
          </div>
          <!-- Post /////-->
        </b-col>
        <b-col md="3" sm="12">
          <div class="card px-2 py-4">
            <channels></channels>
            <div>
              <h6 class="card-subtitle mb-2 text-muted">Filter By Subjects</h6>
              <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                <b-form-select
                  class="text"
                  v-model="selectedSubject"
                  @change="onChange()"
                  :options="subjectsList"
                ></b-form-select>
              </b-input-group>
            </div>
            <topics></topics>
            <b-button block variant="primary" class="mt-2" @click="filter"
              >Filter</b-button
            >
          </div>
        </b-col>
      </b-row>
    </b-container>
    <!-- <b-container fluid class="mt--7">
      <div class="row">
        <div class="col-md-12 gedf-main">
          <DynamicScroller
            class="scroller"
            :items="posts"
            :min-item-size="550"
            style="height: 500px;"
            :emitResize="true"
            :prerender="10"
            v-infinite-scroll="loadMore"
            infinite-scroll-distance="10"
            infinite-scroll-disabled="busy"
            key-field="id"
          >
            <template v-slot="{ item, index, active }">
              <DynamicScrollerItem :item="item" :active="active">
                <post :post="item" isshowcomments="false"></post>
                <b-list-group>
                  <b-list-group-item
                    active
                    class="flex-column align-items-start"
                    v-for="comment in item.comments"
                  >
                    <comment :comment="comment"></comment>
                  </b-list-group-item>
                </b-list-group>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
        </div>
      </div>
    </b-container> -->
    <b-modal
      id="modal-1"
      ref="create-modal"
      size="lg"
      hide-footer
      title="Create a Post"
    >
      <createpost @close="onClosed"></createpost>
    </b-modal>
    <profile></profile>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import post from "components/forum/post/card.vue";
import comment from "components/forum/post/comment.vue";
import topics from "components/forum/topics.vue";
import channels from "components/forum/channels.vue";
import createpost from "components/forum/post/create.vue";
import profile from "components/profile/profilemodal.vue";
import SocialPost from 'components/forum/SocialPost.vue';
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
    post,
    createpost,
    topics,
    channels,
    profile,
    comment,
    SocialPost
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
      "getFilterPosts"
    ]),
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
    var self = this;
    if (this.subjects.length == 0) {
      this.getSubjects().then(function() {
        self.selectedSubject = self.subjects[0].id;
        self.setSubject(self.subjects[0]).then(function() {
          // check if default view is public
          if (this.companystore.defaultView == "Public") {
            self.getPostsBySubject(self.subject);
          } else {
            // if default view is school
            let payload = {
              schoolId: self.school.id,
              subjectId: self.subject.id
            };
            self.getSchoolPostsBySubject(payload);
          }
        });
      });
    } else {
      if (self.subject != "") {
        self.selectedSubject = self.subjects[0].id;
        self.setSubject(self.subject);
      }
    }
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
    subjectsList() {
      var _subjects = this.subjects.map(function(item) {
        return {
          value: item.id,
          text: item.name
        };
      });
      _subjects.unshift({ value: null, text: "Please select a subject" });
      return _subjects;
    }
  }
};
</script>
<style>
.resize-none {
  resize: none;
}
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

.scroller {
  height: 100%;
}

.post {
  height: 100%;
  padding: 0 12px;
}
.list-group-item.flex-column.align-items-start.active {
  background: white;
  border: white;
}
.avatar {
  height: 60px;
  width: 60px;
  border-radius: 100%;
}
</style>
