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
            <h1>Loan Requests</h1>
          </v-toolbar-title>
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
      <template v-slot:item.action="{ item }">
        <RequestDialog
          :req="item"
          :disableditems="disableditems"
          @initialize="initialize"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from "moment";
import _ from "lodash";
import { db } from "../firebase";
import {
  numOfAllRequests,
  requestAt,
  numOfMyBankRequests,
  myBankRequestAt
} from "../plugins/getWeb3";
import RequestDialog from "@/components/RequestDocumentDialog";
import { mapGetters } from "vuex";
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
    items: [],
    disableditems: [],
    bankRequests: [],
    hasItems: true
  }),
  computed: {
    ...mapGetters(["user"])
  },
  mounted() {
    this.initialize();
  },
  watch: {
    items(value) {
      numOfMyBankRequests(this.user.wallet).then(len => {
        this.bankRequests = [];
        for (let i = 0; i < len; i++) {
          myBankRequestAt(this.user.wallet, i).then(req => {
            const request = this.parseRequest(req);
            _.forEach(value, item => {
              if (
                request.lrId === item.id &&
                !this.disableditems.includes(request.lrId)
              ) {
                this.disableditems.push(request.lrId);
              }
            });
          });
        }
      });
    }
  },
  methods: {
    initialize() {
      this.hasItems = true;
      numOfAllRequests().then(len => {
        if (len === 0) {
          this.hasItems = false;
        }
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
    parseRequest(data) {
      return {
        id: data[0],
        bank: data[1],
        lrId: data[2],
        documents: JSON.parse(data[3]),
        valid: data[4],
        bankName: data[5],
        timestamp: data[6]
      };
    },
    formatDate(t) {
      return moment(`${t}000`, "x").format("Do MMMM YYYY, h:mm:ss a");
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
</style>
