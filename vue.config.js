// 因为所有的数据都是假的，所以需要接口来获取数据，就要用到axios来反向代理取得 接口文档中的ip地址里面的json数据，在vue.config.js文件中可以配置,配置完成之后重新运行项目,重新运行项目之前要下载axios的包，用来代理数据接口-s

module.exports = {
    configureWebpack: {},
    publicPath: '/miaomiao',
    devServer: {
        proxy: {
            '/api':{
                target: 'http://39.97.33.178',
                changeOrigin: true,
            }
        }
    }
}