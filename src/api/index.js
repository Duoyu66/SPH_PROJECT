//当前这个模块:API进行统一管理
import  requests from './request'
//引入mock
import mockRequest from "@/api/mockRequest";
//三级联动接口
// /api/product/getBaseCategoryList get 无参数

export const reqCategoryList =()=> requests({url:'/product/getBaseCategoryList',method:'GET'})

//获取banner(home首页轮播图接口)
export const reqGetBannerList =()=> mockRequest.get('/banner')
//获取floor数据
export const reqGetFloorList =()=> mockRequest.get('/floor')
//获取搜索模块 地址:/api/list 方式:POST
export const reqGetSearchInfo =(params)=>requests({url:'/list',method:'post',data:params})
