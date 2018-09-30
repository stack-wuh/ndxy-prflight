<template>
  <section class="wrapper list-wrapper">
    <my-navs @getTypeChange="getTypeChange" class="my-navs" :list="list"></my-navs>
    <my-items v-if="isShow" class="item-list" :data="data"></my-items>
  </section>
</template>

<script>
import MyNavs from '@/components/common/navs'
import MyItems from '@/components/common/items'
import {mapActions} from 'vuex'
export default {
  name: 'list',
  components:{
    MyNavs,
    MyItems
  },
  data () {
    return {
      list:[
        // {
        //   label:'专业',
        //   list:[]
        // },
      ],
      data:[],
      isShow: true
    }
  },
  computed:{
    path(){
      return this.$route.path
    }
  },
  watch:{
    path(){
      this.isShow = false
      this.fetchData()
      this.getTypeList()
      this.isShow = true
    }
  },
  methods: {
    ...mapActions({
      'getMajorList':'getMajorList',
      'getSysType':'getSysType',
      'getSourceType':'getSourceType',
      'getEqxList':'getEqxList',
      'getSysList':'getSysList',
      'getSourceList':'getSourceList'
    }),
    getTypeChange(e){
      this.fetchData({search: e})
    },
    fetchData({search} = {}){
      let _path = this.$route.path
      if(_path === '/list'){
        this.getEqxList({search}).then(res => {
          this.data = res.map(item => {
            return {...item, url: $img + '/Img/' + item.img, detail: item.title}
          })
        })
      }else if(_path === '/list/stream'){
        this.getSysList({search}).then(res => {
          this.data = res.map(item => {
            return {...item, url: $img + '/Img/' + item.img, detail: item.title}
          })
        })
      }else if(_path === '/list/source'){
        this.getSourceList({search}).then(res=>{
          this.data = res.map(item => {
            return {...item, url: $img + item.pic, detail: item.title}
          })
        })
      }
    },
    getTypeList(){
      this.list = []
      switch(this.path){
        case '/list': return this.getMajorList().then(res => {
                                    let data = [{type:'', name: '全部', isActive: true}, ...res.data].map(item => {
                                      return {...item, label: item.name}
                                    })
                                    this.list.push({label: '专业', list: data})
                                  })
        case '/list/stream': return this.getSysType().then(res => {
                                        for(var k in res.data){
                                          res.data[k] = [{type:'',name:'全部', isActive: true}, ...res.data[k]].map(item => {
                                              return {...item, label: item.name}
                                          })
                                          this.list.push({keys: k, label: k==='sys' ? '体系' : k === 'major' ? '专业' : '年级', list: res.data[k]})
                                        }
                                      })
        case '/list/source' : return this.getSourceType().then(res => {
                                        let data = [{type:'', name: '全部', isActive: true}, ...res.data.category].map(item => {
                                          return {...item, label: item.name}
                                        })
                                        this.list.push({label: '专业', list: data})
                                      })
      }
    }
  },
  created(){
    this.getTypeList()
    this.fetchData()
  }
}
</script>

<style scoped lang='scss' >
.list-wrapper{
  .my-navs{
    margin-top:20px;
  }
  .item-list{
    margin-top:20px;
  }
}
</style>
