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

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: null,
    required: true,
  },
  textProperty: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
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
