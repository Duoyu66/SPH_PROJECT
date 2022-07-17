<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
<!--    在Home，Search显示的，在登录，注册隐藏-->
    <Footer v-show="$route.meta.show"></Footer>

  </div>
</template>

<script>
import Header from "@/components/Header/HeaderIndex";
import Footer from "@/components/Footer/FooterIndex";


export default {
  name: 'App',
  components: {
    Header, Footer
  },
  mounted(){
    //通知vuex发请求，获取数据，存储于仓库之中,或派发一个action获取上货商品分类的三级列表的数据
    this.$store.dispatch('categoryList')
    },


}
</script>

<style>

</style>
