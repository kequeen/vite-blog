# 调度器
线程是操作系统调度时的基本单元，而linux并不区分线程和进程的调度

## 设计原理
GMP调度器（线程M，Goroutine G 和处理器P）
历史上其实本身是G-M模型

### 历史变迁
#### 单线程调度器
简单评价就是一个能用的调度器，G-M模型。全局只有一个线程
#### 多线程调度器
GOMAXPROCS 可以控制程序中的最大处理器数，即活跃线程数
1) 调度器和锁是全局资源，所有的调度状态都是中心化存储的，锁竞争问题严重
2) 线程需要经常互相传递可运行的Goroutine，引入了大量的延迟
3) 每个线程都需要处理内存缓存，导致大量的内存占用并影响数据局部性
4) 系统调用频繁阻塞和解除阻塞正在运行的线程，增加了额外开销 

#### 任务窃取调度器
[改进手段](https://docs.google.com/document/d/1TTj4T2JO42uD5ID9e89oa0sLKhJYD0Y_kqxDv3I3XMw/edit)
1) 当前的G-M模型中引入了处理器P，增加中间层
2) 在处理器P的基础上实现了基于工作窃取的调度器

#### 抢占式调度器



## 一些疑问
1. go的调度器，其实跟linux系统里面的线程调度的本质区别是什么，是否也是抢占式调度
采用抢占式调度如何避免饿死的问题
2. 调度相关的问题，其实在java的场景中应该也会遇到，有时间可以查下java里面的调度是什么样子的


## 参考文档
1. <https://draveness.me/golang/docs/part3-runtime/ch06-concurrency/golang-goroutine/>
2. <https://zh.m.wikipedia.org/zh-hans/%E8%B0%83%E5%BA%A6_(%E8%AE%A1%E7%AE%97%E6%9C%BA)>