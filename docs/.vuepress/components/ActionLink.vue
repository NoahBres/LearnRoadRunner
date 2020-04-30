<template>
  <div class="action-link flex justify-center items-center" :style="style">
    <a v-bind:href="url" class="border-red-500 bg-gray-300">
      <slot />
    </a>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["url", "margin"],
  computed: {
    style() {
      return `margin: ${this.margin} 0`;
    },
  },
});
</script>
