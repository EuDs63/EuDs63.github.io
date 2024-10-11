---
title: React学习经历
slug: learn_react
date: 2023-09-12T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
  - React
categories:
  - 学习
summary: 记录学习React的经历，按日期进行排序，会比较乱
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
   5. The only benefit to `useCallback` is that it lets you avoid writing an extra nested function inside. It doesn’t do anything else.
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
- 报错：`useEffect` is called conditionally
  
  完整报错如下:

  >React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render.  react-hooks/rules-of-hooks

  解决方法很简单，只需将useEffect调用移动到组件的顶层，并使用条件语句来决定是否执行其内部的逻辑即可。

- [Render and Commit – React](https://react.dev/learn/render-and-commit)
  - 在 React 中，每次更新都分为 两个阶段：
    1. 在 渲染 阶段， React 调用你的组件来确定屏幕上应该显示什么。
    2. 在 提交 阶段， React 把变更应用于 DOM。
  - Process of requesting and serving UI has three steps:
    1. Triggering a render
    2. Rendering
    3. Committing to the DOM 
  - Two reasons for a component to render:
    1. It’s the component’s initial render.
    2. The component’s (or one of its ancestors’) state has been updated.

---

## 2024年3月5日
- [Developer Way: React components composition: how to get it right](https://www.developerway.com/posts/components-composition-how-to-get-it-right)
  - The core React development and decomposition rules:
    1. always start implementation from the top
    2. extract components only when there is an actual need for it
    3. always start from “simple” components, introduce other composition techniques only when there is an actual need for them
  - A component should be described either as a “component that implements various stuff” or as a “component that composes various components together”, not both.
  - Extract Container components when there is a need to share some visual or behavioural logic that wraps elements that still need to be under “consumer” control
  - What makes a good component?
    1. 易读
    2. 命名清晰准确
    3.  doesn’t do things that are irrelevant to its declared purpose

---

## 2024年3月6日
- [Composition vs Inheritance – React](https://legacy.reactjs.org/docs/composition-vs-inheritance.html#containment)
  - "children" is just a prop. The fancy “composition” pattern that we use is a syntax sugar.
  - Inheritance is not recommended. If you want to reuse non-UI functionality between components, we suggest **extracting it into a separate JavaScript module**. The components may import it and use that function, object, or class, without extending it.

- [Developer Way: The mystery of React Element, children, parents and re-renders](https://www.developerway.com/posts/react-elements-children-parents) 
  - Components that are passed as props don’t re-render.
  - If children are passed as a render function, they start re-rendering.

---

## 2024年3月7日
- 读[<Fragment> (<>...</>) – React 中文文档](https://zh-hans.react.dev/reference/react/Fragment)，原来`<>`是`<Fragment`的简写。

---

## 2024年3月8日
- 受控组件 v.s 非受控组件 
  - 参考[重新认识受控与非受控组件](https://muyunyun.cn/blog/56hn38ez)
  - In a controlled component, form data is handled by a React component.
  - In a uncontrolled component, form data is handled by the DOM itself.
  - 受控以及非受控组件的边界划分取决于当前组件对于子组件值的变更是否拥有控制权。
- [当我输入时，输入框光标会跳到开头– React 中文文档](https://zh-hans.react.dev/reference/react-dom/components/input#my-input-caret-jumps-to-the-beginning-on-every-keystroke)
  > 有可能是因为每次输入时输入框都从 DOM 中删除并重新添加。同样，如果在每次重新渲染时不小心 重置了 state，就会发生这种情况。例如，如果输入框或其祖先组件总是接收不同的 key，或者嵌套使用组件（这在 React 中是不允许的，并且会导致“内部”组件在每次渲染时重新挂载），就会发生这种情况。

  我在写[EuDs63/postkid](https://github.com/EuDs63/postkid)就遇到了这个问题，原来如此。

---

## 2024年3月9日
- redux 

- useContext的使用

- 自定义hook

---

### ref 
- ref 是一个普通的 JavaScript 对象，具有可以被读取和修改的 current 属性。
- [ref 和 state 的不同之处](https://zh-hans.react.dev/learn/referencing-values-with-refs#differences-between-refs-and-state)
  1. 更改不会触发渲染
  2. 无set
  3. 可变 —— 你可以在渲染过程之外修改和更新 current 的值。
  4. 不应在渲染期间读取（或写入） current 值。
- 使用时机
  1. 当一条信息仅被事件处理器需要，并且更改它不需要重新渲染时，使用 ref 可能会更高效。
  2. 你的组件需要“跳出” React 并与外部 API 通信时
  3. 存储和操作 DOM 元素
  4. 存储不需要被用来计算 JSX 的其他对象
- `ref`回调函数
  1. 参考[ref 回调函数 – React 中文文档](https://zh-hans.react.dev/reference/react-dom/components/common#ref-callback)
  2. 不要从 ref 回调函数中返回任何内容。
  3. 当回调函数被附加在 ref 属性后，触发回调时，该参数为对应的 DOM 节点。当 ref 被分离时值为 null。除非在每次渲染时都传递相同的函数引用作为 ref 回调，否则该回调将在组件的每次重新渲染期间被暂时分离和重新连接。
- 默认情况下，React 不允许组件访问其他组件的 DOM 节点:可使用`forwardRef`,例：
  ```JavaScript
  const MyInput = forwardRef((props, ref) => {
    return <input {...props} ref={ref} />;
  });
  ```
- [使用命令句柄暴露一部分 API](https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs#exposing-a-subset-of-the-api-with-an-imperative-handle)
- React 在提交阶段设置 `ref.current`。在更新 DOM 之前，React 将受影响的` ref.current`值设置为 null。更新 DOM 后，React 立即将它们设置到相应的 DOM 节点。

---

## 2024年3月10日
### Fiber
- 参考[React Fiber很难？六个问题助你理解 React Fiber - 知乎](https://zhuanlan.zhihu.com/p/390409316)
  - 一套更新机制,让 React 的更新过程变得可控
  - 栈递归 -> 链表遍历
- [A deep dive into React Fiber - LogRocket Blog](https://blog.logrocket.com/deep-dive-react-fiber/ )

---

## 2024年3月14日
- 什么hooks不能写在if/else等语句里
- 你是怎么理解React的？（答得非常烂，建议从数据驱动 ui = f(state)、响应式 fiber + 异步可中断更新、组件化 component，hooks、跨平台 scheduler；reconciler；render；vdom，合成事件系统等方面答）
- React18新特性（concurrent）
- react有没有什么缺点（能没有缺点吗，死怼运行时，hooks凭啥不能写在if/else里，useXXX到底怎么个use法，过期闭包，依赖全得手动写，如果用eslint那么里面用过的都会要你加到依赖数组里）
- react hooks为啥不能写在if/else里（底层实现就是个链表，一个有序的东西）
- react hooks能实现类里面的所有生命周期吗
- 路由怎么做的 什么守卫

---

## 2024年3月21日
- 组件间通信
- 自定义hook
- react hook
- react 组件传值
- react父组件怎么获取子组件的值   useRef
- react provider标签以及其使用原理
- react 路由的两种模式
- redux 
  - [Redux Essentials, Part 1: Redux Overview and Concepts | Redux](https://redux.js.org/tutorials/essentials/part-1-overview-concepts )

---

## 2024年3月26日
### 自定义hook
- [超性感的React Hooks（五）：自定义hooks](https://mp.weixin.qq.com/s?__biz=MzI4NjE3MzQzNg==&mid=2649865889&idx=1&sn=2549fb3da7608aa8e3cce0623fbd8d25)
> 自定义hook能够跟随函数组件重复执行，并且每次都返回最新结果。因此，我们可以非常放心大胆的封装异步逻辑。

- 看[超性感的React Hooks（六）自定义hooks的思维方式](https://mp.weixin.qq.com/s/GPcwIPJBc9I_NtixyU-U4Q)，摘录其中一段
>准确来说，应该是逻辑片段复用。
>
>和组件化思维不同，这是另外一个粒度更细的代码复用思维。例如我们之前提到的，获取同样的数据。在组件化思维中，一个完整的组件，包括了这份数据，以及这份数据在页面上的展示结果。因此这是不同的复用思维。
>
>处理获取数据过程中的公用逻辑，处理公用的登陆逻辑等。自定义hooks封装的大多数情况下不是一个完整的页面逻辑实现，而是其中的一个片段。

---

## 2024年4月9日
看[Responsive React File Upload Component With Drag And Drop - DEV Community](https://dev.to/chandrapantachhetri/responsive-react-file-upload-component-with-drag-and-drop-4ef8)

尤其是“Why are we setting the title and value attribute to ""?”这段，之前我看别人的代码这样写还以为是错的，原来是有其独特作用的。

---

## 2024年4月28日
- [useEffect(fn, []) 不等于 componentDidMount() - 掘金](https://juejin.cn/post/7132786097922736164 )
- [React 组件库都是怎么打包？ - 掘金](https://juejin.cn/post/7277917854430674959 )
- [useImperativeHandle – React](https://react.dev/reference/react/useImperativeHandle )

这几篇打开来很久了，一直没看，记录下。

---

## 2024年5月20日
- 参考
  - [forwardRef – React](https://react.dev/reference/react/forwardRef )
  - [useImperativeHandle – React](https://react.dev/reference/react/useImperativeHandle )
  - [React Basics: How to Use ForwardRef](https://www.telerik.com/blogs/react-basics-how-to-use-forwardref )
- forwardRef lets your component expose a DOM node to parent component with a ref.
- useImperativeHandle is a React Hook that lets you customize the handle exposed as a ref.
  `useImperativeHandle(ref, createHandle, dependencies?)`

---

## 2024年9月21日
- [從 React 到 Vue 的心得感想 - Huli's blog](https://blog.huli.tw/2024/03/13/from-react-to-vue/#%E5%9C%A8%E9%96%8B%E5%A7%8B%E4%B9%8B%E5%89%8D )

---

## 2024年10月11日
读[my_book/React实战：设计模式和最佳实践/组件设计模式（2）：高阶组件.md at master · paul-ll/my_book](https://github.com/paul-ll/my_book/blob/master/React%E5%AE%9E%E6%88%98%EF%BC%9A%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E5%92%8C%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%EF%BC%882%EF%BC%89%EF%BC%9A%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6.md )

摘录其中内容作为我的笔记

- 高阶组件的定义:
  - 一个纯函数
  - 接收组件作为参数
  - 返回一个新的组件
  - 高阶组件的命名一般都带 with 前缀，命名中后面的部分代表这个高阶组件的功能

- 示例
```JSX
const withLoginAndLogout = (ComponentForLogin, ComponentForLogout) => {
  const NewComponent = (props) => {
    if (getUserId()) {
      return <ComponentForLogin {...props} />;
    } else {
      return <ComponentForLogout{...props} />;
    }
  }
  return NewComponent;
};

const TopButtons = withLoginAndLogout(
  LogoutButton,
  LoginButton
);
```



## 参考
- [为什么你不应该在 React 中直接使用 useEffect 从 API 获取数据 | Sukka's Blog](https://blog.skk.moe/post/why-you-should-not-fetch-data-directly-in-use-effect/)
- [javascript - Uncaught Invariant Violation: Rendered more hooks than during the previous render - Stack Overflow](https://stackoverflow.com/questions/55622768/uncaught-invariant-violation-rendered-more-hooks-than-during-the-previous-rende)
- [Jotai, primitive and flexible state management for React](https://jotai.org/)
- [真的不可以在 React 组件内部嵌套定义子组件吗？ - PRIN BLOG](https://prin.pw/react-unstable-nested-components/)
- [useCallback – React](https://react.dev/reference/react/useCallback)
- [React 为什么重新渲染 | Sukka's Blog](https://blog.skk.moe/post/react-re-renders-101/)
- [Render and Commit – React](https://react.dev/learn/render-and-commit)
- [<Fragment> (<>...</>) – React 中文文档](https://zh-hans.react.dev/reference/react/Fragment)
- [使用 ref 引用值 – React 中文文档](https://zh-hans.react.dev/learn/referencing-values-with-refs#differences-between-refs-and-state)