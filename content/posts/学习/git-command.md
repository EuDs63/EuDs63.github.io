---
title: git常用命令
date: 2023-05-26T13:18:01+08:00
lastmod: 2023-10-24T13:18:01+08:00
tags:
  - 记录
  - git
  - 笔记
categories:
  - 学习
summary: a cheatsheet of git commands
---

## add 
- `git add .` 会根据.gitignore做过滤
- `git add *` 会忽略.gitignore把任何文件都加入

## push
文件推送的三个步骤：
```
git add 
git commit -m"输入想说的话"
git push
```

## status 
`git status`

## branch 
- 转到另一个分支 `git checkout {分支名}`

- 查看本地分支 `git branch`
- 查看远程分支 `git branch -r`
- 查看本地和远程分支 `git branch -a`

- 删除本地分支 `git branch -d {本地分支名}`
- 强制删除本地分支`git branch -D {本地分支名}`
- 删除远程分支 `git push origin --delete {远程分支名}`
- 已经删除的远程分支但仍`git branch -a`时仍显示 ：`git remote prune origin`

## log 
- `git log` 查看分支提交历史
- `git reflog` 也是查看日志，主要区别是会显示`reset --hard`

### 代码回退
- `git reset HEAD` 撤销上一次的`add`
- `git reset HEAD ${filename}` 仅撤销某一文件
- `git reset --hard {commit_id}`
- `git reset --hard HEAD^ ` 回退到上一版本

### config
- `git config --global user.name "Your Name"` 
- `git config --global user.email "youremail@example.com"`
- `git config --global --list` 查看配置
- `git config --global http.proxy 'http://127.0.0.1:7890'`
- `git config --global https.proxy 'http://127.0.0.1:7890'`