<template>
  <div>
     <div class="d-flex flex-wrap">
        <div class="user-img"> 
            <b-img @click="view(comment.organizations)" v-if="comment.organizations.logo != null" class="avatar-35" :src="getImage(comment.organizations.userId,comment.organizations.logo)" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
            <b-img @click="view(comment.organizations)" v-if="comment.organizations.logo == null" class="avatar-35" src="/img/silhouette_large.png" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
        </div>
        <div class="comment-data-block ml-3">
          <h6><a href="#" @click="view(comment.organizations)">@{{comment.organizations.name}}</a></h6> 
          <p class="p-2">
            <span v-html="comment.body"></span>
          </p>
          <b-img fluid v-if="comment.document != null && (comment.document.extension == '.jpg' || comment.document.extension == '.jpeg' || comment.document.extension == '.png')" v-bind="mainProps" :src="comment.document.name" alt="Image 8"></b-img> <br />
          <div class="like-block position-relative d-flex align-items-center">
            <div class="d-flex align-items-center">
              <b-button-group size="sm">
                <b-button @click="upVote" variant="light" :disabled="isUpVoted"><i v-bind:class="isUpVoted ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'"></i> Up Votes {{comment.upVotes.length > 0 ? comment.upVotes.length : "0"}}</b-button>
                <b-button @click="downVote" variant="light" :disabled="isDownVoted"><i v-bind:class="isDownVoted ? 'fas fa-thumbs-down' : 'far fa-thumbs-down'"></i> Down Votes {{comment.downVotes.length > 0 ? comment.downVotes.length : "0"}}</b-button>
                <b-button variant="light" target="self" :href="comment.document.name" v-if="comment.documentId != null"><i class="fas fa-download"></i> Download Attachment {{comment.document != null ? comment.document.extension : ''}}</b-button>
                <span>{{comment.createdAt | formatDate}}</span>
              </b-button-group>
            </div> 
          </div> 
        </div>
    </div>  
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['comment'],
  components: {
  },
  data: function () {
    return {

    }
  },
  methods: {
    ...mapActions('posts', [
      'upVoteComment',
      'downVoteComment',
      'selectUser'
    ]),
    view (org) {
      this.selectUser(org)
      this.$bvModal.show('bv-modal-profile')
    },
    upVote () {
      var vote = {
        PostsId: this.comment.postsId,
        CommentId: this.comment.id,
        CreatedBy: JSON.parse(localStorage.getItem('organizationId')),
        OrganizationsId: JSON.parse(localStorage.getItem('actualOrgId'))
      }
      this.upVoteComment(vote)
    },
    downVote () {
      var vote = {
        PostsId: this.comment.postsId,
        CommentId: this.comment.id,
        CreatedBy: JSON.parse(localStorage.getItem('organizationId')),
        OrganizationsId: JSON.parse(localStorage.getItem('actualOrgId'))
      }
      this.downVoteComment(vote)
    },
    getImage (orgId, logo) {
      return 'https://stuttie-files.s3.us-east-2.amazonaws.com/' + orgId + '/' + logo
    }
  },
  computed: {
    ...mapState({
      store: state => state.company
    }),
    isUpVoted () {
      var isLiked = false
      var self = this
      this.comment.upVotes.forEach(function (item) {
        if (item.createdBy == JSON.parse(localStorage.getItem('organizationId'))) {
          self.likeId = item.id
          isLiked = true
        } else if (item.CreatedBy == JSON.parse(localStorage.getItem('organizationId'))) {
          self.likeId = item.id
          isLiked = true
        }
      })
      return isLiked
    },
    isDownVoted () {
      var isLiked = false
      var self = this
      this.comment.downVotes.forEach(function (item) {
        if (item.createdBy == JSON.parse(localStorage.getItem('organizationId'))) {
          self.likeId = item.id
          isLiked = true
        } else if (item.CreatedBy == JSON.parse(localStorage.getItem('organizationId'))) {
          self.likeId = item.id
          isLiked = true
        }
      })
      return isLiked
    }
  }
}

</script>

<style>
span {
    color: #525f7f;
}
button.btn.btn-light.disabled {
    color: gray !important;
}
</style>
