<template>
  <div>
    <div class="d-flex align-items-center login-box">
      <div class="m-auto">
        <h2>{{ this.text }}</h2>
        <br />
        <div class="md-form mb-5 text-left">
          <i class="fas fa-user prefix grey-text"></i>
          <label for="nickname">Email</label>
          <input
            type="email"
            ref="email"
            id="email"
            class="form-control"
            v-model="email"
            required
          />
        </div>
        <div class="md-form mb-5 text-left">
          <i class="fas fa-user prefix grey-text"></i>
          <label for="nickname">Password</label>
          <input
            type="password"
            ref="password"
            id="password"
            class="form-control"
            v-model="password"
            required
          />
        </div>
        <button @click="login" id="login" class="btn-lg">Sign in</button>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import store from "../store";
import alert from "../mixins/alert";
import validateLogin from "../mixins/validateLogin";
export default {
  name: "Login",
  mixins: [alert, validateLogin],
  data() {
    return {
      text: "Sign in",
      password: null,
      email: null,
      errors: {},
    };
  },
  methods: {
    login() {
      if (this.checkForm() === true) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(async (result) => {
            let user = result.user;
            if (user) {
              firebase
                .firestore()
                .collection("admins")
                .where("userId", "==", user.uid)
                .where("role", "==", "admin")
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach(function (doc) {
                    const userData = doc.data();
                    store.dispatch("setSession", userData);
                  });
                  this.alert("Logged in!", "success");
                  this.$router.push("/users").catch(() => {});
                });
            }
          })
          .catch(() => {
            this.alert("Invalid data, please check and try again!", "error");
          });
      }
    },
  },
};
</script>

<style scoped>
.login-box {
  height: 100vh;
}
</style>
