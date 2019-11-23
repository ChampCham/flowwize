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
    <template v-slot:item.documents="{ item }">
      <v-list-item v-for="doc in item.documents" :key="doc">
        <v-list-item-content>
          <v-list-item-title v-text="doc" class="listItem"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
      { text: "Request Doc.", value: "documents", sortable: false },
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
          type: 24,
          status: 25,
          documents: ["dsadsdadasd", "adsadsadsadas", "asdsadadsad"]
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
