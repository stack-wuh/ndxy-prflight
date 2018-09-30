<template>
  <section class="wrapper source-wrapper">
      <section class="source-body">
        <h3 class="source-body__title">{{info.title}}</h3>
        <section class="video-box">
          <video v-on:play="play" v-on:error="error" preload controls width="100%" height="400px" >
            <source :src="info.data && info.data.src"  type="video/mp4">
            对不起;您的浏览器不支持HTML5视频MP4</source>
          </video>
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
      info:{},
    }
  },

  methods: {
    ...mapActions({
      'getSourceOne':'getSourceOne'
    }),
    play(){
      console.log('is ok')
    },
    error(){
      console.log('is error')
    }
  },
  created(){
    this.getSourceOne({id: this.$route.query.id}).then(res => {
      this.info = res
      this.info.data.src = $img + this.info.data.src
    })
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/base-cl.scss';
.source-wrapper{
  .source-body{
    padding:20px 0;
    .source-body__title{
      font-size: 18px;
      color: $base;
    }
    .video-box{
      position: relative;
      margin-top:20px;
      border:1px solid #000;
    }
  }
}
</style>
