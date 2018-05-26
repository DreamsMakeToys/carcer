const Path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: Path.resolve(__dirname, 'dist'),
    filename: 'module.js',
    library: 'client-core',
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
  }
}
