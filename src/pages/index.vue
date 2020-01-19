<template>
  <div class="yzy-page index-page">
    <div class="yzy-container index-container flex-column">
      <ul class="category-list flex-row">
        <li v-for="(v,i) in categoryList" :key="i" :class="{'active':currentId==v.id,'pointer':true}" @click="chooseCategory(v)">
          {{v.name}}
          <span class="handle-btns flex-row space-around" v-if="isLogin">
            <i class="el-icon-edit pointer" @click.stop="handleCategoryAction(v)"></i>
            <i class="el-icon-close pointer" @click.stop="deleteCategoryAction(v)"></i>
          </span>
        </li>
      </ul>
      <div class="infinite-list-wrapper flex-1" style="overflow:auto">
        <ul class="articles-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="disabled">
          <ol v-for="(v,i) in articlesList" :key="i" class="pointer" @click="jumpToArticle(v)">
            <a>
              <p class="article-title text-overflow">{{i+1}}、{{v.title}}</p>
              <p class="flex-row space-between c9 f12">
                <span class="article-cont flex-1" v-html="v.abstract"></span>
                <span class="create-time">{{v.create_time}}</span>
              </p>
              <span class="handle-btns flex-row space-around" v-if="isLogin">
                <i class="el-icon-edit pointer" @click.stop="handleArticleAction(v)"></i>
                <i class="el-icon-close pointer" @click.stop="deleteArticleAction(v)"></i>
              </span>
            </a>
          </ol>
        </ul>
        <p v-if="!noMore&&loading" class="no-data">加载中...</p>
        <p v-if="!loading&&noMore" class="no-data">没有更多了...</p>
      </div>
    </div>
    <span class="jump-circle pointer" @click="handleArticleAction(null)">
      <i class="el-icon-s-promotion"></i>
    </span>
    <span class="jump-circle jump-circle-t pointer" @click="handleCategoryAction(null)" v-if="isLogin">
      <i class="el-icon-s-promotion"></i>
    </span>
    <!-- 新增、修改分类 -->
    <category-dialog ref="categoryCom" />
    <!-- 新增、修改文章 -->
    <article-dialog ref="articleCom" :categoryList="categoryList" />
  </div>
</template>
<script>
import {
  getCategory,
  deleteCategory,
  getAllArticles,
  getArticlesByCategoryId,
  deleteArticle
} from '../api/index'
import CategoryDialog from '../components/handleCategory'
import ArticleDialog from '../components/handleArticle'
export default {
  name: 'index',
  data () {
    return {
      categoryList: [],
      articlesList: [],
      query: {
        key: '',
        page: 1,
        limit: 20
      },
      total: 0,

      currentId: '',
      loading: false,

      cateDeleteLoading: false,
      articleDeleteLoading: false,
      isLogin: sessionStorage.getItem('yzy-pwd') || false
    }
  },
  components: {
    CategoryDialog,
    ArticleDialog
  },
  computed: {
    noMore () {
      return this.articlesList.length >= this.total
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    jumpToArticle (v) {
      this.$router.push({
        path: '/article',
        query: {
          id: v.id
        }
      })
    },
    trim (str) {
      return str.replace(/^\s+|\s+$/gm, '')
    },
    // 获取所有分类
    getCategory () {
      getCategory().then(res => {
        this.categoryList = res.data
      })
    },
    // 获取所有文章
    getAllArticles () {
      var params = {
        key: this.query.key ? this.trim(this.query.key) : '',
        page: this.query.page,
        limit: this.query.limit
      }
      this.loading = true
      getAllArticles(params).then(res => {
        if (res.code == 0) {
          var arr = []
          if (this.query.page > 1) {
            arr = this.articlesList
          }
          this.articlesList = arr.concat(res.data.data)
          this.total = res.data.total
          this.query.page = res.data.current_page
        } else {
          this.$message.error(res.msg)
        }
        this.loading = false
      })
    },
    loadMore () {
      this.query.page++
      console.log(this.query.page)
      this.getList()
    },
    // 选择分类
    chooseCategory (v) {
      this.query.page = 1
      this.currentId = this.currentId == v.id ? '' : v.id
      this.getList()
    },
    getList () {
      if (!this.currentId) this.getAllArticles()
      else this.getArticlesByCategoryId()
    },
    // 根据分类id查询文章
    getArticlesByCategoryId () {
      var params = {
        category_id: this.currentId,
        page: this.query.page,
        limit: this.query.limit
      }
      this.loading = true
      getArticlesByCategoryId(params).then(res => {
        if (res.code == 0) {
          var arr = []
          if (this.query.page > 1) {
            arr = this.articlesList
          }
          this.articlesList = arr.concat(res.data.data)
          this.total = res.data.total
          this.query.page = res.data.current_page
        } else {
          this.$message.error(res.msg)
        }
        this.loading = false
      })
    },
    // 操作文章
    handleArticleAction (v) {
      if (!this.isLogin) {
        this.login()
        return
      }
      this.$refs.articleCom.visible = true
      this.$refs.articleCom.$nextTick(() => {
        this.$refs.articleCom.formData = Object.assign({},
          v || this.$refs.articleCom.formJson
        )
        this.$refs.articleCom.$refs.dataForm.resetFields()
      })
    },
    // 删除文章
    deleteArticleAction (v) {
      if (this.articleDeleteLoading) return
      this.articleDeleteLoading = true
      deleteArticle({
        id: v.id
      }).then(res => {
        this.articleDeleteLoading = false
        if (res.code == 0) {
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    // 操作分类
    handleCategoryAction (v) {
      this.$refs.categoryCom.visible = true
      this.$refs.categoryCom.$nextTick(() => {
        this.$refs.categoryCom.formData = Object.assign({},
          v || this.$refs.categoryCom.formJson
        )
        this.$refs.categoryCom.$refs.dataForm.resetFields()
      })
    },
    // 删除分类
    deleteCategoryAction (v) {
      if (this.cateDeleteLoading) return
      this.cateDeleteLoading = true
      deleteCategory({
        id: v.id
      }).then(res => {
        this.cateDeleteLoading = false
        if (res.code == 0) {
          this.getCategory()
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 输入密码
    login () {
      this.$prompt('请输入管理员密码', '登录提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^yzyssb$/,
        inputErrorMessage: '密码不正确'
      })
        .then(({
          value
        }) => {
          this.$message.success('登录成功')
          sessionStorage.setItem('yzy-pwd', true)
          this.isLogin = true
        })
        .catch(() => {})
    }
  },
  created () {
    this.getCategory()
    this.getAllArticles()
  }
}
</script>
<style lang="scss" scoped>
  .index-page {
    .index-container {
      height: calc(100vh - 60px);
      .category-list {
        padding: 0 0 10px;

        >li {
          padding: 5px;
          border: 1px dashed red;
          font-size: 14px;
          margin-top: 10px;
          margin-right: 10px;
          position: relative;

          &:hover {
            z-index: 11;
          }

          &.active {
            background: red;
            color: #fff;
          }

          .handle-btns {
            position: absolute;
            right: -1px;
            bottom: -25px;
            padding: 5px;
            width: 50px;
            opacity: 0;
          }

          &:hover {
            .handle-btns {
              opacity: 0.5;
            }
          }
        }

        &.category-list-isFixed {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
        }
      }
      .articles-list {

        >ol {
          padding: 5px;
          position: relative;

          .article-title {
            width: 100%;
          }

          .article-cont {
            word-break: break-all;
          }

          .create-time {
            width: 150px;
            text-align: right;
          }

          .handle-btns {
            position: absolute;
            right: 0;
            top: 0;
            padding: 5px;
            color: #fff;
            width: 50px;
          }

          &:hover {
            background: rgba(80, 196, 161, 0.3);

            .handle-btns {
              background: rgba(0, 0, 0, 0.4);
            }
          }
        }
      }
    }

    .jump-circle {
      position: fixed;
      right: 50px;
      bottom: 50px;
      width: 80px;
      height: 80px;
      background: yellowgreen;
      border-radius: 50%;
      text-align: center;
      line-height: 72px;
      font-size: 50px;
      color: #fff;

      &.jump-circle-t {
        bottom: initial;
        top: 60px;
        right: 0;
        transform: scale(0.5);
        background: lightsalmon;
        opacity: 0;

        &:hover {
          opacity: 0.5;
        }
      }
    }
  }

  a:link {
    color: #ff0000;
  }

  /* unvisited link */
  a:visited {
    color: #00ff00;
  }

  /* visited link */
  a:hover {
    color: #ff00ff;
  }

  /* mouse over link */
  a:active {
    color: #0000ff;
  }

  /* selected link */
</style>
