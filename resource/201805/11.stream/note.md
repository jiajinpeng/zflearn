## 可读流(文件流)
- on('open') on('data') on('end') on('error') on('close')


> 文件操作 readFile 读取内容都是整体,拷贝的功能.readFile不能精确读取. fs.read, fs.write  copy (pipe);