<template>
  <div>
    <flash-message
      transitionIn="animated swing"
      class="alert-box"
    ></flash-message>
    <div class="d-flex align-items-center main-box">
      <div class="m-auto register-box">
        <h2>{{ this.text }}</h2>
        <p class="text-danger">{{ this.info }}</p>
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
          <label for="nickname">Hasło</label>
          <input
            type="password"
            ref="password"
            id="password"
            class="form-control"
            v-model="password"
            required
          />
        </div>
        <button @click="register" id="register" class="btn-lg btn-light">
          Zarejestruj
        </button>
        <br />
        <br />
        <router-link to="/">
          <button id="login" class="btn-lg btn-dark">Zaloguj się!</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import alert from "../mixins/alert";
import store from "../store";
export default {
  name: "Register",
  mixins: [alert],
  data() {
    return {
      text: "Rejestracja",
      info: "",
      password: null,
      email: null,
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async (result) => {
          firebase
            .firestore()
            .collection("admins")
            .doc(result.user.uid)
            .set({
              userId: result.user.uid,
              email: this.email,
              pass: this.password,
              role: "admin",
            })
            .then((docRef) => {
              let loginData = {
                userId: result.user.uid,
                email: result.user.email,
                role: result.user.role,
              };
              store.dispatch("setSession", loginData);
              this.$router.push({ path: "/users" });
            })
            .catch(() => {
              this.alert("Rejestracja nie prawidłowa!", "error");
            });
        })
        .catch(() => {
          this.alert("Rejestracja nie prawidłowa!", "error");
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-box {
  background-color: #e2e2e5;
  height: 100vh;
}
.register-box {
  background-color: #34495e;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #ecf0f1;
  padding: 60px;
}
</style>
