<template>
  <div>
    <vue-dropzone
                  :options="dropzoneOptions"
                  v-on:vdropzone-sending="sendingEvent"
                  v-on:vdropzone-success="onSuccess">
    </vue-dropzone>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function () {
    let user = JSON.parse(localStorage.getItem('user'));  
    return {
      dropzoneOptions: {
        url: 'https://stuttie.com/api/document/',
        thumbnailWidth: 150,
        maxFilesize: 10,
        headers: { 'Document': 'header value', 'Authorization': 'Bearer ' + user.data.token },
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME"
      }
    }
  },
  methods: {
    sendingEvent (file, xhr, formData) {
      var id = this.store.company.id
      formData.append('CustomerId', id)
    },
    onSuccess (file, response) {
      this.$emit('setid', response.id)
    }
  },
  computed: {
    ...mapState({
      store: state => state.company
    })
  }
}

</script>

<style>
</style>
