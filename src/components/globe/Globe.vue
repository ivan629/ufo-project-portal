<template>
  <div id="earth_globe" />
</template>

<script>
import { isNil, map } from 'lodash';
import Globe from 'globe.gl';

import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('globeModule');
const { mapState } = createNamespacedHelpers('commonModule');

const DEFAULT_SIZE_DELIMITER = 10000;

export default {
  props: {
    globeMarkersToDisplay: {
      type: Object,
      required: false,
      default: () => []
    }
  },
  computed: {
    ...mapState(['activeMode'])
  },
  watch: {
    globeMarkersToDisplay () {
      this.initializeGlobe();
    }
  },
  mounted () {
    if (!isNil(this.globeMarkersToDisplay)) {
      this.initializeGlobe();
    }
  },
  methods: {
    ...mapActions({
      toggleLoading: 'toggleLoading'
    }),
    initializeGlobe () {
      const data = map(this.globeMarkersToDisplay, (markerData) => {
        const { longitude: lng, latitude: lat, size } = markerData;

        return {
          lat,
          lng,
          size: size / DEFAULT_SIZE_DELIMITER,
          color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
        };
      });

      const globe = Globe()(document.getElementById('earth_globe'))
        .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
        .pointsData(data)
        .backgroundColor('rgba(0, 0, 0, 0)')
        .pointAltitude('size')
        .pointColor('color');

      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.2;
    }
  }
};
</script>
