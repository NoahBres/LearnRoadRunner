<template>
  <div class="flex flex-col justify-center px-8 py-4 pb-0 h-full">
    <h2 class="border-none mt-0 mb-10 text-center">
      Wheel Radius
      <h4 class="block text-gray-500 m-0 text-2xl">(inches)</h4>
    </h2>
    <div class="flex flex-row justify-center items-center">
      <button
        class="number-button minus-button mr-12"
        @click="decrement"
        :class="{ 'dont-click': radius <= 0 && radius >= 9 }"
      />
      <input
        class="number-input"
        v-model.number="radius"
        type="number"
        min="0"
        @change="$emit('input', radius)"
      />
      <button class="number-button plus-button ml-12" @click="increment" />
    </div>
    <div class="flex flex-row justify-center items-center mt-12">
      <button
        class="outline-btn mx-2"
        v-for="wheel in wheelList"
        :key="wheel.name"
        @click="sampleClick(wheel.radius)"
      >
        <img :src="$withBase(wheel.img)" class="w-24 h-24 object-cover" />
        <h4>{{ wheel.name }}</h4>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

interface Wheel {
  name: string;
  img: string;

  radius: number;
}

const wheelTypes: Wheel[] = [
  {
    name: "100mm Mecanum",
    img: "./assets/drive-constants/gobilda-mecanum-eighth.jpg",
    radius: 1.9685,
  },
  {
    name: "4in Mecanum",
    img: "./assets/drive-constants/vex-mecanum-eighth.jpg",
    radius: 2,
  },
  {
    name: "75mm Mecanum",
    img: "./assets/drive-constants/rev-mecanum-quarter.jpg",
    radius: 1.4763,
  },
  {
    name: "96mm Mecanum",
    img: "./assets/drive-constants/gobilda-mecanum-v2-eighth.jpg",
    radius: 1.8898,
  },
];

export default Vue.extend({
  data() {
    return {
      wheelList: wheelTypes,
      radius: 2,
    };
  },
  mounted() {
    this.$emit("request-width", "670px");
    this.$emit("request-height", "565px");
  },
  methods: {
    decrement() {
      if (this.radius > 0) this.radius--;
      this.$emit("input", this.radius);
    },
    increment() {
      this.radius++;
      this.$emit("input", this.radius);
    },
    sampleClick(val) {
      this.radius = val;
      this.$emit("input", this.radius);
    },
  },
});
</script>
<style lang="stylus" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
  -webkit-appearance none;
  margin 0

/* Firefox */
input[type=number]
  -moz-appearance textfield

.number-input
  @apply text-center text-4xl
  @apply py-4 w-32
  @apply appearance-none
  @apply border border-transparent border-2
  @apply rounded-md
  @apply bg-gray-300
  @apply transition-colors duration-150

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
  @apply w-8 h-1
  @apply bg-gray-900
  @apply rounded
  @apply transition-colors duration-150 ease-in

  content ''

.number-button:hover:before
.number-button:hover:after
  @apply bg-gray-700

.plus-button:after
  @apply transform rotate-90

.minus-button.dont-click
.plus-button.dont-click
  @apply cursor-not-allowed

.minus-button.dont-click:before
.minus-button.dont-click:after
.plus-button.dont-click:before
.plus-button.dont-click:after
  @apply bg-gray-600

.outline-btn:focus
  @apply outline-none
</style>
