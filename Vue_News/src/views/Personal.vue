<template>
  <el-container style="height: 100%;">
    <el-header>
      <Header style="margin-bottom: 20px"></Header>
    </el-header>
    <el-container style="height: 100%;">
      <el-aside width="200px" style="height: 100%">
        <el-menu :default-active="itemId" @select="changeMenu">
          <el-menu-item index="info">个人信息</el-menu-item>
<!--          <el-menu-item>我的收藏</el-menu-item>-->
          <el-menu-item index="recommend">我的推荐</el-menu-item>
          <el-menu-item index="publish">我要发新闻</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-form v-if="itemId=='info'" v-model="loginUser" label-position="left" label-width="80px">
          <el-form-item label="昵称">
            <el-input v-model="loginUser.nickname"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="loginUser.gender">
              <el-option :value="0" label="未设置"></el-option>
              <el-option :value="1" label="男"></el-option>
              <el-option :value="2" label="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="loginUser.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginUser.password" type="password"></el-input>
          </el-form-item>
          <el-button type="primary" @click="updateInfo">更新</el-button>
        </el-form>
        <el-row v-if="itemId == 'recommend'" v-loading="isLoading">
          <NewsList :news="recommend" v-show="!isLoading"></NewsList>
        </el-row>
        <el-form v-if="itemId == 'publish'" :model="content" label-width="80px" label-position="left">
          <el-form-item label="标题">
            <el-input v-model="content.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="来源">
            <el-input v-model="content.source" placeholder="请输入新闻引用来源"></el-input>
          </el-form-item>
          <el-form-item label="引用地址">
            <el-input v-model="content.sourceUrl" placeholder="请输入转载原文链接"></el-input>
          </el-form-item>
          <el-form-item label="新闻简介">
            <el-input v-model="content.des" placeholder="请输入新闻简介" :autosize="{minRows:3}" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="新闻全文">
            <el-input v-model="content.content" placeholder="请输入新闻全文" :autosize="{minRows:10}" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="prepublish">提交</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "../components/Header";
import NewsList from "../components/NewsList";
import { mapState } from "vuex";
import { prePublish, recommend } from "../services/getNewsData";
import {update} from "../services/userInfo";

export default {
  components:{
    Header,
    NewsList
  },
  computed:{
    ...mapState("user", { loginUser: "userData"})
  },
  data(){
    return {
      itemId: 'info',
      model: null,
      recommend: [],
      isLoading: false,
      content:{}
    };
  },
  methods:{
    changeMenu(index){
      this.itemId = index;
      if(index === 'recommend'){
        this.refreshRecommend();
      }
    },
    async updateInfo(){
      await update(this.loginUser);
      this.$message({
        message:'更新成功',
        type:'success'
      });

    },
    async refreshRecommend(){
      this.isLoading = true;
      let body =await recommend(this.loginUser.id);
      this.isLoading = false;
      console.info(body);
      this.recommend = body.data;
    },
    async prepublish(){
      this.isLoading = true;
      let body = await prePublish(this.content);
      if(body.code != 0){
        this.$message({
          message: body.msg,
          type:'error'
        });
      }
    }
  }
};
</script>

<style scoped>

</style>