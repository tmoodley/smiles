<template>
  <div>
    <b-container class="p-0 mt-3" fluid>
      <b-row>
        <b-col class="main-container main-hover-div">
          <b-row class="mt-2" style="background-color: white; box-shadow: 0px 4px 10px #CFDEE66C;">
            <b-col cols="12" sm="8" md="7" lg="9" xl="9" class="p-3" >
              <b-row class="mt-3">
                <b-col cols="12">
                  <b-row>
                    <b-col>
                      <p class=" ml-2 mt-2" style="font-size:24px;color:#01151C; font-weight:bold; margin:0px">{{ room.name }}</p>
                      <!-- <p class=" ml-2 mt-2">{{ room.grades != null ? room.grades.name : '' }} {{ room.subject != null ? room.subject.name : '' }} {{ room.topic != null ? room.topic.name : '' }}</p> -->
                    </b-col>
                    <b-col>
                      <p class=" ml-2 mt-2" style="font-size:24px;color:#01151C; font-weight:bold; margin:0px">{{ room.subject != null ? room.subject.name : '' }}</p>
                      <!-- <p class=" ml-2 mt-2">{{ room.grades != null ? room.grades.name : '' }} {{ room.subject != null ? room.subject.name : '' }} {{ room.topic != null ? room.topic.name : '' }}</p> -->
                    </b-col>
                    <b-col>
                      <p class=" ml-2 mt-2" style="font-size:24px;color:#01151C; font-weight:bold; margin:0px">{{ room.grades != null ? room.grades.name : '' }}</p>
                      <!-- <p class=" ml-2 mt-2">{{ room.grades != null ? room.grades.name : '' }} {{ room.subject != null ? room.subject.name : '' }} {{ room.topic != null ? room.topic.name : '' }}</p> -->
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <p class=" ml-2 mt-2" style="font-size: 14px;">{{ room.description }}</p>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="6" sm="6" md="6" lg="2" xl="2" class="p-2">
              <b-row class="mt-5">
                <b-col cols="12">
                  <b-row>
                    <b-col>
                      <b-button block variant="danger" v-if="isRequested && organizationId!=room.organizationsId"><i class="fa fa-lock" aria-hidden="true"></i> Requested Access</b-button>
                      <b-button block variant="primary" @click="select(room)" :to="'/portal/group/main'" v-else><i class="fas fa-lock-open"></i> View</b-button>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <p class=" ml-2 mt-2" style="font-size: 14px;" v-if="room.maxStudents > 0">
                        <b>{{ room.maxStudents - room.organizationRooms.length }} </b>
                        <b v-if="room.maxStudents - room.organizationRooms.length > 1">Spots Available</b>
                        <b v-else>Spot Available</b>
                      </p>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <p class=" ml-2 mt-2" style="font-size: 14px;" v-if="room.organizationRooms.length > 0"> <b>{{ room.organizationRooms.length }} members</b></p>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="1" sm="1" md="1" lg="1" xl="1">
                <b-dropdown size="md" variant="link" toggle-class="text-decoration-none" no-caret>
                  <template #button-content>
                    <i class="fa fa-ellipsis-h"></i>
                  </template>
                  <b-dropdown-item class="dropdown"><span style="color:#01151C" @click="viewGroupDetails">View Details</span></b-dropdown-item>
                  <b-dropdown-item class="dropdown"><span style="color:#01151C">Resend Invites</span></b-dropdown-item>
                  <b-dropdown-item class="dropdown"><span style="color:#01151C" >Leave</span></b-dropdown-item>

                </b-dropdown>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'
export default {
  props: ['room'],
  components: {
  },
  data () {
    return {
      meetingTodeleteId: '',
      organizationId: JSON.parse(localStorage.getItem('actualOrgId'))
    }
  },
  methods: {
    ...mapActions('posts', [
      'selectRoom',
      'setRoomDetails',
      'getPostsByRoom'
    ]),
    select (room) {
      this.selectRoom(room)
      this.getPostsByRoom(room)
    },
    viewGroupDetails (room) {
      this.setRoomDetails(this.room)
      this.$bvModal.show('bv-modal-group-details')
    },
  },
  computed: {
    ...mapState({
      companystore: state => state.company.company
    }),
    isRequested: function () {
      let result = _.find(this.room.organizationRooms, function (obj) {
        if (obj.organizationId == JSON.parse(localStorage.getItem('actualOrgId'))) {
          return obj
        }
      })

      let mode = localStorage.getItem('mode')
      // check if default view is public
      if (mode == 'Public') {
        return result != null ? result.isRequest : true
      } else if (mode == 'School') { // if default view is school
        return false
      }
    }
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

  a.btn.btn-primary.btn-block {
    color: #fff;
  }
</style>
