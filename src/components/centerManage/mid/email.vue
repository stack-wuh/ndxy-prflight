<template>
  <section class="wrapper email-wrapper"> 
    <p>绑定邮箱之后即可使用找回密码功能.若进行邮箱换绑,直接在此页面重新绑定邮箱即可.</p>
    <section class="form-area">
      <el-input class="my-input" v-model="email">
        <template slot="prepend">您的邮箱</template>
      </el-input>
      <el-button @click="handleSubmit({email})" class="btn__submit">确定</el-button>
    </section>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: '',

  data () {
    return {
      email:''
    }
  },

  methods: {
    ...mapActions({
      'handleSubmit':'bindEmail'
    })
  }
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/mixin.scss';
.email-wrapper{
  .form-area{
    @include flex-box(column, wrap, flex-start, flex-start);
    margin-top:15px;
  }
  .my-input{
    width: 50%;
  }
  .btn__submit{
    width: 180px;
    margin-top:20px;
    margin-left: 14%;
    color: #fff;
    background-color: #0E90D2;
  }
}
</style>
