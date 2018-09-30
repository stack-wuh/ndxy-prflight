<template>
  <section class="wrapper feedback-wrapper">
    <el-form ref="myForm" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="您的邮箱" prop="email">
        <el-input  v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="反馈类型" prop="type">
        <el-select v-model="form.type">
          <el-option :value="1" label="问题反馈"></el-option>
          <el-option :value="2" label="投诉建议"></el-option>
          <el-option :value="3" label="信息报错"></el-option>
          <el-option :value="4" label="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="反馈信息" prop="content">
        <el-input v-model="form.content" type="textarea" rows="3" class="my-textarea"></el-input>
      </el-form-item>
    </el-form>
    <section class="btn-area">
      <el-button @click="submit" class="btn__submit">发布</el-button>
    </section>
  </section>
</template>

<script>
import {validEmail} from '@/utils/valid'
import {mapActions} from 'vuex'
const rules = {
  email:[{required: true, validator: validEmail, trigger:'blur'}],
  type:[{required:true, message:'请选择反馈类型', trigger: 'change'}],
  content:[{required: true, message:'请编辑反馈内容', trigger: 'blur'}]
}
export default {
  name: '',

  data () {
    return {
      form:{
        email:'',
        type:1,
        content:'',
      },
      rules,
    }
  },

  methods: {
    ...mapActions({
      'feedBackPub':'feedBackPub'
    }),
    submit(){
      this.$refs.myForm.validate(valid => {
        if(valid){
            this.feedBackPub({form: this.form}).then(res => {
              res.code === 1 && (
                setTimeout(()=>{
                  this.$refs.myForm.resetFields()
                },1000)
              )
            })
        }else{
          _g.toastMsg({
            type:'error',
            msg:'请编辑必填项之后提交'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang='scss' >
@import '../../../assets/style/base-cl.scss';
.wrapper{
  .btn-area{
    text-align: center;
    .btn__submit{
      background-color: $base;
      color: #fff;
      width:180px;
    }
  }
}
</style>
