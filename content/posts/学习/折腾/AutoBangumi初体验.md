---
title: AutoBangumi初体验
slug: first experience of AutoBangumi
tags:
  - 折腾
categories:
  - 学习
date: 2024-06-14T00:11:18+08:00
summary: 为了更好的看番体验
---
## 说明 
- AutoBangumi 是什么?
  > AutoBangumi 是基于 RSS 的全自动追番整理下载工具。只需要在 Mikan Project 等网站上订阅番剧，就可以全自动追番。 并且整理完成的名称和目录可以直接被 Plex、Jellyfin 等媒体库软件识别，无需二次刮削。
- 我的运行环境:
  - Windows11
  - docker
- 资源占用情况(同时下载10集番剧时)
  - cpu: 最高可到15%
  - 内存：维持在300MB以内 
  - 带宽：做种的人多的话能跑满

## 过程 
一开始我参考官方教程[通过 Docker Compose 部署 AutoBangumi | AutoBangumi](https://www.autobangumi.org/deploy/docker-compose.html )，但它所提供的`docker-compose.yml`文件有些简陋。

我主要是遇到了[[错误报告]无法使用Downloader，https错误 · Issue #410 · EstrellaXD/Auto_Bangumi](https://github.com/EstrellaXD/Auto_Bangumi/issues/410 )这个问题。隐约感觉到可能是因为网段不同的缘故，但我没有进一步折腾。

后来我参照的是[AutoBangumi：自动追番，解放双手 - 初之音](https://www.himiku.com/archives/auto-bangumi.html )

这个教程写得很棒。以下只补充几点自己遇到的问题：
1. 教程里所说的qBittorent的默认密码并不为`adminadmin`，而是要去运行日志里找，类似于 
   > 未设置 WebUI 管理员密码。为此会话提供了一个临时密码：gkNJ3xcz2
2. 播放器似乎目前只支持Plex/Emby/Jellyfin
3. 开机自启可参考
   - [Potplayer 挂载 Alist，播放网盘视频，看阿里云/百度/115网盘电影资源](https://www.bilibili.com/video/BV1oC4y1f7uY/ )
   - [用nssm简易设置任意应用程序exe为Windows系统服务 - 米八说](https://www.mibashuo.com/post/set-exe-as-system-service-with-nssm )
4. AutoBangumi的web ui没提供的功能，可以去qBittorrent那边找

## 初体验的感受 
刚接触没多久，我就意识到这其中的魅力：
- 同一部番剧，不同字幕组，不同时期所提供的资源质量不同。
- 资源质量好坏的评判标准有很多点,对我来说：
  1. 内封字幕 > 内嵌字幕 
  2. 简体字幕 > 繁体字幕 
  3. 中日双语 > 简体字幕 
  4. BDRip > WebRip
  5. 翻译质量
  6. ...
- 综合以上两条，我需要从诸多资源中进行取舍，找到最好的那个。
- 下载是使用Bittorrent。一个种的下载速度很大程度上取决于是否有人做种。那起起伏伏的下载速度蕴含着不少信息量。比如说当下载速度从几B一下子跃到几百KB时，这就在无声地告诉我，互联网的另一端，有位拥有着类似的爱好的用户开机了。
- 还是BitTorrent，这个有着二十多年历史的协议堪称互联网的缩影:你当然可以下完就跑，但你也可以去做种，通过占用自己的一部分资源（内存，存储，带宽）来造福下一位使用该种子的用户。
- 现阶段，只有特别喜欢的番我才会去下。一想到自己在一番折腾后，可以不用再忍受烦人的加载和广告，就能看到自己喜欢的番。这种成就感是很难比拟的。

我现在还只是在自己的电脑上折腾，已经可以想象当我拥有一台nas后，它将吞噬我多少时间。

不过我乐意！

- 参考 
  - [高阶教程-追剧全流程自动化 | sleele的博客](https://sleele.com/2020/03/16/%E9%AB%98%E9%98%B6%E6%95%99%E7%A8%8B-%E8%BF%BD%E5%89%A7%E5%85%A8%E6%B5%81%E7%A8%8B%E8%87%AA%E5%8A%A8%E5%8C%96/ )
  - [本地自动追番+影视剧刮削整理(局域网多设备播放)(无NAS)](https://feng.red/300%20%E8%AF%84%E4%BB%B7/s/%E6%9C%AC%E5%9C%B0%E8%87%AA%E5%8A%A8%E8%BF%BD%E7%95%AA+%E5%BD%B1%E8%A7%86%E5%89%A7%E5%88%AE%E5%89%8A%E6%95%B4%E7%90%86(%E5%B1%80%E5%9F%9F%E7%BD%91%E5%A4%9A%E8%AE%BE%E5%A4%87%E6%92%AD%E6%94%BE)(%E6%97%A0nas)/ )