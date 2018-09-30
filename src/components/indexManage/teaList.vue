<template>
  <section class="wrapper teacher-wrapper">
    <section class="teacher-list">
      <section @click="jump2detail(item)" v-for="(item,index) in data" :key="index" class="teacher-item">
        <img :src="item.img || baseImg" alt="logo">
        <span>{{item.name}}</span>
      </section>
    </section>
  </section>
</template>

<script>
import {mapActions, mapState} from 'vuex';
export default {
  name: '',

  data () {
    return {
      baseImg:require('../../assets/img/list-2.png')
    }
  },
  computed:{
    ...mapState({
      data: state => state.Tea.data.map(item => {
        return {...item, img: item.img ? $img + '/Img/' + item.img : ''}
      })
    })
  },
  methods: {
    ...mapActions({
      'getTeaConcats':'getTeaConcats'
    }),
    jump2detail(item){
      this.$router.push({path:'/teacherone/detail/tea', query:{info: JSON.stringify(item)}})
    }
  },
  created(){
    this.getTeaConcats()
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/mixin.scss';
.teacher-wrapper{
  .teacher-list{
    @include flex-box(row, wrap, flex-start, center);
    padding:20px 0;
    .teacher-item{
      @include flex-box(column, wrap, flex-start, center);
      width: 16%;
      margin-bottom: 15px;
      &:hover{
        cursor: pointer;
      }
    }
  }
}
</style>
