<template>
  <div :class="{ hidden: hidden }">
    <slot />
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
