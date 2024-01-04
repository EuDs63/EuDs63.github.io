---
title: xx原神大学是如何实现的
slug: how-to-implement-xx-genshin-university 
date: 2024-01-05T01:09:45+08:00
tags:
  - 折腾
  - 记录
  - web
categories:
  - 学习
summary:  前段时间很常能看到xx原神大学的域名，今天来了解下它是如何实现的。
---
## 缘起
前段时间很常能看到xx原神大学的域名,有趣是有趣，但具体是怎么实现的倒真没去了解过。

今天看到群里有人问:
> 所以玩原神玩的为什么搜出来来会是中科大？
> 我在dns查询上面查出来地址是75.126.101.233，而且无法访问

好奇心驱使下，我展开了调查。

## 已知
访问[中国科学技术大学.com](中国科学技术大学.com)会跳转到[《原神》官方网站](https://ys.mihoyo.com/)

而[玩原神玩的.com](玩原神玩的.com)则是[中国科学技术大学](https://www.ustc.edu.cn/)。

## 推测
我首先能想到可行的方法有两个:
- 重定向,访问网站的时候，服务器返回一个重定向的网址。
- DNS解析的时候就解析到了中科大的网站,比如：
   | SUBDOMAIN | TYPE | VALUE | TTL, SEC |
   |-|-|-|-|  
   | @ | CNAME | ustc.edu.cn | 86400 |

## 过程
1. 我很自然地想到，跳转嘛，我把网速限制得慢点就能看到没跳转前的了。这可以用浏览器自带的开发者工具来做。但无果。
2. 我用`whois`查了下这个域名，得到
    ```bash
    eu:~$ whois 玩原神玩的.com
    Domain Name: XN--8MR985EBA830AIYE.COM
    Registry Domain ID: 2822210486_DOMAIN_COM-VRSN
    ...
    ```
3. 这时候我以为这里的`XN--8MR985EBA830AIYE.COM`会是突破口，但查了下才知道：这是使用了[国际化域名](https://www.wikiwand.com/en/Internationalized_domain_name)，而`XN--8MR985EBA830AIYE.COM`是`玩原神玩的.com`的[Punycode编码](https://www.wikiwand.com/en/Punycode)。
4. 看[【教程向】如何让 www.xx原神大学.com 跳转到你的学校的官网 - 哔哩哔哩](https://www.bilibili.com/read/cv27389269/)，它这里是用的第一种。但我需要验证[玩原神玩的.com](玩原神玩的.com)也是用的方法。
5. 尝试`traceroute`,没看出什么结果：
6. 使用`curl -I`,结果如下
    ```bash
    eu:~$ curl -I 玩原神玩的.com
    HTTP/1.1 301 Moved Permanently
    Connection: close
    Connection: keep-alive
    Content-Type: text/html; charset=UTF-8
    Date: Thu, 04 Jan 2024 14:18:59 GMT
    Keep-Alive: timeout=4
    Location: http://ustc.edu.cn
    Proxy-Connection: keep-alive
    Server: nginx
    Strict-Transport-Security: max-age=0;

    eu:~$ curl -I 中国科学技术大学.com
    HTTP/1.1 302 Found
    Connection: close
    Connection: keep-alive
    Date: Thu, 04 Jan 2024 14:19:43 GMT
    Keep-Alive: timeout=4
    Location: https://ys.mihoyo.com/
    Proxy-Connection: keep-alive
    Server: namecheap-nginx
    X-Served-By: Namecheap URL Forward
    ```

    这里验证了我的猜想，两个域名都是用的第一种方法。

## 解答
现在就能回答一开始的问题了:

1. 为什么访问[玩原神玩的.com](玩原神玩的.com)会变成[中国科学技术大学](https://www.ustc.edu.cn/)?
   
   因为对[玩原神玩的.com](玩原神玩的.com)的所有请求都被重定向到了[中国科学技术大学](https://www.ustc.edu.cn/)对应的网站服务器。
   
2. 为什么dns查询上面查出来地址是`75.126.101.233`，而且无法访问？
   
   因为`75.126.101.233`是[玩原神玩的.com](玩原神玩的.com)对应的ip，这个域名并没有自己对应的服务器,请求都被重定向掉了。而真正的[中国科学技术大学](https://www.ustc.edu.cn/)的ip是`202.141.176.6`。
  
## 总结
我之前以为自己已经了解其原理，所以没有多想。

但这次真正去了解后还是能收获些新知识的。比如国际化域名，Punycode编码等。

## 吐槽
- 我一开始还以为[中国科学技术大学.com](中国科学技术大学.com)是属于学校官方的，还以为是用到了什么黑科技才做到让它跳转到[《原神》官方网站](https://ys.mihoyo.com/)的。但现在看来，并不是。这让我有些失望。
- 写这篇的时候我尝试让Copilot做自动补全，是能有些帮助，但还是不习惯，会有种自己的思路被带着走的感觉。我不喜欢这种感觉，于是关掉了。

## 参考
- [【教程向】如何让 www.xx原神大学.com 跳转到你的学校的官网 - 哔哩哔哩](https://www.bilibili.com/read/cv27389269/)
- [Internationalized domain name - Wikiwand](https://www.wikiwand.com/en/Internationalized_domain_name)
- [Punycode - Wikiwand](https://www.wikiwand.com/en/Punycode)