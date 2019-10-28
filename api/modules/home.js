import { http } from '@/axios'
export default {
  // 获取文章分类
  postCategoryList: ({ page, size, ...rest }) =>
    http.post(`/category/list/${page}/${size}`, {
      ...rest
    }),
  // 获取标签分类
  postTagList: ({ page, size, ...rest }) =>
    http.post(`/tag/list/${page}/${size}`, {
      ...rest
    }),
  // 点赞文章
  getArticleStar: id => http.get(`/article/star/${id}`),
  // 根据type获取对应文章
  postArticleType: type => http.post(`/article/filter/${type}`, {})
}
