//对于axios进行二次封装
import axios from "axios";
//引入进度条
import NProgress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
// 配置不显示右上角的旋转进度条, 只显示水平进度条
NProgress.configure({ showSpinner: false })
//利用axios方法创建一个axios实例
const service =axios.create({
    //配置对象
    //基础路径，发请求的时候路径当中发会出现api
    baseURL:"/mock",
    timeout:5000
});
//请求拦截器:再发请求之前可以检测到，可以在请求发出去之前做一些事情
service.interceptors.request.use((config)=>{
    //config ：配置对象，对象里面有一个属性很重要，header请求头
    NProgress.start();
    return config;
});
//响应拦截器
service.interceptors.response.use((res)=>{
    NProgress.done();
    return res.data;
},(error) =>{
    NProgress.done();
    console.log("响应失败"+error)
    return Promise.reject(new Error('fail'))
    // 统一处理一下错误
    // alert(error.message)
});

//对外暴露
export default service;