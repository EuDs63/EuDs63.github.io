---
title: 进一步学习jwt
slug: learn_jwt
date: 2024-08-04T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
categories:
  - 学习
summary: 熟悉又陌生
--- 

## 前言 
JWT，我并不陌生。但如何去权衡其中利弊，根据不同需求去决定是否使用，如何使用，我还是一知半解，于是希望通过此篇来进一步学习

---

## 基于token的认证方式
1. 用户向服务器发送用户名和密码。
2. 服务器将相关数据，比如用户 ID，认证有效期等信息签名后生成 token 返回给客户端。
3. 客户端将 token 写入本地存储。
4. 用户随后的每一次请求，都将 token 附加到 header 中。
5. 服务端获取到用户请求的 header，拿到用户数据并且做签名校验，如果校验成功则说明数据没有被篡改，是有效的，确认 token 在有效期内，用户数据就是有效的。

---

## 组成
- header
- payload
- signature

---

## 存在的问题：
  1. Token Expiration
     - Revoked Token Database                   |
     - Additional DB calls   
  2. Token Revocation Problem 
     - Inability to easily revoke tokens
     - Lack of real-time revocation
  3. Length of Tokens
     - Potential URL and cookie length issues
     - Sending large volumes of data
  4. Need for State Maintenance
     - Need to maintain user state
     - Limited statelessness
  5. Security and Encryption
     - Potential vulnerabilities
     - Lack of encryption for payload 

---

## 使用时需要注意的点
摘自 [Golang 中使用 JWT 做用户认证](https://blog.fatedier.com/2020/03/28/golang-jwt/ )

> - 由于 jwt 返回的 Token 中的数据仅做了 Base64 处理，没有加密，所以不应放入重要的信息。
> - jwt Token 由于是无状态的，任何获取到此 Token 的人都可以访问，所以为了减少盗用，可以将 Token 有效期设置短一些。对一些重要的操作，尽量再次进行认证。
> - 网站尽量使用 HTTPS，可以减少 Token 的泄漏。

## 有办法使一个在有效期内的JWT废弃掉吗
wip

---

## 参考
- [决定放弃使用JWT了！](https://mp.weixin.qq.com/s/Vcj3Jj0PANSnqXgt4CsF2Q )
- [『JWT』有人让你赶快用它，有人劝你放弃它-有人让我](https://www.51cto.com/article/624093.html )
- [jwt - 在退出登录 / 修改密码时怎样实现JWT Token失效？ - SegmentFault 思否](https://segmentfault.com/q/1010000010043871 )
- [The Ultimate Guide to handling JWTs on frontend clients (GraphQL)](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql )
- [Golang 中使用 JWT 做用户认证](https://blog.fatedier.com/2020/03/28/golang-jwt/ )
- [JWT真的安全吗？如何解决该问题 - 掘金](https://juejin.cn/post/7238921098808475705)