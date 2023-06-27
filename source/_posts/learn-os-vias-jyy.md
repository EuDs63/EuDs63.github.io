---
title: [操作系统：设计与实现 (2022 春季学期)](https://jyywiki.cn/OS/2022/)笔记
tags:
  - 操作系统
  - 笔记
  - 记录
categories:
  - 学习
date: 2023-06-27 18:37:47
excerpt: 操作系统就是状态机
---

**[操作系统：设计与实现 (2022 春季学期)](https://space.bilibili.com/202224425/channel/collectiondetail?sid=192498)的学习笔记**

### p3 多处理器编程：从入门到放弃 (线程库；现代处理器和宽松内存模型)
- 并发程序的三个麻烦
  - 原子性
  - 顺序
  - 可见性

- gcc 编译
  - 不优化,并查看汇编代码
  `gcc -c -O1 sum.c && objdump -d sum.o`
  - `asm volatile("" : : "memory"); // compiler barrier`
- 统计次数
  ` ./a.out | head -n 1000 | sort | uniq -c`
- 现代处理器
  - 也是动态编译器：汇编指令也是由多个uop所组成的。
  - 维护一个uop的“池子” 指令的有向无环图
  - 乱序执行，顺序提交

### p4 理解并发程序执行 (Peterson算法、模型检验与软件自动化工具) 
- C语言的形式语义
  - 全局变量加多个栈帧；每个栈帧有其局部变量和pc
- Peterson算法
  - 看上去是谦让的，但其实是自私的
  - 证明正确性：画出状态机
    - 困境：不敢不画，不敢乱画
    - 解决： [model-checker](https://jyywiki.cn/pages/OS/2022/demos/model-checker.py)
    - 把程序的问题变成图论的问题
      - safety 红色状态不可达
      - liveness : 从任意状态出发，都能到达绿/蓝色状态 强连通分量
  - 许多重要的想法，凝练以后就是概念
- 并发程序 = 状态机
- Python generator
    - e.g.
      ```Python
      def numbers(init=0,step=1):
          n = init
          while Trye:
          n += step
          yield n
      g = numbers()
      g.__next__()
      ```

### p5 并发控制：互斥 (自旋锁、互斥锁和 futex)
- 不能解决问题的时候，可以找到所依赖的假设，并大胆地打破它
- spin 线程直接共享 locked
- mutex 通过系统调用访问 locked
- futex(Fast Userspace muTexes)
  - Fast path: 一条原子指令，上锁成功立即返回
  - Slow path: 上锁失败，执行系统调用睡眠

## p6 并发控制：同步 (条件变量、信号量、生产者-消费者和哲♂学家吃饭问题)
- 思考： 有一堆任务，平均切分成n堆。有x个线程负责完成该任务(x < n) 一个线程一次只能完成一个任务，完成后会自动去做下一个任务。要怎么实现？
- 有万能的方法，就要用万能的方法。
  - 他是这样诠释的。当项目代码量不大（一千行以内），项目还是比较好维护的，这时候用写聪明的写法没问题。但当项目到了几万行甚至几百万行时，这时候就需要多个人来进行协作。而人和人之间最大的障碍就是无法完全沟通，理解对方的心意。
  - 不要试图用聪明的办法解决并发问题
  - 个人想法：第一次听这种说法，有一定道理。
- 万能同步方法 —— 条件变量(Conditional Variables )
  - API
    - wait(cv, mutex) 💤
      调用时必须保证已经获得 mutex
      释放 mutex、进入睡眠状态
    - signal/notify(cv) 💬 私信：走起
      如果有线程正在等待 cv，则唤醒其中一个线程
    - broadcast/notifyAll(cv) 📣 所有人：走起
      唤醒全部正在等待 cv 的线程
  - 
    ```c
    // 需要等待条件满足时
    mutex_lock(&mutex);
    while (!cond) {
      wait(&cv, &mutex);
    }
    assert(cond);
    // ...
    // 互斥锁保证了在此期间条件 cond 总是成立
    // ...
    mutex_unlock(&mutex);

    // 其他线程条件可能被满足时
    broadcast(&cv);
    ```
  - debug -> 隔离出bug触发的最小条件

## p7 真实世界的并发编程 (高性能计算/数据中心/人机交互中的并发编程)
- 谈block chain > 是个很好的技术。但觉得不太对。因为造成了相当大的资源浪费。
- [What's so special about the Mandelbrot Set? - Numberphile](https://www.youtube.com/watch?v=FFftmWSzgmk&ab_channel=Numberphile)
- [atanunq/viu](https://github.com/atanunq/viu)
- 搜索降低了知识的获取成本，ChatGPT等再一次降低了成本。
- go语言，编程友好、性能优化
- 博客是web2.0 的第一步
- Ajax (Asynchronous JavaScript + XML)
- 这次课中讲了三种并发编程，根据不同的需要，实现并发的方式也不同。
  
## p8 并发 bug 和应对 (死锁/数据竞争/原子性违反；防御性编程和动态分析)
- 软件是需求在计算机数字世界的投影。
- assert的使用
- 没有工具不做系统
- premature optimization is root of all evil
- 编程语言的缺陷——对程序员的完全信任：因为计算资源的宝贵
- 动态分析工具 `-fsanitize`
- Canary msvc 中 debug mode 的canary  `(b'\xcc' * 80).decode('gb2312')`

## p9 操作系统的状态机模型 (操作系统的加载; thread-os 代码讲解)
- 大学的真正意义:f将已有的知识和方法重新消化，为大家建立好 “台阶”，在有限的时间里迅速赶上数十年来建立起的学科体系。

## p10 状态机模型的应用 (细胞自动机; gdb/rr/perf; 代码验证工具)
- 分布式系统也是一种并发程序，但要更复杂。因为并发程序假设了每个thread都能正常运行，而分布式系统则要考虑节点丢失的情况。

## p11 操作系统上的进程 (最小 Linux; fork, execve 和 exit)
- Linux 操作系统启动流程
  CPU Reset → Firmware → Loader → Kernel _start() → 第一个程序 /bin/init → 程序 (状态机) 执行 + 系统调用
- Fork Bomb:
  `:(){:|:&};:`
  ```bash
  :() {         # 格式化一下
  : | : &
  }; :
- stdout:
  终端: line buffer
  pipe , file :full buffer (除非显示地调用fflush)
  ```
- **fork**
  - 程序就是状态机，正在执行的程序也是状态机，fork创建状态机的副本；
  - 创建的进程返回+1，子进程返回为0 
  - 把所有的寄存器和内存都复制
- **execve**
  - 将当前运行的状态机重置成成另一个程序的初始状态
- **_exit**


## p12 进程的地址空间 (pmap; vdso; mmap; 游戏修改器/外挂)
- 端序
  - 大端 (big endian): 低地址存放*高*有效字节
  - 小端 (little endian): 低字节存放*低*有效字节
- 工具使用
  - gdb
  - readelf
  - pmap
- 计算机世界没有魔法。因为程序就是状态机。
- vdso:不进入操作系统内核，实现系统调用
- mmap：  
- 文件=字节序列；内存=字节序列； everything is a file

## p13 系统调用和 Shell (freestanding shell, 终端和 job control)
- cd是内部命令：改变当前目录是用系统调用实现的
- `strace -f gcc a.c 2>&1 | vim -` This will pipe both stdout and stderr to vim. The `-` argument tells vim to read from stdin.
- `strace pmap 152 |& vim - `
   `|&` : This is a shorthand for `2>&1 |` in bash and zsh. It passes both standard output and standard error of one command as input to another.
- fish, zsh 和 bash 都是常用的命令行 shell; sh是比较原始的
- clear 清屏
- `,./a.out &`  后台执行./a.out

## p14 C 标准库的实现 (系统调用的封装；内存空间管理)
- 文件描述符还是不理解。印象中这是第二次谈到了"everything is a file"
  - os的对象和对象的访问
- gdn的使用
  - `No symbol table is loaded.  Use the "file" command`。可能是编译选项未包含debug信息,如gcc没有添加-g选项。
- premature optimization is the root of all evil.
- 脱离workload谈优化就是耍流氓
- 经典的设计：
  - fast path
  - slow path

## p15 fork 的应用 (文件描述符的复制；写时复制；创建平行宇宙的魔法)
- fork 状态机复制包括持有的所有操作系统对象
- 包括持有的所有操作系统对象
- 文件描述符（file discriptor）
  - 一个指向操作系统内对象的 “指针”
  - dup() 的两个文件描述符是共享 offset
- 访问空指针也会造成缺页中断
- “Copy-on-write” 只有被写入的页面才会复制一份
  - 被复制后，整个地址空间都被标记为 “只读”
  - 操作系统捕获 Page Fault 后酌情复制页面
  - fork-execve 效率得到提升
- 操作系统会维护每个页面的引用计数
- 定义进程所占用的内存
- page是归os所有的，而非进程
- 使用fork来搜索并行化。

## p16 什么是可执行文件 (调试信息；Stack Unwinding；静态链接中的重定位)
- 可执行文件描述了状态机，是一个描述了状态机的初始状态 + 迁移的数据结构
- os没有魔法，所有东西都有解释
- `She-bang` `#! interpreter [optional-arg]`
- GNU binutils
  - 生成可执行文件
    - ld (linker), as (assembler)
    - ar, ranlib
  - 分析可执行文件
    - objcopy/objdump/readelf
    - addr2line, size, nm
- `objdump -d a.out | less` disasm
- `addr2line 401122 a.out`
- elf: 小精灵；dwarf：矮人
- 将一个 assembly (机器) 状态映射到 “C 世界” 状态很难
- gcc等仍存在着许多不完美
- 编译器，汇编器，链接器

## p17 动态链接和加载 (静态 ELF 加载器实现；调试 Linux 内核；动态链接和加载)
- 自定义了一个二进制格式文件
- GOT ： global offset table
- PLT : procedure linkage table

## p23 1-Bit 数据的存储 (延迟线/磁芯/DRAM/SRAM/磁带/磁盘/光盘/Flash SSD)
- volatile: 确保该变量的实际值与内存中的值一致,每次读取都是最新值,也禁止编译器对其进行优化。
- core dumped 磁性内存年代开始的概念。
- 局部性原理 -> 可以按照大块来读写

## p24 输入输出设备模型 (串口/键盘/磁盘/打印机/总线/中断控制器/DMA 和 GPU
- DMA: direct memory access : 一个专门执行"memcpy"程序的cpu
- IPC: Instruction per second
- GPU: 
  - 一个通用计算设备
  - 大量并行相似的任务
- 异构计算：都能做，但选那个最合适的。（jjy在22年说的现在已经能感觉到有相关的趋势了。不过倒不是里面举例的挖矿，而是llm模型）

## p25 设备驱动程序 (Linux 设备驱动; GPU 和 CUDA; 存储设备抽象)
- 设备抽象成 支持各类操作的对象 (文件)
  - read - 从设备某个指定的位置读出数据
  - write - 向设备某个指定位置写入数据
  - ioctl - 读取/设置设备的状态
- `stty -a`
- GPU
  - Single Instruction, Multiple Thread
- 读优先的正确性

## p26 文件系统 API (设备在应用间的共享；目录和文件 API)
- 信息的局部性
- Windows从c盘开始时是受其前身Dos系统的影响，那个有a、b
- `mount disk.img  /mnt`
- `umount /mnt`
- 硬（hard）链接 
  - `ln /usr/local/python3 python`
  - 目录中仅存储指向文件数据的指针
  - 允许一个文件被多个目录引用.
  - 无法用来链接目录，也不能跨文件系统
  - 通过`ls -i`查看是否为硬链接
- 软 (symbolic) 链接
  - “快捷方式”
  - ` ln -s ../p24 p24` 
  - 目录从“树”变为了“图”，还是有环图
- `cd`的特殊性
  - 每个进程都有一个对应的工作目录（pwd），而这个目录只有系统调用才能够修改

## p27 FAT 和 UNIX 文件系统 (数据结构视角的文件系统; FAT 手册导读和目录树遍历)
- 数据结构的假设：数据是以字节来存储的。
- RAM 和 block的区别
- FAT(File Allocation Table)
  - 将指针集中存放在文件系统的某个区域
  - 适合小文件
  - 会产生碎片（fragmentation）
  - 基本假设
    - 链表无环且长度和文件大小一致
    - FREE的cluster不能有入边
- cluster 
- sector
- ext2
  - 大文件的随机读写性能提升明显 (O(1))
  - 支持链接 (一定程度减少空间浪费)
  - inode 在磁盘上连续存储，便于缓存/预取
  - 碎片

## p28 持久数据的可靠性 (RAID; 崩溃一致性; FSCK 和日志)
- 虚拟化
  - cpu的虚拟化：通过分时等技术让多个进程并行，相当于虚拟出了多个cpu
  - 内存的虚拟化：一份内存通过mmu，虚拟成每个进程的地址空间
  - RAID：反向的虚拟化：多个磁盘虚拟化一个磁盘
- RAID
  - RAID0 : 交错排列： 提升容量和带宽
  - RAID1 : 提升容错和读带宽
  - RAID4 : 额外的一块校验盘
    - 致命缺陷：随机写的性能只能有校验盘性能的一半
  - RAID5 : Rotating Parity
- RAID带来的联想：
  多个磁盘虚拟化为一个又大又快又可靠的磁盘，多台电脑虚拟化为一个又大又快又可靠的电脑
  那能不能多个神经网络虚拟化为一个更好的神经网络
- 崩溃一致性  (Crash Consistency)
  - 场景：写入的时候突然断电了怎么办？
  - 方法1：按照一定顺序来写，且 “all or nothing”
    - 困难：磁盘不提供多块读写 “all or nothing” 的支持，甚至为了性能，没有顺序保证。
  - 方法2： File System Checking (FSCK)
    - 根据磁盘上已有的信息，恢复出 “最可能” 的数据结构
    - 困难：难；如果修复的时候再掉一次电？
  - 方法3： 日志
  - 具体：
    - 数据结构操作发生时，用 (2) append-only 记录日志
    - 日志落盘后，用 (1) 更新数据结构
    - 崩溃后，重放日志并清除 (称为 redo log；相应也可以 undo log)
  - 优化: journaling (jdb2)

## p30 现代存储系统 (关系数据库和分布式存储系统)
- 数据库
  - 关键
    - 索引
    - 查询优化
  - magic：你只管写sql语句，相应的搜索优化它来做
  - 要求：acid
    - Atoming
    - Consistency
    - Isolation
    - Durability
- 图灵奖
  - 这门课听下来，听到了好多知识点背后都是获得过图灵奖的研究，甚至开创了一整个产业。
- 关系型数据库跟不上社交网络的需求
- cap theorem
  - Consistency
  - Availability
  - Partition Tolerance
- 分布式存储系统

##  感想
蒋炎炎这门课还是别人推荐的。第一次看到还不以为意，但出现的次数多了就觉得有必要去看看。发现是一大惊喜。

## 收获
1. 原版书能看得下来了。大段的英文，之前看着有点怕，现在觉得也能看下来，并且速度还可以。

## 课外资料
- [上下文切换的代价](https://plantegg.github.io/2022/06/05/%E4%B8%8A%E4%B8%8B%E6%96%87%E5%88%87%E6%8D%A2%E5%BC%80%E9%94%80/)
- [CPU的制造和概念](https://plantegg.github.io/2021/06/01/CPU%E7%9A%84%E5%88%B6%E9%80%A0%E5%92%8C%E6%A6%82%E5%BF%B5/)

