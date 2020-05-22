export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    if (!to.name) next({ name: 'index' })
    next()
  })
}
