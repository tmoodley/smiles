<template>
   <div>
    <b-container class="pb-6 pt-2 pt-md-1 bg-gradient-success">
    </b-container>
    <b-container fluid class="mb-7">
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-row>
        <b-col>
          <label for="sb-billingRate">Required Schedule</label>
          <i class="fas fa-info-circle" id="tooltip-target-schedule"></i>
          <b-tooltip target="tooltip-target-schedule" triggers="hover">
            This is the date and time you are available.
          </b-tooltip>
          <b-form-checkbox switch v-model="form.monday" size="lg">Monday</b-form-checkbox>
          <b-row v-if="form.monday">
            <b-col >
              <label for="example-datepicker">Monday Start Date</label>
              <b-form-timepicker v-model="form.mondayStartDate" locale="en"></b-form-timepicker> 
            </b-col>
            <b-col>
              <label for="example-datepicker">Monday End Date</label>
              <b-form-timepicker v-model="form.mondayEndDate" locale="en"></b-form-timepicker>
            </b-col>
          </b-row>
          <b-form-checkbox switch v-model="form.tuesday" size="lg">Tuesday</b-form-checkbox>
          <b-row v-if="form.tuesday">
            <b-col>
              <label for="example-datepicker">Tuesday Start Date</label>
              <b-form-timepicker v-model="form.tuesdayStartDate" locale="en"></b-form-timepicker>
            </b-col>
            <b-col>
              <label for="example-datepicker">Tuesday End Date</label>
              <b-form-timepicker v-model="form.tuesdayEndDate" locale="en"></b-form-timepicker>
            </b-col>
          </b-row>
          <b-form-checkbox switch v-model="form.wednesday" size="lg">Wednesday</b-form-checkbox>
          <b-row v-if="form.wednesday">
            <b-col>
              <label for="example-datepicker">Wednesday Start Date</label>
              <b-form-timepicker v-model="form.wednesdayStartDate" locale="en"></b-form-timepicker>
            </b-col>
            <b-col>
              <label for="example-datepicker">Wednesday End Date</label>
              <b-form-timepicker v-model="form.wednesdayEndDate" locale="en"></b-form-timepicker>
            </b-col>
          </b-row>
          <b-form-checkbox switch v-model="form.thursday" size="lg">Thursday</b-form-checkbox>
          <b-row v-if="form.thursday">
            <b-col>
              <label for="example-datepicker">Thursday Start Date</label>
              <b-form-timepicker v-model="form.thursdayStartDate" locale="en"></b-form-timepicker>
            </b-col>
            <b-col>
              <label for="example-datepicker">Thursday End Date</label>
              <b-form-timepicker v-model="form.thursdayEndDate" locale="en"></b-form-timepicker>
            </b-col>
          </b-row>
          <b-form-checkbox switch v-model="form.friday" size="lg">Friday</b-form-checkbox>
          <b-row v-if="form.friday">
            <b-col>
              <label for="example-datepicker">Friday Start Date</label>
              <b-form-timepicker v-model="form.fridayStartDate" locale="en"></b-form-timepicker>
            </b-col>
            <b-col>
              <label for="example-datepicker">Friday End Date</label>
              <b-form-timepicker v-model="form.fridayEndDate" locale="en"></b-form-timepicker>
            </b-col>
          </b-row>
          <b-form-checkbox switch v-model="form.saturday" size="lg">Saturday</b-form-checkbox>
          <b-row v-if="form.saturday">
            <b-col>
              <label for="example-datepicker">Saturday Start Date</label>
              <b-form-timepicker v-model="form.saturdayStartDate" locale="en"></b-form-timepicker>
            </b-col>
            <b-col>
              <label for="example-datepicker">Saturday End Date</label>
              <b-form-timepicker v-model="form.saturdayEndDate" locale="en"></b-form-timepicker>
            </b-col>
          </b-row>
          <b-form-checkbox switch v-model="form.sunday" size="lg">Sunday</b-form-checkbox>
          <b-row v-if="form.sunday">
            <b-col>
              <label for="example-datepicker">Sunday Start Date</label>
              <b-form-timepicker v-model="form.sundayStartDate" locale="en"></b-form-timepicker>
            </b-col>
            <b-col>
              <label for="example-datepicker">Sunday End Date</label>
              <b-form-timepicker v-model="form.sundayEndDate" locale="en"></b-form-timepicker>
            </b-col>
          </b-row>
          <b-row no-gutters class="mt-5">
            <b-col>
              <b-button variant="#546064" @click="handleSubmit" style="border:1px solid #546064">Save</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </form>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('company', [
      'getCompany',
      'updateCompany'
    ]),
    ...mapActions('partner', [
      'getPartner'
    ]),
    handleSubmit () {
      var _company = { ...this.form }
      this.updateCompany(_company)

      // Hide the modal manually
      this.$swal.fire({
        title: 'Saved!',
        text: 'Availability schedule has been saved.',
        icon: 'success',
        timer: 3000
      })
    }
  },
  computed: {
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
    ...mapState({
      form: state => state.company.company
    })
  },
  mounted: function () {
    this.$ga.page('/portal/settings/schedules')
    this.organizationId = JSON.parse(localStorage.getItem('organizationId'))
    this.getPartner(JSON.parse(localStorage.getItem('userId')))
  }
}

</script>

<style scoped>
    .b-form-spinbutton.flex-column {
    height: auto;
    width: auto;
}

.b-form-spinbutton {
    text-align: center;
    overflow: hidden;
    background-image: none;
    padding: 0;
}

.b-form-spinbutton output>bdi, .b-form-spinbutton output>div {
    display: block;
    min-width: 2.25em;
    height: 1.5em;
}
</style>
<style>
.datepickerr > .b-form-spinbutton .form-control .d-inline-flex .flex-column .b-time-hours{
  height: 100px;
}
</style>