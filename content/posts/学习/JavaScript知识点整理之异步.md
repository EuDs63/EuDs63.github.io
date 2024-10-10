---
title: JavaScript知识点整理之异步
slug: javascript_points_of_async
date: 2024-05-25T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
  - JavaScript
categories:
  - 学习
summary: 自己学习过程中整理的关于JavaScript中异步的知识点
--- 

## Promise 
### 描述
一个 Promise 是一个**代理**，它代表一个在创建 promise 时不一定已知的值。它允许你将处理程序与异步操作的最终成功值或失败原因关联起来。这使得异步方法可以像同步方法一样返回值：异步方法不会立即返回最终值，而是返回一个 promise，以便在将来的某个时间点提供该值。

### 状态
- 待定（pending）：初始状态，既没有被兑现，也没有被拒绝。
- 已兑现（fulfilled）：意味着操作成功完成。
- 已拒绝（rejected）：意味着操作失败。

### 方法 
- `.then()`:
  - 最多接受两个参数；第一个参数是 Promise 兑现时的回调函数，第二个参数是 Promise 拒绝时的回调函数
  - 返回一个新生成的 Promise 对象，这个对象可被用于链式调用
- `.catch()`其实就是一个没有为 Promise 兑现时的回调函数留出空位的 `.then()`
- `Promise.all()`
  - 特点
    1. 接收一个可迭代对象
    2. 传入的数据中可以是普通数据，也可以是Promise对象
    3. 可迭代对象的promise是并行执行的
    4. 保持输入数组的顺序和输出数组的顺序一致
    5. 传入数组中只要有一个reject，立即返回reject,并带有第一个被拒绝的原因。
    6. 所有数据resolve之后返回一个 Promise
  - 实现：[手写Promise.all - 掘金](https://juejin.cn/post/7006200103157383175)
- `Promise.any()`
  - 当输入的任何一个 Promise 兑现时，这个返回的 Promise 将会兑现，并返回第一个兑现的值。当所有输入 Promise 都被拒绝（包括传递了空的可迭代对象）时，它会以一个包含拒绝原因数组的 AggregateError 拒绝。

### 作用
  - 参考[Promise作用以及基本使用 - 掘金](https://juejin.cn/post/6844903693658259464)
  - 将异步操作以同步操作的流程表达出来，避免层层嵌套的回调函数。表达更清晰高效，也更便于维护。

### 缺点
  1. 一旦新建它就会立即执行，无法中途取消
  2. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
  3. 当处于Pending状态时，无法得知目前进展到哪一个阶段

### 问题一：与`setTimeout`的区别
- setTimeout处于宏任务队列，Promise位于微任务队列
- 示例 
```JavaScript
// 用一个已解决的 Promise——“resolvedProm”为例，
// 函数调用“resolvedProm.then(...)”立即返回一个新的 Promise，
// 但是其中的处理器“(value) => {...}”将被异步调用，正如打印输出所示。
// 新的 Promise 被赋值给“thenProm”，
// 并且 thenProm 将被解决为处理函数返回的值。
const resolvedProm = Promise.resolve(33);
console.log(resolvedProm);

const thenProm = resolvedProm.then((value) => {
  console.log(
    `在主堆栈结束后被调用。收到的值是：${value}，返回的值是：${value + 1}`,
  );
  return value + 1;
});
console.log(thenProm);

// 使用 setTimeout，我们可以将函数的执行推迟到调用栈为空的时刻。
setTimeout(() => {
  console.log(thenProm);
});

// 按顺序打印：
// Promise {[[PromiseStatus]]: "resolved", [[PromiseResult]]: 33}
// Promise {[[PromiseStatus]]: "pending", [[PromiseResult]]: undefined}
// "在主堆栈结束后被调用。收到的值是：33，返回的值是：34"
// Promise {[[PromiseStatus]]: "resolved", [[PromiseResult]]: 34}
```  
- 参考:
  - [setTimeout+Promise+Async输出顺序？很简单呀！掘金](https://juejin.cn/post/7016298598883131423 )

### 问题二: Promise的原理
- 观察者模式
wip

### 问题三: 如果想要promise.all方法里所有promise的状态该怎么办
wip

### 参考
- [Promise - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Promise.any() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)
- [Promise.all() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [浅析setTimeout与Promise - 掘金](https://juejin.cn/post/6844903655473152008)

---

## async/await
### 作用
- 函数前面的关键字`async`有两个作用：
  1. 让这个函数总是返回一个 promise。
  2. 允许在该函数内使用 await。
- Promise 前的关键字 `await`
  -  使 JavaScript 引擎等待该 promise settle，然后：
     1. 如果有 error，就会抛出异常 —— 就像那里调用了 throw error 一样。
     2. 否则，就返回结果
### 实现 
wip

### 如何处理错误
### 示例
  ```JavaScript
  async function f() {
    try {
      let results = await Promise.all([
        fetch(url1),
        fetch(url2)
      ]);
    } catch(err) {
      alert(err);
    }
  }

  f();
  ```
  ```JavaScript
  const arr = [];

  async function add(arr, item) {
      await Promise.resolve();
      arr.push(item);
  }

  (async () => {
  console.log('arr in IIFE1', arr.toString());
  await add(arr, 2);
  console.log('arr in IIFE2', arr.toString());
  })()

  add(arr, 1); 

  (async () => {
  console.log('arr in IIFE3', arr.toString());
  await add(arr, 3);
  console.log('arr in IIFE4', arr.toString());
  })()

  console.log('arr', arr.toString());

  setTimeout(()=>{
    console.log('arr in setTimeout', arr.toString());
  },1000);

  // arr in IIFE1
  // arr in IIFE3
  // arr
  // arr in IIFE2 2,1,3
  // arr in IIFE4 2,1,3
  // arr in setTimeout 2,1,3
  ```
### 参考
  - [async/await](https://zh.javascript.info/async-await)

---

## 异步请求的竞态问题
### 场景一 
- 描述：需多次请求某一api，响应时间不固定。需要渲染的是最后一个请求返回的结果;常见于搜索，分页，选项卡等切换的场景
- 方法一：**忽略**: 计数，然后判断
- 方法二：**取消**: 在连续的请求过程中，每当我发出一个请求，我就将之前正在 pending 的请求的 Promise reject 掉，并且该请求的 XHR 对象执行 abort()；之前的请求 如果已经有响应的不用管它，我们当前的请求的结果会覆盖它的

### 参考:
  - [blog/Blog/如何解决异步请求的竞态问题.md at master · YuArtian/blog](https://github.com/YuArtian/blog/blob/master/Blog/%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E5%BC%82%E6%AD%A5%E8%AF%B7%E6%B1%82%E7%9A%84%E7%AB%9E%E6%80%81%E9%97%AE%E9%A2%98.md)
  - [如何解决前端常见的竞态问题-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/2193937)