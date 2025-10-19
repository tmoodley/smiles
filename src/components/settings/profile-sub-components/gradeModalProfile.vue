<template>
<!-- Modal -->
  <b-modal id="profile-grade" hide-footer button-size="lg">
    <template #modal-title> Grade </template> 
        <b-form>
          <div class="modal-body">
            <p style="margin-left: 3%;font-size:15px;color:#808080 ;font-weight:bold">Grade</p>
            <b-form-group label="" label-for="ratio" label-cols-md="auto" class="mb-3">
              <b-form-select id="ratio" v-model="selected" style="font-size:15px; font-weight:bold; color:#01151C" :options="grades"></b-form-select>
            </b-form-group>
          </div>
          <div class="modal-footer">
                <button type="button" @click="updateGrade" class="btn btn-primary mr-2">Update</button>
                <button type="reset" class="btn iq-bg-danger" @click="cancelFunction">Cancel</button>  
          </div>
        </b-form>
  </b-modal>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      grades: [],
      selected: null
    }
  },
  methods: {
    ...mapActions('company', [
      'getCompany',
      'updateCompany'
    ]),
    cancelFunction () { 
      this.$bvModal.hide('profile-grade')
    },
    updateGrade () {
      this.getCompany(JSON.parse(localStorage.getItem('organizationId')))
      var _company = { ...this.store.company }
      _company.gradesId = this.selected
      this.updateCompany(_company)
      this.$bvModal.hide('profile-grade')
    },
    getGrades: function () {
      axios
        .get('/api/Grades')
        .then(response => {
          this.grades = response.data.map(function (grade) {
            return {
              value: grade.id,
              text: grade.name
            }
          })
        })
    }
  },
  computed: {
    ...mapState({
      store: state => state.company
    })
  },
  mounted: function () {
    this.selected = this.store.company.gradesId
    this.getGrades()
  }
}
</script>
