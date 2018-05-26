const Path = require('path')

module.exports = {
  target: 'node',
  entry: './src/index.js',
  output: {
    path: Path.resolve(__dirname, '../../dist'),
    filename: 'carcer.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
