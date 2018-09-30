<template>
  <section class="wrapper">
      <el-form :model="form" label-width="120px">
        <el-form-item label="设备编号" prop="bianhao">
          <el-input v-model="form.bianhao" @change="getWareInfo({bianhao: form.bianhao})"></el-input>
        </el-form-item>
        <el-form-item label="设备型号" prop="xinghao">
          <el-input v-model="form.xinghao"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="设备位置" prop="location">
          <el-input v-model="form.location" ></el-input>
        </el-form-item>
        <el-form-item label="保修原因" prop="reason">
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
        phone:'',
      },
      uploadUrl: rootPath + 'upload/img'
    }
  },

  methods: {
    ...mapActions({
      'getWareInfo':'getWareInfo'
    }),
    handleAvatarSuccess(file){
      console.log(file)
    },
    handleSubmit(){
      console.log(this.form)
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
    border: 1px dashed #d9d9d9;
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
