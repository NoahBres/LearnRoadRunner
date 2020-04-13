<template>
  <div class="skipme" :class="{ hidden: hidden }">
    skip me
  </div>
</template>
<script>
export default {
  props: ["skipIfDriveEncoders"],
  data() {
    return {
      hidden: true
    };
  },
  mounted() {
    if (localStorage.isUsingDriveEncoders) {
      if (this.skipIfDriveEncoders)
        this.hidden = !(
          localStorage.isUsingDriveEncoders === "true" ||
          localStorage.isUsingDriveEncoders
        );
      else
        this.hidden =
          localStorage.isUsingDriveEncoders === "true" ||
          localStorage.isUsingDriveEncoders;
    }

    document.addEventListener(
      "isUsingDriveEncodersChanged",
      this.onIsUsingDriveEncoderChanged,
      false
    );
  },
  beforeDestroy() {
    document.removeEventListener(this.onIsUsingDriveEncoderChanged);
  },
  methods: {
    onIsUsingDriveEncoderChanged(e) {
      if (this.skipIfDriveEncoders) this.hidden = !e.detail;
      else this.hidden = e.detail;
    }
  }
};
</script>
<style lang="stylus" scoped>
.skipme {
  display inline
  background $yellow500

  font-size 0.6em

  margin-left 0.4em
  padding 0.1em 0.5em

  border-radius 0.3em
}
</style>
