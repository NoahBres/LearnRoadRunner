<template>
  <div>
    <transition name="fade">
      <div
        v-if="isOpen"
        class="z-30 bg-gray-900 fixed top-0 bottom-0 left-0 right-0 bg-opacity-85"
        @click="closeModal"
      ></div>
    </transition>
    <transition name="modal-in">
      <div
        v-if="isOpen"
        class="z-40 pointer-events-none flex justify-center items-center fixed top-0 right-0 bottom-0 left-0"
      >
        <div class="bg-white pointer-events-auto p-0 rounded overflow-hidden">
          <slot />
        </div>
      </div>
    </transition>
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
.fade-enter-active
.fade-leave-active
  transition opacity 150ms ease-in-out

.fade-enter
.fade-leave-to
  opacity 0

.modal-in-enter-active
.modal-in-leave-active
  transition transform 150ms ease-in, opacity 150ms ease-in

.modal-in-enter
.modal-in-leave-to
  transform scale(0.7)
  opacity 0.5
</style>
