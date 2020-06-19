import Vue from 'vue';
import VueCurrencyInput from 'vue-currency-input';
import { currency } from './filters';

Vue.use(VueCurrencyInput);

Vue.filter('currency', currency);
