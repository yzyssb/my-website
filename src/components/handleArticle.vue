<template>
  <el-dialog title="Are you happy to add it?" :visible.sync="visible" width="800px" top="50px">
    <el-form :model="formData" ref="dataForm" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title"/>
      </el-form-item>
      <el-form-item label="分类" prop="category_id">
        <el-select v-model="formData.category_id">
          <el-option v-for="(v,i) in categoryList" :key="i" :label="v.name" :value="v.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <!-- <el-input v-model="formData.content" type="textarea" :rows="4"/> -->
        <tinymce v-if="visible" v-model="formData.content" />
      </el-form-item>
    </el-form>
    <span class="dialog-footer" slot="footer">
      <el-button size="small" @click="visible=false">取消</el-button>
      <el-button size="small" type="primary" :loading="confirmLoading" @click="confirmAction">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { handleArticle } from "../api/index";
import Tinymce from "./Tinymce/index";
export default {
  props: {
    categoryList: {
      type: Array,
      default: []
    }
  },
  components: {
    Tinymce
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      formJson: {
        title: "",
        category_id: "",
        content: ""
      },
      formData: Object.assign({}, this.formJson),
      rules: {
        title: [
          {
            required: true,
            message: "请输入",
            trigger: ["blur", "change"]
          }
        ],
        catergory_id: [
          {
            required: true,
            message: "请选择",
            trigger: ["blur", "change"]
          }
        ],
        content: [
          {
            required: true,
            message: "请输入",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    //确认新增、修改文章
    confirmAction() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          var params = Object.assign({}, this.formData);
          params.category_id = String(params.category_id);
          this.confirmLoading = true;
          handleArticle(params).then(res => {
            this.confirmLoading = false;
            if (res.code == 0) {
              this.visible = false;
              this.$parent.getList();
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
