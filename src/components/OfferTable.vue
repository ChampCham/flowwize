<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
    <template v-slot:item.timestamp="{ item }">
      {{ formatDate(item.timestamp) }}
    </template>

    <template v-slot:item.documents="{ item }">
      <v-list-item v-for="doc in item.documents" :key="doc">
        <v-list-item-content>
          <v-list-item-title v-text="doc" class="listItem"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn class="success">Accept</v-btn>
      <v-btn class="primary">Reject</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Bank Name", value: "bankName" },
      { text: "Doc Required", value: "documents" },
      { text: "Type", value: "type" },
      { text: "Amount", value: "amount" },
      { text: "Actions", value: "actions" }
    ],
    title: "My Loan Offer",
    items: []
  }),
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.items = [
        {
          bankName: "Siam Commercial Bank",
          documents: ["asdssaads", "dasdsasdad"],
          type: "car",
          amount: 6.0
        }
      ];
    }
  }
};
</script>

<style scoped>
.listItem {
  font-size: 10px;
}

.v-list-item__content {
  padding: 5px;
}

.v-list-item {
  padding: 0px;
}
</style>
