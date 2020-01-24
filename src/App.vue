<template>
  <v-app>
    <AppAnimatedBackground />
    <RootContainer />
  </v-app>
</template>

<script>
import RootContainer from './components/RootContainer';
import AppAnimatedBackground from './components/AppAnimatedBackground';
import ufoChartService from './services/ufoService';

import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('commonModule');

export default {
  name: 'App',

  components: {
    RootContainer,
    AppAnimatedBackground
  },
  data: () => ({}),
  created () {
    ufoChartService.setToggleLoadingCallback(() => this.toggleLoading());
  },
  methods: {
    ...mapActions({
      toggleLoading: 'toggleLoading'
    })
  }
};
</script>
