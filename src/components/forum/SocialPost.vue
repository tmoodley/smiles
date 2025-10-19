<template>
  <iq-card body-class="p-0">
    <template v-slot:body>
      <div class="-data p-3">
        <div class="d-flex flex-wrap">
          <div class="media-support-user-img mr-3">
              <b-img @click="view(post.organizations)" fluid v-if="post.organizations.logo != null" :src="post.organizations.logoUrl" alt="Responsive image" ref="imageReforg" rounded="circle"></b-img>
              <b-img @click="view(post.organizations)" fluid v-if="post.organizations.logo == null" src="/img/silhouette_large.png" alt="Responsive image" ref="imageReforg" rounded="circle"></b-img>
          </div>
          <div class="media-support-info mt-2">
            <h5 class="mb-0"><b-link href="javascript:void(0)" class="">{{post.organizations.defaultRoomId}}</b-link></h5>
            <p class="mb-0 text-primary">{{post.createdAt | formatDate }}</p>
          </div>
          <div class="iq-card-header-toolbar d-flex align-items-center">
            <b-dropdown id="dropdownMenuButton40" right variant="none" menu-class="p-0">
              <template v-slot:button-content>
                <b-link href="javascript:void(0)" class="text-secondary"><i class="ml-3 ri-more-2-line"></i></b-link>
              </template>
              <a class="dropdown-item p-3" href="javascript:void(0)" @click="isFollowed(!post.is_follow)">
                <div class="d-flex align-items-top">
                  <div class="icon font-size-20"><i class="ri-user-unfollow-line"></i></div>
                  <div class="data ml-2">
                    <span v-if="post.is_follow">
                      <h6>  Unfollow User</h6>
                    </span>
                    <span v-else>
                      <h6>  Follow User</h6>
                    </span>
                    <p class="mb-0">Stop seeing posts but stay friends.</p>
                  </div>
                </div>
              </a>
              <a href="javascript:void(0)" class="dropdown-item p-3">
                <div class="d-flex align-items-top">
                  <div class="icon font-size-20"><i class="ri-save-line"></i></div>
                  <div class="data ml-2">
                    <h6>Save Post</h6>
                    <p class="mb-0">Add this to your saved items</p>
                  </div>
                </div>
              </a>
              <a href="javascript:void(0)" class="dropdown-item p-3">
                <div class="d-flex align-items-top">
                  <div class="icon font-size-20"><i class="ri-close-circle-line"></i></div>
                  <div class="data ml-2">
                    <h6>Hide Post</h6>
                    <p class="mb-0">See fewer posts like this.</p>
                  </div>
                </div>
              </a>
              <a class="dropdown-item p-3" href="javascript:void(0)">
                <div class="d-flex align-items-top">
                  <div class="icon font-size-20"><i class="ri-notification-line"></i></div>
                  <div class="data ml-2">
                    <h6>Notifications</h6>
                    <p class="mb-0">Turn on notifications for this post</p>
                  </div>
                </div>
              </a>
            </b-dropdown>
          </div>
        </div>
      </div>
    </template>
    <div class=""> 
      <p class="p-2">
        <span v-html="post.body"></span>
      </p>
      <b-img fluid v-if="post.document != null && (post.document.extension == '.jpg' || comment.document.extension == '.jpeg' || post.document.extension == '.png')" v-bind="mainProps" :src="post.document.name" alt="Image 8"></b-img> <br />
      <div class="p-2" v-if="post.tags != null">
        <span v-for="tag in post.tags.split(',')" class="badge badge-primary">{{tag}}</span>
      </div> 
    </div>
    <div class="comment-area p-3">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center justify-content-between">
          <div class="like-block position-relative d-flex align-items-center">
            <div class="d-flex align-items-center">
              <b-button-group size="sm">
                <b-button @click="like" variant="light"><i v-bind:class="isUserLiked() ? 'fas fa-heart' : 'far fa-heart'"></i> Like {{post.likes.length > 0 ? post.likes.length : ""}}</b-button>
                <b-button @click="addComment" variant="light"><i class="far fa-comment"></i> Answer {{post.comments.length > 0 ? post.comments.length : ""}}</b-button>
              </b-button-group>  
            </div> 
          </div>
        </div>
        <div class="share-block d-flex align-items-center feather-icon mr-3">
          <b-button variant="light" style="float:right" target="self" :href="post.document != null ? post.document.name : ''" v-if="post.document != null"><i class="fas fa-download"></i> Download Attachment {{post.document != null ? post.document.extension : ''}}</b-button>
        </div>
      </div>
      <hr>
      <ul class="post-comments p-0 m-0">
        <li class="mb-2" v-for="(comment, postCommentIndex) in post.comments" :key="postCommentIndex">
          <comment :comment="comment"></comment> 
        </li>
      </ul>  
      <b-form class="comment-text d-flex align-items-center mt-3" v-if="!showComments"> 
        <b-form-input type="text" @click="showComments=!showComments" class="rounded" placeholder="" />
        <div class="comment-attagement d-flex">
          <b-link href="javascript:void(0);"><i class="ri-link mr-3" @click="saveComment(commentMessage)"></i></b-link>
          <i class="ri-user-smile-line mr-3"></i>
          <i class="ri-camera-line mr-3" ></i>
        </div>
      </b-form>
      <b-form class="comment-text d-flex align-items-center mt-3" v-if="showComments">
          <b-row>
            <b-col cols="11" lg="11">
              <wysiwyg v-model="comment" />
            </b-col>
            <b-col cols="3" lg="3" xl="3"> 
              <b-button variant="light" style="float:right" target="self" @click="showUpload=!showUpload" v-if="!showUpload"><i class="fas fa-upload"></i> Upload File </b-button>
              <document @setid="setDocumentId" v-if="showUpload"></document>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" lg="12" xl="12">
              <b-button variant="light" @click="postComment" :disabled="comment == ''">
                <i class="fas fa-save"></i> Post
              </b-button>
            </b-col> 
          </b-row> 
      </b-form>
    </div>
</iq-card>
</template>
<script>
import comment from "components/forum/post/comment.vue";
import document from 'components/forum/post/document.vue'
import { mapState, mapActions } from "vuex"; 
export default {
  name: 'SocialPost',
  props: [
    'post'
  ],
  components: {  
    comment, document
  },
  data () {
    return {
      commentMessage: '',
      showComments: false,
      showUpload: false
    }
  },
  methods: {
      ...mapActions("posts", [
      "getPosts",
      "likePost",
      "unLikePost",
      "deletePost",
      "commentPost",
      "selectUser"
    ]),
    ...mapActions("messages", [
      "getContacts",
      "getContact",
      "saveHistory",
      "selectContact",
      "getMessages",
      "filterContacts"
    ]),
    setDocumentId(id) {
      this.documentId = id;
    },
    download(id) {
      axios({
        url: "https://stuttie.com/api/documents/" + id,

        method: "GET"
      }).then(function(doc) {
        axios({
          url: "https://stuttie.com/api/document/" + id,

          method: "GET",

          responseType: "blob"
        }).then(response => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));

          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", doc.data.name);

          document.body.appendChild(fileLink);

          fileLink.click();
        });
      });
    },
    view(org) {
      this.selectUser(org);
      this.$bvModal.show("bv-modal-profile");
    },
    deleteMeeting(meeting) {
      this.$emit("meetingWasDelete", meeting);
    },
    addComment() {
      this.showComments = true;
    },
    postComment() {
      var comment = {
        PostsId: this.post.id,
        CreatedBy: JSON.parse(localStorage.getItem("organizationId")),
        Body: this.comment,
        OrganizationsId: JSON.parse(localStorage.getItem("actualOrgId")),
        DocumentId: this.documentId
      };
      var self = this;
      this.commentPost(comment).then(function() {
        self.comment = "";
      });
    },
    like() {
      var like = {
        PostsId: this.post.id,
        CreatedBy: JSON.parse(localStorage.getItem("organizationId")),
        OrganizationsId: JSON.parse(localStorage.getItem("actualOrgId"))
      };
      if (this.isUserLiked()) {
        // unlike api is not ready yet commenting the bellow code
        // like.id = this.likeId;
        // this.unLikePost(like);
      } else {       
        this.likePost(like);
      }
    },
    remove() {
      this.deletePost(this.post);
    },
    message(org) {
      var actualOrgId = JSON.parse(localStorage.getItem("actualOrgId"));
      //save history
      var history = {
        organizationsId: actualOrgId,
        toOrganizationsId: org.organizationId,
        createdBy: org.organizationId,
        isDeleted: false
      };
      this.saveHistory(history);
      var data = {
        toOrganizationsId: org.organizationId,
        toOrganizations: org,
        organizationsId: this.post.organizations.organizationId,
        organizations: this.post.organizations
      };
      this.selectContact(data);
      this.$router.push({ path: "/portal/messages" });
    },
    report() {
      alert("Admin has been notified");
    },
    getImage(orgId, logo) {
      return (
        "https://stuttie-files.s3.us-east-2.amazonaws.com/" + orgId + "/" + logo
      );
    },
    isUserLiked(){
      var actualOrgId = JSON.parse(localStorage.getItem("actualOrgId"));
      var likedObject = this.post.likes.find(x=>x.organizationsId === actualOrgId);
      return likedObject && !!Object.keys(likedObject).length;
    }
  }
}
</script>

<style>
  .dropdown-item{
    color: #212529 !important;
  }
  .dropdown-menu .dropdown-item:focus, .dropdown-menu .dropdown-item:hover{
    background: transparent;
    color: var(--iq-primary) !important;
  }
</style>