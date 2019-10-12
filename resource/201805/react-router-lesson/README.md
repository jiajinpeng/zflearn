## 路由
- 通过不同的路径 返回不同的内容
- res.setHeader('Location','pathname') 后端跳转

## 路径变化改变对应的内容
- 组件 (spa)
- 路径改变 (hash的方式 hash路径#，h5的api  pushState 没有#)
- 在create-react-app中使用h5的api没有问题 (webpack history-fallback)
- 上线时肯定采用pushState方式 (onhanshchange)

## 路由4.0 
- yarn add react-router-dom

> http://reacttraining.cn/