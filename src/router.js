import Vue from 'vue'
import Router from 'vue-router'


const Home  = resolve => require(['@/components/home'], resolve)
const Index = resolve => require(['@/components/indexManage/index'], resolve)
const List = resolve => require(['@/components/indexManage/list'], resolve)
const Center = resolve => require(['@/components/centerManage/index'], resolve)
const Teacher = resolve => require(['@/components/indexManage/teaList'], resolve)
const Notices = resolve => require(['@/components/indexManage/noticeList'],resolve)


const BaseInfo = resolve => require(['@/components/centerManage/mid/baseInfo'], resolve)
const Email = resolve => require(['@/components/centerManage/mid/email'], resolve)
const Feedback = resolve => require(['@/components/centerManage/mid/feedback'], resolve)

const TeacherPubTest = resolve => require(['@/components/centerManage/teacher/pubtest'], resolve)
const TeacherPubWare = resolve => require(['@/components/centerManage/teacher/pubware'], resolve)
const TeacherPrevList = resolve => require(['@/components/centerManage/teacher/list'], resolve)


const SignIn = resolve => require(['@/components/signManage/signin'], resolve)

const EqDetail = resolve => require(['@/components/details/eq'], resolve)
const StreamDetail = resolve => require(['@/components/details/stream'], resolve)
const SourceDetail = resolve => require(['@/components/details/source'], resolve)
const NoticeDetail = resolve => require(['@/components/details/notice'], resolve)

const scrollBehavior = (to, from, savePosition) => {
  if(savePosition){
    return savePosition
  }else{
    const position = {}
    if(to.hash){
      position.selector = to.hash
    }
    if(to.matched.some(m => m.meta.scrollToTop)){
      position.x = 0
      position.y = 0
    }
    return position
  }
}


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior,
  routes: [
    {
      path:'/',
      name:'hone',
      redirect:'/index',
      component: Home
    },
    {
      path:'/',
      component:Home,
      children:[
        {
          path: '/index',
          name:'index',
          component:Index
        },
        {
          path:'/list',
          name:'list',
          component:List
        },
        {
          path:'/list',
          alias:'/list/stream',
          component:List,
        },
        {
          path:'/list',
          alias:'/list/source',
          component:List
        },
        {
          path:'/teacher',
          name:'teachers',
          component:Teacher
        },
        {
          path:'/notice/list',
          component:Notices
        },
        {
          path:'center',
          name:'center',
          component:Center,
          beforeEnter: (to, from, next) => {
            window.$store.dispatch('checkLogin').then(res => {
              if(res.code === 1){
                next()
              }else{
                window.$router.push({name:'signIn'})
              }
            })
          },
          children:[
            {
              path:'/center/baseInfo',
              name:'baseInfo',
              component:BaseInfo
            },
            {
              path:'/center/baseInfo',
              component:BaseInfo,
              alias:'/center/test'
            },
            {
              path:'/center/baseInfo',
              component:BaseInfo,
              alias:'/center/ware'
            },
            {
              path:'/center/baseInfo',
              component:BaseInfo,
              alias:'/center/exam'
            },
            {
              path:'/center/baseInfo',
              component:BaseInfo,
              alias:'/center/prevtest'
            },
            {
              path:'/center/baseInfo',
              component:BaseInfo,
              alias:'/center/prevdev'
            },
            {
              path:'/center/email',
              name:'email',
              component:Email
            },
            {
              path:'/center/feedback',
              name:'feedback',
              component:Feedback
            },
            {
              path:'/center/pubtest/tea',
              component:TeacherPubTest
            },
            {
              path:'/center/pubware/tea',
              component:TeacherPubWare
            },
            {
              path:'/center/seatest/tea',
              component:TeacherPrevList
            }
          ]
        },
        {
          path:'/eq/detail',
          name:'eqDetail',
          component:EqDetail
        },
        {
          path:'/stream/detail',
          name:'sysDetail',
          component:StreamDetail,
        },
        {
          path:'/source/detail',
          name:'sourceDetail',
          component:SourceDetail
        },
        {
          path:'/notice/detail',
          name:'noticeDetail',
          component:NoticeDetail
        }
      ]
    },
    {
      path:'/signin',
      name:'signIn',
      component:SignIn
    }
  ]
})