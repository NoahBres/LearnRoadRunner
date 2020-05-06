<template>
  <div class="flex flex-col justify-center px-8 py-4 pb-0">
    <h2 class="border-none">Are you using an off-the-shelf drive train?</h2>
    <div class="flex flex-row justify-center">
      <input
        type="radio"
        id="choice-chassis-strafer-v1"
        name="chassis"
        value="strafer-v1"
        class="hidden"
        :chassisChoice="chassisChoice"
        @input="$emit('input', $event.target.value)"
      />
      <label
        class="strafer-v1-chassis cots-choice-btn mr-3"
        for="choice-chassis-strafer-v1"
      >
        <img
          :src="
            $withBase('./assets/drive-constants/strafer-chassis-quarter.jpg')
          "
          class="w-32 h-32 object-cover"
        />
        <h3>goBILDA Strafer Chassis</h3>
      </label>

      <input
        type="radio"
        id="choice-chassis-custom"
        name="chassis"
        value="custom"
        class="hidden"
        :chassisChoice="chassisChoice"
        @input="$emit('input', $event.target.value)"
      />
      <label class="custom-dt cots-choice-btn ml-3" for="choice-chassis-custom">
        <div class="w-32 h-32 flex justify-center items-center">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            class="w-24 h-24 text-green-700"
          >
            <path
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
        <h3>I'm using my own!</h3>
      </label>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["chassisChoice"],
});
</script>
<style lang="stylus" scoped>
.cots-choice-btn
  font-family inherit
  width 22em
  transition-property box-shadow, border-color

  @apply duration-200
  @apply border border-solid border-gray-400 rounded-md
  @apply overflow-hidden
  @apply flex flex-col items-center
  @apply px-3 py-2
  @apply bg-white cursor-pointer

.cots-choice-btn:hover
  @apply shadow-lg

/* Need to declare this rather than inline because specificity*/
/* Of the part right above is too high */
.strafer-v1-chassis:hover
  @apply border-yellow-500

#choice-chassis-strafer-v1[type="radio"]:checked + label
  outline-color theme("colors.yellow.500")
  outline-style auto

.custom-dt:hover
  @apply border-green-700

#choice-chassis-custom[type="radio"]:checked + label
  outline-color theme("colors.green.700")
  outline-style auto
</style>
