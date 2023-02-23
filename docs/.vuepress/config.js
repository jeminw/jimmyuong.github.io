module.exports = {
    title: 'Jimmy Uong',
    description: 'Just playing around',
    themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Golang', link: '/golang/' },
          { text: 'External', link: 'https://google.com' },
        ],
        sidebar:'auto',
      //   sidebar: [
      //       {
      //   title: 'Group 1',   // 必要的
      //   path: '/foo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      //   collapsable: false, // 可选的, 默认值是 true,
      //   sidebarDepth: 1,    // 可选的, 默认值是 1
      //   children: [ '/' ]
      // },
      // {
      //   title: 'Group 2',
      //   children: [ /* ... */ ],
      //   initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      // }
      //   ],
        displayAllHeaders: true, // 默认值：false,
        activeHeaderLinks: true, // 默认值：false
      },
  }