<template>
  <div class="flex flex-col justify-center px-8 py-4 pb-0 h-full">
    <h2 class="border-none mt-0 xl:mb-10 mb-0 text-center">
      Track Width Estimate
      <h4 class="block text-gray-500 m-0 text-2xl">(inches)</h4>
    </h2>
    <div class="bot-container flex justify-center items-center h-64">
      <div
        class="bot"
        :style="{ width: `${botWidthEm}em`, height: `${botWidthEm}em` }"
      >
        <div class="wheel top-left" />
        <div class="wheel top-right" />
        <div class="wheel bottom-right" />
        <div class="wheel bottom-left" />
        <div class="indicator">
          <div class="p-2 mb-2 bg-gray-300 relative">
            <span class="text-xl font-semibold">{{
              clippedWidth.toFixed(2)
            }}</span>
            <span class="unit">in</span>
          </div>
        </div>
        <div class="arrow">
          <svg
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 7l4-4m0 0l4 4m-4-4v18"></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-center items-center xl:mt-8 mt-0">
      <button
        class="number-button minus-button mr-4"
        @click="decrement"
        :class="{ 'dont-click': trackWidth <= 0 }"
      />
      <input
        class="number-input"
        v-model.number="trackWidth"
        type="number"
        min="0"
        max="18"
        @change="$emit('input', trackWidth)"
      />
      <button
        class="number-button plus-button ml-3"
        @click="increment"
        :class="{ 'dont-click': trackWidth >= maxWidthIn }"
      />
    </div>
    <div class="xl:mt-6 mt-0">
      <p class="text-gray-800 max-w-3xl xl:mb-4 mb-0">
        *Track width = distance from the center of one wheel to the center of
        its parallel wheel
      </p>
      <p class="text-gray-800 max-w-3xl xl:mt-2 mt-0 xl:mb-8 mb-0">
        **Track width need only be an estimate. It will be empirically tuned
        later.
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
        width: "755px",
        height: "570px",
      } as Dimensions,
      sizeLg: {
        width: "755px",
        height: "690px",
      } as Dimensions,

      trackWidth: 15,
      maxWidthIn: 18,
      clipVisualTrackWidth: 12,
    };
  },
  computed: {
    clippedWidth() {
      return Math.max(0, Math.min(this.maxWidthIn, this.trackWidth));
    },
    botWidthEm() {
      const maxWidthEm = 15;
      const useWidth = Math.max(this.clippedWidth, this.clipVisualTrackWidth);

      return (useWidth / this.maxWidthIn) * maxWidthEm;
    },
  },
  methods: {
    decrement() {
      if (this.trackWidth > 0) this.trackWidth--;
      this.trackWidth = Math.max(this.trackWidth, 0);
      this.$emit("input", this.trackWidth);
    },
    increment() {
      if (this.trackWidth < 18) this.trackWidth++;
      this.trackWidth = Math.min(this.trackWidth, this.maxWidthIn);
      this.$emit("input", this.trackWidth);
    },
  },
});
</script>
<style lang="stylus" scoped>
wheel-width = 1.85rem
wheel-height = 2.75rem

wheel-margin-x = 1rem
wheel-margin-y = 1rem

indicator-thickness = 0.15rem

.bot
  transition-property width, height
  @apply duration-300 ease-out
  @apply border border-gray-400
  @apply bg-gray-300
  @apply relative rounded shadow-xl

.wheel
  width wheel-width
  height wheel-height

  @apply absolute rounded

.top-left
  top wheel-margin-y
  left wheel-margin-x

  background repeating-linear-gradient(45deg, theme('colors.gray.500'), theme('colors.gray.500') 0.5em, theme('colors.gray.600') 0.5em, theme('colors.gray.600') 1em)

.top-right
  top wheel-margin-y
  right wheel-margin-x

  background repeating-linear-gradient(-45deg, theme('colors.gray.500'), theme('colors.gray.500') 0.5em, theme('colors.gray.600') 0.5em, theme('colors.gray.600') 1em)

.bottom-right
  bottom wheel-margin-y
  right wheel-margin-x

  background repeating-linear-gradient(45deg, theme('colors.gray.500'), theme('colors.gray.500') 0.5em, theme('colors.gray.600') 0.5em, theme('colors.gray.600') 1em)

.bottom-left
  bottom wheel-margin-y
  left wheel-margin-x

  background repeating-linear-gradient(-45deg, theme('colors.gray.500'), theme('colors.gray.500') 0.5em, theme('colors.gray.600') 0.5em, theme('colors.gray.600') 1em)

.indicator
  width "calc(100% - (%s * 2) - %s)" % (wheel-margin-x wheel-width)
  height indicator-thickness

  @apply bg-green-500

  @apply absolute
  left "calc(%s + (%s / 2))" % (wheel-margin-x wheel-width)
  bottom "calc(%s + %s + 1rem)" % (wheel-margin-y wheel-height)

  @apply flex justify-center items-center

.indicator:before
.indicator:after
  content ''

  width indicator-thickness
  height 1rem

  position absolute
  top 0

  @apply bg-green-500

.indicator:before
  left 0

.indicator:after
  right 0

.indicator .unit
  @apply absolute
  @apply bg-gray-300 pr-2

  bottom 0.6rem
  right -1rem

.arrow
  @apply absolute
  @apply w-10 h-10

  top 1rem
  left calc(50% - 1rem)

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
  -webkit-appearance none;
  margin 0

/* Firefox */
input[type=number]
  -moz-appearance textfield

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

.number-button
  @apply relative flex justify-center items-center
  @apply cursor-pointer
  @apply border-0 bg-transparent
  @apply w-12 h-12

.number-button:focus
  @apply outline-none

.number-button:before
.number-button:after
  @apply inline-block absolute
  @apply w-6
  @apply bg-gray-900
  @apply rounded
  @apply transition-colors duration-150 ease-in

  content ''
  height 0.16rem

.number-button:hover:before
.number-button:hover:after
  @apply bg-gray-700

.plus-button:after
  @apply transform rotate-90

.minus-button.dont-click
.plus-button.dont-click
  @apply cursor-default

.minus-button.dont-click:before
.minus-button.dont-click:after
.plus-button.dont-click:before
.plus-button.dont-click:after
  @apply bg-gray-600

.outline-btn:focus
  @apply outline-none
</style>
