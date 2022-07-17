//配置路由的地方
import Vue from 'vue'
  import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
//使用插件
Vue.use(VueRouter)
//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function(location, resolve, reject) {
    //第一个形参：路由跳转的配置对象（query|params）
    //第二个参数：undefined|箭头函数（成功的回调）
    //第三个参数:undefined|箭头函数（失败的回调）
    if (resolve && reject) {
        //push方法传递第二个参数|第三个参数（箭头函数）
        //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
        originPush.call(this, location, resolve, reject);
    } else {
        //push方法没有产地第二个参数|第三个参数
        originPush.call(
            this,
            location,
            () => {},
            () => {}
        );
    }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            () => {},
            () => {}
        );
    }
};
// console.log(originPush)

//对外暴露VueRouter类的实例
let router = new VueRouter({
    //配置路由
    //第一:路径的前面需要有/(不是二级路由)
    //路径中单词都是小写的
    //component右侧V别给我加单引号【字符串：组件是对象（VueComponent类的实例）】
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        //返回的这个y=0，代表的滚动条在最上方
        return { y: 0 };
    },
});
router.beforeEach((to,from,next) => {
    //to:可以获取到你要跳转到哪个路由信息
    //from：可以获得你从那个路由来的信息
    //next 放行函数 next（）放行 next（path）放行到指定路由
    //为了测试全都放行
    next();
    //用户登录了才有token
    let token=store.state.user.token
    //用户信息
    let userInfo=store.state.user.userInfo
    console.log(userInfo)
    if(token){
        if (to.path ==='/login') {
            next('/home');
        }
    }
})



//配置路由
export default router