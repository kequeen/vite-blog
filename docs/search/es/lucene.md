# Lucene
我们要更进一步学习ES，就不可能绕过Lucene。
Lucene提供了一个简单却强大的应用程序接口，能够做全文索引和搜索。

## 数据结构

### 倒排索引
搜索的一个重要的场景就是，去检索这个词相关的内容，很多时候不一定是精确搜索，也有很多是模糊搜索。比如你搜北京，他可能会去检索北京、北京天气、北京小吃等各种内容，这种其实最合适。

其实可以理解FST是Trie的一种压缩技术，不过这个构造就会比较复杂一些
Term index在内存中是以FST的形式保存的
Term dictionary在磁盘中是以分block保存的，一个block内部利用公共前缀压缩，比btree更节省空间

关于skip list的使用，可以参考[这个文档](https://juejin.cn/post/7001130816029884429)，其实是因为要分块压缩，可以更快定位到自己的位置

之前一直没有太关注压缩算法，但对于搜索引擎而言，压缩算法其实是很重要的事情


## 参考文档
1. <https://zh.wikipedia.org/wiki/Lucene>
2. <https://www.shenyanchao.cn/blog/2018/12/04/lucene-fst/>
3. <https://www.cnblogs.com/ajianbeyourself/p/11259984.html>
4. <https://zhuanlan.zhihu.com/p/33671444>