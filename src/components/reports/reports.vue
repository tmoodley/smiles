
<template>
  <b-container fluid>
    <b-row class="mt-3">
      <b-col cols="3" sm="3" md="3" lg="2" xl="2">
        <div>
          <p style="font: Bold 30px Lato;">Reports</p>
        </div>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="4" xl="3">
        <div>
          <b-form-group label="" label-for="ratio" label-cols-md="auto" class="mb-3">
            <div id="div1" style="z-index:3">
              <b-form-input v-model="selectedDate" disabled id="example-datepicker" type="text" class="mb-2 dateTextInput"> </b-form-input>
              <div class="calandarIcon">
                <b-icon icon="calendar3" aria-hidden="true" @click="showDatePicker"></b-icon>
              </div>
              <div class="iconRight">
                <b-icon icon="chevron-right" aria-hidden="true" @click="AddDate"></b-icon>
              </div>
              <div class="iconLeft">
                <b-icon icon="chevron-left" aria-hidden="true" @click="subDate"></b-icon>
              </div>
            </div>
            <div id="div2" class="datePickerDiv">
              <datepicker @selected="dateSelected" v-model="selecteDatePicker" class="date" ref="datepick"></datepicker>
            </div>
          </b-form-group>
        </div>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="4" xl="3">
        <b-form-group label="Users" id="lbl-form-group" label-for="ratio" label-cols-md="auto" class="mb-3">
          <div id="div3" style="z-index:3" @focusout="focusOut">
            <b-form-select id="ratio" @change="onChange()" v-on:focus.native="focusIn" class="dateTextInput" v-model="showCreated" :options="createdSelect" ref="bselectclick">
            </b-form-select>
            <div v-if="dropdownArrow" class="iconDropdown">
              <b-icon icon="chevron-right" aria-hidden="true" scale="1.2" rotate="90"></b-icon>
            </div>
            <div v-if="!dropdownArrow" class="iconDropdown-up">
              <b-icon icon="chevron-left" aria-hidden="true" scale="1.2" rotate="90"></b-icon>
            </div>
          </div>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row class="justify-content-md-center" v-if="items.length == 0">
      <b-col md="auto">
        <p style="font-size:24px; font-weight:bold">There are no reports yet!</p>
      </b-col>
    </b-row>

    <b-table id="my-table" v-if="items.length >0" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" tbody-tr-class="bg-white"></b-table>

    <div class="tableFooter" >
      <b-row class="">
        <b-col cols="9"> <b-pagination class="customPagination" aria-controls="my-table" size="md" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" first-number last-number></b-pagination></b-col>
        <b-col cols="0.5" class="mt-2">View</b-col>
        <b-col cols="0.5" style="margin-left:10px"><b-form-select v-model="perPage" :options="optionsItemsPerPage">Value</b-form-select></b-col>
        <b-col cols="1" class="mt-2"><p>Items per page</p></b-col>
        <b-col>
          <p cols="1" class="mt-2">Current Page: {{ currentPage }}</p>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>
<script>

import { mapState, mapActions } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import { BIcon, BIconCalendar3, BIconChevronLeft, BIconChevronRight } from 'bootstrap-vue'
import axios from 'axios'
var moment = require('moment')
export default {
  components: {
    Datepicker,
    BIcon,
    BIconCalendar3,
    BIconChevronLeft,
    BIconChevronRight
  },
  data () {
    return {
      selectedDate: moment().format('ll'),
      selecteDatePicker: new Date(),
      selectedPartner: 'Everyone',
      OrganizationId: JSON.parse(localStorage.getItem('organizationId')),
      meetingSelect: [
        { text: 'Active meetings', value: 1 },
        { text: 'Deleted', value: 2 }
      ],
      showCreated: 1,
      createdSelect: [{ value: 1, text: 'Everyone' }],
      selectedPartner: 'Everyone',
      dropdownArrow: true,
      dropdownArrowShow: true,

      optionsItemsPerPage: [
        { value: 10, text: '10' },
        { value: 20, text: '20' },
        { value: 50, text: '50' }
      ],

      items: [],
      fields: [{
        key: 'date',
        label: 'Date'
      },
      {
        key: 'meetingTopic',
        label: 'Meeting Topic'
      },
      {
        key: 'startFinishTime',
        label: 'Start & Finish time'
      },
      {
        key: 'duration',
        label: 'Duration'
      },
      {
        key: 'meetingParticipants',
        label: 'Participants'
      },
      {
        key: 'actions',
        label: 'Actions'
      }
      ],
      currentPage: 1,
      perPage: 10,
      totalItems: 0

    }
  },
  methods: {
    ...mapActions('partner', [
      'getPartners'
    ]),

    rowClass () {
      return 'report-rows'
    },

    showDatePicker () {
      this.$refs.datepick.showCalendar()
    },
    dateSelected (date) {
      this.selectedDate = moment(date).format('ll')
      this.getReports()
    },
    AddDate () {
      this.selecteDatePicker = moment(this.selecteDatePicker).add(1, 'days').toDate()
      this.selectedDate = moment(this.selecteDatePicker).format('ll')
      this.getReports()
    },
    subDate () {
      this.selecteDatePicker = moment(this.selecteDatePicker).subtract(1, 'days').toDate()
      this.selectedDate = moment(this.selecteDatePicker).format('ll')
      this.getReports()
    },

    getPartnerList () {
      this.getPartners(JSON.parse(localStorage.getItem('organizationId'))).then(() => {
        for (var partner of this.storePartners) {
          var item = { text: partner.givenName + ' ' + partner.familyName, value: partner.id }
          this.createdSelect.push(item)
        }
      })
    },

    getReports () {
      axios.get('/portal/api/Reports/GetReportsByDate?organizationId=' + this.OrganizationId + '&date=' + this.selectedDate + '&partnerId=' + this.selectedPartner)
        .then(res => {
          console.log('Get all Reports')
          console.log('Date:' + this.selectedDate + 'partnerId:' + this.selectedPartner)
          this.items = res.data
          return this.items
        })
    },

    onChange (value) {
      console.log('This is the value that is being generated!')
      console.log(this.showCreated)
      if ((this.createdSelect.find(item => item.value == this.showCreated)).text == 'Everyone') { this.selectedPartner = '' } else { this.selectedPartner = (this.createdSelect.find(item => item.value == this.showCreated)).value }
      // to change the status of the dropdown arrow
      this.dropdownArrow = true

      this.getReports()
    },
    onChangeShow (value) {
      // to change the status of the dropdown arrow
      this.dropdownArrowShow = true
    },
    focusIn () {
      console.log('entered focusIn status function')
      this.dropdownArrow = false
    },
    focusOut () {
      console.log('entered focusOut status function')
      this.dropdownArrow = true
    },
    focusInShow () {
      console.log('entered focusInShow status function')
      this.dropdownArrowShow = false
    },
    focusOutShow () {
      console.log('entered focusOutShow status function')
      this.dropdownArrowShow = true
    }
    // paginate(page_size, page_number) {
    //  let itemsToParse = this.items;
    //  this.paginatedItems = itemsToParse.slice(page_number * page_size, (page_number + 1) * page_size);
    // },
    // onPageChanged(page) {
    //  this.paginate(this.perPage, page - 1);
    // },
  },
  computed: {

    ...mapState({
      storePartners: state => state.partner.partners
    }),

    totalRows () {
      return this.items.length
    },

    dateChanges () {
      this.selectedDate = moment(this.selecteDatePicker).format('ll')
      if (moment().format('L') != moment(this.selectedDate).format('L') || this.ShowMeeting == 2) {
        return false
      } else {
        return true
      }
    }
  },
  mounted: function () {
    this.getPartnerList()

    this.getReports().catch(error => {
      console.error(error)
    })
  }
}

</script>

<style scoped>
  .btnCls {
    background-color: var(--success);
    border: none
  }

  .date {
  }

  .dateTextInput {
    background: white;
    color: #01151C;
    font-weight: bold
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
      cursor: pointer
    }

  .calandarIcon :hover {
    cursor: pointer
  }

  .iconRight :hover {
    cursor: pointer
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

  .datePickerDiv >>> input {
    border: none;
    background: transparent;
    color: transparent;
    display: none
  }

  .sideBar {
    background: #FFFFFF;
  }
 

  .participantsText {
    text-align: left;
    font: Regular 20px/24px Lato;
    letter-spacing: 0px;
    color: #5098E9;
    opacity: 1;
  }

  .customPagination {
    color: Yellow;
  }

</style>
