<template>
  <v-container fluid grid-list-xl text-xs-center class="mt-12 pt-5">
    <Header />
    <v-flex lg8 sm12 xs12 offset-lg2>
      <Table />
    </v-flex>
  </v-container>
</template>
<script>
import Table from "@/components/Table";
import Header from "@/components/Header";
import { myRequestAt, numOfMyRequests } from "../plugins/getWeb3";

export default {
  components: {
    Table,
    Header
  },
  data() {
    return {
      type: "",
      amount: "",
      myRequests: []
    };
  },
  mounted() {
    numOfMyRequests(this.$store.getters.user.wallet.address).then(len => {
      for (let i = 0; i < len; i++) {
        myRequestAt(this.$store.getters.user.wallet.address, i).then(data => {
          this.myRequests.push(data);
        });
      }
    });
  },
  methods: {
    submit() {
      console.log("Submit");
    }
  }
};
</script>
