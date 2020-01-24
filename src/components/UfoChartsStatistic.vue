<template>
  <div class="chartPageContainer">
    <div class="chartsControls">
      <div class="sliderContainer">
        <v-range-slider
          v-model="chartYearsRangeSlider"
          class="slider"
          thumb-label="always"
          :thumb-size="28"
          :min="yearsRange.start"
          :max="yearsRange.stop" />
        <v-select
          v-model="selectedCountry"
          class="countrySelect"
          outlined
          dark
          :items="countries"
          menu-props="auto"
          filled
          dense
          item-value="value"
          label="Country"
          single-line />
        <v-btn
          class="ma-2 updateChartsButton"
          outlined
          @click="updateCharts">
          apply filter
        </v-btn>
      </div>
    </div>
    <div class="chartsContainer">
      <StockChart />
      <div class="pieChartsContainer">
        <PieChart
          v-for="(singlePieChartData) in pieFormattedChartsData"
          :key="singlePieChartData.chartName"
          :pieChartData="singlePieChartData"
          :chartName="singlePieChartData.chartName" />
      </div>
    </div>
  </div>
</template>

<script>
import { isNil, map } from 'lodash';
import { createNamespacedHelpers } from 'vuex';

import StockChart from './StockChart';
import PieChart from './PieChart';
const { mapState, mapActions } = createNamespacedHelpers('statisticModule');

const monthsMap = {
  '1': 'January',
  '2': 'February',
  '3': 'March',
  '4': 'April',
  '5': 'May',
  '6': 'June',
  '7': 'July',
  '8': 'August',
  '9': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
};

export default {
  components: {
    PieChart,
    StockChart
  },
  props: {},
  data: () => ({
    activeCountry: null,
    chartYearsRangeSlider: [1999, 2014]
  }),
  computed: {
    ...mapState(['pieChartDataTypes', 'pieChartsData', 'countries', 'selectedCountry', 'yearsRange']),
    pieFormattedChartsData: function () {
      return map(this.pieChartsData, (data, key) => ({
        data: map(data, ({ name, value }, index) => ({ name: key === 'month' ? monthsMap[index] : name, y: value })),
        chartName: key
      }));
    },
    selectedCountry: {
      get () {
        return this.$store.state.statisticModule.selectedCountry;
      },
      set (value) {
        this.changeSelectedCountry(value);
      }
    }
  },
  watch: {
    chartYearsRangeSlider () {
      this.setChartYearsRangeSlider(this.chartYearsRangeSlider);
    }
  },
  created () {
    if (isNil(this.pieChartsData)) {
      this.updateCharts();
    }
  },
  methods: {
    ...mapActions({
      updateCharts: 'updateCharts',
      changeSelectedCountry: 'changeSelectedCountry',
      setChartYearsRangeSlider: 'setChartYearsRangeSlider'
    })
  }
};
</script>

<style scoped lang="scss">
    @import "../common/styles/constants";

    .chartPageContainer {
        display: flex;
        width: 90%;
        position: absolute;
        flex-direction: column;
        padding: 0 20px 20px 20px;
        margin-top: 70px;
        border: 1px solid $dark;
        background-color: $black-transparent;

        .chartsControls {
            padding-top: 5px;
            display: flex;
            justify-content: space-between;

            .sliderContainer {
                display: flex;
                width: 100%;

                .slider {
                    flex: 1;
                    height: 40px;
                }

                .countrySelect {
                    border-radius: 0;
                    max-width: 150px;
                    margin-left: 15px;
                }

                .updateChartsButton {
                    border-radius: 0;
                    width: 150px;
                    height: 40px;
                    top: -8px;
                    color: $green;
                }
            }

            .pieChartSelect {
                max-height: 25px;
                max-width: 230px;
                border-radius: 0;
            }
        }

        .chartsContainer .pieChartsContainer {
                display: flex;
        }
    }
</style>
