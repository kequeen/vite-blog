# 关于查找
算法中其实很多都是关于查找的问题，从最简单的二分查找，到top K，以及从海量数据中找到自己想要的数据
其实搜索又何尝不是一种查找，只是这种查找会有更多复杂因素的考量

## 二分查找
二分查找是入门，基础中的基础
``` go
// 找不到返回-1
func binarySearch(arr []int, target){
	left = 0 
	right = len(arr)-1
	for left < right {
		mid := (left + right)/2
		if arr[mid] == target {
			return mid
		}else if arr[mid] < target {
			left = mid + 1
		}else {
			right = mid -1
		}
	}
	return -1
}
```