import Vue from "vue";
import VueFirestore from "vue-firestore";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueSweetalert2 from 'vue-sweetalert2';
import { fb, db } from "./firebase";

Vue.config.productionTip = false;
Vue.use(VueFirestore, {
  key: "id", // the name of the property. Default is '.key'.
  enumerable: true //  whether it is enumerable or not. Default is true.
});
Vue.use(VueSweetalert2);
Vue.prototype.$firebase = fb;
Vue.prototype.$database = db;
let app = null;
//To make sure that auth ready
fb.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      render: h => h(App),
      created() {
        if (user) {
          this.$store.dispatch("autoSignIn", user);
          this.$store.dispatch("fetchUserData");
        }
      },
      vuetify,
      router,
      store
    }).$mount("#app");
  }
});
