<template>
  <div class="channel-news">
    <Header></Header>
    <div class="type-title">{{ channelName }}</div>
    <Loading v-if="isLoading"></Loading>
    <NewsList :news="news" v-else></NewsList>
    <Pagination
      :page="page"
      :limit="limit"
      :total="total"
      :panelNumber="panelNumber"
      @pageChange="handleChange"
    ></Pagination>
  </div>
</template>

<script>
import { getNewsChannels, getNewsList } from "../services/getNewsData";

import Header from "../components/Header";
import Loading from "../components/Loading";
import NewsList from "../components/NewsList";
import Pagination from "../components/Pagination";

export default {
  components: {
    NewsList,
    Pagination,
    Loading,
    Header
  },
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      panelNumber: 10,
      news: [],
      isLoading: true
    };
  },
  watch: {
    // 推荐使用对象形式书写侦听器
    "$route.params.id": {
      immediate: true, // 初始化时的数据变化也进行监听
      handler() {
        this.page = 1;
        this.setNews();
      }
    }
  },
  computed: {
    channelName() {
      if (this.$store.state.news.channels.length > 0) {
        var channels = this.$store.state.news.channels;
        
        for(let i = 0;i< channels.length;i++){
          let item = channels[i];
          if(item.id == this.$route.params.id){
            return item.name;
          }
        }
      }
      return "";
    }
  },
  methods: {
    handleChange(newPage) {
      this.page = newPage;
      this.setNews();
    },
    // 加载新闻
    async setNews() {
      this.isLoading = true;
      let resp = await getNewsList(
        this.$route.params.id,
        this.page,
        this.limit
      );
      let newsList = resp.data.data;
      this.total = newsList.total;
      this.news = newsList.rows;
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
.type-title {
  font-size: 2em;
  color: #888;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-top: 20px;
}
</style>