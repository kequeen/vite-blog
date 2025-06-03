# 关于mysql
mysql可以说是关系型数据库的典型了，大多数互联网公司以及中小公司需要使用关系型数据库的首选。
其本身也是演进的，从 myisam 演进到 innodb 等多种存储引擎
以前的时候，会觉得存储引擎这种词很高大上，但实际上呢，也不过是数据库组织存储数据的方式，我们对数据进行增删改查等各种操作其实都是通过存储引擎。
其实有点类似于我们对文件的变更，其实都是通过操作系统的API去对文件系统（wiki百科的定义，文件系统是一种用于向用户提供底层数据存取的机制）进行操作

## 存储引擎
类似于mysql常用的存储引擎主要有innodb和myisam，一般无特殊要求的情况下，都是使用innodb。
innodb与myisam其中最大的区别就是对于事务的支持，以及对于行锁的支持。

### innodb
如何实现事务，其实会依赖于redo log(重做日志)和binlog(归档日志)，其中redo log是innodb存储引擎所特有的日志

## 关于索引的选择
假设如果a,b,c三个字段都有索引，我们查询条件中
``` sql
select * from tableA where a = ? and b = ? and c = ?  
```
该如何选择索引，具体可参考[这篇文章](https://www.51cto.com/article/689113.html),会选择索引基数较大的字段


## 存储的数据结构
关系型数据库一般是按行组织数据。
例如mysql中的innoDB存储引擎采用B+树作为存储，pgsql中使用B树。  
今天的各种存储引擎也有用[跳表](https://en.wikipedia.org/wiki/Skip_list)（以redis为例）和[LSM树](https://en.wikipedia.org/wiki/Log-structured_merge-tree)(以rocksdb为例)

B树与B+树之间的区别是，数据是否会存储在叶子节点
相关的详细比较可以参考[这篇文章](https://segmentfault.com/a/1190000021488885)

其实采用树这种数据结构的根本原因还是在于，磁盘的读取成本很高，而cpu计算很快
MySQL采用B+树作为其主要索引结构，是因为B+树在数据库系统中具有多个优势，使其成为数据库索引的理想选择。以下是MySQL选择B+树作为索引结构的原因：

1. 范围查询效率高：B+树具有良好的范围查询性能。在B+树中，所有叶节点都按照顺序连接，并且范围查询可以通过在树中执行一次遍历来完成，这使得范围查询的效率很高。

2. 顺序访问优势：由于B+树中的叶节点按照顺序连接，因此对于顺序访问的操作，例如遍历一个范围内的数据或进行排序，B+树的性能非常出色。

3. 内存友好：B+树的内部节点通常比叶节点更小，因为内部节点只包含索引键，而叶节点还包含数据。这种结构使得B+树更适合于在内存中进行操作，减少了磁盘I/O的开销，提高了查询性能。

4. 支持聚集索引：在InnoDB存储引擎中，使用B+树实现了聚集索引。聚集索引的叶节点存储了整个数据行，因此可以避免在查询时需要回表查找数据。

5. 磁盘空间利用率高：B+树的内部节点不包含数据，而只包含索引键，这使得每个节点可以存储更多的索引项，从而提高了磁盘空间的利用率。

6. 插入和删除效率稳定：B+树的插入和删除操作通常比较稳定，不会像B树那样频繁地进行节点的分裂和合并，因此在插入和删除操作频繁的场景下，B+树相对更稳定。

综合上述优点，B+树在大多数情况下是一种高效的索引结构，适用于数据库中需要频繁进行范围查询、排序和顺序访问的情况。因此，MySQL选择了B+树作为其主要索引结构，并且在InnoDB存储引擎中广泛使用B+树来实现聚集索引和辅助索引。

### 关于mvcc的数据结构
这块就需要提到undo log了，用于事务回滚。

## 事务
ACID原则，原子性，一致性，隔离性，持久性
隔离性上，其实又会分四种隔离级别
### 读未提交
最低的隔离级别，允许一个事务读取其他事务尚未提交的数据
可能导致
1. 脏读
2. 不可重复读
3. 幻读

### 读已提交
允许一个事务只能读取其他事务已经提交的数据。解决了脏读的问题。
但可能导致：
1. 不可重复读
2. 幻读

### 可重复读
可重复读也不能解决幻读的问题，因为范围查询
解决了不可重复读的问题
还是存在
1. 幻读

### 可串行化
最高的隔离级别，要求事务串行执行，完全避免了脏读、不可重复读、幻读的问题，但并发下降了。

## 关于mysql的高可用方案
具体可参考[这篇文章](https://zhuanlan.zhihu.com/p/25960208)，其实核心还是那几种方案，主从，双主，多副本

## mysql的横向扩展
可以直接关注横向扩展方案。目前官方是使用[Group Replication](https://dev.mysql.com/doc/refman/8.0/en/group-replication.html)的方案  
节点新增或减少对数据的迁移，以及如何对事务的支持  
Google的[spanner论文](https://dl.acm.org/doi/pdf/10.1145/2491245)其实是一个很好的解决方案
看下 TIDB 中是如何对分布式事务进行支持的，可看[这篇文档](https://docs.pingcap.com/zh/tidb/stable/optimistic-transaction])


## 参考文档
1. <https://dev.mysql.com/doc/>
2. <https://baike.baidu.com/item/%E5%AD%98%E5%82%A8%E5%BC%95%E6%93%8E/8969956>
3. <https://baike.baidu.com/item/%E5%85%B3%E7%B3%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E5%BA%93/8999831>
4. <https://zh.m.wikipedia.org/zh-hans/%E4%BA%8B%E5%8B%99%E9%9A%94%E9%9B%A2>
5. <https://draveness.me/whys-the-design-mysql-b-plus-tree/>
6. <https://zh.m.wikipedia.org/zh-hans/B%2B%E6%A0%91>
7. <https://redisbook.readthedocs.io/en/latest/internal-datastruct/skiplist.html>
8. <https://dev.mysql.com/doc/refman/8.0/en/group-replication.html>