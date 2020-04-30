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
      if (this.skipIfDriveEncoders)
        this.hidden =
          localStorage.isUsingDriveEncoders === "true" ||
          localStorage.isUsingDriveEncoders;
      else
        this.hidden = !(
          localStorage.isUsingDriveEncoders === "true" ||
          localStorage.isUsingDriveEncoders
        );
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
    onIsUsingDriveEncoderChanged(e: CustomEvent) {
      if (this.skipIfDriveEncoders) this.hidden = e.detail;
      else this.hidden = !e.detail;

      console.log({ hidden: this.hidden, detail: e.detail });
    },
  },
});
