<template>
  <div class="flex flex-col justify-center px-8 py-4 pb-0">
    <h2 class="border-none">What type of motors are you using?</h2>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="motorGroup in motorGroupList" :key="motorGroup.name">
        <input
          type="radio"
          class="hidden"
          :id="`motor-group-${motorGroup.key}`"
          name="motor-group"
          :value="`motor-group-${motorGroup.key}`"
          :class="`outline-${motorGroup.color}`"
        />
        <label
          class="outline-btn"
          :class="`outline-${motorGroup.color}`"
          :for="`motor-group-${motorGroup.key}`"
        >
          <img
            :src="$withBase(motorGroup.src)"
            class="w-32 h-32 object-cover"
          />
          <h4>{{ motorGroup.name }}</h4>
        </label>
      </div>
      <div>
        <input
          type="radio"
          class="hidden outline-pink"
          id="motor-group-custom"
          name="motor-group"
          value="motor-group-custom"
        />
        <label class="outline-btn outline-pink" for="motor-group-custom">
          <div class="w-32 h-32 flex justify-center items-center">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              class="w-24 h-24 text-pink-600"
            >
              <path
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </div>
          <h4>Custom motor</h4>
        </label>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { MotorGroup } from "../MotorData";

export default Vue.extend({
  data() {
    return {
      motorGroupList: MotorGroup,
    };
  },
});
</script>
<style lang="stylus" scoped></style>
