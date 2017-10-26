const path = require('path')

module.exports = {
  entry: './index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ne$/,
        loader: 'nearley-webpack-loader',
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
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000
  }
}
