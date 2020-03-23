const path = require('path')

module.exports = {
  entry: {
    'functional-app': './src/functional-app.js',
    'oo-app': './src/oo-app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
}
