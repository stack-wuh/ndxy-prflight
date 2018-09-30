<template>
  <section class="wrapper">
    <section class="nav-wrapper">
      <section v-for="(item,index) in list" :key="index" class="nav-wrapper-list">
        <small class="nav-wrapper-list__title">{{item.label}}</small>
        <span @click="handleClickChange(index,lidx,item,list)" :class="[list.isActive ? 'nav-wrapper-list__item__active' : '']" class="nav-wrapper-list__item" v-for="(list, lidx) in item.list" :key="lidx">{{list.label}}</span>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: 'navs',
  props:{
    list:{
      require: true,
      type:Array,
      default:[]
    }
  },
  data () {
    return {
      currIndex:0,
      currSubIndex:0
    }
  },
  watch:{
    '$route'(){
      this.currIndex = 0
      this.currSubIndex = 0
    }
  },
  methods: {
    handleClickChange(index,lidx, item, list){
      let search = {}
      this.list[index].list.map((ii,iid) => {
        this.$set(this.list[index].list[lidx],'isActive', true)
        if(iid !== lidx){
          this.$set(this.list[index].list[iid], 'isActive', false)
        }
      })
      switch(this.$route.path){
        case '/list' : search = {type: list.type}
              break;
        case '/list/stream' : this.list.map(item =>{
          let _obj = item.list.find(ss => ss.isActive)
          search[item.keys] = _obj.type
        })
              break;
        case '/list/source' : search = {type: list.type}
            break;
      }
      this.$emit('getTypeChange',search)
    }
  },
  created(){

  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/base-cl.scss';
.nav-wrapper{
  padding:20px;
  padding-bottom: 10px;
  border:1px solid #eee;
  .nav-wrapper-list{
    height: 40px;
    .nav-wrapper-list__title{
      margin-right: 20px;
      color: #ccc;
      font-size: 15px;
    }
    .nav-wrapper-list__item{
      margin-right: 15px;
      padding:2px 4px;
      &:hover{
        cursor: pointer;
      }
    }
    .nav-wrapper-list__item__active{
      background-color: $base;
      color: #fff;
      border-radius: 3px;
    }
  }
}
</style>
