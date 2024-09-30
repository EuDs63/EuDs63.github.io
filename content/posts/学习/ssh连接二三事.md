---
title: ssh连接二三事
date: 2024-08-17T23:15:49+08:00
slug: things_about_ssh
tags:
  - Linux
  - 笔记
categories:
  - 学习
summary: some thing about ssh
---
## 免密登录 
1. 将公钥添加到 `~/.ssh/authorized_keys `
2. 添加权限: `chmod 600 ~/.ssh/authorized_keys`, `chmod 700 ~/.ssh`
3. 登录: `ssh username@server_ip`

## Github相关
- 作用：use SSH to perform Git operations in repositories on GitHub.com
- 步骤:
  1. [Generating a new SSH key and adding it to the ssh-agent - GitHub Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key )

  `ssh-keygen -t ed25519 -C "your_email@example.com"`
  2. [Generating a new SSH key and adding it to the ssh-agent - GitHub Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key )
  3. Testing your SSH connection: `ssh -T git@github.com`
  4. [Adding a new SSH key to your GitHub account - GitHub Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account )

## 使用端口转发来远程连接内网的机器
- 涉及到三台机器，身边的电脑a，具有公网ip的机器b，远程需要被访问的电脑c
- 核心思想: 使用一台能被双方访问得到的公网机器作为代理
- 步骤:
  1. 电脑c需要执行`ssh -oPort=22 -CNfg -R 40000:localhost:22 root@公网ip -oPort`
  2. 使用电脑a通过ssh登陆到机器b，再通过ssh连接本地40000端口，这样就相当于连接到了电脑c的22端口
- 参考: [SSH 端口转发](https://blog.fatedier.com/2015/07/22/ssh-port-forwarding/ )

## 持续部署 
- [webfactory/ssh-agent: GitHub Action to setup `ssh-agent` with a private key](https://github.com/webfactory/ssh-agent )这个action可以用来在GitHub Action进行ssh连接。
- 不过考虑到安全问题，最好是是利用SSHD来限制可执行的指令, 具体参见[安全地使用 SSH 进行持续部署 - Cmj's Blog](https://blog.caomingjun.com/secure-ssh-continuous-deployment-with-forcecommand/ )

## id_rsa和 xx.pem的区别和联系
- id_rsa 是一个私钥文件，通常用于 SSH 认证
- xx.pem 文件则通常是 PEM 格式，可能包含私钥、公钥或证书，广泛用于 SSL/TLS,可以用于多种加密场景

## 参考
- [如何优雅地在你的Windows主力机上通过SSH远程控制你的服务器（centos） - 知乎](https://zhuanlan.zhihu.com/p/472660528 )
- [群晖 NAS 实现 SSH 免密码登录 | LEGALGEEK](https://blog.legalhub.cn/2022/10/16/qunhui-nas-ssh-login/ )
- [VS Code Remote-ssh 远程控制Windows主机 + 免密登录 + 内网穿透_vscode 免密ssh 连接 windows-CSDN博客](https://blog.csdn.net/YYwxcsdn/article/details/134764938 )
- [史上最全 SSH 暗黑技巧详解 | plantegg](https://plantegg.github.io/2019/06/02/%E5%8F%B2%E4%B8%8A%E6%9C%80%E5%85%A8_SSH_%E6%9A%97%E9%BB%91%E6%8A%80%E5%B7%A7%E8%AF%A6%E8%A7%A3--%E6%94%B6%E8%97%8F%E4%BF%9D%E5%B9%B3%E5%AE%89/)