// webpack 提供的支持
module.exports = {
  // vue 的配置
  devServer: {
    // 针对开发服务器的配置，开发阶段存在
    proxy: {
      "/api": {
        // 当请求路径以 /api 开头时，开发服务器需要代理到 http://study.yuanjin.tech
        // TIPS 改变此配置后需要重启服务器
        target: "http://study.yuanjin.tech"
      }
    }
  }
};
