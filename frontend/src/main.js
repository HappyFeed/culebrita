import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader'

Vue.use(axios)

Vue.config.productionTip = false
Vue.config.ignoredElements = [/ion-\w*/];
defineIonPhaser(window);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

