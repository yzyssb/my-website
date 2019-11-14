<template>
  <div class="yzy-page article-detail-page">
    <div class="yzy-container detail-container" v-if="Object.keys(detailObj).length>0">
      <h2 align="center" class="gray-block">{{detailObj.title}}</h2>
      <h5 class="flex-row space-between gray-block detail-tags">
        <span class="tags">
          <el-tag type="success" size="mini">{{detailObj.category_name}}</el-tag>
        </span>
        <span class="create-time c9">{{detailObj.create_time}}</span>
      </h5>
      <div class="cont" v-html="detailObj.content"></div>
    </div>
    <div class="yzy-container detail-container no-date" v-else></div>
  </div>
</template>
<script>
import {
  getArticleDetail
} from '../api/index'
export default {
  name: 'articleDetail',
  data () {
    return {
      detailObj: {}
    }
  },
  methods: {
    getArticleDetail () {
      var params = {
        id: this.$route.query.id
      }
      getArticleDetail(params).then(res => {
        this.detailObj = res.data
      })
    }
  },
  created () {
    this.getArticleDetail()
  }
}
</script>
<style lang="scss" scoped>
  .detail-container {
    min-height: 100vh;

    >h2 {
      line-height: 50px;
      margin-bottom: 2px;
    }

    .detail-tags {
      line-height: 30px;
      font-weight: normal;
    }

    .gray-block {
      background: #eee;
      padding: 0 10px;
    }

    .cont {
      padding: 10px 0;

      img {
        width: 100%;
        height: auto;
      }
    }
  }
</style>
