// env注释
// webpack --env prod       'prod'
// webpack --env.prod       {prod:true}
// webpack --env.prod=1     {prod:1}
// 详见 
// url https://segmentfault.com/a/1190000012536917
// img https://sfault-image.b0.upaiyun.com/124/278/12427888-5a3c60d480a93_articlex
const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require("webpack")
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var source = [
  'quill.js',
  'core.js',
  'blots',
  'core',
  'formats',
  'modules',
  'test',
  'themes',
  'ui'
].map(function (file) {
  return path.resolve(__dirname, '..', file);
});
module.exports = function (env, arg) {
  return {
    devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
      'index.js': ['./index.js'],
      // 'quill.core.js': ['./core.js'],
      // 'quill.core': './assets/core.styl',
      // 'quill.bubble': './assets/bubble.styl',
      // 'quill.snow.js': './assets/snow.styl',
      // 'unit.js': './test/unit.js'
    },
    output: {
      path: path.resolve(__dirname, '../dist/'),
      filename: '[name]',
    },
    resolve: {
      alias: {
        'parchment': path.resolve(__dirname, '../node_modules/parchment/src/parchment')
      },
      extensions: ['.js', '.styl', '.ts']
    },
    module: {
      rules: [{
        test: /\.js$/,
        // use: ['eslint-loader'],
        include: source,
        enforce: 'pre'
      }, {
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              declaration: false,
              target: 'es5',
              module: 'commonjs'
            },
            transpileOnly: true
          }
        }]
      }, {
        test: /\.styl$/,
        include: [
          path.resolve(__dirname, '../assets')
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'stylus-loader'
          ]
        })
      }, {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, '../assets/icons')
        ],
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }, {
        test: /\.js$/,
        include: source,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      }],
      noParse: [
        /\/node_modules\/clone\/clone\.js$/,
        /\/node_modules\/eventemitter3\/index\.js$/,
        /\/node_modules\/extend\/index\.js$/
      ]
    },
    plugins: [
      // new HtmlWebpackPlugin({
      //   template: '../example/index.html'
      // }),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      // 检测host是否一致，导致外网无法访问，可使用以下两个方法解决：
      // disableHostCheck: true,
      // host: '127.0.0.1',
      //progress只在命令行用，不在配置文件中配
      contentBase: path.resolve(__dirname, "../dist/"), //网站的根目录为 根目录/dist，如果没有指定，使用process.cwd()函数取当前工作目录，工作目录>npm run dev
      port: 9000, //端口改为9000
      open: true, // 自动打开浏览器
      index: 'index.html', // 与HtmlWebpackPlugin中配置filename一样
      inline: true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
      hot: true,
      // publicPath: '/static456/', // 它与output.publicPath的值应该是一样的，值为上面contentBase目录的子目录，是放js, css, 图片等资源的文件夹，记得打包时，将图片等拷贝或打包到该文件下
      // compress: true //压缩
    }
  }
}