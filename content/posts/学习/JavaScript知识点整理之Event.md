---
title: JavaScript知识点整理之Event
slug: javascript_points_of_event
date: 2024-09-25T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
  - JavaScript
categories:
  - 学习
summary: 自己学习过程中整理的关于JavaScript中Event的知识点
--- 

## 事件传播的 3 个阶段
1. 捕获阶段（Capturing phase）—— 事件（从 Window）向下走近元素。
2. 目标阶段（Target phase）—— 事件到达目标元素。
3. 冒泡阶段（Bubbling phase）—— 事件从元素上开始冒泡。

---

## 冒泡 
- 参考[冒泡和捕获](https://zh.javascript.info/bubbling-and-capturing)
- 当一个事件发生在一个元素上，它会首先运行在该元素上的处理程序，然后运行其父元素上的处理程序，然后一直向上到其他祖先上的处理程序。
- 引发事件的那个嵌套层级最深的元素被称为目标元素,可以通过`event.target`访问
- 用于停止冒泡的方法
  1. `event.stopPropagation()`: 停止向上移动，但是当前元素上的其他处理程序都会继续运行
  2. `event.stopImmediatePropagation()` : 停止冒泡，且其他处理程序不会被执行。
- [JavaScript 中那些不会冒泡的事件 - 知乎](https://zhuanlan.zhihu.com/p/164844013)
  1. scroll 
  2. blur & focus
  3. media事件 
  4. mouseLeave & mouseEnter
  5. 注意：mouseout/mouseover **会触发**冒泡

---

## preventDefault
- 参考[Event：preventDefault() 方法 - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)
- 如果此事件没有被显式处理，它默认的动作也不应该照常执行
- 此事件还是继续传播，除非碰到事件监听器调用 stopPropagation() 或 stopImmediatePropagation()，才停止传播
- 示例:
```JavaScript
window.addEventListener("beforeunload", (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = "";
});
```

---

## addEventListener
### 语法
```JavaScript
addEventListener(type, listener)
addEventListener(type, listener, options)
addEventListener(type, listener, useCapture) //旧版本的 DOM 的规定
```

### `options`
- capture:boolean
- once:boolean
- passive:boolean True -> preventDefault() 不会被调用
- signal

### 注意
- [处理过程中 this 的值的问题 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#%E5%A4%84%E7%90%86%E8%BF%87%E7%A8%8B%E4%B8%AD_this_%E7%9A%84%E5%80%BC%E7%9A%84%E9%97%AE%E9%A2%98)

### 参考:
- [EventTarget: addEventListener() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [滚动事件优化 passive - 孟繁贵 - 博客园](https://www.cnblogs.com/mengfangui/p/11322590.html)

---

## removeEventListener
- 如果同一个事件监听器分别为“事件捕获（capture 为 true）”和“事件冒泡（capture 为 false）”注册了一次，这两个版本的监听器需要分别移除。移除捕获监听器不会影响非捕获版本的相同监听器，反之亦然。
- `options`只有 capture 配置影响 removeEventListener()
- 参考[EventTarget: removeEventListener() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)

---

## 事件委托
### 概念
- 事件处理模式之一,也称事件代理
- 对于许多以类似方式处理的元素，不必为每个元素分配一个处理程序，而是将单个处理程序放在它们的共同祖先上
- 在处理程序中，我们获取`event.target`以查看事件实际发生的位置并进行处理。

### 优点:
 1. 减少事件注册，提升性能
 2. 简化了dom节点更新时，相应事件的更新

### 缺点:
1. 基于冒泡，对于不冒泡的事件不支持
2. 层级过多，冒泡过程中，可能会被某层阻止掉。
3. 理论上委托会导致浏览器频繁调用处理函数，虽然很可能不需要处理。所以建议就近委托，比如在table上代理td，而不是在document上代理td

### React中的事件委托
- React 借鉴事件委托的方式将大部分事件委托给了 Document 对象
- 事件委托需要区分捕获和冒泡，有些事件由于没有冒泡过程，只能在捕获阶段进行事件委托
- 没有进行委托的事件是`Form`事件和`Media`事件，原因是这些事件针对特性类型元素，委托意义不大，React 将其直接注册到了目标对象
- React 中的事件分为 3 类。
  1. DiscreteEvent：click，blur,focus,submit,tuchStart 等。优先级最低。
  2. UserBlockingEvent：touchMove,mouseMove,scroll,drag,dragOver 等。这些事件会阻塞用户的交互，优先级次之
  3. ContinuousEvent：load,error,loadStart,abort,animationend 等。优先级最高，不会被打断。

### 示例
- html
  ```html
  <ul>
    <li>Exercise</li>
    <li>Write code</li>
    <li>Play music</li>
    <li>Relax</li>
  </ul>
  ```
- css
  ```JavaScript
  const list = document.querySelector("ul");
  list.addEventListener(
    "click",
    (ev) => {
      if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("done");
      }
    },
    false,
  );
  ```

### 参考
- [事件委托](https://zh.javascript.info/event-delegation)
- [js中的事件委托或事件代理详解 - 掘金](https://juejin.cn/post/6844903589052153869)
- [React 中的事件委托 - 知乎](https://zhuanlan.zhihu.com/p/165089379)
- [React 中的事件委托 - 知乎](https://zhuanlan.zhihu.com/p/165089379)

---

## setTimeout
- 参考[setTimeout() 全局函数 - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout)
- 参数:
  ```JavaScript
  var timeoutID = setTimeout(func, [delay, arg1, arg2, ...]);
  // timeoutID 可用来作为 clearTimeout() 的参数来清除对应的定时器
  // arg1, ..., argN 可选  当计时结束的时候，将被传递给 func 函数的附加参数。
  ```
- func应是对函数的引用，示例:
```JavaScript
function sayHi() {
  alert('Hello');
}
// 正确
setTimeout(sayHi, 1000);
// 错的！
setTimeout(sayHi(), 1000); //这样传入的是sayHi函数的执行结果:undefined
```
- `delay`默认为0，代表了消息被实际加入到队列的**最小延迟时间**。如果队列中没有其他消息并且栈为空，在这段延迟时间过去之后，消息会被马上处理。
- 在默认情况下，在 `setTimeout()` 内部，this 关键字将被设置为 globalThis，在浏览器中它是 window 对象
- setTimeout为啥不准（线程间通信怎么都会有延迟的）
- 定时器原理setTimeout/setInterval（以前翻过v8的源码，本质上都是二叉堆，与react里的scheduler的实现有异曲同工之处）

---

## setInterval
- 参数：
  ```JavaScript
  var intervalID = setInterval(func, [delay, arg1, arg2, ...]);
  // intervalID 可用来作为 clearInterval() 的参数来清除对应的定时器
  // arg1, ..., argN 可选  当计时结束的时候，将被传递给 func 函数的附加参数。
  ```
- 每间隔给定的时间周期性执行
- 参考:
  - [setInterval() - Web API 接口 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/setInterval)
  - [调度：setTimeout 和 setInterval](https://zh.javascript.info/settimeout-setinterval)

---

## 事件循环
- 三种数据结构：
  1. stack: 函数调用形成了一个由若干帧组成的栈
  2. heap: 对象被分配在堆中
  3. queue: 一个待处理消息的消息队列。每一个消息都关联着一个用以处理这个消息的回调函数
- JavaScript 的异步任务根据事件分类分为两种：宏任务（MacroTask）和微任务（MicroTask）
  1. 宏任务 
     - I/O（Mouse Events、Keyboard Events、Network Events）
     - setTimeout、setInterval、setImmediate
     - UI Rendering（HTML Parsing）
     - MessageChannel
     - JavaScript Run
  2. 微任务
     - DOM mutations
     - Promises
  3. 优先级
     - 宏任务的优先级高于微任务
     - 每个宏任务执行完毕后都必须将当前的微任务队列清空
- 参考
  -  [事件循环 - JavaScript Guidebook](https://tsejx.github.io/javascript-guidebook/core-modules/executable-code-and-execution-contexts/concurrency-model/event-loop/)
  -  [浅析setTimeout与Promise - 掘金](https://juejin.cn/post/6844903655473152008)
  -  [JS Visualizer 9000](https://www.jsv9000.app/)

---

## 面试问题
1. 实现一个事件处理对象，包括绑定，取消，执行功能
思路:构造函数里面初始化一个空对象，存储事件名。绑定，取消(对应置空)就在这个数组里面操作。执行先判断是否存在，然后调用apply函数执行回调。

