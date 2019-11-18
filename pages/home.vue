<template>
  <div>
    <top />
    <div :class="{ background }" class="container clearfix">
      <div class="inner">
        <el-col :sm="16">
          <el-card>
            <el-tabs v-model="activeName" @tab-click="tabClick">
              <el-tab-pane label="全部" name="0">
                <card
                  :data-list="dataList.data"
                  @on-result-change="getArticleStar"
                >
                  <template #type="{item}">
                    <div
                      v-if="item.status === 2"
                      :class="[item.status === 2 ? 'active' : '', 'status']"
                    >
                      顶
                    </div>
                    <div
                      v-else-if="item.visits >= 20"
                      :class="[item.visits >= 20 ? 'active' : '', 'visits']"
                    >
                      热
                    </div>
                    <div
                      v-else
                      :class="[
                        new Date().getTime() -
                          new Date(item.updateTime).getTime() <=
                        1000 * 60 * 60 * 24 * 20
                          ? 'active'
                          : '',
                        'new'
                      ]"
                    >
                      新
                    </div>
                  </template>
                </card>
              </el-tab-pane>
              <el-tab-pane label="置顶" name="1">
                <card :data-list="topList" @on-result-change="getArticleStar">
                  <template #type>
                    <div class="status active">顶</div>
                  </template>
                </card>
              </el-tab-pane>
              <el-tab-pane label="最新" name="2">
                <card :data-list="newList" @on-result-change="getArticleStar">
                  <template #type>
                    <div class="new active">新</div>
                  </template>
                </card>
              </el-tab-pane>
              <el-tab-pane label="热门" name="3">
                <card :data-list="hotList" @on-result-change="getArticleStar">
                  <template #type>
                    <div class="visits active">热</div>
                  </template>
                </card>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
        <right :tag-list="tagList" :category-list="categoryList" />
      </div>
    </div>
  </div>
</template>

<script>
import card from './components/card.vue'
import right from './components/right.vue'
import top from './components/top.vue'
import mixins from './mixins'
import { login, home } from '@/api'

const { getArticleStar, postArticleType } = home
const { postArticleList, getAddVistis } = login
export default {
  components: {
    card,
    top,
    right
  },
  mixins: [mixins],
  layout: 'home',
  data() {
    return {
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
        size: 99
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
    window.addEventListener('scroll', this.scroll)
    await this.request()
    Array.from(new Array(3).keys()).forEach(item => this.postArticleType(item))
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll) //  离开页面清除（移除）滚轮滚动事件
  },
  methods: {
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
      if (await this.list()) this.listFlag = true
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
      await Promise.all([this.list(), this.getAddVistis()])
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
    // 获取全部文章
    async list() {
      const { data, total } = await postArticleList({
        ...this.form,
        ...this.pagination
      })
      if (!data.length) return false
      this.dataList.data.push(...data)
      if (!this.dataList.total) this.dataList.total = total
      return true
    },
    // 网站访问量增加
    async getAddVistis() {
      await getAddVistis()
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
