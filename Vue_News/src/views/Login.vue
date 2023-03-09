<template>
  <CenterContent>
    <form class="login-container" @submit.prevent="handleSubmit">
      <div class="form-item">
        <div class="input">
          <label>账号：</label>
          <input type="text" v-model="userInfo.username" @input="validateEmpty('username','账号不能为空')" />
        </div>
        <div
          class="error"
          :style="{visibility: error.username ?'visible':'hidden'}">
          {{error.username}}
        </div>
      </div>
      <div class="form-item">
        <div class="input">
          <label>密码：</label>
          <input
            type="password"
            autocomplete="new-password"
            v-model="userInfo.password"
            @input="validateEmpty('password','密码不能为空')"
          />
        </div>
        <div
          class="error"
          :style="{visibility: error.password ?'visible':'hidden'}"
        >{{error.password}}</div>
      </div>
      <div class="form-item">
        <div class="input">
          <label></label>
          <button>登录</button>
        </div>
        <div
          class="error txt-center"
          :style="{visibility: error.server ?'visible':'hidden'}"
        >{{error.server}}</div>
      </div>
    </form>
  </CenterContent>
</template>

<script>
import CenterContent from "../components/CenterContent";
import { logup } from "../services/userInfo";

export default {
  components: {
    CenterContent
  },
  data() {
    return {
      userInfo: {
        username: "",
        password: ""
      },
      error: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // 表单非空验证
    validateEmpty(filed, msg) {
      if (this.userInfo[filed]) {
        this.error[filed] = "";
        return true;
      } else {
        this.error[filed] = msg;
        return false;
      }
    },
    // 表单提交
    async handleSubmit() {
      let validateId = this.validateEmpty("username", "账号不能为空");
      let validatePassword = this.validateEmpty("password", "密码不能为空");
      if (validateId && validatePassword) {
        // TODO 提交数据
        let result = await this.$store.dispatch("user/login", this.userInfo);
        if(result.code == 0){
          window.location.href = "/";
        }else{
          alert(result.msg);
        }
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 400px;
}
.form-item .error.txt-center {
  text-align: center;
}
.form-item .input {
  display: flex;
}
.form-item label {
  width: 100px;
  display: inline-block;
  text-align: right;
  line-height: 41px;
}
.form-item .error {
  font-size: 14px;
  color: #e73010;
  padding-left: 100px;
  height: 30px;
  line-height: 30px;
}
.form-item input,
.form-item button {
  flex-grow: 1;
}
</style>