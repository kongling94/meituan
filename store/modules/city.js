const state = () => {
  list: ['王大民', '谭天舒', '李胜文'];
};
const mutations = {
  add(state, text) {
    state.list.push(text);
  }
};
const actions = {
  add: ({ commit }, text) => {
    commit('add', text);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
