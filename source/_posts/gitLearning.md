---
title: git学习笔记
tags:
  - 笔记
  - git
categories:
  - 学习
date: 2022-09-04 12:31:47
excerpt: 记录git学习
---
# git学习笔记

## 使用技巧
### Github项目内搜索
在仓库页面上按 T ，然后直接输入文件名

---
## 记录
### Gitee配置的记录
因为srtp项目是用gitee作托管，所以今天试着配置了下Gitee，还是花了些时间的，记录如下：
1. 主要参考的是[Git同时配置Gitee和GitHub](https://cloud.tencent.com/developer/article/1774890),但它上面第一步就是让清除git的全局设置，有点不敢，因为怕清除后自己之前设置的一些东西出错。
2. 又看了几个教程，发现[Github 与 Gitee 共存配置](https://blog.csdn.net/weixin_43894513/article/details/104550377)上并没有说要清楚全局设置，于是就跟着上面的一步步走，很顺利地就设置好了。
3. 一个收获是`config`,`id_rsa`都是可以用记事本打开并编辑的。
   
### 多人协作时的流程
这次小组项目用的是华为云，所以流程也都是基于华为云来说的。
```bash
# 注：代码中的中文请根据实际情况进行替换
#确定好本次代码开发所要完成的任务，开好远程分支x，相关信息(分支名称，描述，关联工作项）要注明好
git pull #确保代码、分支是最新的
git checkout -b 本地分支名 origin/远程分支名   #检出远程分支到本地
# 代码开发
git add .
git commit -m"适当的批注"
git push #将代码推送到远程分支，开发过程中这个操作可以频繁点，好处是：代码备份和版本管理
# 完成本次代码开发所要完成的任务后（请确定功能实现，本地调试没问题）
# 接下来进行分支的合并 
# 在华为云中新建合并请求（可设置检视人，评审人，让别人帮忙看看）
# 合并完成后（默认设置是分支合并后，源分支是删除的）
git remote prune origin #当华为云上显示远程分支已经删除，但git branch -r仍然看到所删除的分支，执行该命令
git checkout master #切回master分支（一次任务完成后，建议切回master分支，这样pull的时候可以避免自己写的代码丢失的问题）
git branch -d 本地分支名 #删除本次任务所用的本地分支（也可以不删，当作备份）
```
### 对remote branch的认识
There are potentially three versions of every remote branch:
1. The actual branch on the remote repository
2. The snapshot of that branch locally
3. A local branch that might be tracking the remote branch

---
## 常用命令
### add
- `git add .` 会根据。gitignore做过滤
- `git add *` 会忽略。gitignore把任何文件都加入

### 推送
文件推送的三个步骤：
```
git add 
git commit -m"输入想说的话"
git push
```

### 查看状况
`git status`

### 分支
- 转到另一个分支 `git checkout {分支名}

- 查看本地分支 `git branch`
- 查看远程分支 `git branch -r`
- 查看本地和远程分支 `git branch -a`

- 删除本地分支 `git branch -d {本地分支名}`
- 强制删除本地分支`git branch -D {本地分支名}`
- 删除远程分支 `git push origin --delete {远程分支名}`
- 已经删除的远程分支但仍`git branch -a`时仍显示 ：`git remote prune origin`

### 日志
- `git log` 查看分支提交历史
- `git reflog` 也是查看日志，主要区别是会显示`reset --hard`

### 代码回退
- `git reset --hard {commit_id}`
- `git reset --hard HEAD^ ` 回退到上一版本

---

## 报错与解决
1. 报错：
   >Updates were rejected because the remote contains work that you donot have locally.
   - **场景**:在尝试gitee的时候，先是建了个远程仓库。然后在本地新建了个同名的文件夹，然后
        ```
        git init 
        git remote add origin https://gitee.com/spike23187/hello-gitee.git
        ```
    在文件夹里新建了个文件，`push`的时候报的错
   - **解决**: 根据下方的提示，是我没有先`pull`，本地文件不是最新的。

2. 
   >Updates were rejected because the tip of your current branch is behind its remote counterpart
   - **场景**：上述那个场景中，`git pull origin master`后报的错
   - **解决**：`git pull origin master --rebase`
   - **参考链接**：[Git常见报错：Updates were rejected because the tip of your current branch is behind](https://blog.csdn.net/weixin_42310154/article/details/118676936)
   - **收获**：虽然使用GitHub托管代码有段时间了，但一直是用插件简化操作的。这次算是第一次用git bash，就报了两个错，感觉git要用好，还是有段路要走的。
3. 
   - **场景**:push时报错,大意是网络问题
   - **解决**：
        ```
        git config --global http.proxy 'http://127.0.0.1:7890'
        git config --global https.proxy 'http://127.0.0.1:7890'
        ```

---


# 可供参考的链接
- [git教程](https://www.yiibai.com/git)
- [Git reflog vs. log: How these commit history tools differ](https://www.theserverside.com/video/Git-reflog-vs-log-How-these-commit-history-tools-differ)
- [【杂】git学习](http://blog.ch3nyang.top/miscellaneous/git%E5%AD%A6%E4%B9%A0/)
- [拜托，不要再问我Git如何回滚代码](https://zhuanlan.zhihu.com/p/137856034)