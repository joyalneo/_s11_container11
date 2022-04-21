import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

// For testing take pull from Appblox/node-blox-sdk and npm install from path
import { env } from 'node-blox-sdk';
env.init();

const __dirname = path.resolve();

export default {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000,
  },
  externals: {
    env: JSON.stringify(process.env),
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new ModuleFederationPlugin({
      name: 'Container',
      library: { type: 'var', name: 'container' },
      shared: {
        react: {
          import: 'react', // the "react" package will be used a provided and fallback module
          shareKey: 'react', // under this name the shared module will be placed in the share scope
          shareScope: 'default', // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed
          version: '^17.0.2',
        },
        'react-dom': {
          import: 'react-dom', // the "react" package will be used a provided and fallback module
          shareKey: 'react-dom', // under this name the shared module will be placed in the share scope
          shareScope: 'default', // share scope with this name will be used
          version: '^17.0.2',
          singleton: true,
        },
        'react-redux': {
          import: 'react-redux', // the "react" package will be used a provided and fallback module
          shareKey: 'react-redux', // under this name the shared module will be placed in the share scope
          shareScope: 'default', // share scope with this name will be used
          version: '^7.2.5',
          singleton: true,
        },
        'react-router-dom': {
          import: 'react-router-dom', // the "react" package will be used a provided and fallback module
          shareKey: 'react-router-dom', // under this name the shared module will be placed in the share scope
          shareScope: 'default', // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed
          version: '^5.2.0',
        },
        'blox-js-sdk': {
          import: 'blox-js-sdk',
          shareKey: 'blox-js-sdk',
          shareScope: 'default',
          singleton: true,
          version: '^1.0.0',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
