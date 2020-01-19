<template>
  <div class="upload-img">
    <div class="img-list flex-row" v-if="urls.length>0">
      <div class="img-item" v-for="(v,i) in urls" :key="i">
        <el-image :src="v" fit="contain" class="img"/>
        <i class="el-icon-close icon-delete" @click="delteImg(i)"></i>
      </div>
    </div>
    <input type="file" multiple @change="upload">
    <!-- vueCropper 剪裁图片实现-->
    <el-dialog title="图片剪裁" :visible.sync="cropperVisible" width="1040px" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
            @realTime="realTime"
          ></vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cropperVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="finish" :loading="loading">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { multiUpload, delFile } from "../api/dy";
export default {
  props: {
    urls: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      cropperVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 800, // 默认生成截图框宽度
        autoCropHeight: 800, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: true, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      loading: false,
      files: null
    };
  },
  methods: {
    delteImg(idx) {
      var params={
        path:this.urls[idx].split('uploads/')[1]
      }
      this.urls.splice(idx, 1);
      delFile(params).then(res=>{})
    },
    upload(e) {
      var files = e.target.files;
      var formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        formData.append("image[]", files[i]);
      }
      multiUpload(formData).then(res => {
        if (res.data.length > 0) {
          var imgs = [];
          res.data.map(v => {
            imgs.push(v.url);
          });
          this.urls = this.urls.concat(imgs);
          this.$emit("transferUrls", this.urls);
        }
      });
      // this.files=files
      //   console.log(files)
      // this.fileinfo = files[0];
      // let _URL = window.URL || window.webkitURL;
      // let img = new Image();
      // img.src = _URL.createObjectURL(this.fileinfo);
      // this.$nextTick(() => {
      //   this.option.img = img.src;
      //   this.cropperVisible = true;
      //   this.loading = false;
      // });
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      this.$refs.cropper.getCropBlob(data => {
        console.log(data, this.fileinfo);
        data.lastModified = this.fileinfo.lastModified;
        data.lastModifiedDate = this.fileinfo.lastModifiedDate;
        data.name = this.fileinfo.name;
        data.webkitRelativePath = this.fileinfo.webkitRelativePath;
        var formData = new FormData();
        for (var i = 0; i < this.files.length; i++) {
          if (i == 0) {
            formData.append("image[]", data);
          } else {
            formData.append("image[]", this.files[i]);
          }
        }

        multiUpload(formData).then(res => {
          if (res.data.length > 0) {
            var imgs = [];
            res.data.map(v => {
              imgs.push(v.url);
            });
            this.urls = this.urls.concat(imgs);
            this.$emit("transferUrls", this.urls);
          }
        });
        // var fileName = "goods" + this.fileinfo.lastModified;
        // this.loading = true;
        // data.uid = this.fileinfo.uid;
        // console.log(data);
        // const imgSize = data.size / 1024;
        // if (imgSize > 500) {
        //   this.$message.error("上传图片大小不能超过 500kb!");
        //   this.loading = false;
        //   return false;
        // }
        // let formData = new FormData();
        // formData.append("file", data);
        // qiuniuUpToken(formData).then(res => {
        //   this.loading = false;
        //   this.cropperVisible = false;
        //   this.$emit("transferUrl", res);
        // });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.img-list {
  justify-content: flex-start;
  .img-item {
    width: 100px;
    height: 100px;
    background: #eee;
    margin-right: 10px;
    position: relative;
    .img {
      width: 100%;
      height: 100%;
    }
    .icon-delete {
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  }
}
// 截图
.cropper-content {
  .cropper {
    width: 1000px;
    height: 480px;
  }
}
</style>
