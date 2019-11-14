// import Vue from 'vue'
// import Router from 'vue-router'
var router = new VueRouter({
  mode: 'history',
  base: '/my-favor/',
  routes: [{ //*
    path: '*',
    redirect: '/',
    component: resolve => require(['../pages/index'], resolve),
    meta: {
      keepAlive: true
    }
  },
  { //首页
    path: '/',
    name: 'index',
    component: resolve => require(['../pages/index'], resolve),
    meta: {
      keepAlive: true
    }
  },
  { //文章详情
    path: '/article',
    name: 'articleDetail',
    component: resolve => require(['../pages/articleDetail'], resolve)
  },
  { //测试页：上传图片
    path: '/test',
    name: 'test',
    component: resolve => require(['../pages/test'], resolve)
  },
  { //测试页
    path: '/test1',
    name: 'test1',
    component: resolve => require(['../pages/test1'], resolve)
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
