<template>
  <div class="controlsContainer">
    <div class="filterControlsContainer">
      <div class="groupControlContainer">
        <span class="controlTitle">Grouped by</span>
        <v-select
          v-model="groupedByRegionId"
          class="groupControl"
          outlined
          dark
          :items="regions"
          menu-props="auto"
          filled
          dense
          item-value="value"
          label="Grouped by"
          single-line />
      </div>
      <div class="control">
        <span class="controlTitle">Year</span>
        <v-range-slider
          v-model="yearsRangeSlider"
          thumb-label="always"
          :thumb-size="28"
          :min="yearsRange.start"
          :max="yearsRange.stop" />
      </div>
      <div class="control">
        <span class="controlTitle">Month</span>
        <v-range-slider
          v-model="monthsRangeSlider"
          thumb-label="always"
          :thumb-size="24"
          :min="monthsMinMax.min"
          :max="monthsMinMax.max" />
      </div>
      <div class="control">
        <span class="controlTitle">Day</span>
        <v-range-slider
          v-model="daysRangeSlider"
          thumb-label="always"
          :thumb-size="24"
          :min="daysMinMax.min"
          :max="daysMinMax.max" />
      </div>
      <div class="control">
        <v-btn
          class="applyFilterButton"
          outlined
          @click="applyFilter">
          apply filter
        </v-btn>
      </div>
      <ToggleGlobeControls />
    </div>
  </div>
</template>

<script>
import { isNil } from 'lodash';
import { createNamespacedHelpers } from 'vuex';

import ToggleGlobeControls from './ToggleGlobeViewControls';
const { mapActions, mapState } = createNamespacedHelpers('globeModule');

const CONTROLS_YEARS_MIN_MAX = {
  min: 2012,
  max: 2014
};
const CONTROLS_MONTHS_MIN_MAX = {
  min: 1,
  max: 12
};
const CONTROLS_DAYS_MIN_MAX = {
  min: 1,
  max: 31
};

const REGIONS = [
  {
    text: 'Not grouped',
    value: '0'
  }, {
    text: 'City',
    value: '1'
  }, {
    text: 'State/province',
    value: '2'
  }, {
    text: 'Country',
    value: '3'
  }];

export default {
  components: {
    ToggleGlobeControls
  },
  data: () => ({
    regions: REGIONS,
    groupedByRegionId: null,
    yearsRangeSlider: null,
    monthsRangeSlider: null,
    daysRangeSlider: null,
    monthsMinMax: {
      min: null,
      max: null
    },
    daysMinMax: {
      min: null,
      max: null
    }
  }),
  computed: {
    ...mapState(['yearsRange', 'globeMarkersToDisplay'])
  },
  created () {
    this.groupedByRegionId = REGIONS[3].value;
    const { min: yearMin, max: yearMax } = CONTROLS_YEARS_MIN_MAX;
    const { min: monthMin, max: monthMax } = CONTROLS_MONTHS_MIN_MAX;
    const { min: daysMin, max: daysMax } = CONTROLS_DAYS_MIN_MAX;

    this.yearsRangeSlider = [yearMin, yearMax];
    this.monthsRangeSlider = [monthMin, monthMax];
    this.daysRangeSlider = [daysMin, daysMax];
    this.monthsMinMax = { min: monthMin, max: monthMax };
    this.daysMinMax = { min: daysMin, max: daysMax };

    if (isNil(this.globeMarkersToDisplay)) {
      this.applyFilter();
    }
  },
  methods: {
    ...mapActions({
      setGlobeData: 'setGlobeData'
    }),
    async applyFilter () {
      const { yearsRangeSlider, monthsRangeSlider, daysRangeSlider, groupedByRegionId } = this;

      this.setGlobeData({ yearsRangeSlider, monthsRangeSlider, daysRangeSlider, groupedByRegionId });
    }
  }
};
</script>

<style scoped lang="scss">
    @import "../../common/styles/constants";

    .controlsContainer {
        display: flex;
        padding: 60px 20px 0 20px;
        flex-direction: column;
        background-color: rgb(45,45,46);

        .groupControlContainer .controlTitle {
           padding-top: 10px;
        }

        .control,
        .groupControlContainer {
            display: flex;
            padding: 5px 0;

            .groupControl {
                padding-bottom: 5px;
            }

            .controlTitle {
                width: 100px;
                font-size: 16px;
                font-weight: 600;
                color: $white;
            }
        }

        .applyFilterButton {
            flex: 1;
            margin: 0 8px;
            border-radius: 0;
            color: $green;
        }
    }
</style>
