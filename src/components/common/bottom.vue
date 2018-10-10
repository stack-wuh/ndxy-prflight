<template>
  <section class="bottom-wrapper">
    <section class="my-bottom__container">
      <el-pagination :total="total" layout="total, prev, pager, next, jumper" @current-change="handleCurrChange" ></el-pagination>
    </section>
  </section>
</template>

<script>
export default {
  name: '',
  props:{
    total:{
      type:Number,
      default:0
    }
  },
  data () {
    return {
    }
  },

  methods: {
    handleCurrChange(e){
      this.$emit('getCurrPage',e)
    }
  }
}
</script>

<style scoped lang='scss' >
.bottom-wrapper{
  .my-bottom__container{
    padding: 20px 0;
    text-align: center;
  }
}
</style>
