import Vue from 'vue'
const changeDate = value => {
  const time = new Date(value)
  const year = time.getFullYear()
  let month = time.getMonth()
  ++month
  month = month < 10 ? '0' + month : month
  let day = time.getDate()
  day = day < 10 ? '0' + day : day
  let hours = time.getHours()
  hours = hours < 10 ? '0' + hours : hours
  let minute = time.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  return `${year}-${month}-${day} ${hours}:${minute}`
}
const filters = {
  changeDate
}
export default filters
Vue.filter('changeDate', changeDate)
