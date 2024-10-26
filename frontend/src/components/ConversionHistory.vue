<template>
  <section>
    <h2 class="text-2xl mb-5">
      Last {{ history.length > 1 ? `${history.length} conversions` : 'conversion' }}
    </h2>
    <table class="table-auto w-full text-left">
      <thead>
        <tr>
          <th>Time</th>
          <th>From</th>
          <th>Amount</th>
          <th>To</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="conversion in history"
          :key="conversion.date"
        >
          <td class="border p-2">
            {{ date(conversion.date) }}
          </td>
          <td class="border p-2">
            {{ availableCurrencies[conversion.from].title }}
          </td>
          <td class="border p-2">
            {{availableCurrencies[conversion.from].symbol}} {{ currency(conversion.amount) }}
          </td>
          <td class="border p-2">
            {{ availableCurrencies[conversion.to].title }}
          </td>
          <td class="border p-2">
            {{availableCurrencies[conversion.to].symbol}} {{ currency(conversion.result) }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import availableCurrencies from '../constants/currencies';
import { currency, date } from '../plugins/filters';

const props = defineProps({
  history: {
    type: Array,
    required: true,
  },
});

const availableCurrenciesRef = ref(availableCurrencies);
</script>