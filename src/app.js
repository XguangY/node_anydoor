// 引入http内置模块
const http = require('http')

// 引入chalk 用于美化后台打印
const chalk = require('chalk')

const path = require('path')

const route = require('./header/route')

// 引入基本配置
const conf = require('./config/defaultConfig')

// 引入自动打开浏览器模块
const openUrl = require('./header/openUrl')

class Server {
  constructor(config) {
    // 拼接默认配置和用户传来的配置
    this.conf = Object.assign({}, conf, config)
  }
  start() {
    const server = http.createServer((req, res) => {
      // 拿到文件路径
      const filePath = path.join(this.conf.root, req.url)
      route(req, res, filePath, this.conf)
    })

    server.listen(this.conf.port, this.conf.hostname, () => {
      const addr = `http://${this.conf.hostname}:${this.conf.port}`
      console.log(`Server started at ${chalk.green(addr)}`)
      openUrl(addr)
    })
  }
}

module.exports = Server
