<template>
  <div class="relative overflow-hidden">
    <div
      class="flex flex-col justify-center px-8 py-4 pb-0"
      ref="mainGrid"
      :style="{ width: currentGridWidth }"
    >
      <h2 class="border-none text-center">
        What type of motors are you using?
      </h2>
      <div
        class="grid lg:grid-cols-3 grid-cols-2 gap-4 overflow-y-auto overflow-x-hidden"
        :style="{ height: currentGridHeight }"
      >
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
            @change="changeMotorGroup"
          />
          <label
            class="outline-btn"
            :class="`outline-${motorGroup.color}`"
            :for="`motor-group-${motorGroup.key}`"
          >
            <img
              :src="$withBase(motorGroup.src)"
              class="lg:w-24 lg:h-24 w-16 h-16 object-cover"
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
            @change="changeMotorGroup"
          />
          <label class="outline-btn outline-pink" for="motor-group-custom">
            <div class="w-24 h-24 flex justify-center items-center">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                class="lg:w-24 lg:h-24 w-16 h-16 text-pink-600"
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
      :class="{
        'opacity-0': !showDerivates,
        'pointer-events-none': !showDerivates,
      }"
      style="width: 314px;"
      :style="{ left: currentGridPadding }"
    >
      <h3 class="text-center mr-1">Which specific motor?</h3>
      <table
        class="table-auto bg-gray-200 mr-3 rounded"
        :style="{ height: currentTableHeight }"
      >
        <thead>
          <th class="border-none text-left">Ratio</th>
          <th class="border-none text-center">Name</th>
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
                v-model="radioVModel"
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
  data() {
    return {
      motorGroupList: MotorGroup,
      selectedMotorGroup: null,
      currentSelectedMotorGroup: null,
      selectedMotor: "",
      radioVModel: "",

      normalWidthBase: "451px",
      expandedWidthBase: "750px",

      heightBase: "570px",

      gridWidthBase: "390px",
      gridWidthPaddingBase: "436px",

      gridHeightBase: "365px",

      tableHeightBase: "20.5em",

      normalWidthLg: "635px",
      expandedWidthLg: "950px",

      heightLg: "778px",

      gridWidthLg: "572px",
      gridWidthPaddingLg: "636px",

      gridHeightLg: "596px",

      tableHeightLg: "30.4em",

      currentGridWidth: "",
      currentGridPadding: "",

      currentGridHeight: "",

      currentTableHeight: "",

      isDerivatesExpanded: false,
    };
  },
  mounted() {
    // Temporary until it can sync states
    this.$emit("input", "");

    window.addEventListener("resize", this.onResize, false);
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
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

        this.$emit("input", this.selectedMotor);

        this.isDerivatesExpanded = false;
        this.onResize();
      } else {
        const selectedMotorGroup = MotorGroup.find(
          (motorGroup) => motorGroup.key == selectedId
        );
        this.selectedMotorGroup = selectedMotorGroup;
        const hasDerivatives = selectedMotorGroup.derivatives.length > 1;
        if (hasDerivatives) {
          this.isDerivatesExpanded = true;
          this.onResize();
        } else {
          this.setMotor(`motor-${selectedMotorGroup.derivatives[0].key}`);

          this.isDerivatesExpanded = false;
          this.onResize();
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
      this.$emit("input", this.selectedMotor);
    },
    checkMotorKey(motor: Motor) {
      return this.selectedMotor !== "" && this.selectedMotor === motor.key;
    },
    onResize() {
      if (document.body.clientWidth >= 1024) {
        if (this.isDerivatesExpanded) {
          this.$emit("request-width", this.expandedWidthLg);
          this.currentGridPadding = this.gridWidthPaddingLg;
        } else {
          this.$emit("request-width", this.normalWidthLg);
        }

        this.currentGridWidth = this.gridWidthLg;
        this.currentGridHeight = this.gridHeightLg;
        this.currentTableHeight = this.tableHeightLg;

        this.$emit("request-height", this.heightLg);
      } else {
        if (this.isDerivatesExpanded) {
          this.$emit("request-width", this.expandedWidthBase);
          this.currentGridPadding = this.gridWidthPaddingBase;
        } else {
          this.$emit("request-width", this.normalWidthBase);
        }

        this.currentGridWidth = this.gridWidthBase;
        this.currentGridHeight = this.gridHeightBase;
        this.currentTableHeight = this.tableHeightBase;

        this.$emit("request-height", this.heightBase);
      }
    },
  },
});
</script>
<style lang="stylus" scoped>
.selected-group
  content ''

  @apply absolute
  top 3%
  right 3%

  width 2.2em
  height 2.2em
  @apply rounded-full

  background url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' stroke='white' viewBox='0 0 24 24'%3E%3Cpath d='M5 13l4 4L19 7'%3E%3C/path%3E%3C/svg%3E") theme('colors.green.500');
  background-size 85% auto
  @apply bg-center

  @apply border border-gray-900 border-solid

  @apply shadow-md
  @apply pointer-events-none

.show-check-enter-active, .show-check-leave-active
  @apply transition duration-300 ease-out

.show-check-enter, .show-check-leave-to
  @apply opacity-0
  transform rotate(-360deg)
</style>
