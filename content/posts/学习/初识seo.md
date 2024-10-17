---
title: 初识seo
slug: the_first_take_of_seo
date: 2024-09-12T23:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
categories:
  - 学习
summary: 永远在路上
--- 

## seo的分类
- On-Page: 网站的内容
  1. Title Tags
  2. Headings (H1)
  3. Fast-loading pages, or page load speed
  4. Page content
  5. URL structure
- Off-page: 网站的权威性和流行性外部因素

---

## 有什么改善读者体验和 SEO 的写作技巧?
> - 扩展主题
> - 在文章头部包含关键词
> - 围绕主题和关键词展开内容
> - 语义化元素: HTML5 的语义化，意思是用正确的元素做正确的事
> - 改善链接的形式: 尽量为链接提供完整的标题、或者可被识别的提示

---

## keywords有必要吗?
Google 在[Google 不会将关键字元标记用于网页排名  |  Google 搜索中心博客  |  Google for Developers](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag?hl=zh-cn )一文中已经明确表示`meta[name=keywords]`不再影响排名和权重,但是这并不是说关键词不重要，恰恰相反，搜索引擎是在鼓励你将你的关键词融入你的文章中，因为它们已经会用语义分析寻找关键词了。

---

## 怎么添加可分享的卡片?
- [frostming/fxzhihu: 为知乎生成可分享的卡片及 Instant View](https://github.com/frostming/fxzhihu )
- [react-helmet-async - npm](https://www.npmjs.com/package/react-helmet-async )

---

## spa能做seo优化吗?
- 能，可将爬虫引入到事先用puppeteer为SPA Prerender的内容服务中
- 流程
  1. 识别请求是用户还是搜索引擎爬虫
  2. 如果是用户，那就正常处理
  3. 如果是爬虫，那就基于puppeteer渲染SPA内容
- 需要考虑的问题
  1. 缓存
     - 缓存多少
     - 缓存多久更新
  2. 冷启动（指的是在生成有效网页之后，请求页面）可以提前在B端产生有效的网址的时候，让Prerender服务提前缓存内容
- 较成熟的方案
  - [Prerender Seamlessly Renders JavaScript for Faster Indexing](https://prerender.io/ )

---

## 参考 
- [让你的AI工具从Google搜索中获得用户 | TL;DR](https://mazzzystar.github.io/2023/07/23/Get-users-for-your-AI-tool-from-Google-search-zh/)
- [如何写一篇同时面向人和搜索引擎的文章 | Sukka's Blog](https://blog.skk.moe/post/how-to-write-for-seo/ )
- [关于SPA的SEO解决方案. 为什么SPA需要SEO优化 | by shidong ke | Medium](https://medium.com/@keshidong.dev/%E5%85%B3%E4%BA%8Espa%E7%9A%84seo%E4%BC%98%E5%8C%96%E6%96%B9%E6%A1%88-2639a63361ad )