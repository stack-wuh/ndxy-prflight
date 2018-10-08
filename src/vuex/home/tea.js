import $http from '@/utils/axios'
const state = {
  data:[],
  info:{}
}

const mutations = {
  setSeaTestForTea(state, {params} = {}){
    state.data = params && params
  },
  setWareForTea(state, {params} = {}){
    state.data = params && params
  },
  setTeaConcat(state, {params} = {}){
    state.data = params && params
  },
  seaWareFixedList(state, {params} = {}){
    state.data = params && params
  },
  setWareFixedOne(state, {params} = {}){
    state.info = params && params
  }
}

const actions = {
  /**
   * 发布实验提交
   */
  testPubForTea({commit}, {form} = {}){
    let temp_form = JSON.parse(JSON.stringify(form))
    temp_form.date = temp_form.date.slice(0, 10)
    return new Promise((resolve, reject) => {
      $http.post('teacher/releaseexpsub', temp_form, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 查看发布的实验
   */
  seaTestForTea({commit}, {id} = {}){
    let _url = id ? 'teacher/releaseexpdetail' : 'teacher/releaseexplist'
    return new Promise((resolve, reject) => {
      $http.post(_url, {id}, res => {
        commit('setSeaTestForTea', {params: res.data})
        return resolve(res)
      })
    })
  },
  putWareForTea({commit}, {form} = {}){
    let temp_form = JSON.parse(JSON.stringify(form))
    temp_form.date = temp_form.date.slice(0, 10)
    return new Promise((resolve, reject) => {
      $http.post('teacher/releaseeqsub', temp_form, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 获取发布的设备
   */
  seaWareForTea({commit}, {id} = {}){
    let _url = id ? 'teacher/releaseeqdetail' : 'teacher/releaseeqlist'
    return new Promise((resolve, reject) => {
      $http.post(_url, {id}, res => {
        commit('setWareForTea', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 获取教师通讯录
   */
  getTeaConcats({commit}){
    return new Promise((resolve, reject) => {
      $http.post('user/contactus', {}, res => {
        commit('setTeaConcat', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 获取设备信息
   */
  getWareInfo({commit}, {bianhao} = {}){
    return new Promise((resolve, reject) => {
      $http.post('teacher/getthiseq', {bianhao}, res => {
        return resolve(res)
      })
    })
  },

  /**
   * 提交设备维修记录
   */
  putWareOne({commit}, {form} = {}){
    form.photo = form['photo'].replace($img, '')
    return new Promise((resolve, reject) => {
      $http.post('teacher/mendsub', {form}, res => {
        form.photo = $img + form.photo
        return resolve(res)
      })
    })
  },

  /**
   * 获取设备维修记录
   */
  getWareFixedList({commit}){
    return new Promise((resolve, reject) => {
      $http.post('teacher/mendlist', {}, res => {
        commit('seaWareFixedList', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 获取设备维修详情
   */
  getWareFixedDetailOne({commit}, {id} = {}){
    return new Promise((resolve, reject) => {
      $http.post('teacher/menddetail', {id}, res => {
        commit('setWareFixedOne', {params: res.data})
        return resolve(res)
      })
    })
  }
}

const getters = {
  formatFixedList: state => {
    return state.data.map(item => {
      return {...item, avatar: $img + '/' + item.photo}
    })
  }
}
export default {
  state, mutations, actions, getters
}