<template>
  <div class="stockChartContainer">
    <div
      id="stockChartContainer"
      class="chartContainer" />
    <div class="bottomGroupControls">
      <v-btn
        outlined
        class="bottomGroupToggleChartType"
        @click="toggleChartType()">
        {{ isAreaCurrentChartType ? 'Switch to Column view' : 'Switch to Area view' }}
      </v-btn>
      <div class="chartTypesOfGroupingControls">
        <v-btn
          v-for="groupType in groupChartTypes"
          :key="groupType"
          outlined
          class="bottomGroupControlsButton"
          :class="{active: groupType === activeChartType}"
          @click="changeActiveChartType(groupType)">
          {{ groupType }}
        </v-btn>
      </div>
      <v-btn
        outlined
        class="resetZomButton"
        @click="resetZomButton()">
        reset zoom
      </v-btn>
    </div>
  </div>
</template>

<script>
import { isNil, map, has } from 'lodash';
import Highcharts from 'highcharts';
import { createNamespacedHelpers } from 'vuex';

import { darkChartTheme } from '../../thems';
const { mapActions, mapState } = createNamespacedHelpers('statisticModule');

Highcharts.theme = darkChartTheme(Highcharts);
Highcharts.setOptions(Highcharts.theme);

const GROUP_CHART_TYPES = ['day', 'month', 'year'];
const CHART_TYPES = {
  AREA: 'area',
  COLUMN: 'column'
};

export default {
  data: () => ({
    isAreaCurrentChartType: true,
    groupChartTypes: null,
    activeChartType: null
  }),
  computed: {
    ...mapState(['stockChartData', 'pieChartsData'])
  },
  watch: {
    activeChartType () {
      this.redraw();
    },
    isAreaCurrentChartType () {
      this.redraw();
    },
    stockChartData () {
      this.redraw();
    }
  },
  created () {
    this.groupChartTypes = GROUP_CHART_TYPES;
    this.activeChartType = GROUP_CHART_TYPES[1];
  },
  mounted () {
    const highchartsOptions = {
      chart: {
        type: 'area',
        zoomType: 'x',
        renderTo: 'stockChartContainer',
        resetZoomButton: {
          theme: {
            display: 'none'
          }
        }
      },
      title: {
        text: 'Ufo frequency chart'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Ufo amount'
        }
      },
      legend: {
        enabled: false
      },
      series: [{
        name: 'UFO amount',
        type: 'area',
        data: [],
        color: '#6fcd98'
      }],
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          marker: {
            radius: 2,
            enabled: false
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      }
    };

    this.chart = new Highcharts.StockChart(highchartsOptions);
  },
  methods: {
    ...mapActions({
      updateCharts: 'updateCharts'
    }),
    redraw () {
      this.chart.series[0].update({
        data: this.getGroupedUfoItems('ufo_data'),
        type: this.isAreaCurrentChartType ? CHART_TYPES.AREA : CHART_TYPES.COLUMN
      });
    },
    /*eslint-disable */
    getGroupedUfoItems (data_type) {
      if (!isNil(this.activeChartType) && !isNil(this.stockChartData)) {
        return has(this.stockChartData, this.activeChartType)
          ? map(this.stockChartData[this.activeChartType][data_type], ({ milliseconds_date, value }) => [milliseconds_date, value])
          : [];
      }
    },
    /* eslint-enable */
    changeActiveChartType (newChartType) {
      this.activeChartType = newChartType;
    },
    toggleChartType () {
      this.isAreaCurrentChartType = !this.isAreaCurrentChartType;
    },
    resetZomButton () {
      this.chart.zoomOut();
    }
  }
};
</script>

<style scoped lang="scss">
    @import '../../common/styles/constants';

    .stockChartContainer {
        .chartContainer {
            height: 100%;
        }

        .bottomGroupControls {
            padding: 10px 0;
            display: flex;
            justify-content: space-between;

            .resetZomButton,
            .bottomGroupToggleChartType,
            .chartTypesOfGroupingControls .bottomGroupControlsButton {
                margin: 0 10px;
                text-transform: uppercase;
                font-size: 14px;
                padding: 0 5px;
                height: 25px;
                border-radius: 0;
                border-color: transparent;
                color: $white;

              &.bottomGroupToggleChartType {
                    color: $blue;
                }

                &.resetZomButton {
                    margin-left: 110px;
                }
            }

            .chartTypesOfGroupingControls {
                .bottomGroupControlsButton {
                    &.active {
                        color: $green;
                        border-color: $green;
                    }
                }
            }
        }
    }
</style>
