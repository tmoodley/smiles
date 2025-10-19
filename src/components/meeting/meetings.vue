<template>
 <div>
    <b-container class="pb-6 pt-2 pt-md-1 bg-gradient-success">
    </b-container>
    <b-container fluid class="mb-7">
      <b-row class="my-1">
        <b-col sm="4">
          <b-button @click="createMeeting">Shedule a meeting</b-button>
        </b-col>
      </b-row>
    </b-container>
    <div>
      <b-card no-body>
        <b-tabs pills card>
          <b-tab title="Up coming meetings" active>
            <b-card-text>
              <div class="row">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-body">
                      <b-container fluid>
                      </b-container>
                      <div v-if="!storeMeetings" class="text-center">
                        <p><em>Loading...</em></p>
                        <h1><icon icon="spinner" pulse /></h1>
                      </div>
                      <template v-if="storeMeetings">
                        <b-table hover :items="storeMeetings" :fields="fields" >
                          <template v-slot:cell(meetingTime)="data">
                            <b>{{ formatedTime(data.item.meetingTime) }}</b>
                          </template>
                          <template v-slot:cell(topic)="data">
                            <b class="text-info" style="cursor:pointer" @click="selectedEdit(data)">{{ data.item.topic }}</b>
                          </template>
                          <template v-slot:cell(actions)="row">
                            <b-button size="sm" @click="startMeeting(row.item, row.index, $event.target)" class="mr-1" pill>
                              Start
                            </b-button>
                            <b-button size="sm" @click="deleteMeeting(row.item, row.index, $event.target)" class="mr-1" pill>
                              Delete
                            </b-button>
                          </template>
                        </b-table>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </b-card-text>
          </b-tab>
          <b-tab title="Previous meetings">
            <b-card-text>
              <div class="row">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-body">
                      <b-container fluid>
                      </b-container>
                      <div v-if="!storePrevMeetings" class="text-center">
                        <p><em>Loading...</em></p>
                        <h1><icon icon="spinner" pulse /></h1>
                      </div>
                      <template v-if="storePrevMeetings">
                        <b-table hover :items="storePrevMeetings" :fields="fields">
                          <template v-slot:cell(meetingTime)="data">
                            <b>{{ formatedTime(data.item.meetingTime) }}</b>
                          </template>
                          <template v-slot:cell(topic)="data">
                            <b class="text-info" style="cursor:pointer" @click="selectedEdit(data)">{{ data.item.topic }}</b>
                          </template>
                          <template v-slot:cell(actions)="row">
                            <b-button size="sm" @click="startMeeting(row.item, row.index, $event.target)" class="mr-1" pill>
                              Start
                            </b-button>
                            <b-button size="sm" @click="deleteMeeting(row.item, row.index, $event.target)" class="mr-1" pill>
                              Delete
                            </b-button>
                          </template>
                        </b-table>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
      <b-sidebar id="sidebar-right" title="Meeting Details" right shadow>
        <div class="px-3 py-2">
          <p>
            Lesson with Tutor and Student
          </p>
          <p>
            Meeting Details: 10:00 AM Wednesday, 24 June, 2020
          </p>
          <p>
            Meeting ID 97637597697
          </p>
          <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
        </div>
      </b-sidebar>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
const { DareFormatter } = require('../../_helpers/date-formatter')
export default {
  data () {
    return {
      id: '',
      fields: [{ key: 'meetingTime', label: 'Meeting Time' }, { key: 'topic', label: 'Topic' }, 'roomId', 'actions']
    }
  },
  methods: {
    ...mapActions('meeting', [
      'getMeetings'
    ]),
    ...mapActions('meeting', [
      'getPrevious'
    ]),
    ...mapActions('meeting', [
      'selectedMeeting'
    ]),
    startMeeting (item, index, target) {
      window.open(item.inviteLink, '_blank')
    },
    deleteMeeting (item) {
      this.selectedMeeting(item)
      this.$router.push({ path: '/portal/meetingDelete/' })
    },
    addPartner () { },
    createMeeting () {
      this.$router.push({ path: '/portal/meetingCreate/' + this.id })
    },
    selectedEdit (item) {
      this.selectedMeeting(item.item)
      this.$router.push({ path: '/portal/meetingDetails/' })
    },
    formatedTime (time) {
      let date = new DareFormatter()
      return date.getFormatedTime(time)
    }
  },
  computed: {
    ...mapState({
      storeMeetings: state => state.meeting.meetings
    }),
    ...mapState({
      storePrevMeetings: state => state.meeting.previousMeetings
    })
  },
  mounted: function () {
    this.id = this.$route.params.id

    this.getMeetings(this.id)
    this.getPrevious(this.id)
  }
}
</script>
