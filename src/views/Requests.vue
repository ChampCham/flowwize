<template>
  <v-container fluid grid-list-xl text-xs-center class="mt-12 pt-5">
    <Header :role="role" />
    <v-flex lg8 sm12 xs12 offset-lg2>
      <LoanRequestTable v-if="!loading" />
    </v-flex>
  </v-container>
</template>
<script>
import LoanRequestTable from "@/components/LoanRequestTable";
import Header from "@/components/Header";
import { mapGetters } from "vuex";

export default {
  components: {
    LoanRequestTable,
    Header
  },
  computed: {
    ...mapGetters(["error", "loading"])
  },
  data() {
    return {
      role: "user"
    };
  }
};
</script>
