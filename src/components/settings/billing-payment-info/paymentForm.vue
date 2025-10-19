<template> 
<!-- Modal -->
  <b-modal id="payment-info" hide-footer button-size="lg">
    <template #modal-title> Payment Information </template>
        <b-row class="mt-3">
          <div>
            <div id="sq-ccbox">
              <form id="nonce-form" novalidate action="/portal/api/Card/" method="post">
                <div class="errorbox">
                  <ul class="error" v-for="error in errors" :key=error.message>
                    <li>{{error}}</li>
                  </ul>
                </div>
                <div id="card-tainer">
                  <b-row class="mt-2 ml-3">
                  <b-col>
                    <p>Credit or debit card number</p>
                    <div class="cardfields card-number" id="sq-card-number"></div>
                  </b-col>
                  </b-row>
                  <b-row class="mt-2 ml-3">
                    <b-col lg="4" xl="4">
                      <p>Expiration</p>
                      <div class="cardfields expiration-date" id="sq-expiration-date"></div>
                    </b-col>
                    <b-col lg="3" xl="3">
                      <p>CVV</p>
                      <div class="cardfields cvv" id="sq-cvv"></div>
                    </b-col>
                  </b-row>
                  <b-row class="mt-2 ml-3">
                    <b-col>
                      <p>Zip Code</p>
                      <div class="cardfields postal-code" id="sq-postal-code"></div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-group id="input-group-1" label="Address line 1*" label-for="input-1" style="color:#546064" :class="{invalid: $v.form.BillingAddress1.$error}">
                        <b-form-input id="input-1" v-model="$v.form.BillingAddress1.$model" @blur="$v.form.BillingAddress1.$touch()" :class="{'is-invalid':$v.form.BillingAddress1.$error}" type="text" placeholder="Enter Address Line 1" style="color:#01151C;font-weight:bold"></b-form-input>
                        <div class="invalid-feedback">
                          <span v-if="!$v.form.BillingAddress1.required">Please enter the address line 1</span>
                        </div>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group id="input-group-2" label="Address line 2(Optional)" label-for="input-1" style="color:#546064">
                        <b-form-input id="input-1" v-model="form.BillingAddress2" type="text" placeholder="Address line 2 (optional)" style="color:#01151C;font-weight:bold"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group id="input-group-3" label="City" label-for="input-1" style="color:#546064" :class="{invalid: $v.form.BillingCity.$error}">
                        <b-form-input id="input-1" v-model="$v.form.BillingCity.$model" @blur="$v.form.BillingCity.$touch()" :class="{'is-invalid':$v.form.BillingCity.$error}" type="text" placeholder="Enter City" style="color:#01151C;font-weight:bold"></b-form-input>
                        <div class="invalid-feedback">
                          <span v-if="!$v.form.BillingCity.required">Please enter the city</span>
                        </div>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group id="input-group-4" label="State" label-for="input-1" style="color:#546064" :class="{invalid: $v.form.BillingState.$error}">
                        <b-form-input id="input-1" v-model="$v.form.BillingState.$model" @blur="$v.form.BillingState.$touch()" :class="{'is-invalid':$v.form.BillingState.$error}" type="text" placeholder="State" style="color:#01151C;font-weight:bold"></b-form-input>
                        <div class="invalid-feedback">
                          <span v-if="!$v.form.BillingState.required">Please enter the state</span>
                        </div>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group id="input-group-5" label="Zipcode" label-for="input-1" style="color:#546064" :class="{invalid: $v.form.BillingPostalCode.$error}">
                        <b-form-input id="input-1" v-model="$v.form.BillingPostalCode.$model" @blur="$v.form.BillingPostalCode.$touch()" :class="{'is-invalid':$v.form.BillingPostalCode.$error}" type="text" placeholder="Zipcode" style="color:#01151C;font-weight:bold"></b-form-input>
                        <div class="invalid-feedback">
                          <span v-if="!$v.form.BillingPostalCode.required">Please enter the zipcode</span>
                        </div>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group label="" label-for="ratio" label-cols-md="auto" class="mb-3">
                        <b-form-select id="ratio" v-model="selected" style="font-size:15px; font-weight:bold; color:#01151C" :options="countries"></b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row class="mt-2 ml-3 mb-3"> 
                    <button :disabled="loading" @click="onGetCardNonce($event)" class="btn btn-primary mr-2">
                        Save
                      <img v-show="loading" style="color:white;" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    </button>
                    <button @click="Cancel()" class="btn iq-bg-danger">Cancel</button> 
                  </b-row>
                </div>

                <input type="hidden" id="card-nonce" name="nonce">
                <input type="hidden" id="customerId" name="customerId" v-model="referenceId" />
                <input type="hidden" id="addressLine1" name="addressLine1" />
                <input type="hidden" id="addressLine2" name="addressLine2" />
                <input type="hidden" id="city" name="city" />
                <input type="hidden" id="state" name="state" />
                <input type="hidden" id="country" name="country" />
                <input type="hidden" id="zipcode" name="zipcode" />
              </form>
            </div>
          </div>
        </b-row>  
  </b-modal>
</template>

<script>
import { required, numeric, email } from 'vuelidate/lib/validators'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'paymentForm',
  props: {
    showPaymentForm: Boolean,
    id: Number
  },
  data: function () {
    return {
      nonce: '',
      usePersonalAddress: true,
      countries: [],
      selected: null,
      form: {
        PartnerId: '',
        AgentId: '',
        PrimarySourceMemberId: '',
        Name: '',
        EmailAddress: '',
        Address1: '',
        City: '',
        State: '',
        PostalCode: '',
        PhoneNumber: '',
        Birthday: '',
        ContactPersonFirstName: '',
        ContactPersonLastName: '',
        SubscriptionPlan: '',
        DiscountCode: '',
        BillingFrequency: '',
        BillingRate: '',
        Birthday: '',
        OrganizationId: '',
        PrimarySourceMemberId: '',
        ReferenceId: '',
        SubscriptionPlan: '',
        UserId: '',
        DefaultRoomTopic: '',
        WaitRoomHeadline: '',
        WaitRoomPhone: '',
        WaitRoomLocation: '',
        WaitRoomBio: '',
        Description: '',
        Address2: '',
        Country: '',
        BillingAddress1: '',
        BillingCity: '',
        BillingState: '',
        BillingPostalCode: '',
        BillingAddress2: '',
        BillingCountry: ''
      },
      errors: [],
      referenceId: '',
      loading: false
    }
  },
  validations: {
    form: {
      PartnerId: { required },
      BillingAddress1: { required },
      BillingCity: { required },
      BillingState: { required },
      BillingPostalCode: { required },
      BillingCountry: { required }
    }
  },
  watch: {
    // showPaymentForm: function() {
    //  if (!this.showPaymentForm) {
    //    return 1;
    //  }
    //  this.paymentForm.build();
    // }
  },
  methods: {
    ...mapActions('company', [
      'getCompany',
      'updateCompany'
    ]),
    updateCountry () {
      var _company = { ...this.store.company }
      _company.countryId = this.selected
      this.updateCompany(_company)
    },
    getCountries: function () {
      axios
        .get('/api/Countries')
        .then(response => {
          this.countries = response.data.map(function (country) {
            return {
              value: country.id,
              text: country.name
            }
          })
        })
    },
    Cancel () {
      this.$bvModal.hide('payment-info')
    },
    updateAddress () {
      document.getElementById('addressLine1').value = this.form.Address1
      document.getElementById('addressLine2').value = this.form.Address2
      document.getElementById('city').value = this.form.City
      document.getElementById('state').value = this.form.State
      document.getElementById('country').value = this.form.Country
      document.getElementById('zipcode').value = this.form.PostalCode

      if (!this.$v.$invalid) {
        let formData = new FormData()
        formData.append('nonce', this.nonce)
        formData.append('customerId', document.getElementById('customerId').value)
        formData.append('addressLine1', this.form.BillingAddress1)
        formData.append('addressLine2', this.form.BillingAddress2)
        formData.append('city', this.form.BillingCity)
        formData.append('state', this.form.BillingState)
        formData.append('country', this.form.BillingCountry)
        formData.append('zipcode', this.form.BillingPostalCode)

        this.loading = true

        axios.put('/portal/api/Card',
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((response) => {
          axios
            .put('/portal/api/Organization/' + this.form.UserId, this.form)
            .then(response => {
              this.loading = false
              this.$bvModal.hide('payment-info')
            })
        }).catch((error) => {
          this.loading = false
          this.errors = []
          this.errors.push('Please enter a valid zipcode')
        })
      }
    },
    onGetCardNonce (event) {
      // Don't submit the form until SqPaymentForm returns with a nonce
      event.preventDefault()
      this.paymentForm.requestCardNonce()
    },
    userPersonalAddress () {
      if (this.usePersonalAddress == true) {
        this.form.BillingAddress1 = this.store.company.address1
        this.form.BillingAddress2 = this.store.company.address2
        this.form.BillingCity = this.store.company.city
        this.form.BillingState = this.store.company.state
        this.form.BillingPostalCode = this.store.company.postalCode
        this.form.BillingCountry = this.store.company.country
      } else {
        this.form.BillingAddress1 = ''
        this.form.BillingAddress2 = ''
        this.form.BillingCity = ''
        this.form.BillingState = ''
        this.form.BillingPostalCode = ''
        this.form.BillingCountry = ''
      }
    }
  },
  computed: {
    ...mapState({
      store: state => state.company
    })
  },
  mounted: function () {
    this.OrganizationId = JSON.parse(localStorage.getItem('userId'))

    this.getCompany(this.OrganizationId).then(() => {
      this.usePersonalAddress = true
      this.form.PartnerId = this.store.company.partnerId,
      this.form.AgentId = this.store.company.agentId
      this.form.PrimarySourceMemberId = this.store.company.primarySourceMemberId
      this.form.Name = this.store.company.name
      this.form.EmailAddress = this.store.company.emailAddress
      this.form.Address1 = this.store.company.address1
      this.form.City = this.store.company.city
      this.form.State = this.store.company.state
      this.form.PostalCode = this.store.company.postalCode
      this.form.PhoneNumber = this.store.company.phoneNumber
      this.form.Birthday = this.store.company.birthday
      this.form.ContactPersonFirstName = this.store.company.contactPersonFirstName
      this.form.ContactPersonLastName = this.store.company.contactPersonLastName
      this.form.SubscriptionPlan = this.store.company.subscriptionPlan
      this.form.DiscountCode = this.store.company.discountCode
      this.form.SubscriptionPlan = this.store.company.subscriptionPlan
      this.form.DiscountCode = this.store.company.discountCode
      this.form.BillingFrequency = this.store.company.billingFrequency
      this.form.BillingRate = this.store.company.billingRate
      this.form.Birthday = this.store.company.birthday
      this.form.OrganizationId = this.store.company.organizationId
      this.form.PrimarySourceMemberId = this.store.company.primarySourceMemberId
      this.form.ReferenceId = this.store.company.referenceId
      this.form.SubscriptionPlan = this.store.company.subscriptionPlan
      this.form.UserId = this.store.company.userId
      this.form.DefaultRoomTopic = this.store.company.defaultRoomTopic
      this.form.WaitRoomHeadline = this.store.company.waitRoomHeadline
      this.form.WaitRoomLocation = this.store.company.waitRoomLocation
      this.form.WaitRoomPhone = this.store.company.waitRoomPhone
      this.form.WaitRoomBio = this.store.company.waitRoomBio
      this.form.Description = this.store.company.description
      this.form.Address2 = this.store.company.address2
      this.selected = this.store.company.countryId
      this.getCountries()

      if (this.store.company.billingAddress1 == null || this.store.company.billingAddress1 == '') {
        this.form.BillingAddress1 = this.store.company.address1
        this.form.BillingCity = this.store.company.city
        this.form.BillingState = this.store.company.state
        this.form.BillingPostalCode = this.store.company.postalCode
        this.form.BillingAddress2 = this.store.company.address2
        this.form.BillingCountry = this.store.company.country
      } else {
        this.form.BillingAddress1 = this.store.company.billingAddress1
        this.form.BillingCity = this.store.company.billingCity
        this.form.BillingState = this.store.company.billingState
        this.form.BillingPostalCode = this.store.company.billingPostalCode
        this.form.BillingAddress2 = this.store.company.billingAddress2
        this.form.BillingCountry = this.store.company.billingCountry
      }
    })

    let locationId = JSON.parse(localStorage.getItem('locationId'))
    let applicationId = JSON.parse(localStorage.getItem('applicationId'))
    this.referenceId = JSON.parse(localStorage.getItem('referenceId'))
    let that = this

    document.getElementById('addressLine1').value = this.form.BillingAddress1
    document.getElementById('addressLine2').value = this.form.BillingAddress2
    document.getElementById('city').value = this.form.BillingCity
    document.getElementById('state').value = this.form.BillingState
    document.getElementById('country').value = this.form.BillingCountry
    document.getElementById('zipcode').value = this.form.BillingPostalCode

    this.paymentForm = new SqPaymentForm({
      applicationId: applicationId,
      locationId: locationId,
      inputClass: 'sq-input',
      // Initialize the payment form elements

      // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [{
        // backgroundColor: 'transparent',
        // color: '#333333',
        // fontFamily: '"Helvetica Neue", "Helvetica", sans-serif',
        // fontSize: '16px',
        // fontWeight: '400',
        // placeholderColor: '#8594A7',
        // placeholderFontWeight: '400',
        // padding: '16px',
        // _webkitFontSmoothing: 'antialiased',
        // _mozOsxFontSmoothing: 'grayscale'

      }],

      // Initialize the credit card placeholders
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: 'Card number'
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: 'Zip Code'
      },
      cardHolderName: {
        elementId: 'sq-cardholdername',
        placeholder: 'Cardholder Name'
      },

      // SqPaymentForm callback functions
      callbacks: {
        /*
             * callback function: methodsSupported
             * Triggered when: the page is loaded.
             */
        paymentFormLoaded: function () {
          console.log('paymentFormLoaded')
          /* HANDLE AS DESIRED */
          document.getElementById('name').style.display = 'inline-flex'
        },

        methodsSupported: function (methods) {
          // Only show the button if Apple Pay for Web is enabled
          // Otherwise, display the wallet not enabled message.
        },

        createPaymentRequest: function () {
          return {
            requestBillingInfo: true
          }
        },

        // createPaymentRequest: function() {
        //  var paymentRequestJson;
        //  /* ADD CODE TO SET/CREATE paymentRequestJson */
        //  return paymentRequestJson;
        // },

        validateShippingContact: function (contact) {
          var validationErrorObj
          /* ADD CODE TO SET validationErrorObj IF ERRORS ARE FOUND */
          return validationErrorObj
        },

        /*
             * callback function: cardNonceResponseReceived
             * Triggered when: SqPaymentForm completes a card nonce request
             */
        cardNonceResponseReceived: (errors, nonce, cardData) => {
          if (errors) {
            this.errors = []
            errors.forEach(function (error) {
              that.errors.push(error.message)
            })
            return
          }
          // Assign the nonce value to the hidden form field
          document.getElementById('card-nonce').value = nonce
          document.getElementById('customerId').value = referenceId
          this.nonce = nonce
          this.updateAddress()
          // POST the nonce form to the payment processing page
          document.getElementById('nonce-form').submit()
        }
        /*
             * callback function: paymentFormLoaded
             * Triggered when: SqPaymentForm is fully loaded
             */
      }
    })
    this.paymentForm.build()
    // this.paymentForm.requestCardNonce();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .no-padding-margin {
    padding: 0px !important;
    margin: 0px !important;
    padding-left: 0px !important;
  }

  .heading {
    color: #01151C;
    font-size: 30px;
    font-weight: bold
  }
.sq-input {
  border: 1px solid rgb(223, 223, 223);
  outline-offset: -2px;
  margin-bottom: 5px;
  display: inline-block;
  border: none;
  color: #32325d;
  line-height: 18px;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
  height: 18px;
  -webkit-font-smoothing: antialiased;
}

  .sq-input ::placeholder {
    color: #aab7c4;
    opacity: 0.5;
  }

/* Define how SqPaymentForm iframes should look when they have focus */

/* Define how SqPaymentForm iframes should look when they contain invalid values */

.sq-input--error {
  outline: 3px auto rgb(255, 97, 97);
}

.errorbox {
  line-height: 14px;
  text-align: left;
}

.error {
  font-size: 13px;
  color: rgb(164, 0, 30);
  width: 100%;
  display: inline-block;

  margin-top: -10px;
  font-weight: 400;
}

/* Customize the "Pay with Credit Card" button */

.button-credit-card {
  min-width: 200px;
  min-height: 20px;
  padding: 0;
  margin: 5px;
  line-height: 20px;
  box-shadow: 2px 2px 1px rgb(200, 200, 200);
  background: rgb(255, 255, 255);
  border-radius: 5px;
  border: 1px solid rgb(200, 200, 200);
  font-weight: bold;
  cursor: pointer;
}

.modal .payButton {
  margin-left: 0px;
  position: absolute;
  bottom: 0px;
  width: 400px;
}

/* Customize the "{{Wallet}} not enabled" message */

#sq-ccbox {
  margin: 5px;
  padding: 0px 10px;
  text-align: center;
  vertical-align: top;
  font-weight: bold;
}

  .card-number,
  .expiration-date,
  .cvv,
  .postal-code {
    width: 55%;
    height:30px;
    display: inline-block;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    text-align: left;
    font: Bold 18px Lato;
    letter-spacing: 0px;
    border: 1px solid #A5ACAE;
    border-radius: 4px;
    opacity: 1;
    margin-top: 2px;
    color: #01151C;
    padding:5px;
  }

  p {
    margin: 0px;
    text-align: left; 
    letter-spacing: 0px;
    color: #546064;
    opacity: 1;
  }

#card-tainer {
  text-align: left;
  margin-top: 8px;
  background-color: white;
  height: 80px;
  padding: 10px 12px;
  border-radius: 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
  box-sizing: border-box;
}

  .heading-font {
    color: #01151C;
    font-weight: bold;
    font-size: 18px;
  }

  .btnSubmit {
    background: #00AC4E 0% 0% no-repeat padding-box;
    border-radius: 7px;
    opacity: 1;
    border: none;
    width: 100%;
    border: 1px solid #00AC4E;
  }

  .btnCancel {
    background: white;
    color: #546064;
    border: 1px solid #546064;
    margin-right: 15px;
    width: 100%;
    border-radius: 7px;
  }

  .sq-input {
  border: 1px solid rgb(223, 223, 223);
  outline-offset: -2px;
  margin-bottom: 5px;
  display: inline-block;
  border: none;
  color: #32325d;
  line-height: 18px;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
  height: 18px;
  -webkit-font-smoothing: antialiased;
}
.sq-input ::placeholder {
  color: #aab7c4;
  opacity: 0.5;
}
/* Define how SqPaymentForm iframes should look when they have focus */
/* Define how SqPaymentForm iframes should look when they contain invalid values */
.sq-input--error {
  outline: 3px auto rgb(255, 97, 97);
}
.errorbox {
  line-height: 14px;
  text-align: left;
}
.error {
  font-size: 10px;
  color: rgb(164, 0, 30);
  width: 45%;
  display: inline-block;
  margin-top: -10px;
  font-weight: 400;
}
/* Customize the "Pay with Credit Card" button */
.button-credit-card {
  min-width: 200px;
  min-height: 20px;
  padding: 0;
  margin: 5px;
  line-height: 20px;
  box-shadow: 2px 2px 1px rgb(200, 200, 200);
  background: rgb(255, 255, 255);
  border-radius: 5px;
  border: 1px solid rgb(200, 200, 200);
  font-weight: bold;
  cursor: pointer;
}
.card-number {
  width: 100%;
}
.modal .payButton {
  margin-left: 0px;
  position: absolute;
  bottom: 0px;
  width: 400px;
}
/* Customize the "{{Wallet}} not enabled" message */
.wallet-not-enabled {
  min-width: 200px;
  min-height: 40px;
  max-height: 64px;
  padding: 0;
  margin: 10px;
  line-height: 40px;
  background: #eee;
  border-radius: 5px;
  font-weight: lighter;
  font-style: italic;
  font-family: inherit;
  display: block;
}
/* Customize the Apple Pay on the Web button */
.button-apple-pay {
  min-width: 200px;
  min-height: 40px;
  max-height: 64px;
  padding: 0;
  margin: 10px;
  background-image: -webkit-named-image(apple-pay-logo-white);
  background-color: black;
  background-size: 100% 60%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 5px;
  cursor: pointer;
  display: none;
}
/* Customize the Masterpass button */
.button-masterpass {
  min-width: 200px;
  min-height: 40px;
  max-height: 40px;
  padding: 0;
  margin: 10px;
  background-image: url(https://static.masterpass.com/dyn/img/btn/global/mp_chk_btn_147x034px.svg);
  background-color: black;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 5px;
  border-color: rgb(255, 255, 255);
  cursor: pointer;
}
#sq-walletbox {
  text-align: center;
  vertical-align: top;
  font-weight: bold;
}
#sq-ccbox {
  margin: 5px;
  padding: 0px 10px;
  text-align: center;
  vertical-align: top;
  font-weight: bold;
}
.expiration-date,
.cvv,
.postal-code {
  width: 30%;
  display: inline-block;
}
#card-tainer {
  text-align: left;
  margin-top: 8px;
  background-color: white;
  height: 80px;
  padding: 10px 12px;
  border-radius: 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
  box-sizing: border-box;
}
div#card-tainer {
    height: auto;
}
iframe.sq-input {
    height: 38px;
    display: block;
    width: 100%;
    height: calc(1.5em + 1.25rem + 2px);
    padding: 0.625rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    color: #8898aa;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #cad1d7;
    border-radius: 0.375rem;
    -webkit-box-shadow: none;
    box-shadow: none;
    -webkit-transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
</style>
