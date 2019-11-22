<template>
  <div>
    <Header />
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="type"
          :rules="typeRules"
          label="Type"
          required
        ></v-text-field>
        <v-text-field
          v-model="amount"
          :counter="10"
          :rules="amountRules"
          label="Amount"
          required
        ></v-text-field>

        <v-select
          v-model="select"
          :items="BankNames"
          :rules="[v => !!v || 'Bank name is required']"
          label="Bank name"
          required
        ></v-select>

        <v-checkbox v-model="document" label="Document 1" required></v-checkbox>
        <v-checkbox v-model="document" label="Document 2" required></v-checkbox>
        <v-checkbox v-model="document" label="Document 3" required></v-checkbox>
      </v-form>
    </v-container>
  </div>
</template>
<script>
import Header from "@/components/Header";
export default {
  components: {
    Header
  },
  data: () => ({
    valid: true,
    type: "",
    typeRules: [v => !!v || "Type is required"],
    amount: "",
    amountRules: [v => !!v || "Amount is required"],
    select: null,
    BankNames: ["Bank 1", "Bank 2", "Bank 3", "Bank 4"],
    document: false
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
