---
title: npm包——从出生到死亡
slug: npm_from_born_to_death
date: 2024-10-03T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
categories:
  - 学习
summary: 生与死
--- 
## npm包的结构
### `package.json`
- 版本
  - 每个版本号都形如：`1.2.3`，有三部分组成，依次叫主版本号、次版本号、修订号；
    1. 当新版本无法兼容基于前一版本的代码时，则提高主版本号；
    2. 当新版本新增了功能和特性，但仍兼容前一版本的代码时，则提高次版本号；
    3. 当新版本仅仅修正了漏洞或者增强了效率，仍然兼容前一版本代码，则提高修订号；
  - `^` 兼容某个大版本。如：`^1.1.2` ，表示>=1.1.2 <2.0.0
  - `~` 兼容某个次版本。如：`~1.1.2`，表示>=1.1.2 <1.2.0
- 依赖
  1. dependencies 生产依赖
  2. devDependencies 开发依赖
     - 只开发应用，不对外开源的话，包随意放在dependencies或devDependencies是不影响
  3. peerDependencies 同版本的依赖
     - 例如`vue`和`vuex`
  4. bundledDependencies 捆绑依赖
     - 依赖中使用到的，但尚未发布
  5. optionalDependencies 可选依赖
     - 非必要不使用
- `files`
  - 用于描述`npm publish`后推送到 npm 服务器的文件列表

### `package-lock.json`
- 定义每个包的具体版本，以及包之间的层叠关系
- 需要提交到git吗?
  - 回答: 分情况
    - **内部的应用项目**: 可以保证项目中成员、运维部署成员或者是 CI 系统, 在执行 npm install后, 在不同的节点能得到完全一致的依赖安装的内容，减少bug的出现;无需计算依赖版本范围，大部分场景下能大大加速依赖安装时间
    - **给外部环境用的库**: 在不使用 package-lock.json的情况下，就可以复用主项目已经安装的包，减少依赖重复和体积

### `src`或`lib`
- src/: 包含项目的源代码。在开发过程中，所有的 TypeScript、JavaScript、CSS 等文件会放在这里。
- lib/: 
  - 如果有此文件夹，通常是编译后的代码，生成的文件可以是 CommonJS、ES6 模块等
  - 针对模块化代码的编译输出，保持了一些开发者友好的结构和格式。

### `dist`或`build` 
- 这个文件夹包含了打包或编译后的代码，通常是在使用构建工具（如 Webpack、Rollup 等）之后生成的。这个文件夹里的代码是实际发布到 npm 上的。
- 经过优化和打包处理后的生产代码

---

## npm install背后的过程
- 依赖树的构建
  1. 首先会检查下项目中是否有 package-lock.json 文件
  2. 存在 lock 文件的话，会判断 lock 文件和 package.json 中使用的依赖版本是否一致
  3. 如果一致的话就使用 lock 中的信息，反之就会使用 package.json 中的信息
  4. 如果没有 lock 文件的话，就会直接使用 package.json 中的信息生成依赖树。
- 参考
  - [前端工程化 - 剖析npm的包管理机制现如今，前端开发的同学已经离不开 npm 这个包管理工具，其优秀的包版本管理机制承 - 掘金](https://juejin.cn/post/6844904022080667661 )

## 修改
### 方法一
- 直接修改对应模块的lib代码
- 缺点:
  - lib中都是编译过后的代码,阅读起来不够直观-
- 进阶: 参见[patch-package使用 | EuDs's Blog](https://ds63.eu.org/2024/the-use-of-patch-package/ )

### 方法二
- 拷贝源文件后进行修改,再引用
- 缺点:
  - 代码臃肿

### 方法三
- fork一份，自己维护
- 流程:
  >还是以elemnt-ui为例,可以在官方的开源代码中fork到自己的仓库中方便维护,然后clone到本地进行相关源代码的修改
  >使用 npm run dist即可打出对应lib
  >进行本地软连接, 在本地elemnt-ui项目中使用 npm link 或者 yarn link,
  >在需要的项目中使用npm linkelemnt-ui,此时就可以进行相关调试
  >在本地element项目中使用npm login npm publish 进行发包
  >在需要的项目中引入发布的包,不再使用elemnt官方包,修改packjson中的包版本之后npm unlink elemnt-ui npm install重新安装依赖
- 缺陷
  - 如果你修改的是个底层包，也就是说并不是你的应用代码中直接引用的，而是你引用的npm包A所依赖的，甚至可能同时被包B依赖的，这时就比较尴尬了，你不可能再去修改A和B的源码，那就太不值当了。
- 进阶: 使用pnpm的别名(aliases)
  - `pnpm add lodash@npm:awesome-lodash`: 发布了一个名为awesome-lodash的新包，并使用lodash作为别名来安装它

---

## 调试

---

## 发布
wip

---

## 参考
- [详解package.json和package-lock.json - 掘金](https://juejin.cn/post/7137110113277444126) 
- [开源组件的定制化修改及优化过程记录 - 橙汁坤的博客 | czkm Blog](https://czkm.github.io/2023/11/13/%E5%BC%80%E6%BA%90%E7%BB%84%E4%BB%B6%E7%9A%84%E5%AE%9A%E5%88%B6%E5%8C%96%E4%BF%AE%E6%94%B9%E5%8F%8A%E4%BC%98%E5%8C%96%E8%BF%87%E7%A8%8B%E8%AE%B0%E5%BD%95/ )
- [link | npm中文文档 | npm中文网](https://www.npmjs.cn/cli/link/)
- [如何调试node_modules中的包 | 梦殇918](https://mengshang918.github.io/blog/docs/%E5%B7%A5%E7%A8%8B%E5%8C%96/%E4%BE%9D%E8%B5%96%E7%AE%A1%E7%90%86/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98/5465da474f6f60291fb1a253cce06f5f/)
- [[Mentor让我调试npm包 我偷偷搬了一下午代码。。。 - 哔哩哔哩](https://www.bilibili.com/read/cv16917711/)](https://www.bilibili.com/read/cv16917711/)
- [debugging - How can I debug node modules? - Stack Overflow](https://stackoverflow.com/questions/6341088/how-can-i-debug-node-modules)
- [【一库】yalc: 可能是最好的前端link调试方案（已经非常谦虚了） - 掘金](https://juejin.cn/post/7033400734746066957)
- [爬坑node_modules经验分享 - 掘金](https://juejin.cn/post/7275590449736597544?from=search-suggest )