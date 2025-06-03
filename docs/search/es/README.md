# ES
ES是当今最为流行的开源搜索解决方案，对于大部分通用的场景，ES应该都是可以满足的。  
并且ES本身架构上就非常优秀，基本上分布式架构的大多数场景，其本身都有涉及，非常值得我们去学习。

## 关于通用搜索流程
基本上与[这篇文章](http://www.kequeen.work/search/principle.html)中谈到的相符合。但很多时候我们也需要添加我们自己的业务逻辑  
离线部分的话，数据的入库可以自定义处理脚本。而对于大型系统来说，这种入库必然不是串行的，不然入库就成为瓶颈了，而这种并行的入库，其实就交给使用方来自己实现，怎么同步数据入库

在线部分的话，一般我们需要关注的，一般是召回部分（改写、纠错与分词），因为默认的中文分词在很多情况下无法符合预期，以及因为一些异常情况下的干预，一般在召回部分做干预的成本较低。  
检索的话，除了默认的计算相关性的方式之外，也支持我们自定义脚本计算相关性

## ES的正排与倒排的存储
数据的分片一般是根据doc_id来进行分片的，正常我们在容量规划的时候就需要进行确认.
而检索的时候都是通过term去检索的，所以一般会全扇出

## 关于ES的数据更新及平衡过程
其实这个问题就是，ES的数据如何无限横向扩展。  
这种扩容一般都是采用[一致性hash](https://zh.wikipedia.org/wiki/%E4%B8%80%E8%87%B4%E5%93%88%E5%B8%8C)算法来实现，ES也不例外，具体可参考[文档](https://www.elastic.co/guide/en/elasticsearch/reference/8.4/indices-split-index.html)  
其实最简单的方式，就是我们在容量规划的时候，就提前规划好ES的容量，否则动态扩容再自平衡的时间成本，一般业务都是无法接受的。即使是采用了一致性 hash 这种增删节点影响面相对已经较小的方案，但在自平衡的过程中，还是会严重影响集群的读写，影响业务的正常使用。

### 关于集群扩容
可参考腾讯云[这篇文章](https://cloud.tencent.com/document/product/845/43615)


### 海量分片的代价
1. 一个分片的底层就是一个Lucene索引，会消耗一定文件句柄、内存、CPU资源
2. 数据热点问题
3. 计算相关度的词频统计信息是基于分片的  
第三点这个代价其实我们一直容易忽略的


## 关于ES的高可用
大型工业项目不可避免的高可用问题。


## 数据一致性的问题
单机房不同实例的数据一致性的问题解决
多机房的数据一致性问题解决


## ES对sql的支持
在官方的最新文档中，[sql-getting-started](https://www.elastic.co/guide/en/elasticsearch/reference/current/sql-getting-started.html),发现已经支持sql了

```
POST /_sql?format=txt
{
  "query": "SELECT * FROM library WHERE release_date < '2000-01-01'"
}
```

## 关于ES配置的一些最佳实践



## 其它优化
关于一些其他方面的优化
 1. [使用pagecache](https://www.elastic.co/guide/en/elasticsearch/reference/current/preload-data-to-file-system-cache.html), 这个一般以硬盘作为主要存储介质的，都会使用这一特性

 2. [数据冷热分层](https://www.elastic.co/guide/en/elasticsearch/reference/current/data-tiers.html#warm-tier)



## 参考文档
1. <https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html>
2. <https://github.com/elastic/elasticsearch>
3. <https://www.elastic.co/guide/en/elasticsearch/reference/current/high-availability-cluster-small-clusters.html>
4. <https://www.elastic.co/guide/en/elasticsearch/reference/current/size-your-shards.html>
5. [一致性hash与hash槽的对比](https://www.jianshu.com/p/4163916a2a8a)
6. <https://segmentfault.com/a/1190000037658997>