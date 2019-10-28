<template>
  <el-card class="box-card">
    <div v-for="item in dataList" :key="item.id" class="list">
      <div class="one">
        <div class="flexs">
          <slot name="type" :item="item"></slot>
          <div class="category" v-html="`分类：${item.categoryName}`"></div>
          <div class="tag" v-html="`标签：${item.tagName}`"></div>
        </div>
        <div class="time">更新时间 : {{ item.updateTime | changeDate }}</div>
      </div>
      <div class="two" v-html="item.title"></div>
      <div class="three">
        <div class="star" @click="$emit('on-result-change', item.id)">
          <img src="@/assets/image/star.png" alt />
          &nbsp;{{ item.star }}
        </div>
        <div class="read">阅读全文 >></div>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
