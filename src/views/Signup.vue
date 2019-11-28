<template>
  <div id="landing-page">
    <v-container fluid grid-list-xl text-xs-center class="mt-1 pt-5">
      <v-layout row v-if="error">
        <v-flex xs10 offset-xs1 sm4 offset-sm4 md4 offset-md4>
          <v-alert dismissible type="error" @click="onClear">
            {{ error.message }}
          </v-alert>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 sm4 offset-sm4 md4 offset-md4>
          <v-card>
            <v-card-text>
              <v-container>
                <v-layout row>
                  <v-flex xs12>
                    <h1>Sign Up</h1>
                  </v-flex>
                </v-layout>
                <form @submit.prevent="onSignup">
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        name="email"
                        label="Mail"
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
                        name="fullname"
                        label="Fullname"
                        id="fullname"
                        v-model="fullname"
                        type="fullname"
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
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        name="confirmPassword"
                        label="Confirm Password"
                        id="confirmPassword"
                        v-model="confirmPassword"
                        type="password"
                        color="#F8C422"
                        :rules="[comparePasswords]"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs6 class="button">
                      <v-btn block @click="onBack" outlined color="#001851"
                        >Back</v-btn
                      >
                    </v-flex>
                    <v-flex xs6 class="button">
                      <v-btn
                        block
                        type="submit"
                        :disabled="loading"
                        :loading="loading"
                        outlined
                        color="#001851"
                      >
                        Sign up
                        <template v-slot:loader>
                          <span class="custom-loader">
                            <v-icon light>fas fa-spinner</v-icon>
                          </span>
                        </template>
                      </v-btn>
                    </v-flex>
                  </v-layout>
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
      role: this.$route.params.role,
      email: "",
      fullname: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: {
    ...mapGetters(["error", "loading", "user"]),
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : true;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.replace("/request");
      }
    }
  },

  methods: {
    onSignup() {
      if (this.comparePasswords === true) {
        this.$store.dispatch({
          type: "signUp",
          email: this.email,
          fullname: this.fullname,
          role: this.role,
          password: this.password
        });
      }
    },
    onBack() {
      this.onClear();
      this.$router.replace("/");
    },
    onClear() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Roboto+Slab&display=swap");

.content {
  margin-top: 20%;
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
