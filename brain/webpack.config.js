const Path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'carcer.js',
    path: Path.resolve(__dirname, 'dist')
  },
  target: 'node',
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
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/core/protos/carcer.proto',
        to: Path.resolve(__dirname, 'dist/carcer.proto')
      }
    ])
  ],
  externals: [nodeExternals()]
}
