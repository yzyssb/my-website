<template>
  <div>
    <div class="fixed-input">
      <input type="text" v-model="goods_id">
      <span @click="initData">下载</span>
    </div>
    <div class="copy">
      <div class="box">
        <div class="bo">
          <div class="swiper-container">
            <div class="swiper-wrapper"></div>
            <div class="swiper-pagination swiper-pagination-white"></div>
          </div>
        </div>
        <div class="detail">
          <div class="detail-1">
            <div class="yuan"></div>
            <img src="https://qn.dazuhang.com/Image_1577431890245868" class="dian_sc btn">
          </div>
          <div class="name"></div>
          <div class="manhui1">
            <text class="maihui_left">满惠</text>
          </div>
          <div class="detail_center">
            <text class="manhui_right"></text>
          </div>
          <div class="detail_bottom">
            <div class="dian_zl">
              <text class="dian_name"></text>
              <text class="dian_cs"></text>
            </div>
          </div>
        </div>
        <div class="peizhi">
          <div class="peizhi_1">
            <text class="pz_2">配 置</text>
            <div class="pz_right">
              <div></div>
            </div>
          </div>
          <div class="yj"></div>
        </div>
        <div class="pzlist"></div>
        <div class="tuijian"></div>
        <div class="next_2">
          <div class="next-2">
            <div class="cj tw">图文详情</div>
            <div class="cj">常见问题</div>
            <div class="cj">用户评价</div>
          </div>
          <div class="xiangqing show"></div>
          <div class="xiangqing"></div>
          <div class="xiangqing"></div>
        </div>
        <div class="footer">
          <div class="footer_left btn">
            <div class="left_dp">
              <img class="b_1" src="https://qn.dazuhang.com/Image_1577431860180934">
              <div class="v">店铺</div>
            </div>
            <div class="left_kf btn">
              <img class="b_2" src="https://qn.dazuhang.com/Image_1577431903414519">
              <div class="v">客服</div>
            </div>
            <div class="left_zwc btn">
              <img class="b_3" src="https://qn.dazuhang.com/Image_1577431917590939">
              <div class="v">租物车</div>
            </div>
          </div>
          <div class="footer_right">
            <text id="btn" class="btn1 btn">加入租物车</text>
            <text class="btn2 btn">立即租</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "test1",
  data() {
    return {
      goods_id: 355,
      goods_name: "",

      HTTP_URL: "https://api.dazuhang.com"
    };
  },
  methods: {
    download() {
      var content =
        `  
        <!DOCTYPE html>
          <html>

          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no" />
            <meta name="keywords"
              content="${
                this.goods_name
              },单反相机租赁,摄像机租赁,镜头租赁,相机租用,摄像机租用,直播设备租赁,录音设备租赁,灯光器材租赁,航拍,摇臂,导播,单反,镜头,灯光,录音设备,摄影人员">
            <meta name="description"
              content="${
                this.goods_name
              },大租行是国内专业为企业和个人提供影视器材租赁的互联网平台，可供租赁的设备有:单反相机、镜头、航拍无人机、gopro摄像机、稳定器、直播设备，影视灯光、录音话筒、轨道、摇臂等专业影视设备。">
            <title>${this.goods_name}</title>
            <link rel="shortcut icon" type="image/x-icon" href="https://qn.dazuhang.com/Image_1577443059806300">
            <link rel="stylesheet" type="text/css" href="css/new_file.css" />
            <link rel="stylesheet" href="css/swiper.min.css">
          </head>

          <body>` +
        $(".copy").html() +
        `<script src="js/swiper.min.js"><\/script>
          <script src="https://cdn.bootcss.com/jquery/3.4.0/jquery.min.js"><\/script>
          <script>
            var swiper = new Swiper('.swiper-container', {
              zoom: true,
              pagination: {
                el: '.swiper-pagination',
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            });
          <\/script>
          <script src="js/detail.js"><\/script>
        </body>

        </html>
      `;
      var a = document.createElement("a");
      var url = window.URL.createObjectURL(
        new Blob([content], { type: "html" + ";charset=" + "utf-8" })
      );
      a.href = url;
      a.download = this.goods_id + ".html";
      a.click();
      window.URL.revokeObjectURL(url);
    },
    initData() {
      var obj = {};
      var params = {
        goods_id: this.goods_id
      };
      var that = this;
      $.post(this.HTTP_URL + "/goodsDetail", params, function(res) {
        if (res.code == 0 || res.code == 1) {
          var data = res.data;
          obj = res.data;
          that.goods_name = data.name;

          if (data.image_arr.length > 0) {
            $(".swiper-wrapper").html("");
            data.image_arr.map(v => {
              $(".swiper-wrapper").append(
                '<div class="swiper-slide">' +
                  '<div class="swiper-zoom-container">' +
                  '<img src="' +
                  v +
                  '"/>' +
                  "</div>" +
                  "</div>"
              );
            });
          }

          $(".name").html("<span>" + data.name + "</span>");
          $(".manhui_right").html(
            "<span>" + data.goods_config[0].price_discounts + "</span>"
          );
          $(".yuan").html(
            "<span>" + obj.goods_config[0].calc_price + "</span>"
          );
          $(".dian_name").html(obj.supplier_info.name);
          $(".dian_cs").html(
            "<span>出租次数：" + obj.supplier_info.sales_volume + "</span>"
          );
          if (obj.goods_config.length > 0) {
            $(".pz_right>div").html("");
            obj.goods_config.map(v => {
              $(".pz_right>div").append(
                '<text class="pzmc">' + v.config_name + "</text>"
              );
            });
            $(".pzmc")
              .eq(0)
              .addClass("pzmc1");
          }
          $(".yj").html(
            "<span>" +
              "该套餐押金: ¥" +
              obj.goods_config[0].deposit +
              "元" +
              "</span>"
          );
          if (obj.goods_config[0].configuration_list.length > 0) {
            $(".pzlist").html(
              '<div class="list">配置清单：</div>' +
                '<div class="lists"><span>' +
                obj.goods_config[0].configuration_list +
                "</span></div>"
            );
          }
          if (obj.goods_recommend.total > 0) {
            $(".tuijian").html(
              '<div class="recommend_title">为你推荐</div><div class="recommend_box"></div>'
            );
            $(".recommend_box").html("");
            obj.goods_recommend.data.map(v => {
              $(".recommend_box").append(
                '<a target="_blank" class="recommend1" href="' +
                  v.id +
                  '.html">' +
                  '<img src="' +
                  v.cover_image +
                  '" class="rerecommend-1"/>' +
                  '<div class="recommend1_zi">' +
                  '<div class="line2">' +
                  v.name +
                  "</div>" +
                  '<div class="piace">¥' +
                  v.price +
                  "/天</div>" +
                  '<div class="name1">' +
                  '<text class="name-dian">' +
                  v.supplier_name +
                  "</text>" +
                  '<img src="https://qn.dazuhang.com/Image_1577431874628380" class="name-image" />' +
                  "</div>" +
                  "</div>" +
                  "</a>"
              );
            });
          }
          $(".xiangqing")
            .eq(0)
            .html(obj.goods_info);
          $(".xiangqing")
            .eq(1)
            .html(obj.app_problem.content);
          that.getComments();
        }
      });
    },
    getComments() {
      var that = this;
      var params = {
        goods_id: this.goods_id
      };
      $.post(this.HTTP_URL + "/pc_commentList", params, function(res) {
        if (res.code == 0 || res.code == 1) {
          if (res.data.total > 0) {
            $(".xiangqing")
              .eq(2)
              .html("");
            res.data.data.map(v => {
              $(".xiangqing")
                .eq(2)
                .append(
                  '<div class="yhpj_1">' +
                    '<img src="' +
                    (v.avatar || "./images/default_avatar.png") +
                    '" class="yhpj_images" />' +
                    '<div class="yhpj_top">' +
                    '<div class="ttt1">' +
                    '<text class="yh_name">' +
                    (v.nickname || "姚瑞娟") +
                    "</text>" +
                    '<text class="yh_time">' +
                    v.create_time +
                    "</text>" +
                    "</div>" +
                    '<div class="box_quanbu">' +
                    '<div class="yhpj">' +
                    v.content +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                );
            });
          }
          that.$message.success("数据请求成功");
          that.download();
        }
      });
    }
  }
};
</script>