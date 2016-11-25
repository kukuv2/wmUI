import Vue from 'vue'
import App from './App'

/* eslint-disable no-new */
window.vue = Vue;
new Vue({
  el: '#app',
  render: h => h(App)
})
