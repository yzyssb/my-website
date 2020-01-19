// import Vue from 'vue'
// import Router from 'vue-router'
var router = new VueRouter({
  mode: 'hash',
  // base: '/my-favor/',
  routes: [
    { //首页
      path: '/',
      name: 'index',
      component: resolve => require(['../pages/index'], resolve),
      meta: {
        keepAlive: true,
        needHeader:true
      }
    },
    { //文章详情
      path: '/article',
      name: 'articleDetail',
      component: resolve => require(['../pages/articleDetail'], resolve),
      meta:{
        needHeader:true
      }
    },
    { //测试页
      path: '/test1',
      name: 'test1',
      component: resolve => require(['../pages/test1'], resolve),
      meta:{
        needHeader:false
      }
    },
    { //测试页
      path: '/html',
      name: 'downloadHTML',
      component: resolve => require(['../pages/downloadHTML'], resolve),
      meta:{
        needHeader:false
      }
    },
    { //斗鱼新闻列表
      path: '/dy',
      name: 'dyList',
      component: resolve => require(['../pages/dyList'], resolve),
      meta:{
        needHeader:false
      }
    },
  ]
})
router.beforeEach((to, from, next) => {
  next()
});
router.afterEach((to, from) => {
  window.scrollTo(0, 0);
})
export default router;
