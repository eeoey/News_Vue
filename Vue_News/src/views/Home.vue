<template>
  <div class="home">
    <Header style="margin-bottom:20px;"></Header>
    <Banner :banners="banners" :duration="3000"></Banner>
    <NewsChannels @channelSelected="handleChannelChange"></NewsChannels>
    <Loading v-show="isLoading"></Loading>
    <NewsList :news="news" v-show="!isLoading"></NewsList>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

// 组件引入
import Banner from "../components/Banner";
import NewsChannels from "../components/NewsChannels";
import NewsList from "../components/NewsList";
import Loading from "../components/Loading";
import Header from "../components/Header";

import { getNewsList } from "../services/getNewsData";

// TIPS 导入静态资源，分为 import 模式和 require 模式
// ERROR 如果 banners 数组的 url 固定打包时会变化则无法正确获取，如 {url:'src/imgs/banner1.png'}
import banner1 from "../assets/imgs/banner1.jpg";
import banner3 from "../assets/imgs/banner3.jpg";

export default {
  name: "Home",
  components: {
    Banner,
    NewsChannels,
    NewsList,
    Loading,
    Header
  },
  data() {
    return {
      banners: [
        { url: banner1, link: "https://www.baidu.com/" },
        {
          url: require("../assets/imgs/banner2.png"),
          link: "https://www.baidu.com/"
        },
        { url: banner3, link: "https://www.baidu.com/" }
      ],
      news: [],
      isLoading: true
    };
  },
  methods: {
    async handleChannelChange(e) {
      this.isLoading = true;
      let resp = await getNewsList(e); // 会有等待时间
      this.news = resp.data.data.rows;
      this.isLoading = false;
    }
  }
};
</script>
