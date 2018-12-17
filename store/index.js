import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import geo from './modules/geo';
import home from './modules/home';
Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    modules: {
      geo,
      home
    },
    actions: {
      async nuxtServerInit({ commit }, { req, app }) {
        let pos = await app.$axios.get('geo/getPosition');
        let home = await app.$axios.get('geo/menu');
      }
    },
    plugins: [createLogger()]
  });

export default store;
