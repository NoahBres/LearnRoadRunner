<template>
  <div>
    <div class="bg-blue-200" :style="{ height: graphHeight }"></div>
    <div class="bg-green-200 h-4"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import uPlot from "uplot";

export default Vue.extend({
  props: {
    graphHeight: {
      type: String,
      default: "30rem",
    },
  },
  data() {
    return {};
  },
  mounted() {},
});
</script>
<style src="uplot/dist/uPlot.min.css"></style>
