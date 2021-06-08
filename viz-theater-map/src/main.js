import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import VueGtag from 'vue-gtag'

Vue.config.productionTip = false

Vue.use(VueGtag, {
  config: {
      id: 'UA-198900409-1'  // 
  }
});

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
