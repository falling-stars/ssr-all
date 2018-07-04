const {resolve} = require('path')
const fs = require('fs')
module.exports = () => {
  const swPath = resolve(__dirname, '../dist-m/pwa/sw.js')
  fs.rename(resolve(__dirname, '../dist-m/sw.js'), swPath, error => {
    if (error) {
      throw error
    } else {
      let source = fs.readFileSync(swPath).toString()
      source = source.replace(/logo-192.png/g, '[logo-192-replace-temp]')
      source = source.replace(/logo-512.png/g, '[logo-512-replace-temp]')
      source = source.replace(/\.(png|jpe?g)/ig, '.img')
      source = source.replace(/\[logo-192-replace-temp]/g, 'logo-192.png')
      source = source.replace(/\[logo-512-replace-temp]/g, 'logo-512.png')
      fs.writeFile(swPath, source, error => error && console.log(error))
    }
  })
}