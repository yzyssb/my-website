<template>
  <div :class="$route.meta.needHeader?'app-page':'page'">
    <common-header v-if="$route.meta.needHeader" @transferData="getSearch"></common-header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" ref="mainRef" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" ref="mainRef" />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    commonHeader: resolve => require(['./components/commonHeader'], resolve)
  },
  methods: {
    getSearch (data) {
      this.$refs.mainRef.query.key = data
      this.$refs.mainRef.query.page = 1
      this.$refs.mainRef.getAllArticles()
    }
  }
}
</script>

<style>
  @import '../static/css/common.scss';
  /* elment-ui自带message组件 */
  /* [class^="el-message__icon"] {
    font-size: 24px !important;
  } */
</style>
