<template>
  <section class="wrapper header-wrapper">
    <section class="header-wrapper-top">
      <h3 class="header-wrapper-top__title">武汉理工大学能动学院实验中心</h3>
    </section>
    <nav class="header-wrapper-nav">
      <ul class="header-wrapper-nav_item">
        <li @click="jump2Other(item.url)" :class="[$route.path === item.url ? 'nav-item__title nav-item__title__active' : 'nav-item__title']" v-for="(item,index) in nav" :key="index">{{item.title}}</li>
      </ul>
      <el-dropdown trigger="click" style="margin-right:10%;">
        <span class="el-dropdown-link my-icon-center">
          {{name || '用户'}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </nav>
  </section>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'myHeader',

  data () {
    return {
      nav:[
        {
          title:'首页',
          url:'/index',
        },
        {
          title:'设备环境',
          url:'/list',
        },
        {
          title:'实验体系',
          url:'/list/stream'
        },
        {
          title:'教学资源',
          url:'/list/source',
        },
        {
          title:'个人中心',
          url:'/center'
        },
      ],
      info:{}
    }
  },
  computed:{
    ...mapState({
      name:state => state.Sign.username,
      type: state => state.Sign.type
    })
  },
  methods: {
    ...mapActions({
      'logout':'logout',
      'getUserInfo':'getUserInfo',
    }),
    jump2Other(url){
      this.$router.push({path: url})
    }
  },
  created(){
    this.getUserInfo()
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/base-cl.scss';
@import '../../assets/style/mixin.scss';
.header-wrapper{
  .header-wrapper-top{
    height: 80px;
    padding-left:15%;
    line-height: 80px;
    background-color: #fff;
    .header-wrapper-top__title{
      font-size: 20px;
    }
  }
  .header-wrapper-nav{
    @include flex-box(row, nowrap, space-between, center);
    height: 50px;
    padding-left: 15%;
    padding-right: 10%;
    color: #fff;
    background-color: #0E90D2;
    .header-wrapper-nav_item{
      @include flex-box;
      .nav-item__title{
        min-width: 100px;
        height: 50px;
        text-align:center;
        line-height: 50px;
        &:hover{
          cursor: pointer;
          background-color: #0D89C7;
          color: #fff;
          border: 1px solid $base;
        }
      }
    }
    .nav-item__title__active{
      color: #fff;
      background-color: #0D89C7;
      border-top:1px solid $base;
      border-bottom:1px solid $base;
    }
    .el-dropdown-link{
      font-size: 16px;
      color: #fff;
    }
  }
}
</style>
