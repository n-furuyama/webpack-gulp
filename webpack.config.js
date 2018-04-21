const MODE = process.env.NODE_ENV === 'production' ? '' : 'development';

const BASE_PATH = __dirname;
const BASE_DIR = '';
const SRC_DIR = `${BASE_PATH}/src`;
const DIST_DIR = `${BASE_PATH}${BASE_DIR}/dist`;


module.exports = {
  mode: MODE,

  context: `${SRC_DIR}/js`,

  entry: {
    'test1': './test1.js',
    'test2': './test2.js',
    'test3': './test3.js',
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
      }
    ]
  }
};
