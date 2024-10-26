<template>
  <div class="text-white">
    <div class="container mx-auto p-5">
      <h1 class="text-3xl font-extrabold mb-6 text-center">
        Currency Converter
      </h1>
      <form @submit.prevent="convert" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
            <label for="currency-from" class="block text-lg font-medium mb-2">
              From:
            </label>
            <BaseSelect
              id="currency-from"
              :value="from"
              :options="availableCurrencies"
              text-property="title"
              @input="convert"
              class="w-full mb-4"
            />
            <div class="text-5xl flex items-center">
              <span class="text-gray-300 font-light mr-2">{{ fromSymbol }}</span>
              <CurrencyInput
                id="currency-amount"
                v-model="amount"
                class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-opacity-10 bg-white"
                auto-decimal-mode
                :precision="2"
                :options="{ currency: from, currencyDisplay: 'hidden', autoDecimalDigits: true }"
              />
            </div>
          </div>
          <div class="bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
            <label for="currency-to" class="block text-lg font-medium mb-2">
              To:
            </label>
            <BaseSelect
              id="currency-to"
              :value="to"
              :options="availableCurrencies"
              text-property="title"
              @input="convert"
              class="w-full mb-4"
            />
            <div class="text-5xl flex items-center">
              <span class="text-gray-300 font-light mr-2">{{ toSymbol }}</span>
              <span class="w-full p-3.5">{{ currency(result) }}</span>
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-8">
          <button
            id="convert-btn"
            type="submit"
            :disabled="loading"
            class="btn btn-blue flex items-center justify-center px-6 py-3 space-x-2"
          >
            <BaseLoader v-show="loading" />
            <img
              v-show="!loading"
              src="./assets/random.svg"
              class="convert-img"
              alt="Convert Icon"
            >
            <span v-show="!loading">Convert</span>
          </button>
        </div>
      </form>
      <hr class="my-10">
      <ConversionHistory
        v-if="history.length > 0"
        :history="conversionHistory"
        class="bg-white bg-opacity-10 p-6 rounded-lg shadow-md"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import BaseSelect from './components/BaseSelect.vue';
import BaseLoader from './components/BaseLoader.vue';
import ConversionHistory from './components/ConversionHistory.vue';
import CurrencyInput from './components/CurrencyInput.vue';
import { currency } from './plugins/filters';
import api from './services/api';
import availableCurrencies from './constants/currencies';

const LOCAL_STORAGE_HISTORY_KEY = 'conversion-history';

const availableCurrenciesRef = ref(availableCurrencies);
const from = ref('USD');
const to = ref('BRL');
const amount = ref(1);
const result = ref(null);
const loading = ref(false);
const history = ref([]);

const fromSymbol = computed(() => availableCurrenciesRef.value[from.value].symbol);
const toSymbol = computed(() => availableCurrenciesRef.value[to.value].symbol);
const conversionHistory = computed(() => [...history.value].reverse());

onMounted(() => {
  const previousHistory = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
  if (previousHistory) {
    history.value = JSON.parse(previousHistory);
  }
  convert(false);
});

const convert = async (log = true) => {
  if (to.value === from.value) {
    result.value = amount.value;
    if (log) logConversion();
    return;
  }

  loading.value = true;
  try {
    const { result: conversionResult } = await api.convert(amount.value, from.value, to.value);
    result.value = conversionResult;
    if (log) logConversion();
  } catch (error) {
    alert('The server is not responding properly.');
  } finally {
    loading.value = false;
  }
};

const logConversion = () => {
  const logEntry = {
    from: from.value,
    amount: amount.value,
    to: to.value,
    result: result.value,
    date: Date.now(),
  };

  history.value.push(logEntry);

  if (history.value.length > 10) {
    history.value.shift();
  }

  localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(history.value));
};
</script>

<style scoped>
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
