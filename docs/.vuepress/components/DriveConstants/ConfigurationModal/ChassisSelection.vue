<template>
  <div class="flex flex-col justify-center px-8 py-4 pb-0 h-full">
    <h2 class="border-none mt-0 mb-10 text-center">
      Are you using an off-the-shelf drive train?
    </h2>
    <div class="flex flex-row justify-center">
      <input
        type="radio"
        id="choice-chassis-strafer-v1"
        name="chassis"
        value="strafer-v1"
        class="hidden"
        :chassisChoice="chassisChoice"
        @input="$emit('input', $event.target.value)"
        :checked="chassisChoice == 'strafer-v1'"
      />
      <label
        class="strafer-v1-chassis outline-btn mr-3 outline-yellow"
        style="max-width: 320px"
        for="choice-chassis-strafer-v1"
      >
        <img
          :src="
            $withBase('./assets/drive-constants/strafer-chassis-quarter.jpg')
          "
          class="w-32 h-32 object-cover"
        />
        <h3>
          goBILDA Strafer Chassis v1
          <span class="block text-xs text-gray-500 mt-2">
            2:1 bevel gears and 13.7:1 motors
          </span>
        </h3>
      </label>

      <input
        type="radio"
        id="choice-chassis-strafer-v2"
        name="chassis"
        value="strafer-v2"
        class="hidden"
        :chassisChoice="chassisChoice"
        @input="$emit('input', $event.target.value)"
        :checked="chassisChoice == 'strafer-v2'"
      />
      <label
        class="strafer-v2-chassis outline-btn mr-3 outline-orange"
        style="max-width: 320px"
        for="choice-chassis-strafer-v2"
      >
        <img
          :src="
            $withBase('./assets/drive-constants/strafer-chassis-quarter.jpg')
          "
          class="w-32 h-32 object-cover"
        />
        <h3>
          goBILDA Strafer Chassis v2
          <span class="block text-xs text-gray-500 mt-2">
            1:1 miter gears and 19.2:1 motors
            <br />
            Released in August 2020
          </span>
        </h3>
      </label>
    </div>
    <div class="flex flex-row justify-center mt-3">
      <input
        type="radio"
        id="choice-chassis-custom"
        name="chassis"
        value="custom"
        class="hidden"
        :chassisChoice="chassisChoice"
        @input="$emit('input', $event.target.value)"
        :checked="chassisChoice == 'custom'"
      />
      <label
        class="custom-dt outline-btn ml-3 outline-green"
        for="choice-chassis-custom"
      >
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
import BaseSelection, { Dimensions } from "./BaseSelection";

export default Vue.extend({
  props: ["chassisChoice"],
  extends: BaseSelection,
  data() {
    return {
      sizeBase: {
        width: "750px",
        height: "690px",
      } as Dimensions,
      sizeLg: {
        width: "844px",
        height: "690px",
      } as Dimensions,
    };
  },
});
</script>
<style lang="stylus" scoped>
.outline-btn
  width 22em

/* Need to declare this rather than inline because specificity*/
/* The parent element (in ConfigurationModal.vue) specificty is too high */
.strafer-v1-chassis:hover
  @apply border-yellow-500

#choice-chassis-strafer-v1[type="radio"]:checked + label
  outline-color theme("colors.yellow.500")
  outline-style auto

.strafer-v2-chassis:hover
  @apply border-orange-500

#choice-chassis-strafer-v2[type="radio"]:checked + label
  outline-color theme("colors.orange.500")
  outline-style auto

.custom-dt:hover
  @apply border-green-700

#choice-chassis-custom[type="radio"]:checked + label
  outline-color theme("colors.green.700")
  outline-style auto
</style>
