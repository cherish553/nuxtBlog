<template>
  <div :class="[{ topActive: changeTopColor }, 'top']">
    <div class="home">
      <span @click="$router.push({ name: 'home' })">首页</span>
      <span @click="openLink(' https://github.com/cherish553')">github</span>
      <span @click="openLink('https://www.hanchunrun.cn/#/')">rain</span>
      <span @click="openLink('https://juejin.im/user/57d7d1f50e3dd90069eb9480')"
        >kouchao</span
      >
    </div>
    <div class="w400">
      <el-input
        v-model="name"
        size="small"
        clearable
        placeholder="请填写文章名称"
        @keyup.native.enter="search"
      >
        <i slot="suffix" class="el-icon-search" @click="search"></i>
      </el-input>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      changeTopColor: false,
      name: ''
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll) //  离开页面清除（移除）滚轮滚动事件
  },
  methods: {
    openLink(e) {
      window.open(e)
    },
    // 点击搜索文章
    search() {
      if (!this.name) return
      this.$router.push({
        name: 'search',
        query: { name: encodeURIComponent(this.name) }
      })
    },
    // 监听页面滚动事件
    scroll(e) {
      this.changeTopColor = document.documentElement.scrollTop >= 350
    }
  }
}
</script>
