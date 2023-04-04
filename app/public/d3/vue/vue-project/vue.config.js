module.exports = {
  chainWebpack: config => {
    config.module
      .rule('js')
      .test(/\.js$/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('eslint-loader')
      .loader('eslint-loader')
      .end()
  },
  configureWebpack: {
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' },
      headers: { 'Content-Type': 'application/javascript' }
    }
  }
}
