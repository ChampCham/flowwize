<template>
  <v-data-table :headers="headers" :items="users" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Loan Requests </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }"> </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn color="primary" @click="request(item)">
        Request
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
//todo: connect to database
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
      console.log("Initialized");
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
      // router.push("Request page")
      // this.$router.push({ path: "/request" });
      console.log("push to request page");
    }
  }
};
</script>
