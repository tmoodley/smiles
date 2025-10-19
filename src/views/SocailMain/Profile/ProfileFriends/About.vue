<template>
  <div class="row">
    <div class="col-md-3">
      <tab-nav
        :pills="true"
        id="tab"
        class="nav nav-pills basic-info-items list-inline d-block p-0 m-0"
      >
        <tab-nav-items
          :active="true"
          id="pills-contact-info"
          href="#contact-info"
          ariaControls="pills-contact-info"
          role="tab"
          :ariaSelected="true"
          title="Contact and Basic Info"
        /> 
        <tab-nav-items
          :active="false"
          id="pills-work-info"
          href="#work-info"
          ariaControls="pills-work-info"
          role="tab"
          :ariaSelected="true"
          title="Education"
        />
        <!-- <tab-nav-items :active="false" id="pills-address-info" href="#address-info" ariaControls="pills-address-info" role="tab" :ariaSelected="true" title="Places You've Lived" /> -->
        <tab-nav-items
          :active="false"
          id="pills-about-info"
          href="#about-info"
          ariaControls="pills-about-info"
          role="tab"
          :ariaSelected="true"
          title="Details About You"
        />
      </tab-nav>
    </div>
    <div class="col-md-9">
      <div class="tab-content">
        <tab-content-item
          :active="true"
          id="contact-info"
          aria-labelled-by="pills-contact-info"
        >
          <h4>Contact Information</h4>
          <hr />
          <div class="row">
            <div class="col-3">
              <h6>Email</h6>
            </div>
            <div class="col-9">
              <p class="mb-0">{{ info.emailAddress }}</p>
            </div>
            <div class="col-3">
              <h6>Mobile</h6>
            </div>
            <div class="col-9">
              <p class="mb-0">{{ info.phoneNumber }}</p>
            </div>
            <div class="col-3">
              <h6>Address</h6>
            </div>
            <div class="col-9">
              <p class="mb-0">{{ info.address1 }}</p>
            </div>
          </div>
          <h4 class="mt-3">Websites and Social Links</h4>
          <hr />
          <div class="row">
            <div class="col-3">
              <h6>Website</h6>
            </div>
            <div class="col-9">
              <p class="mb-0">{{ store.company.personalWebsiteUrl }}</p>
            </div> 
          </div> 
          <h4 class="mt-3">Basic Information</h4>
          <hr />
          <div class="row">
            <div class="col-3">
              <h6>Birth Date</h6>
            </div>
            <div class="col-9">  
              <p class="mb-0" v-if="isDateEdit === false">{{ $moment(partnerStore.birthday).format("DD/MM/YYYY") }} <a style="cursor:pointer" @click="isDateEdit = true"><i class="ri-edit-line mr-2"></i>Edit</a></p> 
              <p class="mb-0" v-else><b-form-datepicker v-model="partnerStore.birthday" locale="en"></b-form-datepicker> <a style="cursor:pointer" @click="updateDate()"><i class="ri-edit-line mr-2"></i>Update</a></p>
            </div> 
            <div class="col-3">
              <h6>Gender</h6>
            </div>
            <div class="col-9">
              <p class="mb-0" v-if="store.company.gender == 'm'">Male</p>
              <p class="mb-0" v-else>Female</p>
            </div>
            <div class="col-3">
              <h6>Language</h6>
            </div>
            <div class="col-9 d-flex">
              <p v-for="(val, index) in company.organizationLanguages" :key="index" class="mb-0">
                {{ `${val.language.name}` }}{{index+1 === company.organizationLanguages.length ? '': ','}}
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <h6>Relationship Status</h6>
            </div>
            <div class="col-9">
              <p class="mb-0">{{ store.company.relationshipStatus }}</p>
            </div> 
          </div>
          <div>
            <button class="bg-primary border-0 mt-4 px-4 rounded">
              Edit
            </button>
          </div>
        </tab-content-item> 
        <tab-content-item
          :active="false"
          id="work-info"
          aria-labelled-by="pills-work-info"
        >
          <!-- <h4 class="mb-3">Professional Skills</h4>
          <ul class="suggestions-lists m-0 p-0">
            <li class="d-flex mb-4 align-items-center">
              <div class="user-img img-fluid"><i class="ri-add-fill"></i></div>
              <div class="media-support-info ml-3">
                <h6>Add Professional Skills</h6>
              </div>
            </li>
          </ul> -->
          <h4 class="mt-3 mb-3">Educational Institution</h4>
          <ul class="suggestions-lists m-0 p-0"> 
            <li
              class="d-flex mb-4 align-items-center"
              v-for="(edu, index) in edu_history"
              :key="index"
            > 
              <div class="media-support-info ml-3">
                <h6>{{ edu.name }}</h6>
                <p class="mb-0">{{ edu.degree }} {{ edu.startYear }} - {{ edu.endYear }}</p>
              </div> 
            </li>
          </ul>
        </tab-content-item>
        <tab-content-item
          :active="false"
          id="address-info"
          aria-labelled-by="pills-address-info"
        >
          <h4 class="mb-3">Current City and Hometown</h4>
          <ul class="suggestions-lists m-0 p-0">
            <li class="d-flex mb-4 align-items-center">
              <div class="user-img img-fluid">
                <img
                  src="../../../../assets/images/user/01.jpg"
                  alt="story-img"
                  class="rounded-circle avatar-40"
                />
              </div>
              <div class="media-support-info ml-3">
                <h6>Georgia</h6>
                <p class="mb-0">Georgia State</p>
              </div>
              <div class="edit-relation">
                <a href="#"><i class="ri-edit-line mr-2"></i>Edit</a>
              </div>
            </li>
          </ul>
          <h4 class="mt-3 mb-3">Other Places Lived</h4>
          <ul class="suggestions-lists m-0 p-0">
            <li class="d-flex mb-4 align-items-center">
              <div class="user-img img-fluid"><i class="ri-add-fill"></i></div>
              <div class="media-support-info ml-3">
                <h6>Add Place</h6>
              </div>
            </li>
          </ul>
        </tab-content-item>
        <tab-content-item
          :active="false"
          id="about-info"
          aria-labelled-by="pills-about-info"
        >
          <h4 class="mb-3">About You</h4>
          <p>
            {{store.company.description}}
          </p>
             <div class="row">
            <div class="col-3">
              <h6>Favorite Quote</h6>
            </div>
            <div class="col-9">
                <p class="mb-0">{{ store.company.favoriteQuotes }}</p>
              </div> 
            </div> 
        </tab-content-item>
      </div>
    </div>
  </div>
</template>
<script>
import { socialvue } from "../../../../config/pluginInit";
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default {
  props: ["info", "language", "work", "education"],
  name: "About",
  mounted() {
    socialvue.index();
    this.edu_history=this.education 
  },
  watch:{
     edu_history(newVal,oldVal){
       console.log('new',newVal,'Old',oldVal)
     }
  },
   computed: { 
    ...mapState({
      friends: State => State.friend.friends
    }),
    ...mapState({
      store: state => state.company
    }),
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
    ...mapState({
      company: state => state.company.company
    })
  },
  data() {
    return {
      edu_history:[], 
      isDateEdit: false
    };
  },
  methods: {
    ...mapActions("company", ["getCompany", "updateCompany"]),
     ...mapActions("partner", ["updatePartner"]),
    updateDate() { 
        var partner = { ...this.partnerStore };  
        partner.Id = JSON.parse(localStorage.getItem('userId'));
        this.updatePartner(partner); 
        this.isDateEdit = false;  
    },
  }
};
</script>
