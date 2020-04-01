<template>
  <div class="video-display flex justify-center">
    <video width="100%" controls loop>
      <source :src="src" type="video/mp4" />
      Your browser does not support the video tag 😢.
    </video>
  </div>
</template>
<script>
export default {
  props: ["src"],
  computed: {},
  mounted: function() {}
};
</script>
<style scoped>
.video-display {
  padding: 1em 0;
}
</style>
