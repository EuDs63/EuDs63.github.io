---
title: Vim常用命令
date: 2023-11-29T23:15:49+08:00
tags:
  - Linux
  - 笔记
categories:
  - 学习
summary: a cheatsheet of vim commands
---
## Vim

### 另存为
- `:saveas ~/some/path/`: save your file to that locationvim

### 查找
- 光标停留在想要查找的单词的任意一个字母上面， 然后输入`Shift` + `*`  ，即可快速选中该单词，并且可以通过 n  或  N 进行上一个或下一个的匹配。

---

## 浏览器 vimium

1. 标记
   - `m` + `m` 创建一个新的标记
   - ```+`m` 跳转到标记的位置
2. `g`
   - `g` + `u` 访问当前网址的上一层（目录的上一层）
   - `g` + `U` 访问当前网址的首页
3. 标签页
- `x` 关闭标签页
- `X` 恢复最近关闭的标签页

---

## vscode插件Vim

### 注释
- g + c 单行注释
- g + C 多行注释

### 宏使用
1. 在normal模式下输入qa(当然也可以输入qb, qc, etc，这里的a, b, c是指寄存器名称，vim会把录制好的宏放在这个寄存器中)
2. 录制操作
3. normal模式下输入q，结束宏录制。

### 跳转
- `%` 跳转到与当前括号所匹配的位置
- `f<`  Jump forward and land on the `<` character
- `t>`  Jump forward and land right before the `<` character

---

## 参考链接
- [mudi24/keyborad-man](https://github.com/mudi24/keyborad-man/tree/main/%E6%B5%8F%E8%A7%88%E5%99%A8)
- [vim重复操作的宏录制 - ini_always - 博客园](https://www.cnblogs.com/ini_always/archive/2011/09/21/2184446.html)
- [Learn Vim For the Last Time](https://danielmiessler.com/p/vim/)
