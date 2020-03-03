<template>
  <div class="mapContainer">
    <GmapMap
      :center="{ lat: 48.1750554, lng: 1.4843474 }"
      :zoom="4"
      class="map"
      :options="{
        streetViewControl: false,
      }"
      map-type-id="terrain">
      <GmapMarker
        v-for="marker in markersToDisplay"
        :key="marker.location + Math.random()"
        :position="getPosition(marker)" />
    </GmapMap>
  </div>
</template>

<script>
import { toNumber } from 'lodash';

import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('globeModule');

export default {
  props: {
    markersToDisplay: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['globeMarkersToDisplay'])
  },
  methods: {
    getPosition ({ longitude, latitude }) {
      return {
        lat: toNumber(latitude),
        lng: toNumber(longitude)
      };
    }
  }
};
</script>

<style scoped lang="scss">
    .mapContainer {
        flex: 1;
        height: 80%;

        .map {
            top: 70px;
            width: 70vw;
            height: 100%;
        }
    }
</style>
