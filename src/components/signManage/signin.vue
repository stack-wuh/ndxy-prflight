<template>
  <section class="signin signin-wrapper">
      <section class="form-area">
        <el-form class="my-form">
          <h3 class="form-area__title">武汉理工大学能动学院实验中心</h3>
          <section class="my-form-item">
            <span class="my-icon-account my-icon"></span>
            <el-form-item>
              <el-input v-model="form.number" class="my-input" placeholder="请编辑用户名"></el-input>
            </el-form-item>
          </section>
          <section class="my-form-item">
            <span class="my-icon-password my-icon"></span>
            <el-form-item>
              <el-input v-model="form.pwd" type="password" class="my-input" placeholder="请编辑登录密码"></el-input>
            </el-form-item>
          </section>
          <section class="btn-area">
            <el-button @click="submit" class="btn__submit">登录</el-button>
          </section>
        </el-form>
      </section>
      <el-dialog :title="info.title" :visible.sync="dialogVisible">
        <article v-html="info.content"></article>
        <span slot="footer">
          <el-button @click="cancel">取消</el-button>
          <el-button @click="dialogVisible = false" type="primary">确认</el-button>
        </span>
      </el-dialog>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: '',

  data () {
    return {
      dialogVisible: false,
      info:{},
      form:{
        number:'',
        pwd:'',
      }     
    }
  },

  methods: {
    ...mapActions({
      'getSafeInfo':'getSafeInfo',
      'login':'login'
    }),
    cancel(){
      this.dialogVisible = false
      this.$router.push({path:'/index'})
    },  
    submit(){
      if(!this.form.number){
        _g.toastMsg({
          type:'error',
          msg:'请编辑登录名'
        })
        return
      }
      if(!this.form.pwd){
        _g.toastMsg({
          type:'error',
          msg:'请编辑登录密码'
        })
        return
      }
      this.login({form: this.form}).then(res => {
        if(res.code === 1){
          if(res.data.type ===  1){
            this.$router.push({path: '/center'})
          }else{
            this.$router.push({path: '/center/pubtest/tea'})
          }
        }
      })
    }
  },
  created(){
    this.dialogVisible = true
    this.getSafeInfo().then(res => {
        this.info = res.data
    })
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/base-cl.scss';
@import '../../assets/style/mixin.scss';
.signin{
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $background;
  .form-area{
    position: absolute;
    top: 50%;
    left:50%;
    width: 500px;
    transform: translateX(-50%) translateY(-50%);
    .form-area__title{
      margin-bottom:30px;
      margin-top:20px;
      color: $base;
      text-align: center;
      font-size: 20px;
    }
    .my-form{
      @include flex-box(column, wrap, flex-start, center);
      height: 300px;
      background-color: #fff;
      border-radius: 10px;
      .my-input{
        width: 260px;
        height: 40px;
      }
    }
  }
  .my-form-item{
    display: flex;
    width: 340px;
    height: 40px;
    padding:0 20px;
    line-height: 40px;
    margin-bottom: 15px;
    border:1px solid $base;
    border-radius: 4px;
    .my-icon{
      padding-right: 20px;
      border-right: 1px solid $base;
      font-size: 20px;
      color: $base;
    }
  }
  .btn-area{
    .btn__submit{
      width:340px;
      margin-top:20px;
      background-color: $base;
      color: #fff;
    }
  }
}
</style>
