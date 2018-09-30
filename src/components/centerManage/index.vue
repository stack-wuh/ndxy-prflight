<template>
  <section class="wrapper center-wrapper">
    <section class="center-content">
      <section class="left-wrapper">
        <sub-menu></sub-menu>
      </section>
      <router-view class="right-wrapper"/>      
    </section>
  </section>
</template>

<script>
import SubMenu from '@/components/centerManage/subMenu'
import {mapActions} from 'vuex'
export default {
  name: '',
  components:{
    SubMenu,
  },
  data () {
    return {
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let type = vm.$store.state.Sign.type
      if(type === 1){
        vm.$router.push({path: '/center/baseInfo'})
      }else if(type === 2){
        vm.$router.push({path: '/center/pubtest/tea'})
      }
    })
  },
  methods: {
    ...mapActions({
      'getUserInfo':'getUserInfo'
    }),
  },
  created(){
    this.getUserInfo()
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/mixin.scss';
.center-wrapper{
  .center-content{
    @include flex-box(row, nowrap, space-between, flex-start);
    margin-top:20px;
    .left-wrapper{
      position: fixed;
      width:220px;
    }
    .right-wrapper{
      width:calc(100% - 220px);
      margin-left: 240px;
    }
  }
}
</style>
