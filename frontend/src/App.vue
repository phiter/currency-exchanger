<template>
  <div id="app" class="container mx-auto p-5 text-gray-700">
    <h1 class="text-2xl font-bold">
      Currency Converter
    </h1>
    <form>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="currency-from">
            From:
          </label>
          <base-select
            id="currency-from"
            v-model="from"
            :options="availableCurrencies"
            text-property="title"
          />
          <div class="text-6xl flex">
            <span class="text-gray-600 font-thin">{{ fromSymbol }}</span>
            <input v-model="amount" class="w-full" />
          </div>
        </div>
        <div>
          <label for="currency-from">
            To:
          </label>
          <base-select
            id="currency-to"
            v-model="to"
            :options="availableCurrencies"
            text-property="title"
          />
          <div class="text-6xl flex">
            <span class="text-gray-600 font-thin">{{ toSymbol }}</span>
            <span>
              {{ result }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-10">
        <button
          id="convert-btn"
          type="submit"
          class="btn btn-blue flex flex-col items-center"
        >
          <img
            src="@/assets/random.svg"
            class="convert-img mx-1"
          >
          Convert
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import BaseSelect from '@/components/BaseSelect.vue';
import availableCurrencies from './constants/currencies';

export default {
  name: 'App',
  components: {
    BaseSelect,
  },
  data() {
    return {
      availableCurrencies,
      from: 'USD',
      to: 'BRL',
      amount: 1,
      result: null,
    };
  },
  computed: {
    fromSymbol() {
      return this.availableCurrencies[this.from].symbol;
    },
    toSymbol() {
      return this.availableCurrencies[this.to].symbol;
    },
  },
};
</script>

<style>
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:disabled {
  @apply bg-blue-300;
  cursor: default;
}
.btn-blue:hover:not(:disabled) {
  @apply bg-blue-600;
}
.btn-blue:active:not(:disabled) {
  @apply bg-blue-700;
}
.convert-img {
  width: 20px;
}
</style>
