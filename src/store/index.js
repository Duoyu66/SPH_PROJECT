import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//引入小仓库
import home from './home'
import search from './search'
import detail from "@/store/detail";
import shopcart from "@/store/shopcart";

export default new Vuex.Store({
  modules:{
      home,
      search,
      detail,
      shopcart
  }
})