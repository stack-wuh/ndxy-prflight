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
    return new Promise((resolve, reject) => {
      $http.post('teacher/releaseexpsub', form, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 查看发布的实验
   */
  seaTestForTea({commit}, {id, num = 10, page = 1} = {}){
    let _url = id ? 'teacher/releaseexpdetail' : 'teacher/releaseexplist'
    return new Promise((resolve, reject) => {
      $http.post(_url, {id, num, page}, res => {
        commit('setSeaTestForTea', {params: res.data})
        return resolve(res)
      })
    })
  },
  putWareForTea({commit}, {form} = {}){
    return new Promise((resolve, reject) => {
      $http.post('teacher/releaseeqsub', form, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 获取发布的设备
   */
  seaWareForTea({commit}, {id, num = 24, page = 1} = {}){
    let _url = id ? 'teacher/releaseeqdetail' : 'teacher/releaseeqlist'
    return new Promise((resolve, reject) => {
      $http.post(_url, {id, num, page}, res => {
        commit('setWareForTea', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 获取教师通讯录
   */
  getTeaConcats({commit}, {num = 24, page = 1} = {}){
    return new Promise((resolve, reject) => {
      $http.post('user/contactus', {num, page}, res => {
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
  getWareFixedList({commit}, {num = 24, page = 1}){
    return new Promise((resolve, reject) => {
      $http.post('teacher/mendlist', {num, page}, res => {
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
  },
  /**
   * 获取实验周数
   */
  getTestWeek({commit}, {date} = {}){
    return new Promise((resolve, reject) => {
      $http.post('teacher/expweek', {date}, res =>{
        return resolve(res)
      })
    })
  },
  /**
   * 获取预约实验的名单
   */
  getPrevTestOrder({commit}, {id} = {}){
    return new Promise((resolve, reject) => {
      $http.post('teacher/releaseexpdetailuser', {id}, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 查看发布的实验 -- 下载名单
   */
  handleDownLoadTestOrder({commit}, {id, path} = {}){
    let _url = path === '/stu/order/tea' ? 'teacher/expexcel' : 'teacher/eqexcel'
    return new Promise((resolve, reject) => {
      $http.post(_url, {id}, res => {
        window.location.href =  $img + '/' + res.data
      })
    })
  },
  /**
   * 查看发布的实验 -- 评分
   */
  pubTestGrade({commit}, {id, stu_id, score, type} = {}){
    return new Promise((resolve, reject) => {
      $http.post('teacher/scoresub', {id, stu_id, score, type}, res => {
        return resolve(res)
      })
    })
  },  
  /**
   * 查看发布的实验 -- 取消实验
   */
  putTestState({commit}, {id} = {}){
    return new Promise((resolve, reject) => {
      $http.post('teacher/expcancle', {id}, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 查看发布实验 -- 确认
   */
  putTestCheck({commit}, {id, stu_id_arr, type} = {}){
    return new Promise((resolve, reject) => {
      $http.post('teacher/finishall', {id, stu_id_arr, type}, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 查看发布的设备 -- 预约名单
   */
  getPrevWareList({commit}, {id} = {}){
    return new Promise((resolve, reject) => {
      $http.post('teacher/releaseeqdetailuser', {id}, res => {
        return resolve(res)
      })
    })
  },
}

const getters = {
  formatFixedList: state => {
    return state.data && state.data.list && state.data.list.map(item => {
      return {...item, avatar: $img + '/' + item.photo}
    })
  }
}
export default {
  state, mutations, actions, getters
}