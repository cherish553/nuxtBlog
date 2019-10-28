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
  </el-col>
</template>
<script>
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
  }
}
</script>
