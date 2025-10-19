<template>
  <b-container fluid style="padding: 34px">
    <b-row>
      <b-col class="mt-3" sm="12" md="9" lg="9">
        <DynamicScroller
          class="scroller"
          :items="friends"
          :min-item-size="150"
          style="height: 800px; overflow-y: auto"
          :emitResize="true"
          :prerender="10"
          key-field="organizationId"
        >
          <template v-slot="{ item, index, active }">
            <DynamicScrollerItem :key="index" :item="item" :active="active">
              <user class="mr" :user="item"></user>
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </b-col>
      <b-col >
         <div class="card gedf-card">
          <div class="card-body">
        <b-col>
          <b-form-group
            id="fieldset-horizontal"
            description="Find User by name."
            label="Search by name"
            label-for="input-horizontal"
          >
            <b-form-input
              v-model="name"
              id="input-horizontal"
              @focus="email = ''"
              v-on:keydown.enter="search"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col >
          <b-form-group
            id="fieldset-horizontal"
            description="Find User by email."
            label="Search by emailss"
            label-for="input-horizontal"
          >
            <b-form-input
              v-model="email"
              id="input-horizontal"
              @focus="name = ''"
              v-on:keydown.enter="search"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col >
          <b-button block variant="primary" @click="search">Search</b-button>
        </b-col>
       
            <h5 class="card-title">Filter</h5>
            <h6 class="card-subtitle mb-2 text-muted">Subjects</h6>
            <p class="card-text">
              <b-form-group label="Gender" v-slot="{ ariaDescribedby }">
                <b-form-checkbox
                  v-for="option in options"
                  v-model="selected"
                  :key="option.value"
                  :value="option.value"
                  :aria-describedby="ariaDescribedby"
                  name="flavour-4a"
                  @input="onClick"
                  inline
                >
                  {{ option.text }}
                </b-form-checkbox>
              </b-form-group>
              <b-form-select
                v-model="selectedSubject"
                @change="onChange()"
                :options="subjectsList"
              ></b-form-select>
              <b-button
                block
                variant="primary"
                @click="onGetAllFriends()"
                class="mt-4"
                >All Friends</b-button
              >
            </p>
          </div>
        </div>
      </b-col>
    </b-row>
    <profile></profile>
  </b-container>
</template>
<script>
import profile from "components/profile/profilemodal.vue";
import user from "./user.vue";
import { mapState, mapActions } from "vuex";
var moment = require("moment");
export default {
  components: {
    user,
    profile,
  },
  data() {
    return {
      selectedSubject: "",
      gapi: null,
      selected: ["m", "f"],
      name: "",
      email: "",
      options: [
        { text: "Male", value: "m" },
        { text: "Female", value: "f" },
      ],
    };
  },
  methods: {
    ...mapActions("posts", ["getSubjects"]),
    ...mapActions("friend", [
      "getFriends",
      "getFriendRequests",
      "getFriendSuggestions",
      "getUsers",
      "getUsersByFilter",
      "filterUserGender",
      "filterUserByEmail",
      "filterUserByName",
    ]),
    getPartnerList() {
      this.getTutors();
    },
    onGetAllFriends() {
      this.getFriends(JSON.parse(localStorage.getItem("actualOrgId")));
    },
    onGetFriendRequests() {
      this.getFriendRequests(JSON.parse(localStorage.getItem("actualOrgId")));
    },
    onGetFriendSuggestions() {
      this.getFriendSuggestions(
        JSON.parse(localStorage.getItem("actualOrgId"))
      );
    },
    search(event) {
      event.preventDefault();
      if (this.email != "") {
        this.filterUserByEmail(this.email);
      }
      if (this.name != "") {
        this.filterUserByName(this.name);
      }
    },
    setSubject(subject) {
      this.saveSubject(subject);
      this.getUsersByFilter(subject.id);
    },
    onClick(evt) {
      if (evt == [2]) {
        this.getUsersByFilter(this.selectedSubject);
      } else if (evt == "m" || evt == "f") {
        var payload = {
          gender: evt,
          subjectId: this.selectedSubject,
        };
        this.filterUserGender(payload);
      } else {
        this.getUsersByFilter(this.selectedSubject);
      }
    },
    onChange() {
      this.getUsersByFilter(this.selectedSubject);
    },
  },
  computed: {
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
      friendRequests: (State) => State.friend.friendRequests,
    }),
    ...mapState({
      friends: (State) => {
        //filter here own user from friend list
        // this is temporary solution , actual solution is to fix this on api level
        var userId = JSON.parse(localStorage.getItem("organizationId"));
        return State.friend.searchResults.filter(
          (item) => item.customerId !== userId
        );
      },
    }),
    subjectsList() {
      var _subjects = this.subjects.map(function (item) {
        return {
          value: item.id,
          text: item.name,
        };
      });
      _subjects.unshift({ value: null, text: "Please select a subject" });
      return _subjects;
    },
  },
  mounted: function () {
    this.$ga.page("/portal/friends/list");
    this.getFriends(JSON.parse(localStorage.getItem("actualOrgId")));
    this.getSubjects();
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
.mr {
  margin-right: 20px;
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
