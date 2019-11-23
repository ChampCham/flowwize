<template>
    <v-layout row>
  <v-flex lg8 sm12 xs12 offset-lg2>
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
  </v-flex>
  </v-layout>
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
      return this.scale * 100;
    }
  }
};
</script>
<style scoped></style>
