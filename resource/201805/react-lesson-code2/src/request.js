import axios from 'axios'; // axios 基于promise的 
// axios.interceptors.request.use(function (config) {
//   config.headers.a = 1;
//   return config;
// })

axios.interceptors.response.use(function (res) {
  if (res.data.code === 0) {
    return res.data.users
  } else {
    return Promise.reject('错误');
  }
})

export default axios