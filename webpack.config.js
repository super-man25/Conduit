const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  let apiUrl = '';
  let modelUrl = '';
  let environment = '';

  if (env.dev) {
    apiUrl = 'http://localhost:9000';
    environment = 'dev';
  } else if (env.test) {
    apiUrl = 'http://localhost:3000/fake';
    environment = 'test';
  } else if (env.qa) {
    apiUrl = 'https://qa-api.eventdynamic.com';
    modelUrl = 'https://qa-model.eventdynamic.com';
    environment = 'qa';
  } else if (env.prod) {
    apiUrl = 'https://api.eventdynamic.com';
    modelUrl = 'https://app-model.eventdynamic.com';
    environment = 'prod';
  } else if (env.demo) {
    apiUrl = 'https://demo-api.eventdynamic.co';
    modelUrl = 'https://demo-model.eventdynamic.com';
    environment = 'demo';
  }

  return {
    entry: './src/index.js',
    devServer: {
      contentBase: '/build',
      historyApiFallback: {
        index: '/public/index.html',
      },
      quiet: true,
      port: 3000,
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        { test: /\.(ttf|svg|jpg|png)$/i, use: 'file-loader' },
        { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: './public/favicon.ico',
        filename: './index.html',
        template: './public/index.html',
      }),
      new webpack.EnvironmentPlugin({
        'REACT_APP_ED_API_URL': apiUrl,
        'REACT_APP_ED_MODEL_URL': modelUrl,
        'REACT_APP_ENVIRONMENT': environment,
      }),
    ],
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.[hash].js',
    },
    resolve: {
      alias: {
        _components: path.resolve(__dirname, 'src/_components/'),
        _constants: path.resolve(__dirname, 'src/_constants/'),
        _fonts: path.resolve(__dirname, 'src/_fonts/'),
        _helpers: path.resolve(__dirname, 'src/_helpers/'),
        _hoc: path.resolve(__dirname, 'src/_hoc/'),
        _hooks: path.resolve(__dirname, 'src/_hooks/'),
        _images: path.resolve(__dirname, 'src/_images/'),
        _models: path.resolve(__dirname, 'src/_models/'),
        _scenes: path.resolve(__dirname, 'src/_scenes/'),
        _services: path.resolve(__dirname, 'src/_services/'),
        _state: path.resolve(__dirname, 'src/_state/'),
      },
    },
  };
};
