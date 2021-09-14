module.exports = {
  lintOnSave: false,
  // 子域名打包
  publicPath: "/creditsys/",
  outputDir: "dist/creditsys",
  // 去除.map映射文件减少体积
  productionSourceMap: false,
  // 配置webpack，移除三方包
  configureWebpack: config => {
    Object.assign(config, {
      externals: {
        vue: "Vue",
        element: "element-ui"
      }
    })
  }
};