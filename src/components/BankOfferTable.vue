<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My Offers</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:item.status="{ item }">
      <v-chip
        label
        small
        :color="getColorByStatus(item.status)"
        text-color="white"
        >{{ item.status }}</v-chip
      >
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn color="primary">Done</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
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
      { text: "Status", value: "status" },
      { text: "Amount", value: "amount" },
      { text: "Type", value: "type" },
      { text: "Actions", value: "action", sortable: false },
      { text: "Request Doc.", value: "documents", sortable: false }
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
          type: 24,
          status: 25
        }
      ];
    },

    request() {
      console.log("push to request page");
    },
    getColorByStatus(status) {
      if (status > 400) return "red";
      else if (status > 200) return "orange";
      else return "green";
    }
  }
};
</script>
