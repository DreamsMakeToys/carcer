const Path = require('path')
const createNodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  entry: './src/index.js',
  output: {
    path: Path.resolve(__dirname, 'dist'),
    filename: 'module.js',
    library: 'base-core',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['stage-2']
          }
        }
      }
    ]
  },
  externals: [createNodeExternals(), 'grpc', 'protobufjs']
}
