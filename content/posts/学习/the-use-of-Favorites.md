---
title: 收藏夹的使用
tags:
  - 折腾
categories:
  - 学习
date: 2023-03-18T23:45:18+08:00
summary: 收藏夹和JavaScript的结合实现实用小功能
---
# 收藏夹的使用
<p class="note note-info">偶然发现可以在url中使用JavaScript，这是前提。
日常使用时，有些功能特意为此写个拓展有点小题大作，这时候使用收藏夹即可，方便的同时也增加了可迁移性</p>


## Bing转Google搜索
- 描述：我日常搜索引擎是使用bing，但有些时候bing的内容我不是很满意，需要在Google上再次搜索；由于new bing的存在，我不想更换默认搜索引擎，但打开Google，再次搜索这个操作又很麻烦，所以就添加了一条收藏夹
- 代码详解：
    ```JavaScript
    var currentUrl = window.location.href; //获取当前连接
    var reg = /q=([^&]+)/;
    var res = currentUrl.match(reg); //使用正则表达式进行匹配
    var googleUrl = "https://www.google.com/search?q=";
    var resultUrl = googleUrl+res[1]; //拼接
    window.open(resultUrl,'_self').close();//打开新网站，并关闭原网站
    ```
- 书签URL
    {% note success %}
    `javascript:var currentUrl = window.location.href;var reg = /q=([^&]+)/;var res = currentUrl.match(reg);var googleUrl = "https://www.google.com/search?q=";var resultUrl = googleUrl+res[1];window.open(resultUrl,'_self').close();`
    {% endnote %}
- 注：正则表达式是让new bing写的，感觉有种ntr的美

## 网易云解除歌单限制
- 描述：网易云音乐网页端对歌单显示数量有限制，只显示20条，而我不希望因此下载客户端，于是添加了该书签。
- 代码：
    ```JavaScript
    document.cookie="os=pc";
    window.location.reload();//重新加载网页
    ```
- 收藏夹URL
  {% note success %}
  `javascript:document.cookie="os=pc";window.location.reload();`
  {% endnote %}
