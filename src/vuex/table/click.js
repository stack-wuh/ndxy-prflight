export const OpenDialogToggle = ({path, row} = {}) => {
  window.$store.commit('openDialog',{path})
  switch(path){
    case '/center/exam' : return window.$store.dispatch('getExamOne', {exp:row.exp})
    case '/center/prevtest' : return window.$store.dispatch('getStudentJudge')
    case '/center/prevdev' : return window.$store.dispatch('getStudentJudge')
  }
}