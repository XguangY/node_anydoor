# node_anydoor

Tiny NodeJS Static Web server

+ [P08：node实现静态服务器 ~ 创建项目](https://juejin.im/post/5dde2898f265da05c201cee1)
+ [P09：node实现静态服务器 ~ hello http](https://juejin.im/post/5ddf8199f265da060c3bed20)
+ [P10：node实现静态服务器 ~ 静态读取文件或文件夹](https://juejin.im/post/5de4b85ce51d4526dd033156)
+ [P11：node实现静态服务器 ~ 初步优化体验](https://juejin.im/post/5de755cd6fb9a0161b5e7649)
+ [P12：node实现静态服务器 ~ Content-Type优化设置](https://juejin.im/post/5de8cab5f265da33977293f3)
+ [P13：node实现静态服务器 ~ Accept-Encoding与Content-Encoding](https://juejin.im/post/5dea103bf265da33ae18db16)
+ [P14：node实现静态服务器 ~ 范围请求range](https://juejin.im/post/5e0466f3e51d4558105427ce)
+ [P15：node实现静态服务器 ~ 缓存](https://juejin.im/post/5e13e68bf265da5d61695dd2)
+ P16：node实现静态服务器 ~ cli

## 安装

```
npm i -g node_anydoor
```

## 使用方法

```
node_anydoor # 把当前文件夹作为静态服务器根目录

node_anydoor -p 8080 # 设置端口号为 6969

node_anydoor -h localhost # 设置 host 为 localhost

node_anydoor -d /usr # 设置根目录为 usr
```