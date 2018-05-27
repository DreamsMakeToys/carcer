const Path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const createFlexbugFixes = require('postcss-flexbugs-fixes')
const createAutoprefixer = require('autoprefixer')

const ASSETS_PATH = Path.resolve(__dirname, '../base-core/assets')

const ShellConfig = {
  entry: './src/index.js',
  output: {
    path: ASSETS_PATH,
    filename: 'client-shell.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['transform-react-jsx']
          }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/index.html',
        to: ASSETS_PATH,
        toType: 'dir'
      }
    ])
  ]
}

const BodyConfig = {
  entry: './src/default-body/index.js',
  output: {
    path: ASSETS_PATH,
    filename: 'client-body.js',
    library: 'ClientBody',
    libraryTarget: 'window'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['transform-react-jsx']
          }
        }
      },
      {
        test: /global\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.css$/,
        exclude: /global\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                createFlexbugFixes(),
                createAutoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 11'
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          }
        ]
      }
    ]
  }
}

module.exports = [ShellConfig, BodyConfig]
