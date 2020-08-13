<template>
  <div class="tuning-simulator">
    <div
      ref="canvas"
      class="bg-gray-100"
      style="box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 6px 2px inset"
      :style="{ height: graphHeight }"
    ></div>
    <div class="bg-green-200 h-4"></div>
  </div>
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
  data() {
    return {
      graphData: [
        [0, 1], // x-values (timestamps)
        [35, 71], // target velocity
        [90, 15], // motor velocity
      ],
      plot: null,
      resizeObserver: null,
      paddingX: -0,
      paddingY: -40,
    };
  },
  mounted() {
    let opts: uPlot.Options = {
      title: "",
      width: this.$refs.canvas.clientWidth + this.paddingX,
      height: this.$refs.canvas.clientHeight + this.paddingY,
      series: [
        {
          label: "time",
        },
        {
          label: "targetVelocity",
          stroke: "green",
        },
        {
          label: "velocity0",
          stroke: "red",
        },
      ],
      scales: {
        x: {
          time: false,
        },
      },
      cursor: {
        drag: {
          setScale: false,
          x: false,
          y: false,
        },
      },
    };

    this.plot = new uPlot(
      opts,
      JSON.parse(JSON.stringify(this.graphData)),
      this.$refs.canvas
    );

    this.resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target == this.$refs.canvas) {
          this.plot.setSize({
            width: entry.contentRect.width + this.paddingX,
            height: entry.contentRect.height + this.paddingY,
          });
        }
      }
    });

    this.resizeObserver.observe(this.$refs.canvas);
  },
  beforeDestroy() {
    this.resizeObserver.disconnect();
  },
});
</script>
<style src="uplot/dist/uPlot.min.css"></style>
<style lang="stylus">
.tuning-simulator th
.tuning-simulator td
  border none

.tuning-simulator tr
  background-color transparent
</style>
