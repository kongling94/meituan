import Vuex from 'vuex';
import VuexLogger from 'vuex/dist/logger';
const debug = process.env.NODE_ENV !== 'production';
new Vuex.Store({
  state: () => ({
    counter: 0
  }),
  mutations: {
    increment(state) {
      state.counter++;
    }
  },
  modules: {
    namespaced: true,
    todos: {
      state: () => ({
        list: []
      }),
      mutations: {
        add(state, { text }) {
          state.list.push({
            text,
            done: false
          });
        },
        remove(state, { todo }) {
          state.list.splice(state.list.indexOf(todo), 1);
        },
        toggle(state, { todo }) {
          todo.done = !todo.done;
        }
      }
    }
  },
  plugins: debug ? [VuexLogger()] : [],
  strict: debug
});
