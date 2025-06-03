# 关于docker
在docke之前，在更早之前出现的应该是虚拟机，容器与虚拟机的区别在于
>容器是将操作系统层虚拟化，虚拟机则是虚拟化硬件

## 资源分离
利用linux的cgroups和namespace技术，
1. namespace隔离了应用程序中程序的视野，包括进程树，网络，用户id，以及挂载的文件系统
2. cgroups则提供了资源的隔离，包括CPU、存储器、block I/O与网络

## 存储
容器的数据如何存储在宿主机的操作系统上

## 网络

## 参考文档
1. <https://zh.wikipedia.org/wiki/Docker>