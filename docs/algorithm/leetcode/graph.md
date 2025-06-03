# 关于图论
>图是图论的主要研究对象。图是由若干给定的顶点及连接两顶点的边所构成的图形，这种图形通常用来描述某些事物之间的某种特定关系。顶点用于代表事物，连接两顶点的边则用于表示两个事物间具有这种关系。


图论比较核心的一个问题是，我们是用邻接链表，还是邻接矩阵去存储相关的数据。
对于那种边比较多的图，采用邻接矩阵更为合适
对于那种边比较少的图，采用邻接链表更为合适


## 拓扑排序
图论中比较经典的题目就是拓扑排序了
``` go
//https://leetcode.cn/problems/course-schedule/description/
//课程表
//标准的拓扑排序

func canFinish(numCourses int, prerequisites [][]int) bool {
	//采用dfs的方式
	valid := true
	//存储每个节点是否访问过，0表示没有访问过，1表示访问过，2表示已经访问过
	visited := make([]int, numCourses)
	//采用邻接链表的方式存储
	edges := make([][]int, numCourses)
	var dfs func(u int)
	dfs = func(u int) {
		visited[u] = 1
		for _, v := range edges[u] {
			if visited[v] == 0 {
				dfs(v)
				if !valid {
					return
				}
			} else if visited[v] == 1 {
				valid = false
				return
			}
		}
		visited[u] = 2
	}
	//构造邻接链表
	for _, v := range prerequisites {
		edges[v[1]] = append(edges[v[1]], v[0])
	}
	for i := 0; i < numCourses && valid; i++ {
		if visited[i] == 0 {
			dfs(i)
		}
	}
	return valid
}
```

## 岛屿遍历
https://leetcode.cn/problems/number-of-islands/
给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
此外，你可以假设该网格的四条边均被水包围。

``` go
func numIslands(grid [][]byte) int {
	if grid == nil {
		return 0
	}
	nums := 0
	//开始遍历，每次都是BFS遍历
	row := len(grid)
	column := len(grid[0])
	var dfs func(i int, j int)
	dfs = func(i, j int) {
		if grid[i][j] == '0' {
			//如果已经是水，则结束
			return
		}
		grid[i][j] = '0'
		//遍历上下左右
		if i-1 >= 0 && grid[i-1][j] == '1' {
			dfs(i-1, j)
		}
		if i+1 < row && grid[i+1][j] == '1' {
			dfs(i+1, j)
		}
		if j-1 >= 0 && grid[i][j-1] == '1' {
			dfs(i, j-1)
		}
		if j+1 < column && grid[i][j+1] == '1' {
			dfs(i, j+1)
		}
	}

	for i := 0; i < row; i++ {
		for j := 0; j < column; j++ {
			if grid[i][j] == '1' {
				nums++
				dfs(i, j)
			}
		}
	}
	return nums
}
```

## 小镇法官
``` go
//https://leetcode.cn/problems/find-the-town-judge/description/
//找到小镇的法官

func findJudge(n int, trust [][]int) int {
	//其实只需要考虑入度和出度，不需要考虑邻接链表或者矩阵的存储
	//最终满足条件的应该是入度为N-1，出度为0
	indegree := make(map[int]int)
	outdegree := make(map[int]int)
	for _, item := range trust {
		indegree[item[1]]++
		outdegree[item[0]]++
	}
	for i := 1; i <= n; i++ {
		if indegree[i] == n-1 && outdegree[i] == 0 {
			return i
		}
	}
	return -1
}

```


## 参考文档
1. <https://zh.m.wikipedia.org/zh/%E5%9B%BE%E8%AE%BA>
2. <https://zh.wikipedia.org/wiki/%E6%8B%93%E6%92%B2%E6%8E%92%E5%BA%8F>
3. <https://zhuanlan.zhihu.com/p/25498681>