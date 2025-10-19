<template> 
  <div> 
    <form ref="form">
      <h6 class="card-subtitle mb-2 text-muted">Filter By Topics</h6>
      <b-input-group prepend="Topic" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-select v-model="selected" :options="topicOptions" @change="onChange()"></b-form-select>
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
        channelState: null
      }
    },
    methods: {
      ...mapActions('posts', [ 
        'getPostsByTopic',
        'selectTopic',
        'getSchoolPostsByTopic'
      ]), 
      onChange() { 
        this.selectTopic(this.selected);
        //check if default view is public
        if (this.companystore.defaultView == 'Public') {
          this.getPostsByTopic(this.selected);
        }
        else {//if default view is school
          let payload = {
            schoolId: this.school.id,
            topicId: this.selected
          }
          this.getSchoolPostsByTopic(payload);
        }
      }, 
    },  
    computed: { 
      ...mapState({ 
        subject: State => State.posts.subject
      }),
      ...mapState({
        companystore: state => state.company.company
      }),
      ...mapState({
        school: state => state.school.school
      }),  
      topicOptions() { 
        var _topics = this.subject != "" ? this.subject.topics.map(function (item) {
          return {
            value: item.id,
            text: item.name
          }
        }) : [];
        _topics.unshift({ value: null, text: 'Please select a topic' });
        return _topics;
      }, 
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
