
<template>
  <v-card class="overflow-hidden">
    <v-app-bar 
      absolute
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-toolbar-title>
        <!-- <img src="@/assets/instagram-logo.png" alt="logo" /> -->
        <div class="vl"></div>
        <a href="index.html">Instagram</a>
      </v-toolbar-title>

      <div class="flex-grow-1"></div>

      <!-- <v-toolbar-items> -->
      <v-btn icon @click="global">
        <v-icon>far fa-compass</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>far fa-heart</v-icon>
      </v-btn>
      <v-btn icon @click="profile">
        <v-icon>far fa-user</v-icon>
      </v-btn>
      <v-btn icon @click="signOut">
        <v-icon>fas fa-sign-out-alt</v-icon>
      </v-btn>
      <!-- </v-toolbar-items> -->
    </v-app-bar>
    <v-sheet id="scrolling-techniques-7" class="overflow-y-auto" max-height="600">
      <v-container style="height: 1500px;"></v-container>
    </v-sheet>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "nav-bar",
  data() {
    return {
      isSignIn: false
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  watch: {
    currentUser(value) {
      if (value == null || value == undefined) {
        this.$router.replace("/signin");
      }
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
    },
    global() {
      const path = "/globallist";
      const currentRoute = this.$router.currentRoute;
      if (path !== currentRoute.path) {
        this.$router.push(path)
      }
    },
    profile() {
      const path = "/gallery";
      const currentRoute = this.$router.currentRoute;
      if (path !== currentRoute.path) {
        this.$store.commit("setUser", this.currentUser);
        this.$router.push(path)
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Grand+Hotel&display=swap");
img {
  width: 20px;
  display: inline-block;
}
.vl {
  border-left: 1px solid black;
  margin-left: 10px;
  margin-right: 10px;
  height: 20px;
  display: inline-block;
}

.nav-icon i {
  padding: 0px 10px;
}

.navbar-brand .v-application a {
  color: black; /* Remove underline */
  font-family: "Grand Hotel", cursive;
  text-decoration: none;
  font-size: 35px;
}
</style>