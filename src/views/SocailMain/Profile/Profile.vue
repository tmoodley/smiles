<template>
  <b-row>
    <b-col sm="12">
        <iq-card class="iq-card">
          <div class="iq-card-body profile-page p-0">
              <div class="profile-header">
                <div class="cover-container">
                    <img src="../../../assets/images/page-img/profile-bg.png" alt="profile-bg" class="rounded img-fluid"> 
                    <!-- <ul class="header-nav d-flex flex-wrap justify-end p-0 m-0">
                      <li><a href="javascript:void(0);"><i class="ri-pencil-line"></i></a></li>
                      <li><a href="javascript:void(0);"><i class="ri-settings-4-line"></i></a></li>
                    </ul> -->
                </div> 
                <div class="user-detail text-center mb-3"> 
                    <div class="profile-img"> 
                      <img :src="logoUrl" v-if="logoUrl" alt="profile-img" class="avatar-130 img-fluid" />
                      <img src="/img/silhouette_large.png" v-else alt="profile-img" class="avatar-130 img-fluid" />
                    </div>
                    <div class="profile-detail">
                      <h3 class="">{{fullName}}</h3>
                    </div>
                </div>
                <div class="profile-info p-4 d-flex align-items-center justify-content-between position-relative">
                    <div class="social-links">
                      <ul class="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0"> 
                            <li class="text-center pr-3"> 
                                <a :href="store.company.facebookUrl"><img :src="require('../../../assets/images/icon/08.png')" class="img-fluid rounded" alt="facebook"></a>
                            </li>
                            <li class="text-center pr-3"> 
                              <a :href="store.company.twitterUrl"><img :src="require('../../../assets/images/icon/09.png')" class="img-fluid rounded" alt="facebook"></a>
                            </li>
                            <li class="text-center pr-3"> 
                              <a :href="store.company.linkedInUrl"><img :src="require('../../../assets/images/icon/13.png')" class="img-fluid rounded" alt="facebook"></a>
                            </li>
                            <li class="text-center pr-3"> 
                              <a :href="store.company.instagramUrl"><img :src="require('../../../assets/images/icon/10.png')" class="img-fluid rounded" alt="facebook"></a>
                            </li>
                            <li class="text-center pr-3"> 
                               <a :href="store.company.youtubeUrl"><img :src="require('../../../assets/images/icon/12.png')" class="img-fluid rounded" alt="facebook"></a>
                            </li>  
                      </ul>
                    </div>
                    <div class="social-info">
                      <ul class="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                          <li class="text-center pl-3">
                            <h6>Friends</h6>
                            <p class="mb-0">{{friends.length}}</p>
                          </li>
                      </ul>
                    </div>
                </div>
              </div>
          </div>
        </iq-card>
        <iq-card class="iq-card">
          <div class="iq-card-body p-0">
            <div class="user-tabing">
              <tab-nav :pills="true" id="pills-tab" class="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                <tab-nav-items class="col-sm-3 p-0" :active="true" id="pills-feed-tab" href="#profile-feed" ariaControls="pills-home" role="tab" :ariaSelected="true" title="Timeline" />
                <tab-nav-items class="col-sm-3 p-0" :active="false" id="pills-activity-tab" href="#profile-activity" ariaControls="pills-profile" role="tab" :ariaSelected="false" title="About" />
                <tab-nav-items class="col-sm-3 p-0" :active="false" id="pills-friend-tab" href="#profile-friends" ariaControls="pills-contact" role="tab" :ariaSelected="false" title="Friends" /> 
              </tab-nav>
            </div>
          </div>
        </iq-card>
    </b-col>
    <b-col sm="12">
      <div class="tab-content">
        <tab-content-item :active="true" id="profile-feed" aria-labelled-by="pills-feed-tab">
          <div class="iq-card-body p-0">
            <b-row>
              <b-col lg="4">  
                <iq-card>
                  <template v-slot:headerTitle>
                    <h4 class="card-title">Friends</h4>
                  </template>
                  <template v-slot:headerAction>
                    <p class="m-0"></p>
                  </template>
                  <template v-slot:body>
                    <ul class="profile-img-gallary d-flex flex-wrap p-0 m-0">
                      <li class="col-md-4 col-6 pl-2 pr-0 pb-3" v-for="(friend,index) in friends" :key="index">
                        <a href="#">
                          <img :src="friend.logoUrl" v-if="friend.logoUrl" alt="profile-img" class="img-fluid" />
                          <img src="/img/silhouette_large.png" v-else alt="profile-img" class="img-fluid" /> 
                          <h6 class="mt-2">{{friend.name}}</h6>
                        </a>
                      </li>
                    </ul>
                  </template>
                </iq-card>
              </b-col>
              <b-col lg="8">
                <div id="post-modal-data" class="iq-card">
                  <AddSocialPost @addPost="addPost"></AddSocialPost>
                  <DynamicScroller
                    class="scroller"
                    :items="posts"
                    :min-item-size="300"
                    style="height: 500px;"
                    :emitResize="true"
                    :prerender="10"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-distance="10"
                    infinite-scroll-disabled="busy"
                    key-field="id"
                  >
                    <template v-slot="{ item, index, active }">
                      <DynamicScrollerItem
                        :item="item"
                        :active="active"
                        :size-dependencies="[
                          item.body,
                        ]"
                        :data-index="index"
                      > 
                        <SocialPost :post="item"></SocialPost>  
                      </DynamicScrollerItem>
                    </template>
                  </DynamicScroller> 
                </div>
              </b-col>
            </b-row>
          </div>
        </tab-content-item>
        <tab-content-item :active="false" id="profile-activity" aria-labelled-by="pills-activity-tab">
          <div class="iq-card">
            <div class="iq-card-body">
               <About :work="store" :education="items" :info="partnerStore" :language="languages"/>
            </div>
          </div>
        </tab-content-item>
        <tab-content-item :active="false" id="profile-friends" aria-labelled-by="pills-friend-tab">
          <div class="iq-card">
            <div class="iq-card-body">
              <h2>Friends</h2>
                <FriendTab />
            </div>
          </div>
        </tab-content-item> 
      </div>
    </b-col> 
  </b-row>
</template>
<script>
import { socialvue } from '../../../config/pluginInit'
import ProfileImage from './ProfileImage'
import FriendTab from './ProfileFriends/FriendTab'
import About from './ProfileFriends/About'
import AddSocialPost from '../../Apps/Social/Components/AddSocialPost' 
import SocialPost from 'components/forum/SocialPost.vue'
import { mapState, mapActions } from "vuex";
export default {
  name: 'Profile',
  mounted () {
    this.OrganizationId = JSON.parse(localStorage.getItem("organizationId"));
    socialvue.index()
    let user = JSON.parse(localStorage.getItem('user')); 
    this.getPostsByUser(user.data.defaultRoomId); 
    this.getLanguages() 
    this.getCompany(this.OrganizationId)
  },
  components: {
    FriendTab,
    ProfileImage,
    AddSocialPost,
    SocialPost,
    About
  },
  computed: { 
    ...mapState({
      friends: State => State.friend.friends
    }),
    ...mapState({
      store: state => state.company
    }), 
    ...mapState({
      posts: state => state.posts.posts
    }),
    ...mapState({
      companystore: state => state.company.company
    }),
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
    ...mapState({
      languages: State => State.posts.languages
    }), 
    items() {
      if (this.store.company.educations != null) {
        return this.store.company.educations;
      } else {
        return [];
      }
    },
    fullName(){ 
      return this.partnerStore != null ? this.partnerStore.givenName + " " + this.partnerStore.familyName : ''; 
    },
    user () { 
      return this.$store.state.authentication.user.data
    },
    logoUrl(){  
      return this.store.company != null ? this.store.company.logoUrl : '';
    }
  },
  data () {
    return {
      OrganizationId: "", 
      social: [
        require('../../../assets/images/icon/08.png'),
        require('../../../assets/images/icon/09.png'),
        require('../../../assets/images/icon/10.png'), 
        require('../../../assets/images/icon/12.png'),
        require('../../../assets/images/icon/13.png')
      ], 
    }
  },
  methods: {
    addPost (post) {
      this.socialPosts.unshift(post)
    },
    ...mapActions('company', [
      'getCompany',
      'updateCompany'
    ]),
    ...mapActions("posts", [
      "getSubjects",
      "getChannels",
      "getPosts",
      "saveSubject",
      "getPostsBySubject",
      "getSchoolPostsBySubject",
      "getPostsBySubjectPage",
      "getPostsByTopicPage",
      "getPostsByChannelPage",
      "selectUser",
      "getFilterPosts",
      "getPostsByUser",
      "getOrgByHandle"
    ]),
    ...mapActions('posts', [
      'getLanguages'
    ]),
    
  }
}
</script>
