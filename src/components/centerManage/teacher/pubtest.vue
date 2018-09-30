<template>
  <section class="wrapper">
    <el-form :model='form' ref="myForm" :rules="rules" label-width="120px">
      <el-form-item label="实验周数" prop="date">
        <el-date-picker class="my-input-220" type="week" format="yyyy-MM-dd 第 WW 周" v-model="form.date" ></el-date-picker>
      </el-form-item>
      <el-form-item label="体系" prop="type">
        <el-select  class="my-input-220" v-model="form.type">
          <el-option v-for="(item,index) in sys" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="实验名称" prop="exp_id">
        <el-select class="my-input-220" v-model="form.exp_id" >
          <el-option v-for="(item,index) in exp" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="位置" prop="location">
        <el-select class="my-input-220" v-model="form.location">
          <el-option v-for="(item,index) in location" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="每台人数" prop="each_count">
        <el-input  class="my-input-220"v-model="form.each_count" placeholder="请编辑每台人数"></el-input>
      </el-form-item>
      <el-form-item label="设备数量" prop="eq_count">
        <el-input class="my-input-220" v-model="form.eq_count" placeholder="请编辑设备数量"></el-input>
      </el-form-item>
      <el-form-item label="实验老师" prop="teacher">
        <el-input class="my-input-220" v-model="form.teacher" placeholder="请编辑实验老师"></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="start_time">
        <el-date-picker value-format="yyyy-MM-dd" v-model="form.start_time" class="my-input-220" placeholder="请选择开始时间" ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="end_time">
        <el-date-picker value-format="yyyy-MM-dd" v-model="form.end_time" class="my-input-220" placeholder="请选择结束时间" ></el-date-picker>
      </el-form-item>
    </el-form>
    <section class="btn-area">
      <el-button @click="submit" class="btn__submit">提交</el-button>
    </section>
  </section>
</template>

<script>
import {mapActions, mapState} from 'vuex'
const rules = {
  date:[{required: true, message: '请选择实验日期', trigger: 'change'}],
  type:[{required: true, message: '请选择实验体系', trigger: 'change'}],
  exp_id:[{required: true, message: '请选择实验名称', trigger: 'change'}],
  location:[{required: true, message: '请选择实验地址', trigger: 'change'}],
  each_count:[{required: true, message: '请编辑每台设备人数', trigger: 'blur'}],
  eq_count:[{required: true, message: '请编辑设备人数', trigger: 'blur'}],
  teacher:[{required: true, message: '请编辑实验指导教师', trigger: 'blur'}],
  start_time:[{required: true, message: '请选择开始日期', trigger: 'change'}],
  end_time:[{required: true, message: '请选择结束日期', trigger: 'change'}],
}
export default {
  name: '',

  data () {
    return {
      form:{
        date:'',
        type:'',
        exp_id:'',
        location:'',
        each_count:'',
        eq_count:'',
        teacher:'',
        start_time:'',
        end_time:'',
      },
      rules,
    }
  },
  computed:{
    ...mapState({
      sys: state => state.sys__list,
      exp: state => state.exp__list,
      location: state => state.location__list,
      major: state => state.major__list
    }),
  },
  methods: {
    ...mapActions({
      'getPubTestTypeForTea':'getPubTestTypeForTea',
      'testPubForTea':'testPubForTea'
    }),
    submit(){
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.testPubForTea({form: this.form}).then(res => {
            res.code === 1 && (
              setTimeout(()=>{
                this.$refs.myForm.resetFields()
                this.$router.push({path: '/center/seatest/tea'})
              },1000)
            )
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg:'请编辑必填项之后提交'
          })
          return
        }
      })
    }
  },
  created(){
    this.getPubTestTypeForTea()
  }
}
</script>

<style scoped lang='scss' >
@import '@/assets/style/base-cl.scss';
.wrapper{
  .my-input-220{
    width: 320px;
  }
  .btn-area{
    text-align: center;
    .btn__submit{
      width: 120px;
      margin-right: 50%;
      background-color: $base;
      color: #fff;
    }
  }
}
</style>
