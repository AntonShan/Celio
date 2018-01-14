const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/Celio/Celio.ts',
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
  // plugins: [
  //   new UglifyJSPlugin()
  // ],
  target: 'node',
  resolve: {
    extensions: [ '.ts' ]
  },
  output: {
    filename: 'bundle.js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist')
  }
}
