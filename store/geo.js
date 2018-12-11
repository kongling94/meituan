export const state = () => ({
  position: {}
});
export const mutations = {
  setPosition(state, val) {
    state.position = val;
  }
};
export const actions = {
  setPosition: ({ commit }, data) => {
    commit('setPosition', data);
  }
};
