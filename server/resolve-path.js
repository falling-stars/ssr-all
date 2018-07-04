const {resolve} = require('path')
const {existsSync} = require('fs')
// 查找是否存在相应的图片资源和返回重写的链接
module.exports = (url, OS) => {
  let targetUrl = url
  let hashQuery = ''
  if (/\?/.test(targetUrl)) {
    const splitUrl = targetUrl.split('?')
    targetUrl = splitUrl[0]
    hashQuery = '?' + splitUrl[1]
  }
  targetUrl = targetUrl.replace(/^\//, './')
  if (/win/g.test(OS)) {
    targetUrl = targetUrl.replace(/\//g, '\\')
  }
  const mPath = resolve(__dirname, '../dist-m')
  const pcPath = resolve(__dirname, '../dist-pc')
  let searchUrl = ''
  if (/-m\./.test(url)) searchUrl = (resolve(mPath, targetUrl))
  if (/-pc\./.test(url)) searchUrl = resolve(pcPath, targetUrl)
  const pngPath = searchUrl.replace(/\.img$/, '.png')
  const jpgPath = searchUrl.replace(/\.img$/, '.jpg')
  const jpegPath = searchUrl.replace(/\.img$/, '.jpeg')
  if (existsSync(pngPath)) {
    return url.replace(/\.img/, '.png') + hashQuery
  }
  if (existsSync(jpgPath)) {
    return url.replace(/\.img/, '.jpg') + hashQuery
  }
  if (existsSync(jpegPath)) {
    return url.replace(/\.img/, '.jpeg') + hashQuery
  }
  return false
}