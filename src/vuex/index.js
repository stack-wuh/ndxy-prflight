import $http from '@/utils/axios'
export const state = {
  isShowloading: false,
  search:{},
  majorList:[],
  sys_list:[],
  orderWareList:[],
  sys__list:[],
  exp__list:[],
  location__list:[],
  eq__list:[]
}

export const mutations = {
  showChange(state, params){
    state.isShowloading = params
  },
  setMajorList(state, {params} = {}){
    state.majorList = params.map(item => {
      return {label:item.name, value: item.type}
    })
  },
  setSysType(state, {params} = {}){
    for(var k in params){
     state[k + '_list'] = params[k].map(item => {
        return {label: item.name, value: item.type}
      })
    }
  },
  setOrderEqType(state, {params} = {}){
    state.orderWareList = params.map(item => {
      return {label: item.name, value: item.sort}
    })
  },
  setPubTestTypeForTea(state, {params} = {}){
    for(var k in params){
      if(k === 'conf') continue
      if(k === 'exp'){
        state[k + '__list'] = params[k].map(item => {
          return {label: item.title, value: item.id}
        })
      }else {
        state[k + '__list'] = params[k].map(item => {
          return {label: item.name, value: item.type ? item.type : item.sort}
        })
      }
    }
  },
  setPutWareTypeForTea(state, {params} = {}){
    for(var k in params){
      if(k === 'conf') continue
      if(k === 'eq'){
        state[k + '__list'] = params[k].map(item => {
          return {label: item.title, value: item.id}
        })
      }else {
        state[k + '__list'] = params[k].map(item => {
          return {label: item.name, value: item.type ? item.type : item.sort}
        })
      }
    }
  },
}

export const actions = {
  changeShowLoading({commit},params){
    commit('showChange',params.show)
  },
  /**
   * 获取专业列表
   */
  getMajorList({commit}){
    return new Promise((resolve, reject) => {
      $http.post('eq/type', {}, res => {
        commit('setMajorList', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 获取实验体系内的条件列表
   */
  getSysType({commit}){
    return new Promise((resolve, reject) => {
      $http.post('sys/type', {}, res => {
        commit('setSysType', {params: res.data})
        return resolve(res)
      })
    })
  },

  /**
   * 获取教学资源分类
   */
  getSourceType({commit}){
    return new Promise((resolve, reject) => {
      $http.post('video/type', {}, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 获取预约设备查询条件
   */
  getPrevwareTypeList({commit}){
    return new Promise((resolve, reject) => {
      $http.post('student/ordereqtype', {}, res => {
        commit('setOrderEqType', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 教师 --- 获取发布实验内的下拉
   */
  getPubTestTypeForTea({commit}){
    return new Promise((resolve, reject) => {
      $http.post('teacher/releaseexp', {}, res => {
        commit('setPubTestTypeForTea', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 教师 --- 获取发布设备内的下拉
   */
  getPubWareTypeForTea({commit}){
    return new Promise((resolve, reject) => {
      $http.post('teacher/releaseeq', {}, res => {
        commit('setPutWareTypeForTea', {params: res.data})
        return resolve(res)
      })
    })
  }
}

export const getters = {

}

