import $http from '@/utils/axios'
const state = {
  username:'',
  type:''
}

const mutations = {
  setUserInfo(state, {params} = {}){
    state.username = params.name
    state.type = params.type
  },
  clearUserInfo(state){
    state.username = ''
    state.type = ''
  }
}

const actions = {
  /**
   * 获取安全须知
   */
  getSafeInfo(){
    return new Promise((resolve, reject) => {
      $http.post('user/loginsafety', {}, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 登录
   */
  login(context, {form} = {}){
    return new Promise((resolve, reject) => {
      $http.post('user/dologin', form, res => {
        return resolve(res)
      })
    })
  },
  /**
   * check 验证登录
   */
  checkLogin(context){
    return new Promise((resolve, reject) => {
      $http.post('user/checklogin', {}, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 登出
   */
  logout(context){
    return new Promise((resolve, reject) => {
      $http.post('user/outlogin', {}, res => {
        if(res.code === 1){
          setTimeout(()=>{
            context.commit('clearUserInfo')
            window.$router.push({path: '/index'})
          },1000)
        }
      })
    })
  },
  /**
   * 获取用户详情
   */
  getUserInfo({commit}){
    return new Promise((resolve, reject) => {
      $http.post('user/getuser', {}, res => {
        commit('setUserInfo', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 更改密码
   */
  changePwd({commit}, {form:{number, pwd, pwdre}} = {}){
    return new Promise((resolve, reject) => {
      $http.post('user/pwdchange', {number, pwd, pwdre}, res => {
        return resolve(res)
      })
    })
  }
}

const getters = {

}

export default {
  state, mutations, actions, getters
}