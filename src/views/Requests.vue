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
export default {
  components: {
    Table,
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
