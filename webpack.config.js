const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const config = {
  devServer: {
    contentBase: path.join(__dirname, "./"),
    overlay: true,
    port: 8080,
    publicPath: "/bundle/",
    historyApiFallback: true
  },
  plugins: [
    new ProgressBarPlugin()
  ],
  devtool: 'eval-source-map',
  entry: './src/index.js',
  cache: true,
  output: {
    path: path.resolve(__dirname, 'bundle'),
    publicPath : '/bundle/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
         'file-loader'
         ]
       }
    ]
  },
}

module.exports = env => {
  if(env.NODE_ENV === 'prod'){
    config.plugins.push(
      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        cache: true
      })
    )
  }
  return config;
}
