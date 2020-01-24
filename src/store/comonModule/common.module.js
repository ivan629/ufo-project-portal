import { TOGGLE_LOADING, CHANGE_ACTIVE_MODE } from './common.actions';

const MODES = ['globe', 'chart statistic'];

export default {
  namespaced: true,
  state: {
    isLoading: false,
    modes: MODES,
    activeMode: MODES[0]
  },
  mutations: {
    TOGGLE_LOADING (state) {
      state.isLoading = !state.isLoading;
    },
    CHANGE_ACTIVE_MODE (state, payload) {
      state.activeMode = payload;
    }
  },
  actions: {
    toggleLoading ({ commit }) {
      commit(TOGGLE_LOADING);
    },
    changeActiveMode ({ commit }, payload) {
      commit(CHANGE_ACTIVE_MODE, payload);
    }
  },
  getters: {
    isGlobeMode: state => {
      return state.activeMode === MODES[0];
    }
  }
};
