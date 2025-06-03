# 关于k8s
在云原生时代，k8s已经成为事实上的基建，可以理解为云原生时代的操作系统。  
有的人会把k8s与docker搞混，其实可以理解为操作系统和进程的关系，而pod更像是一个应用程序，里面可以包含多个docker，并且可以管理docker的启动顺序，也就是管理依赖  
其实还有一个核心问题，就是关于不同pod的通信问题。在同一个机器上，其实有很多的方式进行通信，大家可以通过unixsocket，共享内存等方式，但在云原生中，虽然都在同一个集群中，但机器过多的话，单个网段下无法配置完，会跨网段，如何进行跨网段的通信，这也是我们所需要考虑的  

k8s虽然早期依赖于docker，但现在其实本身已经与docker解耦，只要你实现了k8s的声明接口，k8s也就可以对起进行容器编排与调度。其实有点类似于，只要文件系统实现了相关的文件操作API，操作系统就能正常地对这些文件进行管理。


## 核心概念
### pod
> 在 Kubernetes 中创建和管理的、最小的可部署的计算单元
pod是一组容器，这些容器共享存储、网络，以及怎样运行这些容器的声明

#### 生命周期
可参考这篇[文档](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/)，
pod的状态
1. Pending
2. Running
3. Succeeded
4. Failed
5. Unknown

容器的状态主要有三种：
1. Waiting
2. Running
3. Terminated

#### 主要的两种用法
1. 运行单个容器的pod
2. 运行多个协同工作的容器pod
其实这个最主要的问题


## 工作负载资源
### DaemonSet
[相关文档](https://kubernetes.io/zh-cn/docs/reference/kubernetes-api/workload-resources/daemon-set-v1/)
其实就是守护进程的集合  
滚动更新是比较常见的更新策略,其实这种也是大型分布式系统的更新策略
[更新策略](https://kubernetes.io/zh-cn/docs/tasks/manage-daemon/update-daemon-set/)

## 调度、强占与驱逐
<https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/scheduler-perf-tuning/>
要调度的时候，其实就是先筛选出满足条件的节点，然后按照规则去打分
如果要提升调度性能的话，可以在找到足够数量的满足条件就停止


## CronJob
[参考文档](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/cron-jobs/)
其实就是在单机上本来就有定时任务，然后迁移到了分布式系统上，其实最大的问题就是如何避免重复调度，以及监控和收集运行状态

## 容器运行时
[相关文档](https://kubernetes.io/zh-cn/docs/concepts/architecture/cri/)，需要容器去实现这些[定义](https://github.com/kubernetes/cri-api/blob/c75ef5b/pkg/apis/runtime/v1/api.proto),我理解就是容器与docker脱钩，不再被强行绑定在一起


## sidecar
可以参考[文档](https://jimmysong.io/kubernetes-handbook/usecases/sidecar-pattern.html)

## 疑问
1. k8s如何实现多机房不同配置的分发，这个是在哪一步去做的
我突然在想一个问题，其实跨机房的话，是不是每个机房都应该有一个k8s来进行调度
看了一下网上的方案，大部分来说应该都是每个机房一个k8s集群，跨机房调度其实需要考虑的东西就更多了

2. 有状态服务与无状态服务
以前一直没有太明白这个概念，其实用最简单的概念阐述，就是有状态服务每次请求，其实只能由特定的机器或者容器来处理【其实类似于 mysql 或者 redis 这种存储】，无状态服务就是每次请求到所有机器上都OK

## 参考文档
1. <https://kubernetes.io/zh-cn/docs/tutorials/kubernetes-basics/>
2. [Pod](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/)