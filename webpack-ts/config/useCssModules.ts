// @ts-ignore
import precss from 'precss'
import webpack from 'webpack'

/**
 * 快速生成不同css预编译的css模块处理
 * @return {*[]}
 * @param p
 */
export default function cssModules (p: { loader: string, sourceMap: boolean }):
    webpack.RuleSetUse {
  return [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[path][name]__[local]--[hash:base64:5]'
        },
        sourceMap: p.sourceMap,
        importLoaders: 1
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: p.sourceMap,
        plugins () {
          return [
            precss
          ]
        }
      }
    },
    {
      loader: p.loader,
      options: {
        sourceMap: p.sourceMap
      }
    }
  ]
}
