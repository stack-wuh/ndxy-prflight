<template>
  <section class="wrapper order-wrapper">
      <el-table :data="data" border stripe>
        <el-table-column align="center" width="90px" type="selection" ></el-table-column>
        <el-table-column align="center" label="姓名" prop="name"></el-table-column>
        <el-table-column align="center" label="学号" prop="number"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="dialogToggle(scope)" type="text">成绩</el-button>
            <el-button @click="handleClickSubTest(scope)" type="text">确认</el-button>
          </template>
        </el-table-column>
      </el-table>
      <section class="btn-area">
        <el-button @click="handleDownLoadTestOrder({id: $route.query.id, path: $route.path})" class="btn__submit">下载名单</el-button>
      </section>
      <el-dialog title="点评成绩" :visible.sync="visibleDialog">
        <el-table :data="score" border stripe>
          <el-table-column align="center" label="项目" prop="label"></el-table-column>
          <el-table-column align="center" label="百分比" >
            <template slot-scope="scope">
                <el-input v-model="scope.row.rate"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="成绩" >
            <template slot-scope="scope">
              <el-input v-model="scope.row.grade"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <span class="tips">注意: 百分比请输入整数，如30%请输入30，请勿直接输入30%或者0.3；每项成绩总分均为100。</span>
        <span slot="footer">
          <el-button @click="dialogToggle">取消</el-button>
          <el-button @click="saveScore" type="primary">确定</el-button>
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
      data:[],
      score:[
        {
          label:'实验表现',
          rate:'',
          grade:''
        },
        {
          label:'回答问题',
          rate:'',
          grade:''
        },
        {
          label:'实验报告',
          rate:'',
          grade:''
        },
      ],
      stu_id:[],
      visibleDialog: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if(from.path === '/list/details/tea' || from.path === '/'){
        vm.getPrevTestOrder({id: vm.$route.query.id}).then(res => {
          vm.data = res.data
        })
      }else if(from.path === '/list/details/ware/tea' || from.path === '/'){
        vm.getPrevWareList({id: vm.$route.query.id}).then(res => {
          vm.data = res.data
        })
      }
    })
  },
  methods: {
    ...mapActions({
      'getPrevTestOrder':'getPrevTestOrder',
      'handleDownLoadTestOrder':'handleDownLoadTestOrder',
      'pubTestGrade':'pubTestGrade',
      'putTestCheck':'putTestCheck',
      'getPrevWareList':'getPrevWareList'
    }),
    dialogToggle(scope){
      this.visibleDialog = !this.visibleDialog
      this.stu_id = scope && scope.row && scope.row.id
    },
    /**
     * 确认
     */
    handleClickSubTest(scope){
      let type = this.$route.path === '/stu/order/tea' ? '1' : '2'
      this.putTestCheck({id: this.$route.query.id, stu_id_arr:[scope.row.id], type}).then(res => {

      })
    },
    /**
     * 成绩
     */
    saveScore(){
     let rate = this.score.reduce((curr, prev) => {
       curr += Number(prev.rate)
       return curr
     }, 0)
     if(rate !== 100) {
       _g.toastMsg({
         type: 'error',
         msg: '请确保三项中比例为百分百'
       })
       return 
     }
     let total = this.score.reduce((curr, prev) => {
        curr += prev.grade * (prev.rate / 100)
        return curr
      }, 0)
      let type = this.$route.path === '/stu/order/tea' ? '1' : '2'
      this.pubTestGrade({id: this.$route.query.id, type, stu_id: this.stu_id, score: total}).then(res => {
        res.code === 1 && setTimeout(()=> {
          this.dialogToggle()
          this.score.map(item => {
            item.grade = ''
            item.rate = ''
          })
        }, 1000)
      })
    },

  },
  created(){

  }
}
</script>

<style scoped lang='scss' >
.order-wrapper{
  .btn-area{
    margin-top:15px;
    text-align: center;
  }
  .tips{
    color: #ccc;
  }
}
</style>
