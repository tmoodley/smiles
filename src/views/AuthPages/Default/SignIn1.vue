<template>
  <div>
    <h1 class="mb-0">Sign in</h1>
    <p>Enter your email address and password to access admin panel.</p>

    <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
      <form class="mt-4" @submit.prevent="handleSubmit(onSubmit)">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control mb-0"
            id="exampleInputEmail1"
            placeholder="Enter email"
            :rules="{ required: true, email: true }"
            prepend-icon="ni ni-email-83"
            v-model="model.email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control mb-0"
            id="exampleInputPassword1"
            placeholder="Password"
            :rules="{ required: true, min: 6 }"
            prepend-icon="ni ni-lock-circle-open"
            v-model="model.password"
          />
        </div>
        <div class="d-inline-block w-100">
          <div class="custom-control custom-checkbox d-inline-block mt-2 pt-1">
            <b-form-checkbox v-model="model.rememberMe"
              >Remember me</b-form-checkbox
            >
          </div>
          <button type="submit" class="btn btn-primary float-right">Sign in</button>
        </div>
        <div class="sign-info">
          <span class="dark-color d-inline-block line-height-2"
            >Don't have an account?
             <router-link :to="{ name: 'register' }">Sign up</router-link></span
          >
          <ul class="iq-social-media">
            <li>
              <a href="#"><i class="ri-facebook-box-line"></i></a>
            </li>
            <li>
              <a href="#"><i class="ri-twitter-line"></i></a>
            </li>
            <li>
              <a href="#"><i class="ri-instagram-line"></i></a>
            </li>
          </ul>
        </div>
      </form>
    </validation-observer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        email: "",
        password: "",
        rememberMe: false
      }
    };
  },
  created() {
    // reset login status
    this.$store.dispatch("authentication/logout");
  },
  methods: {
    onSubmit(e) {
      this.submitted = true;
      const { dispatch } = this.$store;
      let self = this;
      self.$swal.fire({
            title: 'Logging You In!',
            text: 'Signing in.',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getHtmlContainer()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
      });
      if (this.model.email && this.model.password) {
        dispatch("authentication/login", self.model);
      }
    }
  }
};
</script>
