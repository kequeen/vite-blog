# 为什么要用Go
其实核心就是在已经有C/C++，JAVA，Python，php等诸多各种编程语言的情况下，我们为什么还需要 Go，Go 语言解决了什么痛点呢？
阅读go官网的[这篇文档](https://go.dev/solutions/google/)中的几个典型案例,以及结合我们实际使用经验，我觉得主要在于以下2点： 

1. 易于并发  
go语言天生就是未并发而设计的，其本身并发模型设计简单.不需要关注太多的技术细节在并发，能更多集中精力在业务逻辑上

2. 开发效率与运行性能之间更好的取舍  
go被称为云原生时代的php。上手难度跟php差不多，而其本身是编译型强类型语言，在不考虑使用反射的情况下，运行效率跟C++等语言是同一量级的。

## 一些示例
### 来自google core data团队的应用
> When I’m in C++ and I want to use more packages, I have to write pieces such as headers. When I’m writing in Go, built-in tools allow me to use packages more easily. My development velocity is much faster

对于C++迁移过来的人，不需要再去写各种header文件，引用其他的包变得容易很多，其实就是更容易复用他人的代码

## 关于其他
我挺喜欢[少是指数的多](https://commandcenter.blogspot.com/2012/06/less-is-exponentially-more.html)的设计理念的，其实就是一门语言的设计哲学，像C++包罗万象，功能确实强大，但这其实极大地增加了使用的难度，其实就像80%的使用者其实只使用到了20%的核心功能，而C++是要满足所有人的需求，而不仅仅是支持核心功能。而go设计得足够简单，对于开发者而言，尤其是有其他语言开发经验的开发者，上手难度极低。


## 参考文档
1. <https://go.dev/solutions/google/>
2. <https://paul.pub/cpp-concurrency>
3. <https://draveness.me/golang/>
4. <https://go.dev/doc/faq#history>
5. <http://www.yinwang.org/blog-cn/2017/07/06/master-pl>
6. <https://go.dev/talks/2012/splash.article>
7. <https://www.zhihu.com/question/21409296>