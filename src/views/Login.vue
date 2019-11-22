<template>
  <v-container fluid bg grid-list-xl text-xs-center class="m-auto mt-12 pt-5">
    <v-layout row v-if="error">
      <v-flex xs10 offset-xs1 sm4 offset-sm4 md4 offset-md4 lg4 offset-lg4>
        <v-alert dismissible type="error" @click="onClear">
          {{ error.message }}
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm4 offset-sm4 md4 offset-md4 lg4 offset-lg4>
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
                  color="black"
                  class="tabs"
                >
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab href="#User">
                    <div class="hidden-sm-and-down">User</div>
                    <v-icon>fas fa-user</v-icon>
                  </v-tab>
                  <v-tab href="#Bank">
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
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex xs6>
                          <v-btn block @click="signup">
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
      this.loading = true;
      this.$store
        .dispatch("logIn", {
          email: this.email,
          password: this.password,
          role: this.tab
        })
        .then(() => {
          if (this.error === null) {
            this.onClear();
            this.$router.push({ path: "/request" });
          }
          this.loading = false;
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
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Roboto+Slab&display=swap");
/* .bg {
  background-image: url("/img/login_bg.png");
  background-size: cover;
} */
h1 {
  text-align: center;
  color: black;
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
