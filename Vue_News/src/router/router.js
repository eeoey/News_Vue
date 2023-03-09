import Vue from "vue";
import VueRouter from "vue-router";

// 导入页面，使用路由懒加载时不用引入页面组件
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/Search"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/logup",
    name: "Logup",
    component: () => import("@/views/Logup"),
  },
  {
    path: "/channel/:id",
    name: "Channel",
    component: () => import("@/views/ChannelNews")
  },
  {
    path: "/content/:id",
    name: "Content",
    component: () => import("@/views/Content"),
  },
  {
    path: "/personal",
    name: "personal",
    component: () => import("@/views/Personal"),
    // NOTE 路由元信息，用来保护页面或提供额外页面信息
    meta: {
      auth: true,
    },
  },

  {
    path: "*",
    component: () => import("@/views/NotFound"),
  },
];

const router = new VueRouter({
  routes,
  mode: "hash",
});

// TIPS 路由导航守卫，函数中 to 表示即将要进入的目标路由对象，from 表示当前导航正要离开的路由对象
// next 表示放行函数。路由导航守卫的意义是为了保护特殊页面（通常是具有路由元信息的页面）
// router.beforeEach(function(to, from, next) {});
export default router;
