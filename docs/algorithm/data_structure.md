# 关于常用的数据结构
数据结构与算法，这两个词经常会放在一起。因为依赖于合适的数据结构，很多问题的解决其实是事半功倍的。

## 数组
不同语言中数组会有一些差别，比如是否定长，以及数据类型上是否一致。  
一般而言，我们对数组的期待是存储同一类型的数据，虽然像php这类弱类型语言，其实也只能在编程规范上去进行约束  
并且数组的话，强类型语言，我们一般认为其存储地址是连续的。这个读的效率会比较高，而写的效率则不一样  

## 链表
一般是与数组做对比，对比于数组而言，其主要的优势在于修改的成本低，并且可以动态扩展。

## 队列
先进先出的数据结构，常用于BFS等场景。  
在php中，可以用数组去实现。  
在java中，有单独的[List类]<https://www.cainiaojc.com/java/java-list.html>,实现上有LinkedList、ArrayList等多种实现方案
在golang中，实现队列有两种方式：
1. 使用切片
``` go
// 队列
queue := []int{}
queue = append(queue, 1)        // 入队
element := queue[0]             // 获取队首元素
queue = queue[1:]               // 出队
```
2. 可以通过container中的list（本身是一个双向链表）来实现，可以只从一端插入，另外一端去取
``` go
// 队列
queue := list.New()
queue.PushBack(1)                 // 入队
element := queue.Front().Value    // 获取队首元素
queue.Remove(queue.Front())       // 出队
```

## 栈
先进后出的数据结构，常用于DFS等场景
在php中，本身是没有这个数据结构的，但是可以用数组去实现，因为php数组本身就是变长的,并且php原生支持array_pop() 和 array_push()之类的函数
在java中，专门又一个 [Stack类]<https://www.runoob.com/java/java-stack-class.html>,其本身实现了下面的一些方法
``` java
boolean empty()
Object peek()
Object pop()
Object push(Object element)
int search(Object element)
```
golang中也有两种方式去实现
1. 使用切片
``` go
stack := []int{}
stack = append(stack, 1)        // 入栈
element := stack[len(stack)-1]  // 获取栈顶元素
stack = stack[:len(stack)-1]    // 出栈
```
2. 使用list
``` go
stack := list.New()
stack.PushBack(1)                 // 入栈
element := stack.Back().Value     // 获取栈顶元素
stack.Remove(stack.Back())        // 出栈
```

## 树
一般我们常见的是二叉树或者N叉树。像基础的搜索二叉树，其实是缺乏实际的落地场景的，因为树高难以控制，所以一般工程上使用的是[红黑树](https://zh.wikipedia.org/wiki/%E7%BA%A2%E9%BB%91%E6%A0%91),是一种特殊的平衡二叉树，可以在数据增长的情况下，让二叉树保持高度上的平衡。一般用户类似于hashmap或者关联数组中，发生hash冲突之后，如果冲突的key比较少，一般是8，则用链表表示，多于这个数，则一般会转换成红黑树    
而N叉树的一个应用就是B树和B+树，这种一般用于数据库存储上。  
[Trie树](https://zh.m.wikipedia.org/zh-hans/Trie)，一般搜索的场景会使用比较多，主要优势在于做前缀匹配效率确实高

## 图
表示的方式有邻接链表和邻接矩阵两种，类似于我们日常生活中的场景，从A->B的最短路径，就可以将地图抽象成图，各个点的距离抽象成图的边，就可以将生活中的类似问题抽象成图的问题，然后就可以按照关于图的各种理论来进行计算



## Map
基本上所有的语言都认为这是一个必需的数据结构，php中的关联数组，java中的hashmap，golang中的map。


## 参考文档
1. <https://book.douban.com/subject/19952400/>
2. <https://zh.wikipedia.org/zh-sg/%E4%BA%8C%E5%8F%89%E6%A0%91>
3. <https://zh.m.wikipedia.org/zh-hans/%E5%9B%BE_(%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)>

