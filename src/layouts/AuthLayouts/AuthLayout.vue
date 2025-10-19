<template>
  <div> 
    <section class="sign-in-page">
      <div id="container-inside">
        <div id="circle-small"></div>
        <div id="circle-medium"></div>
        <div id="circle-large"></div>
        <div id="circle-xlarge"></div>
        <div id="circle-xxlarge"></div>
      </div>
      <b-container class="container p-0">
        <div class="row no-gutters"> 
          <div class="col-12 bg-white pt-5">
            <div class="sign-in-from">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </b-container>
    </section>
  </div>
</template>
<script>
import Loader from '../../components/socialvue/loader/Loader'
import logo from '../../assets/images/logo-white.png'
import { socialvue } from '../../config/pluginInit'
import bgImage from '../../assets/images/login/login-2.jpg'
export default {
  name: 'AuthLayout1',
  components: {
    Loader
  },
  mounted () {
    //socialvue.index()
  },
  data () {
    return {
      slickOptions: {
        slidesToShow: 1,
        arrows: false
      },
      logo: logo,
      bgImageURL: bgImage
    }
  }
}
</script>
