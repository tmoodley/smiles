<template> 
  <!-- Modal -->
  <b-modal id="payment-info" hide-footer button-size="lg">
    <template #modal-title> Payment Information </template>
      <b-container fluid class="mb-7">
        <b-row class="mt-3">
          <b-col>

            <!-- Begin Payment Form -->
            <paymentForm />
            <!-- End Payment Form -->

          </b-col>
        </b-row>
      </b-container> 
  </b-modal>
</template>

<script>
import paymentForm from './paymentForm.vue'
import { required, numeric, email } from 'vuelidate/lib/validators'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'paymentInfo',
  components: {
    paymentForm
  },
  data: function () {
    return {
      // usePersonalAddress: true,
      OrganizationId: '',
      errors: []
    }
  },
  watch: {

  },
  props: {
    showPaymentForm: Boolean,
    id: Number
  },

  computed: {
    ...mapState({
      store: state => state.company
    })
  },

  mounted: function () {
    // this.usePersonalAddress = true;
    this.OrganizationId = JSON.parse(localStorage.getItem('organizationId'))
    this.ReferenceId = JSON.parse(localStorage.getItem('referenceId'))
  },

  methods: {

  }
}
</script>
<style scoped>

  .heading-font {
    color: #01151C;
    font-weight: bold;
    font-size: 18px;
  }

  .btnSubmit {
    background: #00AC4E 0% 0% no-repeat padding-box;
    border-radius: 7px;
    opacity: 1;
    border: none;
    width: 100%;
    border: 1px solid #00AC4E;
  }

  .btnCancel {
    background: white;
    color: #546064;
    border: 1px solid #546064;
    margin-right: 15px;
    width: 100%;
    border-radius: 7px;
  }
</style>
