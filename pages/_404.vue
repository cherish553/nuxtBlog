<template>
  <div class="error">
    404抱歉没有该页面~
    <nuxt-link to="/"> 点击我跳转换首页 </nuxt-link>
  </div>
</template>

<script>
// import { login, home } from '@/api'
// import card from './components/card.vue'
// import right from './components/right.vue'
// import top from './components/top.vue'
// import mixins from './mixins'

// const { getArticleStar, postArticleType } = home
// const { postArticleList, getAddVistis } = login
export default {
  layout: 'error'
}
</script>
<style lang="less">
.error {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  font-size: 20px;
  a {
    color: gray;
  }
}
</style>
