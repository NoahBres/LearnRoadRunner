<template>
  <div class="flex flex-col justify-center px-8 py-4 pb-0 h-full">
    <h2 class="border-none mt-0 mb-10 text-center">
      Gear Ratio
      <h4 class="block text-gray-500 m-0 text-2xl">(output : input)</h4>
    </h2>
    <div class="flex flex-row justify-center items-center h-64 relative">
      <div class="wheel-container mr-10">
        <div
          class="wheel output"
          :style="{
            width: `${wheelWidths[0]}em`,
            height: `${wheelWidths[0]}em`,
          }"
        >
          <div
            class="wheel-belt"
            :style="{
              width: `${wheelWidths[0] / 2}em`,
              height: `${wheelWidths[0]}em`,
            }"
          ></div>
        </div>
      </div>
      <div class="wheel-container ml-10">
        <div
          class="wheel input"
          :style="{
            width: `${wheelWidths[1]}em`,
            height: `${wheelWidths[1]}em`,
          }"
        >
          <div
            class="wheel-belt"
            :style="{
              width: `${wheelWidths[1] / 2}em`,
              height: `${wheelWidths[1]}em`,
            }"
          ></div>
        </div>
      </div>
      <div class="connecting-belt top"></div>
    </div>
    <div class="flex flex-row items-center justify-center">
      <input
        class="number-input"
        v-model.number="input"
        type="number"
        min="0"
        @change="$emit('input', ratio)"
      />
      <span class="text-3xl px-4 mb-2 font-semibold ">:</span>
      <input
        class="number-input"
        v-model.number="output"
        type="number"
        min="0"
        @change="$emit('input', ratio)"
      />
    </div>
    <div class="mt-6">
      <p class="text-gray-800 max-w-3xl">
        *Output = Wheel Speed. Input = Motor Speed.
      </p>
      <p class="text-gray-800 max-w-3xl mt-2 mb-8">
        **This this at 1:1 if you have a direct drive.
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      input: 1,
      output: 1,
    };
  },
  computed: {
    ratio() {
      return this.output / this.input;
    },
    wheelWidths() {
      const maxRem = 10;
      const minRem = 1.5;

      if (this.input == this.output) return [maxRem, maxRem];

      const deltaRem = maxRem - minRem;

      const maxValue = Math.max(this.input, this.output);
      const minValue = Math.min(this.input, this.output);

      const scalar = minValue / maxValue;
      const smallerSize = scalar * deltaRem + minRem;

      if (this.output > this.input) return [smallerSize, maxRem];
      else return [maxRem, smallerSize];

      // Output size rems, input size rems
      return [0, 0];
    },
  },
});
</script>
<style lang="stylus" scoped>
.number-input
  @apply text-center text-2xl
  @apply py-4 w-24
  @apply appearance-none
  @apply border border-transparent border-2
  @apply rounded-md
  @apply bg-gray-300
  @apply transition-colors duration-150

.number-input:focus
  @apply border-red-500 outline-none ease-in

.wheel-container
  @apply w-40 h-40
  @apply flex justify-center items-center

.wheel
  @apply bg-gray-500 rounded-full
  @apply w-40 h-40
  @apply transition-all duration-300 ease-out

.wheel-belt
  @apply absolute
  @apply w-20 h-40
  @apply border-8 border-gray-800
  @apply transition-all duration-300 ease-out

  content ''

.output
  @apply bg-transparent relative
  @apply border-4 border-gray-500

.output .wheel-belt
  top -8px
  left -8px

  border-right 0
  border-top-left-radius 10rem
  border-bottom-left-radius 10rem

.input
  @apply bg-transparent relative
  @apply border-4 border-gray-500

.input .wheel-belt
  top -8px
  left calc(50% - 4px)

  border-left 0
  border-top-right-radius 10rem
  border-bottom-right-radius 10rem

.connecting-belt
  @apply absolute bg-gray-800

  width 100px
  height 2px

  background red
</style>
