const state = () => ({
  position: {}
});
const getters = {
  getCity(state) {
    return state.position.city;
  }
};
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
