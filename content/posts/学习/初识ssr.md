---
title: 初识ssr
slug: the_first_take_of_ssr
date: 2024-10-02T23:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
categories:
  - 学习
summary: "你有多爱它，就有多恨它"
--- 

## ssr和ssg的区别
### SSR（Server-Side Rendering）
- **运行时生成页面**：在用户请求页面时，服务器会动态地生成 HTML 文件并将其发送给客户端。内容在每次请求时**都会**在服务器端生成，因此适合需要频繁更新数据的页面。
- 过程:
  1. 用户请求页面
  2. 服务器端渲染：
     - 服务器会从数据库或 API 获取需要的数据。
     - 使用 JavaScript 运行框架（如 React、Vue）的组件，在服务器端生成 HTML 页面，并将获取的数据填充到模板中。
  3. 返回 HTML 页面：服务器将渲染完成的 HTML 页面发送回客户端。页面加载后，用户可以立即看到内容，而无需等待所有 JavaScript 加载完成。
  4. 客户端水合（Hydration）：
     - 在客户端，浏览器会下载并执行页面相关的 JavaScript。
     - 前端框架接管页面，将其转变为可交互的应用，类似单页应用（SPA）的行为。
  5. 进一步交互：当用户进行进一步的操作（如点击、导航等），客户端代码可以通过 API 进行数据请求和局部更新，而无需刷新整个页面。

### SSG（Static Site Generation）
- **构建时生成页面**：在**构建阶段**提前生成静态 HTML 文件，并将这些文件直接部署在 CDN 或服务器上，所有用户访问时都获取相同的静态页面。
- **优点**：
  - **性能极佳**：静态文件可以通过 CDN 高效分发，用户的页面加载速度非常快。
  - **稳定性高**：不需要实时依赖服务器，即使服务器出现问题，静态页面依然可以访问。
  - **SEO 友好**：和 SSR 类似，静态 HTML 可以被搜索引擎很好地索引。
- **缺点**：
  - **实时性差**：由于内容在构建时生成，页面的数据更新不及时，适合更新频率较低的内容（如博客、文档等）。
  - **构建时间长**：对于大型网站，构建所有静态页面可能需要较长的时间。

---

## 优势
1. SEO和SMO(Social Media Optimization)
2. First meaningful paint(首屏渲染)
3. Graceful degradation（支持不支持或没有开启javascript功能浏览器）
4. 实时性强：适合频繁更新内容的应用（如社交媒体、新闻网站等），因为每次请求都会生成最新的数据。

---

## 劣势
- 额外的开发和维护成本，需要额外考虑以下几点
  1. 有没有全局mutable data，可能导致内存泄露
  2. 有没有在SSR可能执行的代码中使用server没有而client端存在的api
  3. 第三方库是否需要在server端重新配置
- 服务端的开发
- 更多的服务端负载

---

## 为什么会难开发
- 执行环境不同
  - BOM(window…), DOM(document…), Ajax(XMLHttp​Request, fetch…), Web Workers…等属于浏览器环境的对象在node server环境下并不work
- “执行上下文”不同

---

## 做了ssr，但首屏渲染时间还是很长
1. 有没有做Time to the First Byte，如果渲染该页面依赖后端耗时的计算和请求时间，那么可以考虑使用Streaming Server-Side Rendering
2. 有没有阻塞性请求、有没有重定向请求
3. 服务有没有靠近用户，由于SSR需要动态服务，不能CDN部署，可能在一些国家或地区的政策影响下，服务只能部署在A地，但用户却在B地

---

## 优化方案
1. Streaming SSR（流式渲染）：
   - 通过流式传输内容来加速首屏渲染，服务器生成的 HTML 可以一部分一部分地传输给客户端，缩短等待时间。
   - React 18 中引入了 Suspense 和 React.lazy() 支持流式渲染。
2. Partial Hydration（部分水合）：
   - 不是一次性水合整个页面，而是逐步水合页面上的不同组件，减少初始 JavaScript 体积，加快交互速度。
3. 预渲染与动态渲染结合：
   - 可以为某些页面提前生成静态 HTML 文件（SSG），而为需要实时数据的页面使用 SSR。

---

## 参考
- [Vite SSR 项目 Docker 镜像最小化打包方案 | 面条实验室](https://chi.miantiao.me/posts/vite-ssr-docker-image-minimal-build/ )
- [关于SPA的SEO解决方案. 为什么SPA需要SEO优化 | by shidong ke | Medium](https://medium.com/@keshidong.dev/%E5%85%B3%E4%BA%8Espa%E7%9A%84seo%E4%BC%98%E5%8C%96%E6%96%B9%E6%A1%88-2639a63361ad )