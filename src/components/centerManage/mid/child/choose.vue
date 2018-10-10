<template>
  <section class="wrapper">
      <section class="choose-wrapper">
        <header class="header">
          <ul>
            <li class="header__item">
              <span class="header__title">{{info && info.exp && info.exp.title}}</span>
              <span class="header__type">体系:{{info && info.exp && info.exp.type_str}}</span>
            </li>
            <li class="header__item header__item__small">
              <span>第{{info && info.exp && info.exp.exp_week}}周 {{info && info.exp && info.exp.exp_date}} {{info && info.exp && info.exp.exp_dotime}}</span>
            </li>
            <li class="header__item header__item__small">
              <span>实验位置: {{info && info.exp && info.exp.location_str}}</span>
            </li>
            <li class="header__item header__item__small">
              <span >实验老师: {{info && info.exp && info.exp.teacher}}</span>
              <span >预约人数: {{info  && info.has}}/{{info && info.all}}</span>
            </li>
          </ul>
        </header>
        <section class="list-item">
          {{info}}
          <section v-if="path === '/center/choose/test'" @click="handleClickSubmit(index)" v-for="(item,index) in student" :key="index" class="item" :class="[item.length !== info.exp.each_count ? 'item__active' : '']">
            <span class="item__title">
              <img class="item__img" src="../../../../assets/img/icon-cap.png" alt=""> {{ index + 1}}
            </span>
            <section class="item-box">
              <span class="item-box__item" :class="'item-box__item-' + sid" v-for="(sub, sid) in Number(info.exp.each_count)" :key="sid" >
                  <div v-if="item && item[sid] && item[sid]['name']" class="item-box__item">
                    <img src="../../../../assets/img/icon-user-active.png" alt="" class="item-box__img">
                    <span>{{item && item[sid] && item[sid]['name']}}</span>
                  </div>
                  <div v-else class="item-box__item">
                    <img src="../../../../assets/img/icon-user-default.png" alt="" class="item-box__img">
                  </div>
              </span>
            </section>
          </section>
          <section v-if="path === '/center/choose/ware'" @click="handleClickSubmit(index)" v-for="(item,index) in student" :key="index" class="item" :class="[item.length !== info.exp.each_count ? 'item__active' : '']">
            <span class="item__title">
              <img class="item__img" src="../../../../assets/img/icon-cap.png" alt=""> {{ index + 1}}
            </span>
            <section class="item-box item-box__col">
              <span class="item-box__col-item" v-for="(sub, sid) in item" :key="sid">
                <div class="item-box_col-list">
                  <img src="../../../../assets/img/icon-user-active.png" alt="" class="item-box__img">
                  <span>{{sub.name}}</span>
                </div>
              </span>
            </section>
          </section>
        </section>
      </section>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: '',

  data () {
    return {
      info:{},
      student:[]
    }
  },
  computed:{
    path(){
      return this.$route.path
    }
  },
  methods: {
    ...mapActions({
      'getTestInfoOne':'getTestInfoOne',
      'putTestChoose':'putTestChoose',
      'getWareInfoOne':'getWareInfoOne',
      'putWareChoose':'putWareChoose'
    }),
    fetchData(){
      switch(this.path){
        case '/center/choose/test' : return this.getTestInfoOne({id: this.$route.query.id})
                                                  .then(res => {
                                                    this.info = res.data 
                                                    this.student = res.data.students
                                                  }) 
        case '/center/choose/ware' : return this.getWareInfoOne({id: this.$route.query.id})
                                                  .then(res => {
                                                    this.info = res.data
                                                    this.student = res.data.students
                                                    console.log(res)
                                                  })
      }
    },
    handleClickSubmit(index){
      switch(this.path){
        case '/center/choose/test' : return this.putTestChoose({id: this.info.exp.id, index})
                                                  .then(res => {  (res.code === 1) && setTimeout(()=>{ this.fetchData()},1000)})
        case '/center/choose/ware' : return this.putWareChoose({id:this.info.exp.id, index})
                                                  .then(res => {  (res.code === 1) && setTimeout(()=>{ this.fetchData()}, 1000)})
      }
    }
  },
  created(){
    this.fetchData()
  }
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/mixin.scss';
.choose-wrapper{
  header.header{
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }
  .header__item{
    @include flex-box(row, nowrap, space-between, center);
    height: 40px;
    line-height: 40px;
    .header__title{
      font-weight: 600;
    }
    .header__type{
      font-size: 14px;
    }
  }
  .header__item__small{
    height: 30px;
    height: 30px;
  }
  .list-item{
    @include flex-box(row, wrap, space-between, flex-start);
    margin-top:15px;
    .item{
      position: relative;
      width: 45%;
      min-height: 240px;
      margin-bottom: 10%;
      .item__title{
        margin-left: 45%;
      }
      .item__img{
        width: 30px;
        height: 40px;
      }
      .item-box{
        .item-box__item{
          @include flex-box(column);
        }
        .item-box__img{
          width: 25px;
          height: 40px;
        }
      }
      @each $i in 0,5{
        .item-box__item-#{$i}{
          position: absolute;
          left:50%;
          transform: translateX(-50%);
          @if $i == 5{
            top:90%;
          }
        }
      }
      @each $i in 1,4{
        .item-box__item-#{$i}{
          position: absolute;
          left:20%;
          @if $i == 1 {
            top:40%;
          }
          @if $i == 4 {
            top: 70%;
          }
        }
      }
      @each $i in 2,3{
        .item-box__item-#{$i}{
          position: absolute;
          left: 80%;
          @if $i == 2 {
            top:40%;
          }
          @if $i == 3 {
            top:70%;
          }
        }
      }
    }
  }
  .item__active{
    &:hover{
      cursor: pointer;
    }
  }
  .item-box__col{
    @include flex-box(row, wrap, flex-start, flex-start);
    .item-box_col-list{
      @include flex-box(column);
      margin-right: 10px;
      min-width: 50px;
      margin-bottom: 10px;
    }
  }
}
</style>
