---
title: React网页定制title
slug: add specific title to react web app
date: 2024-09-02T00:20:14+08:00
tags:
  - 笔记
  - 前端
  - web
  - React
categories:
  - 学习
summary: 变变变
--- 

## 需求 
一个使用react+react-router-dom的网页，希望不同的页面能有不同的title

## 方法一 : useEffect + document.title
- 主要思路: 监听url的变化，然后设置document.title,不同的写法差异主要在如何监听

### 写法一：useLocation()
- 简易的写法可以看[Stack Overflow的这个回答](https://stackoverflow.com/a/65709116)
- 更进一步的写法可以看[react-router-dom v6 路由实现动态修改document.title项目中需要在对应的路由界面 设置不同 - 掘金](https://juejin.cn/post/7267409589079867450 )

### 写法二：useMatches()
- 参考[steinybot在Stack Overflow的这个回答](https://stackoverflow.com/a/78184012)
```javascript
  const matches = useMatches()
  const { handle, data } = matches[matches.length - 1]
  const title = handle && handle.title(data)
  
  useEffect(() => {
    if (title) {
      document.title = title
    }
  }, [title])
```
- [useMatches v6.26.1 | React Router](https://reactrouter.com/en/main/hooks/use-matches )

## 方法二
- 使用[react-helmet-async - npm](https://www.npmjs.com/package/react-helmet-async )
- 好处
  1. 代码修改小，只要在需要的地方加上就行
  2. 顺便能把seo也做了
  3. 还能支持Open Graph protocol等协议
- 报错：`TypeError: Cannot read properties of undefined (reading 'add')`
  - 问题其实出在我没加`<HelmetProvider>`,但这个报错太不友好了,有个建议优化报错信息的issue，[`TypeError: Cannot read properties of undefined (reading 'add')` thrown when provider is missing · Issue #228 · staylor/react-helmet-async](https://github.com/staylor/react-helmet-async/issues/228 )，不过没被处理。 
- 参考 
  - [How to Use React Helmet – With Example Use Case](https://www.freecodecamp.org/news/react-helmet-examples/ ) 

## 补充 
### Open Graph protocol 
[The Open Graph protocol](https://ogp.me/ )

### Twitter Cards
[Getting started with Cards | Docs | Twitter Developer Platform](https://developer.x.com/en/docs/x-for-websites/cards/guides/getting-started )

### 生成
[frostming/fxzhihu: 为知乎生成可分享的卡片及 Instant View](https://github.com/frostming/fxzhihu/tree/main )