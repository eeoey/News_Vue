<template>
  <div id="app">
    <div class="container">
      <!-- NOTES vue-router 提供的组件，会根据不同的访问路径，渲染不同的组件 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import Home from "./views/Home";

export default {
  components: {
    // 使用路由时不用引入和注册组件
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
