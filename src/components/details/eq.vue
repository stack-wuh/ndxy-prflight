<template>
  <section class="wrapper eq-detail">
    <!-- 实验设备详情 -->
    <section v-if="$route.path === '/eq/detail'">
      <section class="header">
        <section class="img-box">
          <img class="img-box__img" :src="info.img" alt="">
        </section>
        <section class="header-middle">
          <h3 class="header-middle__title">{{info.data && info.data.title}}</h3>
          <p>位置:{{info.data && info.data.location_str}}</p>
          <p>实验方向:{{info.data && info.data.major_str}}</p>
          <p>设备型号:{{info.data && info.data.xinghao}}</p>
        </section>
        <section class="header-right">
          <p>生产厂家:{{info.data && info.data.changjia}}</p>
          <p>购置时间:{{info.data && info.data.time}}</p>
          <p>设备主管:{{info.data && info.data.zhuguan}}</p>
          <p>联系人:{{info.data && info.data.concat}}</p>
          <p>联系方式:{{info.data && info.data.phone}}</p>
        </section>
      </section>
      <el-tabs type="border-card">
        <el-tab-pane label="原理">{{info.data && info.data.yuanli}}</el-tab-pane>
        <el-tab-pane label="主要用途"> 
          <article v-html="info.data && info.data.yongtu" ></article>
        </el-tab-pane>
        <el-tab-pane label="维修记录">{{info.data && info.data.weixiu}}</el-tab-pane>
      </el-tabs>
      <section class="btn-area">
          <el-button :disabled="info.data && info.data.doc ? false : true" @click="handleClickDown" >{{info.data && info.data.doc ? '下载指导书' : '没有指导书'}}</el-button>
      </section>
    </section>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: '',

  data () {
    return {
      info:{}
    }
  },
  computed:{
    changePath(){
      return this.$route.path
    }
  },
  methods: {
    ...mapActions({
      'getEqOneDetail':'getEqOneDetail',
      '':''
    }),
    handleClickDown(){
      window.location.href = `http://192.168.10.119/ndxy/public/Doc/${this.info.data.doc}`
    }
  },
  created(){
    switch(this.changePath){
      case '/eq/detail' : return  this.getEqOneDetail({id: this.$route.query.id}).then(res => {
                                  this.info = res
                                  this.info.img = $img + '/Img/' + res.data.img
                                })
      case '/sys/detail' : return 
    }

  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/mixin.scss';
.eq-detail{
  .header{
    @include flex-box(row, nowrap, flex-start, flex-start);
    padding: 20px;
    font-size: 14px;
    .img-box{
      width: 130px;
      height: 100px;
      margin-right: 30px;
      overflow: hidden;
      .img-box__img{
        width: 100%;
        height: 100%;
      }
    }
    .header-middle{
      flex:.6;
      .header-middle__title{
        margin-bottom: 20px;
      }
    }
  }
  .btn-area{
    margin-top:20px;
    text-align:center;
  }
}
</style>
<style scoped>
article{
  font-size: 16px;
}
article >>> p{
  margin-bottom: 15px;
}
</style>