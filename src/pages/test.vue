<template>
    <div class="test">
        <el-form label-width="100px">
            <el-form-item label="上传图片">
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="formData.url" :src="formData.url" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <input v-model="formData.cover_image" type="hidden">
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import baseUrl from "../util/baseUrl";
export default {
  data() {
    return {
      formData: {
        url: ""
      },
      uploadUrl: baseUrl + "/upload"
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      this.formData.url = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isBMP = file.type === "image/bmp";
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isJPG && !isPNG && !isGIF && !isBMP) {
        this.$message.error("上传图片格式错误!");
      }
      if (!isLt3M) {
        this.$message.error("上传头像图片大小不能超过 3MB!");
      }
      return (isJPG || isPNG || isGIF || isBMP) && isLt3M;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 300px;
  display: block;
}
</style>
