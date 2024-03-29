---
title: 博客搭建
date: 2023-03-13T12:50:17+08:00
lastmod: 2023-10-21T12:50:17+08:00
tags:
 - 记录
 - 折腾
 - 博客
categories:
 - 学习
summary: 记录博客搭建的过程,及途中遇到的问题和解决方式
---
## 过程
*记录博客搭建的过程*

1. 框架是选用的[Hexo](https://hexo.io/zh-cn/docs/),主题选用的是[Fluid](https://hexo.fluid-dev.com/docs),本地部署十分顺利，跟着教程来就行。
2. 调整配置的时候遇到了问题，我刚开始是直接使用`npm install --save hexo-theme-fluid`，但改配置的时候虽然有文档，但各项配置的位置不知道是怎么嵌套的，就选择了方式二。
3. 本地配置好之后，要部署到Github Pages上。[Hexo所提供的教程](https://hexo.io/zh-cn/docs/github-pages)中，所使用的是`Github Action` 内置的 token 变量`GITHUB_TOKEN`。根据[官方源文档的描述](https://docs.github.com/en/actions/security-guidesautomatic-token-authentication?query=PA#using-the-github_token-in-a-workflow),为了防止递归构建发生，使用`GITHUB_TOKEN`推送的代码不会再次触发任何action。而考虑到我希望后续能进一步触发和进一步了解`Github Action`,我选择自己设置key。
4. 这个花的时间最多。走了不少弯路，最终是参考了[使用 GitHub Actions 自动部署博客](https://vuepress-theme-reco.recoluan.com/views/other/github-actions.html)。
5. action已经跑成功了，但访问时却发现还是404，检查后发现是自己未[Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。
6. 添加谷歌验证：
    参考了[让Google搜索到搭建在Github Pages上的博客](https://jactorsue.github.io/blog/2018/04/how-blog-on-githubpages-can-be-searched-by-google.html)
    1. （前略）验证网站所有权时，选择使用HTML标记方式来验证。fluid主题的head路径为`\themes\fluid\layout\_partials\head.ejs`
7. 减少加载时间，尚未实操，先记录几篇看到的好文
   - [Hexo加速访问](https://www.voidking.com/dev-hexo-accelerate/)
   - [Hexo使用Gulp压缩静态资源](https://www.voidking.com/dev-hexo-gulp/)
8. 插入图片，这篇写得挺完整的：
   [在Hexo博客中插入图片的各种方式](https://fuhailin.github.io/Hexo-images/)
9. 添加最后修改时间:
   T将主题配置文件`_config.yml`中的`post:copyright:update_date:enable:`设置为`enable`即可+08:00

## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)

