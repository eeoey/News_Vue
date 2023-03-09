<template>
  <CenterContent>
    <form class="login-container" @submit.prevent="handleSubmit">
      <div class="form-item">
        <div class="input">
          <label>手机号：</label>
          <input type="text" v-model="userInfo.phoneNumber" @input="validateEmpty('phoneNumber','手机号不能为空')" />
        </div>
        <div
          class="error"
          :style="{visibility: error.phoneNumber ?'visible':'hidden'}"
        >{{error.phoneNumber}}</div>
      </div>
      <div class="form-item">
        <div class="input">
          <label>密码：</label>
          <input
            type="password"
            autocomplete="new-password"
            v-model="userInfo.loginPwd"
            @input="validateEmpty('loginPwd','密码不能为空');validatePwd()"
          />
        </div>
        <div
          class="error"
          :style="{visibility: error.loginPwd ?'visible':'hidden'}"
        >{{error.loginPwd}}</div>
      </div>
      <div class="form-item">
        <div class="input">
          <label>确认密码：</label>
          <input
            type="password"
            autocomplete="new-password"
            v-model="userInfo.password"
            @input="validatePwd()"
          />
        </div>
        <div
          class="error"
          :style="{visibility: error.password ?'visible':'hidden'}"
        >{{error.password}}</div>
      </div>
      <div class="form-item">
        <div class="input">
          <label>昵称：</label>
          <input
            type="text"
            v-model="userInfo.nickname"
            @input="validateEmpty('nickname','昵称不能为空')"
          />
        </div>
        <div
          class="error"
          :style="{visibility: error.nickname ?'visible':'hidden'}"
        >{{error.nickname}}</div>
      </div>
      <div class="form-item">
        <div class="input">
          <label></label>
          <button>注册</button>
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
        phoneNumber: "",
        loginPwd: "",
        password: "",
        nickname: ""
      },
      error: {
        phoneNumber: "",
        loginPwd: "",
        password: "",
        nickname: "",
        server: ""
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
    // 密码校验
    validatePwd() {
      let result = this.validateEmpty("password", "密码不能为空");
      if (result) {
        if (this.userInfo.loginPwd !== this.userInfo.password) {
          this.error.password = "两次密码不一致";
          return false;
        }
        return true;
      }
      return false;
    },
    // 表单提交
    async handleSubmit() {
      let validateId = this.validateEmpty("phoneNumber", "手机号不能为空");
      let validatePassword = this.validateEmpty("loginPwd", "密码不能为空");
      let validateCheck = this.validatePwd();
      let validateShort = this.validateEmpty("nickname", "请输入昵称");
      if (validateId && validatePassword && validateCheck && validateShort) {
        const resp = await logup(this.userInfo);
        // 注册成功
        if (resp.data) {
          console.log("注册成功");
          alert(" 注册成功");
          console.log("已经执行到这里");
          this.$router.push({ name: "login" });
          console.log("已经执行到这里222");
        } else {
          this.error.server = resp.msg;
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