<template>
  <el-dialog title="Are you happy to add it?" :visible.sync="visible" :before-clsoe="cancelAction" width="1000px" top="50px">
    <el-form :model="formData" ref="dataForm" size="mini" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title"/>
      </el-form-item>
      <el-form-item label="摘要" prop="sub_title">
        <el-input type="textarea" v-model="formData.sub_title" />
      </el-form-item>
      <el-form-item label="展示类型" prop="type">
        <el-radio-group v-model="formData.type" @change="typeChange">
          <el-radio label="1">真</el-radio>
          <el-radio label="2">假</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="封面" prop="img_arr">
        <upload-img :urls="formData.img_arr" @transferUrls="getUrls" />
      </el-form-item>
      <el-form-item label="分类" prop="category_id">
        <el-select v-model="formData.category_id">
          <el-option v-for="(v,i) in categoryList" :key="i" :label="v.title" :value="v.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <tinymce v-if="visible" v-model="formData.content" />
      </el-form-item>
    </el-form>
    <span class="dialog-footer" slot="footer">
      <el-button size="small" @click="cancelAction">取消</el-button>
      <el-button size="small" type="primary" :loading="confirmLoading" @click="confirmAction">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { dyCategoryList,dyNewArticle } from "../api/dy";
export default {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      formJson: {
        title: "",
        sub_title:"",
        type:'1',
        img_arr:[],
        category_id: "",
        content: ""
      },
      categoryList:[],
      formData: Object.assign({}, this.formJson),
      rules: {
        title: [
          {
            required: true,
            message: "请输入",
            trigger: ["blur", "change"]
          }
        ],
        sub_title:[
            {
            required: true,
            message: "请输入",
            trigger: ["blur", "change"]
          }
        ],
        type:[
            {
            required: true,
            message: "请选择",
            trigger: ["blur", "change"]
          }
        ],
        category_id: [
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
  components:{
      Tinymce:resolve=>require(['./Tinymce/index'],resolve),
      uploadImg:resolve=>require(['./uploadImg'],resolve),
  },
  methods: {
    dyCategoryList(data){
        dyCategoryList(data).then(res=>{
            this.categoryList=res.data
        })
    },
    typeChange(e){
      this.dyCategoryList({type:e})
    },
    getUrls(data){
        this.$set(this.formData,'img_arr',data)
        this.$refs.dataForm.validateField('img_arr')
    },
    cancelAction(){
        this.confirmLoading=false
        this.visible=false
    },
    //确认新增、修改文章
    confirmAction() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
            var params=Object.assign({},this.formData)
            params.img_arr=params.img_arr.join(',')
            this.confirmLoading=true
            dyNewArticle(params).then(res=>{
                this.$emit('transferNewResult')
                this.confirmLoading=false
                this.$message.success("编辑成功")
                this.visible=false

            })
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
