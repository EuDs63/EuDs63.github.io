---
title: 操作系统复习笔记
tags:
  - 笔记
  - 操作系统
categories:
  - 学习
date: 2023-06-19T18:35:11+08:00
summary: 操作系统复习笔记
---
# 期末复习

## Chpter 3 Process
- 操作系统进行任务调度和资源分配的基本单位
- Process include:
  1. Program code 
    - text section		
  2. program counter and processors’ registers
  3. Stack
    - Function parameters
    - Return address
    - Local variables
  4. data section
    - Global variables 
  5. Heap
    - Dynamically allocated memory
- Process State
  - 五态模型
    - new
    - ready:waiting to be assigned to a processor
    - waiting: waiting for some event to occur
    - running
    - terminated
- Process control block（PCB）
  - 包含信息有：
    - Process number
    - Process state
    - Program counter
      - 下条指令的地址
    - CPU registers
    - CPU scheduling information
    - Memory-management information
    - Accounting information
    - I/O status information
### Process Scheduling
- Scheduling queues
  1. Job queue 
    - set of all processes in the system
    - As processes/job enter the system，they are put into the job queue
  2. Ready queue 
    - set of all processes residing in “(main) memory”, ready and “waiting” to execute
  3. Device queues 
    - set of processes waiting for an I/O device
- Scheduler(调度器)
  1. Long-term scheduler or job scheduler
    - job queue -> ready queue
    - may  be absent on Time-sharing system such as UNIX  and Windows
      - They put every new process in memory for the short-term scheduler

  2. Short-term scheduler Or CPU scheduler: 进程调度
    - selects which process should be executed next and allocates CPU
    - 因为其执行十分频繁，所以每次选择不能耗时太长，否则就overhead

  3. Medium-term scheduler Or swapping
    - swap out: removes processes from memory to disk and reduces the degree of multiprogramming
    - swap in: introduce process into memory

- Context Switch
  - CPU switches to another process

### Operations on Processes
1. fork()
   - The new process consists of a copy of the address space of the original process
   - The return code for the fork() is zero for the child process
   - 子进程会复制父进程的地址空间和资源，但并不会复制父进程的线程

### Interprocess Communication
- Shared memory
- Message passing

### 名词解释：
  - multiprogramming： is to have some process running at all times, to maximize CPU utilization
  - time sharing ： is to switch the CPU among processes so frequently that users can interact with each process

## Chapter 4 Thread
- 进程 vs 线程
  - 线程是CPU的分布单位
  - 进程是资源的分布单位
  - 线程是进程中的执行单元
    - 一个进程可以包含多个线程，它们共享相同的地址空间和系统资源，如open files, signals。
    - 每个线程有自己的栈空间和执行上下文，但它们在同一个进程内共享代码段、数据段和堆等资源。
- benefits of multithreaded programming 
  1. Responsiveness
  2. Resource sharing
  3. Economy
  4. utilization of multiprocessor architectures

### Multithreading Models
- 两种线程
  - User Threads
    - Provided by a thread library at the user level
  - Kernel Threads
    - Provided and managed by the OS directly
- Relationship between kernel threads and user threads
  1. Many-to-one model
  2. One-to-one model- 
  3. Many-to-many model
  4. Two-level Model
     - 主体是Many-to-many model
     - A user thread (important task) can be bound to a kernel thread 

- Two versions of fork() in UNIX systems
  1. To duplicate all the threads
     - If exec() is not called after forking, then to duplicate all threads
  2. To only duplicate the thread that invoked the fork() system call
     - If exec() is called immediately after forking, then only to duplicate the calling threads

## Chapter 5 CPU Scheduling
### Basic Concepts
- CPU scheduling decisions may take place when a process:
  1. Switches from running to waiting state
      - The result of  an I/O request
      - An invocation of wait for the termination of one of the child processes （e.g. wait(NULL);）
  2. Switches from running to ready state
      - When a interrupt occurs
  3. Switches from waiting to ready
      - Completion of I/O
  4. Terminates
- Non-preemptive (非剥夺)
  - Once the CPU has been allocated to a process, the process keeps the CPU until it releases the CPU 
  - 调度只可能发生在情况 1. 和 4.
  - 简单，硬件要求低
- Preemptive(剥夺)

### Scheduling Criteria
1. CPU utilization
2. CPU throughout
   - number of processes that complete their execution per time unit.
3. Process turnaround time 
   - From the time of submission of a process to the time of completion, include
      - Waiting to get into memory
      - Waiting in the ready queue
      - Executing on the CPU
      - Doing I/O
4. Process waiting time (等待时间)
    - amount of time that a process spent waiting in the ready queue.
5. Process response time (响应时间)
    - amount of the time from the submission of a request until the first response/result is produced

### Scheduling Algorithms
  1. First come first served (FCFS) 
     - non-preemptive
     - Convoy effect (护航效应)
  2. Shortest job first (SJF) 
     - minimum average waiting time 
     - 种类
       1. Preemptive SJF allows to preempt the currently executing process
       2. Non-preemptive
     - 比较适用于长程调度
  3. Priority scheduling 
     - 问题：starvation
     - 解决： Aging (时效) – as time progresses increase the priority of the process
  4. Round robin (RR) 
     - Is designed for especially for time-sharing systems
     - preemptive
     - time quantum
       - 需要保证 80%的cpu bursts < the time quantum
     - Response time = 2*(n-1)*q
  5. Multilevel queue algorithm 
  6. Multilevel feedback queue algorithm 
     - the most general scheduling algorithm

### Multiple-Processor Scheduling
- homogeneous vs. heterogeneous CPUs
  - homogeneous: 各处理器都一样
- Approaches to multiple-processor scheduling
  - Asymmetric multiprocessing 
    - only one processor (the master server) has all scheduling decision, I/O processing
  - Symmetric multiprocessing
    - each processor is self-scheduling

## Chapter 6 Process synchronization
- Race condition 
  - The situation where several processes access and manipulate shared data concurrently. 
  - The final value of the shared data depends upon which process finishes last.

### The Critical-Section Problem
- critical section
  - Each process has a code segment, called critical section, in which the shared data is accessed
  - 有几个共享变量就有几个临界区

- Criteria for the critical section problem solution
  1. Mutual exclusion 互斥
  2. progress 空闲让进
  3. Bounded waiting 有限等待

- Peterson’s Solution
  - 举手+令牌

- hardware-based solution 
  - 关中断
    - 多处理机不适合
  - 原子操作

### Semaphores
- A Semaphore S – integer variable
  - may be initialized via a non-negative value
  - Can only be accessed via two indivisible (atomic) operations: P() and V()

- P(): the wait() operation
  ```
  wait (S) { 
    while (S.value <= 0) ; 	// no-op
      S.value--;
  }
  ```

- V() The signal() operation
  ```
  signal(S){
    S.value++;
  }
  ```

- main problem : busy waiting (spinlock)
  - advantages
       1. No context switch is required when a process must wait on a lock
       2. If locks are expected to be held for short times, the spinlocks are useful
  - disadvantages
    1. wastes the CPU cycles that can be used by other processes productively
  - 解决：modify the definition of the wait() and signal() **适用于 multiprocessor system**
      - Wait(): the process can block() itself rather than engaging in busy waiting
      - Signal(): change the blocking process from the waiting state to the ready state 

- implementation
  1. In a single-processor environment
    - Disable interrupt
  2. In a multi-processor environment
    - Critical section can be applied

## Chapter 7 Deadlocks
- Necessary conditions
  1. Mutual exclusion
  2. Hold and wait 
  3. No preemption
  4. Circular wait 

### Methods for Handling Deadlocks
  1. Prevention
     - Provides a set of methods for ensuring that at least one of necessary conditions cannot be held
     - 针对条件2： all or nothing; 没有资源的时候才去申请
     - 针对条件3： 谦让； 抢夺
     - 针对条件4： 顺序执行
     - 缺点： low device utilization and reduce system throughput.

  2. Avoidance 
     - using the addition information,decide whether the current request can be satisfied or must be delay
     - 方法：
       1. Resource-allocation graph
          - 有环：处于unsafe state;可能处于死锁状态 
       2. Banker's algorithm
  3. Detection and recovery
     - 方法:
       - Wait-for graph 
         - not appilcable to a resource-allocation system with multiple instances of each resource type
       - Banker’s Algorithm
     - When, and how often, to invoke detection algorithm. it depends on:
       - How often a deadlock is likely to occur?
       - How many processes will need to be rolled back?
  4. Ignorance

## Chapter 8
- Address may be represented in 
  1. symbolic address
  2. re-locatable address
  3. absolute address

- address binding 
  - 转换：
    - symbolic address -> re-locatable address : compiler
    - re-locatable address -> absolute address : linkage editor or loader
  - 发生的时期
    1. Compile time
       - If memory location known at compile time, absolute code can be generated
       - If memory location is not known at compile time, Must generate re-locatable code
    2. Load time （+linkage time）
       - if memory location is known at load time, absolute code can be generated at this time
    3. Execution time
       - If memory location is not known at compile time and load time, Binding is delayed until run time
       - absolute code must be generated at run time

### Logical vs. Physical Address Space
  - Logical address ：CPU
    - also referred to as virtual address
    - 重定位地址和逻辑地址没有直接关系
  - Physical address ：memory unit 
  - logical (virtual) and physical addresses differ in execution-time address-binding scheme
    - re-locatable code are seen by CPU
    - absolute code are seen by the memory unit 
  - Memory-Management Unit (MMU)
    - Hardware device that maps virtual address to physical address in the run-time

- Dynamic load
  - not loaded the entire program and data of a process be in physical memory for the process to execute until it is called
  - 好处： 
    1. Better memory-space utilization
    2. No special support is required from the operating system

- Dynamic linking
  - Linking is postponed until execution time
  - requires help from the OS

### Contiguous Memory Allocation
1. Fixed-Sized Contiguous Partition
   - Strengths (advantages)
     - Simple to implement
     - little overhead 
   - Weaknesses(drawbacks)
     - internal fragmentation
	   - allocated memory may be larger than requested memory
     - fixed number of processes 
2. Dynamic Contiguous partition（可变分区）
   - Hole – block of available memory
   - Allocation algorithms 
     1. first fit:
        - 从头开始，或者是从当前位置开始
     2. best-fit 
        - Need to search all entire list, unless the list is ordered by size
        - produces the smallest leftover hole that may be wasted
     3. worst-fit
        - Need to search all entire list, unless the list is ordered by size
        - 小进程多的 效果好
   - 问题：
     - External Fragmentation 

- Solutions to fragmentation
  1. Compaction(紧凑)
     - To reduce external fragmentation
     - Shuffle memory contents to place all free memory together in one large block
     - It is done at execution time， it’s possible only if relocation is dynamic
     - May be expensive in moving the processes and the holes
  2. paging
  3. segmentation

- Disadvantage of Contiguous Memory Allocation
  - Fragmentation in main memory
  - Compaction is impossible on the disk

### paging
- frame: Divide physical memory into fixed-sized blocks 
- page : Divide logical memory into fixed-sized blocks 
  - page size is equal to frame size
  - Finding n free frames for loading a program of size n pages

- Translating logical address to physical address
  If the address space is 2^m and the page size is 2^n

  - Every logical address generated by CPU is divided into:
    1. Page number (p: 页号) 
       - used as an index into a page table
       - 页表中包含每一页在physical memory 的 base address (f:块号)
       - p =address/2^n   is equal to m-n bit of the address 
    2. Page offset (d: 偏移) 
       - combined with base address (f:块号) to define the physical memory address that is sent to the memory unit
       - d =address%2n is equal to n bit of the address
  - Physical address 
    1. frame number（f: 帧号、块号)
    2. page offset      (d:页偏移、块偏移)

- page size的选择
  - 越大： 
    - Disk I/O is more efficient
    - page table size 越小
  - 越小：
    - internal fragmentation 越小



- Frame table (主存分块表)
  - Has one entry for each physical page frame
    Indicating 
      - whether the frame is free or it is allocated to which process	

- page table
  - each process must maintain a copy of the page table 
  - 计算
    - if page-table entry is 4 bytes long
      - Can point to one of 2^32 physical page frames (1比特=8字节)
      - If frame size(= page size) is 4KB, the system can address 2^44 bytes(2^32×2^12=16TB) of physical memory
    - 对于32位cpu
      - page size: 4k (=2^12)
      - Table size：2^32/2^12=1M 
      - each entry's size : 4 bytes
      - page table 的大小为： 4 MB 
  - 位置
    1. 直接存放在寄存器中：
       - Efficient and expensive
       - 当page table is reasonable small 时可以
    2. 存放在main memory ，然后用Page-table base register (PTBR：页表基址寄存器)存放其位置
       - 进程切换时，加载页表只需要改变PTBR
       - every data/instruction access requires two memory accesses
         - One for the page table
         - One for the data/instruction
    3. Translation Look-aside Buffer (TLB) also called Associate Memory(联想寄存器)
        - 并行查找
        - contains only a few of page-table entries

### Structure of the Page Table
- 问题: The page table can be excessively large
- Solution： Divide the page table into smaller pieces
  1. Hierarchical Paging （分层页表）
  2. Hashed Page Tables（哈希页表）
  3. Inverted Page Tables（反置页表）

1. Hierarchical Paging （分层页表）
   - 缺陷：
    1. 需遍历，进程太多
    2. 可能有共享，而进程号只能填一个
    3. 不适用于64位
   - 好：
     1. 需要的空间小  
2. Hashed Page Tables
   - hash table -> 在链表中遍历匹配
3. Inverted Page Table(反置页表/主存分块表)
  - Only a page table in the system
  - One entry for each real page (or physical frame) of memory
  - 缺点：
    - increases time needed to search the table when a page reference occurs
    - Lead to memory share difficulty

### segmentation
- User’s View of a Program: A program is a collection of segments，a segment is a logical unit such as:
  - main program
	- procedure ，function，method，object
	- local variables, global   variables
	- common block
	- stack
	- symbol table
	- arrays

## Chapter 9 Virtual Memory
- the entire program is not needed to be in physical memory.这样的好处有：
  - 程序的大小不再受内存所限制
  - 更多程序可以同时运行
  - Less I/O would be needed to load or swap each user program into memory, so program would start to run faster
- Virtual memory management 
  - a term used to describe a technique whereby the computer appears to have much more memory than it actually does

- Virtual memory can be implemented via:
  - Demand paging 
  - Demand segmentation

### Demand paging 
- 思想： Bring a page into memory only when it is needed
  - Be similar to a paging system with swapping
- Hardware
  - Page table. 需要加一位valid–invalid bit 
    - v -》 The page is legal and in memory
  - Secondary memory
    - A high-speed disk, Swap space
    - Hold those page that are not present in memory

- Page Fault
  - Access to a page marked invalid causes a page-fault trap
  - handle
    1. Operating system looks at another table (PCB) to decide:
       - Invalid reference -> abort
       - Just not in memory	（go on to 2））
    2. Get empty frame
    3. Swap the desired page into the frame
    4. modify the page table, Set validation bit = v
    5. Restart the instruction that caused the page fault
  - 特殊：
    1. 一条指令可产生多个缺页中断
    2. 指令复执
    3. 在指令执行时中断。
  - 对比普通中断：
    - 一条指令在执行完后，检查是否有中断请求
      - 有：执行中断
      - 无：执行下一条指令

### Page Replacement


**替换算法**

1. FIFO page Replacement
   - Belady’s Anomaly : more frames -> more page faults
2. Optimal Page Replacement (OPT) 
   - 替换最晚才用的页 或 后面最长时间用不到的页
3. Least Recently Used (LRU) Algorithm
   - 思想： The recent past as an approximation of the near future
   - 实现：
   - counters
   - stack
4. LRU Approximation Algorithms
   1. Additional-reference-bits algorithm
   2. Second chance (clock) 
   3. Enhanced second-chance algorithm

5. Counting-Based Page Replacement 
   - Least Frequently used 
   - Most Frequently used

6. Page-Buffering Algorithm
   - Assistant procedure to a page-replacement algorithm

### Allocation of Frames 
- Two major allocation schemes

  1. fixed allocation
     - Equal allocation
     - Proportional allocation
  2. priority allocation
     - Use a proportional allocation scheme using priorities rather than size

- Global vs. Local Allocation
  1. Local replacement
     - To allow a process to select from only its own set of allocated frames. 
     - Cannot increase the number of frames allocated
     - Not affected by external circumstances
  2. Global replacement
     - To allow a process to select a replacement frame from the set of all frames, even if that frame is currently allocated to some other process
     - Can increase the number of frames allocated
     - Cannot control its page-fault rate.
  - In general, global replacement is better. 

### Thrashing
- A process is thrashing （颠簸）if it is spending more time paging than executing
- approach
  1. Using a local replacement algorithm
  2. Working-set strategy 
     - To compute the working-set size for each process in the system
  3. Page-Fault Frequency (PFF) Scheme  (水多了加面，面多了加水)
     - If actual rate too low, remove  a frame from the process
     - If actual rate too high, allocate another frame to the process
     - If no frames are free, suspend it

### Other Considerations
- page size 大小的选择要考虑到：
  1. 内碎片
  2. 页表的大小
  3. I/O overhead (seek time, latency time, transfer time)
  4. Locality
  5. Page fault rate
     - 顺序访问： page size越大，则缺页中断率越小
     - 随机访问： page size越大，则more paging action could ensue because fewer pages can be kept in memory and more data is transferred per page fault.
- Install a faster hard disk, or multiple controllers with multiple hard disks
  - for as the disk bottleneck is removed by faster response and more throughput to the disks, the CPU will get more data more quickly

## Chapter 10 File-System Interface
- File 
  - A file is named collection of related information that is recorded on secondary storage
  - Six basic operations
    1. create
    2. read/write/seek
    3. delete
    4. truncate: to erase the contents of a file but keep its attributes except for it’s length 
  - Assistant operations
    - open(F):
      1. search the directory structure on disk for entry F
      2. copy the directory entry into the open-file table
      3. allocate a file descriptor
    - close(F):
      1. copy the directory entry in the open-file table to the directory structure on disk
      2. free the file descriptor

### Access Methods
- The information in the file can be accessed in
  1. sequentical access
  2. direct access
  3. other access 
     - involve the construction of an index for the file

### Directory Structure
- symbol table 
  - The directory can be viewed as a symbol table that translates file names into their directory entries

- Criteria 
  1. efficiency
  2. naming
  3. grouping

- shemes 
  1. Single-Level Directory
  2. Two-Level Directory
     - Positive
       - Efficient searching
     - Negative
       - No grouping capability
       - Difficult to share file among different users
  3. Tree-Structured Directories
     - Positive
       - Efficient searching
       - Grouping Capability
     - Negative
       - Difficult to share file among different users
  4. Acyclic-Graph Directories
     - Tree-structured directory + shared subdirectories or files
     - Created a new directory entry  called a link to implement sharing
     - The difficulty is to avoid cycles as new links are added
  5. General Graph Directory
     - Add the links to an existing tree-structure directory
     - Acyclic-Graph Directories更好


- 硬（hard）链接 
  - `ln /usr/local/python3 python`
  - 目录中仅存储指向文件数据的指针
  - 允许一个文件被多个目录引用.
  - 无法用来链接目录，也不能跨文件系统
  - 通过`ls -i`查看是否为硬链接
- 软 (symbolic) 链接
  - “快捷方式”
  - 软链接也是一个文件
  - ` ln -s ../p24 p24` 
  - 目录从“树”变为了“图”，还是有环图

- ACL: access-control list
  - Each file or directory has an ACL

## File-System Implementation
- File system organized into layers
  1. application program
  2. logical file system
     - FCB: file control blocks
  3. file-organizational module
  4. basic file system
  5. I/O control
  6. devices

### Allocation Methods 
- An allocation method refers to how disk blocks are allocated for files

- Contiguous allocation
  - Each file occupies a set of contiguous blocks on the disk
  - Supports both sequential access and direct access （Random access）
  - 问题：
    1. External fragmentation 
    2. Files cannot grow

- Linked allocation
  - Each file is a linked list of disk blocks: blocks may be scattered anywhere on the disk
  - 优点
    1. 容易实现
    2. 无外碎片
    3. 文件增长方便
  - 缺点：
    1. No random access
    2. Poor reliability
    3. 慢（链表是保存在磁盘上的，所以需要多次查询）
  - 改进： File-allocation table (FAT) 
    - 把链表信息放到了一个单独的FAT表中，而不是各个数据块中，且进行备份
- Indexed allocation
  - Bringing all the pointers together into one location: index block 
  - Solutions to large files
    1. Linked sheme
       - Link blocks of index table 
    2. Multilevel index
    3. Combined scheme
       - 一部分是 direct pointers ，一部分是multi-indirect block

  - Criteria
    1. storage utilization efficiency
    2. data block access time 
    - Contiguous allocation: Good for known-size file
    - Linked allocation: Good for storage utilization 
    - Indexed allocation: Access time depends on index structure, file size, block position

### Free-Space Management
- The free-space list 的实现
  1. Bit vector
     - 优点
       - Simple to implement 
       - Efficient to find the first free block
     - 缺点
       - Bit map requires extra space
       - Inefficient unless the entire vector is kept in main memory
  2. Linked Lists (free list)
     - 优点
       - No waste of space
     - 缺点
       - Inefficient when traversing the list
  3. Grouping
    - The first free block store the addresses of n free blocks
    - Easier to find a large number of free blocks

## Mass-Storage Systems
- Magnetic disk's structure
  - Disk platter
  - track
  - sector
    - each track is subdivided into several sectors
  - cylinder
    - is the set of tracks that are at one arm position

- CLV vs. CAV
  1. ClV : constant linear velocity
     - CD-ROM， DVD-ROM
     - Tracks in the outermost zone hold more sectors
  2. CAV : constant angular velocity
     - Magnetic disk
     - The density of bits decreases from inner tracks to outer tracks to keep the data rate constant

### Disk Scheduling
- Access time 
  1. Seek time is the time for the disk are to move the heads to the cylinder containing the desired sector
     - Seek time  seek distance
  2. Rotational latency
     - waiting for the disk to rotate the desired sector to the disk head
- Disk bandwidth
  - The total number of bytes transferred / the total time  between the first request for service and the completion of the last transfer

1. FCFS Scheduling
2. SSTF：Shortest-seek-time-first (SSTF)
   - 最短寻道时间优先
   - 问题：
     - 往返跑---距离很短，但速度不一定很快
     - may cause starvation of some requests
3. SCAN
  - Sometimes called the elevator algorithm
4. C-SCAN (Circular SCAN) 
  - The head moves from one end of the disk to the other, servicing requests as it goes
  - When it reaches the other end, however, it immediately returns to the beginning of the disk, without servicing any requests on the return trip
  - 回途不载客
5. LOOK / C-LOOK
  - Similar to SCAN/C-SCAN  
  - Arm only goes as far as the last request in each direction, then reverses direction immediately, without first going all the way to the end of the disk.

- 选择
  **Performance depends on the number and types of requests**
  - SCAN and C-SCAN perform better for systems that place a heavy load on the disk
  - Either SSTF or LOOK is a reasonable choice for the default algorithm

### Disk Management
- Disk formatting
  - Low-Level Formatting (physical formatting )
    - Dividing a disk into sectors that the disk controller can read and write
  - logical Formatting
    - Creation of a file system
    - Build the metadata structures for a file system

### RAID Structure
- Redundant Array of Inexpensive Disks (past)
- Redundant Array of Independent Disks (now)
  - Used for their higher reliability and higher data-transfer rate(performance)

- levels
  1. RAID 0
     - Disk arrays with data striping at the level of blocks but without any redundancy
  2. RAID 1
     - Disk mirroring
  3. RAID 2
     - Bit-level striping or Byte-level striping
     - Memory-style error-correcting-code (ECC) 
  4. RAID 3
     - Bit-interleaved parity 
  5. RAID 4
     - Block-interleaved parity organization
  6. RAID 5
     - Block-interleaved distributed parity

--- 

## 常用单词
- simultaneously : 同时地
- idle : 空闲，懒
- reside : 位于，居住
- uni-processor : 单处理器
- interleave: 交织
- allocation : 分配
- dashed line ： 虚线
- minuscule : 微小的
- concrete : 具体的
- mandatory: 强制的
- mediate : 调解
- strip : 脱掉；条
