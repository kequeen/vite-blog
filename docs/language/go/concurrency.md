# go中的并发
并发其实最复杂的是变量共享的问题，golang中的解决方案说的是，不要通过共享内存去通信，而是通过通信去共享内存，这就是著名的CSP模型

并且其实就算协程的代价很低，有协程池还是更优的,并且更重要的是控制系统的负载。
比如有的场景，可能只能承受几十并发，而如果你请求端不做限制，其实很容易把下游冲垮，做这种限流，线程池其实就是一种很合适的方式。

goroutine和channel是golang并发的基石，也是golang目前与其他语言的一个核心区别，毕竟golang本身设计之初就是为了更好的并发存在的

## 关于channel
channel本身使用上也比较复杂，其实可以理解为语言层面的消息队列，会关注几个问题：
### 发送消息到一个不带缓冲区的channel会怎么样


### 如何优雅关闭channel
因为比较难以检测channel中的数据是否都已经消费完，这其实会是一个问题.并且像一个已经被close的channel发送消息的话，会导致panic
一般来说是由发送方去关闭channel
主要分为三种情况
1. M个接收者，1个发送者
这种情况下发送者直接关闭就可以
2. 1个接收者，M个发送者
这种情况下可以由接收者通过关闭一个信号通道，去通知发送者停止发送数据
3. M个接收者，N个发送者
这种情况需要一个主持人
```go
    // 主持人
    go func() {
        stoppedBy = <-toStop
        close(stopCh)
    }()
```
满足条件由接受者或者发送者去调用主持人进行更新

### 问题分析
具体可参考[链接](https://keepmoving.ren/golang/waitgroup/)

## 参考链接
1. <https://github.com/panjf2000/ants/blob/master/README_ZH.md>
2. <https://learnku.com/go/t/23459/how-to-close-the-channel-gracefully>