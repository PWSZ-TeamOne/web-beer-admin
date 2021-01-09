import Vue from "vue";
import App from "./App";
import vuetify from '@/plugins/vuetify' // path to vuetify export
import router from "./router";
import store from "./store";
import firebase from "firebase";
import VueFlashMessage from 'vue-flash-message';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

require("firebase/firestore");
Vue.use(BootstrapVue);

const config = {
  //place
};


firebase.initializeApp(config);

var db = firebase.firestore();
window.db = db;


Vue.config.productionTip = false;
Vue.use(VueFlashMessage);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
