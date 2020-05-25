<template>
  <div class="flex flex-col justify-center items-center px-8 py-4 pb-0 h-full">
    <h2 class="border-none mt-0 mb-10 text-center">
      What are your motor specs?
    </h2>
    <div class="w-full max-w-xs">
      <div class="flex flex row items-center mb-6">
        <label class="label" for="max-rpm">Max RPM:</label>
        <input
          class="input"
          id="max-rpm"
          type="number"
          min="0"
          v-model.number="maxRPM"
          @change="$emit('input', specTuple)"
        />
      </div>
      <div class="flex flex row items-center mb-6">
        <label class="label" for="ticks-per-rev">Ticks Per Rev:</label>
        <input
          class="input"
          type="number"
          id="ticks-per-rev"
          min="0"
          v-model.number="ticksPerSecond"
          @change="$emit('input', specTuple)"
        />
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.label
  @apply w-2/3 block
  @apply text-gray-600 font-bold text-right text-lg
  @apply pr-4

.input
  @apply w-1/3
  @apply bg-gray-200 appearance-none
  @apply border-2 border-gray-200
  @apply rounded
  @apply py-2 px-4
  @apply text-gray-700 leading-tight text-lg
  @apply transition-colors duration-300 ease-out

.input:focus
  @apply outline-none bg-white border-red-500
</style>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      maxRPM: 312,
      ticksPerSecond: 300,
    };
  },
  computed: {
    specTuple() {
      return [this.maxRPM, this.ticksPerSecond];
    },
  },
  mounted() {
    this.$emit("request-width", "500px");
    this.$emit("request-height", "360px");
  },
});
</script>
