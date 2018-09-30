<template>
  <section class="wrapper details-wrapper">
    <section class="details-list">
      <section class="details-item">
        <span class="item__title">实验名称</span>
        <span class="item__desc">{{info.title}}<span v-if="info.type_str">({{info.type_str}})</span></span>
      </section>
      <section class="details-item">
        <span class="item__title">实验位置</span>
        <span class="item__desc">{{info.location_str}}</span>
      </section>
      <section class="details-item">
        <span class="item__title">每台人数</span>
        <span class="item__desc">{{info.each_count}}</span>
      </section>
      <section class="details-item">
        <span class="item__title">设备数量</span>
        <span class="item__desc">{{info.eq_count}}</span>
      </section>
      <section class="details-item">
        <span class="item__title">需要时间</span>
        <span class="item__desc">{{info.need_time_str}}</span>
      </section>
      <section class="details-item">
        <span class="item__title">实验老师</span>
        <span class="item__desc">{{info.teacher}}</span>
      </section>
      <section class="details-item">
        <span class="item__title">实验时间</span>
        <span class="item__desc">{{info.location_str}}</span>
      </section>
      <section class="details-item">
        <span class="item__title"></span>
        <span class="item__desc">{{info.left}}</span>
      </section>
    </section>
    <section @click="jump2other" class="type-area">
      <span>查看预约名单</span>
      <span class="my-icon-more"></span>
    </section>
    <section class="btn-area">
      <el-button>取消实验</el-button>
    </section>
  </section>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      info:{}
    }
  },

  methods: {
    jump2other(){
      this.$router.push({path: '/stu/order/tea'})
    }
  },
  created(){
    this.info = this.$route.query.info ? JSON.parse(this.$route.query.info) : {}
  }
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/base-cl.scss';
@import '@/assets/style/mixin.scss';
.details-wrapper{
  .details-list{
    width: 80%;
    margin:0 auto;
    .details-item{
      @include flex-box(row, nowrap, space-between, center);
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
    }
    .details-item:last-of-type{
      border:none;
    }
  }
  .type-area{
    @include flex-box(row, nowrap, space-between, center);
    width: 80%;
    margin: 0 auto;
    margin-top:15px;
    padding:15px;
    box-sizing: border-box;
    border:1px solid #eee;
    color:$base;
    .my-icon-more{
      color: $base;
    }
    &:hover{
      cursor: pointer;
      background-color: #eee;
      transition: all .5s linear;
    }
  }
  .btn-area{
    margin-top:15px;
    text-align: center;
  }
}
</style>
