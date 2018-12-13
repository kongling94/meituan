const state = () => ({
  position: {}
});
const mutations = {
  setPosition(state, val) {
    state.position = val;
  }
};
const actions = {
  setPosition: ({ commit }, data) => {
    commit('setPosition', data);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
