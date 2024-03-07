---
title: 记一次react报错排查
slug: a React debug experience 
date: 2024-03-07T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
categories:
  - 学习
summary: Failed to execute 'removeChild' on 'Node'
--- 

## 场景
在[EuDs63/postkid: A lightweight tool offering key functionalities inspired by Postman.](https://github.com/EuDs63/postkid),当我发送一次请求之后，再次发送时报错：

>NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.

## 排查
因为上一个版本并没有这个问题，于是我比较了这几次的commit记录，发现问题很可能出现在Prism的高亮，相关代码如下：
```typescript
  useEffect(() => {
    if (response && response.data) {
      Prism.highlightAll();
    }
  }, [response]);
```

当我将`Prism.highlightAll();`注释掉后，程序就不再报错了，但这显然不是我所希望的。几经查找后，发现了[Failed to execute 'removeChild' on 'Node' - 掘金](https://juejin.cn/post/6938321875298680845)解决了我的问题，在`pre code`外加一层`<div>`就解决了。

该篇文章也给出了一定的解释:

>经过分析发现是使用组件的问题，考虑DOM-DIff算法是比对不同的React节点，而该组件的渲染直接是第三方插件的代码，在componentDidMount阶段才进行DOM节点的挂载，在此之前是没有node节点的，故需要增加一个可识别的node节点。

但对来说比较简略，我希望能彻底搞懂相关的概念，以下是我的笔记。

## Lifecycle
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
- 参考[谈谈虚拟DOM，Diff算法与Key机制_React_beifeng1996_InfoQ写作社区](https://xie.infoq.cn/article/65e938d933cc751fcc008942d)
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

## 参考
- [Failed to execute 'removeChild' on 'Node' - 掘金](https://juejin.cn/post/6938321875298680845)
- [Understanding Functional Components vs. Class Components in React](https://www.twilio.com/en-us/blog/react-choose-functional-components)
- [The React lifecycle: methods and hooks explained](https://retool.com/blog/the-react-lifecycle-methods-and-hooks-explained)
- [React面试：谈谈虚拟DOM，Diff算法与Key机制_React_beifeng1996_InfoQ写作社区](https://xie.infoq.cn/article/65e938d933cc751fcc008942d)
- [真的不可以在 React 组件内部嵌套定义子组件吗？ - PRIN BLOG](https://prin.pw/react-unstable-nested-components)