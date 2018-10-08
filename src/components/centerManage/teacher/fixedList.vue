<template>
  <section class="wrapper">
    <section class="list-wrapper">
      <section v-for="(item,index) in formatFixedList" @click="jump2other(item)" class="item-wrapper">
        <section class="img-box">
          <img class="img__avatar" :src="item.avatar || '../../../assets/img/list-2.png'" alt="avatar">
        </section>
        <section class="right-content">
          <ul>
            <li class="right__item">
              <section class="right__item__box">
                <span class="right__title">设备编号: </span>
                <span class="right__sub">{{item.bianhao}}</span>
              </section>
              <section class="right__item__box">
                <span class="right__title">设备型号: </span>
                <span class="right__sub">{{item.xinghao}}</span>
              </section>
            </li>
            <li class="right__item">
              <section class="right__item__box">
                <span class="right__title">设备名称: </span>
                <span class="right__sub">{{item.name}}</span>
              </section>
              <section class="right__item__box">
                <span class="right__title">设备位置: </span>
                <span class="right__sub">{{item.location_str}}</span>
              </section>
            </li>
          </ul>
        </section>
        <section class="tips" :class="[item.status == 0 ? 'tips__unpass' : 'tips__pass']">
          <span class="tips__title">{{item.status_str}}</span>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: '',

  data () {
    return {
    }
  },
  computed:{
    ...mapState({
      'data': state => state.Tea.data
    }),
    ...mapGetters({
      'formatFixedList':'formatFixedList'
    },)
  },
  methods: {
    ...mapActions({
      'getWareFixedList':'getWareFixedList'
    }),
    jump2other(item){
      this.$router.push({path: '/center/seafixedDetail/tea/' + item.id})
    }
  },
  created(){
    this.getWareFixedList()
  }
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/mixin.scss';
@import '@/assets/style/base-cl.scss';
.list-wrapper{
  .item-wrapper{
    position: relative;
    @include flex-box(row, nowrap, flex-start, flex-start);
    padding: 15px 10px;
    margin-bottom: 15px;
    border:1px solid #eee;
    .img-box{
      width: 120px;
      height: 70px;
      overflow: hidden;
      .img__avatar{
        width: 100%;
        height: 100%;
      }
    }
    .right-content{
      flex:1;
      margin-left: 20px;
      font-size: 14px;
      color: #999;
      .right__item{
        @include flex-box(row, nowrap, flex-start, flex-start);
        .right__item__box{
          flex:1;
        }
        .right__sub{
          margin-left: 10px;
          margin-right: 20%;
          color: #333;
          font-size: 15px;
        }
      }
    }
    &:hover{
      cursor: pointer;
      border:1px solid $base;
    }
    .tips{
      position: absolute;
      top:0;
      right:40px;
      width: 80px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border:1px solid #eee;
      border-top:none;
    }
    .tips__pass{
      color: $base;
    }
    .tips__unpass{
      color: $danger;
    }
  }
}
</style>
