const fs = require('fs')

const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

module.exports = async function(rep, res, filePath) {
  // 规避此问题require-atomic-updates报告在异步函数中重新分配变量时可能发生的竞争条件错误
  const awaitRes = await res
  awaitRes.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      // 如果是文件 返回文件内容
      awaitRes.statusCode = 200

      fs.createReadStream(filePath).pipe(awaitRes)
    } else if (stats.isDirectory()) {
      //  如果是文件夹，返回文件列表
      const file = readdir(filePath)
      awaitRes.statusCode = 200

      awaitRes.end(file.join(','))
    }
  } catch (ex) {
    // 状态码
    awaitRes.statusCode = 404

    // 找不到提示文本
    awaitRes.end(`${filePath} is 404`)
  }
}
