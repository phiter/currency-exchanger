import Vue from 'vue';
import './plugins';
import App from './App.vue';
import './styles/main.css';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
