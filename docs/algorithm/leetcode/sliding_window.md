# 滑动窗口
滑动窗口是一种常用的算法技巧，用于解决一类涉及连续子数组或子字符串的问题。滑动窗口通常适用于以下情况：

1. 字符串或数组中的连续子串/子数组问题：当需要处理连续的子串或子数组，并且需要在该子串/子数组上进行操作（如求和、求平均值、查找最大/最小值等）时，滑动窗口是一种常见的解决方法。比如求解最长连续不重复子串、找到满足特定条件的最小/最大子数组等问题。

2. 固定窗口大小问题：当需要在固定大小的窗口上进行操作，并且需要在窗口滑动过程中维护某种状态或性质时，滑动窗口也是一个有效的技巧。这种情况下，窗口通常由两个指针（左指针和右指针）确定，通过移动指针来滑动窗口，同时更新窗口内的状态。例如，在一个数组中找到满足特定条件的子数组，且该子数组的长度固定为某个值。

3. 寻找最优解问题：滑动窗口在某些情况下可以用于寻找最优解。通过在滑动过程中根据问题要求更新窗口，可以找到满足最优条件的窗口。例如，求解最小覆盖子串、找到最长连续递增子数组等问题。

滑动窗口的核心思想是通过调整窗口的起始位置和终止位置来滑动窗口，以有效地处理子串或子数组的问题。使用滑动窗口可以在时间复杂度为 O(n) 的情况下解决许多与连续子串/子数组相关的问题，提高算法的效率。

需要注意的是，滑动窗口并非适用于所有问题，因此在解决具体问题时，仍需结合实际情况进行分析和判断是否适合使用滑动窗口。

## 具体题目示例
### 找到字符串中所有字母异位词
[题目链接](https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/)

``` go
func findAnagrams(s string, p string) []int {
	var ans []int
	sLen, pLen := len(s), len(p)
	if sLen < pLen {
		return ans
	}
	sCount, pCount := [26]int{}, [26]int{}
	for i, v := range p {
		pCount[v-'a']++
		sCount[s[i]-'a']++
	}
	if sCount == pCount {
		ans = append(ans, 0)
	}
	//采用滑动窗口进行比较
	for i := 0; i < sLen-pLen; i++ {
		//第一位退场
		sCount[s[i]-'a']--
		//末位进场
		sCount[s[i+pLen]-'a']++
		if pCount == sCount {
			ans = append(ans, i+1)
		}
	}
	return ans
}

```

### 滑动窗口的平均值
[题目链接](https://leetcode.cn/problems/qIsx9U/description/)
其实核心还是在于如何避免去做一些重复计算的工作，用一个窗口去保存中间的值，这个才是滑动窗口的精髓
``` go
type MovingAverage struct {
    size int
    sum int
    arr []int
}

/** Initialize your data structure here. */
func Constructor(size int) MovingAverage {
    return MovingAverage{size:size}
}


func (this *MovingAverage) Next(val int) float64 {
    if len(this.arr) == this.size {
        //干掉首位的
        this.sum = this.sum - this.arr[0]
        this.arr = this.arr[1:]
    }
    this.arr = append(this.arr, val)
    this.sum += val
    return float64(this.sum) / float64 (len(this.arr))
}
```