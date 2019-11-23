<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="loanType" disabled label="Loan Type"></v-text-field>
    <v-text-field v-model="amount" disabled label="Amount"></v-text-field>

    <v-row v-for="(doc, idx) in documents" :key="idx">
      <v-col cols="8">
        <v-checkbox v-model="doc.checked" :label="doc.label"></v-checkbox>
      </v-col>
      <v-col cols="4">
        <v-text-field
          type="number"
          :disabled="!doc.checked"
          v-model="doc.copies"
          min="1"
          max="10"
          label="Number of Copies"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
export default {
  props: {
    loanType: String,
    amount: String,
    documents: Array
  },
  data: () => ({
    valid: true,
    select: null,
    BankNames: ["Bank 1", "Bank 2", "Bank 3", "Bank 4"]
  })
};
</script>
