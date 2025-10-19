<template>
  <!-- Modal -->
  <div class="modal fade" id="imageCropModalOrg" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" style="font-size:15px; font-weight:bold; color:#01151C" id="exampleModalLabel">Organization Logo</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <b-form>
          <div class="modal-body" style="padding-left:7%;padding-right:7%">
            <div class="row">
              <vue-cropper :min-container-width="450" :min-container-height="300"
                           ref="cropper"
                           :src="imageFound ? dbImgURL : selectedImgURL"
                           alt="Source Image"
                           :img-style="{ 'width': '100%', 'height': '300px' }"
                           :aspectRatio="1/1"
                           :initialAspectRatio="1/1"
                           @ready="ready"
                           @cropstart="cropstart"
                           @cropmove="cropmove"
                           @cropend="cropend"
                           @crop="crop"
                           @zoom="zoom"
                           @error="imgError"></vue-cropper>
            </div>
            <div class="row" style="padding-right:5%; padding-top:5%">
              <div style="margin-left:15%">
                <b-col cols="3">
                  <b-icon-image class="icon" aria-hidden="true"></b-icon-image>
                </b-col>
              </div>
              <b-col cols="6">
                <vue-slider class="antd" tooltip='none' @change="changeSize()"
                            :process-style="{backgroundColor:'#1cc88a'}"
                            :data="[-10, -9, -8, -7, -6, -5, -4, -3,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10]"
                            v-model="value"></vue-slider>
              </b-col>
              <b-col cols="3">
                <b-icon icon="image" scale="1.5%" class="icon" aria-hidden="true">A</b-icon>
              </b-col>

            </div>
            <input accept="image/*" style="display:none" type="file" @change="handleFileChange" ref="imageUploadInput">
          </div>
          <div style="margin-top:5%; margin-bottom:5%; margin-left:5%;margin-right:-4%">
            <div class="row">
              <b-col cols="7">
                <b-button type="button" variant="outline-primary" @click="deleteImage" data-dismiss="modal">Delete</b-button>
              </b-col>
              <b-col cols="2">
                <b-button type="button" variant="success" @click="onClickImageInput">Upload</b-button>
              </b-col>
              <b-col cols="3">
                <b-button type="button" variant="success" @click.prevent="cropImage" data-dismiss="modal">Save</b-button>
              </b-col>
            </div>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueCropper from 'vue-cropperjs'
import { mapState, mapActions } from 'vuex'
import { BIcon, BIconImage } from 'bootstrap-vue'
export default {
  components: {
    VueCropper,
    BIcon,
    BIconImage
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      value: 0,
      dbImgURL: '',
      cropImg: '',
      data: null,
      min: 0,
      tempZoom: 0,
      imageFound: false,
      selectedImgURL: '/uploads/localhost/profile_pic.png',
      selectedFileOrURL: null,
      selectedBckImgURL: ''
    }
  },
  methods: {
    ...mapActions('school', [
      'getSchoolByOrg',
      'getSchoolAdminByOrg',
      'addSchool',
      'updateSchool'
    ]),
    imgError () {
      this.$refs.cropper.src = '/images/avatar-broken.jpg'
    },
    isFileImage (file) {
      const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png']
      return acceptedImageTypes.includes(file['type'])
    },
    onClickImageInput () {
      this.$refs.imageUploadInput.click()
    },
    handleFileChange (event) {
      const file = event.target.files

      if (this.isFileImage(file[0])) {
        let fileName = file[0].name
        if (fileName.lastIndexOf('.') <= 0) {
          return console.log('please select a valid file')
        }
        this.selectedFileOrURL = file[0]
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.selectedBckImgURL = fileReader.result
          // rebuilding copper
          this.$refs.cropper.replace(fileReader.result)
        })
        fileReader.readAsDataURL(file[0])
      }
    },
    changeSize () {
      if (this.temp > this.value) {
        this.zoom(-0.1)
        this.temp = this.value
      } else {
        this.zoom(0.1)
        this.temp = this.value
      }
    },
    end (e) {
      console.log(this.min)
      if (this.tempZoom > e) {
        this.zoom(-0.2)
        this.tempZoom = e
      } else {
        this.zoom(0.2)
        this.tempZoom = e
      }
    },

    ready () { },
    cropstart () { },
    cropmove () { },
    cropend () { },
    crop () { },
    zoom (percent) {
      this.$refs.cropper.relativeZoom(percent)
    },
    cropImage () {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
      // comment the below line to get the whole image file to api without cropping
      this.selectedFileOrURL = this.cropImg
      // posting the image to the api
      let formData = new FormData()

      if (typeof this.selectedFileOrURL === 'object') {
        formData.append('image', this.selectedFileOrURL)
        formData.append('isTemplate', false)
        formData.append('templateFileName', '')
        formData.append('schoolId', this.school.id)
      } else if (typeof this.selectedFileOrURL === 'string') {
        formData.append('image', null)
        formData.append('isTemplate', true)
        formData.append('templateFileName', this.selectedFileOrURL)
        formData.append('schoolId', this.school.id)
      } else {
        console.log('image type error')
      }
      // send the request
      axios.post('/api/Schools/ImageUpload',
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
        this.$emit('update-org-logo', true)
        this.getSchoolAdminByOrg(JSON.parse(localStorage.getItem('actualOrgId')))
      }).catch(function () {
        console.log('FAILURE!!')
      })
    },
    deleteImage () {
      // send the request
      axios.delete('/api/Schools/ImageDelete/' + this.school.id)
        .then((response) => {
          this.$emit('update-org-logo', false)
          this.getSchoolAdminByOrg(JSON.parse(localStorage.getItem('actualOrgId')))
        }).catch(function () {
          console.log('FAILURE!!')
        })
    },

    ...mapActions('company', [
      'getCompany'
    ]),
    ...mapActions('partner', [
      'getPartner'
    ])
  },
  computed: {
    ...mapState({
      store: state => state.company
    }),
    ...mapState({
      partnerStore: State => State.partner.partner
    }),
    ...mapState({
      storePartners: state => state.partner.partners
    }),
    ...mapState({
      school: state => state.school.school
    })
  },
  mounted: function () {
    this.organizationId = JSON.parse(localStorage.getItem('organizationId'))

    // checking if displayPicture exist
    if (this.school.logo == null) {
      this.imageFound = false
      // rebuilding copper
      this.$refs.cropper.replace(this.selectedImgURL)
    } else {
      this.imageFound = true
      this.dbImgURL = '/uploads/' + this.school.id + '/' + this.school.logo
      // rebuilding copper
      this.$refs.cropper.replace(this.dbImgURL)
    }
  }
}
</script>

<style scoped>
  .actions {
    margin-top: 1rem;
  }
    .actions a {
      display: inline-block;
      padding: 5px 15px;
      background: #0062CC;
      color: white;
      text-decoration: none;
      border-radius: 3px;
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
</style>
