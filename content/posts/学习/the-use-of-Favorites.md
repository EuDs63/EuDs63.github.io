---
title: 收藏夹的使用
tags:
  - 折腾
categories:
  - 学习
date: 2023-03-18T23:45:18+08:00
summary: 收藏夹和JavaScript的结合实现实用小功能
---

**偶然发现可以在url中使用JavaScript，这是前提。**

**日常使用时，有些功能特意为此写个拓展有点小题大作，这时候使用收藏夹即可，方便的同时也增加了可迁移性**


## Bing转Google搜索
- 描述：我日常搜索引擎是使用bing，但有些时候bing的内容我不是很满意，需要在Google上再次搜索；由于new bing的存在，我不想更换默认搜索引擎，但打开Google，再次搜索这个操作又很麻烦，所以就添加了一条收藏夹
- 代码详解：
    ```JavaScript
    var currentUrl = window.location.href; //获取当前链接
    var reg = /q=([^&]+)/;
    var res = currentUrl.match(reg); //使用正则表达式进行匹配
    var googleUrl = "https://www.google.com/search?q=";
    var resultUrl = googleUrl+res[1]; //拼接
    window.open(resultUrl,'_self').close();//打开新网站，并关闭原网站
    ```
- 书签URL
    `javascript:var currentUrl = window.location.href;var reg = /q=([^&]+)/;var res = currentUrl.match(reg);var googleUrl = "https://www.google.com/search?q=";var resultUrl = googleUrl+res[1];window.open(resultUrl,'_self').close();`
- 注：正则表达式是让new bing写的，感觉有种ntr的美
- 注：后来我还是改用Google作为默认搜索引擎了。

## 网易云解除歌单限制
- 描述：网易云音乐网页端对歌单显示数量有限制，只显示20条，而我不希望因此下载客户端，于是添加了该书签。
- 代码：
    ```JavaScript
    document.cookie="os=pc";
    window.location.reload();//重新加载网页
    ```
- 收藏夹URL
  `javascript:document.cookie="os=pc";window.location.reload();`

## 跳转至NeoDB
- 描述：我最近开始使用[NeoDB](https://neodb.social/discover/)作为我的书影音标记工具，但我还是会先再豆瓣、Bangumi等网站先看看别人的评论，然后再去[NeoDB](https://neodb.social/discover/)标记。于是添加了该书签。
- 代码：
  ```JavaScript
  var currentUrl = window.location.href; //获取当前链接
  var neodbUrl = "https://neodb.social/search/?q=";
  var resultUrl = neodbUrl+currentUrl; //拼接
  window.open(resultUrl,'_self');//打开
  ```
- 收藏夹URL
  `javascript:var currentUrl = window.location.href;var neodbUrl = "https://neodb.social/search/?q=";var resultUrl = neodbUrl+currentUrl;window.open(resultUrl,'_self')`

## 屏蔽google地图
**这条不是书签相关，但看了看只有这里最相关了**

最近（2023年11月30日）用google搜一些比较冷门的结果时，排在前面的一般是些广告。点进去发现是人为添加的google map，应该是利用google对自家产品的搜索优化。虽然有点感慨其聪明才智，但忍了一周还是不堪其扰。
我目前的解决方法是修改搜索引擎中的url为

`
{google:baseURL}search?q=+%s+-site:www.google.com/mymaps
+-site:www.google.com/maps&{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:iOSSearchLanguage}{google:prefetchSource}{google:searchClient}{google:sourceId}{google:contextualSearchVersion}ie={inputEncoding}{google:baseURL}search?q=%s&{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:iOSSearchLanguage}{google:prefetchSource}{google:searchClient}{google:sourceId}{google:contextualSearchVersion}ie={inputEncoding}
`

这样的代价是会让搜索框变得很丑，但我没找到更好的解决方法，先凑合这样吧。

