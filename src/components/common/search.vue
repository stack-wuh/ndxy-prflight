<template>
  <section class="wrapper search-wrapper">
    <!-- {{formatSearchSelect({path: changePath})}} -->
    <section v-if="formatSearchSelect({path: changePath})" class="search-list">
       <section class="search-item" v-for="(item,index) in formatSearchSelect({path: changePath})" :key="index">
         <el-select clearable @change="handleChange" v-model="searchList[item.prop]" v-if="item.type == 'select'" :placeholder="'请选择' + item.key">
           <span v-if="item.list" v-for="(ss, sid) in item.list" :key="sid">
             <el-option :label="ss.label" :value="ss.value" ></el-option>
           </span>
         </el-select>
       </section>
    </section>
  </section>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex'
export default {
  name: '',

  data () {
    return {
    }
  },
  computed:{
    ...mapGetters({
      'formatSearchList':'formatSearchList',
      'formatSearchSelect':'formatSearchSelect'
    }),
    ...mapState({
      'searchList': state => state.search
    }),
    changePath(){
      return this.$route.path
    }
  },
  methods: {
    ...mapActions({
      'getTestInfo':'getTestInfo',
      'getPrevOrder':'getPrevOrder'
    }),
    handleChange(e){
      this.fetchData()
    },
    fetchData(){
      switch(this.changePath){
        case '/center/test' : this.getTestInfo()
        case '/center/ware' : this.getPrevOrder()
      }
    }
  }
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/mixin.scss';
.search-wrapper{
  .search-list{
    @include flex-box;
    margin-bottom: 20px;
    .search-item{
      margin-right: 15px;
    }
  }
}
</style>
