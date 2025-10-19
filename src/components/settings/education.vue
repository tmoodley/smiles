<template>
  <div>
    <b-container class="pb-6 pb-8 pt-2 pt-md-8 bg-gradient-success">
      <b-row no-gutters>
        <b-col>
          <p class="no-padding-margin heading text-white">Education</p>
          <p class="no-padding-margin sub-title text-white">
            Edit your Education here (this will display on your profile)
          </p>
        </b-col>
        <b-col offset-xl="6" md="4" lg="3" xl="2" class="mt-3">
          <b-button
            pill
            block
            variant="primary"
            @click="$bvModal.show('bv-modal-education')"
            >Add University</b-button
          >
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="mt--7 pb-8">
      <b-row no-gutters> </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-table
            outlined
            responsive
            head-variant="light"
            :items="items"
            :fields="fields"
          >
            <template v-slot:cell(actions)="row">
              <b-dropdown variant="white" no-caret style="margin-top: -7px;">
                <template v-slot:button-content>
                  <b-icon
                    style="font-size:100%"
                    icon="three-dots-vertical"
                  ></b-icon>
                </template>
                <b-dropdown-item class="dropdown" @click="remove(row.item)"
                  ><span style="color:#FF7F7F">Remove</span></b-dropdown-item
                >
                <b-dropdown-item
                  class="dropdown"
                  v-if="row.item.document != null"
                  target="self"
                  :href="row.item.document.name"
                  ><span style="color:#FF7F7F"
                    >Download Credentials</span
                  ></b-dropdown-item
                >
              </b-dropdown>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-modal
        id="bv-modal-education"
        ref="modal"
        title="Add Education"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Educational Institution"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-input
              id="name-input"
              v-model="form.name"
              placeholder="Enter your school name"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Degree"
            label-for="textarea-lazy"
            :state="degreeState"
            invalid-feedback="Degree is required"
            class="mb-0"
          >
            <b-form-input
              id="degree-input"
              v-model="form.degree"
              placeholder="Enter your degree"
              required
              :state="degreeState"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Start Year"
            label-for="textarea-lazy"
            :state="startYearState"
            invalid-feedback="Start Year is required"
            class="mb-0"
          >
            <b-form-datepicker
              id="startYear-datepicker"
              v-model="form.startYear"
              :state="startYearState"
              required
              class="mb-2"
            ></b-form-datepicker>
          </b-form-group>
          <b-form-group
            label="End Year (or expected)"
            label-for="textarea-lazy"
            :state="endYearState"
            invalid-feedback="End Year is required"
            class="mb-0"
          >
            <b-form-datepicker
              id="endYear-datepicker"
              v-model="form.endYear"
              :state="endYearState"
              required
              class="mb-2"
            ></b-form-datepicker>
          </b-form-group>
          <document @setid="setDocumentId"></document>
        </form>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import document from "components/shared/document.vue";
import { mapActions, mapState } from "vuex";
import {
  BIcon,
  BIconEnvelope,
  BIconThreeDotsVertical,
  BIconChevronDown,
  BIconChevronUp
} from "bootstrap-vue";
import { required, numeric, email } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  components: {
    BIcon,
    BIconEnvelope,
    BIconThreeDotsVertical,
    BIconChevronDown,
    BIconChevronUp,
    document
  },
  data() {
    return {
      partnerobject: null,
      dropDownIconToggale: false,
      form: {
        name: "",
        degree: "",
        startYear: "",
        endYear: "",
        documentId: ""
      },
      loggedInUser: JSON.parse(localStorage.getItem("org")),
      orgEmail: JSON.parse(localStorage.getItem("organizationEmail")),
      OrganizationId: JSON.parse(localStorage.getItem("organizationId")),
      validations: {
        isEmail: false,
        GivenName: false,
        FamilyName: false,
        isValid: true
      },
      users: [
        {
          EmailAddress: "",
          GivenName: "",
          FamilyName: "",
          Role: "Partner",
          OrganizationId: JSON.parse(localStorage.getItem("organizationId")),
          validations: {
            isEmail: false,
            isEmailDuplicate: false,
            GivenName: false,
            FamilyName: false,
            isValid: true
          }
        }
      ],
      loading: false,
      nameState: null,
      degreeState: null,
      startYearState: null,
      endYearState: null,
      fields: [
        {
          key: "name",
          label: "Educational Institution",
          thClass: "tbHeadingClass",
          tdClass: "tbBodyClass"
        },
        {
          key: "degree",
          label: "Degree",
          thClass: "tbHeadingClass",
          tdClass: "tbBodyClass"
        },
        {
          key: "startYear",
          label: "Start Year",
          thClass: "tbHeadingClass",
          tdClass: "tbBodyClass"
        },
        {
          key: "endYear",
          label: "End Year (or expected)",
          thClass: "tbHeadingClass",
          tdClass: "tbBodyClass"
        },
        {
          key: "actions",
          label: "Actions"
        }
      ]
    };
  },
  validations: {},
  methods: {
    setDocumentId(id) {
      this.form.documentId = id;
    },
    ...mapActions("company", ["getCompany", "updateCompany"]),
    ...mapActions("partner", ["getPartner"]),
    remove(item) {
      return axios.delete("/api/Educations/" + item.id).then(response => {
        this.getCompany(JSON.parse(localStorage.getItem("organizationId")));
      });
    },
    checkFormValidity() {
      let valid = this.$refs.form.checkValidity();
      this.startYearState = this.form.startYear != "";
      this.endYearState = this.form.endYear != "";
      this.nameState = valid;
      this.degreeState = valid;

      if (valid && this.startYearState && this.endYearState) {
        valid = true;
      } else {
        valid = false;
      }

      return valid;
    },
    resetModal() {
      this.form = {
        name: "",
        degree: "",
        startYear: "",
        endYear: ""
      };
      this.nameState = null;
      this.degreeState = null;
      this.startYearState = null;
      this.endYearState = null;
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

      this.form.organizationId = JSON.parse(
        localStorage.getItem("actualOrgId")
      );
      return axios.post("/api/Educations/", this.form).then(response => {
        self.getCompany(JSON.parse(localStorage.getItem("organizationId")));
        // Hide the modal manually
        self.$bvModal.hide("bv-modal-education");
      });
    }
  },
  computed: {
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
    ...mapState({
      store: state => state.company
    }),
    items() {
      if (this.store.company.educations != null) {
        return this.store.company.educations;
      } else {
        return [];
      }
    },
    popoverConfig() {
      return {
        html: true,
        title: () => {
          return "<b>User Role Details:</b>";
        },
        content: () => {
          return "Super Admin:<br> <em>All User previlages, plus the ability to administrate organization. </em> <br><br> Coordinator:<br> <em>All User previlages, plus the ability to manage appointments and reports for others. </em> <br><br>User:<br><em>Users can manage their own appointments and reports, and update their personal profile. </em>";
        }
      };
    }
  },
  mounted: function() {
    this.$ga.page("/portal/education");
    this.OrganizationId = JSON.parse(localStorage.getItem("organizationId"));
  }
};
</script>

<style scoped>
.no-padding-margin {
  padding: 0px !important;
  margin: 0px !important;
  padding-left: 0px !important;
}

.heading {
  color: #01151c;
  font-size: 30px;
  font-weight: bold;
}

.sub-title {
  color: #576367;
  font-size: 13px;
  font-weight: bold;
}
</style>
 