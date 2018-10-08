<template>
  <section class="baseinfo-wrapper wrapper">
      <section class=baseinfo-content>
        <my-search />
        <MyTable v-if="isShow" :data="list" class="my-table"></MyTable>
        <el-dialog title="测试" v-if="$route.path === '/center/exam'" :visible.sync="isShowDialog" :before-close="beforeClose">
            <section class="exam-list" v-for="(item,index) in tempList1" :key="index">
              <p class="exam-list__title">{{index+1}}.{{item.title}}{{item.type == 0 ? '【单选】' : '【多选】'}}</p>
              <section v-if="item.type == 0">
                <el-radio-group class="exam-list__radio__list" v-for="(list, lidx) in item.answers" v-model="item.radio1">
                  <el-radio class="exam-list__radio__item" :label="list"></el-radio>
                </el-radio-group>
              </section>
              <section v-if="item.type == 1">
                <el-checkbox-group v-model="item.checkList" v-for="(list, lidx) in item.answers">
                  <el-checkbox :label="list" ></el-checkbox>
                </el-checkbox-group>
              </section>
            </section>
            <span slot="footer">
              <el-button @click="openDialog({path: path})">取消</el-button>
              <el-button @click="submitExam" type="primary">确认</el-button>
            </span>
        </el-dialog>
        <el-dialog title="评教" v-if="$route.path === '/center/prevtest' || $route.path === '/center/prevdev'" :visible.sync="$route.path === '/center/prevtest' ? isShowDialogPrevTest : isShowDialogPrevDev" :before-close="beforeClose">
          <section class="exam-list" v-for="(item,index ) in tempList1" :key="index">
            <p class="exam-list__title">{{index+1}}. {{item.question}}</p>
            <el-radio-group class="exam-list__radio__list" v-model="item.radio1">
              <el-radio class="exam-list__radio__item" label="是"></el-radio>
              <el-radio class="exam-list__radio__item" label="否"></el-radio>
            </el-radio-group>
          </section>
            <p class="exam-list__title">补充说明</p>
            <el-input type="textarea" v-model="tempList1.content" :rows="2"></el-input>
          <span slot="footer">
            <el-button @click="openDialog({path: path})">取消</el-button>
            <el-button @click="submitJudge" type="primary">确定</el-button>
          </span>
        </el-dialog>
      </section>
  </section>
</template>

<script>
import MyTable from '@/components/common/table'
import MySearch from '@/components/common/search'
import {mapActions, mapState, mapMutations} from 'vuex'
export default {
  name: 'baseinfo',
  components:{
    MyTable,
    MySearch,
  },
  data () {
    return {
      data:[],
      total:0,
      currPageNo:1,
      isShow:true,
    }
  },
  computed:{
    path(){
      return this.$route.path
    },
    ...mapState({
      'list':state => state.Center.data,
      'isShowDialog': state => state.Table.isShowDialog,
      'tempList1': state => state.Center.temp_list1,
      'isShowDialogPrevTest': state => state.Table.isShowDialogPrevTest,
      'isShowDialogPrevDev': state => state.Table.isShowDialogPrevDev
    })
  },
  watch:{
    path(){
      this.isShow = false
      this.fetchData()
      this.clearData()
      this.isShow = true
    }
  },
  methods: {
    ...mapMutations({
      'openDialog':'openDialog',
      'clearData':'clearData'
    }),
    ...mapActions({
      'getBaseInfo':'getBaseInfo',
      'getTestInfo':'getTestInfo',
      'getExamInfo':'getExamInfo',
      'getExamAnswer':'getExamAnswer',
      'getPrevDevList':'getPrevDevList',
      'getPrevTestList':'getPrevTestList',
      'getPrevOrder':'getPrevOrder',
      'pubStudentJudge':'pubStudentJudge'
    }),
    getCurrent(e){
      console.log(e)
    },
    beforeClose(){
      this.openDialog({path: this.path})
    },
    fetchData(){
      switch(this.path){
        case '/center/baseInfo' : return this.getBaseInfo()
        case '/center/test' : return this.getTestInfo()
        case '/center/exam' : return this.getExamInfo()
        case '/center/prevdev' : return this.getPrevDevList() 
        case '/center/prevtest' :return this.getPrevTestList()
        case '/center/ware' : return this.getPrevOrder() 
      }
    },
    submitExam(){
      let data = []
      this.tempList1.map(item => {
        if(item.type == 0){
          data.push([item.id,[item.radio1]])
        }else if(item.type == 1){
          data.push([item.id, item.checkList])
        }
      }) 
      this.getExamAnswer({form: data}).then(res => {
        res.code === 1 && (
         setTimeout(()=>{ 
            this.openDialog({path: this.path})
         },1000)
        )
      })
    },
    submitJudge(){
      let data = []
      this.tempList1.map(item => {
        data.push([item.id, [item.radio1 === '是' ? 1 : 0]])
      })
      this.pubStudentJudge({form: {data, content: this.tempList1.content}}).then(res => {
        res.code === 1 && (
          setTimeout(()=>{
            this.openDialog({path: this.path})
          },1000)
        )
      })
    }
  },
  created(){
    this.fetchData()
  }
}
</script>

<style scoped lang='scss' >
.baseinfo-wrapper{
  .my-pagination{
    margin-top:20px;
    text-align: center;
  }
  .exam-list__title{
    margin-top:15px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .exam-list__radio__list{
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
  .my-table{
    margin-bottom: 20px;
  }
}
</style>
