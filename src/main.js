import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from "@/router";

import {reqGetSearchInfo} from "@/api";

console.log(reqGetSearchInfo({}))

//引入Swiper样式
import 'swiper/css/swiper.css'
//引入mockserve
import '@/mock/mockServe'
Vue.config.productionTip = false
//三级联动---全局组件
import NavIndex from "@/components/TypeNav/NavIndex";
//引入仓库
import store from '@/store'
//第一个 参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(NavIndex.name, NavIndex)


new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus=this
    }
    ,
    //注册了路由 KV一致省略V
    router,
    //注册仓库：组件实例的身上会多出一个$store属性
    store
}).$mount('#app')
