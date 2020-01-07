module.exports = {
  // 主机名称
  hostname: '127.0.0.1',
  // 端口号
  port: 6969,
  // 当前文件夹
  root: process.cwd(),
  // 配置压缩类型
  compress: /\.(html|js|css|md)/,
  // 缓存配置
  cache: {
    maxAge: 600, // 单位是s 不是ms 注意
    expires: true,
    cacheControl: true,
    LastModified: true,
    etag: true
  }
}
