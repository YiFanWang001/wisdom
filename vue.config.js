const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        host: 'localhost',
        port: 8080,
        open: false,
        https: false,
        proxy: {
            '/dev-api': {
                target: 'http://zh.9yuecloud.com/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/dev-api': ''
                }
            }
        }
    }
})