# 矩阵
关于矩阵的题目，也是leetcode上的高频题目之一。我觉得对于我而言，考察点主要有两个：
1. 用二维数组对矩阵的抽象
2. 对于各种边界问题的考虑

## 常见题目
其实我觉得矩阵相关的题目，大体的思路大家都是容易想明白的，但这种边界的条件，还是需要不断的练习去加强。基本上其实都会有上下左右四个方向，我们怎么去构造这个调整的公式。

### 螺旋打印矩阵
[原题链接](https://leetcode.cn/problems/spiral-matrix/solutions/)
``` go
//打印矩阵
//我觉得按照层去打印会更容易理解一些
func spiralOrderV2(matrix [][]int) []int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return []int{}
	}
	var (
		row, column              = len(matrix), len(matrix[0])
		order                    = make([]int, row*column)
		left, right, top, bottom = 0, column - 1, 0, row - 1
		index                    = 0
	)
	for left <= right && top <= bottom {
		//从左到右
		for column = left; column <= right; column++ {
			order[index] = matrix[top][column]
			index++
		}
		//从上到下
		for row = top + 1; row <= bottom; row++ {
			order[index] = matrix[row][right]
			index++
		}
		//判断是否还需要遍历
		if left < right && top < bottom {
			//向左遍历
			for column = right - 1; column > left; column-- {
				order[index] = matrix[bottom][column]
				index++
			}
			//向上遍历
			for row = row - 1; row > top; row-- {
				order[index] = matrix[row][left]
				index++
			}
		}
		//最终调整上下左右
		left++
		right--
		top++
		bottom--
	}
	return order
}
```