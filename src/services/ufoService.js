import { isNil } from 'lodash';
import Vue from 'vue';

const GLOBE_DATA_API = 'items';
const STATISTIC_CHARTS_DATA_API = 'chart_data';

/* eslint no-return-await: 0 */
const ufoService = new Vue({
  data: {
    toggleLoading: null,
    serverApi: null
  },
  created () {
    const { VUE_APP_FD_SERVER_URL } = process.env;
    this.serverApi = isNil(VUE_APP_FD_SERVER_URL) ? '' : `${process.env.VUE_APP_FD_SERVER_URL}`;
  },
  methods: {
    setToggleLoadingCallback (callback) {
      this.toggleLoading = callback;
    },
    async fetchStatisticChartData (start, stop, country) {
      return await this.fetchHelper(
          `${this.serverApi}/${STATISTIC_CHARTS_DATA_API}`,
          {
            country,
            years_range: { start, stop }
          }
      );
    },
    async fetchGlobeMapData (filterData) {
      return await this.fetchHelper(`${this.serverApi}/${GLOBE_DATA_API}`, filterData);
    },
    async fetchHelper (api, body) {
      this.toggleLoading();

      const globeMapData = await fetch(api, {
        method: 'POST',
        body: JSON.stringify(body),
        cache: 'no-cache',
        headers: new Headers({
          'content-type': 'application/json'
        })
      });

      this.toggleLoading();
      return await globeMapData.json();
    }
  }
});

export default ufoService;
