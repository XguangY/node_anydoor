const { exec } = require('child_process') // node 自带模块

module.exports = url => {
  switch (process.platform) {
    case 'darwin':
      exec(`open ${url}`)
      break
    case 'win32':
      exec(`start ${url}`)
      break
  }
}
