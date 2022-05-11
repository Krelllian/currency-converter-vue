const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/currency-converter-vue/dist/',
  transpileDependencies: [
    'vuetify'
  ]
})
