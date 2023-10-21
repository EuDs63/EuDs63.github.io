---
title: TinyTinyRSS-OPML-to-MD-Table
tags:
 - 记录
 - 折腾
 - 博客
categories:
 - 学习
date: 2023-04-29T00:59:40+08:00
summary: 记录[EuDs63/TinyTinyRSS-OPML-to-MD-Table](https://github.com/EuDs63/TinyTinyRSS-OPML-to-MD-Table) 的过程
---
# TinyTinyRSS-OPML-to-MD-Table

## 需求由来：
我很喜欢读博客。但发现总有些很有趣的博客等着发现。所以我关注了些推荐博客的频道。同时，我也想分享些自己喜欢的博客，但每次去手动复制又显得太麻烦了。所以就想着做一个自动化的方式，顺带着也可以学习下Github Action.

## 历程
1. 大部分时间是花在了如何获取opml文件上。Tiny Tiny RSS所给的文档较为精简，而网上相关的资料大都仅局限于如何部署。所以这一段只能是自己摸索。
   - TinyTinyRSS的网页版有给一个按钮能导出OPML，而这个按钮所指向的网址是`http://example.com/tt-rss/backend.php?op=opml&method=export'`。但它是有个鉴权操作的。需要登录。
   - 它的示例中有提供了一个登录的api调用，所以我开始的想法也是顺着这个来。想着直接添加data参数。但尝试了多种添加方式无果。
   - 后来注意到登录成功是会返回session值的，于是先用curl试验了下。
     ```bash
     # 登录并获取Session ID
     SESSION=$(curl -s -d '{"op":"login","user":"user","password":"password"}' http://example.com/tt-rss/api/ | python -c "import sys, json; print(json.load(sys.stdin)['content']['session_id'])")

     #获得opml文件
     curl -o my_tiny_tiny_rss.opml 'http://example.com/tt-rss/backend.php?op=opml&method=export' --cookie "ttrss_sid=${SESSION}"
     ```
   - 转写成python是用的request。其实现在回头想想，这应该是蛮基础的操作，而且session之前也有接触过。如果早点想起来的话是可以少花些时间的。
2. opml的解析有现成的库，用就是了。
3. 然后就是把一些个人信息抽出来写在配置文件中。这里踩了一个坑。`data = {'op': 'login', 'user': user, 'password': password}`,我开始的时候是这样写的`data = f"{{'op': 'login', 'user': {user}, 'password': {password}}}"`。后者虽然在形式上看着一样，但前者是json对象，后者是字符串。这里也给我提了个醒：Python虽然有动态类型这个特性，但还是要注意类型错误。
4. 最后是使用Github Action。之前也有使用过，但是是直接用的别人写好的workflow。所以也花了些时间学习了下。遇到的几个问题是
   - Yml文件的格式问题。这个可以用[YAML Validator](https://codebeautify.org/yaml-validator)来检查。Vscode应该也有相应的插件吧。
   - 运行时需要用到的变量，是用的secret。我之前以为secret的value只能是字符串。但[Github Action中python获取仓库的secrets](https://nekokiku.cn/2020/12/22/2020-12-22-Github-Action%E4%B8%ADpython%E8%8E%B7%E5%8F%96%E4%BB%93%E5%BA%93%E7%9A%84secrets/)中提到，可以把一整个yml文件放在value里面。所以我就想那json文件应该也可以。试了下确实能行。这样我的代码需要修改的地方就很少了。
   - workflow的触发方式,要添加手动触发，需加上`workflow_dispatch:`

## 学到的知识
- pipe和python的结合。下面这段是ChatGPT写的，太妙了。
  ```bash
  SESSION=$(curl -s -d '{"op":"login","user":"user","password":"password"}' http://example.com/tt-rss/api/ | python -c "import sys, json; print(json.load(sys.stdin)['content']['session_id'])")
  ```
- Github Action的使用
- python request

## 尾巴
这个项目算是个很小的项目，但我还是花了半天的时间，而且是在ChatGPT的帮助下。之前看到这样一种说法，搜索引擎大幅降低了普通人获取知识的难度，而ChatGPT在此基础上更是降低了十分客观的一个量。结合自己这次的经历，我十分认同这个观点。通过我对背景的补充和提问，ChatGPT让我省去了花费在各种教程和不完善的文档上所要消费的时间。这比搜索引擎所做到的交互要更自然。

## 参考
- [API Reference](https://tt-rss.org/wiki/ApiReference)
- [curl命令实现上网认证登录](https://www.cnblogs.com/jiangleads/p/10636696.html)
- [Github Action中python获取仓库的secrets](https://nekokiku.cn/2020/12/22/2020-12-22-Github-Action%E4%B8%ADpython%E8%8E%B7%E5%8F%96%E4%BB%93%E5%BA%93%E7%9A%84secrets/)
- [YAML Validator](https://codebeautify.org/yaml-validator)
