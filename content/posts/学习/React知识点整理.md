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
- state 
  - An object to store on location state. This is useful for state that doesn’t need to be in the URL but is associated with a route transition. Think of it like “post” data on a server.
  - 可以用来实现: 用户被踢出后再登陆注册能返回被踢出时的页面
- replace的作用:
  >An example is when the user clicks a “purchase” button but needs to log in first, after they log in, you can replace the login screen with the checkout screen you wanted them to be at. Then when they click the back button they won’t see the login page again.
  >
  > navigate("/some/where", { replace: true })

### 参考 
- [Reach Router - navigate(to, { state={}, replace=false })](https://reach.tech/router/api/navigate )

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