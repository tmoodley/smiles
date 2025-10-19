<template>
  <div>
    <b-form-checkbox
      v-model="checked"
      name="check-button"
      switch size="lg"
      @click.native="onClick">
      {{subject.name}}
    </b-form-checkbox>
    <topics :subject="subject" v-if="checked"></topics>
  </div>
</template>
//always have the file name or object in a one variable so u can validate it and change the request url
<script>
import topics from 'components/settings/topics.vue'
import { BIcon, BIconChevronRight } from 'bootstrap-vue'
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
export default {
  props: ['subject'],
  components: {
    BIcon,
    BIconChevronRight,
    topics
  },
  data () {
    return {
      checked: ''
    }
  },
  methods: {
    ...mapActions('company', [
      'getCompany',
      'addSubject',
      'removeSubject'
    ]),
    ...mapActions('posts', [
      'getSubjects'
    ]),
    onClick (evt) {
      // React only to the events fired from the `input`
      if (evt.target.tagName === 'INPUT') {
        if (evt.target.checked) {
          // Checkbox is being checked
          // the value that will be set is evt.target._value
          var payload = {
            organizationId: JSON.parse(localStorage.getItem('actualOrgId')),
            subjectId: this.subject.id
          }
          this.addSubject(payload)
        } else {
          // Checkbox is being un-checked
          // the value that will be unset is set is evt.target._value
          var payload = {
            organizationId: JSON.parse(localStorage.getItem('actualOrgId')),
            subjectId: this.subject.id
          }
          this.removeSubject(payload)
        }
      }
    }
  },
  computed: {
    ...mapState({
      subjects: State => State.posts.subjects
    }),
    ...mapState({
      company: state => state.company.company
    })
  },
  mounted: function () {
    var self = this

    this.OrganizationId = JSON.parse(localStorage.getItem('organizationId'))
    if (this.company.organizationSubjects != null) {
      for (var _subject of self.company.organizationSubjects) {
        if (self.subject.id == _subject.subjectId) {
          self.checked = true
        }
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
