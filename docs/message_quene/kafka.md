# kafka
kafka作为目前最流行的消息队列，还是有很多值得我们学习的地方的


## 设计思想
关于其相关的设计思考，可以看[这篇文档](https://kafka.apachecn.org/documentation.html#majordesignelements),

现代操作系统提供了read-ahead和write-behind的技术，其实已经是做了很多优化了。

### 关于kafka性能上的优化
1. 顺序读写，利用硬盘顺序读写的高性能
ps:即使是SSD，随机读写的速度也是低于顺序读写的。
2. 支持批处理，将多个消息打包成一组
3. 支持sendfile，利用了零拷贝相关的技术
允许操作系统将数据从pagecache直接发送到网络
4. 端到端的批量压缩


## 高可用


## 横向扩展

## 常见问题
1. 关于生产者发布消息到topic，topic如何负载均衡
1）手动指定将记录分配到某个partition中
2）循环方式实现负载均衡
3）某些语义分区函数

如果要保证消息消费的有序性，就只能一个partition

## 参考文档
1. <https://ifeve.com/kafka-design-2/>
2. [关于page cache](https://spongecaptain.cool/SimpleClearFileIO/1.%20page%20cache.html)