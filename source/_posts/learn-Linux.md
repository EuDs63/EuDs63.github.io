---
title: learn Linux
tags:
  - 笔记
  - 操作系统
  - Linux
categories:
  - 学习
date: 2023-03-19 18:38:50
excerpt:
---
## Linux命令
- `ctrl + C` 打断执行
- `pwd` 输出当前位置
- `cmd1;cmd2` 首先运行命令1，然后运行命令2
- `cmd1&&cmd2` 仅在命令1成功结束时才运行命令2
- `cmd1||cmd2` 仅当命令1失败时才运行命令2
- `strace`  追踪程序系统调用
- `touch` 新建文件,内容为空
- `cat` 
  - `cat filename` To view a single file
  - `cat [filename-whose-contents-is-to-be-copied] > [destination-filename]` Copy the contents of one file to another file. 
  - `cat file1 >> file2` Cat command can append the contents of one file to the end of another file.
- 管道；用`|`连接两个命令，以前面一个命令的输出作为后面命令的输入
  - `strace -f gcc a.c 2>&1 | vim -` This will pipe both stdout and stderr to vim. The `-` argument tells vim to read from stdin.
  - `strace pmap 152 |& vim - `
     `|&` : This is a shorthand for `2>&1 |` in bash and zsh. It passes both standard output and standard error of one command as input to another.
- `sort -nk 6` 依第6列升序排列
- 执行多次，或循环执行
  ```bash
  #for i in {1..5}; do  // while true; do
  >  command 
  >done
  ```
- crontab的使用
  - `crontab -e` 
  - 注意：crontab运行的环境并不包含docker命令。需要指定完整的路径。
- `lsof -i:端口号`查看端口占用情况
- `kill -9 PID` 杀掉对应的进程
- `grep` (global regular expression)  用于查找文件里符合条件的字符串或正则表达式
- `which` 查找安装路径 如`which docker`
- `ls -l` 详细信息
- `~/.bashrc`是 Bash shell 在每次启动时都会自动执行的一个脚本文件,可以用于设置环境变量、别名和一些其他 Bash shell 配置。
  - `source /opt/rh/devtoolset-9/enable` 更新gcc版本
  - export PS1='\[\][\W]\$ \[\]' 修改PS1变量，让其更加简洁。PS1的默认设置为`\[\][\u@\h \W]\$ \[\]`
- `tar`
  - `tar cvf file.tar *.c` creates a tar file called file.tar which is the Archive of all .c files in current directory. 
  - `tar xvf file.tar` extracts files from Archives. 
  - `z`tells tar command that creates tar file using gzip 即`tar.gz`
- 可以利用 TAB 补全查看所有可用的命令选项(连按两次 TAB 键)
## 汇编相关
- `objdump -d filename` print the assembler content of the sections capable of execution.
- `objdump -s filename`  print the complete content of all the sections of the file

## gcc
  - `gcc - E a.c` 对a.c进行宏展开
  - 升级gcc版本到gcc9 [CentOS7 升级gcc版本到gcc9](https://blog.csdn.net/xunye_dream/article/details/108918316)
    `source /opt/rh/devtoolset-9/enable`
  - `-static` 静态编译，省去动态链接相关的系统调用

## vim
- cmd模式
  - `:!cmd ` execute a shell command from within Vim
    - `!gcc %` 编译
    - `!xxd`  将当前文件转换为十六进制表示并显示在终端中
    - `%!xxd` 将当前文件的内容通过管道传递给外部命令xxd，并将其输出替换为当前文件的内容
  - `:set nu` 显示行号
  - `:set wrap`
  - `:%!grep execve`
  - `:%! grep -v ENOENT`
  - `:%s/term/another_term/g ` 替换
- visual模式 按v进入
  - `y` 复制选中内容
  - `d` 删除
- `u` undo
- 

## gdb
- 编译时要带`-g`
- `bt` :but trace

---

## 参考链接
- [Cat command in Linux with examples](https://www.geeksforgeeks.org/cat-command-in-linux-with-examples/)
- [CentOS7 升级gcc版本到gcc9](https://blog.csdn.net/xunye_dream/article/details/108918316)
- [操作系统：设计与实现 (2022 春季学期)](https://jyywiki.cn/OS/2022/)
- [Linux 定时执行shell 脚本](https://blog.csdn.net/lc013/article/details/103775702)
- [tar command in Linux with examples](https://www.geeksforgeeks.org/tar-command-linux-examples)