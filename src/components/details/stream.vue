<template>
  <section class="wrapper stream-wrapper">
    <section class="stream-detail">
      <header class="stream-header">
        <section class="img-box">
          <img class="img-box__img" :src="info.data && info.data.img" alt="avatar">
        </section>
        <section class="stream-desc">
          <h3 class="stream-desc__title">{{info.data && info.data.title}}</h3>
          <p class="stream-desc__list">体系分类: {{info.data && info.data.type_str}}</p>
          <p class="stream-desc__list">难度系数: <el-rate :colors="['']" disabled v-model="level" ></el-rate></p>
          <p class="stream-desc__list">实验耗时: {{info.data && info.data.need_time_str}}</p>
          <p class="stream-desc__list">专业方向: {{info.data && info.data.major_str}}</p>
        </section>
      </header>
      <el-tabs type="border-card">
        <el-tab-pane label="实现目的">
          <article v-html="info.data && info.data.mudi"></article>
        </el-tab-pane>
        <el-tab-pane label="实验原理"> 
          <article v-html="info.data && info.data.yongtu" ></article>
        </el-tab-pane>
        <el-tab-pane label="实验器材">
          <article v-html="info.data && info.data.qicai"></article>
        </el-tab-pane>
        <el-tab-pane label="实验过程">
          <article v-html="info.data && info.data.guocheng"></article>
        </el-tab-pane>
        <el-tab-pane label="数据处理">
          <article v-html="info.data && info.data.shuju"></article>
        </el-tab-pane>
        <el-tab-pane label="参考资料">
          <article v-html="info.data && info.data.cankao"></article>
        </el-tab-pane>
        <el-tab-pane label="思考题">
          <article v-html="info.data && info.data.sikao"></article>
        </el-tab-pane>
      </el-tabs>
    </section>
    <section class="btn-area">
      <el-button @click="handleClickDown" :disabled="info.data && info.data.doc ? false : true">下载指导书</el-button>
    </section>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: '',

  data () {
    return {
      info:{},
      level:0
    }
  },

  methods: {
    ...mapActions({
      'getStreamOne':'getStreamOne'
    }),
    handleClickDown(){
      window.location.href = `http://192.168.10.119/ndxy/public/Doc/${this.info.data.doc}`
    }
  },
  created(){  
    this.getStreamOne({id: this.$route.query.id}).then(res => {
      this.info = res
      this.info.data.img = $img + '/Img/' + res.data.img
      this.level = Number.parseInt(this.info.data.level,10)
    })
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/mixin.scss';
.stream-wrapper{
  .stream-detail{
    header.stream-header{
      @include flex-box(row, nowrap, flex-start, flex-start);
      padding:20px;
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
      .stream-desc{
        font-size: 14px;
        .stream-desc__title{
          font-size: 16px;
          margin-bottom: 20px;
        }
        .stream-desc__list{
          @include flex-box;
        }
      }
    }
  }
  .btn-area{
    margin-top:20px;
    text-align: center;
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
