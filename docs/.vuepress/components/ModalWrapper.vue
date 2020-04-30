<template>
  <div>
    <slot name="button" :openModal="openModal" :closeModal="closeModal" />
    <slot name="modal" :isOpen="isModalOpened" :closeModal="closeModal" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      isModalOpened: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpened = true;
    },
    closeModal() {
      this.isModalOpened = false;
    },
  },
});
</script>
