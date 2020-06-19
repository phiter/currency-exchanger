<template>
  <div
    class="loader"
    :style="style"
  />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'white',
    },
    size: {
      type: Number,
      default: 20,
    },
  },
  computed: {
    style() {
      const { size, color } = this;
      return {
        borderColor: color,
        width: `${size}px`,
        height: `${size}px`,
      };
    },
  },
};
</script>

<style>
.loader {
  display: inline-block;
  border-radius: 50%;
  border-width: 2px;
  border-style: solid;
  border-right-color: transparent !important;
  animation: spin 0.4s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
