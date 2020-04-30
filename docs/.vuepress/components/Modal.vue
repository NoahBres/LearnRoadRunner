<template>
  <div>
    <transition name="fade">
      <div
        v-if="isOpen"
        class="z-30 bg-gray-900 opacity-75"
        @click="closeModal"
      ></div>
    </transition>
    <div
      v-if="isOpen"
      class="z-40 pointer-events-none flex justify-center align-center fixed top-0 right-0 bottom-0 left-0"
    >
      <div class="bg-white pointer-events-auto"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    closeModal: Function,
  },
  data() {
    return {};
  },
  methods: {},
});
</script>
<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active
  transition opacity 250ms

.fade-enter, .fade-leave-to
  opacity 0
</style>
