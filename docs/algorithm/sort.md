# 关于排序
日常工作中用到的算法，其实很大一部分都与排序有关。想从自己理解的角度去谈一下排序算法
其实日常工作中需要自己手写排序的地方并不多，基本上所有的编程语言都内置了排序功能，实现上基本用的快速排序，在时间与空间耗费上相对较为均衡的算法。
就算我们对复杂对象进行排序，也只需要我们定义好compare 函数，语言层面就能做好这个事情。
这里从我们日常使用场景下比较常见

## 冒泡排序
[冒泡排序](https://zh.wikipedia.org/zh-sg/%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F)，面试中可能会被问到的其实就是是否还有优化空间了，在吴军老师的[计算之魂](https://book.douban.com/subject/35641088/)中其实提到，如何判断算法是否有优化空间，其实就是看算法本身是否有多余的计算。这里最明显的多余的计算，其实就是如果遍历一轮下来，发现其实并没有发生交换，那其实可以说明排序已经提前完成，而我们其实可以算出，其正常循环的话，比较次数为 n(n-1)/2，可以认为其时间复杂度为O(n^2)，空间上理解只用了isChange的标识，数据交换一般也需要一个额外的temp空间，这种都是常数级的空间，所以空间复杂度为 O(1)
```go
// BubbleSort 冒泡排序. data必须实现sort包中的Interface接口
func BubbleSort(data sort.Interface) {
	n := data.Len()
	for i := 0; i < n-1; i++ {
		isChanged := false
		for j := 0; j < n-1-i; j++ {
			if data.Less(j, j+1) {
				data.Swap(j, j+1)
				isChanged = true
			}
		}
		if !isChanged {
			break
		}
	}
}

```
而这个算法上还有一些多余的计算其实很难直接想到，就是相邻数据的比较计算很多都是重复的，因为很多并没有发生交换，每一轮都需要重新比较

## 选择排序
选择排序与冒泡排序的时空复杂度一样，以前一开始学习的时候，时常分不清楚。
其实与冒泡排序的核心差别就是每一轮只交换一次，会有一个变量记录当前的最大值或者最小值，一轮遍历完成之后，如果目标位置上的值与记录的最大值或者最小值不符，需要进行交换。

## 插入排序
工业库中在量级小的情况会将其作为快速排序的补充,一般会使用插入排序的升级版--希尔排序，以golang基础库中的代码作为示例
```go
func Sort(data Interface) {
	n := data.Len()
	quickSort(data, 0, n, maxDepth(n))
}

// maxDepth returns a threshold at which quicksort should switch
// to heapsort. It returns 2*ceil(lg(n+1)).
func maxDepth(n int) int {
	var depth int
	for i := n; i > 0; i >>= 1 {
		depth++
	}
	return depth * 2
}

func quickSort(data Interface, a, b, maxDepth int) {
	for b-a > 12 { // Use ShellSort for slices <= 12 elements
		if maxDepth == 0 {
			heapSort(data, a, b)
			return
		}
		maxDepth--
		mlo, mhi := doPivot(data, a, b)
		// Avoiding recursion on the larger subproblem guarantees
		// a stack depth of at most lg(b-a).
		if mlo-a < b-mhi {
			quickSort(data, a, mlo, maxDepth)
			a = mhi // i.e., quickSort(data, mhi, b)
		} else {
			quickSort(data, mhi, b, maxDepth)
			b = mlo // i.e., quickSort(data, a, mlo)
		}
	}
	if b-a > 1 {
		// Do ShellSort pass with gap 6
		// It could be written in this simplified form cause b-a <= 12
		for i := a + 6; i < b; i++ {
			if data.Less(i, i-6) {
				data.Swap(i, i-6)
			}
		}
		insertionSort(data, a, b)
	}
}

```

## 堆排序
top K问题的常见解法  
因为计算机取数据的时候，是按页读与缓存数据的，顺序读数据的话，效率本身要比随机读要高，堆排序需要有效率的随机存取才能变得可行。  	
核心其实在于新增或者删除节点如何自平衡

## 快速排序
有时候真的很想感慨，想出快排的人真是个天才。快排也是目前工业界一般情况下选择的算法。毕竟其平均复杂度O(nlogn)
实现方法1，比较容易理解的，但是需要不停创建新的数组
``` go
func quickSort(arr []int) []int{
	if len(arr) <= 1 {
		return
	}
	var left []int
	var right []int
	temp = arr[0]
	for i := 1; i < len(arr); i++ {
		if temp > arr[i] {
			left = append(left, arr[i])
		}else {
			right = append(right,arr[i])
		}
	}
	//分别对左右再进行排序
	left = quickSort(left)
	right = quickSort(right)
	return append(append(left, temp), right...)
}

```
实现方法2，原地排序，就是找到一个中间数，然后递归
``` go
func quickSort(arr []int, low, high int) {
	if low < high {
		//寻找切割的下标
		pivotIndex := partition(arr, low, high)
		//对左右再分别排序
		quickSort(arr, low, pivotIndex-1)
		quickSort(arr, pivotIndex+1, high)
	}

}

// 分区函数
func partition(arr []int, low int, high int) int {
	//取一个数作为基准
	privot := arr[high]
	i := low - 1
	for j := low; j < high; j++ {
		if arr[j] < privot {
			i++
			arr[i], arr[j] = arr[j], arr[i]
		}
	}
	//交换下位置
	arr[high], arr[i+1] = arr[i+1], arr[high]
	return i + 1
}
```

## 归并排序
如果只是2个数组的归并排序
```go
func merge(nums1 []int, m int, nums2 []int, n int) []int {

	result := make([]int, m+n)
	index := 0
	i, j := 0, 0
	for i < m && j < n {
		if nums1[i] > nums2[j] {
			result[index] = nums2[j]
			j++
		} else {
			result[index] = nums1[i]
			i++
		}
		index++
	}
	if i >= m {
		for j < n {
			result[index] = nums2[j]
			index++
			j++
		}
	}
	if j >= n {
		for i < m {
			result[index] = nums1[i]
			index++
			i++
		}
	}
	return result
}


```
如果是多个数据的归并排序，就可以用类似于MapReduce的方式来解决




## 拓扑排序
以前在掘金上也写过相关的文章<https://juejin.cn/post/6844904033606434823>,
有一点比较重要的是，我们该采用邻接链表还是邻接矩阵去表达图，采用不同的数据结构，在解决不同的问题上，难度是有差异的


## 参考文档
1. <https://zh.wikipedia.org/wiki/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95>
2. <https://zh.m.wikipedia.org/zh/%E9%80%89%E6%8B%A9%E6%8E%92%E5%BA%8F>
3. <https://zh.m.wikipedia.org/zh-hans/%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8F>
4. <https://zh.m.wikipedia.org/zh/%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F>
5. <https://zh.m.wikipedia.org/zh/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F>
