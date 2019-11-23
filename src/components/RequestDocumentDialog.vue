<template>
  <v-dialog max-width="600px" persistent v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="primary">Request</v-btn>
    </template>
    <v-card>
      <v-card-title>Document Detail</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <DocumentRequesstForm />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="onSubmit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DocumentRequesstForm from "@/components/DocumentRequesstForm";
export default {
  components: {
    DocumentRequesstForm
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    onSubmit() {
      console.log("Submit form");
    }
  }
};
</script>
