import {reqGetCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister} from "@/api";
import {removeToken, setToken,getToken} from "@/utils/token";

const state={
    code:'',
    token:getToken(),
    userInfo:{},
}
const mutations={
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    CLEAR(state){
        //帮仓库中相关用户信息清空
        state.token='';
        state.userInfo={}
        //本地存储数据
        removeToken()
    }

}
const actions={
    //        获取验证码
    async getCode({commit},phone) {
        //获取验证码的这个接口，吧验证码返回，但是正常情况，后台吧验证码发到用户手机上
        let result = await reqGetCode(phone)
      if(result.code==200){
          commit("GETCODE",result.data)
          return 'ok'
      }else{
          return Promise.reject(new Error("GETCODE failed"))
      }

},
    //用户注册
   async userRegister({commit},user) {
    let result = await reqUserRegister(user)
        console.log(result)
       if (result.code==200){
           return 'ok'
       }else{
           return Promise.reject(new Error("failed"))
       }
    },
//登陆业务
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        if(result.code==200){
            commit("USERLOGIN",result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }

    },
    //获取用户信息
 async   getUserInfo({commit}){
        let result = await reqUserInfo();
     if (result.code==200) {
         commit("GETUSERINFO", result.data)
     }

 },
//    退出登录
   async userLogout({commit}){
     let result=   await reqLogout()
       if (result.code==200){
           commit("CLEAR",result.data)
       }
    }

}
const getters={}
export default {
    state,
    mutations,
    actions,
    getters
}