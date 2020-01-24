<template>
  <div class="headerContainer">
    <div class="headerNavContainer">
      <v-btn
        v-for="mode in modes"
        :key="mode"
        class="ma-2 headerNavButton"
        outlined
        :class="{active: mode === activeMode}"
        @click="changeActiveMode(mode)">
        {{ mode }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('commonModule');

export default {
  computed: {
    ...mapState(['modes', 'activeMode'])
  },
  methods: {
    ...mapActions({
      changeActiveMode: 'changeActiveMode'
    })
  }
};

</script>

<style scoped lang="scss">
    @import "../common/styles/constants";

    .headerContainer {
        width: 100%;
        height: 50px;
        display: flex;
        z-index: 1;
        position: absolute;
        justify-content: center;
        align-items: center;

        .headerNavContainer {
            margin-right: 50px;

            .headerNavButton {
                border-radius: 0;
                height: 25px;
                border-color: transparent;
                color: $white;

                &.active {
                    color: $green;
                    border-color: $green;
                }
            }
        }
    }
</style>
