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
    let type = window.$store.state.Sign.type
    next(vm => {
     if(type === 1){
       vm.$router.push({path: '/center/baseInfo'})
     }else {
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
      width:220px;
    }
    .right-wrapper{
      flex:1;
      margin-left: 20px;
    }
  }
}
</style>
