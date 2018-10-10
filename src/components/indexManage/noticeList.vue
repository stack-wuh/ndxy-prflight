<template>
  <section class="notices notices-wrapper">
    <section class="notices-list">
      <ul class="list-ul">
        <li @click="jump2other(item)" class="list-li__item" v-for="(item,index) in list" :key="index">
          [{{item.pubtime}}] {{item.title}}
        </li>
      </ul>
      <my-bottom :total="total" @getCurrPage="getCurrPage" />
    </section>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
import MyBottom from '@/components/common/bottom'
export default {
  name: '',
  components:{
    MyBottom
  },
  data () {
    return {
      list:[],
      total:0
    }
  },

  methods: {
    ...mapActions({
      'getNoticeList':'getNoticeList'
    }),
    fetchData({num = 24, page = 1}){
      this.getNoticeList({num, page}).then(res => {
        this.list = res.data.list
        this.total = Number(res.data.total)
      })
    },
    getCurrPage(e){
      this.fetchData({num: 24, page: e})
    },
    jump2other(item){
      this.$router.push({path: '/notice/detail', query: {id: item.id}})
    }
  },
  created(){
    this.fetchData({num: 24, page: 1})
  }
}
</script>

<style scoped lang='scss' >
.notices{
  background-color: #F7F7F7;
  .notices-list{
    padding:20px 0;
    .list-ul{
      .list-li__item{
        height: 60px;
        line-height: 60px;
        margin-bottom: 15px;
        padding-left:20px;
        border-radius: 4px;
        box-shadow: 0 2px 2px #ccc;
        background-color: #fff;

        &:hover{
          margin-left: 10px;
          margin-top:5px;
          cursor: pointer;
          transition: all .5s linear;
        }
      }
    }
  }
}
</style>
