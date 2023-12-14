---
title: Linux内核编译
slug: compile the Linux kernel
date: 2023-12-14T17:07:22+08:00
tags:
  - 笔记
  - 操作系统
  - Linux
categories:
  - 学习
summary: 记一次操作系统实验
---

## 步骤
1. 在[The Linux Kernel Archives](https://www.kernel.org/)下载所需的内核代码 
2. 解压缩 `tar xvf linux-5.10.203.tar.xz` （以linux-5.10.203.tar.xz为例）
3. `cd linux-5.10.203`
4. `cp -v /boot/config-$(uname -r) .config`
5. `make menuconfig` 进行配置 
6. `make -j$(nproc) 2> error.log`  并发编译,并记录错误信息
7. `make modules`
8. `make modules_install`
9. `make install`
10. `reboot`
11. 在GRUB菜单选择编译好的内核
12. 可使用`uname -r` 查看内核版本，进行验证

---

## 脚本
我编写了一个脚本，用于自动化内核编译

```Makefile 
#!/bin/bash

# 设置在出现错误或使用未定义的变量时立即退出
set -e
set -u

# 获取当前时间戳
timestamp=$(date +"%Y%m%d%H%M%S")

# 配置内核
# make menuconfig

# 创建日志文件，带有时间戳
log_file="compile_log_${timestamp}.txt"
touch "$log_file"

# 编译内核，将标准错误输出记录到日志文件并显示在终端
make -j$(nproc) INCREMENTAL=1 2> >(tee -a "$log_file" >&2) || { echo "Make failed"; exit 1; }

# 编译内核模块
make modules 2> >(tee -a "$log_file" >&2)

# 安装内核模块
make modules_install 2> >(tee -a "$log_file" >&2)

# 安装内核
make install 2> >(tee -a "$log_file" >&2)

# 更新 GRUB 配置（如果使用 GRUB 引导）
# update-grub 2> >(tee -a "$log_file" >&2)

```

---

## 添加新的系统调用
### hello
**方法一：**

1. 编辑arch/x86/entry/syscalls/syscall_64.tbl,添加
   `441     64      hello                   sys_hello`
2. 在include/linux/syscalls.h中添加函数声明
    ```
    /* test */
    asmlinkage long sys_hello(void);
    ```
3. 在kernel/sys.c中末尾添加如下代码
    ```c
    /* test */
    SYSCALL_DEFINE0(hello)
    {
            printk("hello,world! \n");
            return 1;
    }
    ```

**方法二：**

摘自[How to add system call (syscall) to the kernel, compile and test it? - DEV Community](https://dev.to/omergulen/how-to-add-system-call-syscall-to-the-kernel-compile-and-test-it-3e6p)

1. 在`/usr/src/linux-5.15.142`建立新文件夹(以linux-5.15.142为例)
   `mkdir hello && cd hello`
2. `vim hello.c`
```
#include <linux/kernel.h>

asmlinkage long sys_hello(void) 
{
        //printk prints to the kernel’s log file.
        printk("Hello world\n");
        return 0;
}
```
3. `vim Makefile`
```
obj-y := hello.o
```
4. go to the parent directory (kernel source main directory)
5. add our new syscall directory to Makefile,search for core-y,and add hello/ to the end of this line.
6. 同方法一第一步
7. 同方法一第二步

### hide 
1. 编辑include/linux/sched.h 文件，在task_struct新增
```
        /* wyd: store the old pidS */
        pid_t old_pid;

        /* wyd: 0:hide */
        int hide;
```
2. 修改kernel/fork.c中的copy_process函数
```
        /* wyd: init the append values */
        p->hide =0;
        p->old_pid = p->pid;

```
3. 编辑arch/x86/entry/syscalls/syscall_64.tbl,添加
   `442     common  hide                    sys_hide`
4. 在include/linux/syscalls.h中添加函数声明
```
asmlinkage int sys_hide(pid_t pid,int on);
```
5. 在kernel/sys.c中末尾添加如下代码

**此代码有问题，仅作为示例**
```c
SYSCALL_DEFINE2(hide,pid_t,pid, int,on)
{
        struct task_struct *p;
        struct task_struct *me = NULL;
        p = &init_task;
        do
        {
                if(p->old_pid == pid)
                {
                        me = p;
                        break;
                }
        }while((p = next_task(p)) && (p!= &init_task)):
        if(current->uid != 0 || me == NULL)
                return 0;
        if (on ==1)
        {
                me->pid =0;
                me->hide =1;
        }
        else
        {
                if(me->hide ==1)
                {
                        me->pid = me->old_pid;
                        me->hide = 0;
                }
        }
        return 0;
}
```
1. 修改fs/proc/base.c中proc_pid_lookup的代码，添加
```c
        if (task->hide==1)
                goto out;
```

---

## GRUB
### 默认启动的内核
1. 打开 GRUB 配置文件：
   `sudo vim /etc/default/grub`
2. 找到 GRUB_DEFAULT 行，并更改其值为你想要设置的默认内核的索引,保存并关闭。如
   `GRUB_DEFAULT=2`
3. 更新 GRUB 配置
   `sudo update-grub`

---

## 报错及解决 

### 缺少xxx工具 
可以在编译之前先安装编译所需要的所有工具 
`sudo apt-get install git fakeroot build-essential ncurses-dev xz-utils libssl-dev bc flex libelf-dev bison`

### No rule to make target 'debian/certs/debian-uefi-certs.pem
我参考了[Stack Overflow上的回答](https://stackoverflow.com/questions/67670169/compiling-kernel-gives-error-no-rule-to-make-target-debian-certs-debian-uefi-ce)，执行以下两条命令 
```
sudo scripts/config --disable SYSTEM_TRUSTED_KEYS
sudo scripts/config --disable SYSTEM_REVOCATION_KEYS
```

### sed: can't read modules.order: No such file or directory
参考[Gentoo Forums :: 阅读主题 - sed: can't read modules.order: No such file or directory](https://forums.gentoo.org/viewtopic-p-8686340.html?sid=5a87359186073a04049d6fc85eb51c32)

发现原来是刚才的`make -j$(nproc)`指令并没有执行成功。

### No space left to place
我的选择是重装虚拟机，在设置的时候加大硬盘

看到两篇似乎可行的操作

- [编译内核时，磁盘爆满的问题-CSDN博客](https://blog.csdn.net/m0_61549260/article/details/129751313)


### BTF: .tmp_vmlinux.btf: pahole (pahole) is not available
参考[compilation - BTF: .tmp_vmlinux.btf: pahole (pahole) is not available - Stack Overflow](https://stackoverflow.com/questions/61657707/btf-tmp-vmlinux-btf-pahole-pahole-is-not-available)

`sudo apt install dwarves`

### Warning: os-prober will not be executed to detect other bootable partitions.
- 具体描述：
  `make install`最后得到，
    ```
    Warning: os-prober will not be executed to detect other bootable partitions.
    Systems on them will not be added to the GRUB boot configuration.
    Check GRUB_DISABLE_OS_PROBER documentation entry.
    done
    ```
   看网上的教程，这时候直接重启就可以进到GRUB菜单，但我没有。原因应该是以上导致的。
- 解决：
   我的解决方法是在电脑开机的时候(出现操作系统的开机画面之前)，按F4键进入GRUB菜单

### VMware开启了共享文件夹却不显示
在/mnt 文件夹下执行
`vmhgfs-fuse /mnt/hgfs`

---

## 参考链接 
- [Linux内核编译很简单，6步编译一个自己的内核_0基础编译内核教程-CSDN博客](https://blog.csdn.net/lingshengxueyuan/article/details/117597019)
- [linux - Compiling kernel gives error No rule to make target 'debian/certs/debian-uefi-certs.pem' - Stack Overflow](https://stackoverflow.com/questions/67670169/compiling-kernel-gives-error-no-rule-to-make-target-debian-certs-debian-uefi-ce)
- [Gentoo Forums :: 阅读主题 - sed: can't read modules.order: No such file or directory](https://forums.gentoo.org/viewtopic-p-8686340.html?sid=5a87359186073a04049d6fc85eb51c32)
- [Linux内核编译_linux内核编译后多大-CSDN博客](https://blog.csdn.net/weixin_51480590/article/details/127776698)
- [Ubuntu磁盘扩充_ubuntu扩展磁盘空间-CSDN博客](https://blog.csdn.net/weixin_51480590/article/details/127767660)
- [process - Hiding processes on Unix/Linux - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/534596/hiding-processes-on-unix-linux)
- [Speeding Up Linux Kernel Builds With ccache](https://nickdesaulniers.github.io/blog/2018/06/02/speeding-up-linux-kernel-builds-with-ccache/)
- [How to add system call (syscall) to the kernel, compile and test it? - DEV Community](https://dev.to/omergulen/how-to-add-system-call-syscall-to-the-kernel-compile-and-test-it-3e6p)
- [Adding a New System Call — The Linux Kernel documentation](https://www.kernel.org/doc/html/v4.10/process/adding-syscalls.html)
