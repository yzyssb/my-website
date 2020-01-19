<template>
  <div class="page-dy">
    <el-row>
      <el-col :span="12" :offset="6">
        <search-com :query="query" @transferQuery="getQuery" @showNewDialog="newArticle"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form inline size="mini">
          <el-form-item label="文件类型">
            <el-select v-model="fileType" placeholder="请选择" style="width:100px">
              <el-option label="文件" value="1"></el-option>
              <el-option label="文件夹" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文件路径">
            <el-input v-model="path"/>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="delFiles">删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="mb20">
      <el-col :span="18" :offset="3">
        <el-table :data="list" size="mini">
          <el-table-column label="ID" prop="id" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="标题" prop="title" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="类型" prop="msg_type" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-tag size="mini" :type="scope.row.msg_type|msgTypeColor">{{scope.row.msg_type|msgType}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="封面" prop="img_arr" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-image
                v-for="(v,i) in scope.row.img_arr"
                v-if="i<3"
                :key="i"
                :src="v"
                fit="contain"
                class="small-img"
              ></el-image>
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
    <new-article-dialog ref="newDialog" @transferNewResult="canRefresList"/>
  </div>
</template>
<script>
import { dyArticleList, dyDelete, delFile, delAllFiels } from "../api/dy";
export default {
  name: "dyList",
  data() {
    return {
      query: {
        page: 1,
        limit: 10,
        key: ""
      },
      list: [],

      path: "",
      fileType: "1"
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
    delFiles() {
      if (this.fileType == 1) {
        delFile({ path: this.path }).then(res => {
          this.path = "";
          this.$message.success("删除成功");
        });
      } else {
        delAllFiels({ path: this.path }).then(res => {
          this.path = "";
          this.$message.success("删除成功");
        });
      }
    },
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
    getQuery(data) {
      this.query = Object.assign({}, data);
      this.getList();
    },
    newArticle(item = null) {
      this.$refs.newDialog.visible = true;
      this.$nextTick(() => {
        this.$refs.newDialog.formData = Object.assign(
          {},
          !item ? this.$refs.newDialog.formJson : item
        );
        var params = {
          type: item ? item.type : this.$refs.newDialog.formData.type
        };
        this.$refs.newDialog.dyCategoryList(params);
        this.$refs.newDialog.$refs.dataForm.resetFields();
      });
    },
    canRefresList() {
      this.query.page = 1;
      this.getList();
    },
    deleteArticle(item) {
      dyDelete({ id: item.id }).then(res => {
        this.getList();
      });
    }
  },
  filters:{
    msgType(status){
      const obj={
        1:'文字',
        2:'图文'
      }
      return obj[status]
    },
    msgTypeColor(status){
      const obj={
        1:'primary',
        2:'success'
      }
      return obj[status]
    },
  }
};
</script>
<style lang="scss" scoped>
.small-img {
  width: 50px;
  height: 50px;
  background: #eee;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
