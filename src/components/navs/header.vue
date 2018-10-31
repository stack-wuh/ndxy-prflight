<template>
  <section class="wrapper header-wrapper">
    <section class="header-wrapper-top">
      <h3 class="header-wrapper-top__title">武汉理工大学能动学院实验中心</h3>
    </section>
    <nav class="header-wrapper-nav">
      <ul class="header-wrapper-nav_item">
        <li @click="jump2Other(item.url)" :class="[$route.path === item.url ? 'nav-item__title nav-item__title__active' : 'nav-item__title']" v-for="(item,index) in nav" :key="index">{{item.title}}</li>
      </ul>
      <el-dropdown v-if="name" trigger="click" class="btn__login">
        <span class="el-dropdown-link my-icon-center">
          {{name || '用户'}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span class="my-dropdown-item" @click="handleChangePwd">更换密码</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span class="my-dropdown-item" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="btn__login" @click="login" v-else>登录</span>
    </nav>

    <el-dialog title="更换密码" :visible.sync="dialogVisible">
      <el-form :model="form" :rules="rules" ref="myForm" label-width="120px" >
        <el-form-item label="用户名" prop="number">
          <el-input class="my-input-220" v-model="form.number" placeholder="请编辑工号或学号"></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="pwd">
          <el-input type="password" class="my-input-220" v-model="form.pwd" placeholder="请编辑原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pwdre">
          <el-input type="password" class="my-input-220" v-model="form.pwdre" placeholder="请编辑新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkNew">
          <el-input type="password" class="my-input-220" v-model="form.checkNew" placeholder="请再次编辑新密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button @click="submitPwd" type="primary">确认</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'myHeader',

  data () {
    const validCheckPwd = (rule, value ,callback) => {
      if(!value){
        return callback(new Error('请确认新密码'))
      }
      setTimeout(()=>{
        if(value !== this.form.pwdre){
          callback(new Error('与新密码不一致'))
        }else{
          callback()
        }
      }, 100)
    }
    return {
      nav:[
        {
          title:'首页',
          url:'/index',
        },
        {
          title:'设备环境',
          url:'/list',
        },
        {
          title:'实验体系',
          url:'/list/stream'
        },
        {
          title:'教学资源',
          url:'/list/source',
        },
        {
          title:'个人中心',
          url:'/center'
        },
      ],
      info:{},
      form:{
        number:'',
        pwd:'',
        pwdre:'',
        checkNew:''
      },
      dialogVisible: false,
      rules: {
                number: [{required: true, message: '请编辑用户名', trigger: 'blur'}],
                pwd: [{required: true, message: '请编辑用户密码', trigger: 'blur'}],
                pwdre: [{required: true, message: '请编辑新密码', trigger: 'blur'}],
                checkNew: [{required: true, validator: validCheckPwd, trigger: 'blur'}],
              }
    }
  },
  computed:{
    ...mapState({
      name:state => state.Sign.username,
      type: state => state.Sign.type
    })
  },
  methods: {
    ...mapActions({
      'logout':'logout',
      'getUserInfo':'getUserInfo',
      'changePwd':'changePwd'
    }),
    jump2Other(url){
      if(url === '/center'){
        let _url = this.type === 1 ? '/center/baseInfo' : '/center/pubtest/tea'
        this.$router.push({path: _url})
      }else{
        this.$router.push({path: url})
      }
    },
    handleChangePwd(){
      this.dialogVisible = true
    },
    handleCancel(){
      this.dialogVisible = false
      setTimeout(()=>{
        this.$refs.myForm.resetFields()
      }, 1000)
    },
    submitPwd(){
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.changePwd({form: this.form}).then(res => {
            (res.code === 1 ) && (
              setTimeout(()=>{
                this.handleCancel()
              }, 1000)
            )
          })
        }else{
          _g.toastMsg({
            type:'error',
            msg:'请编辑必填项目后提交'
          })
        }
      })
    },
    login(){
      this.$router.push({path: 'signin'})
    }
  },
  created(){
    // this.getUserInfo()
  }
}
</script>

<style scoped lang='scss' >
@import '../../assets/style/base-cl.scss';
@import '../../assets/style/mixin.scss';
.header-wrapper{
  .header-wrapper-top{
    height: 65px;
    padding-left:15%;
    line-height: 65px;
    background-color: #fff;
    .header-wrapper-top__title{
      font-size: 20px;
    }
  }
  .header-wrapper-nav{
    @include flex-box(row, nowrap, space-between, center);
    height: 50px;
    padding-left: 15%;
    padding-right: 10%;
    color: #fff;
    background-color: #0E90D2;
    .header-wrapper-nav_item{
      @include flex-box;
      .nav-item__title{
        min-width: 100px;
        height: 50px;
        text-align:center;
        line-height: 50px;
        &:hover{
          cursor: pointer;
          background-color: #0D89C7;
          color: #fff;
          border: 1px solid $base;
        }
      }
    }
    .nav-item__title__active{
      color: #fff;
      background-color: #0D89C7;
      border-top:1px solid $base;
      border-bottom:1px solid $base;
    }
    .el-dropdown-link{
      font-size: 16px;
      color: #fff;
    }
  }
  .my-input-220{
    width: 70%;
  }
  .btn__login{
    margin-right: 10%;
    &:hover{
      cursor: pointer;
    }
  }
  .my-dropdown-item{
    border:1px solid red;
  }
}
</style>
