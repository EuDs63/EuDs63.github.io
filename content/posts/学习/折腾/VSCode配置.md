---
title: VSCode配置
tags:
  - 折腾
categories:
  - 学习
date: 2024-06-13T13:45:18+08:00
summary: 工欲善其事
---

## 前言 
VSCode是我的主力编辑器，但有些设置，虽然知道自己想调整什么，但又不知道它对应的名字，于是记录于此。

## 字体 
`Editor: Font Family`: 我的设置为Consolas, '新宋体', monospace

Windows下可以在`C:\Windows:\Fonts`找到本机安装的字体。

## Quick Suggestions 
`Editor: Quick Suggestions`

## 整体界面的大小 
`Window: Zoom Level`

## 问题与排查 
### 2024年4月3日 
- 问题描述：VSCode远程连接服务器，导致服务器卡死
- 排查过程： 
  这个问题我遇到过很多次。远程连接的服务器包括但不限于Azure,Amazon的。它们的一大共同特点就是内存小。
- 解决： 
  - 内存不大于2G的服务器尽量别使用VSCode进行远程连接

### 2024年6月13日
- 问题描述: 最近输入老出问题，偏卡顿，要不就是一次性输入多个同样的字符。
- 排查过程：
    通过控制变量法，发现只有在VSCode才有这种问题。进一步测试表面：只有在特定的项目才会出问题。
    
    问题最终锁定在Quick Suggestions上。这个项目中有个markdown文件:十四万字，三百多kb。我将markdown文件的`editor.quickSuggestions`给关掉，就不怎么卡了。但我其实蛮喜欢这功能的,它不一定能有用，但时不时能给我些惊喜的发现。
    
- 解决
    - 最终我将该文件拆分为两个文件，现在似乎好多了。
    - 另一种解决方式可能是：将`Editor: Quick Suggestions Delay`调大点。这个Delay我是理解成防抖的等待时间，不知道对不对。
    - 这个issue提到了类似的问题：[可否在文件较大时自动设置 syntaxDecorations 呢？ · Issue #489 · yzhang-gh/vscode-markdown](https://github.com/yzhang-gh/vscode-markdown/issues/489 )