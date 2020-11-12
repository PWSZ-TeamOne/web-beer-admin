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
    apiKey: "AIzaSyANka3bhfzVI2kNARFvcuyTfxaWQRQJGLo",
    authDomain: "browarapp.firebaseapp.com",
    databaseURL: "https://browarapp.firebaseio.com",
    projectId: "browarapp",
    storageBucket: "browarapp.appspot.com",
    messagingSenderId: "883017495908",
    appId: "1:883017495908:web:2c4fa4e6f4558ebae5b671"
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
