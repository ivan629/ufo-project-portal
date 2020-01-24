<template>
  <div class="appAnimatedBackgroundContainer">
    <div class="appAnimatedBackground" />
    <vue-particles
      class="particlesBackground"
      color="#ffffff"
      :particle-opacity="1"
      :particles-number="80"
      shape-type="circle"
      :particle-size="1.5"
      lines-color="#07ca68"
      :lines-width="1"
      :line-linked="true"
      :line-opacity="0.4"
      :lines-distance="150"
      :move-speed="1"
      :hover-effect="true"
      hover-mode="grab"
      :click-effect="true"
      click-mode="repulse" />
  </div>
</template>
<script>
import { assign, isNil } from 'lodash';

const INTRO_PAGE_BACKGROUND_ID = 'appAnimatedBackground';

export default {
  data: () => ({
    lFollowX: 0,
    lFollowY: 0,
    x: 0,
    y: 0,
    friction: 1 / 100
  }),
  mounted () {
    window.addEventListener('mousemove', event => this.moveBackground(event));
  },
  destroyed () {
    window.removeEventListener('mousemove', this.moveBackground);
  },
  methods: {
    moveBackground (event) {
      const lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - event.clientX));
      const lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - event.clientY));

      this.lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
      this.lFollowY = (10 * lMouseY) / 100;
      this.x += (this.lFollowX - this.x) * this.friction;
      this.y += (this.lFollowY - this.y) * this.friction;

      const translate = 'translate(' + this.x + 'px, ' + this.y + 'px) scale(1.1)';
      const introPageBackground = document.querySelector(`.${INTRO_PAGE_BACKGROUND_ID}`);

      if (isNil(introPageBackground)) {
        return null;
      }

      assign(introPageBackground.style, {
        '-webit-transform': translate,
        '-moz-transform': translate,
        'transform': translate
      });
    }
  }
};
</script>

<style scoped lang="scss">
   .appAnimatedBackgroundContainer {
     position: absolute;
     height: 100%;
     width: 100%;

      .appAnimatedBackground {
         background: linear-gradient(
                         rgba(0, 0, 0, 0.7),
                         rgba(0, 0, 0, 0.7)
         ),
         url("../assets/appAnimatedBackgroundImage.png");
         -webkit-background-size: cover;
         -moz-background-size: cover;
         -o-background-size: cover;
         background-size: cover;
         overflow: hidden;
         height: 100vh;
         width: 100%;
         position: fixed;
         transform: scale(1.1);
      }

      .particlesBackground {
         z-index: 1;
         height: 100%;
         width: 100%;
         position: absolute;
      }
   }
</style>
