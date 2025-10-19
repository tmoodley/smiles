<template>
  <div>
    <b-form @submit="beforeSave" @reset="onReset" v-if="show">
      <div class="row">
        <div class="col-md-6">
          <h6 class="mt-3">Organization details</h6>
          <b-form-group
            class="mt-2"
            id="input-group-1"
            label="Name:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="$v.form.Name.$model"
              @blur="$v.form.Name.$touch()"
              type="text"
              :class="{ 'is-invalid': $v.form.Name.$error }"
              placeholder="Enter Organization Name"
            ></b-form-input>
            <div class="invalid-feedback">
              <span v-if="!$v.form.Name.required">Please enter the Name</span>
            </div>
          </b-form-group>
          <b-form-group
            class="mt-2"
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              disabled="true"
              v-model="form.EmailAddress"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="mt-2"
            id="input-group-1"
            label="Address:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="$v.form.Address1.$model"
              @blur="$v.form.Address1.$touch()"
              type="text"
              :class="{ 'is-invalid': $v.form.Address1.$error }"
              placeholder="Enter Address"
            ></b-form-input>
            <div class="invalid-feedback">
              <span v-if="!$v.form.Address1.required"
                >Please enter the Address</span
              >
            </div>
          </b-form-group>
          <b-form-group
            class="mt-2"
            id="input-group-1"
            label="City:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="$v.form.City.$model"
              @blur="$v.form.City.$touch()"
              type="text"
              :class="{ 'is-invalid': $v.form.City.$error }"
              placeholder="Enter City"
            ></b-form-input>
            <div class="invalid-feedback">
              <span v-if="!$v.form.City.required">Please enter the City</span>
            </div>
          </b-form-group>
          <b-form-group
            class="mt-2"
            id="input-group-1"
            label="State:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="$v.form.State.$model"
              @blur="$v.form.State.$touch()"
              type="text"
              :class="{ 'is-invalid': $v.form.State.$error }"
              placeholder="Enter State"
            ></b-form-input>
            <div class="invalid-feedback">
              <span v-if="!$v.form.State.required">Please enter the State</span>
            </div>
          </b-form-group>
          <b-form-group
            class="mt-2"
            id="input-group-1"
            label="Postal Code:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="$v.form.PostalCode.$model"
              @blur="$v.form.PostalCode.$touch()"
              type="text"
              :class="{ 'is-invalid': $v.form.PostalCode.$error }"
              placeholder="Enter Postal Code"
            ></b-form-input>
            <div class="invalid-feedback">
              <span v-if="!$v.form.PostalCode.required"
                >Please enter the Postal Code</span
              >
            </div>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group
            class="mt-2"
            id="input-group-1"
            label="Phone Number:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="$v.form.PhoneNumber.$model"
              @blur="$v.form.PhoneNumber.$touch()"
              type="text"
              :class="{ 'is-invalid': $v.form.PhoneNumber.$error }"
              placeholder="Enter Phone Number"
            ></b-form-input>
            <div class="invalid-feedback">
              <span v-if="!$v.form.PhoneNumber.required"
                >Please enter the Phone Number</span
              >
              <span v-if="!$v.form.PhoneNumber.numeric"
                >Please enter the Phone Number</span
              >
            </div>
          </b-form-group>
          <b-form-group
            class="mt-2"
            id="input-group-1"
            label="Default Room Topic:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="$v.form.DefaultRoomTopic.$model"
              @blur="$v.form.DefaultRoomTopic.$touch()"
              type="text"
              :class="{ 'is-invalid': $v.form.DefaultRoomTopic.$error }"
              placeholder="Enter Default Room Topic"
            ></b-form-input>
            <div class="invalid-feedback">
              <span v-if="!$v.form.DefaultRoomTopic.required"
                >Please enter Default Room Topic</span
              >
            </div>
          </b-form-group>
          <hr />
          <h6 class="mt-3">Contact person details</h6>
          <b-form-group
            class="mt-2"
            id="input-group-1"
            label="First Name:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="$v.form.ContactPersonFirstName.$model"
              @blur="$v.form.ContactPersonFirstName.$touch()"
              type="text"
              :class="{ 'is-invalid': $v.form.ContactPersonFirstName.$error }"
              placeholder="Enter First Name"
            ></b-form-input>
            <div class="invalid-feedback">
              <span v-if="!$v.form.ContactPersonFirstName.required"
                >Please enter the First Name</span
              >
            </div>
          </b-form-group>
          <b-form-group
            class="mt-2"
            id="input-group-1"
            label="Last Name:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="$v.form.ContactPersonLastName.$model"
              @blur="$v.form.ContactPersonLastName.$touch()"
              type="text"
              :class="{ 'is-invalid': $v.form.ContactPersonLastName.$error }"
              placeholder="Enter Last Name"
            ></b-form-input>
            <div class="invalid-feedback">
              <span v-if="!$v.form.ContactPersonLastName.required"
                >Please enter the Last Name</span
              >
            </div>
          </b-form-group>
        </div>
      </div>
      <b-button type="submit" variant="primary">Save</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import { required, email, numeric } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      OrganizationId: "",
      form: {
        PartnerId: "",
        AgentId: "",
        PrimarySourceMemberId: "",
        Name: "",
        EmailAddress: "",
        Address1: "",
        City: "",
        State: "",
        PostalCode: "",
        PhoneNumber: "",
        Birthday: "",
        ContactPersonFirstName: "",
        ContactPersonLastName: "",
        SubscriptionPlan: "",
        DiscountCode: "",
        BillingFrequency: "",
        BillingRate: "",
        Birthday: "",
        OrganizationId: "",
        PrimarySourceMemberId: "",
        ReferenceId: "",
        SubscriptionPlan: "",
        UserId: "",
        DefaultRoomTopic: ""
      },
      show: true
    };
  },
  validations: {
    form: {
      Name: { required },
      Address1: { required },
      City: { required },
      State: { required },
      PostalCode: { required },
      PhoneNumber: { required, numeric },
      ContactPersonFirstName: { required },
      ContactPersonLastName: { required },
      DefaultRoomTopic: { required }
    }
  },
  methods: {
    beforeSave(event) {
      this.$v.$touch();
      event.preventDefault();
      if (!this.$v.$invalid) {
        this.onSubmit(event);
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      // alert(JSON.stringify(this.form))
      return axios
        .put("/portal/api/Organization/" + this.form.UserId, this.form)
        .then(response => {
          this.getCompany(this.OrganizationId);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    ...mapActions("company", ["getCompany"])
  },
  computed: {
    ...mapState({
      store: state => state.company
    }),
    logoUrl(){ 
      return this.store.company != null ? this.store.company.logoUrl : '';
    },
  },
  mounted: function() {
    this.OrganizationId = JSON.parse(localStorage.getItem("organizationId"));

    this.getCompany(this.OrganizationId).then(() => {
      (this.form.PartnerId = this.store.company.partnerId),
        (this.form.AgentId = this.store.company.agentId);
      this.form.PrimarySourceMemberId = this.store.company.primarySourceMemberId;
      this.form.Name = this.store.company.name;
      this.form.EmailAddress = this.store.company.emailAddress;
      this.form.Address1 = this.store.company.address1;
      this.form.City = this.store.company.city;
      this.form.State = this.store.company.state;
      this.form.PostalCode = this.store.company.postalCode;
      this.form.PhoneNumber = this.store.company.phoneNumber;
      this.form.Birthday = this.store.company.birthday;
      this.form.ContactPersonFirstName = this.store.company.contactPersonFirstName;
      this.form.ContactPersonLastName = this.store.company.contactPersonLastName;
      this.form.SubscriptionPlan = this.store.company.subscriptionPlan;
      this.form.DiscountCode = this.store.company.discountCode;
      this.form.SubscriptionPlan = this.store.company.subscriptionPlan;
      this.form.DiscountCode = this.store.company.discountCode;
      this.form.BillingFrequency = this.store.company.billingFrequency;
      this.form.BillingRate = this.store.company.billingRate;
      this.form.Birthday = this.store.company.birthday;
      this.form.OrganizationId = this.store.company.organizationId;
      this.form.PrimarySourceMemberId = this.store.company.primarySourceMemberId;
      this.form.ReferenceId = this.store.company.referenceId;
      this.form.SubscriptionPlan = this.store.company.subscriptionPlan;
      this.form.UserId = this.store.company.userId;
      this.form.DefaultRoomTopic = this.store.company.defaultRoomTopic;
    });
  },
  created: function() {}
};
</script>
