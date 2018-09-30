<template>
  <section class="tea-one-wrapper">
    <section class="tea-one-detail">
      <header class="tea-one-header">
        <section class="img-box">
          <img class="img-box__avatar" :src="info.img || baseImg" alt="avatar">
        </section>
        <section class="tea-one-right">
          <h4 class="one-right__name">{{info.name}}</h4>
          <p class="one-right__port">职称: {{info.level}}</p>
          <p class="one-right__port">邮箱: {{info.email}}</p>
        </section>
      </header>
    </section>
    <el-tabs type="border-card">
      <el-tab-pane label="老师简介">{{info.info}}</el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      info:{},
      baseImg:require('../../assets/img/list-2.png')
    }
  },

  methods: {},
  created(){
    let data = this.$route.query.info
    this.info = data && JSON.parse(data)
    console.log(this.info)
  },
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/mixin.scss';
.tea-one-wrapper{
  .tea-one-detail{
    header.tea-one-header{
      @include flex-box;
      margin-bottom: 15px;
      margin-top:20px;
      .img-box{
        width: 120px;
        height: 140px;
        margin-right: 15px;
        overflow: hidden;
        .img-box__avatar{
          width: 100%;
          height: 100%;
        }
      }
      .tea-one-right{
        @include flex-box(column, wrap, flex-start, flex-start);
        .one-right__name{
          margin-bottom: 20px;
          font-size: 16px;
        }
        .one-right__port{
          height: 20px;
          line-height: 20px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
