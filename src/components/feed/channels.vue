<template> 
  <div> 
    <form ref="form">
      <h6 class="card-subtitle mb-2 text-muted">Filter By Channels</h6>
      <b-input-group prepend="Channel" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-select v-model="selected" :options="channelsChannels" @change="onChange()"></b-form-select>
      </b-input-group>
    </form> 
  </div>
</template>
<script> 
  import { mapState, mapActions } from 'vuex';
  export default { 
    components: { 
    },
    data() {
      return { 
        searchHandle: '',
        selected: null,
        nameState: null,
        channelState: null,
        channelsChannels: []
      }
    },
    methods: {
      ...mapActions('posts', [ 
        'getPostsByChannel',
        'selectChannel', 
        'getForumCourses'
      ]),
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.searchHandle = ''
        this.nameState = null 
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      onChange() { 
        this.getPostsByChannel(this.selected)
      }, 
    },  
    computed: { 
      ...mapState({ 
        channels: State => State.posts.channels
      }),
      ...mapState({
        channel: state => state.posts.channel
      }),   
    }, 
    mounted() {
      let self = this; 
      this.getForumCourses().then(function () {
        self.channelsChannels = self.channels.map(function (item) {
          return {
            value: item.id,
            text: item.name
          }
        });
        self.channelsChannels.unshift({ value: null, text: 'Please select some item' }); 
      });
    },
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
