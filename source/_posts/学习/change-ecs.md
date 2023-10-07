---
title: 服务器迁移记
tags:
  - 折腾
  - 播客
categories:
  - 学习
date: 2023-10-07 19:32:21
excerpt: 虽然早就知道是这样。但是这次还是第一次这么切身地体验到。很感慨。
---
## 起因
我之前使用的是阿里云的ecs。因为要到期了，而续费又过于昂贵。（2核2g一年要六百多。）

对比了下几家云服务器提供商，发现华为云价格最为理想（2核2g3M带宽一年89）。

## 迁移过程
我其实并没有用服务器来做多少事情。主要就两个：telegram bot和ttrss。它们都是使用docker进行部署的，所以能省不少事。

1. docker安装
没想到第一步安装docker就花了一晚上。3m的带宽，下载时只有可怜的十几kb。等到最后还下不了。

最后我是自己手动下载软件包，再安装的。

```
# “package.deb”为下载的软件包
sudo dpkg -i /path/to/package.deb
```

我其实应该一开始就去配置镜像源的...

2. 设置网络
[network - EuDs's blog](https://ds63.eu.org/2023/03/11/network/)

3. Faye_Bot
[EuDs63/Faye_Bot: my telegram Bot](https://github.com/EuDs63/Faye_Bot)

4. ttrss
- [RSS折腾记 - EuDs's blog](https://ds63.eu.org/2023/03/08/RssTossing/)
- [🐋 Awesome TTRSS ](https://ttrss.henry.wang/zh/#%E5%85%B3%E4%BA%8E)

## 尾巴
本来没打算再买一个服务器的。因为vscode+WSL2其实已经满足我绝大部分的linux使用需求了。但想着说不定呢？以后哪天就有需求了。而那时候再重新搭环境，没了现有的作参考，怕是要发更多的时间，于是还是买了。

还是要想办法用起来。

## 尾巴的尾巴
没想到这么快就又有了一个服务器。今天（隔天）逛博客看到Azure学生包注册教程。想着之前也有试着搞过，但不知道为什么没成功。今天抱着试一试的想法，就又点进去。没想到直接就成了。

于是参考[github 学生包和 azure 羊毛](https://zbttl-github-io.vercel.app/github-xue-sheng-bao-he-azure-yang-mao/)，申请了台linux虚拟机。还是用的ubuntu的镜像。

结果十分地流畅。安装docker不到三分钟，也不需要额外配置什么代理。昨天没成功的[yihong0618/tg_bing_dalle: tg bing dalle-3](https://github.com/yihong0618/tg_bing_dalle)也成了。

虽然早就知道是这样。但是这次还是第一次这么切身地体验到。很感慨。

## 参考链接
- [github 学生包和 azure 羊毛](https://zbttl-github-io.vercel.app/github-xue-sheng-bao-he-azure-yang-mao/)
- [yihong0618/tg_bing_dalle: tg bing dalle-3](https://github.com/yihong0618/tg_bing_dalle)
- [🐋 Awesome TTRSS ](https://ttrss.henry.wang/zh/#%E5%85%B3%E4%BA%8E)