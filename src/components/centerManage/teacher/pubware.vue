<template>
  <section class="wrapper">
    <el-form label-width="120px">
      <el-form-item label="实验周数" prop="week">
        <el-date-picker  class="my-input-220" type="week" format="yyyy年 第 WW 周" v-model="form.week" ></el-date-picker>
      </el-form-item>
      <el-form-item label="选择设备">
        <el-select  class="my-input-220" v-model="form.sys">
          <el-option v-for="(item,index) in sys" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择位置">
        <el-select class="my-input-220" v-model="form.location">
          <el-option v-for="(item,index) in location" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备数量">
        <el-input class="my-input-220" v-model="form.total" placeholder="请编辑设备数量"></el-input>
      </el-form-item>
      <el-form-item label="实验老师">
        <el-input class="my-input-220" v-model="form.teacher" placeholder="请编辑实验老师"></el-input>
      </el-form-item>
      <el-form-item label="起始时间">
        <el-date-picker v-model="form.time" class="my-input-220" placeholder="请选择起止时间" ></el-date-picker>
      </el-form-item>
    </el-form>
    <section class="btn-area">
      <el-button class="btn__submit">提交</el-button>
    </section>
  </section>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: '',

  data () {
    return {
      form:{
        week:'',
        sys:'',
        exp:'',
        location:'',
        num:'',
        total:'',
        teacher:'',
        time:'',
      }
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
      'getPubTestTypeForTea':'getPubTestTypeForTea'
    })
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
