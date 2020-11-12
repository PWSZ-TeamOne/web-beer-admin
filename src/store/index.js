import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    admin: {
      userId: null,
      email: null,
      role: null
    },
    logged:null
  },
  getters: {
    getUser: state => state.admin,
  },
  mutations: {
    storeUser(state, data) {
      state.admin = data;
      state.logged = true;
    },
    logoutUser(state, data) {
      state.admin = data;
      state.logged = null;
    },
  },
  actions: {
    setSession({
      commit
    }, data) {
      commit('storeUser', data)
    },
    logout({
      commit
    }, data) {
      commit('logoutUser', data)
    }
  }
})
