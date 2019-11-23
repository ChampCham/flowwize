<template>
  <div>
    <Header />
    <v-container class="mt-12">
      <v-card>
        <v-card-title>Documents</v-card-title>
        <v-list>
          <v-list-group
            v-for="(doc, idx) in documents"
            :key="idx"
            no-action
            sub-group
            value="true"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ doc.label }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item>
              <v-layout column class="ma-4">
                <input
                  :alt="doc.label"
                  type="file"
                  :name="doc.name"
                  :id="doc.name"
                  :ref="doc.name"
                  accept="application/pdf"
                  @change="handleFileUpload(doc.name)"
                  hidden
                />
                <v-layout column v-if="doc.url !== null">
                  Download PDF File
                  <a class="ml-2" target="_blank" :href="doc.url">
                    here
                  </a>
                  <PDFDocument :url="doc.url" />
                </v-layout>
                <h1 v-else>File not yet uploaded</h1>
                <v-btn block class="mt-2" @click="upload(doc.name)"
                  >{{ doc.url === null ? `Upload` : `Update` }}
                  {{ doc.label }}</v-btn
                >
              </v-layout>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import _ from "lodash";
import { storage, fb } from "../firebase";
import Header from "../components/Header";
import PDFDocument from "../components/PDFDocument";
export default {
  components: { PDFDocument, Header },
  data() {
    return {
      storageRef: storage.ref().child(fb.auth().currentUser.uid),
      documents: [
        {
          label: "National Identity Card",
          name: "national-id-card",
          url: null
        },
        {
          label: "House Particular",
          name: "house-particular",
          url: null
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const tmp = _.cloneDeep(this.documents);
      _.forEach(tmp, doc => {
        this.getDownloadUrl(doc);
      });
    },
    getDownloadUrl(doc) {
      this.storageRef
        .child(`${doc.name}.pdf`)
        .getDownloadURL()
        .then(url => {
          const tmp = _.cloneDeep(this.documents);
          const idx = _.findIndex(tmp, d => d.name === doc.name);
          tmp[idx].url = url;
          this.documents = tmp;
        })
        .catch(() => {});
    },
    upload(name) {
      this.$refs[name][0].click();
    },
    handleFileUpload(name) {
      const filename = `${name}.pdf`;
      const uploadedFile = this.$refs[name][0].files[0];
      this.storageRef
        .child(filename)
        .put(uploadedFile)
        .then(() => {
          const tmp = _.cloneDeep(this.documents);
          _.forEach(tmp, doc => {
            doc.url = null;
          });
          this.documents = tmp;
          this.init();
        });
    }
  }
};
</script>

<style scoped></style>
