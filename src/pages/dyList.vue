<template>
    <div class="page-dy">
        <el-row>
            <el-col :span="12" :offset="6">
                <search-com :query="query" @transferQuery="getQuery" @showNewDialog="newArticle"/>
            </el-col>
        </el-row>
        <el-row class="mb20">
            <el-col :span="18" :offset="3">
                <el-table :data="list" size="mini">
                    <el-table-column
                        label="ID"
                        prop="id"
                        align="center"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                        label="标题"
                        prop="title"
                        align="center"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                        label="摘要"
                        prop="sub_title"
                        align="center"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                        label="封面"
                        prop="img_arr"
                        align="center"
                        :show-overflow-tooltip="true"
                    >
                        <template slot-scope="scope">
                            <el-image v-for="(v,i) in scope.row.img_arr" v-if="i<3" :key="i" :src="v" fit="contain" class="small-img"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="创建时间"
                        prop="create_time"
                        align="center"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column label="操作" align="center" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="newArticle(scope.row)">编辑</el-button>
                            <el-button type="text" size="mini" @click="deleteArticle(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row v-if="list.length>0">
            <el-col :span="12" :offset="6">
                <el-pagination
                    class="pagination-container"
                    background=""
                    :page-size="query.limit"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total,sizes,prev, pager, next, jumper"
                    :page-sizes="[10, 20, 30, 50]"
                    :total="total"
                    :current-page="query.page"
                ></el-pagination>
            </el-col>
        </el-row>
        <new-article-dialog ref="newDialog" @transferNewResult="canRefresList" />
    </div>
</template>
<script>
import { dyArticleList,dyDelete } from "../api/dy";
export default {
  name: "dyList",
  data() {
    return {
      query: {
        page: 1,
        limit: 10,
        key: ""
      },
      list: []
    };
  },
  components: {
    searchCom: resolve => require(["../components/search"], resolve),
    newArticleDialog: resolve =>
      require(["../components/dyNewArticle"], resolve)
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      var params = Object.assign({}, this.query);
      dyArticleList(params).then(res => {
        this.list = res.data.data;
      });
    },
    handleSizeChange(val) {
      this.query.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.query.page = val;
      this.getList();
    },
    getQuery(data){
        this.query=Object.assign({},data)
        this.getList()
    },
    newArticle(item=null){
        this.$refs.newDialog.visible=true
        this.$nextTick(()=>{
            this.$refs.newDialog.formData=Object.assign({}, !item?this.$refs.newDialog.formJson:item)
            this.$refs.newDialog.$refs.dataForm.resetFields()
        })
    },
    canRefresList(){
        this.query.page=1
        this.getList();
    },
    deleteArticle(item){
        dyDelete({id:item.id}).then(res=>{
            this.getList();
        })
    }
  }
};
</script>
<style lang="scss" scoped>
.small-img{
    width:50px;
    height:50px;
    margin-right:10px;
    &:last-child{
        margin-right:0;
    }
}
</style>
