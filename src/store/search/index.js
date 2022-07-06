//search小仓库
import {reqGetSearchInfo} from "@/api";
const state={
    searchList:{}
}

const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }

}

const actions={
    async getSearchList({commit},params={}){
        let result =await reqGetSearchInfo(params)
        if(result.code===200){
            commit('GETSEARCHLIST',result.data)
        }

    }
}

const getters={
    goodsList(state){
        //网络出现故障时应该将返回值设置为空
        return state.searchList.goodsList||[]
    },
    attrsList(state){
        //网络出现故障时应该将返回值设置为空
        return state.searchList.attrsList||[]
    }
    ,
    trademarkList(state){
        //网络出现故障时应该将返回值设置为空
        return state.searchList.trademarkList||[]
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}

