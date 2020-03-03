import Vue from 'vue';
import Vuex from 'vuex';
import VueParticles from 'vue-particles';
import vuetify from './plugins/vuetify';
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
import stockInit from 'highcharts/modules/stock';
import * as VueGoogleMaps from 'vue2-google-maps';

import App from './App';
import store from './store';

const { geopoliticalMapOptions } = require('../package.json');

Vue.use(VueGoogleMaps, { load: geopoliticalMapOptions });
Vue.use(Vuex);
stockInit(Highcharts);
Vue.use(VueParticles);
Vue.use(HighchartsVue);
Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  VueParticles,
  render: h => h(App)
}).$mount('#app');
