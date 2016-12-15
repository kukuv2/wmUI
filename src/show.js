import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import show from './showPage'
import store from './store'

Vue.use(ElementUI)

/* eslint-disable no-new */
window.Vue = Vue;
new Vue({
    el: '#show',
    store,
    render: (h) => {
        return h(show)
    }
})
