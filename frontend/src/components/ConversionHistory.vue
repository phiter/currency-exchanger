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
            {{ conversion.date | date }}
          </td>
          <td class="border p-2">
            {{ availableCurrencies[conversion.from].title }}
          </td>
          <td class="border p-2">
            {{ conversion.amount | currency }}
          </td>
          <td class="border p-2">
            {{ availableCurrencies[conversion.to].title }}
          </td>
          <td class="border p-2">
            {{ conversion.result | currency }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import availableCurrencies from '@/constants/currencies';

export default {
  props: {
    history: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      availableCurrencies,
    };
  },
};
</script>
