<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Loan Requests </v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:item.timestamp="{ item }">
      {{ formatDate(item.timestamp) }}
    </template>
    <template v-slot:item.action="{ item }">
      <RequestDialog :req="item" />
    </template>
  </v-data-table>
</template>

<script>
import moment from "moment";
import _ from "lodash";
import { db } from "../firebase";
import { numOfAllRequests, requestAt } from "../plugins/getWeb3";
import RequestDialog from "@/components/RequestDocumentDialog";
export default {
  components: {
    RequestDialog
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Users",
        value: "name"
      },
      { text: "Loan Type", value: "loanType" },
      { text: "Amount", value: "amount" },
      { text: "Date", value: "timestamp" },
      { text: "Actions", value: "action", sortable: false }
    ],
    items: []
  }),

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      numOfAllRequests().then(len => {
        this.items = [];
        for (let i = 0; i < len; i++) {
          requestAt(i).then(res => {
            db.collection("users")
              .where("wallet.address", "==", res[1])
              .get()
              .then(doc => {
                _.forEach(doc.docs, d => {
                  const record = this.parseItem(res, d.data().fullname);
                  if (record.valid !== false) {
                    this.items.push(record);
                  }
                });
              });
          });
        }
      });
    },
    parseItem(data, name) {
      return {
        id: data[0],
        address: data[1],
        loanType: data[2],
        amount: data[3],
        valid: data[4],
        timestamp: data[5],
        name
      };
    },
    formatDate(t) {
      return moment(`${t}000`, "x").format("Do MMMM YYYY, h:mm:ss a");
    }
  }
};
</script>
