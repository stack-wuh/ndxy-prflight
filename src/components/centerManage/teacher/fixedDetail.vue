<template>
  <section class="wrapper">
    <section class="content-wrapper">
      <ul>
        <li class="list-item">
          <span class="item__title">设备编号:</span>
          <span class="item__detail">{{info.bianhao}}</span>
        </li>
        <li class="list-item">
          <span class="item__title">设备型号:</span>
          <span class="item__detail">{{info.xinghao}}</span>
        </li>
        <li class="list-item">
          <span class="item__title">设备名称:</span>
          <span class="item__detail">{{info.name}}</span>
        </li>
        <li class="list-item">
          <span class="item__title">设备位置:</span>
          <span class="item__detail">{{info.location_str}}</span>
        </li>
        <li class="list-item">
          <span class="item__title">报修日期:</span>
          <span class="item__detail">{{info.datetime}}</span>
        </li>
        <li class="list-item">
          <span class="item__title">报修原因:</span>
          <span class="item__detail">{{info.reason}}</span>
        </li>
        <li class="list-item">
          <span class="item__title">状态:</span>
          <span class="item__detail" :class="[info.status == 0 ? 'unpass' : 'pass']">{{info.status_str}}</span>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  
  name: '',

  data () {
    return {
    }
  },
  computed:{
    ...mapState({
      'info': state => state.Tea.info
    })
  },
  methods: {
    ...mapActions({
      'getFixedDetailOne':'getWareFixedDetailOne'
    })
  },
  created(){
    let id = this.$route.params.id
    this.getFixedDetailOne({id})
  }
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/mixin.scss';
@import '@/assets/style/base-cl.scss';
.content-wrapper{
  width: 80%;
  margin:0 auto;
  .list-item{
    @include flex-box(row, nowrap, space-between, center);
    padding: 10px;
    border-bottom: 1px solid #eee;
    .item__title{
      min-width: 90px;
    }
    .item__detail{
    }
  }
  .pass{
    color: $base;
  }
  .unpass{
    color: $danger;
  }
}
</style>
