<template>
  <v-container fluid>
    <PDFToolbar
      :page="page"
      :num-pages="numPages"
      :scale="scale"
      @next-page="nextPage"
      @prev-page="prevPage"
      @zoom-in="zoomIn"
      @zoom-out="zoomOut"
    />
    <v-row justify="center">
      <v-col>
        <pdf :src="url" :page="page" :scale.sync="scale" class="pdf-viewer">
          <template slot="loading">loading content here...</template>
        </pdf>
      </v-col>
    </v-row>
    <PDFToolbar
      :page="page"
      :num-pages="numPages"
      :scale="scale"
      @next-page="nextPage"
      @prev-page="prevPage"
      @zoom-in="zoomIn"
      @zoom-out="zoomOut"
    />
  </v-container>
</template>

<script>
import pdf from "pdfvuer";
import PDFToolbar from "./PDFToolbar.vue";

export default {
  name: "PDFDocument",
  components: { pdf, PDFToolbar },
  props: {
    url: String
  },
  data() {
    return {
      scale: 1,
      page: 1,
      numPages: 0,
      pdfdata: undefined,
      errors: []
    };
  },
  mounted() {
    this.getPdf();
  },
  methods: {
    getPdf() {
      this.pdfdata = pdf.createLoadingTask(this.url);
      this.pdfdata.then(pdf => {
        this.numPages = pdf.numPages;
      });
    },
    nextPage() {
      if (this.page < this.numPages) {
        this.page++;
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
      }
    },
    zoomIn() {
      this.scale += this.scale < 2 ? 0.1 : 0;
      // this.scale = Math.round(this.scale * 10) / 10;
    },
    zoomOut() {
      this.scale -= this.scale > 0.2 ? 0.1 : 0;
      // this.scale = Math.round(this.scale * 10) / 10;
    }
  }
};
</script>

<style scoped>
.pdf-viewer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  overflow-y: scroll;
  overflow-x: scroll;
}
</style>
