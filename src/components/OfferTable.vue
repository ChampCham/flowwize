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
          <v-toolbar-title>Loan Offer</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
      <template v-slot:item.timestamp="{ item }">
        {{ formatDate(item.timestamp) }}
      </template>

      <template v-slot:item.documents="{ item }">
        <v-list-item v-for="doc in item.documents" :key="doc.id">
          <v-list-item-content>
            <v-list-item-title
              v-text="`${doc.copies} x ${doc.label}`"
              class="listItem"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          class="success"
          :disabled="item.status === 'accepted'"
          @click="acceptOffer(item.lrId, item.idx)"
        >
          Accept
        </v-btn>
        <v-btn
          v-if="item.status !== 'accepted'"
          class="primary"
          @click="rejectOffer(item.lrId, item.idx)"
        >
          Reject
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
import { db } from "../firebase";
import {
  numOfMyRequests,
  myRequestAt,
  getDocumentsLength,
  getDocumentsByLoanReqId,
  acceptDocReq,
  rejectDocReq
} from "../plugins/getWeb3";

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Bank Name", value: "bankName" },
      { text: "Loan Type", value: "loanType" },
      { text: "Amount", value: "amount" },
      { text: "Doc Required", value: "documents" },
      { text: "Date", value: "timestamp" },
      { text: "Actions", value: "actions" }
    ],
    title: "My Loan Offer",
    items: []
  }),
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      const user = this.$store.getters.user;
      numOfMyRequests(user.wallet.address).then(len => {
        this.items = [];
        for (let i = 0; i < len; i++) {
          myRequestAt(user.wallet.address, i).then(lreq => {
            getDocumentsLength(user.wallet.address, lreq[0]).then(dlen => {
              for (let j = 0; j < dlen; j++) {
                getDocumentsByLoanReqId(user.wallet.address, lreq[0], j).then(
                  dreq => {
                    db.collection("users")
                      .where("wallet.address", "==", dreq[1])
                      .get()
                      .then(doc => {
                        _.forEach(doc.docs, d => {
                          const record = this.parseItem(
                            dreq,
                            lreq,
                            d.data().fullname,
                            j
                          );
                          if (record.valid !== false) {
                            this.items.push(record);
                          }
                        });
                      });
                  }
                );
              }
            });
          });
        }
      });
    },
    parseItem(data, req, name, idx) {
      return {
        id: data[0],
        bank: data[1],
        lrId: data[2],
        documents: JSON.parse(data[3]),
        valid: data[4],
        bankName: data[5],
        timestamp: data[6],
        status: data[7],
        user: req[1],
        loanType: req[2],
        amount: req[3],
        name,
        idx
      };
    },
    formatDate(t) {
      return moment(`${t}000`, "x").format("Do MMMM YYYY, h:mm:ss a");
    },
    acceptOffer(lrId, idx) {
      const user = this.$store.getters.user;
      acceptDocReq(user.wallet.address, lrId, idx);
      this.initialize();
    },
    rejectOffer(lrId, idx) {
      const user = this.$store.getters.user;
      rejectDocReq(user.wallet.address, lrId, idx);
      this.initialize();
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

.listItem {
  font-size: 10px;
}

.v-list-item__content {
  padding: 5px;
}

.v-list-item {
  padding: 0px;
}
</style>
