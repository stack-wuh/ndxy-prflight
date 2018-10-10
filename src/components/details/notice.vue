<template>
  <section class="wrapper notice-wrapper">
      <section class="notice-detail">
        <h3 class="notice__title">{{info && info.title || '暂无标题'}}</h3>
        <time class="notice__time">发布时间: {{info && info.pubtime || '暂无'}}</time>
        <article class="notice__article" v-html="info && info.content || '暂无' "></article>
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
    path(){
      return this.$route.path
    }
  },
  methods: {
    ...mapActions({
      'getTeacherDetailOne':'getTeacherDetailOne',
      'getNoticeOne':'getNoticeOne'
    }),
    fetchData(){
      switch(this.path){
        case '/notice/teacher/detail' : return this.getTeacherDetailOne()
                                                    .then(res => {
                                                      this.info = {
                                                        title: '教师风采',
                                                        content: res.data.info
                                                      }
                                                    }) 
        case '/notice/detail' : return this.getNoticeOne({id: this.$route.query.id})
                                            .then(res => {
                                              this.info = res.data
                                            }) 
      }
    }
  },
  created(){
    this.fetchData()
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/mixin.scss';
.notice-wrapper{
  .notice-detail{
    margin-top:20px;
    @include flex-box(column, wrap, flex-start, center);
    .notice__title{
      font-size: 16px;
      margin-bottom: 15px;
    }
    .notice__time{
      font-size: 15px;
      color: #666;
      margin-bottom: 15px;
    }
    .notice__article{
      align-self: flex-start;
    }
  }
}
</style>
