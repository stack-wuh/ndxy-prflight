<template>
  <section class="leftmenu">
    <ul class="menu-list">
      <li @click="jump2Other(item.url)" class="menu-item" :class="[item.child.includes($route.path) ? 'menu-item__active' : '']" v-for="(item,index) in temp_list" :key="index">{{item.label}}</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'subMenu',

  data () {
    return {
      list:[
        {
          label:'基本信息',
          value:1,
          url:'/center/baseInfo',
          child:['/center/baseInfo'],
        },
        {
          label:'预约实验',
          value:2,
          url:'/center/test',
          child:['/center/test','/center/choose/test'],
        },
        {
          label:'预约设备',
          value:3,
          url:'/center/ware',
          child:['/center/ware','/center/choose/ware'],
        },
        {
          label:'考试测试',
          value:4,
          url:'/center/exam',
          child:['/center/exam'],
        },
        {
          label:'查看实验预约',
          value:5,
          url:'/center/prevtest',
          child:['/center/prevtest'],
        },
        {
          label:'查看设备预约',
          value:6,
          url:'/center/prevdev',
          child:['/center/prevdev'],
        },
        {
          label:'邮箱绑定',
          value:7,
          url:'/center/email',
          child:['/center/email'],
        },
        {
          label:'意见反馈',
          value:8,
          url:'/center/feedback',
          child:['/center/feedback'],
        },
      ],
      list1:[
        {
          label:'发布实验',
          value:1,
          url:'/center/pubtest/tea',
          child:['/center/pubtest/tea'],
        },
        {
          label:'发布设备',
          value:2,
          url:'/center/pubware/tea',
          child:['/center/pubware/tea'],
        },
        {
          label:'查看发布的实验',
          value:3,
          url:'/center/seatest/tea',
          child:['/center/seatest/tea', '/list/details/tea', '/stu/order/tea'],
        },
        {
          label:'查看发布的设备',
          value:4,
          url:'/center/seaware/tea',
          child:['/center/seaware/tea', '/list/details/ware/tea', '/stu/order/ware/tea'],
        },
        {
          label:'预约设备',
          value:3,
          url:'/center/ware',
          child:['/center/ware', '/center/choose/ware'],
        },
        {
          label:'查看设备预约',
          value:5,
          url:'/center/prevtest',
          child:['/center/prevtest'],
        },
        {
          label:'邮箱绑定',
          value:6,
          url:'/center/email',
          child:['/center/email'],
        },
        {
          label:'意见反馈',
          value:7,
          url:'/center/feedback',
          child:['/center/feedback'],
        },
        {
          label:'教师通讯录',
          value:8,
          url:'/concat/tea',
          child:['/concat/tea'],
        },
        {
          label:'设备维修上报',
          value:9,
          url:'/ware/pub/tea',
          child:['/ware/pub/tea'],
        },
        {
          label:'维修提交记录',
          value:10,
          url:'/center/seafixed/tea',
          child:['/center/seafixed/tea', '/center/seafixedDetail/tea'],
        },
      ]
    }
  },
  computed:{
    temp_list(){
      let type = this.$store.state.Sign.type
      return type === 1 ? this.list : this.list1
    }
  },
  methods: {
    jump2Other(url){
      this.$router.push({path: url})
    }
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/base-cl.scss';
.menu-list{
  .menu-item{
    width: 220px;
    height: 50px;
    padding-left: 20px;
    line-height: 50px;
    border-bottom: 2px solid #fff;
    background-color: $background;
    color: #999;
    &:hover{
      cursor: pointer;
      color: $base;
      border-left: 4px solid $base;
      transition: all .5s linear;
    }
  }
  .menu-item__active{
    color: $base;
    border-left:4px solid $base;
  }
}
</style>
