/**
 *
 * @param {*} data object 必填
 */

function Dir(data) {
  /**
     * 判断data是否为对象
     * 有一点需要说明，在编写被调用的函数，模板或者库的时候，需要对传入值进行判断，给出相应提示
     * 这样有利于后期维护和他人的使用
     */
  if (Object.prototype.toString.call(data) === '[object Object]') {
    const html = `
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta http-equiv="X-UA-Compatible" content="ie=edge">
       <title>${data.title}</title>
       <style>
            div {
              padding: 5px 10px;
            }
            a {
                font-size: 20px;
                padding: 0px 10px;
            }
            code {
              background-color: #fff5f5;
              color: #ff502c;
              font-size: .87em;
              padding: 2px 4px;
            }
        </style>
   </head>
   <body>
    ${itemFn(data)}
   </body>
   </html>
   `
    return html
  } else {
    return '参数类型错误'
  }
}
function itemFn(val) {
  let tem = ''
  val.files.map((item) => {
    tem += `
        <div>
          <a  href="${val.dir + '/' + item.fileName}">${item.fileName}</a>
          <code>${item.icon}</code>
        </div>
    `
  })
  return tem
}
module.exports = Dir
