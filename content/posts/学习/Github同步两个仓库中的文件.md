---
title: Github同步两个仓库中的文件
slug: sync specific files of two repo
tags:
  - 记录
  - 博客
  - 折腾
categories:
  - 学习
date: 2024-02-04 16:03:44
summary: 技术让人变懒
---

## 需求
我在Github上有两个仓库，一个是myThinking，另一个是EuDs63.github.io。两个仓库中有部分文件是重复的，这部分重复的文件，我是持续更新的。以前我的操作是在myThinking更新完后，再手动去更新EuDs63.github.io。我想使用action来简化我的操作。我的思路如下：
当我向[EuDs63/myThinking: A record of my thoughts](https://github.com/EuDs63/myThinking)push的时候，这时候触发检查，检查本次push修改的文件中是否有特定的表头。如果有，那就推送给[EuDs63/EuDs63.github.io: my blog](https://github.com/EuDs63/EuDs63.github.io)。这样只要我保证，我每次想新增内容的时候，都是在mything这里先写就可以了。这样就能解决同步问题。

## 过程
1. 使用[Changed Files · Actions · GitHub Marketplace](https://github.com/marketplace/actions/changed-files)
   发现中文显示有问题，例如显示成`"\345\260\244\351\207\214\345\215\241/\346\242\246.md"`，查找issue和文档，未能找到,放弃。
2. 找到的解决方法是`git config --global core.quotepath false`,确实能解决问题，但还是不能理解为什么，因为我的文件格式是utf-8，而不是[其中](https://blog.csdn.net/hanlizhong85/article/details/80642571)提到的gb2312。
3. 我需要同步的文件的特征是以"---"开头，对diff得到的文件进行检查，如符合，则将相对地址写入到文件中。
4. 使用[nkoppel/push-files-to-another-repository: github Action to push files into another Github repository](https://github.com/nkoppel/push-files-to-another-repository)，它的文档写得不全，但好在代码不长，于是读源码然后自己进行修改。最主要的一个是原本的代码不知道私有仓库，会报错：
   >fatal: could not read Username for 'https://github.com': No such device or address
5. 


## 参考
- [git diff获取差异文件名显示中文乱码的解决办法_git diff获取差异文件中文乱码的解决办法-CSDN博客](https://blog.csdn.net/hanlizhong85/article/details/80642571)
- [nkoppel/push-files-to-another-repository: github Action to push files into another Github repository](https://github.com/nkoppel/push-files-to-another-repository)
- [tj-actions/changed-files: :octocat: Github action to retrieve all (added, copied, modified, deleted, renamed, type changed, unmerged, unknown) files and directories.](https://github.com/tj-actions/changed-files)
- [Workflow commands for GitHub Actions - GitHub Docs](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#environment-files)