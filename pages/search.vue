<template>
  <div>
    <top />
    <div class="container clearfix">
      <div class="inner">
        <el-col :sm="16">
          <el-card>
            <div slot="header" class="clearfix">
              <span class="red"
                >{{
                  type === 0
                    ? '关键词：'
                    : type === 1
                    ? '文章类别：'
                    : '文章标签：'
                }}{{ name }}</span
              >
            </div>
            <card
              :data-list="searchList"
              @on-result-change="getArticleStar"
            ></card>
          </el-card>
        </el-col>
        <right :tag-list="tagList" :category-list="categoryList" />
      </div>
    </div>
  </div>
</template>

<script>
import mixins from './mixins'
import card from './components/card.vue'
import right from './components/right.vue'
import top from './components/top.vue'
import { home, search } from '@/api'
const type = [
  ['title', 'tagName', 'categoryName'],
  ['categoryName'],
  ['tagName']
]
const { getArticleStar } = home
const { searchForName, searchForCategoryId, searchFortagId } = search
export default {
  components: {
    card,
    top,
    right
  },
  mixins: [mixins],
  data() {
    return {
      type: 0, // 0代表关键词 1代表文章类别 2代表文章标签
      name: '', // 关键字
      flag: true, // 防抖
      dataList: []
    }
  },
  computed: {
    // 替换文字
    searchList() {
      const reg = new RegExp(this.name)
      const dataList = this.dataList.map(item => {
        let types = type[this.type].map(items => {
          if (items === 'tagName')
            return item[items].map(item => ({
              ...item,
              tagName: item.tagName.replace(reg, `<em>${this.name}</em>`)
            }))
          return item[items].replace(reg, `<em>${this.name}</em>`)
        })
        types = types.reduce((pre, now, index) => {
          pre[type[this.type][index]] = now
          return pre
        }, {})
        return { ...item, ...types }
      })
      return dataList
    }
  },
  watch: {
    '$route.query': {
      handler(val) {
        this.open()
      },
      deep: true,
      immediate: true
    }
  },
  layout: 'home',
  mounted() {},
  methods: {
    // 刚进入页面的时候触发
    open() {
      const name = this.$route.query.name
      const category = this.$route.query.category
      const tag = this.$route.query.tag
      if (name) {
        this.type = 0
        this.name = decodeURIComponent(name)
        this.searchForName()
      } else if (category) {
        this.type = 1
        this.name = decodeURIComponent(category)
        this.searchForCategoryId(this.$route.query.categoryId)
      } else {
        this.type = 2
        this.name = decodeURIComponent(tag)
        this.searchFortagId(this.$route.query.tagId)
      }
    },
    // 根据文章标签id查询文章
    async searchFortagId(id) {
      this.dataList = await searchFortagId({ id })
    },
    // 根据文章类别id查询文章
    async searchForCategoryId(id) {
      this.dataList = await searchForCategoryId({ id })
    },
    // 根据name模糊查询文章
    async searchForName() {
      this.dataList = await searchForName({ name: this.name })
      // this.name = this.dataList
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
        this.dataList.forEach(item => {
          if (item.id === id) {
            item.star = item.star + 1
            throw new Error('1')
          }
        })
      } catch (err) {}
    }
  }
}
</script>
