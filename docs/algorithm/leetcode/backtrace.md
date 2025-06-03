# 回溯法
平时工作中感觉回溯法相关的思想倒是用的不多，但是在leetcode中，其实回溯相关的还是用的挺多的，尤其是那种要获取所有分类的题目，基本都是采用回溯法去解决的。
回溯其实很多时候会依赖于深度优先搜索，并且需要自己在代码中处理各种分支情况.

最典型的就是八皇后问题

## 相关伪代码
一般流程的伪代码
```
procedure backtrack(P, c) is
    if reject(P, c) then return
    if accept(P, c) then output(P, c)
    s ← first(P, c)
    while s ≠ NULL do
        backtrack(P, s)
        s ← next(P, s)
```


## 时空复杂度
最坏情况下，回溯法的时间复杂度为指数级

## 常见的一些面试题
### 括号生成
``` go
//https://leetcode.cn/problems/generate-parentheses/description/%3Ffavorite=2cktkvj
func generateParenthesis(n int) []string {
	var s string
	ans := make([]string, 0)
	var backtrace func(string, int, int, int)
	backtrace = func(s string, open int, close int, n int) {
		if len(s) == n*2 {
			ans = append(ans, s)
			return
		}
		if open < n {
			s = s + "("
			backtrace(s, open+1, close, n)
			s = s[:len(s)-1]
		}
		if open > close {
			s = s + ")"
			backtrace(s, open, close+1, n)
		}
	}

	backtrace(s, 0, 0, n)
	return ans
}
```


### 八皇后问题
``` go
// https://leetcode.cn/problems/eight-queens-lcci/description/
// ```
// 设计一种算法，打印 N 皇后在 N × N 棋盘上的各种摆法，其中每个皇后都不同行、不同列，也不在对角线上。这里的“对角线”指的是所有的对角线，不只是平分整个棋盘的那两条对角线。

// 注意：本题相对原题做了扩展

// 示例:

//  输入：4
//  输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
//  解释: 4 皇后问题存在如下两个不同的解法。
// [
//  [".Q..",  // 解法 1
//   "...Q",
//   "Q...",
//   "..Q."],

//	["..Q.",  // 解法 2
//	 "Q...",
//	 "...Q",
//	 ".Q.."]
//
// ]
// ```
func solveNQueens(n int) [][]string {
	var ans [][]string
	//棋盘的初始化
	board := make([][]byte, n)
	for i := 0; i < n; i++ {
		row := make([]byte, n)
		for j := 0; j < n; j++ {
			row[j] = '.'
		}
		board[i] = row
	}

	//我们有几个内容需要全局记录,1、每一列是否被使用过；2、主对角线；3、副对角线
	//这里用了一种比较取巧的方式去判断这个对角线是否有数据，
	//同一个对角线上 i+j 的值是相等的
	colUsed := make([]bool, n)
	dig1Used := make([]bool, 2*n)
	dig2Used := make([]bool, 2*n)
	backtrace(0, n, colUsed, dig1Used, dig2Used, board, &ans)
	return ans
}

func backtrace(row int, n int, colUsed []bool, dig1Used []bool, dig2Used []bool, board [][]byte, ans *[][]string) {
	if row == n {
		//最终的结果
		var solution []string
		for _, v := range board {
			solution = append(solution, string(v))
		}
		*ans = append(*ans, solution)
		return
	}

	//判断是否可以放下
	for col := 0; col < n; col++ {
		if !colUsed[col] && !dig1Used[row+col] && !dig2Used[row-col+n-1] {
			board[row][col] = 'Q'
			colUsed[col] = true
			dig1Used[row+col] = true
			dig2Used[row-col+n-1] = true
			backtrace(row+1, n, colUsed, dig1Used, dig2Used, board, ans)
			//复原
			board[row][col] = '.'
			colUsed[col] = false
			dig1Used[row+col] = false
			dig2Used[row-col+n-1] = false
		}
	}
}
```

## 参考链接
1. <https://en.wikipedia.org/wiki/Backtracking>
2. <https://leetcode.cn/problems/combination-sum/solutions/406516/zu-he-zong-he-by-leetcode-solution/>