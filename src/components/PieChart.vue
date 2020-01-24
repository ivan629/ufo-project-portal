<template>
  <div
    :id="chartName"
    class="pieChartContainer" />
</template>

<script>
import { isNil } from 'lodash';
import Highcharts from 'highcharts';
import { darkChartTheme } from '../thems';

Highcharts.theme = darkChartTheme(Highcharts);
Highcharts.setOptions(Highcharts.theme);

export default {
  props: {
    chartName: {
      type: String,
      required: true
    },
    pieChartData: {
      type: Object,
      required: true
    }
  },
  watch: {
    pieChartData () {
      this.initializePieChart();
    }
  },
  mounted () {
    this.initializePieChart();
  },
  methods: {
    initializePieChart () {
      const highchartsOptions = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          renderTo: this.chartName
        },
        title: {
          text: `Statistic by ${this.chartName} frequency`
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: this.pieChartData.data
        }]
      };

      this.chart = new Highcharts.Chart(highchartsOptions);
    },
    redraw () {
      if (!isNil(this.chart.series[0])) {
        this.chart.series[0].setData(this.pieChartData.data);
      }
    }
  }
};
</script>

<style scoped lang="scss">
    .pieChartContainer {
        width: 50%;
        height: 100%;
    }
</style>
