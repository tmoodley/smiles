<template>
  <div >
    <iq-card  id="post-modal-data" body-class="iq-card iq-card-block iq-card-stretch iq-card-height" >
      <template v-slot:headerTitle >
        <h4 class="card-title">Create Post</h4>
      </template>
         <div class=" px-3 py-3">
                    <div class="d-flex align-items-center border-bottom pb-3">
                      <img
                        class="avatar-130 img-fluid rounded-circle"
                        :src="companystore.logoUrl"
                      />
                      <textarea
                        rows="1"
                        v-b-modal.modal-1
                        class="text-area border border-0 w-100 resize-none ml-3"
                        id="message"
                        placeholder="Start a Post..."
                      ></textarea>
                    </div>
                  </div> 
      <b-modal
      id="modal-1"
      ref="create-modal"
      size="lg"
      hide-footer
      title="Create a Post"
      >
        <createpost @close="onClosed"></createpost> 
    </b-modal> 
    </iq-card>
  </div>
</template>
<script>
import Post from '../../../../Model/Post'
import { mapState,mapActions } from 'vuex'
import createpost from "components/feed/post/create.vue";
export default {
  name: 'AddSocialPost',
  components: {  
    createpost
  },
  data () {
    return {
      post: new Post(),
      tab: [
        {
          icon: require('../../../../assets/images/small/07.png'),
          name: ' Photo/Video'
        },
        {
          icon: require('../../../../assets/images/small/08.png'),
          name: ' Tag Friend'
        },
        {
          icon: require('../../../../assets/images/small/09.png'),
          name: 'Feeling/Activity'
        },
        {
          icon: require('../../../../assets/images/small/10.png'),
          name: 'Check in'
        },
        {
          icon: require('../../../../assets/images/small/11.png'),
          name: 'Live Video'
        },
        {
          icon: require('../../../../assets/images/small/12.png'),
          name: ' Gif'
        },
        {
          icon: require('../../../../assets/images/small/13.png'),
          name: 'Watch Party'
        },
        {
          icon: require('../../../../assets/images/small/14.png'),
          name: ' Play with Friends'
        }
      ]
    }
  },
  methods: {
    addNewPost (post) {
      this.$emit('addPost', post)
      this.post = new Post()
      this.$bvModal.hide('modal1')
    },
    resetPost () {
      this.post = new Post()
    },
    previewImage: function (event) {
      const files = event.target.files
      Object.keys(files).forEach(i => {
        const file = files[i]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.post.images.push(e.target.result)
        }
        reader.readAsDataURL(file)
      })
    }
  },
   computed: {   
    ...mapState({
      companystore: state => state.company.company
    }),
   }
}
</script>
