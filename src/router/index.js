//配置路由的地方
import Vue from 'vue'
  import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)

//引入路由组件
import Home from "@/pages/Home/HomeIndex";
import Search from "@/pages/Search/SearchIndex";
import Login from "@/pages/Login/LoginIndex";
import Register from "@/pages/Register/RegisterIndex";
// 先把VueRouter原型对象的push，先保存一份
let originPush =VueRouter.prototype.push
// console.log(originPush)
//配置路由
export default new VueRouter({
    //配置路由
    routes:[

        {
            path:'/home',
            component:Home,
            meta:{show:true}
        },
        {
            path:'/search/:keyword',
            component: Search,
            meta:{show:true},
            name:"search"
        },
        {
            path:'/login',
            component: Login,
            meta:{show:false}
        },
        {
            path:'/register',
            component: Register,
            meta:{show:false}
        },
        //重定向,在项目跑起来的时候，访问/。立马让他定向到首页
        {
            path:'*',
            redirect:"/home"
        }
    ]
})