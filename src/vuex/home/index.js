import $http from '@/utils/axios'
const state = {
  data:{}
}

const mutations = {
  setIndexInfo(state, {params} = {}){
    state.data = params
  }
}

const actions = {
  /**
   * 获取首页信息
   * @param {} param0 
   */
  getHomeInfo({commit}){
    return new Promise((resolve, reject) => {
      $http.post('index/index', {}, res => {
        commit('setIndexInfo', {params: res.data})
        return resolve(res.data)
      })
    })
  },

  /**
   * 获取设备列表 
   */
  getEqList({commit}){
    return new Promise((resolve, reject) => {
      $http.post('eq/index', {}, res => {
        commit('setEqList', {params: res.data})
        return resolve(res.data)
      })
    })
  },
  /**
   * 获取设备详情
   */
  getEqOneDetail({commit},{id} = {}){
    return new Promise((resolve, reject) => {
      $http.post('eq/eqdefault', {id}, res => {
        return resolve(res.data)
      })
    })
  },
  /**
   * 获取教师风采详情
   */
  
   /**
    * 获取设备环境
    */
   getEqxList({commit}, {search, num = 20, page = 1} = {}){
     return new Promise((resolve, reject) => {
       $http.post('eq/index', {...search, num, page}, res => {
         return resolve(res.data)
       })
     })
   },
   /**
    * 获取实验体系列表
    */
   getSysList({commit}, {search} = {}){
     return new Promise((resolve, reject) => {
       $http.post('sys/index', search, res => {
         return resolve(res.data)
       })
     })
   },
   /**
    * 获取实验体系详情
    */
   getStreamOne({commit}, {id} = {}){
     return new Promise((resolve, reject) => {
       $http.post('sys/sysdefault', {id}, res => {
         return resolve(res.data)
       })
     })
   },
   /**
    * 获取教学资源列表
    */
   getSourceList({commit}, {search} = {}){
     return new Promise((resolve, reject) => {
       $http.post('video/index', search, res => {
         return resolve(res.data)
       })
     })
   },
   /**
    * 获取教学资源详情
    */
   getSourceOne({commit}, {id} = {}){
     return new Promise((resolve, reject) => {
       $http.post('video/detail', {id}, res => {
         return resolve(res.data)
       })
     })
   },
   /**
    * 获取教师风采详情
    */
   getTeacherOne({commit}, {id} = {}){
     return new Promise((resolve,reject) => {
       $http.post('index/teacherdetail', {id}, res => {
         return resolve(res)
       })
     })
   },
   /**
    * 获取通知公告详情
    */
   getNoticeOne({commit}, {id} = {}){
     return new Promise((resolve, reject) => {
       $http.post('notice/detail', {id}, res => {
         return resolve(res)
       })
     })
   },
   /**
    * 获取教师风采详情
    */
   getTeacherDetailOne({commit}){
     return new Promise((resolve, reject) => {
       $http.post('index/sysinfo', {}, res => {
         return resolve(res)
       })
     })
   },
   /**
    * 获取通知公告列表
    */
   getNoticeList({commit}, {num = 24, page = 1}){
     return new Promise((resolve, reject) => {
       $http.post('notice/index', {num, page}, res => {
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