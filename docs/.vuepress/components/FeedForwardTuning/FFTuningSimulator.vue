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
      class="bg-gray-200 rounded-b-lg px-4 py-3 border-t border-gray-400 grid grid-cols-3 gap-2"
    >
      <div class="flex flex-col items-center">
        <label :for="`kv-input-${uuid}`" class="mb-1 ml-1">kV</label>
        <input
          :id="`kv-input-${uuid}`"
          v-model.number="kV"
          class="box-border text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="flex flex-col items-center">
        <label :for="`kA-input-${uuid}`" class="mb-1 ml-1">kA</label>
        <input
          :id="`ka-input-${uuid}`"
          v-model.number="kA"
          class="box-border text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="flex flex-col items-center">
        <label :for="`kS-input-${uuid}`" class="mb-1 ml-1">kS</label>
        <input
          :id="`ks-input-${uuid}`"
          v-model.number="kS"
          class="box-border text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="col-start-2 flex justify-center">
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

      // For dx/dt in FF
      lastVelocityReading: 0,

      setVoltage: 0,

      // Your model
      kV: 0,
      kA: 0,
      kS: 0,

      arbitraryScaling: 24,

      // fake motor model??
      modelKV: 0.0153,
      modelKA: 0.002,
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

      this.currentVelocity +=
        ((-this.modelKV / this.modelKA) * this.currentVelocity +
          (1 / this.modelKA) * this.setVoltage) *
        timeDelta;

      this.setVoltage =
        this.kV * this.targetVelocity +
        this.kA *
          ((this.currentVelocity - this.lastVelocityReading) / timeDelta) +
        this.kS * (this.kS == 0 ? 1 : this.kS / Math.abs(this.kS));

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
      this.lastVelocityReading = this.currentVelocity;

      // requestAnimationFrame(this.loop);
      setTimeout(this.loop, 1000 / 24 + Math.random() * 50);
    },
    reset() {
      this.graphData[0] = [];
      this.graphData[1] = [];
      this.graphData[2] = [];

      this.startTime = performance.now();

      this.currentVelocity = 0;
      this.targetVelocity = 0;
      this.currentState = GraphState.Accel;
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
