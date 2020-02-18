module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './vue-echarts' : '/',
    outputDir: 'demo',
    transpileDependencies: ['resize-detector'],
    chainWebpack: config => {
      config
        .entry('app')
        .clear()
        .add('./src/demo/main.js')

    }
  }
  