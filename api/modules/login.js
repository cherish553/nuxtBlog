import http from '@/axios'
export default {
  index: data => http.post(`/user/login`, data),
  // 添加总体访问量
  addVisits: _ => http.get(`/user/addVisits`),
  // 获取总体访问量
  getVisits: _ => http.get(`/user/getVisits`),
  // 添加总体点赞数
  addStar: _ => http.get(`/user/addStar`),
  // 获取总体访问量
  getStar: _ => http.get(`/user/getStar`),
  // 查询文章
  postArticleList: ({ page, size, categoryId, tagId, ...rest }) =>
    http.post(`/article/list/${page}/${size}`, {
      ...rest,
      categoryId: categoryId.join(','),
      tagId: tagId.join(',')
    }),
  // 获取总访问量
  getVisitsCount: _ => http.get(`/user/getVisitsCount`),
  // 网站访问量增加
  getAddVistis: _ => http.get(`/user/getAddVistis`)
}
