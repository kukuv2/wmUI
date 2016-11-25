import Vue from 'vue'
import show from './showPage'

/* eslint-disable no-new */
window.vue = Vue;
new Vue({
  el: '#show',
  render: (h) => {
      return h(show)
  }
})
