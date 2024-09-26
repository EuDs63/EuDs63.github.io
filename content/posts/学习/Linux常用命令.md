---
title: Linux常用命令
date: 2024-04-03T23:15:49+08:00
slug: linux_cheatsheet
tags:
  - Linux
  - 笔记
categories:
  - 学习
summary: a cheatsheet of vim commands
---

## 命令执行
- `cmd1;cmd2` 首先运行命令1，然后运行命令2
- `cmd1&&cmd2` 仅在命令1成功结束时才运行命令2
- `cmd1||cmd2` 仅当命令1失败时才运行命令2
- 执行多次，或循环执行
  ```bash
  #for i in {1..5}; do  // while true; do
  >  command 
  >done
  ```

---

## bash 
- 可以利用 TAB 补全查看所有可用的命令选项(连按两次 TAB 键)
- `~/.bashrc`是 Bash shell 在每次启动时都会自动执行的一个脚本文件,可以用于设置环境变量、别名和一些其他 Bash shell 配置。
  - `source /opt/rh/devtoolset-9/enable` 更新gcc版本
  - export PS1='\[\][\W]\$ \[\]' 修改PS1变量，让其更加简洁。PS1的默认设置为`\[\][\u@\h \W]\$ \[\]`

---

## 管道
### 输出流
- 在Unix/Linux系统中，每个进程都有两个默认的输出流，即标准输出（文件描述符1，stdout）和标准错误输出（文件描述符2，stderr）
- 用`|`连接两个命令，以前面一个命令的输出作为后面命令的输入
- `strace -f gcc a.c 2>&1 | vim -` This will pipe both stdout and stderr to vim. The `-` argument tells vim to read from stdin.
- `strace pmap 152 |& vim - `
    `|&` : This is a shorthand for `2>&1 |` in bash and zsh. It passes both standard output and standard error of one command as input to another.
- `find / -newermt "2022-12-31 23:00" ! -newermt "2023-01-01 01:00" 2>/dev/null`
  - 查找 2022年12月31日23:00 到 2023年1月1日1:00 期间发生变动的文件
  - `2>/dev/null` 丢弃错误信息

---

## crontab
- `crontab -e` 
- 注意：crontab运行的环境并不包含docker命令。需要指定完整的路径。

## 进程
### ps 
- `ps`: 显示当前终端窗口关联的进程
- `ps aux`: 显示所有用户的详细进程列表，包括进程的PID（进程ID）、CPU利用率、内存使用等信息

### lsof
- `lsof -i:端口号`:查看端口占用情况
- `lsof -nP -iTCP -sTCP:LISTEN`
- > -n inhibits the conversion of network numbers to host names for network files.  Inhibiting conversion may make lsof run faster.It is also useful when host name lookup is not working properly.
- >-P inhibits the conversion of port numbers to port names for network files.  Inhibiting the conversion may make lsof run a little faster.  It is also useful when port name lookup is not working properly.

### others
- `kill -9 PID`:杀掉对应的进程

--- 

## `tar`
  - `tar cvf file.tar *.c` creates a tar file called file.tar which is the Archive of all .c files in current directory. 
  - `tar xvf file.tar` extracts files from Archives. 
  - `z`tells tar command that creates tar file using gzip 即`tar.gz`

---

## find 
- 配合grep查找文件内关键字
  
  `seq 1 10 | xargs -n2 -P5 sh -c 'find / -type f -mindepth $1 -maxdepth $2 -exec grep -inl "keyword" {} 2>/dev/null \;' _`
- find查找指定时间段内变动的文件
  
  `find / -newermt "2022-12-31 23:00" ! -newermt "2023-01-01 01:00" 2>/dev/null`
- 查找根目录下的所有可执行文件，但排除/usr目录
  
  `find / -path /usr -prune -o -type f -executable`

---

## 查看信息 
- 查看架构 `arch`
- 查看内核版本
  - `uname -r`
  - `uname -a`
  - `cat /proc/version`

---

## 杂项
- `sudo passwd root`: 修改root用户的密码
- `su` 切换用户，默认为切换到root用户
- `strace`  追踪程序系统调用
- `touch` 新建文件,内容为空
- `cat` 
  - `cat filename` To view a single file
  - `cat [filename-whose-contents-is-to-be-copied] > [destination-filename]` Copy the contents of one file to another file. 
  - `cat file1 >> file2` Cat command can append the contents of one file to the end of another file.
- `sort -nk 6` 依第6列升序排列
- `grep` (global regular expression)  用于查找文件里符合条件的字符串或正则表达式
- `which` 查找安装路径 如`which docker`
- `alias`
  - `alias name='command line'`
  - 列出目前所有的别名设置 `alias`
  - 持久化: 添加到`~/.bashrc`即可
- [Retrieve Contents over HTTP without curl or wget](https://i.hsfzxjy.site/a-trick-to-retrieve-web-contents-without-curl-or-wget/ )

--- 

## 参考链接
- [find命令在应急中的高效排查技巧 – Zgao's blog](https://zgao.top/find%e5%91%bd%e4%bb%a4%e5%9c%a8%e5%ba%94%e6%80%a5%e4%b8%ad%e7%9a%84%e9%ab%98%e6%95%88%e6%8e%92%e6%9f%a5%e6%8a%80%e5%b7%a7)