<template>
  <section v-loading="isShowloading" class="wrapper_content home_wrapper">
    <my-header class="my-header" ></my-header>
    <router-view  class="my-body"></router-view>
    <my-footer class="my-footer"></my-footer>
  </section>
</template>

<script>
import MyHeader from '@/components/navs/header'
import MyFooter from '@/components/navs/footer'
import {mapState} from 'vuex'
export default {
  name: 'home',
  components:{
    MyHeader,
    MyFooter,
  },
  data () {
    return {
    }
  },
  computed:{
    ...mapState({
      'isShowloading':'isShowloading'
    })
  },
  methods: {},

}
</script>

<style scoped lang='scss' >
.home_wrapper{
  display: flex;
  flex-flow: column nowrap;
  .my-header{
    height: 115px;
  }
  .my-footer{
    height: 80px;
  }
  .my-body{
    flex:1;
    padding:0 15%;
    overflow-y: scroll;
    &::-webkit-scrollbar{
      width: 4px;
      height: 4px;
    }
    &::-webkit-scrollbar-thumb{
      border-radius: 5px;
      -webkit-box-shadow:inset 0 0 5px rgba(0,0,0,.2);
      background-color:rgba(0,0,0,.2);
    }
  }
}
</style>
