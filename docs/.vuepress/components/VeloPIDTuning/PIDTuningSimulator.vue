<template>
  <div
    class="tuning-simulator border-gray-500 border rounded-lg overflow-hidden"
  >
    <div
      ref="canvas"
      class="bg-gray-100"
      style="box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px 2px inset"
      :style="{ height: graphHeight }"
    ></div>
    <div
      class="bg-gray-200 rounded-b-lg px-4 py-3 border-t border-gray-400 grid grid-cols-4 gap-2"
    >
      <div class="flex flex-col items-center">
        <label :for="`kp-input-${uuid}`" class="mb-1 ml-1">kP</label>
        <input
          :id="`kp-input-${uuid}`"
          v-model.number="kP"
          @change="setP"
          class="box-border text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="flex flex-col items-center">
        <label :for="`ki-input-${uuid}`" class="mb-1 ml-1">kI</label>
        <input
          :id="`ki-input-${uuid}`"
          v-model.number="kI"
          @change="setI"
          class="box-border text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="flex flex-col items-center">
        <label :for="`kd-input-${uuid}`" class="mb-1 ml-1">kD</label>
        <input
          :id="`kD-input-${uuid}`"
          v-model.number="kD"
          @change="setD"
          class="box-border text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="flex flex-col items-center">
        <label :for="`kf-input-${uuid}`" class="mb-1 ml-1">kF</label>
        <input
          :id="`kf-input-${uuid}`"
          v-model.number="kF"
          @change="setF"
          class="box-border text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="col-span-2 col-start-2 flex justify-center">
        <button
          @click="reset"
          class="mt-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded outline-none focus:shadow-outline"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import uPlot from "uplot";

import PIDController from "./PIDController";

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

      // Real Velocity
      currentVelocity: 0,

      kP: 0,
      kI: 0,
      kD: 0,
      kF: 0.01,

      arbitraryScalingKp: 1 / 1600,
      arbitraryScalingKi: 1 / 1000,
      arbitraryScalingKd: 1 / 1000000,

      setVoltage: 0,

      controller: new PIDController(0, 0, 0),

      // fake motor model??
      modelKV: 0.0153,
      modelKA: 0.001,
      modelKStatic: 0.0021,

      lastState: GraphState.Accel as GraphState,
      currentState: GraphState.Accel as GraphState,
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
        {
          label: "time elapsed (seconds)",
        },
        {
          scale: "%",
          label: "velocity (inches per second)",
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

    // Run loop before initializing plot so
    // y series isn't empty
    this.controller.setBounds(-1, 1);
    this.startTime = performance.now();

    this.loop();

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
  },

  beforeDestroy() {
    this.resizeObserver.disconnect();
  },

  methods: {
    loop() {
      const currentTime = performance.now();

      this.graphData[0].push((currentTime - this.startTime) / 1000);

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
          timeDelta || 0;

      this.currentVelocity = Math.max(
        Math.min(this.currentVelocity, this.maxVel * 1.3),
        -this.maxVel * 1.3
      );

      // Actual controller stuff

      this.setVoltage =
        this.controller.update(this.targetVelocity - this.currentVelocity) +
        this.kF * this.targetVelocity;

      this.graphData[2].push(this.currentVelocity);

      // Assume that all the graphData nested arrays are of equal size
      // Limit window of the graph
      if (this.graphData[0].length > this.maxDataLength) {
        this.graphData[0].shift();
        this.graphData[1].shift();
        this.graphData[2].shift();
      }

      if (this.plot != null) this.plot.setData(this.graphData);

      this.lastLoopTime = currentTime;

      setTimeout(this.loop, 1000 / 24 + Math.random() * 50);
    },

    setP() {
      this.controller.kP = this.kP * this.arbitraryScalingKp;
    },
    setI() {
      this.controller.kI = this.kI * this.arbitraryScalingKi;
      this.controller.reset();
    },
    setD() {
      this.controller.kD = this.kD * this.arbitraryScalingKd;
    },
    setF() {
      this.controller.kF = Math.min(this.kF, 0.014);
    },
    reset() {
      this.graphData[0] = [];
      this.graphData[1] = [];
      this.graphData[2] = [];

      this.startTime = performance.now();

      this.currentVelocity = 0;
      this.targetVelocity = 0;
      this.currentState = GraphState.Accel;

      this.controller.reset();
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
