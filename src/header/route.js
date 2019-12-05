const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const conf = require('../config/defaultConfig')
// 引入模板
const Dir = require('../template/dir')
// 引用mime 文件
const mimeType = require('../header/mime')

module.exports = async function(rep, res, filePath) {
  // 规避此问题require-atomic-updates报告在异步函数中重新分配变量时可能发生的竞争条件错误
  const awaitRes = await res
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      const mimeTypes = mimeType(filePath)
      awaitRes.writeHead(200, { 'Content-Type': mimeTypes })
      // 如果是文件 返回文件内容
      awaitRes.statusCode = 200
      fs.createReadStream(filePath).pipe(awaitRes)
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
