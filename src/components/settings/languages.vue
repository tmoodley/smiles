<template>
<div> 
   <b-container fluid class="mt--7 pb-8">
    <b-row no-gutters>
      <b-col cols="12" sm="12" md="12" lg="6" xl="6">
        <div class="card gedf-card">
          <div class="card-body">
            <p class="card-text">
              <b-form-group
                            v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group v-model="selected"
                                       :options="options"
                                       :aria-describedby="ariaDescribedby"
                                       @click.native="onClick" 
                                       size="lg"
                                       stacked></b-form-checkbox-group>
              </b-form-group>
            </p>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>
//always have the file name or object in a one variable so u can validate it and change the request url
<script>
import { BIcon, BIconChevronRight } from 'bootstrap-vue'
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
export default {
  components: {
    BIcon,
    BIconChevronRight
  },
  data () {
    return {
      options: [],
      selected: []
    }
  },
  methods: {
    ...mapActions('company', [
      'getCompany',
      'addLanguage',
      'removeLanguage'
    ]),
    ...mapActions('posts', [
      'getLanguages'
    ]),
    onClick (evt) {
      // React only to the events fired from the `input`
      if (evt.target.tagName === 'INPUT') {
        if (evt.target.checked) {
          // Checkbox is being checked
          // the value that will be set is evt.target._value
          var payload = {
            organizationId: JSON.parse(localStorage.getItem('actualOrgId')),
            languageId: evt.target.value
          }
          this.addLanguage(payload)
        } else {
          // Checkbox is being un-checked
          // the value that will be unset is set is evt.target._value
          var payload = {
            organizationId: JSON.parse(localStorage.getItem('actualOrgId')),
            languageId: evt.target.value
          }
          this.removeLanguage(payload)
        }
      }
    }
  },
  computed: {
    ...mapState({
      languages: State => State.posts.languages
    }),
    ...mapState({
      company: state => state.company.company
    })
  },
  mounted: function () {
    var self = this
    this.getLanguages().then(function () {
      for (var language of self.languages) {
        self.options.push({ text: language.name, value: language.id })
      }
    })
    this.OrganizationId = JSON.parse(localStorage.getItem('organizationId'))
    if (this.company.organizationLanguages != null) {
      for (var language of self.company.organizationLanguages) {
        self.selected.push(language.languageId)
      }
    }
  }
}

</script>

<style scoped>

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

    .card {
      border: transparent;
    }

  }

</style>
