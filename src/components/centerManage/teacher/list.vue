<template>
  <section class="wrapper">
      <section class="list-wrapper">
        <section class="list-wrapper-item">
          <section class="img-box">
            <img class="img-box__avatar" src="" alt="">
          </section>
          <section class="right-content">
            <h4 class="right-content__title">this is title</h4>
            <p class="right-content__time">实验时间: 11</p>
            <p class="right-content__number">预约人数： 1/1</p>
          </section>
        </section>
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
@import '@/assets/style/mixin.scss';
@import '@/assets/style/base-cl.scss';
.wrapper{
  .list-wrapper{
    @include flex-box;
    border:1px solid #eee;
    &:hover{
      border:1px solid $base;
    }
    .list-wrapper-item{
      @include flex-box(row, nowrap, flex-start, center);
      padding:20px;
      border-radius: 4px;
      .right-content{
        margin-left: 20px;
        .right-content__title{
          font-size: 16px;
          font-weight: normal;
          margin-bottom: 15px;
        }
        .right-content__time{
          font-size: 14px;
        }
        .right-content__number{
          font-size: 14px;
        }
      }
    }
  }
}
</style>
