<template>
  <section class="index-wrapper wrapper">
    <el-carousel class="my-carousel" :interval="3000" arrow="always">
      <el-carousel-item class="my-carousle-item" v-for="(item,index) in imgs" :key="index">
        <img class="my-carousel-item__img" :src="item.src" alt="">
      </el-carousel-item>
    </el-carousel>
    <section class="card-list">
      <section v-for="(item,index) in list" :key="index" class="card-list-item">
        <p class="list-item__title">
          <span class="list-item__tips">{{item.title}}</span>
          <span class="list-item__links" @click="jump2List(item)" >更多>></span>
        </p>
        <section class="list-item__img_box">
          <img class="list-item__img" :src="item.img" alt="">
        </section>
        <section @click="jump2other(item)" v-if="item.detail" class="list-item_detail">
          <p class="list-item__detail__title">{{item.subTitle}}</p>
          {{item.detail}}
        </section>
        <ul v-else class="list-item__list">
          <li @click="jump2other(item,list)" class="list-item__list_links" v-for="(list,lidx) in item.list">{{list.label}}</li>
        </ul>
      </section>
      <section class="card-list-item"></section>
    </section>
  </section>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: '',

  data () {
    return {
      imgs:[
        {
          label:'logo1',
          pic:require('../../assets/img/cousrou1.png'),
        },
        {
          label:'logo2',
          pic:require('../../assets/img/cousrou1.png'),
        },
      ],
      list:[
        {
          title:'实验设备',
          img:require('../../assets/img/cousrou1.png'),
          detail:'this is a test cotnent',
          subTitle:'AAA',
        },
        {
          title:'教师风采',
          img:require('../../assets/img/cousrou1.png'),
          detail:'this is a test cotnent',
        },
        {
          title:'通知公告',
          img:require('../../assets/img/cousrou1.png'),
          list:[]
        },
        {
          title:'实验体系',
          img:require('../../assets/img/cousrou1.png'),
          detail:'this is a test cotnent',
        },
        {
          title:'教学资源',
          img:require('../../assets/img/cousrou1.png'),
          detail:'this is a test cotnent',
        },
      ],
      temp_list:[]
    }
  },
  computed:{
    ...mapState({
      'info': state => state.Home.data
    })
  },
  methods: {
    ...mapActions({
      'getHomeInfo':'getHomeInfo'
    }),
    jump2other(item,list){
      let _url = '', search = {}
      if(item.title === '实验设备'){
        _url = '/eq/detail'
        search = {id: item.id}
      }else if(item.title === '教师风采'){
        _url = '/notice/teacher/detail'
        search = {id: item.id}
      }else if(item.title === '实验体系'){
        _url = '/stream/detail'
        search = {id: item.id}
      }else if(item.title === '通知公告'){
        _url = '/notice/detail'
        search = {id: list.id}
      }else if(item.title === '教学资源'){
        _url = '/source/detail'
        search = {id: item.id}
      }
      this.$router.push({path: _url, query:search})
    },
    jump2List(item){
      switch(item.title){
        case '实验设备' : return this.$router.push({path: '/list'})
        case '实验体系' : return this.$router.push({path: '/list/stream'})
        case '教学资源' : return this.$router.push({path: '/list/source'})
        case '教师风采' : return this.$router.push({path: '/teacher'}) 
        case '通知公告' : return this.$router.push({path: '/notice/list'})
      }
      
    }
  },
  created(){
    this.getHomeInfo().then(res => {
      (res.banner) && (this.imgs = res.banner.map(item => {
        return {...item, src: $img + '/' + item.pic}
      }))
      this.list[0] = {
        title:'实验设备',
        img: $img + '/Img/' + res.eq.img,
        detail: res.eq.yongtu,
        subTitle: res.eq.title,
        id:res.eq.id
      }
      this.list[1] = {
        title:'教师风采',
        img: $img + '/Img/' + res.sysinfo.pic,
        detail:res.sysinfo.info,
        id: res.sysinfo.id
      }
      this.list[2] = {
        title:'通知公告',
        img:require('../../assets/img/list-1.png'),
        list:res.notice.map(item => {
          return {...item, label: `[${item.pubtime}]${item.title}`}
        })
      }
      this.list[3] = {
        title:'实验体系',
        img:$img + '/Img/' + res.exp.img,
        detail:res.exp.title,
        id: res.exp.id
      }
      this.list[4] = {
        title:'教学资源',
        img: $img + res.video.pic,
        detail:res.video.title,
        id: res.video.id
      }
    })
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/base-cl.scss';
@import '../../assets/style/mixin.scss';
.index-wrapper{
  .my-carousel{
    width: 100%;
    height: 400px;
    margin-bottom: 30px;
    overflow: hidden;
    .my-carousel-item__img{
      width: 100%;
      height: 100%;
    }
  }
  .card-list{
    @include flex-box(row, wrap, space-between, flex-start);
    .card-list-item{
      width: 30%;
      margin-bottom: 15px;
      .list-item__title{
        @include flex-box(row, nowrap, space-between, center);
        padding-top:10px;
        padding-bottom: 20px;
        color: $base;
        border-top:5px solid $base;
        .list-item__tips{
          font-weight: 600;
        }
        .list-item__links{
          &:hover{
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
      .list-item__img_box{
        width: 100%;
        height: 160px;
        overflow: hidden;
        .list-item__img{
          width: 100%;
          height: 160px;
        }
      }

      .list-item_detail{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:4;
        max-height:120px;
        overflow: hidden;
        &:hover{
          cursor: pointer;
        }
      }
      .list-item__list_links{
        height: 30px;
        line-height: 30px;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: 1px dashed #ccc;
        overflow: hidden;
        &:hover{
          cursor: pointer;
        }
      }
    }
  }
}
</style>
