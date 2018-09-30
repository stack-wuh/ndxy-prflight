<template>
  <section class="wrapper order-wrapper">
      <el-table :data="data" border stripe>
        <el-table-column align="center" width="90px" type="selection" ></el-table-column>
        <el-table-column align="center" label="姓名" prop="name"></el-table-column>
        <el-table-column align="center" label="学号" prop="number"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text">成绩</el-button>
          </template>
        </el-table-column>
      </el-table>
      <section class="btn-area">
        <el-button class="btn__submit">下载名单</el-button>
      </section>
      <el-dialog title="点评成绩" :visible.sync="visibleDialog">
        <el-table border stripe>
          <el-table-column align="center" label="项目">
            <template slot-scope="scope">
              <el-input v-model="scope.row.label"></el-input>
            </template>
          </el-table-column>
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
          <el-button @click="visibleDialog = false">取消</el-button>
          <el-button  type="primary">确定</el-button>
        </span>
      </el-dialog>
  </section>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      data:[{
        name:'aaa',
        number:'123123'
      }],
      visibleDialog: false
    }
  },

  methods: {}
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
