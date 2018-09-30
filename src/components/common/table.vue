<template>
  <section class="table-wrapper wrapper">
    <section class="table-content">
      <el-table :data="data" stripe border>
        <el-table-column align="center" v-if="item.type === 'default'" v-for="(item,index) in formatTableList({path: currPath})" :key="'1' +index" :label="item.label" :prop="item.prop"></el-table-column>
        <el-table-column align="center" v-if="item.type === 'button'" v-for="(item,index) in formatTableList({path: currPath})" :key="'2' + index" :label="item.label">
          <template slot-scope="scope">
            <el-button @click="btn.click({path: currPath, text: btn.text, row: scope.row, $index: scope.$index})" v-for="(btn,bid) in item.list" :key="'x' + bid" :type="btn.type || 'text'" :style="btn.style">{{btn.text}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </section>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
export default {
  name: 'my-table',
  props:{
    data:{
      type:Array,
      default:[],
      required:true
    }
  },
  computed:{
    ...mapGetters({
      'formatTableList':'formatTableList'
    }),
    currPath(){
      return this.$route.path
    }
  },
  data () {
    return {
    }
  },

  methods: {},
}
</script>

<style scoped lang='scss' >

</style>
