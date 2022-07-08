import {reqAddOrUpdateShopCart, reqGoodsInfo} from "@/api";
//封装游客身份模块uuid
import {getUUID} from "@/utils/uuid_token";
const state = {
    goodInfo: {},
//    游客身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    //获取产品信息的action
    async getGoodInfo({commit}, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code === 200) {
            commit('GETGOODINFO', result.data)
        }
    }
    ,
    //将产品添加到购物车中
    //加入购物车返回的结构
    //服务器写入数据成功并没有返回其他的数据，只是返回code=200，代表这次操作成功
    //因为服务器没有返回其余数据，因此不需要三连环存储数据
    async addOrUpdateShopCart({commit}, {skuId, skuNum}) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
     if (result.code==200){
         return "ok"
     }else{
         return Promise.reject(new Error('faile'))
     }
    }
}
const getters = {
    //当前计算出来的属性值至少为一个空对象
    categoryView(state) {
        return state.goodInfo.categoryView || {}

    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}