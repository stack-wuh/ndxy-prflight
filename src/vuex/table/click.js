export const OpenDialogToggle = ({path, text, row, $index} = {}) => {
  window.$store.commit('openDialog',{path})
  switch(path){
    case '/center/exam' : return window.$store.dispatch('getExamOne', {exp:row.exp})
    case '/center/prevtest' : return window.$store.dispatch('getStudentJudge')
    case '/center/prevdev' : return window.$store.dispatch('getStudentJudge')
  }
}

export const jump2other = ({path, text, row, $index} = {}) => {
  switch(path){
    case '/center/test' : return window.$router.push({path: '/center/choose/test', query:{id: row.id}})
    case '/center/ware' : return window.$router.push({path: '/center/choose/ware', query:{id: row.id}})
  }
}