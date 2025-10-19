<template>
  <div>
    <b-container class="p-0 mt-3" fluid>
      <b-row>
        <b-col class="main-container main-hover-div">
          <b-row class="mt-2" style="background-color: white; box-shadow: 0px 4px 10px #CFDEE66C;">
            <b-col cols="5" sm="5" md="5" lg="5" xl="5" class="p-3">
              <b-row class="mt-3">
                <b-col cols="12">
                  <b-row>
                    <b-col>
                      <p class="ml-2 mt-2" style="font-size:24px;color:#01151C; font-weight:bold; margin:0px">{{ job.name }}</p>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <p class="ml-2 mt-2" style="font-size: 14px;">{{ job.description }}</p>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="7" sm="7" md="7" lg="7" xl="7" class="p-2">
              <b-row class="mt-4">
                <b-col cols="12">
                  <b-row>
                    <b-col>
                      <b-row>
                        <b-col xl="6">
                          <b-form-group id="fieldset-horizontal"
                                        label-cols-sm="4"
                                        label-cols-lg="4"
                                        content-cols-sm
                                        content-cols-lg="8"
                                        description="Submit your rate for job."
                                        label="Bid Rate"
                                        label-for="input-horizontal">
                            <b-form-input v-model="rate" id="input-horizontal"></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col xl="6">
                          <b-button variant="success" @click="submitBid" :disabled="rate<=0">Submit Bid</b-button>
                          <b-button variant="info" @click="view">View Job</b-button>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['job'],
  components: {
  },
  data () {
    return {
      meetingTodeleteId: '',
      organizationId: JSON.parse(localStorage.getItem('actualOrgId')),
      rate: 0
    }
  },
  methods: {
    ...mapActions('job', [
      'setJob',
      'deleteJob',
      'getJobs',
      'bidForJob',
      'getRegisteredJobs'
    ]),
    view () {
      this.setJob(this.job)
      this.$bvModal.show('bv-modal-viewjob')
    },
    submitBid (event) {
      event.preventDefault()
      let self = this
      let payload = {
        organizationId: this.organizationId,
        jobId: this.job.id,
        bidAmount: this.rate,
        createdAt: new Date()
      }
      this.bidForJob(payload).then(function () {
        self.$swal.fire({
          title: 'Submitted!',
          text: 'Your Bid has been submitted.',
          icon: 'success',
          timer: 3000
        })
        self.getRegisteredJobs(JSON.parse(localStorage.getItem('actualOrgId')))
        self.$bvModal.hide('modal-find-job')
      })
    }
  },
  computed: {
    ...mapState({
      companystore: state => state.company.company
    })
  },
  mounted: function () {
    this.rate = this.job.billingRate
  }
}

</script>

<style scoped>
  .left-align {
    position: relative;
    float: right
  }
  .dropdown {
    color: #01151C;
    font-size: 15px;
    font-weight: bold
  }
  .fadeClass {
      opacity:0.5
  }
  .fadeBackground {
    background: #FCFCFE
  }

  .main-container {
    cursor: pointer
  }

  .hover-drop {
    visibility: hidden
  }

  .main-container:hover .hover-drop, .main-container.hover .hover-drop {
    visibility: visible
  }

  .main-hover-div:focus {
    outline: none
  }

</style>
