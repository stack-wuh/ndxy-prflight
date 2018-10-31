import axios from 'axios'
import {_g}  from './global'
import qs  from 'qs'
/**
 * 发起请求的拦截器
 */
axios.interceptors.request.use(config => {
  /**
   * 发起请求之前要做什么
   */
  window.$store.dispatch('changeShowLoading',{show:true})
  return config
},error =>{
  /**
   * 请求错误之后要做什么
   */
  window.$store.dispatch('changeShowloading',{show:false})
  _g.toastMsg()
  return Promise.reject(error)
})

axios.interceptors.response.use(response =>{
  setTimeout(()=>{
    window.$store.dispatch('changeShowLoading',{show:false})
  },500)
  return response
}, error =>{
  return Promise.reject(error)
})

/**
 * 响应消息
 */
const checkStatus = response =>{
  if(response && (response.status === 200)){
    let type = response.data.code === 1 ? 'success' : response.data.code === 0 ? 'error' : 'info'
    if(response.data.msg !== 'OK'){
      _g.toastMsg({
        type,
        msg:response.data.msg
      })
    }
    return response.data
  }else if(response.staus === 500){
    _g.toastMsg({
      type:'error',
      msg:'服务器端错误'
    })
  }else {
    return {
      status: -404,
      msg: '网络异常'
    }
  }
}

const checkCode = res => {
  if(res.status === -404){
    _g.toastMsg({type:'error',msg:res.msg})
  }
  if(res.data && res.code === 1){
    return new Promise((resolve,reject)=>{
      return resolve(res)
    })
  }
  if(res.code === 10){
    _g.toastMsg({
      type:'info',
      msg:'请登录之后操作!'
    })
    setTimeout(() => {
      window.$route.push({name:'signin'})
    }, 1000);
  }
  return res
}

export default {
  post(url,data,cb){
    return axios({
      method:'post',
      baseURL:window.rootPath,
      url,
      data:qs.stringify(data),
      timeout:10000,
      headers:{
        'X-Requested-With':'XMLHttpRequest',
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }).then(response => {
      return checkStatus(response)
    }).then(res=>{
      return checkCode(res)
    }).then(res=>{
      cb && cb(res)
    }).catch(err=>{
      // if(err){
      //   _g.toastMsg({
      //     type:'error',
      //     msg:'网络异常,请稍后重试!',
      //   })
      // }
      window.$store.dispatch('changeShowLoading',{show:false})
    })
  }
}