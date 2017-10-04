const path = require('path')

const loadersPath = path.resolve(__dirname, 'loaders')

module.exports = {
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ne$/,
        loader: 'nearley-loader',
        options: {
          baseDir: './src/grammar/'
        }
      }
    ]
  },
  target: 'node',
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'loaders')
    ]
  }
}
