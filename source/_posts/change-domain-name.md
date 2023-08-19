---
title: 换域名喽
tags:
  - 折腾
  - 博客
categories:
  - 学习
date: 2023-08-17 23:50:11
excerpt: 更换域名为ds63.eu.org
---
## 缘起
我博客有相当一段时间，一直是使用默认的域名。而且我其实并不太想去修改，原因是我博客使用的是Github Page。我想信：背靠着微软，GitHub所提供的这项服务的可靠性会比我私人所申请的域名要可靠得多。而我一直秉持着这样一个观点：一个博客的死亡并不是其不再更新，而是无法访问。也就是说，我认为博客的持续性是要优先于其他很多方面的。

但今天意外发现邮箱里有封邮件，通知我说申请的域名通过了。十分惊喜，因为我已经忘了这件事了。既然手头上有一个域名，上学期也学了相关的知识，干脆就试一试，在此次梳理下相应的步骤。

## 步骤
1. 申请/购买域名
   
   我使用的是[EU.org](https://nic.eu.org/)。好处是免费，但所需时间很长。我在5月27日申请的，直到昨天（8月16日）才通过。
2. 选择域名解析服务商
   
   我选择的是[hostry](https://hostry.com/),原因是免费。
  
3. Navigate to your DNS provider and create either an ALIAS, ANAME, or A record.

   以下是我设置中的一部分：
   | SUBDOMAIN | TYPE | VALUE | TTL, SEC |
   |-|-|-|-|  
   | @ | A | 185.199.108.153 | 86400 |
   | @ | AAAA | 2606:50c0:8000::153 | 86400 |
   | www | CNAME | euds63.github.io | 86400 |

  在Claude的帮助下，我知道：
  - A记录(Address Record):将域名直接映射到一个IPv4地址。它是最基本的域名记录类型。GitHub提供了4个IP地址,而不是一个IP,主要出于负载均衡和容错的考虑
  - AAAA记录(Quad-A record):用于将域名映射到IPv6地址。   
  - CNAME记录(Canonical Name Record):将域名映射到另一个域名,实现域名别名的作用

  值得注意的是`www CNAME euds63.github.io 86400`，我看到其他的教程有的是将SUBDOMAIN设置为`@`,但我的情况下会报错`Existing record 'SOA' conflicts with the code you are trying to create Cname should not have the same name as other records`

4. Github配置
   - Under "Custom domain", type your custom domain, then click Save.
   - 勾选Enforce HTTPS

  **这里Github帮我们简化了许多操作。但如果不是用的Github Page，要怎么做呢？**

## 验证
```bash
$ ping ds63.eu.org
正在 Ping ds63.eu.org [185.199.108.153] 具有 32 字节的数据:
来自 185.199.108.153 的回复: 字节=32 时间=77ms TTL=54
来自 185.199.108.153 的回复: 字节=32 时间=103ms TTL=54
来自 185.199.108.153 的回复: 字节=32 时间=76ms TTL=54
来自 185.199.108.153 的回复: 字节=32 时间=77ms TTL=54

185.199.108.153 的 Ping 统计信息:
    数据包: 已发送 = 4，已接收 = 4，丢失 = 0 (0% 丢失)，
往返行程的估计时间(以毫秒为单位):
    最短 = 76ms，最长 = 103ms，平均 = 83ms

$ ping -6 ds63.eu.org

正在 Ping ds63.eu.org [2606:50c0:8001::153] 具有 32 字节的数据:
来自 2606:50c0:8001::153 的回复: 时间=74ms
来自 2606:50c0:8001::153 的回复: 时间=81ms
来自 2606:50c0:8001::153 的回复: 时间=74ms
来自 2606:50c0:8001::153 的回复: 时间=72ms

2606:50c0:8001::153 的 Ping 统计信息:
    数据包: 已发送 = 4，已接收 = 4，丢失 = 0 (0% 丢失)，
往返行程的估计时间(以毫秒为单位):
    最短 = 72ms，最长 = 81ms，平均 = 75ms
```

# 参考资料
- [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages绑定个人域名并启用https](https://www.yong.eu.org/detail/15112.html)