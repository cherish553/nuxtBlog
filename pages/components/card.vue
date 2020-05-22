<template>
  <el-card class="box-card">
    <div v-for="item in dataList" :key="item.id" class="list">
      <div class="one">
        <div class="flexs">
          <slot :item="item" name="type"></slot>
          <div class="category">
            分类：<span
              @click="
                $router.push({
                  name: 'search',
                  query: {
                    category: encodeURIComponent(item.categoryName),
                    categoryId: encodeURIComponent(item.categoryId)
                  }
                })
              "
              v-html="`${item.categoryName}`"
            ></span>
          </div>
          <div class="tag">
            标签：
            <span
              v-for="items in item.tagName"
              :key="items.tid"
              @click="
                $router.push({
                  name: 'search',
                  query: {
                    tag: encodeURIComponent(items.tagName),
                    tagId: encodeURIComponent(items.tid)
                  }
                })
              "
              v-html="`${items.tagName}&nbsp;`"
            ></span>
          </div>
        </div>
        <div class="time">更新时间 : {{ item.updateTime | changeDate }}</div>
      </div>
      <div
        @click="
          $router.push({
            name: 'detail',
            query: {
              id: item.id
            }
          })
        "
        v-html="item.title"
        class="two"
      ></div>
      <div class="three">
        <div @click="$emit('on-result-change', item.id)" class="star">
          <img src="@/assets/image/star.png" alt />
          &nbsp;{{ item.star }}
        </div>
        <div
          @click="
            $router.push({
              name: 'detail',
              query: {
                id: item.id
              }
            })
          "
          class="read"
        >
          阅读全文 >>
        </div>
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
