<template>
  <section class="wrapper footer-wrapper">
    <p class="footer-wrapper__title">武汉理工大学能源与动力学院 ©2016 版权所有</p>
    <p class="footer-wrapper__title">通讯地址: 湖北省武汉市和平大道1040号 邮编: 430063</p>
    <p class="footer-wrapper__title">联系电话: 027-86582019 (党办) 027-86581997(院办)</p>
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
.footer-wrapper{
  background-color: #2D3E50;
  z-index: 10000; 
  @include flex-box(column, wrap, center, center);
  .footer-wrapper__title{
    font-size: 14px;
    color: #999;
  }
}
</style>
