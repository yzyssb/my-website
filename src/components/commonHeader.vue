<template>
  <div class="common-header">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1">收藏列表</el-menu-item>
      <!-- <el-submenu index="2">
        <template slot="title">待续1</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">待续2</el-menu-item>
      <el-menu-item index="4">待续3</el-menu-item> -->
    </el-menu>
    <el-input v-if="this.$route.path=='/'" class="search-input" size="mini" placeholder="请输入关键词" clearable v-model="search" suffix-icon="el-icon-search" @keyup.native.enter="transferSearch"></el-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      search: '',
      routeObj: {
        '1': '/'
      }
    }
  },
  methods: {
    handleSelect (e) {
      if (this.routeObj[e]) this.$router.push(this.routeObj[e])
      else this.$router.push('/')
    },
    transferSearch () {
      this.$emit('transferData', this.search)
    }
  }
}
</script>

<style lang="scss" scoped>
  .common-header{
    position: fixed;
    top: 0;
    left: 0;
    z-index:1000;
    width:100%;
    .search-input{
      position:absolute;
      right:20%;
      top:18px;
      width:250px;
    }
  }
  @media (min-width:768px){
    .el-menu-demo{
      padding:0 20%;
    }
  }
  @media (max-width:768px){
    .el-menu-demo{
      padding:0 10px;
    }
    .search-input{
      // display: none;
      width:150px !important;
    }
  }
</style>
