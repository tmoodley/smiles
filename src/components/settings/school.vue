<template>
  <b-container fluid class="background">
    <b-container fluid class="background" v-if="form == ''">
      <b-row no-gutters>
        <b-col>
          <p class="no-padding-margin heading">School Profile</p>
          <p class="no-padding-margin sub-title">School Information.</p>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center">
        <b-col md="auto">
          <p class="noMeetingText" style="font-weight: 600;letter-spacing: 0.1px;">You don't have an assigned school.</p>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center" style="margin-top:30px">
        <b-col md="auto">
          <b-button @click="$bvModal.show('bv-modal-find-school')" class="btnCls" ref="createMeeting">Find School</b-button>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center" style="margin-top:30px" v-if="companystore.isTutor">
        <b-col md="auto">
          <b-button @click="$bvModal.show('bv-create-school')" class="btnCls">Create School</b-button>
        </b-col>
      </b-row>
    </b-container>
    <div class="card" v-else>
      <b-row no-gutters>
        <b-col>
          <p class="no-padding-margin heading">School Profile</p>
          <p class="no-padding-margin sub-title">School Information.</p>
        </b-col>
      </b-row>
      <b-container fluid>
        <form ref="form">
          <b-row>
            <b-col cols="4">
              <div class="form-group">
                <label for="Name" class="control-label">Name</label>
                <b-form-input plaintext v-model="form.name" class="form-control" placeholder="Enter School Name" />
                <span asp-validation-for="Name" class="text-danger"></span>
              </div>
            </b-col>
            <b-col cols="4">
              <div class="form-group" v-show="canEdit">
                <label for="Code" class="control-label">Access Code</label>
                <b-form-input plaintext v-model="form.code" class="form-control" placeholder="Enter Access Code" />
                <span asp-validation-for="Code" class="text-danger"></span>
              </div>
            </b-col>
            <b-col cols="4">
              <div class="container" style="padding-top:3%" v-if="canEdit">
                <b-img v-b-hover="handleHover" style="max-width:20%;" center :src="dbImgURL" blank-color="blue" fluid data-toggle="modal" data-target="#imageCropModalOrg" @error="imgError" ref="imageRef"></b-img>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="8">
              <div class="form-group">
                <label for="Description" class="control-label">Description</label>
                <b-form-input plaintext v-model="form.description" class="form-control" />
                <span asp-validation-for="Description" class="text-danger"></span>
              </div>
            </b-col>
            <b-col cols="2">
              <div class="form-group">
                <label for="PhoneNumber" class="control-label">Phone Number</label>
                <b-form-input plaintext v-model="form.phoneNumber" class="form-control" />
                <span asp-validation-for="PhoneNumber" class="text-danger"></span>
              </div>
            </b-col>
            <b-col cols="2">
              <div class="form-group">
                <label for="Website" class="control-label">Website</label>
                <b-form-input plaintext v-model="form.website" class="form-control" />
                <span asp-validation-for="Website" class="text-danger"></span>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4">
              <div class="form-group">
                <label for="Address1" class="control-label">Address1</label>
                <b-form-input plaintext v-model="form.address1" class="form-control" />
                <span asp-validation-for="Address1" class="text-danger"></span>
              </div>
            </b-col>
            <b-col cols="4">
              <div class="form-group">
                <label for="Address2" class="control-label">Address2</label>
                <b-form-input plaintext v-model="form.address2" class="form-control" />
                <span asp-validation-for="Address2" class="text-danger"></span>
              </div>
            </b-col>
            <b-col cols="4">
              <div class="form-group">
                <label for="City" class="control-label">City</label>
                <b-form-input plaintext v-model="form.city" class="form-control" />
                <span asp-validation-for="City" class="text-danger"></span>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4">
              <div class="form-group">
                <label for="State" class="control-label">State/Province</label>
                <b-form-input plaintext v-model="form.state" class="form-control" />
                <span asp-validation-for="State" class="text-danger"></span>
              </div>
            </b-col>
            <b-col cols="4">
              <div class="form-group">
                <label for="PostalCode" class="control-label">Postal Code</label>
                <b-form-input plaintext v-model="form.postalCode" class="form-control" />
                <span asp-validation-for="PostalCode" class="text-danger"></span>
              </div>
            </b-col>
            <b-col cols="4">
              <div class="form-group">
                <label for="Country" class="control-label">Country</label>
                <b-form-select disabled id="ratio" v-model="form.countryId" style="font-size:15px; font-weight:bold; color:#01151C" :options="countries"></b-form-select>
              </div>
            </b-col>
          </b-row>
        </form>
      </b-container>
      <b-container>
        <b-row class="justify-content-md-center" v-if="canEdit">
          <b-col md="auto">
            <b-button @click="$bvModal.show('bv-modal-school')" class="btnCls">Modify School</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <createSchool></createSchool>
    <schoolProfile></schoolProfile>
    <findSchool></findSchool>
    <imageCropModal title="imageCropper" @update-org-logo="updateImage($event)"></imageCropModal>
  </b-container>
</template>
//always have the file name or object in a one variable so u can validate it and change the request url
<script>
import { BIcon, BIconChevronRight } from 'bootstrap-vue'
import { mapState, mapActions } from 'vuex'
import schoolProfile from './school/profile.vue'
import createSchool from './school/create.vue'
import findSchool from './school/find-school.vue'
import imageCropModal from './school/image-crop-organization.vue'
import axios from 'axios'
export default {
  components: {
    BIcon,
    BIconChevronRight,
    schoolProfile,
    findSchool,
    createSchool,
    imageCropModal
  },
  data () {
    return {
      OrganizationId: '',
      countries: [],
      selectedImgURL: '/uploads/localhost/default-img.svg'
    }
  },
  methods: {
    ...mapActions('school', [
      'getSchoolByOrg',
      'getSchoolAdminByOrg',
      'addSchool',
      'updateSchool'
    ]),
    getCountries: function () {
      axios
        .get('/api/Countries')
        .then(response => {
          this.countries = response.data.map(function (country) {
            return {
              value: country.id,
              text: country.name
            }
          })
        })
    },
    imgError () {
      this.$refs.imageRef.src = '/uploads/localhost/profile_pic.png'
    }
  },
  computed: {
    ...mapState({
      form: state => state.school.school
    }),
    ...mapState({
      companystore: state => state.company.company
    }),
    canEdit: function () {
      return this.form.organizationsId == this.OrganizationId
    },
    dbImgURL: function () {
      if (this.form.logo != null) {
        return 'https://stuttie-files.s3.us-east-2.amazonaws.com/' + this.form.id + '/' + this.form.logo
      } else {
        return this.selectedImgURL
      }
    }
  },
  mounted: function () {
    this.OrganizationId = JSON.parse(localStorage.getItem('actualOrgId'))
    this.getSchoolAdminByOrg(this.OrganizationId)
    this.getSchoolByOrg(this.OrganizationId)
    this.getCountries()
  }
}

</script>

<style scoped>

  .main-container {
    position: relative;
    margin-top: 80px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    opacity: 1;
    text-align: center;
    color: #01151C;
    padding: 0px
  }

  p {
    text-align: center
  }

  .btnCls {
    background-color: var(--success);
    width: 250px;
    height: 62px;
    font-size: 19px;
    border: none;
    padding-left: 40px;
    padding-right: 40px;
    border-radius: 7px;
    margin-top: 30px;
    margin-bottom: 30px
  }

    .btnCls:hover {
      background-color: #02A04A;
    }
  .background {
    background-color:white
  }
  .no-padding-margin {
    padding:0px !important;
    margin:0px !important;
       padding-left: 0px !important;
  }
  .heading {
    color: #01151C;
    font-size:30px;
    font-weight:bold
  }
  .sub-title {
    color: #576367;
    font-size:13px
  }

  .content-div {
    position: relative;
    width: 100%;
    min-height: 15px;
    overflow: auto;
  }

  .content-p {
    position: relative;
    float: left;
    margin-left: 20px;
    margin-top: 5px;
  }

  .content-heading-fonts {
    font-weight:500;
    color: #01151C;
  }

  .content-desc-fonts {
    font-weight: 500;
    color: #4B95E9;
  }

  .border-bottom {
    border-bottom: 1px solid #BFCED5;
  }

  .hover-section:hover{
    background:red;
  }
  .image-upload-div {
    width: 100%;
    height: 329px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 2px dashed #BFCED5;
    border-radius: 10px 10px 0px 0px;
    cursor:pointer
  }

  @media (min-width: 768px) {
    .content-div {
      position: relative;
      width: 100%;
      min-height: 75px;
      overflow: auto;
    }

    .content-p {
      position: relative;
      float: left;
      margin-left: 20px;
      margin-top: 20px;
    }
    .font-background-pic {
      color: #01151C;
      font-size: 18px;
      font-weight: bold
    }

    .row-hover:hover {
      cursor:pointer
    }

    .dragginImage {
      background: #E8F4ED;
    }

    .template-img {
      width: 100%;
      min-width: 100px;
      height: 60px;
      cursor: pointer
    }

  }

</style>
