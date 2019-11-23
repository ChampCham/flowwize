<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
    <template v-slot:item.timestamp="{ item }">
      {{ formatDate(item.timestamp) }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn :disabled="!item.valid" @click="cancelReq(item.id)">Cancel</v-btn>
    </template>
  </v-data-table>
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
    items: []
  }),
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      numOfMyRequests(this.$store.getters.user.wallet.address).then(len => {
        this.items = [];
        for (let i = 0; i < len; i++) {
          myRequestAt(this.$store.getters.user.wallet.address, i).then(data => {
            const record = this.parseItem(data);
            if (record.valid !== false) {
              this.items.push(record);
              console.log(record)
            }
          });
        }
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
      cancelRequest(this.$store.getters.user.wallet.address, id).then(() => {
        this.initialize();
      });
    }
  }
};
</script>
