// const { defineConfig } = require('@vue/cli-service')
module.exports = ({
  // transpileDependencies: true,
  lintOnSave:false,
  devServer:{

    proxy:{
      '/api':{
         target:'http://gmall-h5-api.atguigu.cn',
        changeOrigin:true
        // pathRewrite:{'^api':''}
      //       既然postman可以接收数据，为什么还报code500啊
      }
    }
  }
})
