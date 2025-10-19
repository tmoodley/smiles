<template>
  <div>
    <!--- \\\\\\\Create Post-->
    <b-form @submit="onSubmit">
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="posts"
          role="tabpanel"
          aria-labelledby="posts-tab"
        >
          <b-row>
            <b-col xl="4" md="4">
              <b-form-group
                id="input-group-1"
                label="Channel"
                label-for="Title-1"
              >
                <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                  <b-form-select
                    v-model="post.channelId"
                    :options="channelsChannels"
                  ></b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col xl="4" md="4">
              <b-form-group label="Subject" label-for="subjects">
                <b-form-select
                  v-model="subjectsId"
                  :options="subjectsObjects"
                  v-on:change="getSelectedItem"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col xl="4" md="4">
              <b-form-group label="Topic" label-for="topics">
                <b-form-select
                  v-model="post.topicsId"
                  :options="topics"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group id="input-group-1" label="Title" label-for="Title-1">
            <b-form-input
              id="Title-1"
              v-model="post.name"
              type="text"
              required
              placeholder="Enter Title"
            ></b-form-input>
          </b-form-group>
          <wysiwyg v-model="post.body" />
          <b-form-group
            label="Enter new tags separated by space"
            label-for="tags-remove-on-delete"
          >
            <b-form-tags
              input-id="tags-remove-on-delete"
              :input-attrs="{
                'aria-describedby': 'tags-remove-on-delete-help'
              }"
              v-model="tags"
              separator=" "
              placeholder="Enter new tags separated by space"
              remove-on-delete
            ></b-form-tags>
            <b-form-text id="tags-remove-on-delete-help" class="mt-2">
              Press <kbd>Backspace</kbd> to remove the last tag entered
            </b-form-text>
          </b-form-group>
          <document @setid="setDocumentId"></document>
        </div>
      </div>
      <b-row style="margin-top:30px; float:right;">
        <b-col md="auto">
          <button
            class="bg-primary border-0 rounded px-4"
            type="submit"
            :disabled="post.body == '' || post.channelsId == ''"
          >
            Post
          </button>
        </b-col>
      </b-row>
    </b-form>
    <!-- Create Post /////-->
  </div>
</template>
<script>
import document from "components/forum/post/document.vue";
import { mapState, mapActions } from "vuex";
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
  components: {
    BIcon,
    BIconEnvelope,
    BIconCircleFill,
    BIconCalendar3,
    BIconLock,
    BIconPlus,
    BIconPerson,
    BIconCursorFill,
    document
  },
  data() {
    return {
      tags: "",
      topics: [],
      post: {
        body: "",
        name: "",
        subjectsId: "",
        topicsId: "",
        documentId: ""
      }
    };
  },
  methods: {
    ...mapActions("posts", [
      "getSubjects",
      "getChannels",
      "getPosts",
      "createPost"
    ]),
    setDocumentId(id) {
      this.post.documentId = id;
    },
    getSelectedItem: function() {
      // Just a regular js function that takes 1 arg
      var index = this.subjects.findIndex(x => x.id === this.subjectsId);
      var _channels = this.subjects[index].topics.map(function(item) {
        return {
          value: item.id,
          text: item.name
        };
      });
      _channels.unshift({ value: null, text: "Please select some item" });
      this.topics = _channels;
    },
    preventEnter() {},
    onSubmit(evt) {
      evt.preventDefault();
      var organizationId = JSON.parse(localStorage.getItem("organizationId"));
      var actualOrgId = JSON.parse(localStorage.getItem("actualOrgId"));
      this.post.tags = this.tags.join();
      this.post.createdBy = organizationId;
      this.post.organizationsId = actualOrgId;
      this.post.subjectsId = this.subjectsId;

      // check if default view is school
      if (this.companystore.defaultView == "School") {
        this.post.schoolId = this.school.id;
      }
      var self = this;
      this.createPost(this.post).then(function() {
        self.$emit("close");
      });
    }
  },
  created: function() {
    this.subjectsId = this.subject.id;
    this.post.topicsId = this.topic;
  },
  computed: {
    ...mapState({
      channels: State => State.posts.channels
    }),
    alert() {
      return this.$store.state.alert;
    },
    ...mapState({
      subjects: State => State.posts.subjects
    }),
    ...mapState({
      subject: state => state.posts.subject
    }),
    ...mapState({
      topic: state => state.posts.topic
    }),
    ...mapState({
      school: state => state.school.school
    }),
    ...mapState({
      companystore: state => state.company.company
    }),
    subjectsObjects() {
      var _subjects = this.subjects.map(function(item) {
        return {
          value: item.id,
          text: item.name
        };
      });
      _subjects.unshift({ value: null, text: "Please select some item" });
      this.getSelectedItem();
      return _subjects;
    },
    channelsChannels() {
      var channelsChannels = this.channels.map(function(item) {
        return {
          value: item.id,
          text: item.name
        };
      });
      channelsChannels.unshift({
        value: null,
        text: "Please select some item"
      });
      return channelsChannels;
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

.hoverClass:hover {
  width: 15px;
  height: 15px;
}

.no-border:focus {
  border: none;
  outline: none;
}
</style>
