<template>
  <Table />
</template>
<script>
import Table from "@/components/Table";
export default {
  components: {
    Table
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