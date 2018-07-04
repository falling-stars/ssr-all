import axios from 'axios'

axios.defaults.timeout = 5000
const fetch = (url = '', data = {}, method = 'get', formData = false) => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      params: method === 'get' ? data : {},
      data,
      transformRequest: formData && window.FormData ? [data => {
        const formData = new window.FormData()
        for (let i in data) {
          formData.append(i, data[i])
        }
        return formData
      }] : []
    }).then(({data}) => {
      if (data.code === 1) {
        resolve(data)
      } else {
        reject(data)
      }
    })
  })
}
export default {
  install(Vue) {
    Vue.$axios = fetch
    Vue.prototype.$axios = fetch
  }
}