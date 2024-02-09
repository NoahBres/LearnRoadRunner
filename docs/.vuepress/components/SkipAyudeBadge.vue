<template>
  <div class="skipme" v-if="!hidden">
    skip me
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import IsUsingDriveEncodersComponent from "./IsUsingDriveEncodersComponent";

export default Vue.extend({ });
</script>
<style lang="stylus" scoped>
.skipme
  display inline-block
  background theme("colors.yellow.300")

  font-size 0.6em

  margin-left 0.4em
  padding 0.1em 0.5em

  border-radius 0.3em
</style>
