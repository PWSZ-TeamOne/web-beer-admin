import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Users from "@/components/Users";
import Meetings from "@/components/Meetings";

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
      path: "/meetings",
      name: "Meetings",
      component: Meetings
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
