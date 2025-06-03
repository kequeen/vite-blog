# rpc
其实是主要想聊下关于rpc(Remote Procedure Call)的问题，其实广义来说，http 协议也是一种 rpc，但其效率较低，因为数据传输格式比较浪费存储空间
java中本身自带 rpc 的解决方案，然而因为java 对象的序列化，其它语言不可读
【在仔细阅读完brpc的文档之后，希望自己能够再来做一个比较合适的补充】

在读了《凤凰架构》一书之后，对RPC又有了一些自己的感悟。
RPC要解决的三个问题：
1）如何表示数据
2）如何传递数据
3）如何确定方法


## grpc与brpc的异同
1、 grpc采用 http2，而brpc 支持http中的ProgressiveReader, h2的streams, streaming rpc, 和专门的流式协议RTMP



## 流式 RPC
某些场景下，客户端或者服务端需要发送的数据特别大。BRPC的文档中提到 流式 RPC 保证:
1. 有消息边界
2. 接收消息的顺序和发送消息的顺序严格一致
这个一致理论上应该是TCP协议本身来保证的
3. 全双工
4. 支持流控
这个应该也是TCP的拥塞控制来保证的
5. 提供超时提醒

## 参考文档
1. <https://en.wikipedia.org/wiki/Remote_procedure_call>
2. <https://brpc.apache.org/zh/docs/overview/>
3. <https://www.grpc.io/docs/what-is-grpc/introduction/>
4. <https://developers.google.com/protocol-buffers/docs/overview>
5. <https://zhuanlan.zhihu.com/p/161577635>
6. <https://chai2010.cn/advanced-go-programming-book/ch4-rpc/ch4-04-grpc.html>
7. <https://brpc.apache.org/zh/docs/client/streaming-rpc/>