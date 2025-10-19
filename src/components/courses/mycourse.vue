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
                      <p class="ml-2 mt-2" style="font-size:24px;color:#01151C; font-weight:bold; margin:0px">{{ course.name }}</p>
                      <p class="ml-2 mt-2" style="font-size:14px;color:#01151C;">{{course.organizationCourses.length}} Students Registered</p>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <p class="ml-2 mt-2" style="font-size: 14px;">{{ course.description }}</p>
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
                      <b-button block variant="primary" @click="createMeeting(course)" :disabled="course.organizationCourses.length<=0">Schedule Lessons</b-button>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-button class="mt-2" block variant="primary" :to="'/portal/course/room/' + course.id" :disabled="course.organizationCourses.length<=0">View</b-button>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="1" sm="1" md="1" lg="1" xl="1">
              <div>
                <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                  <template #button-content>
                    <i class="fa fa-ellipsis-h"></i>
                  </template>
                  <b-dropdown-item @click="editCourse(course)">Edit</b-dropdown-item>
                  <b-dropdown-item @click="deleteCourse(course)">Delete</b-dropdown-item>
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
  props: ['course'],
  components: {
  },
  data () {
    return {
      meetingTodeleteId: ''
    }
  },
  methods: {
    ...mapActions('posts', [
      'selectRoom',
      'getPostsByRoom'
    ]),
    ...mapActions('course', [
      'setCourse'
    ]),
    select (_course) {
      this.setCourse(_course)
    },
    editCourse (_course) {
      this.setCourse(_course)
      this.$bvModal.show('bv-modal-editcourse')
    },
    deleteCourse (course) {
      this.setCourse(course)
    },
    createMeeting (course) {
      this.setCourse(course)
      this.$emit('createCourseMeeting')
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
  a.btn-primary.btn-block {
      color: #fff;
  }
</style>
