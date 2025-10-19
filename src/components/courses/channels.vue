<template>
  <div>
    <b-row>
      <b-col cols="9" sm="12" md="9" lg="9" xl="9" class="mt-2">
        <form ref="form">
          <b-input-group prepend="/c/" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-select v-model="selected" :options="channelsChannels" @change="onChange()"></b-form-select>
          </b-input-group>
        </form>
      </b-col>
      <b-col cols="3" sm="12" md="3" lg="3" xl="3" class="mt-2">
        <b-button block variant="primary" @click="$bvModal.show('modal-add-channel')">Add Channel</b-button>
      </b-col>
    </b-row>
    <b-modal id="modal-add-channel"
             ref="modal"
             title="Add New Channel"
             @show="resetModal"
             @hidden="resetModal"
             @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Channel"
                      label-for="name-input"
                      invalid-feedback="Channel is required"
                      :state="channelState">
          <label class="sr-only" for="inline-form-input-username">Channel</label>
          <b-input-group prepend="/c/" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input list="input-list" id="input-with-list" v-model="searchHandle" placeholder="Channel" required :state="nameState"></b-form-input>
          </b-input-group>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      searchHandle: '',
      selected: null,
      nameState: null,
      channelState: null
    }
  },
  methods: {
    ...mapActions('posts', [
      'getPostsByChannel',
      'selectChannel',
      'addChannel',
      'getCourseChannels'
    ]),
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal () {
      this.searchHandle = ''
      this.nameState = null
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    onChange () {
      this.getPostsByChannel(this.selected)
    },
    handleSubmit () {
      var self = this
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }

      var payload = {
        name: this.searchHandle,
        coursesId: this.course.id
      }
      // Push the name to submitted names
      this.addChannel(payload).then(function () {
        self.getCourseChannels(self.course.id)
      })
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-add-channel')
      })
    }
  },
  created: function () {
    this.subjectsId = this.subject.id
  },
  computed: {
    ...mapState({
      channels: State => State.posts.channels
    }),
    ...mapState({
      channel: state => state.posts.channel
    }),
    ...mapState({
      course: state => state.course.course
    }),
    channelsChannels () {
      var _channels = this.course.channels.map(function (item) {
        return {
          value: item.id,
          text: item.name
        }
      })
      _channels.unshift({ value: null, text: 'Please select some item' })
      return _channels
    }
  }
}

</script>
<style>

  .no-padding {
    padding: 4px;
    width: 24%;
  }

  .hoverClass {
    transition: 3s;
    width: 23px;
    height: 23px;
  }

  .hoverClass:hover {
    width: 15px;
    height: 15px;
  }

  .no-border:focus {
    border:none;
    outline:none;
  }

</style>
