<template>
  <h1>Test</h1>
</template>
<script lang="ts">
import Vue from "vue";
import uPlot from "uplot";

export default Vue.extend({
  props: {
    graphHeight: {
      type: String,
      default: "30rem",
    },
  },

  computed: {
    // https://stackoverflow.com/a/2117523/3360147
    uuid(): string {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        let r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
  },

  data() {
    return {
      graphData: [
        [], // x-values (timestamps)
        [], // target velocity
        [], // motor velocity
      ],

      plot: null,
      resizeObserver: null,

      // Graph padding
      paddingX: -0,
      paddingY: -40,

      // Target Velocity
      maxDataLength: 200,

      maxVel: 50,
      maxAccel: 50,
      coastingLength: 1000, // in ms

      maxVelPadding: 20,

      targetVelocity: 0,

      startTime: 0,
      lastLoopTime: 0,

      coastStart: 0,
    };
  },
});
</script>
