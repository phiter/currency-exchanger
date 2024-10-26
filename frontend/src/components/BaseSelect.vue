<template>
  <select
    v-model="model"
    class="select"
  >
    <option
      v-for="(option, id) in options"
      :key="id"
      :value="id"
    >
      {{ textProperty ? option[textProperty] : option }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    options: {
      type: Object,
      required: true,
    },
    value: {
      type: null,
      required: true,
    },
    textProperty: {
      type: String,
      default: null,
    },
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      },
    },
  },
};
</script>

<style scoped>
.select {
  @apply block w-full
  bg-gray-200 border border-gray-200
  text-gray-700 py-3 px-4 pr-8
  rounded leading-tight;
}
.select:focus {
  @apply outline-none bg-white border-gray-500;
}
.select:hover {
  @apply outline-none bg-gray-100 border-gray-500;
}
</style>
