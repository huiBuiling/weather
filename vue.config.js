// const webpack = require("webpack");
//npm install uglifyjs-webpack-plugin --save-dev
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const config = {
  // chainWebpack 通过链式编程的形式，来修改默认的 webpack 配置(更细粒度的配置)
  chainWebpack: (config) => {
    // 发布时删除console
    config.optimization.minimizer("terser").tap((args) => {
      const compress = args[0].terserOptions.compress;
      // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
      compress.drop_console = true;
      compress.pure_funcs = [
        "__f__", // App 平台 vue 移除日志代码
        "console.debug", // 可移除指定的 console 方法
      ];
      return args;
    }),
      // 配置环境变量
      config.plugin("define").tap((args) => {
        if (process.env.NODE_ENV === "development") {
          // 测试环境
          // args[0]["process.env"].UNI_BASE_API = "'https://x.com/'";
          args[0]["process.env"].UNI_BASE_ENV = "'test'";
          console.log("测试环境");
        } else {
          // 生产环境
          // args[0]["process.env"].UNI_BASE_API = "'https://x.com/'";
          args[0]["process.env"].UNI_BASE_ENV = "'prod'";
          console.log("生产环境");
        }
        return args;
      });
  },
  // configureWebpack 通过操作对象的形式，来修改默认的 webpack 配置
  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === "production") {
  //     // 打包build的时候去掉console的调试信息
  //     config.optimization.minimizer = [
  //       new UglifyJsPlugin({
  //         uglifyOptions: {
  //           compress: {
  //             drop_console: true, //console
  //             drop_debugger: true,
  //             pure_funcs: ["console.log"], //移除console
  //           },
  //         },
  //       }),
  //     ];
  //     //打包文件大小配置
  //     config["performance"] = {
  //       maxEntrypointSize: 10000000,
  //       maxAssetSize: 30000000,
  //     };
  //   }
  // },
};
module.exports = config;
