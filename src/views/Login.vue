<template>
  <div class="bg">
    <v-content class="content">
      <v-container fluid="true" grid-list-xl text-xs-center class="mt-1 pt-5">
        <v-layout row v-if="error">
          <v-flex xs12 sm6 offset-sm3>
            <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-card-text>
                <v-container>
                  <v-layout row>
                    <v-flex xs12>
                      <h1>Login</h1>
                    </v-flex>
                  </v-layout>
                  <form @submit.prevent="onSignin">
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field
                          name="email"
                          label="Mail"
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
                        <v-btn block type="submit" @click="signup" disabled="loading" :loading="loading">
                          Register
                          <span slot="loader" class="custom-loader">
                            <v-icon light>fas fa-spinner</v-icon>
                          </span>
                        </v-btn>
                      </v-flex>
                      <v-flex xs6>
                        <v-btn block type="submit" :disabled="loading" :loading="loading">
                          Log in
                          <span slot="loader" class="custom-loader">
                            <v-icon light>fas fa-spinner</v-icon>
                          </span>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </form>
                  <v-layout row>
                    <v-flex xs12>
                      <p>
                        You don't have an account ? You can
                        <router-link to="/signup">create one</router-link>
                      </p>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>
<script>
export default {
    signup(){
       this.$router.push({ path: "/" });
    }
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Grand+Hotel&display=swap");
.bg {
  background-image: url("/img/login_bg.png");
  background-size: cover;
}
.content {
  margin-top: 20%;
}
h1 {
  text-align: center;
  color: black;
  font-family: "Grand Hotel", cursive;
  font-size: 75px;
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