<template>
  <div class="container">
    <v-data-table
      :headers="headers"
      :items="items"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Loan Requests</v-toolbar-title>
          <v-spacer></v-spacer>
          <span class="custom-loader" v-if="isRefresh">
            <v-icon small @click="initialize">fas fa-sync-alt</v-icon>
          </span>
          <v-icon small @click="initialize" v-else>fas fa-sync-alt</v-icon>
        </v-toolbar>
      </template>
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template> -->
      <template v-slot:item.timestamp="{ item }">
        {{ formatDate(item.timestamp) }}
      </template>
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
    isRefresh: false
  }),
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.isRefresh = true;
      numOfMyRequests(this.$store.getters.user.wallet.address).then(len => {
        this.items = [];
        for (let i = 0; i < len; i++) {
          myRequestAt(this.$store.getters.user.wallet, i).then(data => {
            const record = this.parseItem(data);
            if (record.valid !== false) {
              this.items.push(record);
            }
          });
        }
      });
      this.isRefresh = false;
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
.container {
  align-items: center;
  align-content: center;
  justify-content: center;
  margin-top: 30px;
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
