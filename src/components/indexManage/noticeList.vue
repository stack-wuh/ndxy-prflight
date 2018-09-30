<template>
  <section class="notices notices-wrapper">
    <section class="notices-list">
      <ul class="list-ul">
        <li class="list-li__item" v-for="(item,index) in 20" :key="index">aaaaaaaaaaaaaa</li>
      </ul>
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
.notices{
  background-color: #F7F7F7;
  .notices-list{
    padding:20px 0;
    .list-ul{
      .list-li__item{
        height: 60px;
        line-height: 60px;
        margin-bottom: 15px;
        padding-left:20px;
        border-radius: 4px;
        box-shadow: 0 2px 2px #ccc;
        background-color: #fff;
      }
    }
  }
}
</style>
