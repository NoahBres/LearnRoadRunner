import Vue from "vue";

export default Vue.extend({
  props: {
    skipIfDriveEncoders: Boolean,
  },
  data() {
    return {
      hidden: true,
    };
  },
  mounted() {
    if (localStorage.isUsingDriveEncoders) {
      if (this.skipIfDriveEncoders) {
        this.hidden = localStorage.isUsingDriveEncoders === "true";
      } else {
        this.hidden =
          localStorage.isUsingDriveEncoders !== "true" ||
          !localStorage.isUsingDriveEncoders;
      }
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
    onIsUsingDriveEncoderChanged({ detail }: CustomEvent) {
      if (this.skipIfDriveEncoders) this.hidden = detail;
      else this.hidden = !detail;
    },
  },
});
