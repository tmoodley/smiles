<template>
  <b-modal
    id="modal-find-handle"
    ref="modal"
    size="xl"
    title="Search For User2"
    hide-footer
  >
    <b-container fluid style="padding:34px">
      <b-row>
        <b-col cols="5" sm="12" md="3" lg="3" xl="5">
          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="2"
            label-cols-lg="4"
            content-cols-sm
            content-cols-lg="8"
            description="Find User by name."
            label="Search by name"
            label-for="input-horizontal"
          >
            <b-form-input
              v-model="name"
              id="input-horizontal"
              @focus="email = ''"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="5" sm="12" md="3" lg="3" xl="5">
          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="2"
            label-cols-lg="4"
            content-cols-sm
            content-cols-lg="8"
            description="Find User by email."
            label="Search by email"
            label-for="input-horizontal"
          >
            <b-form-input
              v-model="email"
              id="input-horizontal"
              @focus="name = ''"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="2" sm="12" md="3" lg="3" xl="2">
          <b-button variant="success" @click="search">Search</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="9" sm="12" md="9" lg="9" xl="9">
          <DynamicScroller
            class="scroller"
            :items="users"
            :min-item-size="150"
            style="height: 800px; overflow-y: auto;"
            :emitResize="true"
            :prerender="10"
            key-field="organizationId"
          >
            <template v-slot="{ item, index, active }">
              <DynamicScrollerItem :item="item" :active="active">
                <user :user="item"></user>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
        </b-col>
        <b-col cols="3" sm="12" md="3" lg="3" xl="3">
          <div class="card gedf-card">
            <div class="card-body">
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
              </p>
            </div>
          </div>
        </b-col>
      </b-row>
      <profile></profile>
    </b-container>
  </b-modal>
</template>
<script>
import profile from "components/profile/profilemodal.vue";
import user from "./user.vue";
import { mapState, mapActions } from "vuex";
var moment = require("moment");
export default {
  components: {
    user,
    profile
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
        { text: "Female", value: "f" }
      ]
    };
  },
  methods: {
    ...mapActions("company", [
      "getUsers",
      "getUsersByFilter",
      "filterUserGender",
      "filterUserByEmail",
      "filterUserByName"
    ]),
    ...mapActions("posts", ["getSubjects", "saveSubject"]),
    getPartnerList() {
      this.getTutors();
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
          subjectId: this.selectedSubject
        };
        this.filterUserGender(payload);
      } else {
        this.getUsersByFilter(this.selectedSubject);
      }
    },
    onChange() {
      this.getUsersByFilter(this.selectedSubject);
    }
  },
  computed: {
    ...mapState({
      users: state => state.company.users
    }),
    ...mapState({
      genders: state => state.company.genders
    }),
    ...mapState({
      subjects: State => State.posts.subjects
    }),
    ...mapState({
      subject: State => State.posts.subject
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
  },
  mounted: function() {
    this.$ga.page("/portal/tutors/list");
    var self = this;
    if (this.subjects.length == 0) {
      this.getSubjects().then(function() {
        if (self.subject != "") {
          self.setSubject(self.subject);
          self.getUsersByFilter(self.subject.id);
          self.selectedSubject = self.subject.id;
        } else {
          self.setSubject(self.subjects[0]);
          self.getUsersByFilter(self.subjects[0].id);
          self.selectedSubject = self.subjects[0].id;
        }
      });
    } else {
      this.selectedSubject = this.subjects[0].id;
    }
  }
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
