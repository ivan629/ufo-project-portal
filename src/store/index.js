import Vue from 'vue';
import Vuex from 'vuex';

import globeModule from './globeModule/globe.module';
import commonModule from './comonModule/common.module';
import statisticModule from './statisticModule/statistic.module';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    globeModule,
    commonModule,
    statisticModule
  }
});

export default store;
