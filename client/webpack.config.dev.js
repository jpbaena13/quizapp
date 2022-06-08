const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  output: { filename: 'app.js' },
  devServer: {
    port: 9000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  plugins: [new ESLintPlugin({
    extensions: ['js', 'jsx'],
    fix: false,
    emitError: true,
    emitWarning: true,
    failOnError: true
  })],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|otf|woff|svg)$/,
        type: 'asset/inline'
      },
      {  
        test: /\.(mp3|mp4|avi)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/media/[hash][ext][query]'
        }
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  target: 'web',
  mode: 'development'
}
