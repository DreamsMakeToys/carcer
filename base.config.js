const Path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './packages/base-shell/src/index.js',
  output: {
    path: Path.resolve(__dirname, 'dist'),
    filename: 'carcer.js'
  },
  target: 'node',
  mode: 'development',
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
  },
  externals: [nodeExternals()]
}
