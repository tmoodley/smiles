<template>
  <div>
    <b-modal id="modal-find-user"
             ref="modal"
             title="Search For User"
             hide-footer>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Username"
                      label-for="name-input"
                      invalid-feedback="Username is required"
                      :state="nameState">
          <label class="sr-only" for="inline-form-input-username">Username</label>
          <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input list="input-list" id="input-with-list" v-model="searchHandle" placeholder="Username" required :state="nameState" @keyup="getData"></b-form-input>
          </b-input-group>
          <b-list-group>
            <b-list-group-item button v-for="item in searchCompanies" @click="onSelect(item)">{{item.defaultRoomId}}</b-list-group-item>
          </b-list-group>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import { BIcon, BIconEnvelope, BIconCircleFill, BIconCalendar3, BIconLock, BIconPlus, BIconPerson, BIconCursorFill } from 'bootstrap-vue'
export default {
  props: ['msg'],
  data () {
    return {
      searchHandle: '',
      nameState: null
    }
  },
  components: {
    BIcon,
    BIconEnvelope,
    BIconCircleFill,
    BIconCalendar3,
    BIconLock,
    BIconPlus,
    BIconPerson,
    BIconCursorFill
  },
  methods: {
    ...mapActions('messages', [
      'getContacts',
      'filterCompanies',
      'clearCompanies',
      'getContact',
      'saveHistory',
      'selectContact',
      'getMessages',
      'filterContacts',
      'setSelectedContact'
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
    onSelect (item) {
      var self = this
      axios
        .get('/portal/api/Organization/' + item.organizationId)
        .then((response) => {
          self.$emit('select', response.data)
          self.$nextTick(() => {
            self.$bvModal.hide('modal-find-user')
          })
        })
    },
    getData () {
      // Exit when the form isn't valid
      var payload = {
        filter: this.searchHandle,
        handle: this.store.name
      }
      this.filterCompanies(payload)
    }
  },
  mounted () {
    this.clearCompanies()
  },
  computed: {
    ...mapState({
      searchCompanies: state => state.messages.searchCompanies
    }),
    ...mapState({
      store: state => state.company
    })
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
