<template>
  <div>
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-icon>"fas fa-sign-out-alt"</v-icon>
          </v-list-item-action>
          <v-list-item-content @click="logOut">LogOut</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">{{
          appTitle
        }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn text @click="logOut">
          <v-icon left>"fas fa-sign-out-alt"</v-icon>LogOut
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      appTitle: "Flowwize",
      sidebar: false,
      menuItems: [
        { title: "My Request", path: "/request", icon: "fas fa-users" },
        { title: "My Offer", path: "/request", icon: "fas fa-users" },
        { title: "Upload", path: "/request", icon: "fas fa-users" }
      ]
    };
  },
  methods: {
    logOut() {
      this.$store
        .dispatch({
          type: "logOut"
        })
        .then(() => {
          console.log("dsadasdsa");
          this.$router.replace("/login");
        });
    }
  }
};
</script>
<style></style>
