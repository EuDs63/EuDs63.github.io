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

## 2024年6月17日
- 问题描述：Win11下，“通过code打开”位于右键选项的二级菜单，我希望将其移到一级菜单 
- 过程：
  - [BluePointLilac/ContextMenuManager: 🖱️ 纯粹的Windows右键菜单管理程序](https://github.com/BluePointLilac/ContextMenuManager )该软件在Win10很好用，但未适配Win11。作者在21年就有适配Win11的计划，但因其工作繁忙未能成行。
  - [ikas-mc/ContextMenuForWindows11: Add Custom Context Menu For Windows11](https://github.com/ikas-mc/ContextMenuForWindows11 )。看文档感觉与我需求不符
  - [Easy Context menu v1.6](https://www.sordum.org/7615/easy-context-menu-v1-6/ )。似乎可用，但未开源，我不信任
  - [Integrate with the Windows 11 Context Menu · Issue #127365 · microsoft/vscode](https://github.com/microsoft/vscode/issues/127365 )，开发人员称该功能在inside版本实现，但因[Uninstalling VS Code takes a long time, when enabling the Windows 11 context menu action · Issue #164689 · microsoft/vscode](https://github.com/microsoft/vscode/issues/164689 )，没有将其在稳定版本集成该功能的打算。（难绷，Win11都出几年了，能玩得转这右键菜单的软件怎么还是少数）
  - 最终选择：修改注册表

### 2024年10月14日
- 问题描述: 输不了中文句号
- 过程:
  - 某个时候开始就输不了中文句号，测试发现只在vscode这样。
- 解决
  - 中文输入法下按`Ctrl+.`即可