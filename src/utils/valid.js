/**
 * 验证邮箱地址
 */
export const validEmail = (rule, value, callback) => {
  if(!value){
    return callback(new Error('请编辑邮箱地址'))
  }
  setTimeout(()=>{
   let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/ 
   if(reg.test(value)){
     callback()
   }else if(!reg.test(value)){
     callback(new Error('邮箱地址格式错误'))
   }
  },100)
}