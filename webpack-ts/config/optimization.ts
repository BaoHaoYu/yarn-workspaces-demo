import webpack from 'webpack'

const optimization: webpack.Options.Optimization = {
  splitChunks: {
    maxAsyncRequests: 1,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'verdor',
        chunks: 'initial'
      }
    }
  }
}

export default optimization
