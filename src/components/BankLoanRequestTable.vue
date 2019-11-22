<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Loan Requests </v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <RequestDialog />
    </template>
  </v-data-table>
</template>

<script>
import RequestDialog from "@/components/RequestDocumentDialog";
export default {
  components: {
    RequestDialog
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Users",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Date", value: "date" },
      { text: "Amount", value: "amount" },
      { text: "Type", value: "type" },
      { text: "Actions", value: "action", sortable: false }
    ],
    users: []
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.users = [
        {
          name: "Joey",
          date: 159,
          amount: 6.0,
          type: 24
        }
      ];
    },

    request() {
      console.log("push to request page");
    }
  }
};
</script>
