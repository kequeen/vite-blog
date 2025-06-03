# 一些常见问题
整理常被问到的细节问题，像类似于并发、GC、GMP等，就单独开文章去写，其它的部分就更新在这里。

## 如何理解协程
首先我们要从操作系统的进程说起，虽然linux本身已经让进程创建的成本很低了，但实际上进程的创建的开销对于操作系统而言还是太大。  
为此，又有了[线程](https://zh.wikipedia.org/wiki/%E7%BA%BF%E7%A8%8B)，线程是操作系统向其分配处理器的最小单元。同一进程下的多线程本身享有进程中的全部系统资源，但每个线程本身，还是有自己的调用栈，寄存器。协程的本质其实就是用户态线程。 

其实又会延伸另外一个问题，多线程场景下，单个线程的崩溃是否可能引起其它线程的崩溃？

## 关于golang中的逃逸分析
[逃逸分析](https://en.wikipedia.org/wiki/Escape_analysis),其实就是确认在哪里可以访问到指针，核心目的是将内存分配到堆上或者分配到栈上。
逃逸分析的基本原则
>如果函数外部没有引用，则优先放到栈中；
>如果函数外部存在引用，则必定放到堆中；
也会有一些异常情况：
1. interface{} 动态类型逃逸
2. 栈空间大小不足

更多细节可以参考着两篇文章：
1. [Go逃逸分析](https://geektutu.com/post/hpg-escape-analysis.html)
2. [逃逸分析是怎么进行的](https://golang.design/go-questions/compile/escape/)

## slice和map的底层原理
可参考[这篇文档](https://golang.design/go-questions/slice/vs-array/)
核心是理解其底层结构
``` go
type slice struct {
	array unsafe.Pointer // 元素指针
	len   int // 长度 
	cap   int // 容量
}
```

## 如何优雅退出协程

## Golang中切片的扩展规则
其实可以理解为切片如何做自动扩容
可以参考[这篇文章](https://draveness.me/golang/docs/part2-foundation/ch03-datastructure/golang-array-and-slice/),以及golang中的源码
``` go
	newcap := old.cap
	doublecap := newcap + newcap
	if cap > doublecap {
		newcap = cap
	} else {
		const threshold = 256
		if old.cap < threshold {
			newcap = doublecap
		} else {
			// Check 0 < newcap to detect overflow
			// and prevent an infinite loop.
			for 0 < newcap && newcap < cap {
				// Transition from growing 2x for small slices
				// to growing 1.25x for large slices. This formula
				// gives a smooth-ish transition between the two.
				newcap += (newcap + 3*threshold) / 4
			}
			// Set newcap to the requested cap when
			// the newcap calculation overflowed.
			if newcap <= 0 {
				newcap = cap
			}
		}
	}
```
扩容的规则显而易见，新的cap的计算分为以下几种情况：  
1）如果没有达到当前分配的容量，其实就不需要扩容，cap不变  
2）newcap超过oldcap的2倍的话，直接扩容到新的cap  
3）新的cap未超过旧的cap的2倍，但小于256，则直接newcap  
4）如果已经超过256，则每次扩容1.25倍  

## 由第一个问题可以引申出第二个问题，golang中的map的扩容
这块可以参考[这篇文章](https://draveness.me/golang/docs/part2-foundation/ch03-datastructure/golang-hashmap/)

## Golang中json解析相关的问题

``` go
	//测试下切片相关的操作
	var a []int
	if a == nil {
		fmt.Println("a is nil")
	}

	b := make([]int, 0)
	if b == nil {
		fmt.Println("b is nil")
	}
	//output
	// a is nil

```
这个是类型初始化方式的不同，golang中是否会分配默认值，或者是实际占用内存，类似于用var这种方式定义切片，其实本身是没有实际分配内存的
会导致json解析的结果不同

## 关于反射的使用场景
我理解其实线上服务应该尽可能的少用反射，因为反射本身是有性能损耗的，但一些场景来说，其实反射也是不可或缺的
关于反射的原理，可以参考[这篇文章](https://mp.weixin.qq.com/s/298AO5no7MUlDGGGK9aPeQ)  
网上的示例使用场景是用于类似于ORM框架这种，将对象本身转化成sql。其实golang源码中的json包也用了反射，将json反序列化到对象上

## 关于字符串的遍历
[相关链接](<https://berryjam.github.io/2018/03/%E4%BB%8Egolang%E5%AD%97%E7%AC%A6%E4%B8%B2string%E9%81%8D%E5%8E%86%E8%AF%B4%E8%B5%B7/>),自己之前也一直模糊的点在于如何遍历字符串，这个文章里面就说得比较清楚，range是用字符遍历，s[i]这种方式是用字节去遍历，就是所谓的rune类型，也是int32的别名


