<template>
  <section class="wrapper teacher-wrapper">
    <section class="teacher-list">
      <section v-for="(item,index) in 40" :key="index" class="teacher-item">
        <img :src="baseImg" alt="logo">
        <span>陈劲松</span>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      baseImg:require('../../assets/img/list-2.png')
    }
  },

  methods: {}
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/mixin.scss';
.teacher-wrapper{
  .teacher-list{
    @include flex-box(row, wrap, flex-start, center);
    padding:20px 0;
    .teacher-item{
      @include flex-box(column, wrap, flex-start, center);
      width: 16%;
      margin-bottom: 15px;
      &:hover{
        cursor: pointer;
      }
    }
  }
}
</style>
