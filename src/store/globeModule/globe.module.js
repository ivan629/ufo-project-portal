import usoService from '../../services/ufoService';
import { SET_GLOBE_MARKERS_DATA, TOGGLE_LOADING, CHANGE_ACTIVE_GLOBE_VIEW } from './globe.actions';

const GLOBE_VIEWS = ['map', 'globe'];

export default {
  namespaced: true,
  state: {
    isLoading: false,
    globeViews: GLOBE_VIEWS,
    activeGlobeView: GLOBE_VIEWS[1],
    yearsRange: { start: 1929, stop: 2014 },
    globeMarkersToDisplay: null
  },
  mutations: {
    SET_GLOBE_MARKERS_DATA (state, payload) {
      state.globeMarkersToDisplay = payload;
    },
    TOGGLE_LOADING (state) {
      state.isLoading = false;
    },
    CHANGE_ACTIVE_GLOBE_VIEW (state, payload) {
      state.activeGlobeView = payload;
    }
  },
  actions: {
    setGlobeData: async ({ commit }, { yearsRangeSlider, monthsRangeSlider, daysRangeSlider, groupedByRegionId }) => {
      commit(TOGGLE_LOADING);

      const filterData = {
        regionType: groupedByRegionId,
        year: { start: yearsRangeSlider[0], stop: yearsRangeSlider[1] },
        month: { start: monthsRangeSlider[0], stop: monthsRangeSlider[1] },
        day: { start: daysRangeSlider[0], stop: daysRangeSlider[1] }
      };

      const markersToDisplay = await usoService.fetchGlobeMapData(filterData);

      commit(SET_GLOBE_MARKERS_DATA, markersToDisplay);
    },
    toggleLoading ({ commit }) {
      commit(TOGGLE_LOADING);
    },
    changeActiveGlobeView ({ commit }, payload) {
      commit(CHANGE_ACTIVE_GLOBE_VIEW, payload);
    }
  }
};
