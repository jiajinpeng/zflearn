## 安装第三方模块
- 本地安装
- 全局安装 (在命令行使用)

```
npm install http-server -g 生成静态目录 
npm install nrm -g 切换源
npm install yarn -g 除了npm 还有安包的方式 yarn
npm uninstall yarn -g
```

## 实现全局包
- 添加bin
- 添加#! /usr/bin/env node
- npm link

## 发包
- 切换到官方源
- npm addUser
- 填上用户名邮箱 密码
- npm publish