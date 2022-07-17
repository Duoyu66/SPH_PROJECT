//引入路由组件
import Detail from "@/pages/Detail";
import Home from "@/pages/Home/HomeIndex";
import Search from "@/pages/Search/SearchIndex";
import Login from "@/pages/Login/index"
import Register from "@/pages/Register/index"
import AddCartSuccess from "@/pages/AddCartSuccess/index"
import ShopCart from "@/pages/ShopCart/index"
export default [
    {
        path: '/shopcart',
        component:ShopCart ,
        meta: {isShow: true}
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: {isShow: true}
    },

    {
        path: '/home',
        component: Home,
        meta: {isShow: true}
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: {isShow: true},
        name: "search",
        props: (route) => ({
            keyword: route.params.keyword,
            big: route.query.big
        })
    },
    {
        path: '/login',
        component: Login,
        meta: {isShow: false}
    },
    {
        path: '/register',
        component: Register,
        meta: {isShow: false}
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: {isShow: false}
    }
    ,
    //重定向,在项目跑起来的时候，访问/。立马让他定向到首页
    {
        path: '*',
        redirect: "/home"
    }

]