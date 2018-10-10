<template>
  <section class="wrapper details-wrapper">
    <section class="details-list">
      <section class="details-item">
        <span class="item__title">实验名称</span>
        <span class="item__desc">{{info.title}}<span v-if="info.type_str">({{info.type_str}})</span></span>
      </section>
      <section class="details-item">
        <span class="item__title">实验位置</span>
        <span class="item__desc">{{info.location_str}}</span>
      </section>
      <section class="details-item">
        <span class="item__title">每台人数</span>
        <span class="item__desc">{{info.each_count}}</span>
      </section>
      <section class="details-item">
        <span class="item__title">设备数量</span>
        <span class="item__desc">{{info.eq_count}}</span>
      </section>
      <section class="details-item">
        <span class="item__title">需要时间</span>
        <span class="item__desc">{{info.need_time_str}}</span>
      </section>
      <section class="details-item">
        <span class="item__title">实验老师</span>
        <span class="item__desc">{{info.teacher}}</span>
      </section>
      <section class="details-item">
        <span class="item__title">实验时间</span>
        <span class="item__desc">{{info.location_str}}</span>
      </section>
      <section class="details-item">
        <span class="item__title"></span>
        <span class="item__desc" :class="[info.cancle == 1 ? 'item__desc-error' : '']">{{info.cancle == 0 ? info.left : '已取消'}}</span>
      </section>
    </section>
    <section @click="jump2other" class="type-area">
      <span>查看预约名单</span>
      <span class="my-icon-more"></span>
    </section>
    <section v-if="path === '/list/details/tea'" class="btn-area">
      <el-button v-show="info.cancle == 0" @click="handleClickSubmit" >取消实验</el-button>
    </section>
  </section>
</template>

<script>
import { mapActions} from 'vuex'
export default {
  name: '',

  data () {
    return {
      info:{}
    }
  },
  computed:{
    path(){
      return this.$route.path
    }
  },
  beforeRouteEnter (to, from, next) {
    if(from.path === '/center/seatest/tea' || from.path === '/'){
      next(vm => {
        let _id = JSON.parse(vm.$route.query.info).id
        vm.seaTestForTea({id: _id}).then(res => { vm.info = res.data})
      })
    }else if(from.path === '/center/seaware/tea' || from.path === '/'){
      next(vm => {
        let _id = JSON.parse(vm.$route.query.info).id
        vm.seaWareForTea({id: _id}).then(res => { vm.info = res.data})
      })
    }
  },
  methods: {
    ...mapActions({
      'seaTestForTea':'seaTestForTea',
      'seaWareForTea':'seaWareForTea',
      'putTestState':'putTestState'
    }),
    jump2other(){
      // this.$router.push({path: '/stu/order/tea', query:{id: this.info.id}})
      switch(this.path){
        case '/list/details/tea' : return this.$router.push({path: '/stu/order/tea', query: {id: this.info.id}})
        case '/list/details/ware/tea' : return this.$router.push({path: '/stu/order/ware/tea', query:{id: this.info.id}})
      }
    },
    fetchData(){
      switch(this.path){
        case '/list/details/tea' : return this.seaTestForTea({id: this.info.id}).then(res => this.info = res.data)
        case '/list/details/ware/tea' : return this.seaWareForTea({id: this.info.id}).then(res => this.info = res.data) 
      }
    },
    handleClickSubmit(){
      this.putTestState({id: this.info.id}).then(res => {
        res.code === 1 &&
        setTimeout(()=>{
          this.fetchData()
        }, 1000)
      })
    }
  },
  created(){

  }
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/base-cl.scss';
@import '@/assets/style/mixin.scss';
.details-wrapper{
  .details-list{
    width: 80%;
    margin:0 auto;
    .details-item{
      @include flex-box(row, nowrap, space-between, center);
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
    }
    .details-item:last-of-type{
      border:none;
    }
  }
  .type-area{
    @include flex-box(row, nowrap, space-between, center);
    width: 80%;
    margin: 0 auto;
    margin-top:15px;
    padding:15px;
    box-sizing: border-box;
    border:1px solid #eee;
    color:$base;
    .my-icon-more{
      color: $base;
    }
    &:hover{
      cursor: pointer;
      background-color: #eee;
      transition: all .5s linear;
    }
  }
  .btn-area{
    margin-top:15px;
    text-align: center;
  }
  .item__desc-error{
    color: $danger;
  }
}
</style>
