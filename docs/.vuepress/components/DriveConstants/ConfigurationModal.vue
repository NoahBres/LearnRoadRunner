<template>
  <div
    class="configuration-modal flex flex-col justify-between text-center"
    :style="{ width: width, height: height }"
  >
    <DriveConstants-ConfigurationModal-ChassisSelection
      v-if="this.currentState.matches('chassisSelection')"
      v-model="chassisChoice"
      :chassisChoice="chassisChoice"
      @request-width="requestWidth"
      @request-height="requestHeight"
    />

    <DriveConstants-ConfigurationModal-MotorSelection
      v-if="this.currentState.matches('motorSelection')"
      v-model="motorChoice"
      @request-width="requestWidth"
      @request-height="requestHeight"
    />

    <DriveConstants-ConfigurationModal-ManualMotorSelection
      v-if="this.currentState.matches('manualMotorSelection')"
      @request-width="requestWidth"
      @request-height="requestHeight"
      v-model="manualMotorSpec"
    />

    <DriveConstants-ConfigurationModal-GearRatioSelection
      v-if="this.currentState.matches('gearRatioSelection')"
      v-model="gearRatio"
      @request-width="requestWidth"
      @request-height="requestHeight"
    />

    <DriveConstants-ConfigurationModal-WheelSelection
      v-if="this.currentState.matches('wheelSelection')"
      v-model="wheelRadius"
      @request-width="requestWidth"
      @request-height="requestHeight"
    />

    <DriveConstants-ConfigurationModal-BotDimensionsSelection
      v-if="this.currentState.matches('botDimensions')"
      v-model="trackWidth"
      @request-width="requestWidth"
      @request-height="requestHeight"
    />

    <DriveConstants-ConfigurationModal-AyudeSelection
      v-if="this.currentState.matches('ayudeSelection')"
      v-model="ayude"
      @request-width="requestWidth"
      @request-height="requestHeight"
    />

    <DriveConstants-ConfigurationModal-DonePage
      v-if="this.currentState.matches('done')"
      :configuration="this.context.currentConfigurationState"
      @request-width="requestWidth"
      @request-height="requestHeight"
    />

    <div
      class="flex justify-between px-8 py-4 bg-gray-200 overflow-hidden box-border"
      style="min-height: 74px;"
    >
      <button
        class="back-button flex items-center"
        :class="{
          'translate-me': !backButtonShowing,
        }"
        @click="handleBackClick"
      >
        <svg
          fill="red"
          class="w-5 h-5 mr-2"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg
        >Back
      </button>
      <button
        class="next-button"
        :class="{ 'translate-me': !nextButtonShowing }"
        style="min-height: 42px;"
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

import { ChassisEnum } from "./ConfigurationState";
import { MotorList } from "./MotorData";

export default Vue.extend({
  data() {
    return {
      height: "400px",
      width: "800px",

      chassisChoice: "",
      motorChoice: "",
      manualMotorSpec: [312, 300],
      gearRatio: 1,
      wheelRadius: 2,
      trackWidth: 18,
      ayude: true,

      configurationModalService: interpret(configurationModalMachine),
      currentState: configurationModalMachine.initialState,
      context: configurationModalMachine.context,
    };
  },
  computed: {
    nextButtonShowing(): boolean {
      if (this.currentState.matches("chassisSelection"))
        return !!this.chassisChoice;
      else if (this.currentState.matches("motorSelection"))
        return !!this.motorChoice;
      else if (this.currentState.matches("manualMotorSelection"))
        return this.manualMotorSpec[0] > 0 && this.manualMotorSpec[1] > 0;
      else if (this.currentState.matches("gearRatioSelection"))
        return this.gearRatio > 0 && this.gearRatio != Infinity;
      else if (this.currentState.matches("wheelSelection"))
        return this.wheelRadius && this.wheelRadius > 0;
      else if (this.currentState.matches("botDimensions"))
        return this.trackWidth > 0 && this.trackWidth <= 18;
      else if (this.currentState.matches("ayudeSelection"))
        return this.ayude !== null || this.ayude !== undefined;

      return false;
    },
    backButtonShowing(): boolean {
      if (this.currentState.matches("chassisSelection")) return false;
      else if (this.currentState.matches("motorSelection")) return true;
      else if (this.currentState.matches("manualMotorSelection")) return true;
      else if (this.currentState.matches("gearRatioSelection")) return true;
      else if (this.currentState.matches("wheelSelection")) return true;
      else if (this.currentState.matches("driveEncoders")) return true;
      else if (this.currentState.matches("botDimensions")) return true;
      else if (this.currentState.matches("ayudeSelection")) return true;
      else if (this.currentState.matches("done")) return true;
      return false;
    },
  },
  created() {
    this.configurationModalService
      .onTransition((state) => {
        this.currentState = state;
        this.context = state.context;
      })
      .start();
  },
  methods: {
    handleNextClick() {
      if (this.currentState.matches("chassisSelection")) {
        if (this.chassisChoice === "strafer-v1") {
          this.configurationModalService.send("SELECTED_CHASSIS", {
            value: {
              ...this.context.currentConfigurationState,
              chassisSelected: ChassisEnum.STRAFER_V1_CHASSIS,
            },
          });
        } else if (this.chassisChoice === "strafer-v3") {
          this.configurationModalService.send("SELECTED_CHASSIS", {
            value: {
              ...this.context.currentConfigurationState,
              chassisSelected: ChassisEnum.STRAFER_V3_CHASSIS,
            },
          });
        } else if (this.chassisChoice === "custom") {
          this.configurationModalService.send("SELECTED_CUSTOM_CHASSIS", {
            value: {
              ...this.context.currentConfigurationState,
              chassisSelected: ChassisEnum.CUSTOM,
            },
          });
        }
      } else if (this.currentState.matches("motorSelection")) {
        if (this.motorChoice == "CUSTOM") {
          this.configurationModalService.send("SELECTED_CUSTOM_MOTOR", {
            value: {
              ...this.context.currentConfigurationState,
              customMotorSelected: true,
            },
          });
        } else if (this.motorChoice != "") {
          this.configurationModalService.send("SELECTED_MOTOR", {
            value: {
              ...this.context.currentConfigurationState,
              motorSelected: MotorList[this.motorChoice],
              customMotorSelected: false,
            },
          });
        }
      } else if (this.currentState.matches("manualMotorSelection")) {
        if (this.manualMotorSpec[0] > 0 && this.manualMotorSpec[1] > 0) {
          this.configurationModalService.send("SET_MANUAL_MOTOR", {
            value: {
              ...this.context.currentConfigurationState,
              maxRPM: this.manualMotorSpec[0],
              ticksPerRev: this.manualMotorSpec[1],
            },
          });
        }
      } else if (this.currentState.matches("gearRatioSelection")) {
        if (this.gearRatio > 0) {
          this.configurationModalService.send("SET_GEAR_RATIO", {
            value: {
              ...this.context.currentConfigurationState,
              gearRatio: this.gearRatio,
            },
          });
        }
      } else if (this.currentState.matches("wheelSelection")) {
        if (this.wheelRadius && this.wheelRadius > 0 && this.wheelRadius <= 9) {
          this.configurationModalService.send("SELECTED_WHEEL_SIZE", {
            value: {
              ...this.context.currentConfigurationState,
              wheelRadius: this.wheelRadius,
            },
          });
        }
      } else if (this.currentState.matches("botDimensions")) {
        if (this.trackWidth > 0 && this.trackWidth <= 18) {
          this.configurationModalService.send("SELECTED_DIMENSIONS", {
            value: {
              ...this.context.currentConfigurationState,
              trackWidth: this.trackWidth,
            },
          });
        }
      } else if (this.currentState.matches("ayudeSelection")) {
        if (this.ayude !== null || this.ayude !== undefined) {
          this.configurationModalService.send("SELECTED_AYUDE", {
            value: {
              ...this.context.currentConfigurationState,
              runUsingEncoder: this.ayude,
            },
          });
        }
      }
    },
    handleBackClick() {
      this.configurationModalService.send("BACK");
    },
    requestWidth(value) {
      this.width = value;
    },
    requestHeight(value) {
      this.height = value;
    },
  },
});
</script>
<style lang="stylus" scoped>

.configuration-modal
  transition width 300ms cubic-bezier(0.41, 1.3, 0.71, 1.03), height 300ms cubic-bezier(0.41, 1.3, 0.74, 1.03)

.configuration-modal >>> .outline-btn
  font-family inherit
  transition-property box-shadow, border-color

  @apply duration-200
  @apply border border-solid border-gray-400 rounded-md
  @apply overflow-hidden
  @apply flex flex-col items-center
  @apply px-3 py-2
  @apply bg-white cursor-pointer

.configuration-modal >>> .outline-btn:hover
  @apply shadow-lg

.configuration-modal >>> .outline-btn.outline-orange:hover
  @apply border-orange-500

.configuration-modal >>> .outline-orange[type="radio"]:checked + label
  outline-color theme("colors.orange.500")
  outline-style auto

.configuration-modal >>> .outline-btn.outline-red:hover
  @apply border-red-500

.configuration-modal >>> .outline-red[type="radio"]:checked + label
  outline-color theme("colors.red.500")
  outline-style auto

.configuration-modal >>> .outline-btn.outline-blue:hover
  @apply border-blue-500

.configuration-modal >>> .outline-blue[type="radio"]:checked + label
  outline-color theme("colors.blue.500")
  outline-style auto

.configuration-modal >>> .outline-btn.outline-yellow:hover
  @apply border-yellow-500

.configuration-modal >>> .outline-yellow[type="radio"]:checked + label
  outline-color theme("colors.yellow.500")
  outline-style auto

.configuration-modal >>> .outline-btn.outline-green:hover
  @apply border-green-700

.configuration-modal >>> .outline-green[type="radio"]:checked + label
  outline-color theme("colors.green.700")
  outline-style auto


.configuration-modal >>> .outline-btn.outline-pink:hover
  @apply border-pink-600

.configuration-modal >>> .outline-pink[type="radio"]:checked + label
  outline-color theme("colors.pink.600")
  outline-style auto

.back-button
  @apply bg-transparent
  @apply uppercase text-gray-600 tracking-wide
  @apply cursor-pointer
  @apply border-0 border-solid border-transparent border-b-2
  @apply transition-colors transition-transform duration-150 ease-out transform

  transition transform 150ms cubic-bezier(0.41, 1.3, 0.71, 1.03), border-color 100ms ease-out

  &.translate-me
    @apply translate-y-16

.back-button:hover
  border-bottom-color theme("colors.gray.600")

.next-button
  @apply inline-block
  @apply text-white text-base
  @apply bg-red-600
  @apply border-none
  @apply px-8 py-3 rounded
  @apply cursor-pointer
  @apply transition-colors transition-transform ease-out duration-150 transform

  transition transform 150ms cubic-bezier(0.41, 1.3, 0.71, 1.03)
  // transition transform 150ms cubic-bezier(.67, -0.6, 0, 1.71)

  // Required because the class doesn't have enough specificity on its own
  &.translate-me
    @apply translate-x-40

.next-button:hover
  @apply bg-red-700
</style>
