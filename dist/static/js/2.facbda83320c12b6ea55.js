webpackJsonp([2],{"+EBp":function(a,e){},Y7I0:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=window.location.protocol+"//yangzhiyuan.top",o={data:function(){return{formData:{url:""},uploadUrl:r+"/upload"}},methods:{handleAvatarSuccess:function(a){this.formData.url=a.data.url},beforeAvatarUpload:function(a){var e="image/jpeg"===a.type,t="image/png"===a.type,r="image/gif"===a.type,o="image/bmp"===a.type,s=a.size/1024/1024<3;return e||t||r||o||this.$message.error("上传图片格式错误!"),s||this.$message.error("上传头像图片大小不能超过 3MB!"),(e||t||r||o)&&s}}},s={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"test"},[t("el-form",{attrs:{"label-width":"100px"}},[t("el-form-item",{attrs:{label:"上传图片"}},[t("el-upload",{staticClass:"avatar-uploader",attrs:{action:a.uploadUrl,"show-file-list":!1,"on-success":a.handleAvatarSuccess,"before-upload":a.beforeAvatarUpload}},[a.formData.url?t("img",{staticClass:"avatar",attrs:{src:a.formData.url}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),a._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:a.formData.cover_image,expression:"formData.cover_image"}],attrs:{type:"hidden"},domProps:{value:a.formData.cover_image},on:{input:function(e){e.target.composing||a.$set(a.formData,"cover_image",e.target.value)}}})],1)],1)],1)},staticRenderFns:[]};var i=t("C7Lr")(o,s,!1,function(a){t("pi2B"),t("+EBp")},"data-v-32cc4516",null);e.default=i.exports},pi2B:function(a,e){}});
//# sourceMappingURL=2.facbda83320c12b6ea55.js.map