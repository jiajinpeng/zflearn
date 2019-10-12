## node概念 常见的概念 

## 进程和线程
- 进程包含线程
- 一个进程只有一个主线程 
- node可以开子进程 (child_process)

## 异步 同步
- 被调用方取决的状态

## 阻塞非阻塞
- 指的是调用方的状态

## 事件环 (浏览器的事件环 node事件环)
- 微任务 宏任务 执行属性

## 队列 和 栈
- 队列 先进先出
- 栈 先进后出

## node的应用场景 
- i/o 密集  web端高并发问题

## 中间层 服务端渲染
- 并发量 


## js的组成 ECMAScript (BOM DOM)

> 开发node  离不开大量的第三方（模块）

## js解析器和 ui 线程 是共用同一个线程的
- js 操作dom （多线程） js的必须是单线程 (变成模型更加简单)
- java 锁的问题

## webworker 工作线程
- 多线程 (不能操作文档 不操作dom)

## 宏任务 微任务 (异步操作)
- setTimeout setImmidate(ie)
- Promise.then 

## nextTick下一个队列


## node环境变量
- 在环境变量中配置 需要的执行文件的路径即可

## REPL READ EVAL PRINT LOOP

## 模块的实现
- 闭包