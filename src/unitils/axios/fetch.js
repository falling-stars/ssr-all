import axios from 'axios'
import proxyConfig from '../../../proxy-config'

axios.defaults.timeout = 5000
export default (url = '', data = {}, method = 'get', formData = false) => {
  if (typeof window === 'undefined') {
    proxyConfig.forEach(i => {
      const reg = new RegExp('^' + i.from)
      reg.test(url) && (url = url.replace(reg, i.to))
    })
  }
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