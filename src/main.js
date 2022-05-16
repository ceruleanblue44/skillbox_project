import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import { str1, str2 } from './hw1';
// import alertHW from './hw2';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// alertHW(str1);
// alertHW(str2);
