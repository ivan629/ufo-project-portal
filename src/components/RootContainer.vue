<template>
  <div class="rootContainer">
    <div class="center">
      <Header />
      <GlobeContainer v-if="isGlobeMode" />
      <UfoChartsStatistic v-else />
    </div>
    <v-overlay :value="isLoading">
      <orbit-spinner
        :animation-duration="1200"
        :size="80"
        :color="variables.green" />
    </v-overlay>
  </div>
</template>

<script>
import { isNil } from 'lodash';
import { OrbitSpinner } from 'epic-spinners';
import { createNamespacedHelpers } from 'vuex';

import Header from './Header';
import GlobeContainer from './globeMapStatistic/GlobeContainer';
import UfoChartsStatistic from './chartsStatistic/UfoChartsStatistic';
import variables from '../common/styles/_constants.scss';

const { mapState, mapGetters } = createNamespacedHelpers('commonModule');

export default {
  components: {
    Header,
    OrbitSpinner,
    GlobeContainer,
    UfoChartsStatistic
  },
  data: () => ({
    serverApi: null,
    variables: variables
  }),
  computed: {
    ...mapState(['isLoading', 'activeMode']),
    ...mapGetters(['isGlobeMode'])
  },
  created () {
    const { VUE_APP_FD_SERVER_URL } = process.env;

    this.serverApi = isNil(VUE_APP_FD_SERVER_URL) ? null : `${process.env.VUE_APP_FD_SERVER_URL}`;
  }
};
</script>

<style scoped lang="scss">
  @import '../common/styles/mixins';

  .rootContainer {
    display: flex;
    justify-content: center;
    height: 100vh;

    .center {
      display: flex;
      z-index: 1;
      width: 100%;
      height: 100%;
      position: absolute;
      justify-content: center;

      @include no-user-selection();
    }
  }
</style>
