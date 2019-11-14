<template>
  <div class="page">
    <el-container>
      <el-header>
        <span @click="toggleAside">Header</span>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="12">12</el-col>
          <el-col :span="12">12</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">8</el-col>
          <el-col :span="8">8</el-col>
          <el-col :span="8">8</el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="12">12</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="2">2</el-col>
          <el-col :span="8">
            <div class="infinite-list-wrapper" style="overflow:auto">
              <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
                <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
              </ul>
              <p v-if="loading">加载中...</p>
              <p v-if="noMore">没有更多了</p>
            </div>
          </el-col>
          <el-col :span="2">2</el-col>
        </el-row>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
    <el-drawer :visible.sync="visible" direction="rtl">1111</el-drawer>
  </div>
</template>
<script>
export default {
  name: 'test1',
  data () {
    return {
      visible: false,

      count: 10,
      loading: false
    }
  },
  computed: {
    noMore () {
      return this.count >= 20
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    toggleAside () {
      this.visible = !this.visible
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    }
  }
}
</script>
<style lang="scss" scoped>
  .page {
    font-size: initial !important;
  }
  .infinite-list-wrapper{
    height: 400px;
  }
  .list-item,.infinite-list-wrapper p{
    line-height: 50px;
  }
</style>
<style>
  .el-header,
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body>.el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-col:nth-child(2n) {
    background: #99a9bf;
  }

  .el-col:nth-child(2n+1) {
    background: #d3dce6;
  }
</style>
