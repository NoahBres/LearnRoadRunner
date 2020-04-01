<template>
  <div class="action-button flex justify-center align-center" :style="style">
    <a v-bind:href="url" class="border-red-500 bg-gray-300">
      <slot />
    </a>
  </div>
</template>
<script>
export default {
  props: ["url", "margin"],
  computed: {
    style() {
      return `margin: ${this.margin} 0`;
    }
  }
};
</script>
<style lang="stylus" scoped>
.action-button a {
  background: $accentColor;
  padding: 1em 1.2em;

  border-radius: 0.2em;
  border-bottom: 0.1em solid darken($accentColor, 30%)

  color: #fff;
  font-size: 1.2em;

  transition: background-color 0.1s ease
}

.action-button a:hover {
  background-color: lighten($accentColor, 10%)
  text-decoration: none;
}
</style>
