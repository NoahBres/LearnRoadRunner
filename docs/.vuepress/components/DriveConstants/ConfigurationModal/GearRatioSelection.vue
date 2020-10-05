<template>
  <div class="flex flex-col justify-center items-center px-8 py-4 pb-0 h-full">
    <h2 class="border-none mt-0 xl:mb-10 mb-0 text-center">
      Gear Ratio
      <h4 class="block text-gray-500 m-0 text-2xl">(output : input)</h4>
    </h2>
    <div class="flex flex-row justify-center items-center h-64 relative">
      <div
        class="wheel-container mr-10 transition-transform duration-200 ease-out"
        :style="{ transform: `scale(${wheelScalar[0]})` }"
      >
        <div
          class="wheel output"
          :style="{ 'animation-duration': `${(input / output) * 2}s` }"
        >
          <div class="spoke"></div>
          <div class="spoke"></div>
          <div class="spoke"></div>
          <div class="spoke"></div>
          <div class="spoke"></div>
          <div class="spoke"></div>
          <div class="spoke"></div>
          <div class="spoke"></div>
        </div>
      </div>
      <div
        class="wheel-container ml-10 transition-transform duration-200 ease-out"
        :style="{ transform: `scale(${wheelScalar[1]})` }"
      >
        <div class="wheel input" :style="{ 'animation-duration': `${2}s` }">
          <div class="ring"></div>
          <div class="hub"></div>
        </div>
      </div>
    </div>
    <div class="flex flex-row items-center justify-center">
      <input
        class="number-input"
        v-model.number="output"
        type="number"
        min="0"
        @change="$emit('input', ratio)"
      />
      <span class="xl:text-3xl text-2xl px-4 xl:mb-2 mb-1 font-semibold">
        :
      </span>
      <input
        class="number-input"
        v-model.number="input"
        type="number"
        min="0"
        @change="$emit('input', ratio)"
      />
    </div>
    <div class="xl:mt-6 mt-0">
      <p class="text-gray-800 max-w-3xl">
        *Output = Wheel Speed. Input = Motor Speed.
      </p>
      <p class="text-gray-800 max-w-3xl xl:mt-2 mt-0 mb-8">
        **This this at 1:1 if you have a direct drive.
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import BaseSelection, { Dimensions } from "./BaseSelection";

export default Vue.extend({
  extends: BaseSelection,
  data() {
    return {
      sizeBase: {
        width: "650px",
        height: "570px",
      } as Dimensions,
      sizeLg: {
        width: "650px",
        height: "660px",
      } as Dimensions,

      input: 1,
      output: 1,
    };
  },
  computed: {
    ratio() {
      return this.output / this.input;
    },
    wheelScalar() {
      const maxValue = Math.max(this.input, this.output);
      const minValue = Math.min(this.input, this.output);

      const scalar = minValue / maxValue;

      if (this.output > this.input) return [scalar, 1];
      else return [1, scalar];
    },
  },
});
</script>
<style lang="stylus" scoped>
.number-input
  @apply text-center text-lg
  @apply py-2 w-20
  @apply appearance-none
  @apply border border-transparent border-2
  @apply rounded-md
  @apply bg-gray-300
  @apply transition-colors duration-150

  @media (min-width: 1280px)
    @apply text-2xl
    @apply py-4 w-24


.number-input:focus
  @apply border-red-500 outline-none ease-in

.wheel-container
  @apply w-40 h-40
  @apply flex justify-center items-center

.wheel
  @apply box-border relative
  @apply border-8 border-gray-700
  @apply transition-all duration-300 ease-out

  @apply w-40 h-40

  border-radius 50%

  animation rotating 2s linear infinite

.output
  box-shadow inset 0 0 0 0.25rem theme("colors.gray.500")

.wheel .spoke
  @apply absolute bg-gray-500

  width 2px
  height 100%

  top 0
  left calc(50% - 1px)

@-webkit-keyframes rotating
  from
    -webkit-transform rotate(0deg)
    -o-transform rotate(0deg)
    transform rotate(0deg)

  to
    -webkit-transform rotate(360deg)
    -o-transform rotate(360deg)
    transform rotate(360deg)

@keyframes rotating
  from
    -ms-transform rotate(0deg)
    -moz-transform rotate(0deg)
    -webkit-transform rotate(0deg)
    -o-transform rotate(0deg)
    transform rotate(0deg)

  to
    -ms-transform rotate(360deg)
    -moz-transform rotate(360deg)
    -webkit-transform rotate(360deg)
    -o-transform rotate(360deg)
    transform rotate(360deg)

.spoke:nth-child(2)
  -webkit-transform rotate(30deg)
  transform rotate(30deg)

.spoke:nth-child(3)
  -webkit-transform rotate(60deg)
  transform rotate(60deg)

.spoke:nth-child(4)
  -webkit-transform rotate(90deg)
  transform rotate(90deg)

.spoke:nth-child(5)
  -webkit-transform rotate(120deg)
  transform rotate(120deg)

.spoke:nth-child(6)
  -webkit-transform rotate(150deg)
  transform rotate(150deg)

.spoke:nth-child(7)
  -webkit-transform rotate(180deg)
  transform rotate(180deg)

.spoke:nth-child(8)
  -webkit-transform rotate(210deg)
  transform rotate(210deg)

.input
  @apply border-4

.input .hub
  @apply absolute top-0 bottom-0 left-0 right-0 m-auto
  @apply w-6 h-6
  @apply bg-gray-800

  border-radius 50%

.input .ring
  @apply absolute top-0 bottom-0 left-0 right-0 m-auto
  @apply w-20 h-20
  @apply bg-gray-300

  border-radius 50%

  border-left 0.2rem solid transparent
  border-right 0.2rem solid transparent
  border-top 0.2rem solid theme('colors.gray.500')
  border-bottom 0.2rem solid theme('colors.gray.500')
</style>
