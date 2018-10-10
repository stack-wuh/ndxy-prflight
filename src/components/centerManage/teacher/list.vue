<template>
  <section class="wrapper">
      <section v-for="(item,index) in data" :key="index" class="list-wrapper">
        <section @click="jump2detail(item)" class="list-wrapper-item">
          <section class="img-box">
            <img class="img-box__avatar" :src="item.img" alt="avatar">
          </section>
          <section v-if="path === '/center/seatest/tea'" class="right-content">
            <h4 class="right-content__title">{{item.title}}</h4>
            <p class="right-content__time">实验时间: {{item.exp_dotime}} <span v-if="item.left">{{item.left}}</span> </p>
            <p class="right-content__number">预约人数： {{item.prev}}</p>
          </section>
          <section  v-if="path === '/center/seaware/tea'" class="right-content">
            <h4 class="right-content__title">{{item.title}} <span class="right-content__tips">预约人数: {{item.has}}/{{item.all}}</span> </h4>
            <p class="right-content__time">实验时间: {{item.exp_dotime}} <span v-if="item.left">{{item.left}}</span> </p>
            <p class="right-content__number">实验位置： {{item.location_str}}</p>
          </section>
        </section>
      </section>
      <my-bottom :pageSize="10" :total="total" @getCurrPage="getCurrPage" />
  </section>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import MyBottom from '@/components/common/bottom'
export default {
  name: '',
  components:{
    MyBottom,
  },
  data () {
    return {
      data:[],
      total:0
    }
  },
  computed:{
    path(){
      return this.$route.path
    },
  },
  watch:{
    path(){
      this.fetchData()
    }
  },
  methods: {
    ...mapActions({
      'seaTestForTea':'seaTestForTea',
      'seaWareForTea':'seaWareForTea',
      'getWareFixedList':'getWareFixedList'
    }),
    fetchData({num = 10, page = 1} = {}){
      switch(this.path){
        case '/center/seatest/tea' : return this.seaTestForTea({num, page})
                                                  .then(res => {
                                                    this.data = res.data && res.data.list.map(item => {
                                                      return {...item, img: $img + '/Img/' + item.img}
                                                    })
                                                    this.total = Number(res.data.total)
                                                  })
        case '/center/seaware/tea' : return this.seaWareForTea({num, page})
                                                  .then(res => {
                                                    this.data = res.data && res.data.list.map(item => {
                                                      return {...item, img: $img + '/Img/' + item.img}
                                                    })
                                                    this.total = Number(res.data.total)
                                                  })
        // case '/center/seafixed/tea' : return this.getWareFixedList()
        //                                           .then(res => {
        //                                             this.data = res.data && res.data.map(item => {
        //                                               return {...item, img: $img + '/Img/' + item.img}
        //                                             })
        //                                           })
      }
    },
    jump2detail(item){
      let _path = this.path === '/center/seatest/tea' ? '/list/details/tea' : '/list/details/ware/tea'
      this.$router.push({path: _path, query:{id: item.id, info: JSON.stringify(item)}})
    },
    getCurrPage(e){
      this.fetchData({num: 10, page: e})
    }
  },
  created(){
    this.fetchData()
  }
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/mixin.scss';
@import '@/assets/style/base-cl.scss';
.wrapper{
  .list-wrapper{
    @include flex-box;
    margin-bottom: 15px;
    border:1px solid #eee;
    &:hover{
      border:1px solid $base;
      cursor: pointer;
    }
    .list-wrapper-item{
      @include flex-box(row, nowrap, flex-start, center);
      width: 100%;
      padding:20px;
      border-radius: 4px;
      .img-box{
        width:120px;
        height:70px;
        overflow: hidden;
        .img-box__avatar{
          width: 100%;
          height:100%;
        }
      }
      .right-content{
        width: 100%;
        margin-left: 20px;
        .right-content__title{
          font-size: 16px;
          font-weight: normal;
          margin-bottom: 15px;
          .right-content__tips{
            margin-left:10%;
            font-size: 14px;
            color: #999;
          }
        }
        .right-content__time{
          font-size: 14px;
          color: #999;
        }
        .right-content__number{
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
}
</style>
