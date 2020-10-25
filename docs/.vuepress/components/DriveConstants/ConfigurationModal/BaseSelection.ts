import Vue from "vue";

interface Dimensions {
  width: String;
  height: String;
}

const BaseSelection = Vue.extend({
  data() {
    return {
      sizeBase: {
        width: "0",
        height: "0",
      } as Dimensions,
      sizeLg: {
        width: "0",
        height: "0",
      } as Dimensions,
    };
  },
  mounted() {
    window.addEventListener("resize", this.emitSize, false);

    this.emitSize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.emitSize);
  },
  methods: {
    emitSize() {
      if (document.body.clientWidth >= 1285) {
        this.$emit("request-width", this.sizeLg.width);
        this.$emit("request-height", this.sizeLg.height);
      } else {
        this.$emit("request-width", this.sizeBase.width);
        this.$emit("request-height", this.sizeBase.height);
      }
    },
  },
});

export { BaseSelection as default, Dimensions };
