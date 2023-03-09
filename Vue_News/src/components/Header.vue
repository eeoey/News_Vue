<template>
  <div class="header">
    <div class="header-container">
      <div class="container">
        <div class="logo">
          <!-- NOTE 声明式导航，推荐使用具名路由，因为路径名称有时需要改变，全局改变时不方便 -->
          <router-link :to="{name:'Home'}">
            <img src="../assets/logo.png" />
          </router-link>
        </div>
        <ul class="nav">
          <li>
            <router-link :to="{name:'Home'}">首页</router-link>
          </li>
          <li v-for="item in channels.slice(0,5)" :key="item.id">
            <router-link :to="{name:'Channel',params:{id:item.id}}">{{item.name}}</router-link>
          </li>
        </ul>
        <div class="user">
          <!-- 情景 1：远程加载中 -->
          <span v-if="isLogining">loading...</span>
          <!-- 情景 2：当前有登录用户 -->
          <template v-else-if="loginUser">
            <router-link :to="{name:'personal'}">{{loginUser.nickname}}</router-link>
            <a href="javascript:void(0)" @click="logout">退出登录</a>
          </template>
          <template v-else>
            <router-link :to="{name:'Login'}">登录</router-link>
            <router-link :to="{name:'Logup'}">注册</router-link>
          </template>
          <a href="http://localhost:8083/">访问管理后台</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("news", ["channels", "isLoading"]),
    ...mapState("user", { loginUser: "userData", isLogining: "isLoading" })
  },
  data(){
    return {
      search:''
    }
  },
  created(){
  },
  methods:{
    logout(){
      this.$store.dispatch("user/logout");
    }
  }
};
</script>

<style scoped>
.header {
  height: 60px;
}
.header-container {
  height: 60px;
  background: #000;
  color: #fff;
  line-height: 60px;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
}
.container {
  display: flex;
}
.logo a {
  display: flex;
  align-items: center;
  height: 100%;
}
.logo img {
  width: 42px;
  height: 42px;
}
.nav {
  margin: 0 60px;
  display: flex;
  flex-grow: 1;
}
.nav a {
  display: block;
  padding: 0 10px;
}
.nav .router-link-exact-active {
  color: #fcb85f;
}
.user {
  font-size: 14px;
}
.user * {
  margin-left: 10px;
}
.header a {
  color: #fff;
}
</style>
