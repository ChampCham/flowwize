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
    <template v-slot:item.actions="{ item }">
      <!-- <v-btn :disabled="!item.valid" @click="cancelReq(item.id)">Cancel</v-btn> -->
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
      { text: "Doc Required", value: "document" },
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
          document: ['asdssaads','dasdsasdad'],
          type: 'car',
          amount: 6.0,
        }
      ];
    },

  }
};
</script>
