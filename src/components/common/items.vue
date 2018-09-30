<template>
  <section class="wrapper items-wrapper">
      <section class="list-wrapper">
        <section @click="jump2other(item)" class="item-wrapper item-wrapper__active"  v-for="(item,index) in data" :key="index">
          <img class="item-wrapper__img" :src="item.url" alt="logo">
          <p class="item-wrapper__detail">{{item.detail}}</p>
        </section>
      </section>
  </section>
</template>

<script>
export default {
  name: 'items',
  props:{
    data:{
      type:Array,
      default:[],
      required: true
    }
  },

  data () {
    return {
    }
  },
  computed:{
    changePath(){
      return this.$route.path
    }
  },
  methods: {
    jump2other(item){
      let _path = ''
      switch(this.changePath){
        case '/list' : return this.$router.push({path: 'eq/detail', query:{id: item.id}})
        case '/list/stream': return this.$router.push({path: '/stream/detail', query:{id: item.id}})
        case '/list/source' : return this.$router.push({path: '/source/detail', query:{id: item.id}})
      }    
    }
  },
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/mixin.scss';
.list-wrapper{
  @include flex-box(row, wrap, flex-start, center);
  .item-wrapper{
    width: 14%;
    margin-bottom: 30px;
    .item-wrapper__img{
      width: 100%;
      height: 80px;
    }
    .item-wrapper__detail{
      height:40px;
    }
    &:hover{
      cursor: pointer;
    }
  }
  .item-wrapper__active{
    margin-right: 25px;
  }
}
</style>
