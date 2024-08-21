---
title: React知识点整理
slug: react_points
date: 2024-03-08T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
  - React
categories:
- 学习
summary: 自己学习过程中整理的关于React的知识点
--- 
**本文记录了我学习过程中整理的关于React的知识点,以摘抄为主，绝大部分非原创。未能全部都标明出处，在此致歉**

## 生命周期
### there phases
1. mounting: initial render
2. updating: is triggered when the props are updated or when the state is updated
3. unmounting: when the component is removed from the DOM

### methods
- Each phase has specific methods responsible for a particular stage in a component's lifecycle. These methods **are technically particular to class-based components** and not intended for functional components.
- [React lifecycle methods diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- `shouldComponentUpdate` -> `useMemo`、 `memo`
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

### 参考 
- [useEffect(fn, []) 不等于 componentDidMount() - 掘金](https://juejin.cn/post/7132786097922736164)
- [The React lifecycle: methods and hooks explained](https://retool.com/blog/the-react-lifecycle-methods-and-hooks-explained)

---

## hook 
### 参考
- [React Hooks原理探究，看完不懂，你打我 - 掘金](https://juejin.cn/post/6891577820821061646)
- [React Hooks解析（看这一篇就够了） | 骚客](https://coderperson.com/2020/08/02/React%20Hooks%20%E8%A7%A3%E6%9E%90/)
- [How hooks work | How React Works](https://incepter.github.io/how-react-works/docs/react-dom/how.hooks.work/#thenable)

## 自定义hook
### hook的理解
1. Hooks 是一种范式转换，从“生命周期和时间”的思维模式转变为“状态和与DOM的同步”的思维模式
>准确来说，应该是逻辑片段复用。
>
>和组件化思维不同，这是另外一个粒度更细的代码复用思维。例如我们之前提到的，获取同样的数据。在组件化思维中，一个完整的组件，包括了这份数据，以及这份数据在页面上的展示结果。因此这是不同的复用思维。
>
>处理获取数据过程中的公用逻辑，处理公用的登陆逻辑等。自定义hooks封装的大多数情况下不是一个完整的页面逻辑实现，而是其中的一个片段。 自定义hook能够跟随函数组件重复执行，并且每次都返回最新结果。因此，我们可以非常放心大胆的封装异步逻辑。
### 自己的经历
在我写[EuDs63/BookRecommend_Front: 图书推荐系统](https://github.com/EuDs63/BookRecommend_Front)，就很经常需要从API获取数据。虽然这时候还没有自定义hook的概念，但很自然地封装了一个函数。在看了[为什么你不应该在 React 中直接使用 useEffect 从 API 获取数据 | Sukka's Blog](https://blog.skk.moe/post/why-you-should-not-fetch-data-directly-in-use-effect/)，了解到[用于数据请求的 React Hooks 库 – SWR](https://swr.vercel.app/zh-CN)。

最近还发现了阿里巴巴开源的[ahooks - React Hooks Library - ahooks 3.0](https://ahooks.js.org/),封装了常用的hook，代码量都不算很大，但都很巧妙，正在学习中。

### 参考
- [超性感的React Hooks（五）：自定义hooks](https://mp.weixin.qq.com/s?__biz=MzI4NjE3MzQzNg==&mid=2649865889&idx=1&sn=2549fb3da7608aa8e3cce0623fbd8d25)
- [超性感的React Hooks（六）自定义hooks的思维方式](https://mp.weixin.qq.com/s/GPcwIPJBc9I_NtixyU-U4Q)
- [为什么你不应该在 React 中直接使用 useEffect 从 API 获取数据 | Sukka's Blog](https://blog.skk.moe/post/why-you-should-not-fetch-data-directly-in-use-effect/)

---

## useRef的使用

### 参考

---

## useEffect
### 参考
- [A Complete Guide to useEffect — overreacted](https://overreacted.io/a-complete-guide-to-useeffect/)
- [Source code interpretation of React useEffect_javascript_rAc-React](https://devpress.csdn.net/react/62f64ea5c6770329307fc5f1.html)

---

## 虚拟DOM （Virtual Document Object Model）
在React中，当状态（state）发生变化时，React并不直接操作真实的DOM来更新页面，而是先在内存中构建一个虚拟DOM树，然后通过比较虚拟DOM树和之前渲染的虚拟DOM树之间的差异，最终计算出最小的DOM操作，并将这些操作批量应用到真实的DOM上。

### 虚拟DOM节点可能包含的详细信息
1. **type**：节点类型可以是元素节点、文本节点或者组件节点。
3. **props**：节点可能包含一些属性，这些属性描述了节点的特征，比如元素节点的class、id、style等属性，以及事件处理函数等。chidren 是 props 中的一个属性，它存储了当前组件的孩子节点，可以是数组（多个孩子节点）或对象（只有一个孩子节点）
6. **key**：用于在DOM的重渲染过程中标识节点的唯一性，有助于React在进行差异比较时准确找到对应的节点。
7. **ref**：用于获取节点的引用，通常用于在组件中操作DOM节点。
8. **owner**: 所属的Component
9. 其他

### diff算法
- 比较当前的虚拟DOM树和状态变更将要重新渲染时生成的虚拟DOM树的算法。
- 关键：
  1. 深度优先
  2. 只对同一级别的元素进行比较
- 三种diff
  1. tree diff : 只是简单进行了删除和创建操作
  2. component diff：
     - 使用的是`===`严格相等。也就是"引用相等性"
     - 不同类型 -> 直接替换整个组件下的所有子节点，即销毁原组件，创建新组件。
     - 同一类型 -> 继续判断
  3. element diff: 针对同一层级的所有节点（包括元素节点和组件节点）的 diff 算法
     - 三种操作：
       1. insert_markup
       2. move_existing
       3. remove_node: 
     - 涉及到列表元素顺序的动态变更时，不要用遍历的 index 作为节点的 key 属性值

### 参考
- [谈谈虚拟DOM，Diff算法与Key机制_React_beifeng1996_InfoQ写作社区](https://xie.infoq.cn/article/65e938d933cc751fcc008942d)

--- 

## 组件间通信方式

---

## React Router 

---

## React Fiber 
### 参考
- [An Introduction to React Fiber - The Algorithm Behind React](https://www.velotio.com/engineering-blog/react-fiber-algorithm)

---

## useId
- [useId – React](https://react.dev/reference/react/useId )
- generate a unique ID
- A component may be rendered more than once on the page—but IDs have to be unique! Instead of hardcoding an ID, generate a unique ID with useId.

## 参考
- [sudheerj/reactjs-interview-questions: List of top 500 ReactJS Interview Questions & Answers....Coding exercise questions are coming soon!!](https://github.com/sudheerj/reactjs-interview-questions)