<template>
  <b-container class="main-container">
    <b-row>
      <b-col>
        <p class="heading-p">Add your card to get started</p>
        <div class="w-100"></div>
        <p class="sub-heading-p">We’ll notify you before the end of your 14 day free trial.</p>
      </b-col>
    </b-row>
    <b-row style="margin-top:200px">
      <b-col>
        <form @submit="onSubmit">
          <b-row>
            <b-col>
              <div style="position:relative;margin-left:auto;margin-right:auto; width: 465px;">
                <button type="submit" class="btn add-card-btn">Get started</button>
              </div>
            </b-col>
          </b-row>
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>export default {
  components: {
  },
  data () {
    return {}
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$router.push({ path: '/portal/onBoarding/my-profile' })
    }
  },
  computed: {},
  mounted: function () { }
}

</script>

<style scoped>

  .main-container {
    width:680px;
  }

  .heading-p {
    text-align: center;
    font-weight: bold;
    font-size:49px;
    letter-spacing: 0px;
    color: #01151C;
    opacity: 1;
    margin-top:40px
  }

  .sub-heading-p {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    letter-spacing: 0px;
    color: #01151C;
    opacity: 1;
  }

  .add-card-btn {
    width: 465px;
    height: 62px;
    font-weight: bold;
    font-size: 18px;
    letter-spacing: 0px;
    color: #FFFFFF;
    background: #00AC4E 0% 0% no-repeat padding-box;
    border-radius: 7px;
    opacity: 1;
  }

</style>
