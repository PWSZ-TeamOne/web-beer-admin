import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import { sync } from 'vuex-router-sync'
import VueFlashMessage from 'vue-flash-message';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

require("firebase/firestore");
Vue.use(BootstrapVue);

const config = {
  apiKey: "###",
  authDomain: "###",
  databaseURL: "###",
  projectId: "###",
  storageBucket: "###",
  messagingSenderId: "###",
  appId: "###"
};


firebase.initializeApp(config);

var db = firebase.firestore();
window.db = db;

var database = firebase.database();
window.database = database;

sync(store, router);

Vue.config.productionTip = false;
Vue.use(VueFlashMessage);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
