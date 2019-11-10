export default {
  data() {
    return {
      background: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.changeBackground)
  },
  destroyed() {
    window.removeEventListener('scroll', this.changeBackground) //  离开页面清除（移除）滚轮滚动事件
  },
  methods: {
    // 监听页面滚动事件
    changeBackground() {
      this.background = document.documentElement.scrollTop >= 350
    }
  }
}
