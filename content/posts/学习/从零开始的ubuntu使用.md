---
title: 从零开始的ubuntu使用
date: 2024-08-07T15:37:49+08:00
slug: Ubuntu experience in a different world from zero
tags:
  - Linux
  - 笔记
categories:
  - 学习
summary: Long may the Jammy Jellyfish!
---
**Ubuntu对我来说是一个既熟悉又陌生的系统。过去几年来，接触得最多的Linux系统就是它了。但除了wsl，虚拟机，云服务器，我还真没正儿八经的从零开始使用过。最近刚好有机会从装系统开始从零使用，以下记录我踩过的各种坑。**

## 安装
- [Windows11 + Linux (Ubuntu22.04) 双系统最简安装详细避坑版_win11安装linux双系统-CSDN博客](https://blog.csdn.net/2401_84064328/article/details/137232169 )
- [Ubuntu 22.04.4 LTS (Jammy Jellyfish)](https://releases.ubuntu.com/jammy/ ) 
- 踩坑到怀疑人生后，最后放弃使用24.04，回退到22.04,原本寸步难行的泥泞沼泽也成了康庄大道,赞美Jammy Jellyfish。

## 安装wifi驱动
无果。我使用的主版官网上只提供了win11或win10的驱动。网上找的几种办法，包括更新内核，都没能成功。放弃。

- 更新内核后报错 `bad shim signature & load the kernel first`
  [How to fix "bad shim signature & load the kernel first" errors on my triple boot setup? : r/linux4noobs](https://www.reddit.com/r/linux4noobs/comments/10152n7/how_to_fix_bad_shim_signature_load_the_kernel/ )

## 安装显卡驱动
1. 菜单栏找到 `Additional drivers`,点击安装
2. `nvidia-smi` 检查是否安装成功

## 查看配置 
1. [查看ubuntu服务器的配置（cpu+显卡+内存+硬盘）_ubuntu查看服务器配置-CSDN博客](https://blog.csdn.net/lxfHaHaHa/article/details/95769201 )

## 中文输入法
参考以下几篇
- [Ubuntu中文设置与安装中文输入法（超详细）_ubuntu中文输入法安装-CSDN博客](https://blog.csdn.net/fr16021028/article/details/125891812 )
- [各位 Linux 用的输入法都是？ - V2EX](https://hk.v2ex.com/t/1055546)
- [iDvel/rime-ice: Rime 配置：雾凇拼音 | 长期维护的简体词库](https://github.com/iDvel/rime-ice )

## 代理 
- [求助， Linux 如何使用全局代理？ - V2EX](https://v2ex.com/t/988113 )
- [juewuy/ShellCrash: Run sing-box/mihomo as client in shell](https://github.com/juewuy/ShellCrash )
- v2rayA 
  - [v2rayA/v2rayA: A web GUI client of Project V which supports VMess, VLESS, SS, SSR, Trojan, Tuic and Juicity protocols. 🚀](https://github.com/v2rayA/v2rayA )
  - [V2RayA——新一代Linux客户端安装配置教程 | SKY博客](https://www.sky350.com/1210.html ) 
  - [Debian / Ubuntu - v2rayA](https://v2raya.org/en/docs/prologue/installation/debian/#start-v2raya--enable-v2raya-start-automatically )
  - [Debian / Ubuntu - v2rayA](https://v2raya.org/en/docs/prologue/installation/debian/ )
    1. `wget -qO - https://apt.v2raya.org/key/public-key.asc | sudo tee /etc/apt/keyrings/v2raya.asc`
    2. `echo "deb [signed-by=/etc/apt/keyrings/v2raya.asc] https://apt.v2raya.org/ v2raya main" | sudo tee /etc/apt/sources.list.d/v2raya.list`
    3. `sudo apt update`
    4. `sudo apt install v2raya v2ray`
    5. `sudo systemctl start v2raya.service`
- dae 
  - [V2 上关于 dae（大鹅）（ebpf）的讨论还是比较少啊，完美的旁路科学方案了吧？ - V2EX](https://v2ex.com/t/982840 )
  - [dae/docs/zh/how-it-works.md at main · daeuniverse/dae](https://github.com/daeuniverse/dae/blob/main/docs/zh/how-it-works.md )
  - [dae/docs/zh at main · daeuniverse/dae](https://github.com/daeuniverse/dae/tree/main/docs/zh )
  - [[Bug Report] <title>Ubuntu 启动不起来 · Issue #468 · daeuniverse/dae](https://github.com/daeuniverse/dae/issues/468 )
- electron-ssr 
  - [shadowsocksrr/electron-ssr: Shadowsocksr client using electron](https://github.com/shadowsocksrr/electron-ssr )
  - [linux配置SSR | Victrid's Personal Site](https://victrid.dev/2020/linux-pei-zhi-ssr/ )

ps: 在这上折腾最久，最终使用的是v2raya。

## ssh 
```bash
sudo apt update && sudo apt upgrade
sudo apt install openssh-server
sudo systemctl enable --now ssh
```

## 杂
- [Weird error when shutting down after update : r/archlinux](https://www.reddit.com/r/archlinux/comments/11dqzj0/weird_error_when_shutting_down_after_update/ )
- [查看Linux系统架构的命令，查看linux系统是哪种架构：AMD、ARM、x86、x86_64、pcc 或 查看Ubuntu的版本号 - 掘金](https://juejin.cn/post/7097032561092165640 )