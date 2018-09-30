<template>
  <section class="wrapper notice-wrapper">
      <section class="notice-detail">
        <h3 class="notice__title">this is title</h3>
        <time class="notice__time">发布时间: this is time</time>
        <article class="notice__article">this is article</article>
      </section>
  </section>
</template>

<script>
export default {
  name: '',

  data () {
    return {
    }
  },

  methods: {}
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
