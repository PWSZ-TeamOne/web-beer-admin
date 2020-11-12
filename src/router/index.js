import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Users from "@/components/Users";

Vue.use(Router);

export default new Router({
  //mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/users",
      name: "Users",
      component: Users
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    }
  ]
});
