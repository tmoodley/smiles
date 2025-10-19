  <template>
    <b-modal id="bv-modal-profile"
             ref="modal-profile"
             size="xl"
             title="Profile">
      <div class="row">
        <div class="col-md-4">
          <div class="profile-img">
            <b-img v-if="user.logo != null" :src="getImage(user.userId,user.logo)" fluid alt="Responsive image" ref="imageReforg" width="85"></b-img>
            <b-img v-if="user.logo == null" src="/img/silhouette_large.png" fluid alt="Responsive image" ref="imageReforg" width="85"></b-img>
          </div>
        </div>

        <div class="col-md-6">
          <div class="profile-head">
            <h3 class="media-heading">{{user.name}} <small>{{user.country != null ? user.country.name : ''}}</small></h3>
            <!--<p class="proile-rating">RANKINGS : <span>8/10</span></p>-->
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Hourly Rate</label>
            </div>
            <div class="col-md-6">
              <p>USD${{user.hourlyRate}}/hr</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Education</label>
            </div>
            <div class="col-md-6">
              <p v-for="education in user.educations">{{education.name}} {{education.degree}} <br />{{education.startYear}} - {{education.endYear}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Bio</label>
            </div>
            <div class="col-md-6">
              <p> {{user.description}}</p>
            </div>
          </div>
        </div>
        </div>
      <div class="row">
        <div class="col-md-4">
          <div class="profile-work">
            <p>SUBJECTS</p>
            <span v-for="subject in user.organizationSubjects" href="">
              <a href="#" v-for="item in subject">{{item.name}}</a><br />
            </span><br />
          </div>
        </div>
        <div class="col-md-8">
          <div class="row">
              <div class="col-md-12">
                  <b-form-group label="Message"
                                label-for="textarea-lazy"
                                class="mb-0">
                    <b-form-textarea id="textarea-lazy"
                                      v-model="message"
                                      placeholder="Type a message"
                                      lazy-formatter></b-form-textarea>
                  </b-form-group>
                  <b-button variant="primary" class="mt-2" type="button" @click="send"><i class="fa fa-paper-plane" aria-hidden="true">Send</i></b-button>
                </div>
          </div>
        </div>
      </div>
    </b-modal>
  </template>

<script>
import axios from 'axios'
import { required, email, numeric } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      OrganizationId: '',
      show: true,
      message: ''
    }
  },
  methods: {
    send (evt) {
      var organizationId = JSON.parse(localStorage.getItem('organizationId'))
      var actualOrgId = JSON.parse(localStorage.getItem('actualOrgId'))
      var contactId = this.user.organizationId

      var _message = {
        body: this.message,
        createdBy: organizationId,
        createdAt: new Date(),
        organizationsId: actualOrgId,
        toOrganizationsId: contactId,
        recipientId: contactId,
        isRecipientRead: false
      }
      evt.preventDefault()
      // alert(JSON.stringify(this.form))
      return axios
        .post('/api/messages/Send', _message)
        .then(response => {
          // Hide the modal manually
          this.$nextTick(() => {
            this.$swal.fire({
              title: 'Send!',
              text: 'Your Message has been sent.',
              icon: 'success',
              timer: 3000
            })
            this.$bvModal.hide('bv-modal-profile')
          })
        })
    },
    getImage (orgId, logo) {
      return 'https://stuttie-files.s3.us-east-2.amazonaws.com/' + orgId + '/' + logo
    }
  },
  computed: {
    ...mapState({
      user: state => state.posts.user
    })
  },
  mounted: function () {
  },
  created: function () {
  }
}
</script>
<style>
  .emp-profile {
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
    background: #fff;
  }

  .profile-img {
    text-align: center;
  }

    .profile-img img {
      width: 70%;
      height: 100%;
    }

    .profile-img .file {
      position: relative;
      overflow: hidden;
      margin-top: -20%;
      width: 70%;
      border: none;
      border-radius: 0;
      font-size: 15px;
      background: #212529b8;
    }

      .profile-img .file input {
        position: absolute;
        opacity: 0;
        right: 0;
        top: 0;
      }

  .profile-head h5 {
    color: #333;
  }

  .profile-head h6 {
    color: #0062cc;
  }

  .profile-edit-btn {
    border: none;
    border-radius: 1.5rem;
    width: 70%;
    padding: 2%;
    font-weight: 600;
    color: #6c757d;
    cursor: pointer;
  }

  .proile-rating {
    font-size: 12px;
    color: #818182;
    margin-top: 5%;
  }

    .proile-rating span {
      color: #495057;
      font-size: 15px;
      font-weight: 600;
    }

  .profile-head .nav-tabs {
    margin-bottom: 5%;
  }

    .profile-head .nav-tabs .nav-link {
      font-weight: 600;
      border: none;
    }

      .profile-head .nav-tabs .nav-link.active {
        border: none;
        border-bottom: 2px solid #0062cc;
      }

  .profile-work {
    padding: 14%;
    margin-top: -15%;
  }

    .profile-work p {
      font-size: 12px;
      color: #818182;
      font-weight: 600;
      margin-top: 10%;
    }

    .profile-work a {
      text-decoration: none;
      color: #495057;
      font-weight: 600;
      font-size: 14px;
    }

    .profile-work ul {
      list-style: none;
    }

  .profile-tab label {
    font-weight: 600;
  }

  .profile-tab p {
    font-weight: 600;
    color: #0062cc;
  }
</style>
