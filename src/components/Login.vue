<template>
  <div>
    <flash-message
      transitionIn="animated swing"
      class="alert-box"
    ></flash-message>
    <div class="d-flex align-items-center main-box">
      <div class="m-auto login-box">
        <h2>{{ this.text }}</h2>
        <p class="text-danger">{{ this.info }}</p>
        <br />
        <div class="md-form mb-5 text-left">
          <i class="fas fa-user prefix"></i>
          <label for="email">Email</label>
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
          <i class="fas fa-user prefix"></i>
          <label for="password">Hasło</label>
          <input
            type="password"
            ref="password"
            id="password"
            class="form-control"
            v-model="password"
            required
          />
        </div>
        <button @click="login" id="login" class="btn-lg btn-light">Zaloguj</button>
        <br />
        <br />
        <router-link to="/register">
          <button id="register" class="btn-lg btn-dark">
            Zarejestruj się!
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import store from "../store";
import alert from "../mixins/alert";
export default {
  name: "Login",
  mixins: [alert],
  data() {
    return {
      text: "Logowanie",
      password: null,
      email: null,
    };
  },
  methods: {
    login() {
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
                this.alert("Logowanie prawidłowe!", "success");
                console.log("zalogowano");
                this.$router.push("/users").catch(()=>{});;
              });
          }
        })
        .catch(() => {
          this.alert("Logowanie nie prawidłowe, złe dane!", "error");
        });
    },
  },
};
</script>

<style scoped>
.main-box {
  background-color: #e2e2e5;
  height: 100vh;
}
.login-box {
  background-color: #34495e;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #ecf0f1;
  padding: 60px;
}
</style>
