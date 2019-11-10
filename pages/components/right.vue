<template>
  <el-col :sm="7" :offset="1">
    <el-card class="card-list">
      <div slot="header" class="clearfix">
        <span class="fs14">文章分类</span>
      </div>
      <div class="card-list-item">
        <el-tag
          v-for="item in categoryList"
          :key="item.id"
          type="info"
          class="text item"
          @click="
            $router.push({
              name: 'search',
              query: {
                category: encodeURIComponent(item.name),
                categoryId: encodeURIComponent(item.id)
              }
            })
          "
          >{{ item.name }}</el-tag
        >
      </div>
    </el-card>
    <el-card class="card-list">
      <div slot="header" class="clearfix">
        <span class="fs14">文章标签</span>
      </div>
      <div class="card-list-item">
        <el-tag
          v-for="item in tagList"
          :key="item.id"
          type="info"
          class="text item"
          @click="
            $router.push({
              name: 'search',
              query: {
                tag: encodeURIComponent(item.name),
                tagId: encodeURIComponent(item.id)
              }
            })
          "
          >{{ item.name }}</el-tag
        >
      </div>
    </el-card>
    <div class="visitCount">访问总量:{{ count }}</div>
  </el-col>
</template>
<script>
import { login } from '@/api'
const { getVisitsCount } = login
export default {
  props: {
    categoryList: {
      type: Array,
      default() {
        return {}
      }
    },
    tagList: {
      type: Array,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    this.getVisitsCount()
  },
  methods: {
    // 获取总访问量
    async getVisitsCount() {
      this.count = (await getVisitsCount()).visits
    }
  }
}
</script>
