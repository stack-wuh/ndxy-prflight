import $http from '@/utils/axios'
import {_g, NotNull} from '@/utils/global'
const state = {
  data: [],
  total:0,
  currPageNo:1,
  temp_list1:[],
  exp:'',
}

const mutations = {
  setStoreInfo(state, {params} = {}){
    state.data = params && params.list
    state.total = params && Number(params.total)
  },
  setTestInfo(state, {params} = {}){
    state.data = params && params.list
    state.total = params && Number(params.total)
  },
  setExamInfo(state, {params} = {}){
    state.data = params && params
  },
  setExamOneInfo(state, {params} = {}){
    state.temp_list1 = params && params.map(item => {
      if(item.type == 0 ){
        return {...item, radio1:''}
      }else{
        return {...item, checkList:[]}
      }
    })
  },
  clearData(state){
    state.data = []
  },
  setExp(state, exp){
    state.exp = exp
  },
  setPrevDevList(state, {params} = {}){
    state.data =  params && params
  },
  setPrevTestList(state, {params} = {}){
    state.data = params && params
  },
  setStundentJudge(state, {params} = {}){
    state.temp_list1 = params && params.map(item => {
      return {...item, radio1:''}
    })
    state.temp_list1.content = ''
  },
  setPrevOrder(state, {params} = {}){
    state.data = params && params.list
    state.total = params && Number(params.total)
  }
}

const actions = {
  /**
   * 获取基本信息
   */
  getBaseInfo({commit}, {num = 24, page = 1} = {}){
    return new Promise((resolve, reject) => {
      $http.post('student/myinfo', {num, page}, res => {
        commit('setStoreInfo', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 获取预约实验
   */
  getTestInfo({commit, dispatch, rootState}, {num = 10, page = 1} = {}){
    return new Promise((resolve, reject) => {
      $http.post('student/orderexp', {...NotNull(rootState.search), num, page}, res => {
        dispatch('getSysType')
        commit('setTestInfo', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 获取预约实验详情
   */
  getTestInfoOne({commit}, {id} = {}){
    return new Promise((resolve, reject) => {
      $http.post('student/orderexpdetail', {id}, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 实验预约选座
   */
  putTestChoose({commit}, {id, index} = {}){
    return new Promise((resolve, reject) =>{
      $http.post('student/choseseat', {id, index}, res => {
        return resolve(res)
      })
    })
  },
  /**
   * 获取考试信息
   */
  getExamInfo({commit}){
    return new Promise((resolve, reject) => {
      $http.post('exam/lists', {}, res => {
        commit('setExamInfo', {params:res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 获取考题
   */
  getExamOne({commit}, {exp} = {}){
    return new Promise((resolve, reject) => {
      $http.post('exam/index', {exp}, res => {
        commit('setExp', exp)
        commit('setExamOneInfo', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 发布答案
   */
  getExamAnswer({commit, state}, {form} = {}){
    return new Promise((resolve, reject) => {
      $http.post('exam/checkexam', {answer: form, exp:state.exp}, res => {
        commit('setExp', '')
        return resolve(res)
      })
    })
  },
  /**
   * 获取查看设备预约
   */
  getPrevDevList({commit}, {form} = {}){
    return new Promise((resolve, reject) => {
      $http.post('student/myordereq', {}, res => {
        commit('setPrevDevList', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 获取实验预约
   */
  getPrevTestList({commit, rootState}, {form} = {}){
    let _url = rootState.Sign.type === 1 ? 'student/myorderexp' : 'teacher/myordereq'
    return new Promise((resolve, reject) => {
      $http.post(_url, {}, res => {
        commit('setPrevTestList', {params: res.data})
        return resolve(res)
      })
    })
  },
  /**
   * 获取预约设备
   */
    getPrevOrder({commit, dispatch, rootState}, {num = 10, page = 1} = {}){
      return new Promise((resolve, reject) => {
        $http.post('student/ordereq', {...NotNull(rootState.search), num, page}, res => {
          dispatch('getPrevwareTypeList')
          commit('setPrevOrder', {params: res.data})
          return resolve(res)
        })
      })
    },
    /**
     * 预约设备详情
     */
    getWareInfoOne({commit}, {id} = {}){
      return new Promise((resolve, reject) => {
        $http.post('student/ordereqdetail', {id}, res => {
          return resolve(res)
        })
      })
    },
    /**
     * 预约设备选座
     */
    putWareChoose({commit}, {id, index} = {}){
      return new Promise((resolve, reject) => {
        $http.post('student/choseseateq', {id, index}, res => {
          return resolve(res)
        })
      })
    },
   /**
    * 绑定邮箱
    */
   bindEmail({commit}, {email} = {}){
     let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
     if(!email){
      _g.toastMsg({
        type:'error',
        msg:'请编辑邮箱地址'
      }) 
      return
     }
     if(!reg.test(email)){
      _g.toastMsg({
        type:'error',
        msg:'邮箱地址格式错误'
      }) 
      return
     }
     return new Promise((resolve, reject) => {
       $http.post('user/bindemailsub', {email}, res => {
          return resolve(res)
       })
     })
   },
   /**
    * 意见反馈
    */
   feedBackPub({dispatch}, {form} = {}){
     return new Promise((resolve, reject) => {
       $http.post('user/suggestsub', form, res => {
         return resolve(res)
       })
     })
   },
   /**
    * 获取评价题目
    */
   getStudentJudge({commit}){
     return new Promise((resolve, reject) => {
       $http.post('student/judge', {}, res => {
         commit('setStundentJudge', {params: res.data})
         return resolve(res)
       })
     })
   },
   /**
    * 发布评价
    */
   pubStudentJudge({dispatch}, {path, form} = {}){
     return new Promise((resolve, reject) => {
       $http.post('student/judgesub', form, res => {
          dispatch('getStudentJudge')
          return resolve(res)
       })
     })
   }
}

const getters = {

}

export default  {
  state, mutations, actions, getters
}