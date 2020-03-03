<template>
  <div class="toggleGlobeControlsContainer">
    <v-btn
      v-for="view in globeViews"
      :key="view"
      class="ma-2 toggleGlobeViewButton"
      outlined
      :class="{active: view === activeGlobeView}"
      @click="changeActiveGlobeView(view)">
      {{ view }}
    </v-btn>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState } = createNamespacedHelpers('globeModule');

export default {
  computed: {
    ...mapState(['activeGlobeView', 'globeViews'])
  },
  methods: {
    ...mapActions({
      changeActiveGlobeView: 'changeActiveGlobeView'
    })
  }
};
</script>

<style scoped lang="scss">
    @import "../../common/styles/constants";

    .toggleGlobeControlsContainer {
        display: flex;
        justify-content: space-between;

        .toggleGlobeViewButton {
            flex: 1;
            border-radius: 0;
            height: 30px;
            padding: 0;
            border-color: transparent;
            color: $white;

            &.active {
                color: $green;
                border-color: $green;
            }
        }
    }

</style>
