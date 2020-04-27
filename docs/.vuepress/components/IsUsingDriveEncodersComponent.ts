import Vue from "vue";

export default Vue.extend({
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
    document.removeEventListener(
      "isUsingDriveEncodersChanged",
      this.onIsUsingDriveEncoderChanged
    );
  },
  methods: {
    onIsUsingDriveEncoderChanged(e: CustomEvent) {},
  },
});
