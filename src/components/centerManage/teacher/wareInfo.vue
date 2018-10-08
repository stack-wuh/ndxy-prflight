<template>
  <section class="wrapper">
      <el-form :model="form" :rules="rules" ref="myForm" label-width="120px">
        <el-form-item label="设备编号" prop="bianhao">
          <el-input v-model="form.bianhao" @change="inputChange"></el-input>
        </el-form-item>
        <el-form-item label="设备型号" prop="xinghao">
          <el-input :disabled="true" v-model="form.xinghao"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-input :disabled="true" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="设备位置" prop="location">
          <el-input :disabled="true" v-model="form.location" ></el-input>
        </el-form-item>
        <el-form-item label="报修原因" prop="reason">
          <el-input v-model="form.reason" type="textarea" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="photo">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="form.photo" :src="form.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <section class="btn-area">
        <el-button @click="handleSubmit" class="btn_submit">提交</el-button>
      </section>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
const rules = {
  bianhao:[{required: true, message: '请编辑设备编号', trigger: 'blur'}],
  xinghao:[{required: false, message: '请编辑设备型号', trigger: 'blur'}],
  name:[{required: false, message: '请编辑设备名称', trigger: 'blur'}],
  location:[{required: false, message: '请编辑设备位置', trigger: 'blur'}],
  reason:[{required: true, message: '请编辑报修原因', trigger: 'blur'}],
  photo:[{required: true, message: '请上传图片', trigger: 'change'}],
}

export default {
  name: '',

  data () {
    return {
      form:{
        bianhao:'',
        xinghao:'',
        name:'',
        location:'',
        reason:'',
        photo:'',
      },
      uploadUrl: rootPath + '/index/upload',
      rules,
    }
  },

  methods: {
    ...mapActions({
      'getWareInfo':'getWareInfo',
      'putWareOne':'putWareOne'
    }),
    handleAvatarSuccess(file){
      this.form.photo = $img + '/' + file.data
    },
    inputChange(){
      this.getWareInfo({bianhao: this.form.bianhao}).then(res => {
        this.form.xinghao = res && res.data && res.data.xinghao
        this.form.location = res && res.data && res.data.location_str
        this.form.name = res && res.data && res.data.title
      })
    },
    handleSubmit(){
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.putWareOne({form: this.form}).then(res => {
            if(res.code === 1){
              setTimeout(()=>{
                this.$refs.myForm.resetFields()
                this.$router.push({path:'/center/seafixed/tea'})
              },1000)
            }
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg: '请编辑必填项之后提交'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang='scss' >
.wrapper{
  .el-form{
    .el-input{
      width: 400px;
    }
  }
  .btn-area{
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #eee;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
 
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
