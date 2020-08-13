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

enum GraphState {
  Accel,
  Coast,
  Decel,
}

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

      // Real Velocity
      currentVelocity: 0,

      kP: 0,
      kI: 0,
      kD: 0,
      kV: 0.0153,
      kS: 0.002,

      setVoltage: 2,

      // fake motor model??
      modelKV: 0.0153,
      modelKA: 0.002,
      modelKStatic: 0.0021,

      lastState: GraphState.Accel as GraphState,
      currentState: GraphState.Accel as GraphState,

      animationFrameId: null,
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
          scale: "%",
          width: 2,
          stroke: "green",
        },
        {
          label: "velocity0",
          scale: "%",
          width: 2,
          stroke: "red",
        },
      ],
      scales: {
        x: {
          time: false,
        },
        "%": {
          auto: false,
          range: (min, max) => [
            -this.maxVel - this.maxVelPadding,
            this.maxVel + this.maxVelPadding,
          ],
        },
      },
      axes: [
        {},
        {
          scale: "%",
        },
        // {
        //   scale: "%",
        // },
      ],
      cursor: {
        drag: {
          setScale: false,
          x: false,
          y: false,
        },
      },
    };

    // Setup plot
    this.plot = new uPlot(
      opts,
      JSON.parse(JSON.stringify(this.graphData)),
      this.$refs.canvas
    );

    // Setup resizing of the plot
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

    // Setup animation
    this.animationFrameId = window.requestAnimationFrame(this.loop);

    this.startTime = performance.now();
  },
  beforeDestroy() {
    this.resizeObserver.disconnect();

    window.cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
  },
  methods: {
    loop() {
      const currentTime = performance.now();

      this.graphData[0].push(currentTime - this.startTime);

      const timeDelta = (currentTime - this.lastLoopTime) / 1000;

      // Target velocity
      switch (this.currentState) {
        case GraphState.Accel:
          this.targetVelocity = Math.min(
            this.targetVelocity + this.maxAccel * timeDelta,
            this.maxVel
          );

          if (this.targetVelocity >= this.maxVel) {
            this.coastStart = currentTime;

            this.lastState = GraphState.Accel;
            this.currentState = GraphState.Coast;
          }

          this.graphData[1].push(this.targetVelocity);
          break;
        case GraphState.Coast:
          if (currentTime - this.coastStart >= this.coastingLength) {
            if (this.lastState == GraphState.Accel)
              this.currentState = GraphState.Decel;
            else if (this.lastState == GraphState.Decel)
              this.currentState = GraphState.Accel;

            this.lastState = GraphState.Coast;
          }

          this.graphData[1].push(this.targetVelocity);

          break;
        case GraphState.Decel:
          this.targetVelocity = Math.max(
            this.targetVelocity - this.maxAccel * timeDelta,
            -this.maxVel
          );

          if (this.targetVelocity <= -this.maxVel) {
            this.coastStart = currentTime;

            this.lastState = GraphState.Decel;
            this.currentState = GraphState.Coast;
          }

          this.graphData[1].push(this.targetVelocity);

          break;
      }

      // Current Velocity
      this.currentVelocity +=
        ((-this.modelKV / this.modelKA) * this.currentVelocity +
          (1 / this.modelKA) * this.setVoltage) *
        timeDelta;

      this.currentVelocity = Math.min(this.currentVelocity, this.maxVel * 1.3);

      // Actual controller stuff

      this.setVoltage =
        this.kV * this.targetVelocity +
        this.kS +
        (this.targetVelocity - this.currentVelocity) * this.kP;

      this.graphData[2].push(this.currentVelocity);

      // Assume that all the graphData nested arrays are of equal size
      // Limit window of the graph
      if (this.graphData[0].length > this.maxDataLength) {
        this.graphData[0].shift();
        this.graphData[1].shift();
        this.graphData[2].shift();
      }

      this.plot.setData(this.graphData);

      this.lastLoopTime = currentTime;

      requestAnimationFrame(this.loop);
    },
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
