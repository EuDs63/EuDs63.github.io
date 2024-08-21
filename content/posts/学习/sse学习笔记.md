---
title: sse学习笔记
slug: learn_sse
date: 2024-07-30T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
categories:
  - 学习
summary: 适合的技术才是最好的技术
--- 
## 声明
本文是我学习sse(Server-Sent Events)的笔记，内容大部分是对我所读文章的摘抄，非我原创。具体出处参见[参考链接](#参考)。

## 什么是 Server-Sent Events
>首先是服务器端向客户端声明，然后接下来发送的是流信息。换句话说，此时发送的不是一个一次性的数据包，而是以数据流的形式不断地发送过来，在这种情况下，客户端不会关闭连接，会一直等着服务器端发送新的数据过来
>SSE就是利用这种机制，使用流信息像客户端推送信息。

## 对比
| sse	| websocket| 
| ---   | ---------| 
|http协议       |独立的websocket协议|
|轻量，使用简单 | 相对复杂 |
|默认支持断线重连|	需要自己实现断线重连|
| 单工| 双工|
|文本传输	|二进制传输|
|支持自定义发送的消息类型	|-|

## 缺陷
- 浏览器原生的EventSource API不支持自定义请求头
- [Server Sent Events are still not production ready after a decade. A lesson for me, a warning for you! - DEV Community](https://dev.to/miketalbot/server-sent-events-are-still-not-production-ready-after-a-decade-a-lesson-for-me-a-warning-for-you-2gie )

## 示例代码 
- 参考:
  - [Using fetch with server-sent events - YouTube](https://www.youtube.com/watch?v=GXGFCXn9Hak&ab_channel=Covalence )
  - [covalence-io/sse-fetch](https://github.com/covalence-io/sse-fetch )

## 问题与排查 
### 问题一 
- 问题: 部署后发现浏览器端无法收到消息
- 排查：
  1. 网络问题? 算了下距离，一条消息从生成到被接收要绕地球至少一圈，加上国内糟糕的网络环境，消息接收肯定会有延时，但也不至于一条都收不到。
  2. s3或cloud front设置问题? 对比之前的配置也没发现什么异常，无果
  3. 最终排查到nginx配置问题，搜到[ruby - EventSource / Server-Sent Events through Nginx - Stack Overflow](https://stackoverflow.com/questions/13672743/eventsource-server-sent-events-through-nginx )，
  
### 问题二 
- 问题: [Server Sent Events are still not production ready after a decade. A lesson for me, a warning for you! - DEV Community](https://dev.to/miketalbot/server-sent-events-are-still-not-production-ready-after-a-decade-a-lesson-for-me-a-warning-for-you-2gie )

### 问题三 
- 问题: [Can't close `fetchEventSource` with `AbortController` in React · Issue #84 · Azure/fetch-event-source](https://github.com/Azure/fetch-event-source/issues/84 )

### 问题三 
- 问题描述: 多开了几个页面后，页面的sse连接似乎被卡死。 开始的时候以为是后端代码的问题，后来发现可能是前端sse连接的`openWhenHiden:true`。然后又试了不同浏览器，发现不同浏览器卡死的页面上限又不同。于是才定位到是浏览器问题。
- [javascript - Server sent events and browser limits - Stack Overflow](https://stackoverflow.com/questions/18584525/server-sent-events-and-browser-limits )

## 为什么不使用WebSocket
以下内容均摘自[为什么当今Web应用不都采用WebSocket形式进行数据交互？ - 知乎](https://www.zhihu.com/question/417163973/answer/3352111081 )

- [龙背上的骑兵的回答 - 知乎](https://www.zhihu.com/question/417163973/answer/3028379203)
  - 成本高
    >websocket要想实现水平扩展就很复杂，因为websocke的场景一般都是双向通信，当数据库发生变更了，此时需要向客户端推送数据，要想推送数据，则必须知道和当前的客户端建立的websocket机器是哪个，然后向这台机器上的服务发送通知。所以一个多台机器的websocket服务，必须要搭配一个消息订阅服务（例如购买一个HA的redis的集群），而rest服务器则不需要。所以websocket成本更高。除非你不考虑水平扩展，只使用单台机器。
  - 没必要
    >一般情况下，客户端能在秒级内刷新数据，已经让用户感觉很实时了，这种使用rest轮训一样可以做到，性能更好，websocket则因为实时性过高，产生过多数据，消耗过多带宽。使用轮训，客户端和服务端的带宽是固定的，服务器可以合并2s内的事件统一发给客户端，流量为r。（假设通信一次数据量是固定的，为r），那么n个客户端2s内对服务器的总流量负载为 n * r.使用websocket,每个客户端都会实时发送信息，服务端收到之后都要实时广播给其他所有人，同样一次流量为r, 客户端为n 的情况下，服务器的流量总负载为:  n ^ 2 * r 。 所以websocket服务每增加一个客户端，服务器负载快速上升。一般都会通过限制一个文档内同时在线数量来避免。
- [2到8个汉字的回答 - 知乎](https://www.zhihu.com/question/417163973/answer/3352111081)提到了个[WebTransport - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport )

## 参考 
- [Using fetch with server-sent events - YouTube](https://www.youtube.com/watch?v=GXGFCXn9Hak&ab_channel=Covalence )
- [covalence-io/sse-fetch](https://github.com/covalence-io/sse-fetch )
- [Azure/fetch-event-source: A better API for making Event Source requests, with all the features of fetch()](https://github.com/Azure/fetch-event-source )
- [【WEB系列】SSE服务器发送事件详解 | 一灰灰Blog](https://spring.hhui.top/spring-blog/2020/04/01/200401-SpringBoot%E7%B3%BB%E5%88%97%E6%95%99%E7%A8%8B%E4%B9%8BSSE%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%8F%91%E9%80%81%E4%BA%8B%E4%BB%B6%E8%AF%A6%E8%A7%A3/ )
- [基于 Server-Sent Events 实现服务端消息推送 - 元培的元视角](https://blog.yuanpei.me/posts/3175881014/ )
- [Server Sent Events are still not production ready after a decade. A lesson for me, a warning for you! - DEV Community](https://dev.to/miketalbot/server-sent-events-are-still-not-production-ready-after-a-decade-a-lesson-for-me-a-warning-for-you-2gie )
- [EventSource - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventSource )
- [使用 Node.js 了解服务器发送的事件 |通过 阿帕娜·拉索尔 |中等的 --- Understanding Server-Sent Events With Node.js | by Aparna Rathore | Medium](https://rathoreaparna678.medium.com/understanding-server-sent-events-with-node-js-652f8a3c3826 )