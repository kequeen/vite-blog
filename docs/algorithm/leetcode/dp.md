# 关于动态规划
动态规划相关的算法，其实是这些年面试最常见的高频题目了。对个人能力的考察点我理解主要在于抽象能力，我们如何从复杂的运算中，抽象出问题的本质。   
有时候会很喜欢dp的思想，构建状态转移方程，就能够通过自顶向下地计算获取结果  
最核心的就是如何构造出动态规划方程    
其实最容易搞混的就是递归与动态规划的必然联系，应该是说动态规划其实是将大问题拆解为小问题，

## 注意点
1. 一般直接使用状态转移方程，就是使用递归的方式，而单纯使用递归的话，就会有重复计算，容易导致超时。而需要优化的话，一般就是存储已经求解的子问题的答案，减少重复计算。一般其实采用自底向上计算

## 背包问题

### 0-1背包问题
看到这个[滚动数组](https://www.cnblogs.com/RioTian/p/12397821.html)的优化，还是很有意思的，最新的状态只依赖于有限的几个状态，确实没必要去保存所有的状态。其实按照《计算之魂》这本书中的观点里面提到的也一样，去掉无用的计算。

### 完全背包问题

## 其他典型题目
### 爬楼梯
动态规划的经典题目，也是比较容易理解的。其实最核心的就是想出递推公式
``` go
//最经典的爬楼梯问题 https://leetcode.cn/leetbook/read/top-interview-questions-easy/xn854d/
func climbStairs(n int) int {
	//这种直接递归的方式会超时
	//dp公式 dp[n] = dp[n-1] + dp[n-2]
	//dp[1] = 1, dp[2] =2
	if n == 1 || n == 2 {
		return n
	}
	return climbStairs(n-1) + climbStairs(n-2)
}
```
这种方式目前会计算超时，所以需要做一些优化，存储历史状态，减少重复计算，其实就是以空间换时间，这也是算法中很常见的优化方式
``` go
//不重复计算，以空间换时间
func climbStairsV2(n int) int {
	if n == 1 || n == 2 {
		return n
	}
	dp := make([]int, n+1)
	//初始化
	dp[1] = 1
	dp[2] = 2
	for i := 3; i <= n; i++ {
		dp[i] = dp[i-1] + dp[i-2]
	}
	return dp[n]
}

```
对空间的更极致的优化，其实就是上面所提到的，对于迭代而言，只需要保留前两个状态就可以，不需要保留整个数组
``` go
func climbStairs(n int) int {
	if n == 1 || n == 2 {
		return n
	}
	//其实只需要存储三个变量，结果ans，前面的两个变量p,q
	p := 1
	q := 2
	ans := 0
	for i := 3; i <= n; i++ {
		ans = p + q
		p = q
		q = ans
	}
	return ans
}
```

### 杨辉三角
[杨辉三角题目描述](https://leetcode.cn/problems/pascals-triangle/description/)
``` go
func generate(numRows int) [][]int {
	ans := make([][]int, numRows)
	for i, _ := range ans {
		ans[i] = make([]int, i+1)
		ans[i][0] = 1
		ans[i][i] = 1
		for j := 1; j < i; j++ {
			ans[i][j] = ans[i-1][j-1] + ans[i-1][j]
		}
	}
	return ans
}

```

### 最长公共子序列
[最长公共子序列题目](https://leetcode.cn/problems/longest-common-subsequence/submissions/)
``` go
func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// 上面自己的写法建模有些复杂了，其实可以简化一下，因为dp[i][j]只和dp[i-1][j], dp[i][j-1]
// 为什么不需要比较dp[i-1][j-1]，因为dp[i-1][j] 和 dp[i][j-1]都和这个有关
func longestCommonSubsequenceV2(text1 string, text2 string) int {
	len1 := len(text1)
	len2 := len(text2)
	dp := make([][]int, len1+1)
	for i := 0; i < len1+1; i++ {
		dp[i] = make([]int, len2+1)
	}
	for i, c1 := range text1 {
		for j, c2 := range text2 {
			if c1 == c2 {
				dp[i+1][j+1] = dp[i][j] + 1
			} else {
				dp[i+1][j+1] = max(dp[i][j+1], dp[i+1][j])
			}
		}
	}
	return dp[len1][len2]
}

```

### 爬楼梯变种
[爬楼梯的最少成本](https://leetcode.cn/problems/GzCJIP/description/)
``` go
func minCostClimbingStairs(cost []int) int {
    //dp[i] = min(dp[i-1] + cost[i-1],dp[i-2]+cost[i-2])
    if len(cost) < 2 {
        return 0
    }
    n := len(cost)
    dp := make([]int, len(cost)+1)
    dp[0] = 0
    dp[1] = 0
    for i := 2; i <= n;i++{
        dp[i] = min(dp[i-1]+cost[i-1], dp[i-2]+cost[i-2])
    }
    return dp[n]
}

func min(a,b int)int{
    if a > b{
        return b
    }
    return a
}
```

### 编辑距离
``` go
// https://leetcode.cn/problems/edit-distance/solutions/
// 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。

// 你可以对一个单词进行如下三种操作：

// 插入一个字符
// 删除一个字符
// 替换一个字符
// 编辑距离，确实是特别经典的题目
// 最主要是想明白这个动态规划的公式
func minDistance(word1 string, word2 string) int {
	m := len(word1)
	n := len(word2)
	//如果有一个字符串为空的话
	if m*n == 0 {
		return m + n
	}
	//用动态规划的方式解决
	//本质上变更只有三种 A插入1个字符，B插入一个字符，A改变一个字符
	//因为A插入一个字符，其实等价于B删除一个字符
	//定义二维数组
	dp := make([][]int, m+1)
	for i := 0; i <= m; i++ {
		dp[i] = make([]int, n+1)
		dp[i][0] = i
	}
	//初始化
	dp[0][0] = 0
	for j := 0; j <= n; j++ {
		dp[0][j] = j
	}
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			up := dp[i][j-1] + 1
			right := dp[i-1][j] + 1
			up_right := dp[i-1][j-1]
			if word1[i-1] != word2[j-1] {
				up_right = up_right + 1
			}
			dp[i][j] = min(min(up, right), up_right)
		}
	}

	return dp[m][n]
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
```


## 参考文档：
1. <https://zhuanlan.zhihu.com/p/93857890>
2. <https://zh.m.wikipedia.org/zh/%E8%83%8C%E5%8C%85%E9%97%AE%E9%A2%98>
3. <https://www.geeksforgeeks.org/solve-dynamic-programming-problem/?ref=lbp>
4. <https://zh.m.wikipedia.org/zh/%E5%88%86%E6%B2%BB%E6%B3%95> 
