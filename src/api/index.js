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

//获取商品详情页信息的接口
export const reqGoodsInfo =(skuId)=>requests({url:`/item/${skuId}`,method:'get'})

//将产品添加到购物车中（获取更新某一个产品的个数）/api/cart/cartList
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'})

//获取购物车列表数据接口   URL:/api/cart/cartList method:get
export const reqCartList =() =>requests({url:'/cart/cartList',method:'get'})

//删除购物产品的接口
//URL:/api/cart/deleteCart/{skuId}   method:DELETE
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

//修改商品选中状态
export const reqUpdateCheckedByid=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码
export const reqGetCode =(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册  url:/api/user/passport/register method:post phone code password
export const  reqUserRegister =(data)=>requests({url:'/user/passport/register',data,method:'post'})

//登录 /ueser/passport/login
export const reqUserLogin =(data)=>requests({url:'/user/passport/login',data,method:'post'})

//获取用户信息【需要带着用户的token向服务器要用户信息】 url:/api/user/passport/auth/getUSerInfo method:get
export const reqUserInfo =()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录 url:/api/user/passport/logout get
export const reqLogout =()=>requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});

//获取商品清单
//URL:/api/order/auth/trade   method:get
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'});
