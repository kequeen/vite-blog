import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Blog",
  description: "thinking",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/README' },
      { text: '关于我', link: '/nav/about_me' }
    ],
    sidebar: [
      {
        text: '为什么写博客',
        link: '/guide/guide.md',
      },
      {
        text: '软技能',
        link: '/soft/README',
      },
      {
        text: '算法',
        link: '/algorithm/README',
        items: [
          {
            text: '数据结构',
            link: '/algorithm/data_structure.md',
            items: [],
          },
          {
            text: '关于排序',
            link: '/algorithm/sort.md',
            items: [],
          },
          {
            text: 'leetcode',
            link: '/algorithm/leetcode/README',
            items: [
              {
                text: '动态规划',
                link: '/algorithm/leetcode/dp.md',
                items: [],
              },
              {
                text: '链表',
                link: '/algorithm/leetcode/linked_list.md',
                items: [],
              },
              {
                text: '树',
                link: '/algorithm/leetcode/tree.md',
                items: [],
              },
              {
                text: '矩阵',
                link: '/algorithm/leetcode/matrix.md',
                items: [],
              },
              {
                text: '回溯法',
                link: '/algorithm/leetcode/backtrace.md',
                items: [],
              },
              {
                text: '图论',
                link: '/algorithm/leetcode/graph.md',
                items: [],
              },
              {
                text: '贪心',
                link: '/algorithm/leetcode/greedy.md',
                items: [],
              },
              {
                text: 'lru',
                link: '/algorithm/leetcode/lru.md',
                items: [],
              },
              {
                text: '滑动窗口',
                link: '/algorithm/leetcode/sliding_window.md',
                items: [],
              },
            ],
          },
        ],
      },
      {
        text: '编程语言',
        link: '/language/README',
        items: [
          // Sidebaritems
          {
            text: '关于go',
            link: '/language/go/README',
            items: [
                {
                    text : '常见问题',
                    link : '/language/go/interview.md',
                },
                {
                    text : '并发',
                    link : '/language/go/concurrency.md',
                },
                {
                    text : '调度器',
                    link : '/language/go/scheduler.md',
                },
                {
                    text : '对golang的一些意见',
                    link : '/language/go/complaint.md',
                },

            ],
          },
          {
            text: '关于java',
            link: '/language/java/README',
          },
          {
            text: '关于php',
            link: '/language/php/README',
          },
        ],
      },
      {
        text: '关于搜索引擎',
        link: '/search/README',
        items: [
          // Sidebaritems
          {
            text: '基本原理',
            link: '/search/principle.md',
          },
          {
            text: '关于ES',
            link: '/search/es/README',
          },
        ],
      },
      {
        text: '关于网络协议',
        link: '/protocal/README',
        items: [
          // Sidebaritems
          {
            text: 'rpc',
            link: '/protocal/rpc.md',
          },
          {
            text: 'http',
            link: '/protocal/http.md',
          },
        ],
      },
      {
        text: '存储',
        link: '/storage/README',
        items: [
          // Sidebaritems
          {
            text: 'mysql',
            link: '/storage/mysql.md',
          },
          {
            text: 'nosql',
            link: '/storage/nosql.md',
          },
          {
            text: 'redis',
            link: '/storage/redis.md',
          },
          {
            text: 'mongodb',
            link: '/storage/mongodb.md',
          },
        ],
      },
      {
        text: '云原生',
        link: '/cloud_native/README',
        items: [
          {
            text: 'k8s',
            link: '/cloud_native/k8s.md',
          },
        ],
      },
      {
        text: '系统设计',
        link: '/system_design/README',
        items: [
          {
            text: '消息队列',
            link: '/system_design/mq.md',
          },
        ],
      },
      {
        text: '关于前端',
        link: '/front_end/README',
        items: [
          {
            text: 'react',
            link: '/front_end/react.md',
          },
        ],
      },
      {
        text: '关于其它',
        link: '/other/README',
        items: [
          {
            text: '区块链',
            link: '/other/block_train/README',
          },
        ],
      },
      {
        text: '关于书',
        link: '/book/README',
        items: [
          // Sidebaritems
          {
            text: '计算之魂',
            link: '/book/the_essence_of_computing.md',
          },
          {
            text: 'ddia',
            link: '/book/ddia.md',
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
