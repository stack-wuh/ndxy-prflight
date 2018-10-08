<template>
  <section class="wrapper">
    <el-form :model="form" ref="myForm" :rules="rules" label-width="120px">
      <el-form-item label="实验周数" prop="date">
        <el-date-picker  class="my-input-220" type="week" format="yyyy年 第 WW 周" v-model="form.date" ></el-date-picker>
      </el-form-item>
      <el-form-item label="选择设备" prop="eq_id">
        <el-select  class="my-input-220" v-model="form.eq_id">
          <el-option v-for="(item,index) in eq" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择位置" prop="location">
        <el-select class="my-input-220" v-model="form.location">
          <el-option v-for="(item,index) in location" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备数量" prop="eq_count">
        <el-input class="my-input-220" v-model="form.eq_count" placeholder="请编辑设备数量"></el-input>
      </el-form-item>
      <el-form-item label="实验老师" prop="teacher">
        <el-input class="my-input-220" v-model="form.teacher" placeholder="请编辑实验老师"></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="start_time">
        <el-date-picker value-format="yyyy-MM-dd" v-model="form.start_time" class="my-input-220" placeholder="请选择起止时间" ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="end_time">
        <el-date-picker value-format="yyyy-MM-dd" v-model="form.end_time" class="my-input-220" placeholder="请选择起止时间" ></el-date-picker>
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
  eq_id:[{required: true, message: '请选择设备', trigger: 'change'}],
  location:[{required: true, message: '请选择地点', trigger: 'change'}],
  eq_count:[{required: true, message: '请编辑设备数量', trigger: 'blur'}],
  teacher:[{required: true, message: '请编辑设备数量', trigger: 'blur'}],
  start_time:[{required: true, message: '请选择开始时间', trigger: 'change'}],
  end_time:[{required: true, message: '请选择结束时间', trigger: 'change'}],
  date:[{required: true, message: '请选择实验周数', trigger: 'change'}],
}
export default {
  name: '',

  data () {
    return {
      form:{
        date:'',
        eq_id:'',
        location:'',
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
      exp: state => state.exp__list,
      location: state => state.location__list,
      eq: state => state.eq__list
    }),
  },
  methods: {
    ...mapActions({
      'getPubWareTypeForTea':'getPubWareTypeForTea',
      'putWareForTea':'putWareForTea'
    }),
    submit(){
      this.$refs.myForm.validate(valid => {
        if(valid){
          this.putWareForTea({form: this.form}).then(res => {
            console.log(res)
          })
        }else{
          _g.toastMsg({
            type: 'error',
            msg:'请编辑必填项目后提交'
          })
        }
      })
    }
  },
  created(){
    this.getPubWareTypeForTea()
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
