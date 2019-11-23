<template>
  <v-toolbar dense fixed class="ml-2 mr-2">
    <v-row justify="center" align="center">
      <v-btn fab text @click="$emit('prev-page')">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <p class="title ma-2">{{ page }} / {{ numPages ? numPages : "∞" }}</p>
      <v-btn fab text @click="$emit('next-page')">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn fab text @click="$emit('zoom-in')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <p class="title ma-2">{{ formattedZoom }} %</p>
      <v-btn fab text @click="$emit('zoom-out')">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </v-row>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    page: Number,
    numPages: Number,
    scale: Number
  },
  computed: {
    formattedZoom() {
      console.log(this.scale);
      return this.scale * 100;
    }
  }
};
</script>
<style scoped></style>
