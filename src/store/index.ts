import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export interface State {
  typeBugs: number;
  otherBugs: number;
}

export default new Vuex.Store<State>({
  state: {
    typeBugs: 0,
    otherBugs: 0,
  },
  getters: {
    allBugs: state => state.typeBugs + state.otherBugs,
  },
  mutations: {
    newTypeBug(state) {
      state.typeBugs += 1;
    },
    newOtherBug(state) {
      state.otherBugs += 1;
    },
  },
  actions: {
    newTypeBug({ commit }) {
      commit('newTypeBug');
    },
    newOtherBug({ commit }) {
      commit('newOtherBug');
    },
  },
  strict: process.env.NODE_ENV !== 'production',
});
