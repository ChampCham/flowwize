<template>
  <v-container fluid grid-list-xl text-xs-center class="mt-12 pt-5">
    <Header :role="role" />
    <v-flex lg8 sm12 xs12 offset-lg2>
      <BankLoanRequestTable />
    </v-flex>
    <v-flex lg8 sm12 xs12 offset-lg2>
      <v-btn block v-if="false" @click="regisBankRequester">Register Requester</v-btn>
    </v-flex>
  </v-container>
</template>
<script>
import BankLoanRequestTable from "@/components/BankLoanRequestTable";
import Header from "@/components/Header";
import { registerBank } from "../plugins/getWeb3";
export default {
  components: {
    BankLoanRequestTable,
    Header
  },
  data() {
    return {
      type: "",
      amount: "",
      role: "bank"
    };
  },
  methods: {
    regisBankRequester() {
      registerBank(this.$store.getters.user.wallet.address);
    }
  }
};
</script>
