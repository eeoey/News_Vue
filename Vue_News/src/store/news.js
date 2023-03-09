import { getNewsChannels } from "../services/getNewsData";

// vuex 新闻信息模块库
export default {
  namespaced: true, // 开启命名空间
  // 共享数据或共享状态
  state: {
    channels: [],
    isLoading: false,
  },
  // 不能直接通过 state 改变数据，要通过 mutations 改变，mutations 中的触发由外部的 commit 启动
  mutations: {
    // 此处配置变异方式即函数，函数形参由 state(原始值) 和 payload(负荷/新值) 组成
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setData(state, payload) {
      state.channels = payload;
    },
  },
  // 异步操作
  actions: {
    // 此处配置异步变异方式，还是要通过 mutations 改变数据
    // 形参由 context(类似 $store) 和 payload(负荷/新值) 组成
    // TIPS context 和 $store 的唯一区别就是命名空间，因为 context 只存在于单个的 vuex 模块
    async fetchData(context) {
      context.commit("setIsLoading", true);
      let channels = await getNewsChannels();
      context.commit("setData", channels);
      context.commit("setIsLoading", false);
    },
  },
};
