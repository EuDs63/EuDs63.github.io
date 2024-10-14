---
title: 前端知识点整理
slug: frontend_points
date: 2024-03-07T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
categories:
  - 学习
summary: 自己学习过程中整理的关于前端的知识点
--- 

## 存在问题
当做聊天页时会遇到下拉加载历史记录，当我们获取历史记录并将其放进页面数组时，新获取的历史记录会将你刚刚看的信息挤下去，这时你要往上拉才能回到你刚刚看的信息。
虽然可以通过获取刚看的那条信息的位置，等历史记录拉取下来后再通过改变滚动条回到其原来的位置，但这样会让页面出现闪动，信息会先下去，然后再上来。

## IntersectionObserver
- [不到20行js实现高性能图片懒加载](https://mp.weixin.qq.com/s/vhpXEaumPp5VvR7Zt9jGkQ )
- [IntersectionObserver - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver )
- [Making use of Observers in React. Ever needed to manipulate the DOM when… | by Jens Lind | Strise | Medium](https://medium.com/strise/making-use-of-observers-in-react-a29b1fd05fa7 )
- [Infinite scrolling in React with intersection observer - DEV Community](https://dev.to/hey_yogini/infinite-scrolling-in-react-with-intersection-observer-22fh )

## 滚动到对应位置
- [Manipulating the DOM with Refs – React](https://react.dev/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback )

## overflow-anchor 
- [解决聊天页下拉加载历史记录，新获取的历史记录把刚看的信息挤下去的问题 - 掘金](https://juejin.cn/post/7112349799373864996 )
- [overflow-anchor - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor )
- [Overflow-anchor | CSS-Tricks](https://css-tricks.com/almanac/properties/o/overflow-anchor/ )

>Scroll Anchoring is a browser feature that attempts to prevent a common situation where you may scroll down a webpage before the DOM has fully loaded and, when it does, any elements that load above your current location push you further down the page.

## 反向渲染
[前端开发中聊天场景的体验优化 | AlloyTeam](https://www.alloyteam.com/2020/04/14349/comment-page-1/#comments )

## 计算并设置正确的滚动位置
- [React中将一直增加消息的滚动框保持在当前浏览的位置-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/2176884 )

- [小tips: 滚动容器尺寸变化子元素视觉上位置不变JS实现 « 张鑫旭-鑫空间-鑫生活](https://www.zhangxinxu.com/wordpress/2018/02/container-scroll-position-hold/ )

## 位置不对
[前端体验优化之图片加载闪烁 | ShyMean](https://www.shymean.com/article/%E5%89%8D%E7%AB%AF%E4%BD%93%E9%AA%8C%E4%BC%98%E5%8C%96%E4%B9%8B%E5%9B%BE%E7%89%87%E5%8A%A0%E8%BD%BD%E9%97%AA%E7%83%81 )
