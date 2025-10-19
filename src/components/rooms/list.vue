<template>
  <div>
    <b-container fluid class="mt--8 ml-4">
      <b-row>
        <b-col cols="9" sm="12" md="9" lg="9" xl="9">
          <room v-for="room in rooms" :room="room"></room>
        </b-col>
        <b-col cols="3" sm="3" md="3" lg="3" xl="3" class="mt-4">
          <b-button block variant="primary" @click="addGroup"
            >Add Group</b-button
          >
          <b-button
            block
            variant="primary"
            @click="$bvModal.show('modal-find-room')"
            >Find Group</b-button
          >
        </b-col>
      </b-row>
      <findrooms></findrooms>
      <b-modal
        id="bv-modal-room"
        ref="modal"
        title="Add Group"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Group Id" label-for="name-input">
            <b-form-input
              id="name-input"
              v-model="name"
              readonly
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Grades" label-for="Grades">
            <b-form-select
              v-model="gradesId"
              :options="gradesoptions"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group label="Subjects" label-for="Subjects">
            <b-form-select
              v-model="subjectId"
              :options="subjectsObjects"
              v-on:change="getSelectedItem"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group label="Topic" label-for="topics">
            <b-form-select
              v-model="topicId"
              :options="topics"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label="Description"
            label-for="textarea-lazy"
            required
            description="This group discusses stuff about..."
            class="mb-0"
          >
            <b-form-textarea
              id="textarea-lazy"
              v-model="description"
              placeholder="Enter your text"
              lazy-formatter
              :formatter="formatter"
            ></b-form-textarea>
          </b-form-group>
          <b-form-group
            label="Max Students"
            label-for="textarea-lazy"
            description="How many students should this group have..."
            class="mb-0"
          >
            <b-form-spinbutton
              id="sb-maxStudents"
              v-model="maxStudents"
              min="1"
              max="50"
              step="1"
            ></b-form-spinbutton>
          </b-form-group>
          <b-form-group
            label-for="textarea-lazy"
            description="Can anyone join or do they have to request to join this group?"
            class="mb-0"
          >
            <b-form-checkbox switch v-model="isPrivate" size="lg"
              >Private</b-form-checkbox
            >
          </b-form-group>
        </form>
      </b-modal>

      <b-modal id="bv-modal-group-details" ref="modal" title="Group Details">
        <form ref="form" @submit.stop.prevent="handleSubmit1">
          <fieldset disable="true">
            <b-form-group label="Group Id" label-for="name-input">
              <b-form-input
                id="name-input"
                v-model="roomDetails.name"
                readonly
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Grades" label-for="Grades">
              <b-form-select
                v-model="roomDetails.gradesId"
                :disabled="true"
                :options="gradesoptions"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group label="Subjects" label-for="Subjects">
              <b-form-select
                v-model="roomDetails.subjectId"
                :disabled="true"
                :options="subjectsObjects"
                v-on:change="getSelectedItem"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group label="Topic" label-for="topics">
              <b-form-select
                v-model="roomDetails.topicId"
                :disabled="true"
                :options="topics"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group
              label="Description"
              label-for="textarea-lazy"
              required
              description="This group discusses stuff about..."
              class="mb-0"
            >
              <b-form-textarea
                id="textarea-lazy"
                v-model="roomDetails.description"
                placeholder="Enter your text"
                readonly
                lazy-formatter
                :formatter="formatter"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group
              label="Max Students"
              label-for="textarea-lazy"
              description="How many students should this group have..."
              class="mb-0"
            >
              <b-form-input
                id="name-input"
                v-model="roomDetails.maxStudents"
                readonly
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-for="textarea-lazy"
              description="Can anyone join or do they have to request to join this group?"
              class="mb-0"
            >
              <b-form-checkbox
                :disabled="true"
                switch
                v-model="roomDetails.isPrivate"
                size="lg"
                >Private</b-form-checkbox
              >
            </b-form-group>
          </fieldset>
        </form>
      </b-modal>
    </b-container>
  </div>
</template>
<script>
import room from "./room.vue";
import findrooms from "./room/list.vue";
import { mapState, mapActions } from "vuex";
import axios from "axios";
var moment = require("moment");
export default {
  components: {
    room,
    findrooms,
  },
  data() {
    return {
      selected: ["m", "f"],
      options: [
        { text: "Male", value: "m" },
        { text: "Female", value: "f" },
      ],
      name: "",
      description: "",
      isPrivate: "",
      nameState: null,
      mode: localStorage.getItem("mode"),
      gradesoptions: [],
      subjectsId: "",
      gradesId: "",
      subjectId: "",
      topicId: "",
      maxStudents: 2,
    };
  },
  methods: {
    ...mapActions("company", [
      "getTutors",
      "getTutorsByFilter",
      "filterGender",
    ]),
    ...mapActions("posts", [
      "getRooms",
      "addRoom",
      "getSchoolRooms",
      "getSubjects",
      "getChannels",
      "getGrades",
    ]),
    ...mapActions("company", ["getCompany"]),
    addGroup() {
      this.$bvModal.show("bv-modal-room");
    },
    getRandomNumberBetween(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getSelectedItem: function () {
      // Just a regular js function that takes 1 arg
      let index = 0;
      if (this.subjectId != "") {
        index = this.subjects.findIndex((x) => x.id === this.subjectId);
      }
      var _subjects = this.subjects[index].topics.map(function (item) {
        return {
          value: item.id,
          text: item.name,
        };
      });
      _subjects.unshift({ value: null, text: "Please select some item" });
      this.topics = _subjects;
    },
    setSubject(subject) {
      this.addRoom(subject);
    },
    onClick(evt) {
      if (evt == [2]) {
        this.getTutorsByFilter(this.subject.id);
      } else if (evt == "m" || evt == "f") {
        var payload = {
          gender: evt,
          subjectId: this.subject.id,
        };
        this.filterGender(payload);
      } else {
        this.getTutorsByFilter(this.subject.id);
      }
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = this.getRandomNumberBetween(100000, 1000000);
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      var self = this;
      // check if default view is public
      if (this.companystore.defaultView == "Public") {
        // save the room
        var payload = {
          name: this.name,
          description: this.description,
          isPrivate: Boolean(this.isPrivate),
          organizationsId: JSON.parse(localStorage.getItem("actualOrgId")),
          gradesId: this.gradesId,
          subjectId: this.subjectId,
          topicId: this.topicId,
          maxStudents: this.maxStudents,
          createdAt: new Date(),
        };
        this.addRoom(payload).then(function () {
          self.getRooms(JSON.parse(localStorage.getItem("actualOrgId")));
        });
      } else {
        // if default view is school
        // save the room
        var payload = {
          schoolId: this.school.id,
          name: this.name,
          description: this.description,
          isPrivate: Boolean(this.isPrivate),
          organizationsId: JSON.parse(localStorage.getItem("actualOrgId")),
          gradesId: this.gradesId,
          subjectId: this.subjectId,
          topicId: this.topicId,
          maxStudents: this.maxStudents,
          createdAt: new Date(),
          createdBy: JSON.parse(localStorage.getItem("actualOrgId")),
        };
        this.addRoom(payload).then(function () {
          self.getSchoolRooms(self.school.id);
        });
      }

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("bv-modal-room");
      });
    },
  },
  computed: {
    ...mapState({
      selectedRoom: (state) => state.posts.selectedRoom,
    }),
    ...mapState({
      roomDetails: (state) => state.posts.roomDetails,
    }),
    ...mapState({
      rooms: (state) => state.posts.rooms,
    }),
    ...mapState({
      genders: (state) => state.company.genders,
    }),
    ...mapState({
      subjects: (State) => State.posts.subjects,
    }),
    ...mapState({
      subject: (State) => State.posts.subject,
    }),
    ...mapState({
      companystore: (state) => state.company.company,
    }),
    ...mapState({
      school: (state) => state.school.school,
    }),
    ...mapState({
      mode: (state) => state.school.mode,
    }),
    ...mapState({
      topic: (state) => state.posts.topic,
    }),
    ...mapState({
      companystore: (state) => state.company.company,
    }),
    ...mapState({
      grades: (State) => State.posts.grades,
    }),
    subjectsObjects() {
      var _subjects = this.subjects.map(function (item) {
        return {
          value: item.id,
          text: item.name,
        };
      });
      _subjects.unshift({ value: null, text: "Please select some item" });
      this.getSelectedItem();
      return _subjects;
    },
  },
  updated() {},
  mounted: function () {
    this.$ga.page("/portal/groups/list");
    let orgId = JSON.parse(localStorage.getItem("actualOrgId"));
    let mode = localStorage.getItem("mode");
    let schoolId = localStorage.getItem("schoolId");
    let self = this;
    // check if default view is public
    self.getRooms(orgId);
    this.getGrades().then(function () {
      for (var grade of self.grades) {
        self.gradesoptions.push({ text: grade.name, value: grade.id });
      }
    });
  },
};
</script>

<style scoped>
.card.gedf-card {
  margin-top: 24px;
}

.btnCls {
  background-color: var(--success);
  border: none;
}
.date {
}
.dateTextInput {
  background: white;
  color: #01151c;
  font-weight: bold;
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
.iconLeft :hover {
  cursor: pointer;
}
.calandarIcon :hover {
  cursor: pointer;
}
.iconRight :hover {
  cursor: pointer;
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
  color: transparent;
  display: none;
}
.sideBar {
  background: #ffffff;
}
</style>
