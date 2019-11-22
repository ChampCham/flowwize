<template>
  <v-container fluid grid-list-xl text-xs-center class="mt-12 pt-5">
    <Header :role="role" />
    <v-flex lg8 sm12 xs12 offset-lg2>
      <OfferTable />
    </v-flex>
  </v-container>
</template>
<script>
import OfferTable from "@/components/OfferTable";
import Header from "@/components/Header";
export default {
  components: {
    OfferTable,
    Header
  },
  data() {
    return {
      type: "",
      amount: "",
      role: "user"
    };
  },
  methods: {
    submit() {
      console.log("Submit");
    }
  }
};
</script>
