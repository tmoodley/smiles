<template>
  <div> 
      <b-tabs
        content-class='mt-3'
        no-nav-style='false'
        nav-class='border border-top-0 border-right-0 border-left-0  border-secondary tabsnoborder'
        active-nav-item-class='border-top-0 border-right-0 border-left-0 border-bottom-1 border-success rounded-0 text-secondary'
      >
        <b-tabs content-class='mt-3'>
          <b-tab title='payment details' active>
            <b-row no-gutters class='mt-5'>
              <b-col>
                <p class='no-padding-margin sub-title'>{{ billingAddress }}</p>
              </b-col>
            </b-row>
            <b-row no-gutters class='mt-5'>
              <b-col>
                <b-button
                  variant='#546064'
                  v-b-modal.payment-info
                  style='border: 1px solid #546064'
                  >Update billing method</b-button
                >
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title='Invoice'>
            <b-table
              outlined
              responsive
              head-variant='light'
              :items='items'
              :fields='fields'
              :per-page='perPage'
              :current-page='currentPage'
              :busy='isBusy'
            >
              <template v-slot:table-busy>
                <div class='text-center text-success my-2'>
                  <b-spinner class='align-middle'></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template v-slot:cell(amount)='data'>
                <p>{{ getMoneyFormat(data.item.amount) }}</p>
              </template>

              <template v-slot:cell(status)='data'>
                <div
                  v-if='data.item.status == true'
                  style='
                    position: relative;
                    background: #d7fce7;
                    border-radius: 22px;
                    width: 47px;
                    text-align: center;
                    color: #00ac4e;
                    font-size: 12px;
                  '
                >
                  Paid
                </div>
                <div
                  v-if='data.item.status == false'
                  style='
                    position: relative;
                    background: #ffebeb;
                    border-radius: 22px;
                    width: 49px;
                    text-align: center;
                    color: #ff5555;
                    font-size: 12px;
                  '
                >
                  Unpaid
                </div>
              </template>

              <template v-slot:cell(actions)='row'>
                <div
                  style='
                    position: relative;
                    width: 15px;
                    float: left;
                    margin-left: 20px;
                    cursor: pointer;
                  '
                >
                  <img
                    src='/images/invoice-download.svg'
                    alt=''
                    class='img-fluid'
                    style='width: 15px; cursor: pointer'
                    @click='downloadPdf(row.item, row.index, $event.target)'
                  />
                </div>
              </template>
            </b-table>
            <div class='tableFooter'>
              <b-row class=''>
                <b-col cols='6'>
                  <b-pagination
                    v-model='currentPage'
                    :total-rows='rows'
                    :per-page='perPage'
                    aria-controls='my-table'
                    first-number
                    last-number
                  ></b-pagination
                ></b-col>
                <b-col cols='1' class='mt-2'
                  ><p style='text-align: right'>View</p></b-col
                >
                <b-col cols='1' style='margin-left: 10px'
                  ><b-form-select
                    v-model='perPage'
                    :options='optionsItemsPerPage'
                    >Value</b-form-select
                  ></b-col
                >
                <b-col cols='2' class='mt-2'><p>Items per page</p></b-col>
                <b-col>
                  <p cols='2' class='mt-2'>Current Page: {{ currentPage }}</p>
                </b-col>
              </b-row>
            </div>
          </b-tab>
        </b-tabs>
      </b-tabs> 
      <updateBilling></updateBilling>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import router from '../../router/index'
import updateBilling from 'components/settings/billing-payment-info/paymentForm.vue'
export default {
  components: {
    updateBilling
  },
  data () {
    return {
      lastDigits: '****',
      expiriDate: 'YYYY/MM',
      creditCardImg: '/images/visa.svg',
      OrganizationId: '',
      billingAddress: '',
      cardVisa: true,
      cardMaster: false,
      cardAmerican: false,
      isBusy: true,
      fields: [
        {
          key: 'invoiceNo',
          label: 'Invoice ID',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'invoiceDate',
          label: 'Date',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'amount',
          label: 'Amount',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'status',
          label: 'Status',
          thClass: 'tbHeadingClass',
          tdClass: 'tbBodyClass'
        },
        {
          key: 'actions',
          label: 'Download'
        }
      ],
      items: [],
      perPage: 10,
      currentPage: 1,
      optionsItemsPerPage: [
        { value: 10, text: '10' },
        { value: 20, text: '20' },
        { value: 50, text: '50' }
      ]
    }
  },
  methods: {
    ...mapActions('company', ['getCompany']),
    ...mapActions('partner', ['getPartner']),
    ...mapActions('partner', ['getPartners']),

    gotosite () {
      // window.location.pathname = '/portal/settings/paymentInfo';
      // router.push({ name: 'paymentInfo' })
      router.push({ name: 'paymentInfo' })
    },
    downloadPdf (item) {
      console.log(item)
      window.open('https://stuttie.com/portal/api/Invoice?id=' + item.id)
    },
    getMoneyFormat (amount) {
      return '$' + amount
    }
  },
  computed: {
    ...mapState({
      store: (state) => state.company
    }),
    ...mapState({
      partnerStore: (State) => State.partner.partner
    }),
    ...mapState({
      storePartners: (state) => state.partner.partners
    }),
    rows () {
      return this.items.length
    }
  },
  mounted: function () {
    let _this = this
    this.$ga.page('/portal/settings/billing')
    this.OrganizationId = JSON.parse(localStorage.getItem('organizationId'))
    this.getCompany(this.OrganizationId).then(() => {
      if (
        _this.store.company.billingAddress1 == null ||
        _this.store.company.billingAddress1 == ''
      ) {
        if (
          _this.store.company.address1 == null ||
          _this.store.company.address1 == ''
        ) {
          _this.billingAddress = ''
        } else {
          _this.billingAddress =
            _this.store.company.address1 +
            ', ' +
            _this.store.company.city +
            ', ' +
            _this.store.company.state +
            ', ' +
            _this.store.company.postalCode
        }
      } else {
        _this.billingAddress =
          _this.store.company.billingAddress1 +
          ', ' +
          _this.store.company.billingCity +
          ', ' +
          _this.store.company.billingState +
          ', ' +
          _this.store.company.billingPostalCode
      }
 

      // send the request
      axios
        .get('/portal/api/Card/' + _this.store.company.referenceId)
        .then((response) => {
          console.log(response.data)

          _this.lastDigits = response.data.cardLastFourDigits
          _this.expiriDate = response.data.cardExpiry
          // this.creditCardImg = response.data.cardProvider;

          if (response.data.cardProvider == 'VISA') {
            _this.creditCardImg = '/images/visa.svg'
            _this.cardVisa = true
            _this.cardMaster = false
            _this.cardAmerican = false
          } else if (response.data.cardProvider == 'MASTERCARD') {
            _this.creditCardImg = '/images/masterCard.svg'
            _this.cardMaster = true
            _this.cardVisa = false
            _this.cardAmerican = false
          } else if (response.data.cardProvider == 'AMERICAN_EXPRESS') {
            _this.creditCardImg = '/images/AmericanExpress.svg'
            _this.cardAmerican = true
            _this.cardMaster = false
            _this.cardVisa = false
          }
        })
        .catch(function () {
          console.log('FAILURE!!')
        })
    })

    axios
      .get('/portal/api/Invoice/' + _this.OrganizationId)
      .then((response) => {
        _this.items = response.data
        _this.isBusy = false
      })
      .catch(function () {
        console.log('FAILURE!!')
      })
  },
  created: function () {}
}
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

.creditCard {
  width: 100%;
  height: 200px;
  background: #ffffff;
  border: 1px solid #bfced5;
}

.cardImage {
  height: 100px;
  border-radius: 10px 10px 0px 0px;
}

.cardImagBackAmerican {
  background: #0353a5;
}

.cardBackgroundVisa {
  background: #006fd8;
}

.cardBackgroundMaster {
  background: #006fd8;
}

.imgDiv {
  width: 150px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  margin-top: 32px;
}

.cardImage-sub {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  height: 77px;
  width: 100%;
  float: left;
}

.cardMaster {
  width: 302px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.cardAmerican {
  width: 302px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.tabsnoborder {
  border: 4px solid;
}

 
</style>

<style>
.page-item.active .page-link {
  color: black;
  background: white;
  border-color: #e3e6f0;
}
</style>
