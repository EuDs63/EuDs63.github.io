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
summary: 聪明的程序员也是懒程序员
---

## 需求
我在Github上有两个仓库，一个是xxx，另一个是EuDs63.github.io。两个仓库中有部分文件是重复的，而这部分重复的文件，我是持续更新的。

以前我的操作是在xxx更新完后，再手动去更新EuDs63.github.io。但难免有时候会忘记，而且久了也觉得麻烦。

我计划使用action来简化我的操作，思路如下：
1. 当我向[EuDs63/xxx](https://github.com/EuDs63/xxx)push的时候，这时候触发检查，检查本次push修改的文件中是否有特定的表头。
2. 如果有，那就推送给[EuDs63/EuDs63.github.io: my blog](https://github.com/EuDs63/EuDs63.github.io)。
3. 这样只要我保证，我每次想新增内容的时候，都是在xxx这里先写就可以了。

## 过程
1. 使用[Changed Files · Actions · GitHub Marketplace](https://github.com/marketplace/actions/changed-files)
   发现中文显示有问题，例如显示成`"\345\260\244\351\207\214\345\215\241/\346\242\246.md"`，查找issue和文档，未能找到解决方法,放弃。
2. 网上查了下，找到的解决方法是`git config --global core.quotepath false`,确实能解决问题，但我不太能理解为什么，因为我的文件格式是utf-8，而不是[其中](https://blog.csdn.net/hanlizhong85/article/details/80642571)提到的gb2312。
3. 我需要同步的文件的特征是以"---"开头，对diff得到的文件进行检查，如符合，则将相对地址写入到文件中。
```bash 
        git diff --name-only ${{ github.event.before }} ${{ github.event.after }} > changed_files.txt
        # 接下来可以使用 changed_files.txt 文件中的内容,检查是否有需要执行的文件
        for file in $(cat changed_files.txt); do
          # 检查头一行是否以---开头
          if [[ $(head -n 1 $file) == "---" ]]; then
            echo "File $file is need to sync"
            # 写入文件
            echo $file >> sync_files.txt
          fi
        done
        echo "Changed files: $(cat sync_files.txt)"
        echo "sync_files=$(cat sync_files.txt)" >> "$GITHUB_ENV"
```
4. 找到了文件，接下来要做的就是push到另一个仓库了。其实逻辑也不复杂，但本着不造轮子的原则，我找到了[cpina/github-action-push-to-another-repository](https://github.com/cpina/github-action-push-to-another-repository)，但发现它似乎不太能支持单独的几个文件，于是找到了[nkoppel/push-files-to-another-repository](https://github.com/nkoppel/push-files-to-another-repository)。
5. 发现[nkoppel/push-files-to-another-repository](https://github.com/nkoppel/push-files-to-another-repository)的文档写得不全，甚至有误，而作者似乎也不再维护。但好在代码不长，于是读源码然后自己进行修改。我主要做了两个修改：
   - 原本的代码不支持私有仓库，会报错：
   >fatal: could not read Username for 'https://github.com': No such device or address
   改成`git clone "https://$API_TOKEN_GITHUB@github.com/$GITHUB_REPOSITORY.git" repo`就好了。
   - 原本的代码不支持相对路径，我改成了
    ```bash
    echo "##### Copying contents to git repo #####"
    mkdir -p "$CLONE_DIRECTORY/$DESTINATION_DIRECTORY"
    for file in $SOURCE_FILES; do
        # 获取文件的相对路径
        relative_path=$(dirname "$file")
        # 创建相应的目录结构
        mkdir -p "$CLONE_DIRECTORY/$DESTINATION_DIRECTORY/$relative_path"
        # 复制文件，保留相对路径
        cp -rvf "$file" "$CLONE_DIRECTORY/$DESTINATION_DIRECTORY/$relative_path/"
    done
    cd "$CLONE_DIRECTORY"
    ```

## 碎碎念
这个需求其实我很早就有了，而且思路也很清晰，但一直拖到了现在，而且还是踩了不少坑。写这篇的时候总是想起某位老师的“聪明的程序员也是懒程序员”，我自知并不聪明，但尽量向这个道路走去。

## 参考
- [git diff获取差异文件名显示中文乱码的解决办法_git diff获取差异文件中文乱码的解决办法-CSDN博客](https://blog.csdn.net/hanlizhong85/article/details/80642571)
- [nkoppel/push-files-to-another-repository: github Action to push files into another Github repository](https://github.com/nkoppel/push-files-to-another-repository)
- [tj-actions/changed-files: :octocat: Github action to retrieve all (added, copied, modified, deleted, renamed, type changed, unmerged, unknown) files and directories.](https://github.com/tj-actions/changed-files)
- [Workflow commands for GitHub Actions - GitHub Docs](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#environment-files)