<template>
  <div class="container">
    <v-data-table :headers="headers" :items="items" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            <h1>Loan Requests</h1>
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn
            text
            icon
            @click="initialize"
            :disabled="isRefresh"
            :loading="isRefresh"
          >
            <v-icon small>fas fa-sync-alt</v-icon>
            <span slot="loader" class="custom-loader">
              <v-icon small light>fas fa-sync-alt</v-icon>
            </span>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:no-data>
        <v-progress-linear
          color="#001851"
          indeterminate
          rounded
          v-if="hasItems"
        ></v-progress-linear>
      </template>
      <template v-slot:item.timestamp="{ item }">{{
        formatDate(item.timestamp)
      }}</template>
      <template v-slot:item.actions="{ item }">
        <v-btn :disabled="!item.valid" @click="cancelReq(item.id)"
          >Cancel</v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from "moment";
import {
  numOfMyRequests,
  myRequestAt,
  cancelRequest
} from "../plugins/getWeb3";

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Loan Type", value: "loanType" },
      { text: "Amount (Baht)", value: "amount" },
      { text: "Requested Time", value: "timestamp" },
      { text: "Actions", value: "actions" }
    ],
    title: "My Requests",
    items: [],
    isRefresh: false,
    hasItems: true
  }),
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.isRefresh = true;
      this.hasItems = true;
      numOfMyRequests(this.$store.getters.user.wallet).then(len => {
        if (len === 0) {
          this.hasItems = false;
        }
        this.items = [];
        for (let i = 0; i < len; i++) {
          myRequestAt(this.$store.getters.user.wallet, i).then(data => {
            const record = this.parseItem(data);
            if (record.valid !== false) {
              this.items.push(record);
            }
          });
        }
        this.isRefresh = false;
      });
    },
    parseItem(data) {
      return {
        id: data[0],
        loanType: data[2],
        amount: data[3],
        valid: data[4],
        timestamp: data[5]
      };
    },
    formatDate(t) {
      return moment(`${t}000`, "x").format("Do MMMM YYYY, h:mm:ss a");
    },
    cancelReq(id) {
      cancelRequest(this.$store.getters.user.wallet, id).then(() => {
        this.initialize();
      });
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

h1 {
  text-align: center;
  color: #001851;
  font-family: "Roboto Slab", serif;
  font-size: 30px;
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
