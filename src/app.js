// 引入http内置模块
const http = require('http')

// 引入chalk 用于美化后台打印
const chalk = require('chalk')

// 引入基本配置
const conf = require('./config/defaultConfig')

// 创建一个server 实例
const server = http.createServer((rep, res) => {
  // 状态码
  res.statusCode = 200

  // 设置相应头部
  res.setHeader('Content-Type', 'text/html')

  //  注意write写入可以一直拼接下去，注意最后end 即可
  res.write('<html>')
  res.write('<body>')
  res.write('<h1 style="color: blue">')
  res.write('ah, http111 !')
  res.write('</h1>')
  res.write('</body>')

  // 输出
  res.end('</html>')
})

// 监听 server 实例

server.listen(conf.port, conf.hostname, () => {
  const addr = `http:// ${conf.hostname}:${conf.port}`

  console.info(`server startd at ${chalk.green(addr)}`)
})
