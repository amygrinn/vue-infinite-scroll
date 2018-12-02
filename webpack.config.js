const merge = require('webpack-merge');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const nodeExternals = require('webpack-node-externals');

const common = {
  output: {
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        include: __dirname,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  },
  resolve: {
    extensions: [ '.ts', '.ts', '.js', '.vue' ]
  },
  optimization: {
    minimize: true
  },
  mode: 'production',
  plugins: [
    new VueLoaderPlugin()
  ]
}

module.exports = [
  merge(common, {
    entry: './plugin.ts',
    output: {
      filename: 'vue-infinite-scroll.min.js',
      libraryTarget: 'window',
      library: 'InfiniteScroll'
    }
  }),
  merge(common, {
    entry: './infinite-scroll.vue',
    output: {
      filename: 'vue-infinite-scroll.js',
      libraryTarget: 'umd',
      library: 'vue-infinite-scroll',
      umdNamedDefine: true
    },
    externals: [nodeExternals()]
  })
]
