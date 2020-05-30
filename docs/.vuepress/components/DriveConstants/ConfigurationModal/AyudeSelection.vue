<template>
  <div
    class="flex flex-col justify-center items-center px-16 py-12 pb-0 h-full"
  >
    <Ayude @input="$emit('input', $event)" />
    <p class="max-w-sm mt-6">
      Not sure what if you're using Drive Encoders? Check out the
      <a href="/quickstart-overview.html#are-you-using-drive-encoders"
        >quickstart overview</a
      >.
    </p>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  mounted() {
    this.$emit("request-width", "512px");
    this.$emit("request-height", "414px");
  },
});
</script>
