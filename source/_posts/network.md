---
title: network
tags:
  - 折腾
  - 笔记
categories:
  - 学习
date: 2023-03-11 19:32:04
---
# 网络

## 过程
- 先是看[如何让国内的阿里云服务器可以高速下载Github代码](https://www.jianshu.com/p/53457e21fcd4)，但这个是纯命令行的，用的是pm2
- 因为延迟比较大，想切换节点，首先是研究怎么用命令行实现.确实可以，[使用Clash-API切换节点](https://sakronos.github.io/Note/2021/03/06/%E4%BD%BF%E7%94%A8Clash-APIj%E5%88%87%E6%8D%A2%E8%8A%82%E7%82%B9/)有介绍，但我去操作的话不行，返回`{"message":"Body invalid"}  `。看也有人提issue，但我还是不能成功更改。加上这样更改的话，就挺麻烦的。于是想着能不能搞个ui。
- 然后参考[如何在Linux上优雅的使用Clash](https://blog.zzsqwq.cn/posts/how-to-use-clash-on-linux/)这篇，docker让这些配置变得简单多了。但我还是遇到了些问题：主要是自作聪明，修改了
```
 - ./config.yaml:/root/.config/clash/config.yaml
 - ./Country.mmdb:/root/.config/clash/Country.mmdb
```
调试后才发现并不用修改。另一个是配置`external-controller: :9090`时，自己改成了`127.0.0.1:9090`
- 上面那篇文章少了暴露接口这一步，[如何为实验室服务器配置终端代理](https://juejin.cn/post/7054941050216906760)，[Linux 让终端走代理的几种方法](https://zhuanlan.zhihu.com/p/46973701),这两篇讲得挺好的

## 收获
- 了解了配置文件怎么写的
- 学到了如何检查是处于代理状态：`curl cip.cc`，但得到的地址和我实际走的节点不一样

## 参考链接
- [使用Clash-API切换节点](https://sakronos.github.io/Note/2021/03/06/%E4%BD%BF%E7%94%A8Clash-APIj%E5%88%87%E6%8D%A2%E8%8A%82%E7%82%B9/)
- [通过RESTful API更改节点代理返回{"message":"Body invalid"}](https://github.com/Dreamacro/clash/issues/659)
- [如何让国内的阿里云服务器可以高速下载Github代码](https://www.jianshu.com/p/53457e21fcd4)
- [如何在Linux上优雅的使用Clash](https://blog.zzsqwq.cn/posts/how-to-use-clash-on-linux/)
- [如何为实验室服务器配置终端代理](https://juejin.cn/post/7054941050216906760)
- [Linux 让终端走代理的几种方法](https://zhuanlan.zhihu.com/p/46973701)
- [Configuration](https://github.com/Dreamacro/clash/wiki/configuration)