import path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import webpack from 'webpack'
import { rootPath } from '../../config/base'

const resolve: webpack.Resolve = {
  plugins: [
    new TsconfigPathsPlugin({
      configFile: path.join(rootPath, 'tsconfig.app.json'),
    }),
  ],
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
}

export default resolve
