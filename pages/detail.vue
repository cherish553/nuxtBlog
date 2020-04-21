<template>
  <div>
    <top />
    <div class="container clearfix" :class="{ background }">
      <div class="inner">
        <div class="inner-top">
          <div class="star" @click="getArticleStar(data.id)">
            <img src="@/assets/image/star.png" alt />
            &nbsp;{{ data.star }}
          </div>
          <div v-if="data.visits" class="search">
            <img src="@/assets/image/visits.png" alt />
            &nbsp;&nbsp;{{ data.visits }}
          </div>
        </div>
        <div class="mt5">文章创建时间：{{ data.creatTime | changeDate }}</div>
        <div class="mt5">文章更新时间：{{ data.updateTime | changeDate }}</div>
        <el-col :sm="13">
          <mavon-editor
            ref="mavon"
            code-style="dark"
            :value="data.inner"
            :toolbars-flag="false"
            :subfield="false"
            default-open="preview"
          />
        </el-col>
        <el-col :sm="3">
          <div class="external">
            <div
              class="navigationBar"
              :class="[changeNavigationBar ? 'navigationFix' : '']"
              @click="link"
            >
              <div
                class="navigationBar-innner"
                :style="
                  changeNavigationBar
                    ? {
                        width: '12.5%'
                      }
                    : ''
                "
                v-html="inner"
              ></div>
            </div>
          </div>
        </el-col>
        <right :tag-list="tagList" :category-list="categoryList" />
      </div>
    </div>
  </div>
</template>

<script>
import { login, home, search } from '@/api'
import right from './components/right.vue'
import top from './components/top.vue'
import mixins from './mixins'
const { getArticleStar, postArticleType, getArticleVisits } = home
const { postArticleList } = login
const { searchForId } = search
export default {
  components: {
    top,
    right
  },
  mixins: [mixins],
  layout: 'home',
  data() {
    return {
      data: {},
      aaaa: '12312312312312',
      listFlag: true,
      typeList: [],
      flag: true, // 防抖
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
      type: ['dataList', 'topList', 'newList', 'hotList'],
      inner: '',
      changeNavigationBar: false
    }
  },
  async mounted() {
    window.addEventListener('scroll', this.scroll)
    this.getArticleVisits(this.$route.query.id)
    this.searchForId()
    await this.request()
    Array.from(new Array(3).keys()).forEach(item => this.postArticleType(item))
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll) //  离开页面清除（移除）滚轮滚动事件
  },
  methods: {
    scroll() {
      this.changeNavigationBar = document.documentElement.scrollTop >= 500
    },
    // 文章增加访问量
    async getArticleVisits(id) {
      await getArticleVisits(id)
    },
    // 点赞文章
    async getArticleStar(id) {
      if (!this.flag)
        return this.$message.warning('您请求的过于频繁，请稍后再试')
      this.flag = false
      await getArticleStar(id)
      this.$message.success('感谢您的点赞')
      this.flag = true
      this.data.star++
    },
    // 根据文章id查询文章
    async searchForId() {
      this.data = await searchForId(this.$route.query.id)
      await this.$nextTick()
      this.inner = document
        .querySelectorAll('.v-show-content')[0]
        .innerHTML.match(/[<][h][0-9][>].*[<][/][h][0-9][>]/g)
        .join('<br/>')
    },
    // 链接标签
    link(e) {
      const tag = e.target
      if (tag.tagName.search(/[H]/) === -1) return
      const id = Array.from(tag.childNodes)
        .filter(item => item.id)
        .map(item => item.id)[0]
      const node = document.getElementById(`${id}`).parentNode
      node.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
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
      await Promise.all([this.list()])
      return true
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
    // 点击tab触发
    tabClick(tab, event) {
      let type = parseInt(tab.name)
      if (type) this.postArticleType(--type)
    }
  }
}
</script>
