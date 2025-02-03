const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  cache: {
    type: 'filesystem'
  },
  optimization: {
    minimize: false,
    splitChunks: false,
  },
  entry: {
    background: './src/background/index.ts',
    popup: './src/popup/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  plugins: [
    new CopyPlugin({
      patterns: [{
        from: path.resolve('manifest.json'),
        to: path.resolve('dist')
      }, {
        from: path.resolve('src/popup/index.html'),
        to: path.resolve('dist/popup.html')
      }]
    })
  ],
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-react', {'runtime': 'automatic'}],
              '@babel/preset-typescript'
            ],
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};