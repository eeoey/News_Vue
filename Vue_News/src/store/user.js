import { login, logout, accessConfig } from "../services/userInfo";

// vuex 用户信息模块库
export default {
  namespaced: true,
  state: {
    userData: null, // 登录用户对象
    isLoading: false, // 加载状态
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setUserData(state, payload) {
      state.userData = payload;
      console.log(state.userData)
    },
  },
  actions: {
    // TIPS payload 只能有一个
    async login(context, payload) {
      context.commit("setIsLoading", true);
      let resp = await login(payload);
      if (resp.code === 0) {
        // 登录成功
        context.commit("setUserData", resp.user);
      }
      context.commit("setIsLoading", false);
      return resp;
    },
    async accessConfig(context) {
      context.commit("setIsLoading", true);
      let resp = await accessConfig();
      context.commit("setUserData", resp);
      context.commit("setIsLoading", false);
    },
    logout(context) {
      logout();
      context.commit("setUserData", null);
    },
  },
};
