const MODE = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const BASE_PATH = __dirname;
const BASE_DIR = '';
const SRC_DIR = `${BASE_PATH}/src`;
const DIST_DIR = `${BASE_PATH}${BASE_DIR}/dist`;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  mode: MODE,

  context: `${SRC_DIR}/js`,

  entry: {
    'test1': ['babel-polyfill', './test1.js'],
    'test2': ['babel-polyfill', './test2.js'],
    'test3': ['babel-polyfill', './test3.js'],
  },

  output: {
    path: `${DIST_DIR}/assets/js`,
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        use: [
          {
            loader: 'raw-loader',
          },
          {
            loader: 'glslify-loader',
          }
        ],
        exclude: /node_modules/,
      }
    ]
  },

  optimization: {
    minimizer:
      MODE === 'production'
        ? [
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {drop_console: true},
              output: {comments: /^\**!|@preserve|@license|@cc_on/},
            }
          }),
        ]
        : [],
  },

  devtool: MODE == 'development' ? 'cheap-module-eval-source-map' : false,
};
