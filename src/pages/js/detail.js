// var HTTP_URL = "http://192.168.1.195:8888";
// // var HTTP_URL="https://api.dazuhang.com";
// var obj = {}
// var params = {
//     goods_id: getUrlParams('id') || 1102
// }

// $.post(HTTP_URL + '/goodsDetail', params, function (res) {
//     if (res.code == 0 || res.code == 1) {
//         var data = res.data
//         obj = res.data

//         document.title = data.name
//         $('[name="keywords"]').attr('content', data.name + ',' + $('[name="keywords"]').attr('content'))
//         $('[name="description"]').attr('content', data.name + ',' + $('[name="description"]').attr('content'))

//         if (data.image_arr.length > 0) {
//             $('.swiper-wrapper').html('')
//             data.image_arr.map(v => {
//                 $('.swiper-wrapper').append(
//                     '<div class="swiper-slide">' +
//                     '<div class="swiper-zoom-container">' +
//                     '<img src="' + v + '"/>' +
//                     '</div>' +
//                     '</div>'
//                 )
//             })
//             var swiper = new Swiper('.swiper-container', {
//                 zoom: true,
//                 pagination: {
//                     el: '.swiper-pagination',
//                 },
//                 navigation: {
//                     nextEl: '.swiper-button-next',
//                     prevEl: '.swiper-button-prev',
//                 },
//             });
//         }
//         $('.name').html('<span>' + data.name + '</span>')
//         $('.manhui_right').html('<span>' + data.goods_config[0].price_discounts + '</span>')
//         $('.yuan').html('<span>' + obj.goods_config[0].calc_price + '</span>')
//         $('.dian_name').html(obj.supplier_info.name)
//         $('.dian_cs').html('<span>出租次数：' + obj.supplier_info.sales_volume + '</span>')
//         if (obj.goods_config.length > 0) {
//             $('.pz_right>div').html('')
//             obj.goods_config.map(v => {
//                 $('.pz_right>div').append(
//                     '<text class="pzmc">' + v.config_name + '</text>'
//                 )
//             })
//             $('.pzmc').eq(0).addClass('pzmc1')
//         }
//         $('.yj').html('<span>' + '该套餐押金: ¥' + obj.goods_config[0].deposit + '元' + '</span>')
//         if (obj.goods_config[0].configuration_list.length > 0) {
//             $('.pzlist').html(
//                 '<div class="list">配置清单：</div>' +
//                 '<div class="lists"><span>' + obj.goods_config[0].configuration_list + '</span></div>'
//             )
//         }
//         if (obj.goods_recommend.total > 0) {
//             $('.tuijian').html('<div class="recommend_title">为你推荐</div><div class="recommend_box"></div>')
//             $('.recommend_box').html('')
//             obj.goods_recommend.data.map(v => {
//                 $('.recommend_box').append(
//                     '<a target="_blank" class="recommend1" href="detail.html?id=' + v.id + '">' +
//                     '<img src="' + v.cover_image + '" class="rerecommend-1"/>' +
//                     '<div class="recommend1_zi">' +
//                     '<div class="line2">' + v.name + '</div>' +
//                     '<div class="piace">¥' + v.price + '/天</div>' +
//                     '<div class="name1">' +
//                     '<text class="name-dian">' + v.supplier_name + '</text>' +
//                     '<img src="./images/fenlei_zuwuche@2x.png" class="name-image" />' +
//                     '</div>' +
//                     '</div>' +
//                     '</a>'
//                 )
//             })
//         }
//         $('.xiangqing').eq(0).html(obj.goods_info)
//         $('.xiangqing').eq(1).html(obj.app_problem.content)
//     }
// })

// $.post(HTTP_URL + '/pc_commentList', params, function (res) {
//     if (res.code == 0 || res.code == 1) {
//         if (res.data.total > 0) {
//             $('.xiangqing').eq(2).html('')
//             res.data.data.map(v => {
//                 $('.xiangqing').eq(2).append(
//                     '<div class="yhpj_1">' +
//                     '<img src="' + (v.avatar || './images/default_avatar.png') + '" class="yhpj_images" />' +
//                     '<div class="yhpj_top">' +
//                     '<div class="ttt1">' +
//                     '<text class="yh_name">' + (v.nickname || '姚瑞娟') + '</text>' +
//                     '<text class="yh_time">' + v.create_time + '</text>' +
//                     '</div>' +
//                     '<div class="box_quanbu">' +
//                     '<div class="yhpj">' + v.content + '</div>' +
//                     '</div>' +
//                     '</div>' +
//                     '</div>'
//                 )
//             })
//         }
//     }
// })

// $(document).on('click', '.pzmc', function () {
//     var idx = $(this).index()
//     $(this).addClass('pzmc1').siblings().removeClass('pzmc1')
//     $('.yuan').html('<span>' + obj.goods_config[idx].calc_price + '</span>')
//     $('.pzmc1').html('<span>' + obj.goods_config[idx].config_name + '</span>')
//     $('.manhui_right').html('<span>' + obj.goods_config[idx].price_discounts + '</span>')
//     $('.yj').html('<span>' + '该套餐押金: ¥' + obj.goods_config[idx].deposit + '元' + '</span>')
//     $('.lists').html('<span>' + obj.goods_config[idx].configuration_list + '</span>')
// })
// $(document).on('click', '.cj', function () {
//     var idx = $(this).index()
//     $(this).addClass('tw').siblings().removeClass('tw')
//     $('.xiangqing').eq(idx).addClass('show').siblings('.xiangqing').removeClass('show')
// })

// $('.btn').click(function () {
//     alert('请去我们的app(大租行)、微信小程序(大租行)、电脑端网站(www.dazuhang.com)浏览下单')
// })

// function getUrlParams(name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
//     var r = window.location.search.substr(1).match(reg);
//     if (r != null) return unescape(r[2]);
//     return null;
// }