<template>
  <div class="container">
    <Header :role="role" />
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
                <v-form>
                  <v-layout row>
                    <v-flex xs12>
                      <v-select
                        :items="types"
                        v-model="type"
                        label="Loan Type"
                        outlined
                        color="#001851"
                      ></v-select>
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
                        color="#001851"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn
                        block
                        @click="submit"
                        :disabled="loading"
                        :loading="loading"
                      >
                        Submit
                        <span slot="loader" class="custom-loader">
                          <v-icon light>fas fa-spinner</v-icon>
                        </span>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
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
import { requestLoan } from "../plugins/getWeb3";

export default {
  components: {
    Header
  },
  data() {
    return {
      types: ["House", "Car", "Business"],
      type: "House",
      amount: "",
      role: "user",
      loading: false
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      await requestLoan(
        this.$store.getters.user.wallet,
        this.type,
        this.amount
      );
      this.type = "";
      this.amount = "";
      this.loading = false;
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Roboto+Slab&display=swap");

.container {
  align-items: center;
  align-content: center;
  justify-content: center;
  margin-top: 30px;
}
.bg {
  background-image: url("/img/login_bg.png");
  background-size: cover;
}
h1 {
  text-align: center;
  color: #001851;
  font-family: "Roboto Slab", serif;
  font-size: 30px;
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
