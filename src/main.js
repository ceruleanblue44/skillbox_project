import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import { str1, str2 } from './hw1';
// import alertHW from './hw2';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

// alertHW(str1);
// alertHW(str2);
