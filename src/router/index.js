import Vue from "vue";
import store from "@/store";
import Router from "vue-router";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Users from "@/components/Users";
import Meetings from "@/components/Meetings";

Vue.use(Router);

const router = new Router({
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
    }
    // {
    //   path: "/register",
    //   name: "Register",
    //   component: Register
    // }
  ]
});

router.beforeEach((to, from, next) => {
  if ((to.name !== 'Login') && store.state.logged !== true) next({ name: 'Login' })
  else next()
});

export default router;
