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

## JSX
- 一种JavaScript的语法扩展（extension），也在很多地方称之为JavaScript XML，因为看起就是一段XML语法；
- 为什么React选择使用jsx？
  - React认为渲染逻辑本质上与其他UI逻辑存在内在耦合,他们之间是密不可分，所以React没有将标记分离到不同的文件中，而是将它们组合到了一起，这个地方就是组件（Component）
- 本质
  - React.createElement(component, props, ...children) 函数的语法糖
  - 所有的jsx最终都会被转换成React.createElement的函数调用
- 参考: [第二节：jsx语法深度剖析和jsx本质的探究 - Yaopengfei - 博客园](https://www.cnblogs.com/yaopengfei/p/17299996.html )

---

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
### 通过 Props 传递数据（父传子组件通信）
- **适用场景**：最常见的方式，适用于父组件向子组件传递数据。
- **原理**：父组件通过 `props` 将数据传递给子组件，子组件通过 `props` 接收并使用这些数据。


### 使用回调函数（子传父组件通信）
- **适用场景**：当子组件需要向父组件传递数据时。
- **原理**：父组件将一个回调函数作为 `props` 传递给子组件，子组件调用该函数，将数据传递回父组件。
- **示例**:
  ```jsx
   function Parent() {
     const handleData = (data) => {
       console.log(data);
     };

     return <Child sendData={handleData} />;
   }

   function Child({ sendData }) {
     return <button onClick={() => sendData("Hello from child!")}>Send Data</button>;
   }
   ```

### 通过 Context API
- **适用场景**：适合深层次的组件树中需要共享的全局状态，避免层层传递 `props`（例如：主题、语言、用户信息等）。
- **原理**：创建一个 `Context`，并使用 `Provider` 组件来提供状态，任何深层的组件都可以通过 `Consumer` 或 `useContext` 钩子来访问。
- **示例**:
   ```jsx
   const MyContext = React.createContext();

   function Parent() {
     const value = "Hello from context!";
     return (
       <MyContext.Provider value={value}>
         <Child />
       </MyContext.Provider>
     );
   }

   function Child() {
     const contextValue = React.useContext(MyContext);
     return <div>{contextValue}</div>;
   }
   ```

### 通过 Redux 或其他状态管理库
- **适用场景**：在需要管理全局状态或复杂状态时，Redux 是一个强大的工具。
- **原理**：全局状态存储在 Redux 的 `store` 中，任何组件都可以通过 `connect` 或 `useSelector` 访问状态，通过 `dispatch` 发送 action 来修改状态。
- **示例**: 
   ```jsx
   import { useSelector, useDispatch } from 'react-redux';

   function MyComponent() {
     const count = useSelector(state => state.counter.value);
     const dispatch = useDispatch();

     return (
       <div>
         <span>{count}</span>
         <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
       </div>
     );
   }
   ```

### 使用全局事件（EventEmitter 或 Custom Events）
- **适用场景**：组件之间没有明显的层级关系，适合不频繁的数据交换。
- **原理**：可以使用事件触发机制，例如 `EventEmitter`，让一个组件监听事件，另一个组件触发事件。
- **示例**: 
   ```jsx
   import { EventEmitter } from 'events';

   const eventEmitter = new EventEmitter();

   // In one component (sender)
   eventEmitter.emit('message', 'Hello World');

   // In another component (receiver)
   eventEmitter.on('message', (data) => {
     console.log(data);
   });
   ```

### URL Params / Query Strings（通过路由传递）
- **适用场景**：组件之间通过 URL 参数传递信息。
- **原理**：使用 React Router 来通过 URL 将信息从一个页面传递到另一个页面。可以通过 `useParams` 或 `useLocation` 钩子来读取。
- **示例**: 
   ```jsx
   import { useParams } from 'react-router-dom';

   function UserProfile() {
     const { userId } = useParams();
     return <div>User ID: {userId}</div>;
   }
   ```

### 使用 Web Storage（LocalStorage/SessionStorage）
- **适用场景**：需要在页面刷新或不同组件间共享数据。
- **原理**：将数据存储在浏览器的 `localStorage` 或 `sessionStorage` 中，组件可以通过它们来读取和修改数据。
- **示例**: 
   ```jsx
   function setData() {
     localStorage.setItem('name', 'John');
   }

   function getData() {
     const name = localStorage.getItem('name');
     return <div>{name}</div>;
   }
   ```

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
### 概念
- React 通过 Fiber 树对任务进行切片（time-slicing），分成多个小块任务，允许在渲染过程中将控制权交还给主线程，以避免阻塞浏览器的渲染和响应用户交互。

### 关键点：
1. **任务的可中断性**
  在传统的 React 16 之前的版本，渲染过程是同步的，一旦开始渲染，就会一直执行到整个更新完成。如果渲染复杂，用户交互（如点击、滚动）会被阻塞。而 Fiber 通过将渲染任务分解成多个小任务，可以在渲染的过程中暂停、打断和恢复，从而为高优先级任务（如用户输入）让路。

2. **优先级机制**
  React Fiber 引入了优先级调度，不同的更新任务可以根据优先级被安排执行。高优先级的任务会优先被调度执行，而低优先级任务会被延迟处理。这种机制大大提升了应用的响应性，避免了长时间的卡顿。

3. **双缓冲 Fiber 树**
  Fiber 使用两棵树来管理渲染过程：
   - **Current Fiber Tree**：当前已渲染的树。
   - **Work In Progress Fiber Tree**：正在构建的树。

   React 在更新过程中会基于当前的 Fiber 树构建一个新的 Fiber 树，这个过程是渐进的，不会阻塞主线程。

4. **时间切片（Time Slicing）**
  通过时间切片，React Fiber 能够将渲染任务分割成多个小片段，在每个帧之间执行这些片段。每当有更高优先级的任务需要处理时，React Fiber 会暂停当前的渲染任务，执行完高优先级任务后再恢复。

5. **可恢复的工作单元**
  每个 Fiber 都是一个工作单元，它包含了组件的状态、props 和上下文信息。Fiber 架构允许在工作单元之间中断、恢复以及重新调度渲染。

6. **并发模式（Concurrent Mode）**
  React Fiber 是并发模式的基础，它能够在未来支持并发渲染，让 React 在后台渲染不重要的内容，并优先响应重要的更新。这一特性会进一步提升用户体验，尤其是在交互密集的应用中。

### 参考
- [An Introduction to React Fiber - The Algorithm Behind React](https://www.velotio.com/engineering-blog/react-fiber-algorithm)

---

## useId
- [useId – React](https://react.dev/reference/react/useId )
- generate a unique ID
- A component may be rendered more than once on the page—but IDs have to be unique! Instead of hardcoding an ID, generate a unique ID with useId.

## 参考
- [sudheerj/reactjs-interview-questions: List of top 500 ReactJS Interview Questions & Answers....Coding exercise questions are coming soon!!](https://github.com/sudheerj/reactjs-interview-questions)