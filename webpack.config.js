const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = {
  entry: './src/Celio/Celio.ts',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ne$/,
        loader: 'nearley-webpack-loader',
        options: {
          baseDir: './src/grammar/',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
  resolve: {
    extensions: ['.ts'],
  },
};

const clientConfig = merge(baseConfig, {
  target: 'web',
  output: {
    filename: 'celio.js',
    libraryTarget: 'window',
    library: 'Celio',
    path: path.resolve(__dirname, 'dist'),
  },
});

const serverConfig = merge(baseConfig, {
  target: 'node',
  output: {
    filename: 'celio.esm.js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist'),
  },
});

module.exports = [
  serverConfig,
  clientConfig,
];
