<template>
  <div v-if="!hidden">
    <slot />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import IsUsingDriveEncodersComponent from "./IsUsingDriveEncodersComponent";

export default Vue.extend({
  extends: IsUsingDriveEncodersComponent,
});
</script>
