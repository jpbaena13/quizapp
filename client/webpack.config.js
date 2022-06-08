const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: path.resolve(__dirname, '../server/public'),
    filename: 'app.js'
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
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
    alias: {
      modernizr$: path.resolve(__dirname, '.modernizrrc.js')
    },
    extensions: ['.js', '.jsx']
  },
  target: 'web',
  mode: 'production'
}
