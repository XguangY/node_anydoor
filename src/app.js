// 引入http内置模块
const http = require('http')

// 引入chalk 用于美化后台打印
const chalk = require('chalk')

const path = require('path')

const route = require('./header/route')
// 引入基本配置
const conf = require('./config/defaultConfig')

// 创建一个server 实例
const server = http.createServer((rep, res) => {
  // 拿到路径
  const filePath = path.join(conf.root, rep.url)
  route(rep, res, filePath)
})

// 监听 server 实例

server.listen(conf.port, conf.hostname, () => {
  const addr = `http:// ${conf.hostname}:${conf.port}`

  console.info(`server startd at ${chalk.green(addr)}`)
})
