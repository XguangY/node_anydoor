
const path = require('path')

const mimeTypes = {
  'css': 'text/css',
  'gif': 'image/gif',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'text/javascript',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'swf': 'application/x-shockwave-flash',
  'tiff': 'image/tiff',
  'txt': 'text/plain',
  'wav': 'audio/x-wav',
  'wma': 'audio/x-ms-wma',
  'wmv': 'video/x-ms-wmv',
  'xml': 'text/xml'
}

module.exports = (filePath) => {
  // 截取文件后缀名
  let ext = path.extname(filePath)
    .split('.')
    .pop()
    .toLowerCase()
    // 如果无法截取文件后缀 例如一些配置文件
  if (!ext) {
    ext = filePath
  }
  // 不存在及作为普通文本处理
  return mimeTypes[ext] || mimeTypes['txt']
}
