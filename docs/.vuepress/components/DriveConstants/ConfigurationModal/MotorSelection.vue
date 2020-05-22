<template>
  <div class="relative">
    <div
      class="flex flex-col justify-center px-8 py-4 pb-0 h-full"
      ref="mainGrid"
      :style="{ width: gridWidth }"
    >
      <h2 class="border-none text-center">
        What type of motors are you using?
      </h2>
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="motorGroup in motorGroupList"
          :key="motorGroup.name"
          class="relative"
        >
          <input
            type="radio"
            class="hidden"
            :id="`motor-group-${motorGroup.key}`"
            name="motor-group"
            :value="`motor-group-${motorGroup.key}`"
            :class="`outline-${motorGroup.color}`"
            @input="$emit('input', $event.target.value)"
            @change="changeMotorGroup"
          />
          <label
            class="outline-btn"
            :class="`outline-${motorGroup.color}`"
            :for="`motor-group-${motorGroup.key}`"
          >
            <img
              :src="$withBase(motorGroup.src)"
              class="w-24 h-24 object-cover"
            />
            <h4>{{ motorGroup.name }}</h4>
          </label>
          <transition name="show-check">
            <div
              class="selected-group"
              v-if="currentSelectedMotorGroup == motorGroup.key"
            />
          </transition>
        </div>
        <div>
          <input
            type="radio"
            class="hidden outline-pink"
            id="motor-group-custom"
            name="motor-group"
            value="motor-group-custom"
            :motorChoice="motorChoice"
            @input="$emit('input', $event.target.value)"
            @change="changeMotorGroup"
          />
          <label class="outline-btn outline-pink" for="motor-group-custom">
            <div class="w-24 h-24 flex justify-center items-center">
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
    <div
      class="box-border absolute top-0 bottom-0 mt-24 pr-2 transition-opacity duration-150 ease-out"
      :class="{ 'opacity-0': !showDerivates }"
      style="width: 314px;"
      :style="{ left: gridWidthPadding }"
    >
      <h3 class="text-center mr-1">Which specific motor?</h3>
      <table class="table-auto bg-gray-200 mr-3 rounded" style="height: 30.4em">
        <thead>
          <th class="border-none text-left">Ratio</th>
          <th class="border-none text-left">Name</th>
          <th class="border-none text-right">RPM</th>
        </thead>
        <tbody>
          <tr
            v-for="motor in derivatives"
            class="cursor-pointer transition-colors duration-200 ease-out"
            :class="{
              'bg-red-500': checkMotorKey(motor),
            }"
            :style="{
              backgroundColor: checkMotorKey(motor) ? '#fed7d7' : '',
              borderTop: checkMotorKey(motor) ? '0.25em' : '',
              borderBottom: checkMotorKey(motor) ? '0.25em' : '',
              borderLeft: checkMotorKey(motor) ? '0' : '',
              borderRight: checkMotorKey(motor) ? '0' : '',
              borderStyle: checkMotorKey(motor) ? 'solid' : '',
              borderColor: checkMotorKey(motor) ? '#F56565' : '',
            }"
          >
            <td class="border-none cursor-pointer px-0 py-0">
              <input
                type="radio"
                class="hidden"
                :id="`motor-${motor.key}`"
                name="motor"
                :value="`motor-${motor.key}`"
                @change="pickedMotor"
              />
              <label
                class="cursor-pointer flex px-4 py-2 text-lg"
                :for="`motor-${motor.key}`"
              >
                <span class="font-bold">{{ motor.speccedGearRatio }}</span>
                <span class="text-gray-500">:1</span></label
              >
            </td>
            <td class="w-full border-none cursor-pointer px-0">
              <label
                class="cursor-pointer flex px-4 py-2"
                :for="`motor-${motor.key}`"
                >{{ motor.baseName }}</label
              >
            </td>
            <td class="w-full border-none cursor-pointer px-0">
              <label
                class="cursor-pointer px-4 py-2 text-right"
                :for="`motor-${motor.key}`"
                >{{ motor.maxRPM }}</label
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { MotorGroup, MotorList, Motor, MotorModel } from "../MotorData";

export default Vue.extend({
  props: ["motorChoice"],
  data() {
    return {
      motorGroupList: MotorGroup,
      selectedMotorGroup: null,
      currentSelectedMotorGroup: null,
      selectedMotor: "",

      gridWidth: "572px",
      gridWidthPadding: "636px",

      normalWidth: "635px",
      expandedWidth: "950px",
    };
  },
  mounted() {
    this.$emit("request-width", this.normalWidth);
    this.$emit("request-height", "778px");
  },
  computed: {
    showDerivates() {
      return (
        this.selectedMotorGroup &&
        this.selectedMotorGroup.derivatives.length > 1
      );
    },
    derivatives() {
      if (this.showDerivates)
        return this.selectedMotorGroup.derivatives.filter((i) => i !== null);

      return [];
    },
  },
  methods: {
    changeMotorGroup(e) {
      const selectedId = e.target.value.substring("motor-group-".length);
      if (selectedId === "custom") {
        this.selectedMotorGroup = null;
        this.currentSelectedMotorGroup = null;
        this.selectedMotor = "CUSTOM";
        this.$emit("request-width", this.normalWidth);
      } else {
        const selectedMotorGroup = MotorGroup.find(
          (motorGroup) => motorGroup.key == selectedId
        );
        this.selectedMotorGroup = selectedMotorGroup;
        const hasDerivatives = selectedMotorGroup.derivatives.length > 1;
        if (hasDerivatives) {
          this.$emit("request-width", this.expandedWidth);
        } else {
          this.setMotor(`motor-${selectedMotorGroup.derivatives[0].key}`);
          this.$emit("request-width", this.normalWidth);
        }
      }
    },
    pickedMotor(e) {
      this.setMotor(e.target.value);
    },
    setMotor(key: string) {
      this.selectedMotor = key.substring("motor-".length);
      this.currentSelectedMotorGroup =
        MotorList[this.selectedMotor].belongsToGroupKey;
    },
    checkMotorKey(motor: Motor) {
      return this.selectedMotor !== "" && this.selectedMotor === motor.key;
    },
  },
});
</script>
<style lang="stylus" scoped>
.selected-group
  content ''

  position absolute
  top 3%
  right 3%

  width 2.2em
  height 2.2em
  border-radius 50%

  background url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' stroke='white' viewBox='0 0 24 24'%3E%3Cpath d='M5 13l4 4L19 7'%3E%3C/path%3E%3C/svg%3E") theme('colors.green.500');
  background-size 85% auto
  background-position center

  box-shadow 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)

  border 1px solid #1a202c

  pointer-events none

.show-check-enter-active, .show-check-leave-active
  transition transform 300ms ease, opacity 300ms ease

.show-check-enter, .show-check-leave-to
  transform rotate(-360deg)
  opacity 0
</style>
