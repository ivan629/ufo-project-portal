<template>
  <div class="globeContainer">
    <Globe
      v-if="activeGlobeView === 'globe'"
      :globeMarkersToDisplay="globeMarkersToDisplay" />
    <Map
      v-if="activeGlobeView === 'map'"
      :markersToDisplay="globeMarkersToDisplay" />
    <v-navigation-drawer
      v-model="drawer"
      hide-overlay
      width="25%"
      class="controlsPanel"
      app
      right>
      <div class="controlsPanelContent">
        <v-btn
          outlined
          class="closeControlPaneButton"
          @click="drawer = !drawer">
          <i class="material-icons closeControlPanelIcon">
            arrow_forward_ios
          </i>
        </v-btn>
        <GlobeControls />
      </div>
    </v-navigation-drawer>
    <v-icon
      v-if="!drawer"
      class="toggleControlIcon"
      @click.stop="drawer = !drawer">
      mdi-dialpad
    </v-icon>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import Map from './Map';
import Globe from './Globe';
import GlobeControls from './GlobeControls';
const { mapActions, mapState } = createNamespacedHelpers('globeModule');

export default {
  components: {
    Map,
    Globe,
    GlobeControls
  },
  data: () => ({
    drawer: false
  }),
  computed: {
    ...mapState(['globeMarkersToDisplay', 'activeGlobeView']),
    isControlsPaneOpened: function () {
      return this.drawer;
    }
  },
  methods: {
    ...mapActions({
      toggleLoading: 'toggleLoading'
    })
  }
};
</script>

<style scoped lang="scss">
    @import '~include-media/dist/_include-media';
    @import "../../common/styles/constants";

    .globeContainer {
      .controlsPanel {
        height: 100%;
        min-width: 400px;
        background-color: transparent;

        .controlsPanelContent {
          display: flex;
          height: 100%;

          .closeControlPaneButton {
            height: 100%;
            border-radius: 0;
            border-color: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(54, 54, 55);

            .closeControlPanelIcon {
              color: $green;
            }
          }
        }
      }

      .toggleControlIcon {
        z-index: 1;
        position: absolute;
        right: 30px;
        top: 30px;
        font-size: 44px;
        cursor: pointer;
        color: $green;

        &:hover {
          color: $yellow;
        }
      }
    }
</style>
