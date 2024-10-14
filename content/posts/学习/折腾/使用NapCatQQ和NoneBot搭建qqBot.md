---
title: 使用NapCatQQ和NoneBot搭建qqBot
slug: setup qqBot using NapCatQQ and NoneBot
tags:
  - 记录
  - 折腾
categories:
  - 学习
date: 2024-06-14T16:23:34+08:00
summary: 新的开始
---

## 缘起 
我在半年前折腾过一次qqBot的搭建，但那次由于风控问题，只能放弃了,具体记录在
[qqBot 搭建 | EuDs's Blog](https://ds63.eu.org/2023/setup_qqbot/ )。

但这两天发现了[NapNeko/NapCatQQ: 基于NTQQ的无头Bot框架](https://github.com/NapNeko/NapCatQQ )，决定再次折腾，以下记录我的过程。

## 过程 
说明：以下均为Windows平台
1. 在[Releases · NapNeko/NapCatQQ](https://github.com/NapNeko/NapCatQQ/releases )下载，并解压
2. 运行`napcat-utf8.bat`，扫码登录。之后可通过`napcat-utf8.bat -q qq号`快速启动
3. 配置onebot11,具体参考
   - [基础配置介绍 | NapCatQQ](https://napneko.github.io/zh-CN/guide/config )
   - [接入框架 | NapCatQQ](https://napneko.github.io/zh-CN/guide/integration )
4. 参照[快速上手 | NoneBot](https://nonebot.dev/docs/quick-start )创建并运行NoneBot项目，注意：创建时适配器应选择OneBot V11

## 感受 
1. 这次整体流程很顺畅，最主要的还是因为登录只要手机扫个码就行，不用再一个个试协议来躲避风控。


## Todo 
- [ ] 写个脚本，使得可以开机自启
- [ ] 部署到服务器上，不知道会不会再遇到风控问题
- [ ] 插件：~~去年今日~~

## 参考 
- [NapCatQQ](https://napneko.github.io/zh-CN/guide/getting-started )
- [接入框架 | NapCatQQ](https://napneko.github.io/zh-CN/guide/integration )
- [NapCat 使用教程 | NoneBot 文档](https://x.none.bot/before/install_napcat )