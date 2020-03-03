import { map } from 'lodash';

import { STATISTIC_CHART_DATA_SET, SET_YEARS_RANGE_SLIDER_SET, SELECTED_COUNTRY_CHANGE } from './statistic.actions';
import constants from '../../common/constants';
import usoService from '../../services/ufoService';

export default {
  namespaced: true,
  state: {
    selectedCountry: null,
    countries: null,
    pieChartsData: null,
    pieChartDataTypes: [],
    stockChartData: null,
    yearsRange: constants.UFO_STATISTIC_DEFAULT_START_STOP_YEARS_RANGE,
    yearsRangeSlider: constants.UFO_STATISTIC_DEFAULT_ACTIVE_YEARS_RANGE
  },
  mutations: {
    STATISTIC_CHART_DATA_SET (state, payload) {
      state.pieChartsData = payload.pie_chart_data;
      state.stockChartData = payload.stock_chart_data;
      state.yearsRange = payload.years_range;
      state.countries = payload.countries_data.countries;
      state.selectedCountry = payload.countries_data.selected_country;
      state.pieChartDataTypes = map(payload.pie_chart_data, (value, type) => type);
    },
    SET_YEARS_RANGE_SLIDER_SET (state, payload) {
      state.yearsRangeSlider = payload;
    },
    SELECTED_COUNTRY_CHANGE (state, payload) {
      state.selectedCountry = payload;
    }
  },
  actions: {
    updateCharts: async ({ commit, state }) => {
      const { yearsRangeSlider, selectedCountry } = state;
      const start = yearsRangeSlider[0];
      const stop = yearsRangeSlider[1];

      const data = await usoService.fetchStatisticChartData(start, stop, selectedCountry);

      commit(STATISTIC_CHART_DATA_SET, data);
    },
    setChartYearsRangeSlider ({ commit }, payload) {
      commit(SET_YEARS_RANGE_SLIDER_SET, payload);
    },
    changeSelectedCountry ({ commit }, payload) {
      commit(SELECTED_COUNTRY_CHANGE, payload);
    }
  }
};
