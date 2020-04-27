<template>
  <div class="skipme" :class="{ hidden: hidden }">
    skip me
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
<style lang="stylus" scoped>
.skipme {
  display inline-block
  background $yellow500

  font-size 0.6em

  margin-left 0.4em
  padding 0.1em 0.5em

  border-radius 0.3em
}
</style>
