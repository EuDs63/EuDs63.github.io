---
title: 进一步学习ReactHook
slug: learn_react_hook
date: 2024-10-08T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
  - React
categories:
- 学习
summary: 从“生命周期和时间”的思维模式转变为“状态和与DOM的同步”的思维模式
--- 

## React 官方 Hook
Hook 是 React 16.8 之后引入的一个特性，允许你在不使用类组件的情况下在函数组件中引入状态和其他 React 特性。

### `useState`
- `useState` 允许在函数组件中引入局部状态。它的实现依赖于闭包和状态管理机制。
- 每次渲染时，React 通过维护一个 “hook 调用栈” 来保存每次调用 `useState` 后的状态。这些状态被保存在一个链表结构中，每次渲染时 React 都会按顺序遍历这些状态。
  
### `useEffect`
- `useEffect` 允许在函数组件中执行副作用，比如数据请求、订阅、直接 DOM 操作等。- 它的实现原理是通过依赖数组来追踪变化，并在 DOM 完成更新后执行指定的副作用逻辑。如果某些依赖值发生变化，React 就会在下一次渲染后重新执行该副作用函数。

### `useContext`
wip

### `useReducer`
wip

- 参考: [深入学习React Hook——useReducer - 掘金](https://juejin.cn/post/7091180323123232782 )

## useId
- [useId – React](https://react.dev/reference/react/useId )
- generate a unique ID
- A component may be rendered more than once on the page—but IDs have to be unique! Instead of hardcoding an ID, generate a unique ID with useId.

---

### Hook 的顺序与规则
- Hook 的使用顺序非常重要。React 需要在每次渲染时依赖 Hook 调用的顺序来关联正确的状态。所以，Hook 必须在顶层调用，不能放在条件或循环中。
  

### 参考
- [React Hooks原理探究，看完不懂，你打我 - 掘金](https://juejin.cn/post/6891577820821061646)
- [React Hooks解析（看这一篇就够了） | 骚客](https://coderperson.com/2020/08/02/React%20Hooks%20%E8%A7%A3%E6%9E%90/)
- [How hooks work | How React Works](https://incepter.github.io/how-react-works/docs/react-dom/how.hooks.work/#thenable)
- [react hooks 的原理是什么 · Issue #138 · z-memo/interview](https://github.com/z-memo/interview/issues/138 )

---

## 自定义hook
### hook的理解
1. >在 React 中被调用的且以 use 开头命名的函数叫 Hook。
2. Hooks 是一种范式转换，从“生命周期和时间”的思维模式转变为“状态和与DOM的同步”的思维模式
>准确来说，应该是逻辑片段复用。
>
>和组件化思维不同，这是另外一个粒度更细的代码复用思维。例如我们之前提到的，获取同样的数据。在组件化思维中，一个完整的组件，包括了这份数据，以及这份数据在页面上的展示结果。因此这是不同的复用思维。
>
>处理获取数据过程中的公用逻辑，处理公用的登陆逻辑等。自定义hooks封装的大多数情况下不是一个完整的页面逻辑实现，而是其中的一个片段。 自定义hook能够跟随函数组件重复执行，并且每次都返回最新结果。因此，我们可以非常放心大胆的封装异步逻辑。

3.  自定义 Hook 是将逻辑封装为可重用的代码块。它实际上是一个普通的 JavaScript 函数，可以使用其他 Hook，并返回状态或副作用逻辑。自定义 Hook 让组件逻辑更加灵活和可重用。

### 自己的经历
1. 在我写[EuDs63/BookRecommend_Front: 图书推荐系统](https://github.com/EuDs63/BookRecommend_Front)，就很经常需要从API获取数据。虽然这时候还没有自定义hook的概念，但很自然地封装了一个函数。在看了[为什么你不应该在 React 中直接使用 useEffect 从 API 获取数据 | Sukka's Blog](https://blog.skk.moe/post/why-you-should-not-fetch-data-directly-in-use-effect/)，了解到[用于数据请求的 React Hooks 库 – SWR](https://swr.vercel.app/zh-CN)。

2. 发现了阿里巴巴开源的[ahooks - React Hooks Library - ahooks 3.0](https://ahooks.js.org/),封装了常用的hook，代码量都不算很大，但都很巧妙，正在学习中。

3. 看[How to integrate Google Analytics with React JS application? | Saeloun Blog](https://blog.saeloun.com/2022/02/17/how-to-integrate-react-app-with-google-analytics/ ) ,可以把ga给集成为hook,react-router-dom

4. 读[用于数据请求的 React Hooks 库 – SWR](https://swr.vercel.app/zh-CN )，看上了[Subscription – SWR](https://swr.vercel.app/zh-CN/examples/subscription )，感觉能用来替代项目中使用的redux，但搜了圈，能找到的资料不多，算了。

5. 发现[useHooks – The React Hooks Library](https://usehooks.com/ )，可以学学

### 参考
- [超性感的React Hooks（五）：自定义hooks](https://mp.weixin.qq.com/s?__biz=MzI4NjE3MzQzNg==&mid=2649865889&idx=1&sn=2549fb3da7608aa8e3cce0623fbd8d25)
- [超性感的React Hooks（六）自定义hooks的思维方式](https://mp.weixin.qq.com/s/GPcwIPJBc9I_NtixyU-U4Q)
- [为什么你不应该在 React 中直接使用 useEffect 从 API 获取数据 | Sukka's Blog](https://blog.skk.moe/post/why-you-should-not-fetch-data-directly-in-use-effect/)
- [Hook 规则 – React 中文文档](https://zh-hans.react.dev/warnings/invalid-hook-call-warning )

---

## 问题
### React 是如何把对 Hook 的调用和组件联系起来的？
[Hooks FAQ – React](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#under-the-hood )
>React 保持对当前渲染中的组件的追踪。Hook 只会在 React 组件中被调用（或自定义 Hook —— 同样只会在 React 组件中被调用）。
>
>每个组件内部都有一个「记忆单元格」列表。它们只不过是我们用来存储一些数据的 JavaScript 对象。当你用 useState() 调用一个 Hook 的时候，它会读取当前的单元格（或在首次渲染时将其初始化），然后把指针移动到下一个。这就是多个 useState() 调用会得到各自独立的本地 state 的原因。

### 为什么useState是异步的
`useState` 的行为在**某种程度**上表现为异步，主要原因是为了优化 React 的渲染过程和性能。React 将多个状态更新合并到一起，并通过批量更新的方式避免不必要的重新渲染。具体原因如下：

1. **批量更新机制**
  - React 在处理事件处理函数或生命周期方法（如 `useEffect`）中的 `setState` 调用时，通常不会立即应用状态更新，而是会将这些更新“批量”处理。在一次事件循环中，多个 `setState` 调用会被合并为一次更新。这种批量更新策略可以提高性能，避免在每次状态变化后都重新渲染组件。
  - 示例：批量更新
   ```js
   function MyComponent() {
     const [count, setCount] = useState(0);

     const handleClick = () => {
       setCount(count + 1); // 更新不会立即发生
       setCount(count + 2); // 也不会立即发生
     };

     return (
       <div>
         <p>{count}</p>
         <button onClick={handleClick}>Increment</button>
       </div>
     );
   }
   ```
   在这个例子中，虽然调用了两次 `setCount`，但 React 会将它们合并为一次更新。
2. 异步特性防止多次渲染
  - 如果 `useState` 是同步的，每次调用 `setState` 时都会导致组件重新渲染，这样会严重影响性能。想象在一次事件处理函数中调用多次 `setState`，如果每次都导致同步重新渲染，性能开销将非常高。

  - 示例：同步更新的弊端
   ```js
   function MyComponent() {
     const [count, setCount] = useState(0);

     const handleClick = () => {
       setCount(count + 1); // 如果是同步，组件将立即重新渲染
       setCount(count + 2); // 会导致多次无效渲染
     };

     return (
       <div>
         <p>{count}</p>
         <button onClick={handleClick}>Increment</button>
       </div>
     );
   }
   ```
   如果 `setCount` 是同步的，React 会在每次状态更新时都重新渲染组件，导致性能下降。为了避免这种情况，React 通过异步机制将多次更新合并到一次渲染中。

3. React Fiber 架构
   - React 引入了新的 Fiber 架构，使其能够以分片的方式执行任务，将大任务切分成小的可中断的子任务。在此过程中，React 可能会推迟状态更新，直到它完成当前的渲染工作。这样可以确保用户界面始终保持流畅。
   - 如果 `useState` 是同步的，React 就无法利用 Fiber 架构的优势来进行任务调度和批量更新。

4. 状态更新并不真正是异步的
   - 虽然 `useState` 的更新机制表现为异步，但从技术上讲，它并不是真正的异步操作，像 `Promise` 那样。实际上，它是在下一个渲染周期中同步更新的。React 将状态更新延迟到合适的时机，而不是立即应用。
   - 示例：获取最新状态
   ```js
   function MyComponent() {
     const [count, setCount] = useState(0);

     const handleClick = () => {
       setCount(prevCount => prevCount + 1); // 使用回调函数获取最新的状态
       setCount(prevCount => prevCount + 1); // 这样可以确保多次更新正确执行
     };

     return (
       <div>
         <p>{count}</p>
         <button onClick={handleClick}>Increment</button>
       </div>
     );
   }
   ```
   通过回调函数 `prevCount`，我们可以确保每次更新都基于最新的状态值。这样即便 `setState` 是异步的，也能确保状态更新的正确性。

### 为什么hooks不能写在if/else等语句里
1. Hooks 调用顺序的依赖
   - React 使用一个内部的“链表”来跟踪组件中的每个 Hook 的调用。当 React 渲染组件时，Hooks 是按照定义的顺序被调用的。在后续渲染中，React 依赖这个顺序来确保同一个 Hook 对应的是之前的状态或副作用。
   - 示例
   ```jsx
   function MyComponent() {
     const [count, setCount] = useState(0);  // Hook 1
     const [name, setName] = useState('');   // Hook 2

     useEffect(() => {                       // Hook 3
       document.title = `Count: ${count}`;
     }, [count]);

     return <div>{count}</div>;
   }
   ```
   在每次渲染中，React 会按照调用顺序分配状态：
   1. `useState(0)` 对应第一个状态 `count`。
   2. `useState('')` 对应第二个状态 `name`。
   3. `useEffect` 处理副作用。

   如果这个顺序保持一致，React 能够正确地追踪状态和副作用。

2. 在条件语句中使用 Hooks的后果
   - 可能会导致 Hooks 的调用顺序在不同渲染中不一致

   - 错误示例
   ```js
   function MyComponent() {
     const [count, setCount] = useState(0);  // Hook 1

     if (count > 0) {
       const [name, setName] = useState('');  // Hook 2 （条件性调用）
     }

     useEffect(() => {                       // Hook 3
       document.title = `Count: ${count}`;
     }, [count]);

     return <div>{count}</div>;
   }
   ```
   如果 `count > 0`，`name` 的 `useState` 会被调用。但如果 `count <= 0`，该 `useState` 不会被调用。这导致：
   - 当 `count > 0` 时，`useEffect` 是第三个 Hook。
   - 当 `count <= 0` 时，`useEffect` 是第二个 Hook。

   这样，React 无法知道哪个 Hook 应该关联到哪个状态，状态更新和副作用可能会错误地关联到不同的 Hook，导致不可预知的错误。

3. React 如何追踪 Hooks
   - React 通过一个全局的“调用栈”来追踪每个组件中的 Hooks。当组件渲染时，React 会按顺序调用所有的 Hooks，并在内部记录这些调用。这样，每次渲染时，React 能够依赖这个顺序来关联状态。
   - 如果在 `if/else` 中使用 Hooks，可能会导致某些 Hooks 在特定条件下被跳过，破坏这个顺序，从而导致错误的状态关联。

4. 报错提示
   - > Rendered more hooks than during the previous render
   - > Hooks can only be called inside the body of a function component.

5. 参考
   - [为什么不能在if语句里面写hooks，HooKs链表写得清清楚楚🤣🤣🤣 - 码农之家](https://www.pipipi.net/28758.html )
   - [Hook 规则 – React 中文文档](https://zh-hans.react.dev/warnings/invalid-hook-call-warning )
   - [Why Do React Hooks Rely on Call Order? — overreacted](https://overreacted.io/why-do-hooks-rely-on-call-order/ )
   - [react hooks 的原理是什么 · Issue #138 · z-memo/interview](https://github.com/z-memo/interview/issues/138 )

### hooks能实现类里面的所有生命周期吗
- "Commit phase"中的三个方法,Can work with DOM, run side effects, schedule updates：
  1. `componentDidMount` -> the useEffect hook with the second argument of []
  2. `componentDidUpdate` -> the useEffect hook with the second argument of [state]
  3. `componentWillUnmount` -> **return a function** that runs on unmounting inside the useEffect function,例:
    ```JavaScript
        useEffect(() => {
        console.log("Hello");

        return () => {
        console.log("Bye");
        };
    }, []);
    ```
- 上面的类比只是类比，不能等同，原因：
  1. 实际原理不同
  2. 执行时机不同
