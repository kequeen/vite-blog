# 对go的一些意见
1. 关于多维数组的初始化不优雅
目前关于多维数组的初始化比较丑陋
```go
	arr := make([][]int, 5)
	fmt.Println(arr)
	for i := 0; i < 5; i++ {
		arr[i] = make([]int, 5)
	}
	fmt.Println(arr)

	//output
	[[] [] [] [] []]
	[[0 0 0 0 0] [0 0 0 0 0] [0 0 0 0 0] [0 0 0 0 0] [0 0 0 0 0]]

```

2. 关于string类型的遍历
```go
	//关于字符串的遍历问题
	str := "al"
	strLen := len(str)
	fmt.Println(strLen)
	for i := 0; i < strLen; i++ {
		fmt.Println(str[i])
	}
	for _, item := range str {
		fmt.Println(item)
	}

	//输出
	2
	97
	108
	97
	108

```