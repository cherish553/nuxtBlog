import { home } from '@/api'
const { postCategoryList, postTagList } = home
const params = { page: 1, size: 99, name: '' }
export default {
  request() {
    return Promise.all([postCategoryList(params), postTagList(params)])
  }
}
