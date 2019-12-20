const { createGzip, createDeflate } = require('zlib')

/**
 * @param rs 压缩本体
 * @param req 浏览器支持的压缩类型
 * @param res 通知设置请求头
 */
module.exports = (rs, req, res, mimeTypes) => {
  // 获取浏览器支持的压缩格式
  const acceptEncoding = req.headers['accept-encoding']
  // 暂定支持压缩   gzip|deflate 使用node内置的压缩算法 zlib
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
    return rs
  } else if (acceptEncoding.match(/\bgzip\b/)) {
    //   通知浏览器使用何种方式压缩
    res.writeHead(200, { 'Content-Type': mimeTypes, 'Content-Encoding': 'gzip' })
    // 使用其pipe 方法即可
    return rs.pipe(createGzip())
  } else if (acceptEncoding.match(/\bdeflate\b/)) {
    res.writeHead(200, { 'Content-Type': mimeTypes, 'Content-Encoding': 'deflate' })
    return rs.pipe(createDeflate())
  }
}
