<template>
  <v-dialog max-width="600px" persistent v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" :disabled="isDisabled || isSubmit" class="primary">Request</v-btn>
    </template>
    <v-card>
      <v-card-title>Document Detail</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <DocumentRequestForm :loanType="req.loanType" :amount="req.amount" :documents="documents" />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text :disabled="loading" @click="clearInput">Close</v-btn>
        <v-btn text @click="onSubmit" :disabled="loading" :loading="loading" color="blue darken-1">
          Submit
          <span slot="loader" class="custom-loader">
            <v-icon color="blue darken-1" light>fas fa-spinner</v-icon>
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from "lodash";
import { requestDocument } from "../plugins/getWeb3";
import DocumentRequestForm from "@/components/DocumentRequestForm";
export default {
  components: {
    DocumentRequestForm
  },
  props: {
    req: Object,
    disableditems: Array
  },
  data() {
    return {
      dialog: false,
      documents: [
        {
          label: "National Identity Card",
          name: "national-id-card",
          checked: false,
          copies: 1
        },
        {
          label: "House Particular",
          name: "house-particular",
          checked: false,
          copies: 1
        }
      ],
      loading: false,
      isSubmit: false
    };
  },
  computed: {
    isDisabled() {
      let isDis = false;
      _.forEach(this.disableditems, dis => {
        if (dis === this.req.id) {
          isDis = true;
        }
      });
      return isDis;
    }
  },
  methods: {
    clearInput() {
      this.documents = [
        {
          label: "National Identity Card",
          name: "national-id-card",
          checked: false,
          copies: 1
        },
        {
          label: "House Particular",
          name: "house-particular",
          checked: false,
          copies: 1
        }
      ];
      this.dialog = false;
    },
    onSubmit() {
      this.loading = true;
      const tmp = _.filter(this.documents, doc => doc.checked).map(doc => ({
        label: doc.label,
        name: doc.name,
        copies: doc.copies
      }));
      const user = this.$store.getters.user;
      requestDocument(
        user.wallet,
        this.req.id,
        JSON.stringify(tmp),
        user.fullname
      ).then(() => {
        this.loading = false;
        this.isSubmit = true;
        //this.$emit("initialize");

        this.clearInput();
      });
    }
  }
};
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
