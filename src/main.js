import Vue from 'vue';
import App from './App.vue';

import { store } from './_store';
import { router } from './_helpers';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  vuetify,  
  render: h => h(App),
  router,
  store
}).$mount('#app')
