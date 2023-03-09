<template>
  <div class="home">
    <Header style="margin-bottom: 20px"></Header>
    <div class="article">
      <div class="title">{{ content.title }}</div>
      <div class="aside">
        <span>{{ content.channelName }}</span>
        <span>
          <a :href="content.sourceUrl">
          来源：{{ content.source }}
          </a>
        </span>
        <span>发布日期：{{ content.createTime }}</span>
      </div>
      <div class="content" v-html="content.content"></div>
      <div class="icons">
        <span @click="favorite">
          <img :src="imgs.star" v-if="!isFavorite">
          <img :src="imgs.star_fill" v-if="isFavorite">
        </span>
        <span @click="like">
          <img :src="imgs.favorite" v-if="!isLike">
          <img :src="imgs.favorite_fill" v-if="isLike">
        </span>
      </div>
      <el-divider></el-divider>
      <el-header>全部评论：</el-header>
      <el-row v-for="(it,i) in comments" :key="i" :index="i">
        <el-row>
          <el-col :span="1">
            <el-avatar shape="square" :src="it.avatarUrl"></el-avatar>
          </el-col>
          <el-col :span="1">
            <el-input disabled="disabled" v-model="it.nickname"/>:
          </el-col>
          <el-col :span="20">{{it.content}}</el-col>
        </el-row>
        <el-divider></el-divider>
      </el-row>
      <el-row v-if="comments.length == 0">
        <el-col style="height: 2.0em;line-height: 3.0em;font-size: 3.0em;" :offset="7" :span="6">
          <i class="el-icon-box"></i> 暂无评论
        </el-col>
      </el-row>
      <el-header>发表评论：</el-header>
      <el-row v-if="userData">
        <el-col :span="22" :offset="1">
          <el-input type="textarea" v-model="submit.comment"></el-input>
        </el-col>
        <el-col :offset="21" :span="1" style="margin-top: 1em">
          <el-button type="primary" @click="submitComment">发布</el-button>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="3" :offset="6">
          <el-button type="primary" @click="navigateTo('login')">登录</el-button>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button type="primary" @click="navigateTo('register')">注册</el-button>
        </el-col>
      </el-row>

      <div style="height: 200px"></div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header";
import {mapState} from "vuex";
import star from "../assets/imgs/star.png";
import star_fill from "../assets/imgs/star_fill.png";
import favorite_img from "../assets/imgs/favorites.png";
import favorite_fill from "../assets/imgs/favorites_fill.png";

import { detail } from "../services/getNewsData";
import { favoriteArt, likeArt ,comment} from "../services/userInfo";

export default {
  components: {
    Header
  },
  computed:{
    ...mapState("user", ["userData"])
  },
  created() {
    this.id = this.$route.params.id;
    this.init();
  },
  data() {
    return {
      id: 0,
      content: {},
      comments: [],
      pageSize: 10,
      imgs: {
        star: star,
        star_fill: star_fill,
        favorite: favorite_img,
        favorite_fill: favorite_fill
      },
      submit:{
        comment: ''
      },
      isLike: false,
      isFavorite: false
    };
  },
  methods: {
    async init() {
      let content = await detail(this.id, this.pageSize);
      this.content = content.data;
      this.comments = content.comment.rows;
      this.isFavorite = content.favorite;
      this.isLike = content.like;
    },
    async favorite() {
      await favoriteArt(this.id);
      await this.init();
    },
    async like() {
      await likeArt(this.id);
      await this.init();
    },
    navigateTo(type){
      if(type == "login"){
        window.location.href = "/login";
        return;
      }
      if(type == "register"){
        window.location.href = "/logup";
        return;
      }
    },
    async submitComment(){
      let resp = await comment(this.submit.comment, this.id);
      if(resp.code == 0){
        await this.init();
      }else{
        this.$message.error(resp.msg);
      }
    }
  }
};
</script>

<style scoped>
.article {
  margin: 20 rpx;
}

.title {
  font-size: 4.2em;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
}

.aside {
  font-size: 14px;
  color: #888;
}

.aside span {
  margin-right: 15px;
}

.content {
  min-height: 100px;
  line-height: 2;
}

.icons {
  line-height: .5em;
}

.icons span {
  float: right;
}

.icons span img {
  height: 1.4em;
}
</style>