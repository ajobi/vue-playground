// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
//
// createApp(App).use(store).use(router).mount('#app')

import Vue from 'vue'
import App from './App'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)

new Vue({
  render: h => h(App)
}).$mount('#app')
