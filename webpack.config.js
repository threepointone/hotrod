const path = require('path');
module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, './example/index.js'),
  output: {
    path: path.join(__dirname, './example'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        include: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'example'),
  },
};
