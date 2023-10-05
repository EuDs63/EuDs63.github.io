---
title: game of life
tags:
  - 折腾
  - 记录
categories:
  - 想法
date: 2023-10-05 16:04:39
excerpt: 记录EuDs63/game_of_life
---
## 起因
大一的时候做某次课程作业，我的选题就是life of game。从那时候就想自己实现一个。但一直搁置着没有动手，最近在学Rust，并正好看到了篇[很不错的教程](https://rustwasm.github.io/docs/book/introduction.html)。这便是这个项目的起因。

## 历程

### 前期准备
我使用的环境是vecode+wsl2。整体下来除了因为机器性能限制导致内存占用过高，体验还是很可以的。

但在搭建项目环境时踩了三个坑。

1. *npm install 失败*
- 解决：在Ubuntu中安装npm
- 参考：[WSL无法使用npm](https://blog.csdn.net/hys__handsome/article/details/125687617)

2. *wasm-build 失败*
- 解决
   ```
   [package.metadata.wasm-pack.profile.release]
   wasm-opt = false
   ```
- 参考：[failed to download binaryen-version_90-x86-windows.tar.gz](https://github.com/rustwasm/wasm-pack/issues/864)

3. *wasm-pack test --chrome --headless 失败*
- 解决: 改用`wasm-pack test --chrome`
- 参考： [Headless Chrome test fails](https://github.com/rustwasm/wasm-pack/issues/611)

### 编码

编码阶段跟着教程来，还算顺利。但教程中的代码是全部堆放在一起的。这看起来不太舒服，也不太适合我后续的迭代。我花了些时间将其组件化。但教程的后面也有说明没有组件化的理由：Shrinking .wasm Size。这让我意识到还是要根据项目的特点来去做对应的优化和修改。

### 部署
开发时，我发现[shalzz/wasm-game-of-life](https://github.com/shalzz/wasm-game-of-life)提供了一个live demo。是使用vercel进行部署的。vercel之前我也有使用过，但只是用的别人的一键部署。我觉得蛮有意思的，于是决定也试试。着实花了些时间，踩了不少坑。这里展开说下过程。

1. 一开始参考[Deploying a WASM-Powered React App on Vercel](https://betterprogramming.pub/deploying-a-wasm-powered-react-app-on-vercel-cf3cae2a75d6)。后来发现不需要这么麻烦，因为我已经`wasm-pack pulish`了，可以直接将[wasm-game-of-life-euds63 - npm](https://www.npmjs.com/package/wasm-game-of-life-euds63)作为依赖引入。这样就只需要部署webpack，而不用再去安装Rust相关的内容。
2. 对代码进行对应的修改后。我开始尝试部署。先是遇到路径问题，我将`Root Directory`修改为www。
3. 这时候vercel显示部署成功了，但实际上是运行不了的。我因着之前的经验，惯性地以为也是路径问题。开始修改其他地方的路径。但实际上不是。反复修改几次后我发现:错误的路径会导致部署成功，而正确的路径反而会使`npm install`报错。而我一开始以为的错误路径是正确的。 这一步我觉得还是我没有好好去看log导致的。
4. 根据相应的报错发现是node版本问题。我本地运行成功的node版本是12，而vercel只支持18和16，我一开始的想法是另外安装一个12的版本，未果。后来报着试一试的念头改为16，惊喜的是`npm install`成功了。
5.  `npm run build`后报错：Missing Public Directory。根据[Error List | Vercel Docs](https://vercel.com/docs/errors/error-list#missing-public-directory)尝试将`Output Directory`设为dist，解决。

### 配置域名
我使用了子域名的方式进行配置。之前觉得配置子域名蛮神奇的。自己尝试后发现，似乎是相当于一个redirect？

我先在我使用的DNS服务提供商处添加了一条CNAME记录。

   | SUBDOMAIN | TYPE | VALUE | TTL, SEC |
   |-|-|-|-|  
   | lifegame | CNAME | game-of-life-2hpx.vercel.app | 86400 |

然后在vercel的对应项目中的Domains新增域名lifegame.ds63.eu.org。

一开始设置好的是没有ssl证书。网上查了些资料，发现vercel是会自动提供ssl证书的。还以为是自己哪里设置出问题了。结果是得等一会儿才行。

## 收获
1. Rust自定义宏
   - 步骤
      1. 在一个模块中定义并导出自定义宏
         ```Rust
         // utils.rs
         #[macro_export]
         macro_rules! log {
            ( $( $t:tt )* ) => {
               web_sys::console::log_1(&format!( $( $t )* ).into());
            }
         }
         ```
      2. 在其他模块中使用
         ```Rust
         // lib.rs
         #[macro_use]
         mod utils;

         mod universe;

         // universe.rs
         use crate::utils;
         // 直接使用
         log!("This is a log message: {}", some_variable);
         ```
2. Always let profiling guide your focus
   - 一些检测性能工具
      1. edge开发者工具 -> 性能
      2. `cargo benchcmp`
      3. `perf`
   - [Time Profiling - Rust and WebAssembly](https://rustwasm.github.io/docs/book/game-of-life/time-profiling.html)这章值得再读几次
3. vercel部署

## 参考
- [Rust and WebAssembly](https://rustwasm.github.io/docs/book/introduction.html)
- [Play John Conway’s Game of Life](https://playgameoflife.com/) 目前发现的最好的一个game of life实现
- [shalzz/wasm-game-of-life: Game of Life implementation using Rust, Javascript and WebAssembly!](https://github.com/shalzz/wasm-game-of-life)
- [Projects Overview | Vercel Docs](https://vercel.com/docs/projects/overview#ignored-build-step)