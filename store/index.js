export const state = () => ({});
export const mutations = {};
export const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    let { city, region } = await app.$axios.get('/geo/getPosition');
    commit('geo/setPosition', { city, region });
  }
};
