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
let user = JSON.parse(localStorage.getItem('user'))
export default {
  name: 'app',
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function () {
    return {
      dropzoneOptions: {
        url: 'https://stuttie.com/api/document/',
        thumbnailWidth: 150,
        maxFilesize: 5,
        headers: { 'Document': 'header value', 'Authorization': 'Bearer ' + user.token },
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='fas fa-upload'></i>Upload File"
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
