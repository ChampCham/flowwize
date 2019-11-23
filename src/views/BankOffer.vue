<template>
  <v-container fluid grid-list-xl text-xs-center class="mt-12 pt-5">
    <Header :role="role" />
    <v-flex lg8 sm12 xs12 offset-lg2>
      <BankOfferTable />
    </v-flex>
  </v-container>
</template>
<script>
import BankOfferTable from "@/components/BankOfferTable";
import Header from "@/components/Header";
export default {
  components: {
    BankOfferTable,
    Header
  },
  data() {
    return {
      type: "",
      amount: "",
      role: "bank"
    };
  }
};
</script>
