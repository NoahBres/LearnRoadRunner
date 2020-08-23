<template>
  <div @mouseenter="mouseEntered" @mouseleave="mouseLeft">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import VueConfetti from "vue-confetti";

Vue.use(VueConfetti);

export default Vue.extend({
  data() {
    return {
      raining: false,
    };
  },
  methods: {
    mouseEntered() {
      if (!this.raining) {
        this.$confetti.start({
          particlesPerFrame: 0.5,
          particles: [
            {
              type: "circle",
            },
            {
              type: "rect",
            },
          ],
        });
      }

      this.raining = true;
    },
    mouseLeft() {
      if (this.raining) {
        this.$confetti.stop();
      }

      this.raining = false;
    },
  },
  beforeDestroy() {
    this.raining = false;
    this.$confetti.stop();
  },
});
</script>
