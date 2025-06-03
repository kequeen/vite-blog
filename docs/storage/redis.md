# redis
redis其实也是一种存储，虽然大家很多时候认为其是缓存，但缓存与存储的界限，很多时候并没有我们想的这般泾渭分明。

## 关于redis的高可用架构
我们知道，单机的redis，无论你如何去保证其可用性，比如AOF和RDB，但物理机终究有损坏的可能性，宕机会造成服务端不可用，机器物理损坏则会造成数据的丢失。所以我们必须去关心其高可用


### 主从方案
主要问题有以下几点：
1. 无法横向扩容与自动恢复
2. 在线纵向扩容困难，需要停机
3. 主机宕机可能会导致数据不同步的问题
4. 宕机重启后会影响master的IO

### Sentinel方案
可以自动恢复，但始终没办法解决扩容的问题

#### 故障转移过程
注意：哨兵节点与存储节点是分离的

1. 发现主节点已经处于客观下线状态
2. 通过类似raft协议，选取出哨兵的领导节点
3. 选取一个服务器，将它升级为主服务器
4. 向被选中的服务器发送SLAVEOF NO ONE命令，让它变成主服务器
5. 通过发布订阅功能，将更新后的配置传播给其他哨兵
6. 向已下线主服务器的从服务器发送 SLAVEOF host port 命令，让它们去复制新的主服务器
7. 当所有从服务器都已经开始复制新的主服务器时，领导的哨兵终止此次故障迁移操作

## 关于redis的扩容
单机的物理容量有限，无论你硬盘和内存再怎么扩，单个物理机也还是有上限的，并且纵向扩容的成本一般较高，并且也会有单机宕机的风险。所以我们所说的扩容，一般都是指横向扩容。

### 集群方案
没有采用一致性hash的方案，这是比较让我觉得意外的。
redis一致性hash一般是客户端方案，redis的hash槽是服务端方案。
一个redis集群包含16384个hash slot（因为是2^14），为什么是16384个， 可见[作者的回答](https://github.com/redis/redis/issues/2576)

服务端各个节点之间，通过gossip协议，通知对方自己存储了哪些槽的信息。然后下线的信息，也是通过gossip协议去传播。
哨兵集群和redis实例通信时，会采用这个Pub/Sub,一般采用redis做消息队列的场景并不多。

服务端的过程：
1. 初始化，确认每个节点的槽
2. 如果发生节点新增，那就需要迁移数据
1）其实就是新节点，怎么把原来的槽给接过去。其实完全可以利用redis的RDB文件和AOF去同步，只不过执行的时候，RDB文件这个要只加载属于对应槽的数据，AOF也只执行对应槽的数据。等到同步完成之后，迁移命令之前


客户端写入的过程可以分为：
1. 客户端通过proxy请求redis，由proxy计算在哪个分片上，其实客户端不应该去消化这个逻辑，不然一旦发生迁移的话，逻辑会更为复杂
2. proxy接收到请求之后，计算分片，然后其应该有slot对应的节点信息，直接去请求相关的节点
3. 如果请求到结果，那就正常请求。如果未请求到结果，则服务节点应该要告诉它在哪个分片上，然后再重新发请求。


### 一致性hash
我们为什么要采用一致性hash，其中有什么问题

## redis的分布式一致性
1. 可参考[这篇文档](https://learn.lianglianglee.com/%E4%B8%93%E6%A0%8F/%E5%88%86%E5%B8%83%E5%BC%8F%E4%B8%AD%E9%97%B4%E4%BB%B6%E5%AE%9E%E8%B7%B5%E4%B9%8B%E8%B7%AF%EF%BC%88%E5%AE%8C%EF%BC%89/04%20%E5%88%86%E5%B8%83%E5%BC%8F%E4%B8%80%E8%87%B4%E6%80%A7%E5%8D%8F%E8%AE%AE%20Gossip%20%E5%92%8C%20Redis%20%E9%9B%86%E7%BE%A4%E5%8E%9F%E7%90%86%E8%A7%A3%E6%9E%90.md)


## redis的数据结构
传统意义上认为redis有五种数据结构，string、list、hash、set、zset，但实际上，按照其[官方文档]<https://redis.io/docs/data-types/>的表述，其应该有10种数据结构
### string
### list
### hash
### set
### zset
### json
### streams
[参考链接](https://redis.io/docs/data-types/streams/)
### Geospatial
主要是用于地理定位的
[参考链接](https://redis.io/docs/data-types/geospatial/)
### bitmaps



## 应用场景
### 分布式锁
具体可参考[这篇文档](http://www.redis.cn/topics/distlock.html)

## redis的未来发展趋势
存储与缓存本身并没有明确的边界。redis本身其实也支持落盘，并不仅仅是内存。


## 参考文档
1. <http://www.redis.cn/topics/sentinel.html>
2. <http://www.redis.cn/topics/cluster-tutorial.html>
3. <http://redisdoc.com/topic/sentinel.html#:~:text=Redis%20Sentinel%20%E6%98%AF%E4%B8%80%E4%B8%AA%E5%88%86%E5%B8%83,%E4%BB%A5%E5%8F%8A%E9%80%89%E6%8B%A9%E5%93%AA%E4%B8%AA%E4%BB%8E%E6%9C%8D%E5%8A%A1%E5%99%A8>
4. <https://www.redis.com.cn/topics/cluster-tutorial.html>
5. <https://www.51cto.com/article/613829.html>
6. <https://redisbook.readthedocs.io/en/latest/internal/aof.html>