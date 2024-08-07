---
title: 进一步学习git
date: 2023-10-28T15:34:14+08:00
slug: dive into git
tags:
  - 笔记
  - git
categories:
  - 学习
summary: the information manager from hell
---
**使用git已经有一段时间了，在感受到其便利的同时，我开始好奇它究竟是如何实现的。**

**这篇文章主要是对参考链接中的几篇文章的结合和整理，我自己原创的内容并不多，算是我的阅读笔记。**

## 3 main components
### blob(binary large object)
1. git用于存储文件内容的基本数据对象
2. 只包含文件内容的原始二进制数据。
3. 唯一标识符是由其内容计算得到的 SHA-1 散列值,计算方法如下：
    ```python
    # find-git-object.py
    # https://jvns.ca/blog/2023/09/14/in-a-git-repository--where-do-your-files-live-/
    import hashlib
    import sys

    def object_path(content):
        header = f"blob {len(content)}\0"
        data = header.encode() + content
        digest = hashlib.sha1(data).hexdigest()
        print(digest)
        return f".git/objects/{digest[:2]}/{digest[2:]}"

    with open(sys.argv[1], "rb") as f:
        print(object_path(f.read()))
    ```
4. git使用上一步所得到的digest来确定文件所存储的位置。这种方法被称为“content addressed storage”。
5. 由上可以发现：若文件内容完全相同，那么文件内容就将存储在同一个blob对象中。
6. 确定位置后，我们使用`file`可以得到文件的类型`zlib compressed data`,并可使用以下python代码进行解码
    ```python
    # https://jvns.ca/blog/2023/09/14/in-a-git-repository--where-do-your-files-live-/
    # 可用来解码blob或commit文件
    # 简易版的 git cat-file -p
    import zlib
    import sys

    with open(sys.argv[1], "rb") as f:
        content = f.read()
        print(zlib.decompress(content).decode())
    ```

### commit 
1. 表示一次代码提交或版本更新的操作
2. a commit file contains tree, parent commit(if any), author, committer.
3. Commit file will be hashed and store in the same way as blob.
4. 可以通过`git log`获取commit对应的sha-1值,并使用`git cat-file -p <commit_hash>`观察对应的commit文件,例如：
    ```bash 
    > git cat-file -p a2392bba4e795aa1041ce4464c2da00391b51913

    tree 3b8155bcfb149e4cf627c2011eeef58b28e50348
    parent 3b43a50eb349f2f8126735ab1e133004bab0a933
    author EuDs63 <erica23187@gmail.com> 1698421602 +0800
    committer EuDs63 <erica23187@gmail.com> 1698421602 +0800

    add test.txt
    ```
5. 每个 commit 对应的parent commit可以是零个、一个，或多个

### tree 
1. 用于构建和维护项目的目录结构
2. Each folder match a tree file which stores the structure of files and folders of the folder.
3. Tree file will be hashed and store in the same way as blob.
4. 同样可以通过`git log`获取对应的sha-1值,并使用`git cat-file -p <tree_hash>`观察对应的tree文件
    ```bash
    > git cat-file -p 3b8155bcfb149e4cf627c2011eeef58b28e50348

    100644 blob 4b6e76588c44ca2a580f982c63f14200b4bffc3f    decompress.py
    100644 blob 211d3833fbe6ed59e66b38bbe643b5f7141ae53c    find-git-object.py
    100644 blob f100ad94f6be76f58fadaf9e720d9d00d486a088    test.txt
    100644 blob 131b0c74e5e1c21c7c9b830a57df7b8dadb5eda7    test1.txt
    ```
5. 注意到`100644`这个数字，这表示该 Git 对象的类型和模式。
   具体来说:

    前4位1006表示对象类型:
    1000 - 普通文件(blob 对象)
    1006 - 可执行文件(blob 对象)
    1007 - 符号链接(blob 对象)
    1010 - 树(tree 对象)
    1011 - 提交(commit 对象)
    1114 - Gitlink(blob 对象)
    后4位44表示文件模式,这在Unix系统中代表文件权限:
    100644表示普通文件,权限是-rw-r--r--
    100755表示可执行文件,权限是-rwxr-xr-x

---

## branch 
1. Branches are stored in ` .git/refs/heads `.
2. Branches are files tracking commits, and the content of these files is updated at every commit we perform.
3. 对remote branch的认识:
    There are potentially three versions of every remote branch:
    1. The actual branch on the remote repository
    2. The snapshot of that branch locally
    3. A local branch that might be tracking the remote branch

--- 

## head
1. Head are stored in `.git/HEAD`
2. 通常情况下，HEAD文件中的内容为`ref: refs/heads/<branch_name>`,由此来间接指向该分支的最新commit。
3. When we are on a branch and perform the commit, Git reads the content of the HEAD file and writes the commit which is referenced as the parent commit.
4. We can checkout to a previous commit by `git checkout <commit_hash>`. Thus we will enter a mode called “detached mode” . In this mode, HEAD will point directly to a commit.

--- 

## what happened after git checkout
1. 解析命令行参数：首先，Git 解析命令行参数，以确定用户想要执行的 git checkout 操作的类型，包括切换分支、检出文件等。

2. 获取目标分支/提交的 SHA-1 值：根据命令行参数中提供的分支名或提交标识符，Git 获取目标分支或提交的 SHA-1 值.

3. 检查工作目录状态：Git 在切换分支或提交之前会检查当前工作目录状态，以确保没有未提交的更改。

4. 切换到目标分支/提交：如果用户想要切换分支，Git 将会使用目标分支的 branch_name 更新 HEAD 引用，同时将目标分支的文件状态写入工作目录。如果用户要检出特定提交，Git 会根据提交的 SHA-1 值更新 HEAD 引用，并将提交的文件状态写入工作目录。

5. 重建工作目录：在切换分支或提交后，Git 会确保工作目录的文件和内容与目标一致。它可能会涉及文件的创建、更新和删除操作。(根据commit文件中的tree去逐层展开)

6. 更新索引和暂存区：Git 更新索引，以反映工作目录中文件的状态。这涉及将工作目录的文件与索引中的文件状态进行比较，并记录更改。（暂存区是介于Working Directory和 Repository 之间的区域，用于存放已经使用 git add 命令添加但尚未提交的文件和更改。）

7. 更新 HEAD 指针：最后，Git 更新 HEAD 引用，将其指向所选的目标分支或提交，以反映当前的状态。

## how `git log <filename>` works
1. go through every single commit in the history
2. go through the various directory trees
3. search for the filename we wanted

## about git submodule
todo!

## how does git diff works 
to do!

## git reset hard|soft|mixed
to do!

## git rebase
to do!

## git hook
- [Git - Git 钩子](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90 )
- 如何在本地监听git tag事件


## 收获
- 之前看过一句话，"In Linux and UNIX, everything is a file"。现在发现git中也是这样设计的。
- 了解平时使用的工具是怎么做到的，尤其是一些不了解之前觉得很神奇的操作背后的原理，我觉得这挺有趣。

## 碎碎念
距离这篇文章的创建已经小半年了，那位作者已经写了近10篇git相关的博文。我学习的进度甚至比不上其写作的进度，不禁叹服。希望未来的我能好好看完。

## 参考链接
- [In a git repository, where do your files live?](https://jvns.ca/blog/2023/09/14/in-a-git-repository--where-do-your-files-live-/)
- [github-action-push-to-another-repository/entrypoint.sh at main · cpina/github-action-push-to-another-repository](https://github.com/cpina/github-action-push-to-another-repository/blob/main/entrypoint.sh)
- [How Git truly works. A deep dive on the internals to… | by Alberto Prospero | Towards Data Science](https://towardsdatascience.com/how-git-truly-works-cd9c375966f6)