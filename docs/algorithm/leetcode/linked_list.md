# 链表
链表其实是日常工作中与面试都常会接触的数据结构，因为数组是固定大小，扩容成本较高，而链表的扩容成本较低，所以链表在很多场景下使用也比较广泛
## 常见考察问题

### 链表反转
关于链表反转，其实就是增加一个临时节点存储存储下当前节点的信息。
``` go
func reverseList(head *ListNode) *ListNode {
    //最最经典的反转链表
    var prev *ListNode
    cur := head
    for cur != nil {
        temp := cur.Next
        cur.Next = prev
        prev = cur
        cur = temp
    } 
    return prev
}
```

### 合并链表
如果只是关于两个链表的合并，其实比较简单。一般可能会考察更为复杂的情况，比如K个链表的合并
``` go
func mergeTwoLists(list1 *ListNode, list2 *ListNode) *ListNode {
	h := &ListNode{}
	l := h
	for list1 != nil && list2 != nil {
		if list1.Val < list2.Val {
			l.Next = &ListNode{Val: list1.Val}
			list1 = list1.Next
		} else {
			l.Next = &ListNode{Val: list2.Val}
			list2 = list2.Next
		}
		l = l.Next
	}
	if list1 != nil {
		l.Next = list1
	}

	if list2 != nil {
		l.Next = list2
	}
	return h.Next
}
```

### 链表排序
可以采用归并排序的方式
``` go
type ListNode struct {
	Val  int
	Next *ListNode
}

//https://leetcode.cn/leetbook/read/top-interview-questions/xa262d/
//链表排序
// 用快慢指针寻找中间节点，然后再去merge两个链表的数据
func sortList(head *ListNode) *ListNode {
	//最合适的方式是使用归并排序,其实这道题目还是考察挺全面的，考察了如何找到链表的中间节点，以归并排序
	return sort(head, nil)
}

//标准的归并排序
func sort(head *ListNode, tail *ListNode) *ListNode {
	if head == nil {
		return head
	}
	//如果只剩一个节点
	if head.Next == tail {
		head.Next = nil
		return head
	}

	//快慢指针寻找中间点
	slow, fast := head, head
	for fast != tail {
		slow = slow.Next
		fast = fast.Next
		if fast != tail {
			fast = fast.Next
		}
	}
	mid := slow
	return merge(sort(head, mid), sort(mid, tail))
}

//merge链表
//因为传进来的是指针，不能改变原来链表中的数据
func merge(list1 *ListNode, list2 *ListNode) *ListNode {
	resListNode := &ListNode{}
	temp, temp1, temp2 := resListNode, list1, list2
	for temp1 != nil && temp2 != nil {
		if temp1.Val < temp2.Val {
			temp.Next = temp1
			temp1 = temp1.Next
		} else {
			temp.Next = temp2
			temp2 = temp2.Next
		}
		temp = temp.Next
	}
	if temp1 == nil {
		temp.Next = temp2
	} else if temp2 == nil {
		temp.Next = temp1
	}
	return resListNode.Next
}
```


### 复制链表
关于单纯的复制链表比较简单，就是遍历链表，然后不停地新建节点，按这个顺序去建立并串联起来，所以一般也不会考察这种最简单的情况，而是会做一些变种，比如 [复制带随机指针的链表](https://leetcode.cn/leetbook/read/top-interview-questions/xam1wr/)
``` go
var nodeMap map[*Node]*Node

func copyRandomList(head *Node) *Node {
	nodeMap = map[*Node]*Node{}
	return deepCopy(head)
}

func deepCopy(node *Node) *Node {
	if node == nil {
		return nil
	}

	//如果已经创建过，那就返回
	n, ok := nodeMap[node]
	if ok {
		return n
	}

	//否则就进行节点的创建
	newNode := &Node{
		Val: node.Val,
	}
	nodeMap[node] = newNode
	//将问题不断递归
	newNode.Next = deepCopy(node.Next)
	newNode.Random = deepCopy(node.Random)
	return newNode
}

```


### 两个链表相交
这道题目其实很巧妙，<https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/solutions/>
其实一般就分为2种情况
1. 不相交
A、B互换之后，大家的遍历都是 len(A) + len(B) == len(B) + len(A)，最终遍历完一遍之后也会终止
2. 相交
那大家就会在第二次遍历的时候相遇
``` go
func getIntersectionNode(headA, headB *ListNode) *ListNode {

	if headA == nil || headB == nil {
		return nil
	}

	pa := headA
	pb := headB
	for pa != pb {
		if pa != nil {
			pa = pa.Next
		} else {
			pa = headB
		}

		if pb != nil {
			pb = pb.Next
		} else {
			pb = headA
		}
	}
	return pa
}

```
这种其实就是最典型的双指针的问题，一般涉及两个点之前的比较或者计算，常用就是双指针

### 奇偶链表
``` go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func oddEvenList(head *ListNode) *ListNode {
    if head == nil || head.Next == nil{
        return head
    }
    slow := head
    quick := head.Next
    headQuick := head.Next
    for quick != nil && quick.Next != nil{
        slow.Next = slow.Next.Next
        quick.Next = quick.Next.Next
        slow = slow.Next
        quick = quick.Next
    }
    //遍历结束之后
    slow.Next = headQuick
    return head
    
}
```

### 删除链表中的节点
这个题目有两种形式的变种
1. 给定删除的节点,[题目链接](https://leetcode.cn/leetbook/read/top-interview-questions/xadve1/)
``` go
func deleteNode(node *ListNode) {
	if node.Next == nil {
		node = nil
	}
	node.Val = node.Next.Val
	node.Next = node.Next.Next
}
```

2. 给定头结点，以及要删除的节点的值。这个就需要用到双指针去进行处理
[题目链接](https://leetcode.cn/problems/shan-chu-lian-biao-de-jie-dian-lcof/)
``` go
func deleteNode(head *ListNode, val int) *ListNode {
	if head.Val == val {
		return head.Next
	}
	prev := head
	cur := head.Next
	for cur != nil && cur.Val != val {
		prev = cur
		cur = cur.Next
	}
	//就算是最后一位也不例外
	if cur != nil {
		prev.Next = cur.Next
	}
	return head
}

```

还有一种比较妙的解法,增加了一个头结点，然后就把所有的问题都归一化了
``` go
func deleteNode(head *ListNode, val int) *ListNode {
	newHead := &ListNode{
		Val:  0,
		Next: head,
	}
	for p := newHead; p.Next != nil; p = p.Next {
		if p.Next.Val == val {
			//删除节点
			p.Next = p.Next.Next
			break
		}
	}
	return newHead.Next
}

```


## 总结
其实关于链表的题目，都可以多往双指针方面去思考，很多难题说不定就迎刃而解了。

### 一些技巧

#### 增加头结点
在链表题目中，经常会添加一个额外的头结点，这是为了简化链表的操作和处理。以下是一些常见的原因：

方便处理空链表：在链表操作中，处理空链表和非空链表通常需要进行不同的逻辑判断。为了避免在每个操作中都进行额外的判断，可以添加一个虚拟的头结点作为链表的起始点。这样，即使链表为空，也有一个头结点作为起点，可以避免在每个操作中处理空链表的情况。

统一操作逻辑：添加一个头结点后，链表中的所有节点都有了一个共同的结构，包括头结点和普通节点。这样可以使得操作逻辑更加统一，不需要对头结点和普通节点进行分别处理，简化了代码的编写和理解。

方便插入和删除操作：添加头结点后，可以避免在链表的开头进行特殊处理。插入和删除节点时，可以将新节点插入到头结点之后，或者将要删除的节点直接跳过。这样可以简化插入和删除操作的逻辑。

需要注意的是，添加头结点并不是所有链表问题都需要的，具体是否使用头结点取决于具体的问题和算法的要求。在解决链表问题时，根据实际情况选择是否添加头结点以及如何处理链表操作，是根据问题的特点和解决方案的需要进行判断和决策的。


