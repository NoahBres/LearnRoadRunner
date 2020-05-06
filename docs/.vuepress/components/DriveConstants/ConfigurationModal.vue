<template>
  <div>
    <DriveConstants-ConfigurationModal-ChassisSelection
      v-if="this.currentState.matches('chassisSelection')"
      v-model="chassisChoice"
    />

    <div
      v-if="this.currentState.matches('motorSelection')"
      class="flex flex-col justify-center px-8 py-4 pb-0"
    >
      <h2 class="border-none">What type of motors are you using?</h2>
    </div>

    <div v-if="this.currentState.matches('done')">
      <h2>Done</h2>
    </div>

    <div class="flex justify-end mt-12 px-8 py-4 bg-gray-200">
      <button
        class="next-button"
        :class="{ 'translate-x-40': !bottomButtonShowing }"
        @click="handleNextClick"
      >
        Next
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { interpret } from "xstate";
import { configurationModalMachine } from "./ConfigurationModalMachine";

import DriveConstantStorage, {
  StraferV1Constants,
} from "./DriveConstantStorage";
import { ChassisEnum } from "./ChassisEnum";

export default Vue.extend({
  data() {
    return {
      chassisChoice: "",
      configurationModalService: interpret(configurationModalMachine),
      currentState: configurationModalMachine.initialState,
      context: configurationModalMachine.context,
    };
  },
  computed: {
    bottomButtonShowing(): boolean {
      return this.chassisChoice;
    },
  },
  created() {
    this.configurationModalService
      .onTransition((state) => {
        this.currentState = state;
        this.context = state.context;
      })
      .start();

    // this.chassisChoice = this.context.chassisSelected;
  },
  methods: {
    handleNextClick() {
      if (this.currentState.matches("chassisSelection")) {
        if (this.chassisChoice === "strafer-v1") {
          this.configurationModalService.send("SELECTED_CHASSIS", {
            value: ChassisEnum.STRAFER_V1_CHASSIS,
          });
        } else if (this.chassisChoice === "custom") {
          this.configurationModalService.send("SELECTED_CUSTOM_CHASSIS");
        }
      }
    },
  },
});
</script>
<style lang="stylus" scoped>
.next-button
  @apply text-white text-base
  @apply bg-red-600
  @apply border-none
  @apply px-8 py-3 rounded
  @apply cursor-pointer
  @apply transition-colors transition-transform ease-out duration-150 transform

  transition transform 150ms cubic-bezier(.64, 1.47, .74, 1.03)

  // Required because the class doesn't have enough specificity on its own
  &.translate-x-40
    @apply translate-x-40

.next-button:hover
  @apply bg-red-700
</style>
