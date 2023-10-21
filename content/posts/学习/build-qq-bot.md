---
title: qqBot 搭建
tags:
  - 记录
  - 折腾
categories:
  - 学习
date: 2023-10-11T01:23:34+08:00
summary: 短时间内也不想再进一步折腾了
---
# qqBot 搭建

**这两天在搭qqBot，记录一下**

## 整体技术
我使用的是[go-cqhttp](https://github.com/Mrs4s/go-cqhttp)和[nonebot2](https://github.com/nonebot/nonebot2)。

在遇到风控问题时，我使用了[unidbg-fetch-qsign](https://github.com/fuqiuluo/unidbg-fetch-qsign)。

## 过程
- 整个过程比我着手搭建前所想的要困难许多，踩了许多坑。不过很棒的一点是，这三个项目的issue都十分活跃。我踩的坑，在issue中几乎都能搜到。我使用过的开源项目不多，但这三个给了我很好的印象，希望自己以后能做些自己的贡献。

- 之前没想到最难的一点不是机器人程序的编写，而在于登录。我使用的号是新号（创建一个礼拜左右），风控等级比较高。

而我的需求是：将bot部署在地点在非我所在地的一个服务器上，这更是增加了被风控的概率。

尝试许多种方法后，我最终的解决方法是：
   1. 在本地先使用手表协议扫码登录。( `"sort_version_name":8.9.73`,`protocol：2`)
   2. 成功登录后将得到的文件移至服务器上并配置`signsever`,再次进行登录

- 但最后bot还是被风控，无法发送群消息。

    我短时间内也不想再进一步折腾了。

- 今天把自己写的插件[EuDs63/nonebot-plugin-yesman: nonebot2 插件](https://github.com/EuDs63/nonebot-plugin-yesman)发布到[插件商店 | NoneBot](https://nonebot.dev/store/plugins)了。过了一遍插件发布的流程，还蛮有意思的。有几点值得说下:
   1. [Create an account · PyPI](https://pypi.org/account/register/)的username要求是我见过的最苛刻的。但也能理解。
      > Choose a strong password that contains letters (uppercase and lowercase), numbers and special characters. Avoid common words or repetition.
   2. [About NoneFlow](https://github.com/apps/noneflow) 好强大。有机会想自己试试写一个类似的，或者了解是怎么做到的。

## 感想 
1. 想起搭telegram bot时，只需要申请一个token，甚至教程官方都有在写。而这里却是道高一尺魔高一丈般的猫鼠游戏。不免五味杂陈。
2. nonebot这种插件系统我觉得很棒。省了不少力气。
3. 感觉qqBot可玩性还是蛮高的，在其他群里也常常能见到些有趣的bot。但可惜的是腾讯的态度。

## 收获
1. `nohup`
- 使用: 例: `nphup nb run`
- 关闭: 例:
         ```
         ps aux | grep `nb` #找到对应的进程号
         kill $进程号
         ```
2. `守护进程（Systemd）`
   
    *注：以下复制自[使用 NoneBot2 和 go-cqhttp 打造自己的 FF14 QQ 机器人](https://blog.cysi.me/2022/04/make-a-qqbot.html#%E5%AE%88%E6%8A%A4%E8%BF%9B%E7%A8%8Bsystemd)*
   - 创建
    ```
    # vim /lib/systemd/system/go-cqhttp.service

        [Unit]
        Description=GO-CQHTTP
        Wants=network-online.target
        After=network-online.target
        [Service]
        Type=simple
        User=root
        WorkingDirectory= GO-CQHTTP的运行目录
        ExecStart= nohup go-cqhttp
        KillMode=process

        [Install]
        WantedBy=multi-user.target
    ```
    - 使用
    ```
    systemctl status go-cqhttp #查看状态
    systemctl enable go-cqhttp #启用开机自启
    systemctl restart go-cqhttp #重启进程
    systemctl stop go-cqhttp #停止进程
    systemctl start go-cqhttp #开始进程
    ```
3. python虚拟环境
   - 新建
   ```
   python -m venv myenv # 创建一个名为myenv的虚拟环境
   ```
   - 激活
   ```
   source ./qqVenv/bin/activate # bash

   source ./qqVenv/bin/activate.fish # fish

   ```

## 参考
- [nonebot/nonebot2: 跨平台 Python 异步聊天机器人框架 / Asynchronous multi-platform chatbot framework written in Python](https://github.com/nonebot/nonebot2)
- [fuqiuluo/unidbg-fetch-qsign: 获取QQSign通过Unidbg](https://github.com/fuqiuluo/unidbg-fetch-qsign)
- [使用 NoneBot2 和 go-cqhttp 打造自己的 FF14 QQ 机器人](https://blog.cysi.me/2022/04/make-a-qqbot.html#%E5%AE%89%E8%A3%85%E6%8F%92%E4%BB%B6)
- [Mrs4s/go-cqhttp: cqhttp的golang实现，轻量、原生跨平台.](https://github.com/Mrs4s/go-cqhttp)
