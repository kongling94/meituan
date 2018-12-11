// 本地化state

// 本地化 mutations

// 模块化
export const state = () => ({
  counter: 0
});

export const mutations = {
  increment(state) {
    state.counter++;
  }
};

export const actions = {
  async nuxtServerInit({ dispatch }, { req, app }) {
    const { region, city } = await app.$axios.get('/geo/getPosition');
    await dispatch('geo/setPosition', { city, region });
  }
};
