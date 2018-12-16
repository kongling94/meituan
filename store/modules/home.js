const state = () => ({
  menu: [],
  hotPlace: []
});
const mutations = {
  setMenu(state, val) {
    state.menu = val;
  },
  setHotplace(state, val) {
    state.hotPlace = val;
  }
};
const actions = {
  setMenu: ({ commit }, data) => {
    commit('setMenu', data);
  },
  setHotplace: ({ commit }, data) => {
    commit('setHotplace', data);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
