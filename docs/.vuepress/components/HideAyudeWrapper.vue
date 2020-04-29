<template>
  <div v-if="hidden">
    <slot />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import IsUsingDriveEncodersComponent from "./IsUsingDriveEncodersComponent";

export default Vue.extend({
  extends: IsUsingDriveEncodersComponent,
  props: ["skipIfDriveEncoders"],
  data() {
    return {
      hidden: true,
    };
  },
  methods: {
    onIsUsingDriveEncoderChanged(e: CustomEvent) {
      if (this.skipIfDriveEncoders) this.hidden = !e.detail;
      else this.hidden = e.detail;
    },
  },
});
</script>
