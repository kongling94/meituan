import Vuex from 'vuex';
import VuexLogger from 'vuex/dist/logger';
import geo from './modules/geo';

const debug = process.env.NODE_ENV !== 'production';

const store = () => {
  return new Vuex.Store({
    // 本地化state

    // 本地化 mutations
    mutations: {},
    // 模块化
    modules: {
      geo
    },
    actions: {
      async nuxtServerInit({ commit }, { req, app }) {
        const {
          status,
          data: { province, city }
        } = await app.$axios.get('/geo/getPosition');
        commit(
          'geo/setPosition',
          status === 200 ? { city, province } : { city: '', province: '' }
        );
      }
    },
    plugins: debug ? [VuexLogger()] : [],
    strict: debug
  });
};

export default store;
