<template>
  <div class="py-4 box" :style="{ width: width }">
    <video
      class="md:rounded"
      width="100%"
      :controls="controls"
      v-bind:autoplay="autoplay"
      :loop="loop"
      :muted="muted"
      :playsinline="playsinline"
    >
      <source :src="src" type="video/mp4" />
      Your browser does not support the video tag 😢.
    </video>
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "100%",
    },
    controls: {
      type: Boolean,
      default: true,
    },
    muted: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    playsinline: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
