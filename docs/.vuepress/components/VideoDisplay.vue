<template>
  <div class="py-4 flex justify-center" :width="width">
    <video width="100%" :controls="controls" autoplay loop muted playsinline>
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
      default: "100%",
    },
    controls: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
