const Path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PLUGIN_PATH = Path.resolve(__dirname, '../werk/plugins/foo')

module.exports = {
  entry: './core/index.js',
  output: {
    path: PLUGIN_PATH,
    filename: 'core.js'
  },
  target: 'node',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './plugin.json',
        to: PLUGIN_PATH
      },
      {
        from: './service/protobuf.json',
        to: PLUGIN_PATH
      },
      {
        from: './service/index.js',
        to: PLUGIN_PATH
      }
    ])
  ]
}
