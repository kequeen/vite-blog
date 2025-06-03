# 贪心算法
贪心算法与动态规划算法的不同在于，他对每个子问题的解决方案都做出选择，不能回退。  
动态规划会保存以前的计算结果，有回退功能.  
贪心的话，一般会在时间复杂度上更优于标准的动态规划，因为其不做回溯。  
我们也可以理解，贪心其实是动态规划的特殊情况。

## 标准流程
1. 创建数学模型来描述问题。
2. 把求解的问题分成若干个子问题。
3. 对每一子问题求解，得到子问题的局部最优解。
4. 把子问题的解局部最优解合成原来解问题的一个解。

## 常见算法
### 乘最多水的容器
``` go
//https://leetcode.cn/problems/container-with-most-water/description/
func maxArea(height []int) int {
	area := 0
	left := 0
	right := len(height) - 1
	for left < right {
		currentArae := min(height[left], height[right]) * (right - left)
		if currentArae > area {
			area = currentArae
		}
		//判断指针向左还是向右移动
		if height[left] < height[right] {
			left++
		} else {
			right--
		}
	}
	return area
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
```

### 跳跃游戏
``` go
//https://leetcode.cn/problems/jump-game/description/
func canJump(nums []int) bool {
    maxJump := 0
    numsLen := len(nums)
    for i := 0; i < numsLen; i++ {
        if i <= maxJump {
            maxJump = max(maxJump, i + nums[i])
            if maxJump >= numsLen-1 {
                return true
            }
        }
    }
    
    return false
}

func max(a, b int) int{
    if a > b {
        return a
    }
    return b
}
```

### 渡河问题
``` go

//有一条河流长度为N，其中某些位置上有可以停留的石子格，假设人上一次跨过的距离为X，则当次可以选择的步长为X-1，X，X+1，第一次人的步长默认为1
//给你一个格子的列表，第一个数默认为0，最后一个数代表对岸的种点，判断能否过河

func canCrossRiver(arr []int) bool {
	if len(arr) == 0 || len(arr) == 1 {
		return true
	}
	//采用贪心算法，每一步，都应该去走它所能到达的下一步的最大值。当前位置 -> 下一步可能的最大值之间，如果有其他的步数，都可以忽略

	//记录当前位置
	current := arr[0]
	//记录当前最大步数
	maxStep := 1
	//记录上次的值
	lastValue := 0
	//判断是否结束
	end := true
	for i := 1; i < len(arr); {
		end = true
		//如果下一步不满足条件
		if arr[i]-current > maxStep+1 {
			return false
		}
		//小于的maxStep - 1 的话，直接往前走
		if arr[i]-current < maxStep-1 {
			i++
			end = false
		}

		//判断是否需要更新current 和 maxStep
		for i < len(arr) && arr[i]-current <= maxStep+1 {
			lastValue = arr[i]
			i++
		}
		maxStep = lastValue - current
		current = lastValue
	}
	return end
}
```

## 参考链接
1. <https://zh.wikipedia.org/wiki/%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95>
2. <https://zh.wikipedia.org/wiki/%E6%9C%80%E5%B0%8F%E7%94%9F%E6%88%90%E6%A0%91>