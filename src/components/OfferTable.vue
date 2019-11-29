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
          <v-toolbar-title>
            <h1>Loan Offer</h1>
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
          text
          color="success"
          :disabled="item.status === 'accepted'"
          @click="acceptOffer(item.lrId, item.idx)"
          :loading="isLoading && item.status !== 'accepted'"
        >
          Accept
          <span slot="loader" class="custom-loader">
            <v-icon small light>fas fa-circle-notch</v-icon>
          </span>
        </v-btn>
        <v-btn
          text
          v-if="item.status !== 'accepted'"
          color="primary"
          @click="rejectOffer(item.lrId, item.idx)"
          :loading="isLoading && item.status !== 'accepted'"
        >
          Reject
          <span slot="loader" class="custom-loader">
            <v-icon small light>fas fa-circle-notch</v-icon>
          </span>
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
    items: [],
    isRefresh: false,
    isLoading: false,
    hasItems: true
  }),
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.isRefresh = true;
      this.hasItems = true;
      const user = this.$store.getters.user;
      numOfMyRequests(user.wallet).then(len => {
        if (len === 0) {
          this.hasItems = false;
        }
        this.items = [];
        for (let i = 0; i < len; i++) {
          myRequestAt(user.wallet, i).then(lreq => {
            getDocumentsLength(user.wallet, lreq[0]).then(dlen => {
              for (let j = 0; j < dlen; j++) {
                getDocumentsByLoanReqId(user.wallet, lreq[0], j).then(dreq => {
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
                });
              }
            });
          });
        }
        this.isRefresh = false;
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
    async acceptOffer(lrId, idx) {
      this.isLoading = true;
      const user = this.$store.getters.user;
      await acceptDocReq(user.wallet, lrId, idx);
      await this.initialize();
      this.isLoading = false;
    },
    async rejectOffer(lrId, idx) {
      this.isLoading = true;
      const user = this.$store.getters.user;
      await rejectDocReq(user.wallet, lrId, idx);
      await this.initialize();
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Roboto+Slab&display=swap");

h1 {
  text-align: center;
  color: #001851;
  font-family: "Roboto Slab", serif;
  font-size: 30px;
}

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
