<template>
  <div class="py-4 flex justify-center">
    <video width="100%" controls>
      <source :src="src" type="video/mp4" />
      Your browser does not support the video tag 😢.
    </video>
  </div>
</template>
<script>
export default {
  props: ["src"],
};
</script>
