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

**因项目更新频繁，请注意本文最后更新时间，以免因本文内容失效造成困扰**

## 缘起 
我在半年前折腾过一次qqBot的搭建，但那次由于风控问题，只能放弃了,具体记录在
[qqBot 搭建 | EuDs's Blog](https://ds63.eu.org/2023/setup_qqbot/ )。

但这两天发现了[NapNeko/NapCatQQ: 基于NTQQ的无头Bot框架](https://github.com/NapNeko/NapCatQQ )，决定再次折腾，以下记录我的过程。

## 过程 
说明：以下均为Windows平台
1. 在[Releases · NapNeko/NapCatQQ](https://github.com/NapNeko/NapCatQQ/releases )下载`NapCat.Shell.zip`，并解压
2. 运行`launcher.bat`，扫码登录
3. 在NapCat的网页，新增Websocket客户端,url填`ws://127.0.0.1:8080/onebot/v11/ws`,token填`config/webui.json`里面的。具体参考
   - [💖 NapCatのWebUI配置指南💖 | NapCatQQ](https://napneko.github.io/config/basic#%E9%80%9A%E8%BF%87-webui-%E9%85%8D%E7%BD%AE-onebot-%E6%9C%8D%E5%8A%A1 )
4. 参照[快速上手 | NoneBot](https://nonebot.dev/docs/quick-start )创建并运行NoneBot项目，注意：创建时适配器应选择OneBot V11，新建`.env`文件，里面填`ONEBOT_ACCESS_TOKEN=第三步填的token`

## 感受 
1. 这次整体流程很顺畅，最主要的还是因为登录只要手机扫个码就行，不用再一个个试协议来躲避风控。
2. 时隔半年多又有了qq bot的需求，发现NapCat和NoneBot依然坚挺，但自己原先写的记录已不太适用，于是修改了下。

## Todo 
- [ ] 写个脚本，使得可以开机自启
- [ ] 部署到服务器上，不知道会不会再遇到风控问题
- [ ] 插件：~~去年今日~~
- [ ] 

## 参考 
- [NapCatQQ](https://napneko.github.io/zh-CN/guide/getting-started )
- [接入框架 | NapCatQQ](https://napneko.github.io/zh-CN/guide/integration )
- [NapCat 使用教程 | NoneBot 文档](https://x.none.bot/before/install_napcat )
- [Shell | NapCatQQ](https://napneko.github.io/guide/boot/Shell )