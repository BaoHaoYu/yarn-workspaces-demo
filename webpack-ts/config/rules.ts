import webpack from 'webpack'
import cssModules from './useCssModules'
import { rootPath } from '../../config/base'
import path from 'path'
export default function (sourceMap: boolean): webpack.RuleSetRule[] {
  return [
    {
      test: /\.stories\.tsx?$/,
      enforce: 'pre',
      use: [
        {
          loader: '@storybook/addon-storysource/loader',
          options: { parser: 'typescript' }
        }
      ]
    },
    {
      test: /\.(tsx|jsx|ts)?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            configFile: path.join(rootPath, '.babelrc')
          }
        }
      ]
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.scss/,
      use: cssModules({ loader: 'sass-loader', sourceMap })
    },
    {
      test: /\.(png|jpg|svg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    }
  ]
}
