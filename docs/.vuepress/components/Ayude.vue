<template>
  <div class="flex justify-center flex-col">
    <h3 class="text-center">Are you using drive encoders?</h3>
    <div class="flex justify-center items-center flex-row">
      <p class="indicator-text nope" :class="{ active: !checked }">Nope</p>
      <input type="checkbox" :id="uuid" v-model="checked" />
      <label class="switch" :for="uuid" />
      <p class="indicator-text yep" :class="{ active: checked }">Yep</p>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      checked: true,
    };
  },
  computed: {
    // https://stackoverflow.com/a/2117523/3360147
    uuid(): string {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        let r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
  },
  mounted() {
    if (localStorage.isUsingDriveEncoders) {
      this.checked = localStorage.isUsingDriveEncoders === "true";
    }
  },
  watch: {
    checked(newCheckedVal) {
      localStorage.isUsingDriveEncoders = newCheckedVal;

      let event = new CustomEvent("isUsingDriveEncodersChanged", {
        detail: newCheckedVal,
      });
      document.dispatchEvent(event);

      this.$emit("input", newCheckedVal);
    },
  },
});
</script>
<style lang="stylus" scoped>
.indicator-text
  font-weight bold
  font-size 1.3em

  transition color, background-color 300ms ease-in-out
  color #CBD5E0

  background-color transparent
  padding 0.1em 0.6em
  border-radius 0.3em

  &.active
    color $textColor

  &.active.yep
    background-color theme("colors.green.400")

  &.active.nope
    background-color theme("colors.yellow.300")

input
  position absolute
  left: -9999px

.switch
  position relative
  display block

  width 5.5em
  height 3em

  margin 0 2em

  cursor pointer
  border-radius 1.5em
  transition 350ms

  background linear-gradient(rgba(#000,0.07), rgba(#fff, 0)), #ddd
  box-shadow 0 0.07em 0.1em -0.1em rgba(#000, .4) inset,
    0 0.05em 0.08em -0.01em rgba(#fff, .7)

  &::after
    content: ''
    position absolute

    top 0.5em
    left 0.5em

    width 2em
    height 2em

    border-radius 50%
    transition 250ms ease-in-out

    background linear-gradient(#f5f5f5 10%, #eee)
    box-shadow 0 0.1em 0.15em -0.05em rgba(#fff, .9) inset,
      0 0.2em 0.2em -0.12em rgba(#000, .5)

  &::before
    content: ''
    position absolute

    width 4em
    height 1.5em

    top 0.75em
    left 0.7em

    border-radius 0.75em
    transition 250ms ease-in-out

    background linear-gradient(rgba(#000, 0.07),rgba(#fff, 0.1)), #d0d0d0
    box-shadow 0 0.08em 0.15em -0.1em rgba(#000,.5) inset,
      0 0.05em 0.08em -0.01em rgba(#fff,.7),
      0 0 0 0 theme("colors.green.400") inset

input:checked + .switch::before
  box-shadow: 0 0.08em 0.15em -0.1em rgba(#000,.5) inset,
    0 0.05em 0.08em -0.01em rgba(#fff,.7),
    3em 0 0 0 theme("colors.green.400") inset

input:checked + .switch::after
  left 3em
</style>
