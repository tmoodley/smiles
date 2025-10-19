<template>
  <div>
    <b-container class="p-0 mt-3" fluid>
      <b-row>
        <b-col class="main-container main-hover-div">
          <b-row class="mt-2" style="background-color: white; box-shadow: 0px 4px 10px #CFDEE66C;">
            <b-col cols="12" sm="8" md="7" lg="9" xl="9" class="p-3">
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
            <b-col cols="6" sm="6" md="6" lg="2" xl="2" class="p-2">
              <b-row class="mt-4">
                <b-col cols="12">
                  <b-row>
                    <b-col>
                      <b-button class="mt-2" block variant="primary" @click="view()" v-b-modal.bv-modal-viewjob>View</b-button>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="1" sm="1" md="1" lg="1" xl="1">
              <div v-if="organizationId == job.organizationsId">
                <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                  <template #button-content>
                    <i class="fa fa-ellipsis-h"></i>
                  </template>
                  <b-dropdown-item @click="editjob(job)">Edit</b-dropdown-item>
                  <b-dropdown-item @click="deletejob(job)">Delete</b-dropdown-item>
                </b-dropdown>
              </div>
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
      organizationId: JSON.parse(localStorage.getItem('actualOrgId'))
    }
  },
  methods: {
    ...mapActions('job', [
      'setJob',
      'deleteJob',
      'getJobs'
    ]),
    view () {
      this.setJob(this.job)
    },
    editjob (_job) {
      this.setJob(_job)
      this.$bvModal.show('bv-modal-editjob')
    },

    deletejob (job) {
      let self = this
      this.$swal.fire({
        title: 'Are you sure you want to delete the job request?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          self.deleteJob(job).then(function () {
            self.getJobs(JSON.parse(localStorage.getItem('actualOrgId')))
            self.$swal.fire(
              {
                title: 'Deleted!',
                text: 'Your Job Request has been saved.',
                icon: 'success',
                timer: 3000
              }
            )
          })
        }
      })
    }
  },
  computed: {
    ...mapState({
      companystore: state => state.company.company
    })
  },
  mounted: function () {
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
    opacity: 0.5
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
