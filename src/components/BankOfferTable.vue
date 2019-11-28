<template>
  <div class="container">
    <v-data-table :headers="headers" :items="items" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>My Offers</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.timestamp="{ item }">{{
        formatDate(item.timestamp)
      }}</template>
      <template v-slot:item.links="{ item }">
        <v-layout v-if="item.links" column>
          <a
            v-for="k in Object.keys(item.links)"
            :key="k"
            :href="item.links[k]"
            >{{ k }}</a
          >
        </v-layout>
        <v-layout v-else>No Permission</v-layout>
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
    </v-data-table>
  </div>
</template>

<script>
import _ from "lodash";
import CryptoJS from "crypto-js";
import moment from "moment";
import {
  numOfMyBankRequests,
  myBankRequestAt,
  requestAt
} from "../plugins/getWeb3";
import { db } from "../firebase";

export default {
  data: () => ({
    headers: [
      { text: "Users", value: "name" },
      { text: "Loan Type", value: "loanType" },
      { text: "Amount", value: "amount" },
      { text: "Request Doc.", value: "documents", sortable: false },
      { text: "Status", value: "status" },
      { text: "Date", value: "timestamp" },
      { text: "Document Links", value: "links" }
    ],
    items: []
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      const bank = this.$store.getters.user;
      numOfMyBankRequests(bank.wallet.address).then(len => {
        this.items = [];
        for (let i = 0; i < len; i++) {
          myBankRequestAt(bank.wallet.address, i).then(res => {
            db.collection("users")
              .where("wallet.address", "==", res[1])
              .get()
              .then(ddocs => {
                _.forEach(ddocs.docs, dd => {
                  requestAt(res[2]).then(lreq => {
                    db.collection("users")
                      .where("wallet.address", "==", lreq[1])
                      .get()
                      .then(doc => {
                        _.forEach(doc.docs, d => {
                          const record = this.parseItem(
                            res,
                            lreq,
                            d.data().fullname,
                            dd.data().wallet.privateKey
                          );
                          this.items.push(record);
                        });
                      });
                  });
                });
              });
          });
        }
      });
    },
    parseItem(data, req, name, key) {
      let links = null;
      if (data[8] && data[8] !== "") {
        links = JSON.parse(
          CryptoJS.AES.decrypt(data[8], key).toString(CryptoJS.enc.Utf8)
        );
      }
      return {
        id: data[0],
        bank: data[1],
        lrId: data[2],
        documents: JSON.parse(data[3]),
        valid: data[4],
        bankName: data[5],
        timestamp: data[6],
        status: data[7],
        links,
        user: req[1],
        loanType: req[2],
        amount: req[3],
        name
      };
    },
    formatDate(t) {
      return moment(`${t}000`, "x").format("Do MMMM YYYY, h:mm:ss a");
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
