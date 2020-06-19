import Vue from 'vue';
import VueCurrencyInput from 'vue-currency-input';
import { currency, date } from './filters';

Vue.use(VueCurrencyInput);

Vue.filter('currency', currency);
Vue.filter('date', date);
