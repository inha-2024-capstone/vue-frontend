const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000, // 포트를 3000으로 설정
    allowedHosts: "all",
    hot: false,
  },
});
