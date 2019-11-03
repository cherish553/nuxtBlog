<template>
  <div>
    <top />
    <div class="container clearfix">
      <div class="inner">
        <el-col :sm="16">
          <mavon-editor
            :value="data.inner"
            code-style="dark"
            :toolbars-flag="false"
            :subfield="false"
            default-open="preview"
          />
        </el-col>
        <right :tag-list="tagList" :category-list="categoryList" />
      </div>
    </div>
  </div>
</template>

<script>
import right from './components/right.vue'
import top from './components/top.vue'
import { login, home, search } from '@/api'
const { postCategoryList, postTagList, getArticleStar, postArticleType } = home
const { postArticleList } = login
const { searchForId } = search
export default {
  layout: 'home',
  components: {
    top,
    right
  },
  data() {
    return {
      data: {},
      aaaa: '12312312312312',
      listFlag: true,
      typeList: [],
      flag: true, // 防抖
      categoryList: [],
      tagList: [],
      dataList: {
        total: 0,
        data: []
      }, // 全部文章
      topList: [],
      newList: [],
      hotList: [],
      activeName: '0',
      form: {
        name: '',
        categoryId: [],
        tagId: [],
        title: ''
      },
      pagination: {
        page: 1,
        size: 10
      },
      articleType: [
        _ => (this.topList = _),
        _ => (this.newList = _),
        _ => (this.hotList = _)
      ],
      type: ['dataList', 'topList', 'newList', 'hotList']
    }
  },
  async mounted() {
    this.searchForId()
    // console.log(document.body.scrollHeight)
    // console.log(document.body.scrollTop)
    await this.request()
    Array.from(new Array(3).keys()).forEach(item => this.postArticleType(item))
  },
  methods: {
    // 根据文章id查询文章
    async searchForId() {
      this.data = await searchForId(this.$route.query.id)
    },
    // 监听页面滚动事件
    async scroll(e) {
      if (this.activeName !== '0') return
      if (!this.listFlag) return
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight <
        document.documentElement.scrollHeight - 100
      )
        return
      const dataList = this.dataList
      if (dataList.data.length >= dataList.total) return
      this.pagination.page++
      this.listFlag = false
      await this.list()
      this.listFlag = true
    },
    // 根据文章type获取对应文章
    async postArticleType(type) {
      if (this.typeList.includes(type)) return
      this.typeList.push(type)
      const dataList = await postArticleType(type)
      this.articleType[type](dataList)
    },
    // 初始进入页面请求数据
    async request() {
      await Promise.all([
        this.list(),
        this.postCategoryList(),
        this.postTagList()
      ])
      return true
    },
    // 点赞文章
    async getArticleStar(id) {
      if (!this.flag)
        return this.$message.warning('您请求的过于频繁，请稍后再试')
      this.flag = false
      await getArticleStar(id)
      this.$message.success('感谢您的点赞')
      this.flag = true
      try {
        let data = this[this.type[parseInt(this.activeName)]]
        if (data.data) data = data.data
        data.forEach(item => {
          if (item.id === id) {
            item.star = item.star + 1
            throw new Error('1')
          }
        })
      } catch (err) {}
    },
    // 获取标签列表
    async postTagList() {
      const { data } = await postTagList({ page: 1, size: 99, name: '' })
      return (this.tagList = data)
    },
    // 获取全部文章
    async list() {
      const { data, total } = await postArticleList({
        ...this.form,
        ...this.pagination
      })
      this.dataList.data.push(...data)
      if (!this.dataList.total) this.dataList.total = total
      return true
    },
    // 获取文章类别
    async postCategoryList() {
      const { data } = await postCategoryList({ page: 1, size: 99, name: '' })
      return (this.categoryList = data)
    },
    // 点击tab触发
    tabClick(tab, event) {
      let type = parseInt(tab.name)
      if (type) this.postArticleType(--type)
    }
  }
}
</script>
