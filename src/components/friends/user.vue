<template>
  <div>
    <b-container class="p-0 mt-3" fluid>
      <div class="card pr-4">
        <b-row class="mt-2 ">
          <b-col sm="4" md="5" lg="2">
            <div class="p-2 mt-2 mb-2">
              <b-row :no-gutters="true">
                <b-col cols="12">
                  <b-img
                    @click="view(user)"
                    v-if="user.logo != null"
                    class="rounded-circle"
                    :src="getImage(user.userId, user.logo)"
                    fluid
                    alt="Responsive image"
                    ref="imageReforg"
                    width="85"
                  ></b-img>
                  <b-img
                    @click="view(user)"
                    v-if="user.logo == null"
                    class="rounded-circle"
                    src="/img/silhouette_large.png"
                    fluid
                    alt="Responsive image"
                    ref="imageReforg"
                    width="85"
                  ></b-img>
                </b-col>
              </b-row>
            </div>
          </b-col>
          <b-col sm="8" md="7" class="p-2">
            <b-row class="mt-3">
              <b-col cols="12">
                <b-row>
                  <b-col>
                    <p
                      class=" ml-2 mt-2"
                      style="font-size:24px;color:#01151C; font-weight:bold; margin:0px"
                      @click="view(user)"
                    >
                      {{ user.name }}
                    </p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <p class=" ml-2 mt-2" style="font-size: 14px;">
                      {{ user.description }}
                    </p>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="6" sm="6" md="6" lg="3" xl="3" class="p-2">
            <i
              class="fa fa-female"
              aria-hidden="true"
              v-if="user.gender == 'f'"
            ></i>
            <i
              class="fa fa-male"
              aria-hidden="true"
              v-if="user.gender == 'm'"
            ></i>
            <i
              class="fas fa-chalkboard-teacher"
              v-if="user.isTutor"
              v-b-tooltip.hover
              title="Tutor"
            ></i>
            <i
              class="fas fa-graduation-cap"
              v-if="!user.isTutor"
              v-b-tooltip.hover
              title="Student"
            ></i>
            <br />
            <b-button-group class="mt-4"> 
              <button
                class="btn btn1 border border-dark"
                @click="onFriendAdd(user)"
                v-if="isRequested === 'add'"
              >
                Add Friend
              </button>
              <button
                class="btn btn-primary  border border-dark"
                v-if="isRequested === 'pending'"
              >
                Request Sent
              </button>
              <button
                class="btn btn-primary  border border-dark"
                v-if="isRequested === 'accepted'"
              >
                Friends
              </button>
              <b-button
                variant="primary"
                @click="approve(user)"
                v-if="mode == 'requests'"
                >Approve</b-button
              >
              <b-button
                variant="danger"
                @click="remove(user)"
                v-if="mode == 'requests' || mode == 'all'"
                >Remove</b-button
              >
            </b-button-group>
          </b-col>
          <b-col cols="1" sm="1" md="1" lg="1" xl="1">
            <div style="margin-top: 12px;">
              <b-dropdown
                variant="white"
                no-caret
                class="p-0 mt-3 hover-drop"
                style="z-index:unset"
              >
                <template v-slot:button-content>
                  <b-icon
                    icon="three-dots-vertical"
                    class="mt-2"
                    font-scale="2"
                  ></b-icon>
                </template>
                <b-dropdown-item class="dropdown"
                  ><span style="color:#01151C"
                    >View Details</span
                  ></b-dropdown-item
                >
                <b-dropdown-item class="dropdown"
                  ><span style="color:#01151C"
                    >Resend Invites</span
                  ></b-dropdown-item
                >
              </b-dropdown>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["user"],
  components: {},
  data() {
    return {
      meetingTodeleteId: "",
      Id: JSON.parse(localStorage.getItem("actualOrgId")) 
    };
  },
  methods: {
    ...mapActions("messages", [
      "getContacts",
      "getContact",
      "saveHistory",
      "selectContact",
      "getMessages",
      "filterContacts",
      "setSelectedContact"
    ]),
    ...mapActions("posts", ["selectUser"]),
    ...mapActions("friend", ["addFriend", 
      "approveFriend", 
      "removeFriend",    
      "getFriends",
      "getFriendRequests",
      "getFriendSuggestions",
      "getUsers",
      "getUsersByFilter",
      "filterUserGender",
      "filterUserByEmail",
      "filterUserByName"]),
    getImage(orgId, logo) {
      return (
        "https://stuttie-files.s3.us-east-2.amazonaws.com/" + orgId + "/" + logo
      );
    },
    view(org) {
      this.selectUser(org);
      this.$bvModal.show("bv-modal-profile");
    },
    onFriendAdd(org) { 
      //save history
      var orgFriend = {
        createAt: new Date(),
        organizationId: JSON.parse(localStorage.getItem("actualOrgId")),
        friendId: org.organizationId
      };  
      let self = this;
      this.addFriend(orgFriend).then(function(){
        self.$swal.fire({
            title: 'Request Sent!',
            text: 'Your Friend Request has been sent.',
            icon: 'success',
            timer: 3000
        });  
        if(self.filterType === 'getUsersByFilter'){
            self.getUsersByFilter(self.query)
          } else if(self.filterType === 'filterUserGender'){
            self.filterUserGender(self.query)
          } else if(self.filterType === 'filterUserByEmail'){
            self.filterUserByEmail(self.query)
          } else if(self.filterType === 'filterUserByName'){
            self.filterUserByName(self.query)
          }
      });
    },
    approve(org) {
      var actualOrgId = JSON.parse(localStorage.getItem("actualOrgId"));
      //save history
      var orgFriend = {
        createAt: new Date(),
        organizationId: actualOrgId,
        friendId: org.organizationId
      };
      let self = this;
      this.approveFriend(orgFriend).then(function(){
          if(self.filterType === 'getUsersByFilter'){
            self.getUsersByFilter(self.query)
          } else if(self.filterType === 'filterUserGender'){
            self.filterUserGender(self.query)
          } else if(self.filterType === 'filterUserByEmail'){
            self.filterUserByEmail(self.query)
          } else if(self.filterType === 'filterUserByName'){
            self.filterUserByName(self.query)
          }
      }); 
    },
    remove(org) {
      var actualOrgId = JSON.parse(localStorage.getItem("actualOrgId"));
      //save history
      var orgFriend = {
        createAt: new Date(),
        organizationId: actualOrgId,
        friendId: org.organizationId
      };
      this.removeFriend(orgFriend);
    }
  },
  computed: {
    ...mapState({
      query: State => State.friend.query
    }), 
    ...mapState({
      filterType: State => State.friend.filterType
    }),
    ...mapState({
      companystore: state => state.company.company
    }),
    isRequested() {
      let isFriend = "add";
      var self = this;
      this.user.organizationFriends.every(function(val) { 
          if (val.friendId === self.Id || val.organizationId === self.Id) {
          //friend request sent
          if (val.isAccepted) {
            //become friends
            isFriend = "accepted";
            return false;
          } else { 
            isFriend = "pending";
            return false;
          }
        }
        return true;
      }); 
      return isFriend;
    }, 
    ...mapState({
      mode: state => state.friend.mode
    })
  },
  mounted: function() {
    console.log("USers", this.Id);
  }
};
</script>

<style scoped>
.left-align {
  position: relative;
  float: right;
}
.dropdown {
  color: #01151c;
  font-size: 15px;
  font-weight: bold;
}
.btn1 {
  width: 100%;
}
.fadeClass {
  opacity: 0.5;
}
.fadeBackground {
  background: #fcfcfe;
}

.main-container {
  cursor: pointer;
}

.hover-drop {
  visibility: hidden;
}

.main-container:hover .hover-drop,
.main-container.hover .hover-drop {
  visibility: visible;
}

.main-hover-div:focus {
  outline: none;
}
.no-gutters > .col,
.no-gutters > [class*="col-"] {
  padding-right: 0;
  padding-left: 15px;
}
</style>
