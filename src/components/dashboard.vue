<template>
    <div>
      <div class="row">

      </div>
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      email: JSON.parse(localStorage.getItem('user')).username,
      totalProducts: 0,
      totalPurchaseorders: 0,
      totalTenders: 0
    }
  },
  methods: {
    ...mapActions('company', [
      'getCompany'
    ])
  },
  computed: {
    ...mapState({
      store: state => state.company
    })
  },
  async created () {
    var self = this
    this.getCompany(this.email)
  },
  mounted: function () {
  }
}
</script>

<style>

</style>
