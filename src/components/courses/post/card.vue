<template>
  <div>
    <!--- \\\\\\\Post-->
    <div class="card gedf-card">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex justify-content-between align-items-center">
            <div class="mr-2">
              <b-img v-if="post.organizations.logo != null" class="rounded-circle" :src="getImage(post.organizations.userId,post.organizations.logo)" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
              <b-img v-if="post.organizations.logo == null" class="rounded-circle" src="/img/silhouette_large.png" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
            </div>
            <div class="ml-2">
              <div class="h5 m-0"><a href="#" @click="view(post.organizations)">@{{post.organizations.name}}</a></div>
              <div class="h7 m-0">{{post.subjects}}</div>
            </div>
          </div>
          <div>
            <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
              <template #button-content>
                <i class="fa fa-ellipsis-h"></i>
              </template>
              <b-dropdown-item @click="remove" v-if="post.organizations.organizationId == organizationId">Delete</b-dropdown-item>
              <b-dropdown-item @click="report">Report</b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>{{post.createdAt | moment('from', 'now') }}</div>
        <a class="card-link" href="#">
          <h5 class="card-title">{{post.name}}</h5>
        </a>
        <p class="card-text">
          {{post.body}}
        </p>
        <div v-if="post.tags != null">
          <span v-for="tag in post.tags.split(',')" class="badge badge-primary">{{tag}}</span>
        </div>
      </div>
      <div class="card-footer">
        <b-button-group size="sm">
          <b-button @click="like" variant="light"><i v-bind:class="isUserLiked ? 'fas fa-heart' : 'far fa-heart'"></i> Like {{post.likes.length > 0 ? post.likes.length : ""}}</b-button>
          <b-button @click="addComment" variant="light"><i class="far fa-comment"></i> Comment {{post.comments.length > 0 ? post.comments.length : ""}}</b-button>
          <!--<b-button variant="light"><i class="fas fa-share"></i> Share</b-button>-->
        </b-button-group>
        <b-list-group v-show="showComments">
          <b-list-group-item active class="flex-column align-items-start" v-for="comment in post.comments">
            <b-row>
              <b-col cols="1">
                <b-img v-if="comment.organizations.logo != null" class="rounded-circle" :src="getImage(comment.organizations.userId,comment.organizations.logo)" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
                <b-img v-if="comment.organizations.logo == null" class="rounded-circle" src="/img/silhouette_large.png" fluid alt="Responsive image" ref="imageReforg" width="45"></b-img>
              </b-col>
              <b-col cols="9"><h7>@{{comment.organizations.name}}</h7> <a href="#" v-if="comment.organizations.isTutor" @click="message(comment.organizations)">Message</a></b-col>
              <b-col cols="2"><small>{{comment.createdAt | moment('from', 'now') }}</small></b-col>
            </b-row>
            <p class="mb-1">
              {{comment.body}}
            </p>
          </b-list-group-item>
        </b-list-group>
        <div class="form-group" v-show="showComments">
          <label class="sr-only" for="message">Post</label>
          <textarea class="form-control" v-model="comment" id="message" rows="3" placeholder="Post a comment..."></textarea>
          <b-button variant="light" @click="postComment" v-if="comment != ''"><i class="fas fa-save"></i> Save</b-button>
        </div>
      </div>
    </div>
    <!-- Post /////-->
  </div>
</template>
<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import { BIcon, BIconEnvelope, BIconCircleFill, BIconCalendar3, BIconLock, BIconPlus, BIconPerson, BIconCursorFill } from 'bootstrap-vue'
export default {
  props: ['post', 'isshowcomments'],
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
  data () {
    return {
      info: '',
      showComments: false,
      comment: '',
      organizationId: JSON.parse(localStorage.getItem('actualOrgId')),
      likeId: 0
    }
  },
  methods: {
    ...mapActions('posts', [
      'getPosts',
      'likePost',
      'unLikePost',
      'deletePost',
      'commentPost',
      'selectUser'
    ]),
    ...mapActions('messages', [
      'getContacts',
      'getContact',
      'saveHistory',
      'selectContact',
      'getMessages',
      'filterContacts'
    ]),
    view (org) {
      this.selectUser(org)
      this.$bvModal.show('bv-modal-profile')
    },
    deleteMeeting (meeting) {
      this.$emit('meetingWasDelete', meeting)
    },
    addComment () {
      this.showComments = true
    },
    postComment () {
      var comment = {
        PostsId: this.post.id,
        CreatedBy: JSON.parse(localStorage.getItem('organizationId')),
        Body: this.comment,
        OrganizationsId: JSON.parse(localStorage.getItem('actualOrgId'))
      }
      var self = this
      this.commentPost(comment).then(function () {
        self.comment = ''
      })
    },
    like () {
      var like = {
        PostsId: this.post.id,
        CreatedBy: JSON.parse(localStorage.getItem('organizationId')),
        OrganizationsId: JSON.parse(localStorage.getItem('actualOrgId'))
      }
      if (this.isUserLiked) {
        like.id = this.likeId
        this.unLikePost(like)
      } else {
        this.likePost(like)
      }
    },
    remove () {
      this.deletePost(this.post)
    },
    message (org) {
      var actualOrgId = JSON.parse(localStorage.getItem('actualOrgId'))
      // save history
      var history = {
        organizationsId: actualOrgId,
        toOrganizationsId: org.organizationId,
        createdBy: org.organizationId,
        isDeleted: false
      }
      this.saveHistory(history)
      var data = {
        toOrganizationsId: org.organizationId,
        toOrganizations: org,
        organizationsId: this.post.organizations.organizationId,
        organizations: this.post.organizations
      }
      this.selectContact(data)
      this.$router.push({ path: '/portal/messages' })
    },
    report () {
      alert('Admin has been notified')
    },
    getImage (orgId, logo) {
      return 'https://stuttie-files.s3.us-east-2.amazonaws.com/' + orgId + '/' + logo
    }
  },
  updated () {
    if (this.isshowcomments == 'true') {
      this.showComments = true
    }
  },
  mounted () {
    axios
      .get('/portal/api/Meetings/' + this.msg.meetingId)
      .then(response => (this.info = response.data))
  },
  computed: {
    alert () {
      return this.$store.state.alert
    },
    ...mapState({
      companystore: state => state.company.company
    }),
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
    computedUrl () {
      return 'https://stuttie-files.s3.us-east-2.amazonaws.com/' + JSON.parse(localStorage.getItem('userId')) + '/' + this.partnerStore.displayPicture
    },
    computedUrlOrg () {
      return 'https://stuttie-files.s3.us-east-2.amazonaws.com/' + JSON.parse(localStorage.getItem('organizationId')) + '/' + this.companystore.logo
    },
    isUserLiked () {
      var isLiked = false
      var self = this
      this.post.likes.forEach(function (item) {
        if (item.createdBy == JSON.parse(localStorage.getItem('organizationId'))) {
          self.likeId = item.id
          isLiked = true
        }
      })
      return isLiked
    },
    setInitials () {
      var FirstLetter = this.partnerStore.givenName.substring(0, 1).toUpperCase()
      var secondLetter = this.partnerStore.familyName.substring(0, 1).toUpperCase()
      return FirstLetter + secondLetter
    },
    setInitialsOrg () {
      var name = this.companystore.name
      var res = name.split(' ')
      if (res.length == 1) { return res[0].substring(0, 1).toUpperCase() } else { return res[0].substring(0, 1).toUpperCase() + res[1].substring(0, 1).toUpperCase() }
    }
  }
}

</script>
<style>
  .card-link{

  }
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

  .card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 4px 10px #CFDEE66C;
  }
</style>
