<template>
  <div id="app" class="container mx-auto p-5 text-gray-700">
    <h1 class="text-2xl font-bold">
      Currency Converter
    </h1>
    <form @submit.prevent="convert">
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
            @input="convert"
          />
          <div class="text-6xl flex">
            <span class="text-gray-600 font-thin">{{ fromSymbol }}</span>
              <currency-input
                id="currency-amount"
                v-model="amount"
                class="w-full"
                auto-decimal-mode
                :precision="2"
                :currency="null"
                :distraction-free="false"
              />
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
            @input="convert"
          />
          <div class="text-6xl flex">
            <span class="text-gray-600 font-thin">{{ toSymbol }}</span>
            <span>
              {{ result | currency }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-10">
        <button
          id="convert-btn"
          type="submit"
          :disabled="loading"
          class="btn btn-blue flex flex-col items-center"
        >
          <base-loader v-show="loading" />
          <img
            v-show="!loading"
            src="@/assets/random.svg"
            class="convert-img mx-1"
          >
          Convert
        </button>
      </div>
    </form>
    <hr class="my-5">
    <conversion-history
      v-if="history.length > 0"
      :history="conversionHistory"
    />
  </div>
</template>

<script>
import BaseSelect from '@/components/BaseSelect.vue';
import BaseLoader from '@/components/BaseLoader.vue';
import ConversionHistory from '@/components/ConversionHistory.vue';
import api from './services/api';
import availableCurrencies from './constants/currencies';

const LOCAL_STORAGE_HISTORY_KEY = 'conversion-history';

export default {
  name: 'App',
  components: {
    BaseSelect,
    BaseLoader,
    ConversionHistory,
  },
  data() {
    let history = [];
    const previousHistory = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
    if (previousHistory) {
      history = JSON.parse(previousHistory);
    }

    return {
      availableCurrencies,
      from: 'USD',
      to: 'BRL',
      amount: 1,
      result: null,
      loading: false,

      history,
    };
  },
  computed: {
    fromSymbol() {
      return this.availableCurrencies[this.from].symbol;
    },
    toSymbol() {
      return this.availableCurrencies[this.to].symbol;
    },
    conversionHistory() {
      return [...this.history].reverse();
    },
  },
  created() {
    this.convert(false);
  },
  methods: {
    async convert(log = true) {
      // Save api calls in the future
      if (this.to === this.from) {
        this.result = this.amount;
        if (log) this.logConversion();
        return;
      }

      this.loading = true;
      const { amount, from, to } = this;
      const result = await api.convert(amount, from, to);

      this.result = result;
      if (log) this.logConversion();

      this.loading = false;
    },
    logConversion() {
      const {
        amount,
        from,
        to,
        result,
      } = this;

      const date = Date.now();

      this.history.push({
        from,
        amount,
        to,
        result,
        date,
      });

      // Keep a maximum of 10 entries
      if (this.history.length > 10) {
        this.history.shift();
      }

      // Save history in localStorage
      localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(this.history));
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
