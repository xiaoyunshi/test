// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'

import './common/stylus/index.styl'
// 因为axios 无法直接使用Vue.use,所以我们需要给构造器添加一个模型方法
// 这样我们就可以将axios在vue的组件中使用了
Vue.config.productionTip = false

Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
router.push('/goods')
