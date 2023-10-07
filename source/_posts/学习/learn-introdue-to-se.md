---
title: 软工导论复习笔记
tags:
  - 笔记
  - 软件工程
categories:
  - 学习
date: 2023-06-16 18:28:40
excerpt: 没有银弹
---
# 软工导论复习

## Chapter 0
- 软件工程提出时间：1968年

    1968年北大西洋公约组织(NATO)的计
    算机科学家在联邦德国召开国际会议，
    讨论软件危机问题，正式提出了“软件
    工程”。

## Chapter 1
- The nature of software
  Developed / Deteriorates / Custom built/ Complex

## Chapter 2
- 软件工程定义
   1. The application of a systematic, 
        disciplined, quantifiable approach to the 
        development, operation, and maintenance 
        of software; that is, the application of 
        engineering to software.
   2. The study of approaches as in (1).

- Software Process
  - why: 需要及时的反馈
  - Process framework 
    - Framework activities
      - Communication
      - Planning
      - Modeling
        1. 需求分析
        2. 设计
      - Construction
        1. 代码
        2. 测试 
      - Deployment
    - Umbrella Activities 庇护活动（普适性活动）
        - Software project tracking and control
        - Risk management
        - Software quality assurance
        - Technical reviews
        - Measurement
        - Software configuration management
        - Reusability management
        - Work product preparation and production


- Software Lifecycle
  - 软件有一个孕育、诞生、成长、成熟、
    衰亡的生存过程。这个过程即为计算机
    软件的生命周期(生存周期)
  - why need
    - 从时间角度对软件开发和维护的复杂问题进行分解，把软件生存的漫长周期依次划分为若干个阶段，每个阶段有相对独立的任务，然后再逐步完成每个阶段的任务。
    - 为软件人提供一个公共的框架，以便软件人的相互交流。

## Chapter 4
- Evolutionary Models
  - prototype
    - 类型
      - 探索型(exploratory prototyping) 弄清需求
      - 实验型(experimental prototyping)  验证方案
      - 演化型(evolutionary prototyping) 
    - 特征
      - 可实际运行
      - 它没有固定的生存期。它可能被扔掉，或者作为最终产品的一部分。
      - 可为不同目标作原型
      - 快速、廉价
      - 是迭代过程的集成部分，即每次经用户评价后修改、运行，不断重复双方认可。

## Chapter 5
- 敏捷宣言
  - 个体和互动 高于 流程和工具
  - 工作的软件 高于 详尽的文档
  - 客户合作 高于 合同谈判
  - 响应变化 高于 遵循计划
- 

## Chapter 7
### Requirements Engineering
- Inception
- Elicitation
- Elaboration
- Negotiation
- Specification
  - 根据需求调查和需求分析的结果，进一步定义准确无误的产品需求，产生《产品需求规格说明书》
- Validation
- Requirements management

### Quality Function Deployment
1. 功能部署——确定系统功能的价值
2. 信息部署——确定数据对象和事件
3. 任务部署——确定系统的行为
4. 价值分析——确定需求的优先级

### Non-Functional Requirements
- quality attribute
- performance attribute
- security attribute
- general system constraint

### diagrams
Use-case / Class / State / Activity

## Chapter 11
- Analysis model
  - focus on describing required data, function and behavior
### Design model
- provide detail about software data structure, architecture, interfaces and components
- 4 kinds
  - Data/Class design——将分析类转换为实现类和数据结构
  - Architectural design——定义主要软件结构元素之间的关系
  - Interface design——定义软件元素、硬件元素和最终用户如何通信
  - Component-level design——转换结构元素到软件组件的过程描述中

### concepts
- Architecture-软件的整体结构
  - 体现了系统的模块化,抽象和信息隐藏,接口设计
  - 举例
    - 客户-服务器架构（Client-Server Architecture）
    - 微服务架构（Microservices Architecture）
    - 事件驱动架构（Event-Driven Architecture）
    - 分层架构（Layered Architecture）
- Pattern
  - The goal of a pattern：easy to reuse.
  - types:
    - Architecture Pattern
      - B/S, C/S
    - Design Pattern
    - Idiom
      - a low-level pattern specific to a programming language
- Functional Independence
  - Cohesion 内聚
    - an indication of the relative functional strength of a module
    - 功能内聚 分层内聚 通信内聚 顺序内聚 过程内聚 时间内聚 实用内聚（由高到低排列）
  - Coupling 耦合
    - an indication of the relative interdependence among modules
    - 非直接耦合 数据耦合 标记耦合 控制耦合 外部耦合 共用耦合 内容耦合 （ 由低到高排列）
  - goal: 高内聚，低耦合

## Chapter12 Behavioral Modeling
- what
 the structure of the system, which comprise the software components, the externally visible properties of those components, and the relationships among them
- The importance of architecture
   - for communication between all parties (stakeholders)
   - highlights early design decisions
   - constitutes a relatively small, intellectually graspable mode
- 架构有什么用
    - 分析设计在满足其规定要求方面的有效性
    - 在进行设计更改仍然相对而言的阶段考虑架构替代方案容易
    - 降低与软件构建相关的风险
### Architecture Style
- 定义内容
    - 一组执行系统所需功能的构件
    - 一组连接器，可以实现“通信、协调和组件之间的合作”
    - 定义组件如何集成以形成系统的约束
    - 语义模型，使设计人员能够通过分析系统组成部分的已知特性来理解系统的整体属性
- 种类
  - 数据流架构——批处理、管道和过滤器
  - 调用和返回架构——主程序/子程序、面向对象系统、分层系统
  - 独立组件架构——事件系统、触发器、监视器
  - 虚拟机架构——解释器，基于规则的系统
  - 仓库架构——数据库系统，黑板系统等

## Chapter13 Component Level Design
- 一个模块化的、可部署的、可替换的系统部分，它封装了实现并公开了一组接口。
  
### Basic Design Principles
1. 开闭原则（OCP）——一个模块 [组件] 应该对扩展开放但对修改关闭
2. 里氏替换原则（LSP）—— “子类应该可以替代它们的基类。
3. 依赖倒置原则（DIP）——依赖于抽象。不要依赖实体
   - 高层模块应该依赖于抽象（接口或抽象类）
   - 抽象不应该依赖于具体实现，具体实现应该依赖于抽象
4. 接口分离原则 (ISP)——许多专用的接口都比一个通用接口好
5. 发布重用等效原则 (REP)——重用的粒度就是发布的粒度
6. 共同闭合原则（CCP）——同时修改的类应该放在一起
7. 共同重用原则（CRP）——不能同时复用的类不应该放在一起

## Chapter14 User Interface Design
- 黄金规则
  - 用户控制操作
  - 减少用户记忆负担
  - 保持界面一致

## Chapter 15-16 Software Quality
- 什么是软件质量
  一个有效的软件过程，其应用方式创造了一个有用的产品，为生产它的人和使用它的人提供可衡量的价值

- McCall’s Triangle of Quality
  - 产品修改
  - 产品转移
  - 产品运行

- The Cost of Quality
  - 在测试和维护阶段改正错误和缺陷的成本急剧增高
  - 种类：
    1. 预防成本（COP）
    2. 评估成本（COA）
    3. 内部失败成本
    4. 外部失败成本

## Chapter 17-19. Testing Strategy & Techniques
- Verification vs. Validation
  - Verification: 确保软件能实现特定功能 building the product right
  - Validation: 确保软件可追溯到客户需求 building the right product
- 测试策略——从小到大
    - 单元测试
    - 集成测试
    - 系统测试
    - 验收测试
      - α testing 由最终用户在开发人员站点进行
      - ß testing 在最终用户站点进行
### 测试策略之unit testing
- 内容：
  - 接口
  - 局部数据结构
  - 边界条件
  - 独立路径
  - 错误处理路径
- stub——代替底层
- driver——代替顶层
  - 提供了一个框架用于设置输入参数，环境 ，执行单元

### 测试策略之integration testing
- Top Down Integration
  - Advantage
    - A skeletal version of the program can exist early and allows demonstrations
    - Design errors may be found sooner.
    - Reduces the need for test drivers
    - It tends to make fault location easier
  - Disadvantage
    - stubs could be expensive to build.
- Bottom-Up Integration
  - Advantage
    - Particular useful for objects and reuse.
    - requiring no structural design information
  - Disadvantage
    - The program as a whole does not exist until the last module is added.
    - requires test drivers, not test stubs.

### 测试策略之system testing——充分运用基于计算机的系统
- 目的：
    - 在将要运行的真实环境中测试整个系统
    - 确保系统满足整体工作的要求
    - 还要测试系统功能之外的方面
    - 结果有时用于系统验收
    - 验证软件用户手册
    - 估计可靠性和可维护性

### 测试方法
- 黑盒测试（功能）
- 白盒测试（结构）

## Chapter 21 Software configuration management
### The SCM Process
1. identification
2. change control
3. version control
4. configuration auditing
5. reporting

- Software configuration item

## Chapter 22  Project Management Concept
### 4 p
- people
- product
  - scopes
    1. context
    2. information objectives
    3. function and performance
- Process
  - Consider project characteristics
  - Determine the degree of rigor required
  - Define a task set for each software engineering activity
- Project
  1. 从正确的基础上开始工作——首先通过努力理解要解决的问题，然后设定现实的目标和期望来实现的
  2. 保持动力——项目经理必须提供激励措施，将人员流动率控制在最低限度，团队应在其执行的每项任务中强调质量，高级管理人员应尽一切可能远离团队
  3. 跟踪进度——作为质量保证活动的一部分，随着工作产品（例如模型、源代码、测试用例集）的生成和批准（使用正式的技术评审），进度会被跟踪。
  4. 做出明智的决定——项目经理和软件团队的决定应该是“保持简单”
  5. 进行事后分析——建立一个一致的机制来提取每个项目的经验教训


### W5HH
1. Why is the system being developed?——为什么
2. What will be done? ——做什么
3. When will it be accomplished?——什么时候做
4. Who is responsible?——谁负责
5. Where are they organizationally located?——其他人的组织机构位于何处
6. How will the job be done technically and managerially?——如何完成技术工作和管理工作
7. How much of each resource (e.g., people, software, tools, database) will be needed?——每种资源需要多少

### Task set =
  - Software engineering tasks
  - Work products
  - Quality assurance points 
  - Milestones

### software engineering activity
  - 需求分析
  - 设计
  - 软件开发
  - 软件部署
  - 软件维护
  - 项目管理
  - 质量保证
  - 配置管理
  - 文档编写

## Chapter 23 Process and Project Metrics
- 意义
  1. 评估正在进行的项目的状态
  2. 跟踪潜在风险
  3. 在问题造成不良影响前发现风险
  4. 调整工作流程或任务
  5. 评估项目团队控制软件工作产品质量的能力

### Process Measurement
- 根据过程中获得的一系列数据或软件工程任务的特性来进行测量。
- Software Process Improvement (SPI)
- 5 Metrics
  - Quality-related
  - Productivity-related
  - Statistical SQA data
  - Defecti removal effciency
  - Reuse data

### 项目度量
- 三个方面
  - 如期
  - 质量
  - 成本


### Chapter 24-25 Project Estimation & Scheduling
### scope
- Scope refers to all the work involved in creating the 
  products of the project and the processes used to 
  create them. It defines what is or is not to be done
- 项目范围的内容
  - 交付给最终用户的功能和特性
  - 输入和输出的数据
  - 由于使用软件而呈现给用户的“内容”
  - 性能、约束、接口、和约束系统的可靠性

### Work Breakdown Structure (WBS)
- 进行WBS的五种方法
  1. 使用指南：一些组织提供的指南
  2. 类比方法：审查类似项目的 WBS，并根据我们的项目 进行定制。
  3. 自上而下的方法：从项目中最大的项目开始，并将它们分解
  4. 自下而上的方法：从详细的任务开始，并将它们汇总
  5. 思维导图方法：以非线性格式写下任务，然后创建 WBS 结构

### 估计方法
- 基于代码行的估计
  - 优点：易于测量、容易自动化
  - 缺点：仅限于代码不能用于设计、依赖于语言、没有考虑功能的复杂性、与设计的好坏挂钩
- 基于功能点的估计
  - 优点：
    1. 可用于最早的需求阶段
    2. 独立于编程语言、产品设计或开发风格 
    3. 用户视图，而不是实现视图 
    4. 可用于衡量非编码活动 
    5.  存在大量历史数据  
    6.  有据可查
  - 缺点：
    1. 无法直接计算现有产品（源代码）的 FP 内容 
    2. 难以自动化 
    3. FP 不反映语言、设计或风格差异 
    4. FP 设计用于估计商业数据处理应用 
    5.  主观计数

### 项目调度
1. 项目为什么会延期
  不切实际的截止日期
  需求的变化
  低估工作量
  不可预测的风险
  技术难题
  人为困难
  沟通不畅
  未能认识到项目落后于计划或缺乏纠正问题的行动
2. 调度的原则
    划分——定义多个不同的任务
    相互依赖性——明确任务的相互关系
    工作量确认——确保人力资源可用
    确定责任——明确责任承担者
    明确输出结果——确定活动产生的结果
    确定里程碑——进行质量审查
3. 调度的步骤
   1. 定义任务集——WBS
   2. 安排活动
   3. 绘制项目网络图
   4. 关键路径分析
   5. 使用甘特图进行调度
   6. 进度跟踪

## Chapter 26 Risk Management
- Reactive Risk Management

- Proactive Risk Management
  - formal risk analysis is performed
  -  corrects the root causes of risk

- Risk Management Paradigm
  1. Risk identification
  2. Risk analysis
  3. Risk planning 
  4. Risk monitoring

- RMMM
  - Mitigation
  - Monitoring 
  - Management


## 常用图
- 用例图
- 类图
- 活动图
  - 变形：泳道图
- 顺序图
  