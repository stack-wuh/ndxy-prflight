<template>
  <section class="teachers-wrapper wrapper">
    <section class="tea-list">
      <section v-for="(item,index) in data" :key="index" class="tea-item">
        <p class="tea-item__name">{{item.name}} <span v-if="item.level">({{item.level}})</span></p>
        <p class="tea-item__phone">手机: {{item.phone}}</p>
        <p class="tea-item__email">邮箱: {{item.email}}</p>
      </section>
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
      'data': state => state.Tea.data
    })
  },
  methods: {
    ...mapActions({
      'getTeaConcats':'getTeaConcats'
    })
  },
  created(){
    this.getTeaConcats()
  }
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/mixin.scss';
.teachers-wrapper{
  .tea-list{
    @include flex-box(column, wrap, flex-start, flex-start);
    width: 100%;
    margin-bottom: 30px;
    .tea-item{
      @include flex-box(row, nowrap, flex-start, center);
      width: 100%;
      height: 40px;
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
      .tea-item__name{
        width:24%;
        margin-right: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tea-item__phone{
        width: 40%;
        margin-right: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .tea-item__email{
        width: 40%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    &:last-of-type{
      border:none;
    }
  }
}
</style>
