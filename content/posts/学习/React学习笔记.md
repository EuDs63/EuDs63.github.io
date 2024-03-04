---
title: React学习笔记
slug: learn_react
date: 2023-09-12T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
categories:
  - 学习
summary: docker pull learn
--- 

## 2023年9月12日
这两个多星期来几乎都是在写React，现在对它算是又爱又恨。

### 爱

逻辑很舒服，虽然我新接触，但几乎就是很自然而然地就能开始写了。

### 恨
说恨可能有点过了，但确实遇到了好些坑，耗了好些时间。

1. `useEffect`

   看了[为什么你不应该在 React 中直接使用 useEffect 从 API 获取数据 | Sukka's Blog](https://blog.skk.moe/post/why-you-should-not-fetch-data-directly-in-use-effect/)后转而使用封装好的useSWR,现在体验感很好。

2. `useParams()`获取不到参数

   这个是我没仔细看文档，想当然了.文档中说得很明白:
   > Returns an object of key/value pairs of the dynamic params from the current URL that were matched by the route path.

   而我一开始是在Route之外去`useParams()`，最后的解决方式是，在原本的组件外套一层wrapper，这样来实现左右栏的效果
3. `Rendered more hooks than during the previous render.`

   这也是个花了我许久的报错。最头疼的是不知道是代码哪里的问题。在[stackoverflow上的一个回答](https://stackoverflow.com/questions/55622768/uncaught-invariant-violation-rendered-more-hooks-than-during-the-previous-rende)的解释下，才明白可能问题出在return和useEffect执行顺序的问题。

4. Redux，虽然用起来了，但现在还是懵懵的，还是得再看文档

### 总结
因为要赶最后的ddl，所以比较偏向于急于求成，看了看用法和示例就开始写了，虽然最后确实能写出点东西，但总有种半生不熟的感觉。

这样做还有一个很大的弊端：我跟着示例文档和ai的提示，照猫画虎写出一个能用的东西，后面为了效率，我就会直接去复用这个东西，或者在其基础上稍微修改。

代码的可复用性当然是件好事。但问题是我最开始糊出来的那个其实不一定就是好的。但如果我能在了解、学习了一定基础上再去写，成品会好很多。

我感觉一个比较理想的状态是：先学百分五六十，然后再去用。用的过程同时也加深理解。

---

## 2023年9月14日
看了[Thinking in React](https://react.dev/learn/thinking-in-react),记录一下

- Which of these are state? Identify the ones that are not:
  1. Does it remain unchanged over time? If so, it isn’t state.
  2. Is it passed in from a parent via props? If so, it isn’t state.
  3. Can you compute it based on existing state or props in your component? If so, it definitely isn’t state!

  *What’s left is probably state.*
- For each piece of state in your application:
   1. Identify every component that renders something based on that state.
   2. Find their closest common parent component -> a component above them all in the hierarchy.
   3. Often, you can put the state directly into their common parent.
   4. You can also put the state into some component above their common parent.
   5. If you can’t find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common parent component.

---

## 2024年2月28日
最近的一个小玩具[EuDs63/postkid](https://github.com/EuDs63/postkid)有轻量级的状态管理需求，权衡下决定使用[Jotai, primitive and flexible state management for React](https://jotai.org/),开始的体验很不错。

我先做好了`./work/page`这个组件。接下来我希望实现类似于Postman的多标签页。每个标签页都是用同样的组件，但它们互相独立。

本来这并不是件难事，但因为我之前偷懒，高度依赖jotai的atom来做状态管理,因此花了好些时间。

先尝试了[jotaijs/jotai-scope](https://github.com/jotaijs/jotai-scope),它给的示例确实符合我的需求，但当标签切走再切回去的时候，原来的状态就被重置了，我找不到问题所在，放弃。

中途多次问ChatGPT和Gemini，都是一开始看着很可行，然后实际不行，再问就开始重复之前的回答了。

最后是靠[Devv](https://devv.ai/zh)解决的，它说[Jotai的atomFamily](https://jotai.org/docs/utilities/family)能解决。`atomFamily`允许创建一组相关的原子，并为每个实例提供一个唯一的标识符。一试,确实可行。

现在再看我的实现，感觉还是比较简陋的。每个标签页对应一个特定的`tagId`，然后`atomFamily`就是"a Map whose key is a param and whose value is an atom config"。

---

## 2024年3月4日
- [useCallback – React](https://react.dev/reference/react/useCallback)
   1. `useCallback` is a Hook, so you can only call it at the top level of your component or your own Hooks.
   2. `useCallback` caches a **function** between re-renders until its dependencies change
   3. usage:Skipping re-rendering of components
   4. `useMemo` caches the **result** of calling your function
- [真的不可以在 React 组件内部嵌套定义子组件吗？ - PRIN BLOG](https://prin.pw/react-unstable-nested-components/)
  - 永远不要在 React 组件内部嵌套定义子组件。
  - 「渲染函数」和「函数组件」的区别:
      1. 渲染函数虽然和组件一样都返回 JSX，但它不是组件；
      2. 渲染函数就是普通 JavaScript 函数，没有状态，也没有对应的 Fiber 节点；
      3. 渲染函数只是当前组件的一部分，对于 React 渲染来说没有额外开销；
      4. 渲染函数内部**不能**使用 Hooks，只有组件内部才能使用 Hooks；
      5. 渲染函数命名一般以 render 开头，首字母小写（否则容易和组件搞混）
      6. 调用方式
  - [shuding/tilg: A magical React Hook that helps you debug components.](https://github.com/shuding/tilg)可以用来展示组件生命周期。
- 报错：`"useEffect` is called conditionally
  
  完整报错如下:

  >React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render.  react-hooks/rules-of-hooks

  解决方法很简单，只需将useEffect调用移动到组件的顶层，并使用条件语句来决定是否执行其内部的逻辑即可。

## 参考
- [为什么你不应该在 React 中直接使用 useEffect 从 API 获取数据 | Sukka's Blog](https://blog.skk.moe/post/why-you-should-not-fetch-data-directly-in-use-effect/)
- [javascript - Uncaught Invariant Violation: Rendered more hooks than during the previous render - Stack Overflow](https://stackoverflow.com/questions/55622768/uncaught-invariant-violation-rendered-more-hooks-than-during-the-previous-rende)
- [Jotai, primitive and flexible state management for React](https://jotai.org/)
- [真的不可以在 React 组件内部嵌套定义子组件吗？ - PRIN BLOG](https://prin.pw/react-unstable-nested-components/)
- [useCallback – React](https://react.dev/reference/react/useCallback)