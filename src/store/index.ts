import Vue from 'vue';
import Vuex from 'vuex';

import * as api from '../api';

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
    newBug(state, isTypeBug: boolean) {
      if (isTypeBug) {
        state.typeBugs += 1;
      } else {
        state.otherBugs += 1;
      }
    },
    updateBugs(state, newState: api.Counts) {
      Object.assign(state, newState);
    },
  },
  actions: {
    fetchBugs(context) {
      api.countBugs()
        .then((newState) => {
          context.commit('updateBugs', newState);
        })
        .catch((error: any) => {
          console.error('Unexpected error while fetching bugs:', error);
        });
    },
    newBug(context, isTypeBug: boolean) {
      context.commit('newBug', isTypeBug);
      api.addBug(new api.Bug(isTypeBug))
        .then((_docRef) => {
          context.dispatch('fetchBugs');
        })
        .catch((error: any) => {
          console.error('Unexpected error while adding bug:', error);
        });
    },
  },
  strict: process.env.NODE_ENV !== 'production',
});
