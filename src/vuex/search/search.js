import {list} from '@/utils/search'
const state = {
  list,
  search:{}
}

const mutations = {

}

const actions = {

}

const getters = {
  formatSearchList: state => ({path} = {}) => {
    return state.list.find(ss => ss['params'].includes(path))
              && state.list.find(ss =>ss['params'].includes(path)).list

  },
  formatSearchSelect: (state, rootGetters, rootState) => ({path} = {}) => {
    return rootGetters.formatSearchList({path}) && rootGetters.formatSearchList({path}).map(item => {
      if(item.key === '实验体系'){
        return {...item,list:rootState.sys_list}
      }else if(item.key === '专业'){
        return {...item, list: rootState.major_list}
      }else if(item.key === '年级'){
        return {...item, list: rootState.class_list}
      }else if(item.key === '实验位置'){
        return {...item, list: rootState.orderWareList}
      }else{
        return {...item}
      }
    })
  }
}

export default {
  state, mutations, actions, getters
}