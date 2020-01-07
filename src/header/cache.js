const { cache } = require('../config/defaultConfig')

function refreshRes(stats, res) {
  // 引入配置项
  const { maxAge, expires, cacheControl, LastModified, etag } = cache
  // 如果支持 exprires
  if (expires) {
    res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toUTCString())
  }
  // 如果支持 cacheControl
  if (cacheControl) {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
  }
  // 如果支持 LastModified
  if (LastModified) {
    res.setHeader('Last-Modified', stats.mtime.toUTCString())
  }
  // 如果支持 Etag
  if (etag) {
    res.setHeader('ETag', `${stats.size}-${stats.mtime.toUTCString()}`) // mtime 需要转成字符串，否则在 windows 环境下会报错
  }
}

module.exports = function isFresh(stats, req, res) {
  refreshRes(stats, res)
  const LastModified = req.headers['if-modified-since']
  const etag = req.headers['if-none-match']

  // 如果均不存在
  if (!LastModified && !etag) {
    return false
  }
  // 如果存在 LastModified 并且过期
  if (LastModified && LastModified !== res.getHeader('Last-Modified')) {
    return false
  }
  // 如果存在 etag 并且过期
  if (etag && etag !== res.getHeader('ETag')) {
    return false
  }
  // 使用缓存
  return true
}
