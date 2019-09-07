const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Workbox, info = https://webpack.js.org/guides/progressive-web-application
const WorkboxPlugin = require('workbox-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = (env, argv) => {
  // Common
  let config = {
    entry: './src/index.js',
    output: {
      filename: `[name]${
        argv.mode === 'production' ? '.[contenthash]' : ''
      }.js`,
      path: path.resolve(__dirname, 'build')
    },
    devtool: argv.mode === 'production' ? '' : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: ['babel-loader']
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: argv.mode === 'production' ? { minimize: true } : ''
            }
          ]
        },
        {
          test: /.css$/,
          use:
            argv.mode === 'production'
              ? [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
              : ['style-loader', 'css-loader']
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: [{ loader: 'file-loader', options: { outputPath: 'fonts/' } }]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: { outputPath: 'images/' }
            }
          ]
        }
      ]
    },
    optimization:
      argv.mode === 'production'
        ? {
            minimizer: [
              new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
              }),
              new OptimizeCSSAssetsPlugin({})
            ],
            runtimeChunk: 'single',
            splitChunks: {
              cacheGroups: {
                vendor: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks: 'all'
                }
              }
            }
          }
        : { usedExports: true },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Sarp IŞIK',
        template: 'src/index.html'
      }),
      new WebpackPwaManifest({
        name: 'Sarp IŞIK Portfolio',
        short_name: 'Portfolio',
        description: 'Junior Full Stack Developer Portfolio',
        background_color: '#ffffff'
      })
    ]
  };

  // Production
  if (argv.mode === 'production') {
    config.output.publicPath = '';
    config.plugins.push(
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [autoprefixer()]
        }
      })
    );
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      })
    );
    config.plugins.push(new webpack.HashedModuleIdsPlugin());
    config.plugins.push(
      new WorkboxPlugin.GenerateSW({
        // these options encourage the ServiceWorkers to get in there fast
        // and not allow any straggling "old" SWs to hang around
        clientsClaim: true,
        skipWaiting: true
      })
    );
    config.plugins.push(
      new HtmlWebpackPartialsPlugin([
        {
          // Merge analytics html into index.html
          path: path.join(__dirname, './src/partials/analytics.html'),
          location: 'head',
          priority: 'high',
          options: {
            ga_property_id: 'UA-136431806-1'
          }
        }
      ])
    );
    return config;
  }

  // Development
  config.devServer = {
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    hot: true
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  return config;
};
