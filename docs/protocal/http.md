# 关于http
主要谈一下当前http协议的一些问题，以及未来的http2,http3等

## HTTP2
### 对HTTP的头部进行压缩
就是同一个域名下，其实HTTP头部是重复的，可以第一次传输将map

### 支持服务端推送
其实就是客户端原本要请求A、B、C的，需要发送三个请求。支持服务端推送之后，客户端请求A 之后，服务端可以直接给客户端推送A、B、C

### 请求管线化
目前只有GET、HEAD等请求

### 修复队头阻塞问题


### 数据传输采用多路复用
多个请求合并在同一个tcp连接内。因为在http


## HTTP3
其实最大的问题，就是TCP本身的冷启动的问题

## 参考资料
1. <https://www.ruanyifeng.com/blog/2018/03/http2_server_push.html>
2. <https://halfrost.com/http2-header-compression/>
3. <https://zh.m.wikipedia.org/zh-hans/HTTP%E5%A4%B4%E5%AD%97%E6%AE%B5>
4. <https://www.rfc-editor.org/rfc/rfc7541>