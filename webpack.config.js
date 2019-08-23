const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: ['react-hot-loader/patch', './src/index.jsx'],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      { test: /\.(png|jpg|gif)$/, use: ['url-loader?limit=8192'] },
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'axios': 'axios'
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3002,
    publicPath: "http://localhost:3002/dist/",
    hotOnly: true
  },
};