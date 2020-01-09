const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
// const conf = require('../config/defaultConfig') // conf 是默认的配置 是不变的， 现在需要用户自行输入
// 引入模板
const Dir = require('../template/dir')
// 引用mime 文件
const mimeType = require('../header/mime')
// 引用压缩依赖
const compress = require('./compress')
// 引用返回区间模块
const range = require('./range')
// 引用缓存模块
const isFresh = require('./cache')

module.exports = async function(req, res, filePath, conf) {
  // 规避此问题require-atomic-updates报告在异步函数中重新分配变量时可能发生的竞争条件错误
  const awaitRes = await res
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      const mimeTypes = mimeType(filePath)
      // 如果是文件 返回文件内容
      // let rs = fs.createReadStream(filePath)

      // 如果缓存有效
      if (isFresh(stats, req, awaitRes)) {
        awaitRes.statusCode = 304
        awaitRes.end()
        return
      }

      let rs
      const { code, start, end } = range(stats.size, req, res)
      // 如果分割区段不成立,全量返回
      if (code === 200) {
        awaitRes.statusCode = 200
        rs = fs.createReadStream(filePath)
      } else {
        awaitRes.statusCode = 206
        rs = fs.createReadStream(filePath, { start, end })
      }
      // 使用哪个配置文件中的类型限制
      if (filePath.match(conf.compress)) {
        rs = compress(rs, req, awaitRes, mimeTypes)
      }
      rs.pipe(awaitRes)
    } else if (stats.isDirectory()) {
      awaitRes.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      //  如果是文件夹，返回文件列表
      const files = await readdir(filePath)
      awaitRes.statusCode = 200

      // 路径
      const dir = path.relative(conf.root, filePath)
      const filesArr = files.toString().split(',') // 置换为数组
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '', // 需要注意一点`path.relative` 是相对与根路径计算的，如果我们真的访问根路径就会返回空
        files: filesArr.map(item => {
          return {
            fileName: item,
            icon: mimeType(item)
          }
        })
      }
      awaitRes.end(Dir(data))
    }
  } catch (ex) {
    // 状态码
    awaitRes.statusCode = 404
    // 找不到提示文本
    awaitRes.end(`${filePath} is ${ex}`)
  }
}
