<template>
  <div class="flex flex-col justify-center items-center px-0 py-16 h-full">
    <p class="text-lg font-semibold">
      🎉 Your drive constants file has been generated! 🎊
    </p>
    <a
      class="bg-red-600 hover:bg-red-700 text-white font-bold hover:no-underline py-4 px-5 rounded inline-flex items-center cursor-pointer mt-3"
      @click="download"
      :href="downloadUrl"
      download="DriveConstants.java"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        class="fill-current w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
      </svg>
      <span>Download</span>
    </a>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import VueConfetti from "vue-confetti";

import { generateFile } from "../ConstantsGenerator";

Vue.use(VueConfetti);

export default Vue.extend({
  props: ["configuration"],
  data() {
    return {
      confettiStarted: false,
    };
  },
  computed: {
    downloadUrl(): string {
      const blob = new Blob([generateFile(this.configuration)], {
        type: "application/java",
      });

      return URL.createObjectURL(blob);
    },
  },
  mounted() {
    this.$emit("request-width", "510px");
    this.$emit("request-height", "328px");
  },
  methods: {
    download() {
      if (!this.confettiStarted) {
        this.confettiStarted = true;

        this.$confetti.start({
          particlesPerFrame: 0.5,
          particles: [
            {
              type: "circle",
            },
            {
              type: "rect",
            },
          ],
        });
      }
    },
  },
  beforeDestroy() {
    this.$confetti.stop();
  },
});
</script>
