<template>
  <div id="landing-page">
    <v-container fluid fill-height grid-list-xl text-xs-center>
      <v-layout justify-center align-center row>
        <v-flex xs12 sm4 md4 lg3>
          <v-alert value="error" dismissible type="error" @click="onClear" v-if="error" >
            {{
            error.message
            }}
          </v-alert>
          <v-card>
            <v-card-text>
              <v-container>
                <v-layout row>
                  <v-flex xs12>
                    <h1>Login</h1>
                  </v-flex>
                </v-layout>
                <form>
                  <v-tabs
                    v-model="tab"
                    fixed-tabs
                    background-color="#ffffff"
                    icons-and-text
                    color="#001851"
                    class="tabs"
                  >
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab class="tab" href="#User">
                      <div class="hidden-sm-and-down">User</div>
                      <v-icon>fas fa-user</v-icon>
                    </v-tab>
                    <v-tab class="tab" href="#Bank">
                      <div class="hidden-sm-and-down">Bank</div>
                      <v-icon>fas fa-university</v-icon>
                    </v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="i in roles" :key="i" :value="i">
                      <div>
                        <v-layout row>
                          <v-flex xs12>
                            <v-text-field
                              name="email"
                              :label="`${i} Mail`"
                              id="email"
                              v-model="email"
                              type="email"
                              color="#F8C422"
                              required
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout row>
                          <v-flex xs12>
                            <v-text-field
                              name="password"
                              label="Password"
                              id="password"
                              v-model="password"
                              type="password"
                              color="#F8C422"
                              required
                            ></v-text-field>
                          </v-flex>
                        </v-layout>

                        <v-layout row v-if="tab === 'User'">
                          <v-flex xs6>
                            <v-btn block @click="signup" outlined color="#001851">
                              Register
                              <span slot="loader" class="custom-loader">
                                <v-icon light>fas fa-spinner</v-icon>
                              </span>
                            </v-btn>
                          </v-flex>
                          <v-flex xs6>
                            <v-btn
                              block
                              @click="login"
                              :disabled="loading"
                              :loading="loading"
                              outlined
                              color="#001851"
                            >
                              Log in
                              <span slot="loader" class="custom-loader">
                                <v-icon light>fas fa-spinner</v-icon>
                              </span>
                            </v-btn>
                          </v-flex>
                        </v-layout>

                        <v-layout row v-if="tab === 'Bank'">
                          <v-flex xs12>
                            <v-btn
                              block
                              @click="login"
                              :disabled="loading"
                              :loading="loading"
                              outlined
                              color="#001851"
                            >
                              Log in
                              <span slot="loader" class="custom-loader">
                                <v-icon light>fas fa-spinner</v-icon>
                              </span>
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </div>
                    </v-tab-item>
                  </v-tabs-items>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      roles: ["User", "Bank"],
      email: "",
      password: "",
      tab: null
    };
  },
  computed: {
    ...mapGetters(["error", "loading"])
  },
  methods: {
    login() {
      this.$store
        .dispatch("logIn", {
          email: this.email,
          password: this.password,
          roleCheck: this.tab.toLowerCase()
        })
        .then(() => {
          if (this.error === null) {
            this.onClear();
            this.$router.push({ path: "/request" });
          }
        });
    },
    signup() {
      const role = this.tab.toLowerCase();
      this.$router.push({ name: "Signup", params: { role: role } });
    },
    onClear() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>
<style scoped>
.tab {
  color: #001851;
}
#landing-page {
  background-color: #001851;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
h1 {
  text-align: center;
  color: #001851;
  font-family: "Roboto Slab", serif;
  font-size: 40px;
}
p {
  margin-top: 40px;
  font-size: 13px;
  text-align: center;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
.social-button {
  width: 75px;
  background: white;
  padding: 10px;
  border-radius: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  outline: 0;
  border: 0;
}
.social-button:active {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.social-button img {
  width: 100%;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
