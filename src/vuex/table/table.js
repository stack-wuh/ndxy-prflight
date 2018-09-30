import {list} from '../../utils/tables'
const state = {
  list,
  isShowDialog: false,
  isShowDialogPrevTest:false,
  isShowDialogPrevDev: false
}

const mutations = {
  openDialog(state, {path} = {}){
    if(path === '/center/exam'){
      state.isShowDialog = !state.isShowDialog
    }else if(path === '/center/prevtest'){
      state.isShowDialogPrevTest = !state.isShowDialogPrevTest
    }else if(path === '/center/prevdev'){
      state.isShowDialogPrevDev = !state.isShowDialogPrevDev
    }
  }
}

const actions = {

}

const getters = {
  formatTableList: state => ({path} = {}) => {
    return state.list.find(item => item['reg'] && item['reg'].includes(path)) && 
                   state.list.find(item => item['reg'] && item['reg'].includes(path)).list
  }
}

export default {
  state, mutations, actions, getters
}