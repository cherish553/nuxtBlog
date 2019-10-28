import { http } from '@/axios'
export default {
  // 获取文章分类
  searchForName: data => http.post(`/article/searchForName`, data),
  // 根据文章类别id查询文章
  searchForCategoryId: data => http.post(`/article/searchForCategoryId`, data),
  // 根据文章标签id查询文章
  searchFortagId: data => http.post(`/article/searchFortagId`, data)
}
