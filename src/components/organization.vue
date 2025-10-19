<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="title">Edit Profile</h5>
          </div>
          <div class="card-body">
            <b-card>
              <b-tabs pills card>
                <b-tab no-body title="Profile">
                  <profile></profile>
                </b-tab>
                <b-tab no-body title="Admins">
                  <admin></admin>
                </b-tab>
              </b-tabs>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import admin from './admin/admins'
import profile from './profile/profile'

export default {

  components: {
    admin,
    profile
  },
  data () {
    return {
    }
  },
  methods: {

  },
  mounted: function () {

  },
  created: function () {

  }
}
</script>

<style>
  li.nav-item a {
    color: #9A9A9A;
}
    li.nav-item a:hover {
    color: black;
}
</style>
