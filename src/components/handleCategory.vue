<template>
  <el-dialog title="Are you happy to add it?" :visible.sync="visible" width="800px" top="50px">
    <el-form :model="formData" ref="dataForm" :rules="rules" label-width="80px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="formData.name"/>
      </el-form-item>
    </el-form>
    <span class="dialog-footer" slot="footer">
      <el-button size="small" @click="visible=false">取消</el-button>
      <el-button size="small" type="primary" :loading="confirmLoading" @click="confirmAction">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { handleCategory } from "../api/index";
export default {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      formJson: {
        name: ""
      },
      formData: Object.assign({}, this.formJson),
      rules: {
        name: [
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
    confirmAction() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          var params = Object.assign({}, this.formData);
          this.confirmLoading = true;
          handleCategory(params).then(res => {
            this.confirmLoading = false;
            if (res.code == 0) {
              this.visible = false;
              this.$parent.getCategory();
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
