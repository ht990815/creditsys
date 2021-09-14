// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/pruduct.css";
import "@/assets/fade.css"
import "@/assets/font_2170294_tn8cd737pol/iconfont.css";
import "@/permission"


// import axios from "axios"

// Vue.use(ElementUI)

// axios.defaults.baseURL = "http://139.196.42.209:5004/api/user/list"
// Vue.prototype.$axios = axios;

Vue.config.productionTip = false

console.log(process.env.NODE_ENV, process.env.VUE_APP_URL);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
