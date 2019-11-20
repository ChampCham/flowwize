<template>
  <div>
    <Header />
    <v-container fluid grid-list-xl text-xs-center class="mt-12 pt-5">
      <v-layout row>
        <v-flex xs10 offset-xs1 sm4 offset-sm4 md4 offset-md4 lg4 offset-lg4>
          <v-card>
            <v-card-text>
              <v-container>
                <v-layout row>
                  <v-flex xs12>
                    <h1>Loan Request</h1>
                  </v-flex>
                </v-layout>
                <form>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        name="type"
                        label="Type"
                        id="type"
                        v-model="type"
                        type="text"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        name="amount"
                        label="Amount"
                        id="amount"
                        v-model="amount"
                        type="text"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn block @click="submit" type="submit">
                        Submit
                        <span slot="loader" class="custom-loader">
                          <v-icon light>fas fa-spinner</v-icon>
                        </span>
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
import Header from "@/components/Header";
export default {
  components: {
    Header
  },
  data() {
    return {
      type: "",
      amount: ""
    };
  },
  methods: {
    submit() {
      console.log("Submit");
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Roboto+Slab&display=swap");
.bg {
  background-image: url("/img/login_bg.png");
  background-size: cover;
}
h1 {
  text-align: center;
  color: black;
  font-family: "Roboto Slab", serif;
  font-size: 35px;
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
