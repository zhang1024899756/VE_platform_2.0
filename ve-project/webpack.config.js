var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/js/root.js",
  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: "/src/"
  },
  devServer: {
     historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        include: __dirname,
        query: {
          presets: [ "es2015", "react" ]
        }
      },
      {
        test: /\.css$/,
        loader: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.less$/,
        use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: [ 'file-loader' ]
      }
    ]
  }
}
