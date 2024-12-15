---
title: frp实现ssh内网穿透连接
date: 2024-12-15T23:15:49+08:00
slug: use_frp_to_ssh
tags:
  - Linux
  - 笔记
categories:
  - 学习
summary: frp is awesome
---

## 版本
本文章使用的版本为frp_0.61.0_linux_amd64

---

## 工作原理
frp 主要由两个组件组成：客户端(frpc) 和 服务端(frps)。通常情况下，服务端部署在具有公网 IP 地址的机器上，而客户端部署在需要穿透的内网服务所在的机器上。

由于内网服务缺乏公网 IP 地址，因此无法直接被非局域网内的用户访问。用户通过访问服务端的 frps，frp 负责根据请求的端口或其他信息将请求路由到相应的内网机器，从而实现通信。

---

## 需求
我有一台配有公网ip的服务器，以及两台linux电脑，分别称为电脑a和电脑b。

我希望使用电脑a，在非局域网环境下，也能使用ssh访问电脑b。

---

## 服务端配置
- 假定我的服务器的ip为`6.6.6.6`
- 安装目录位于: `/home/ubuntu/frp/frp_0.61.0_linux_amd64`
- `frps.toml`文件为服务端的配置文件,内容如下
    ```toml
    #服务绑定的IP与端口
    bindAddr = "0.0.0.0"
    bindPort = 7000
    #web dashboard配置
    webServer.addr = "0.0.0.0"
    webServer.port = 7001
    webServer.user = "admin" # change
    webServer.password = "admin" # change
    #启用prometheus监控指标
    enablePrometheus = true
    #token权限验证，需与客户端配置一致
    auth.method = "token"
    auth.token = "simpletoken"
    #日志配置
    log.to = "/home/ubuntu/frp/frp_0.61.0_linux_amd64/frps/logs/frps.log"
    log.level = "info"
    log.maxDays = 3
    ```

### 启动服务端
- **命令行方式启动**:
   
    `./frps -c ./frps.toml`

- **使用systemd方式启动**
  
  1. 配置文件`/etc/systemd/system/frps.service`,具体内容如下
    ```sh
    [Unit]
    # 服务名称，可自定义
    Description = frp server
    After = network.target syslog.target
    Wants = network.target

    [Service]
    Type = simple
    # 启动frps的命令，需修改为您的frps的安装路径
    ExecStart = /home/ubuntu/frp/frp_0.61.0_linux_amd64/frps -c /home/ubuntu/frp/frp_0.61.0_linux_amd64/frps.toml

    [Install]
    WantedBy = multi-user.target
    ```
  2. 启动服务
     - `systemctl daemon-reload`
     - `systemctl start frps`

---

## 客户端配置
- 我将电脑b作为客户端
- 安装目录位于: `/home/ubuntu/Desktop/frp_0.61.0_linux_amd64`
- `frpc.toml`文件为服务端的配置文件,内容如下
    ```toml
    serverAddr = "6.6.6.6"
    serverPort = 7000 #要和frps.toml的bindPort一致
    auth.method = "token"
    auth.token = "simpleToken"

    #日志配置
    log.to = "/home/ubuntu/Desktop/frp_0.61.0_linux_amd64/logs/frpc.log"
    log.level = "info"
    log.maxDays = 3

    [[proxies]]
    name = "ssh"
    type = "tcp"
    localIP = "127.0.0.1"
    localPort = 22
    remotePort = 6000
    ```

### 启动客户端
- **命令行方式启动**:
   
    `./frpc -c ./frpc.toml`

- **使用systemd方式启动**
  
  1. 配置文件`/etc/systemd/system/frpc.service`,具体内容如下
    ```sh
    [Unit]
    Description = frp client
    After = network.target syslog.target
    Wants = network.target 

    [Service]
    Type = simple
    # 启动frps的命令，需修改为您的frpc的安装路径
    ExecStart = /home/ubuntu/Desktop/frp_0.61.0_linux_amd64/frpc -c /home/ubuntu/Desktop/frp_0.61.0_linux_amd64/frpc.toml

    [Install] 
    WantedBy = multi-user.target
    ```
  2. 启动服务
     - `systemctl daemon-reload`
     - `systemctl start frpc`

## 访问
- 命令: `ssh -o Port=6000 ubuntu@6.6.6.6 -i ~/my_key.pem`
- 注释
  - 这里的`Port`为`frpc.toml`中设置的`remotePort`
  - `-i ~/my_key.pem` ，我是用来ssh连接`6.6.6.6`的
  - 这里的`ubuntu`为电脑b的用户名
  - 登录上后如果需要密码,那尝试输入电脑b的密码
- 可以这样配置`~/.ssh/config`
  ```bash
  Host 电脑b
    HostName 6.6.6.6
    Port 6000
    User ubuntu
    IdentityFile ~/.ssh/my_key.pem
  ```

## 参考
- [fatedier/frp: A fast reverse proxy to help you expose a local server behind a NAT or firewall to the internet.](https://github.com/fatedier/frp )
- [文档 | frp](https://gofrp.org/zh-cn/docs/ )
- [请问frpc里面可以设置多个server_addr吗？ · Issue #1607 · fatedier/frp](https://github.com/fatedier/frp/issues/1607 )
- [使用Frp配置内网访问（穿透） - hovin - 博客园](https://www.cnblogs.com/hovin/p/18023593#_label4_2 )
- [使用 frp 访问群晖 NAS - Power's Wiki](https://wiki-power.com/%E4%BD%BF%E7%94%A8frp%E8%AE%BF%E9%97%AE%E7%BE%A4%E6%99%96NAS/ )