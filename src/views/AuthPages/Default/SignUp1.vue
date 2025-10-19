<template>
  <div>
    <h1 class="mb-0">Sign Up</h1>
    <p>Enter your email address and password to access admin panel.</p>
    <b-form role="form" @submit.prevent="onSubmit">
      <b-row>
        <b-col>
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              type="text"
              class="form-control mb-0"
              id="firstName"
              placeholder="First Name"
              :rules="{ required: true }"
              v-model="model.contactPersonFirstName"
            />
          </div>
        </b-col>
        <b-col>
          <div class="form-group">
            <label for="firstName">MI (Optional)</label>
            <input
              type="text"
              class="form-control mb-0"
              id="firstName"
              placeholder="First Name"
              :rules="{ required: true }"
              v-model="model.contactPersonFirstName"
            />
          </div>
        </b-col>
        <b-col>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              type="text"
              class="form-control mb-0"
              id="lastName"
              placeholder="Last Name"
              :rules="{ required: true }"
              v-model="model.contactPersonLastName"
            />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Gender" v-slot="{ ariaDescribedby }">
            <b-form-radio
              v-model="model.gender"
              :aria-describedby="ariaDescribedby"
              name="male"
              value="M"
              >Male</b-form-radio
            >
            <b-form-radio
              v-model="model.gender"
              :aria-describedby="ariaDescribedby"
              name="female"
              value="F"
              >Female</b-form-radio
            >
            <b-form-radio
              v-model="model.gender"
              :aria-describedby="ariaDescribedby"
              name="other"
              value="O"
              >I'd rather not say</b-form-radio
            >
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div>
            <label for="dob">Date Of Birth</label>
            <b-form-datepicker
              id="dob"
              v-model="model.dateOfBirth"
              class="mb-2"
            ></b-form-datepicker>
          </div>
        </b-col>
        <b-col>
          <div>
            <label for="dob">Confirm Date Of Birtth</label>
            <b-form-datepicker
              id="dob"
              v-model="model.confirmDateOfBirth"
              class="mb-2"
            ></b-form-datepicker>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>Address and Phone</b-col>
      </b-row>

      <b-row>
        <b-col>
          <div class="form-group">
            <label for="street">Street, PO Box</label>
            <input
              type="text"
              class="form-control mb-0"
              id="street"
              placeholder="Street"
              :rules="{ required: true }"
              v-model="model.street"
            />
          </div>
        </b-col>
        <b-col>
          <div class="form-group">
            <label for="apartment">Apartment, Suite, Floor (Optional)</label>
            <input
              type="text"
              class="form-control mb-0"
              id="apartment"
              placeholder="Apartment, Suite, Floor"
              :rules="{ required: true }"
              v-model="model.apartment"
            />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="form-group">
            <label for="city">City</label>
            <input
              type="text"
              class="form-control mb-0"
              id="city"
              placeholder="City"
              :rules="{ required: true }"
              v-model="model.city"
            />
          </div>
        </b-col>
        <b-col>
          <div class="form-group">
            <label for="state">State</label>
            <input
              type="text"
              class="form-control mb-0"
              id="state"
              placeholder="State"
              :rules="{ required: true }"
              v-model="model.contactPersonLastName"
            />
          </div>
        </b-col>
        <b-col>
          <div class="form-group">
            <label for="zip">ZIP Code</label>
            <input
              type="text"
              class="form-control mb-0"
              id="zip"
              placeholder="Zip"
              :rules="{ required: true }"
              v-model="model.zip"
            />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input
              type="text"
              class="form-control mb-0"
              id="phone"
              placeholder="Phone"
              :rules="{ required: true }"
              v-model="model.phone"
            />
          </div>
        </b-col>
        <b-col>
          <div class="form-group">
            <label for="phoneType">Type</label>
            <input
              type="text"
              class="form-control mb-0"
              id="phoneType"
              placeholder="Last Name"
              :rules="{ required: true }"
              v-model="model.phoneType"
            />
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>

      <b-row>
        <b-col>Log In and Identity Verification</b-col>
      </b-row>

      <b-row>
        <b-col>
          <div class="form-group">
            <label for="Email">Email address</label>
            <input
              type="email"
              class="form-control mb-0"
              placeholder="Email"
              name="Email"
              :rules="{ required: true, email: true }"
              v-model="model.emailAddress"
            />
          </div>
        </b-col>
        <b-col>
          <div class="form-group">
            <label for="ConfirmEmail">Confirm Email address</label>
            <input
              type="email"
              class="form-control mb-0"
              placeholder="Confirm Email"
              name="ConfirmEmail"
              :rules="{ required: true, email: true }"
              v-model="model.confirmEmailAddress"
            />
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div class="form-group">
            <label for="Password">Password</label>
            <input
              type="password"
              class="form-control mb-0"
              placeholder="password"
              name="Password"
              :rules="{ required: true, min: 6 }"
              v-model="model.password"
            />
          </div>
        </b-col>
        <b-col>
          <div class="form-group">
            <label for="Confirmpassword">Confirm Password</label>
            <input
              type="password"
              class="form-control mb-0"
              placeholder="password"
              name="Confirmpassword"
              :rules="{ required: true, min: 6 }"
              v-model="model.confirmPassword"
            />
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>Authorization</b-col>
      </b-row>

      <b-row>
        <b-col>
          <div class="d-inline-block w-100">
            <div
              class="custom-control custom-checkbox d-inline-block mt-2 pt-1"
            >
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheck1"
              />
              <label class="custom-control-label" for="customCheck1"
                >I accept
                <a href="https://knowtoo.com/terms"
                  >Terms and Conditions</a
                ></label
              >
            </div>
            <div>
              <p>
                By providing my information and clicking the Create Account
                button, I agree that Labcorp and /its affiliates may send me
                informational messages including by telephone and text message.
                You can reply STOP to cancel future texts or HELP if you need
                assistance. Messaging and data rates may apply. Text message
                frequency will vary. For more information view our
                <a href="https://knowtoo.com/terms">Terms and Conditions</a> and
                Privacy Policy.
              </p>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary mt-4">
                Create account
              </button>
            </div>
          </div>
        </b-col>
      </b-row>

      <div class="sign-info">
        <span class="dark-color d-inline-block line-height-2"
          >Already Have Account ?
          <router-link :to="{ name: 'login' }">Log In</router-link></span
        >
        <!-- <ul class="iq-social-media">
          <li><a href="#"><i class="ri-facebook-box-line"></i></a></li>
          <li><a href="#"><i class="ri-twitter-line"></i></a></li>
          <li><a href="#"><i class="ri-instagram-line"></i></a></li>
        </ul> -->
      </div>
    </b-form>
  </div>
</template>
<script>
export default {
  name: "SignUp1",
  data() {
    return {
      model: {
        contactPersonFirstName: "",
        contactPersonLastName: "",
        emailAddress: "",
        password: "",
        agree: false,
        gender: "",
        dateOfBirth: "",
        confirmDateOfBirth: "",
        street: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        phoneType: "",
        confirmEmail: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    onSubmit(e) {
      this.loading = true;
      this.submitted = true;
      const { dispatch } = this.$store;
      let self = this;

      if (this.model.emailAddress && this.model.password) {
        dispatch("authentication/register", self.model).then(function(evt) {
          if (evt) {
            self.$router.push("/survey");
          } else {
            self.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="">Please check your username and password.</a>'
            });
          }
          self.loading = false;
        });
      }
    }
  }
};
</script>
<style>
body.light {
    background: #00adef !important;
}
</style>