<template>
  <v-container fluid grid-list-xl text-xs-center class="mt-12 pt-5">
    <Header />
    <v-flex lg8 sm12 xs12 offset-lg2>
      <OffersTable />
    </v-flex>
  </v-container>
</template>
<script>
import OffersTable from "../components/OffersTable";
import Header from "@/components/Header";
export default {
  components: {
    OffersTable,
    Header
  },
  data() {
    return {
      type: "",
      amount: ""
    };
  },
  methods: {
    submit() {
      console.log("Submit");
    }
  }
};
</script>
