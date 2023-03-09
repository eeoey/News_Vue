import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
// NOTES 只有目录下的 index 文件可以省略不写，如 import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 样式文件
import "./assets/style/global.css";
import "./assets/style/reset.css";

Vue.config.productionTip = false;

router.beforeEach((to, from, next)=>{
  document.title = "新闻管理系统";
  next();
});

Vue.use(ElementUI);
// 初始化时就需要有频道数据，因为在 main.js 中所以不需要写 this.$store.dispatch()
store.dispatch("news/fetchData");
store.dispatch("user/accessConfig");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
