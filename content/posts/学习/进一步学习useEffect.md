---
title: 进一步学习useEffect
slug: learn_useEffect
date: 2024-08-04T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
  - React
categories:
  - 学习
summary: 再次学习useEffect;再次学习useEffect;
--- 

## 原因 
最近还是发现自己在使用useEffect时有疑惑，深感有必要进一步去学习useEffect的使用。

---

## 疑惑一 
```javascript
const [variable,setVariable] = useState('');

// 这样写有必要吗？
useEffect(_ =>{},[])
```

- 没必要，没意义

---

## 疑惑二: 依赖数组到底该写些啥
### 概念:
- 依赖数组：用来告诉 React 这个 useEffect 何时应该运行。依赖数组中的每一项会被监控，当这些值发生变化时，副作用函数会重新运行。
- 依赖数组中的典型值
  1. 状态（state）：如果副作用依赖于某个 useState 的值，应该将其包含在依赖数组中。
  2. props：当副作用依赖于某个 props，应该将其包含在依赖数组中。
  3. 函数或其他变量：如果副作用依赖于某个函数或者计算出来的变量，也应该包括在依赖数组中。
- 依赖数组中尽量不要有`object`或`array`等引用变量

### 错误示范:
```JavaScript
function ChatRoom({ articleId }) {
  const [article, setArticle] = useState(null);

  // options 會在每次渲染時重新創建
  const options = {
    serverUrl: 'https://localhost:1234',
    articleId: articleId
  };

  useEffect(() => {
    const data = getArticle(options);
    setArticle(data)
    // options 每次渲染時值都不同，因此觸發 useEffect 執行
  }, [options]);
}
```

### 正确示范:
```JavaScript
function ChatRoom({ articleId }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
	  const options = {
	    serverUrl: 'https://localhost:1234',
	    articleId: articleId
	  };

    const data = getArticle(options);
    setArticle(data)

  }, [articleId]);
}
```

### 参考
- [Stop Lying to React About Missing Dependencies | by Jack Taylor | Better Programming](https://betterprogramming.pub/stop-lying-to-react-about-missing-dependencies-10612e9aeeda )
- ["React中useEffect的依赖数组：空数组与不写数组的区别"- 掘金](https://juejin.cn/post/7327832105328574514 )

---

## 疑惑三: 依赖数组为空和不传有区别吗?
### 概念
- 当依赖数组为空时（`[]`），useEffect中的回调函数**只会在组件挂载和卸载时执行**。这意味着它只会执行一次，类似于类组件中的`componentDidMount`和`componentWillUnmount`。
- 当**不传入**依赖数组时，useEffect中的回调函数会在每次组件渲染时都执行。这意味着它会在**组件挂载、更新和卸载时**都执行。

### 示例: 依赖数组为空
```JavaScript
//10秒内连续点击按钮5次，控制台的输出结果是什么
  const [count, setCount] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      console.log(count)
    }, 10 * 1000);
  },[]) 
  //控制台只会输出一个0
  //因为count更新只是组件状态更新，而此时的useeffect只在组件加载和卸载时候执行只执行一次
  
   <button onClick={() =>{setCount(count+1)}}>点击count加1</button>
```

### 示例: 不传入依赖数组
```JavaScript
//10秒内连续点击按钮5次，控制台的输出结果是什么
  const [count, setCount] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      console.log(count)
    }, 10 * 1000);
  }) 
  //控制台只会输出0，1，2，3，4，5
  //因为count更新，组件状态更新会重新渲染组件
  //而此时的useeffect在组件更新渲染的时候都会执行
  //所以会执行对应的点击次数
  //在控制台中打印对应的次数
  
   <button onClick={() =>{setCount(count+1)}}>点击count加1</button>
```

### 参考
- ["React中useEffect的依赖数组：空数组与不写数组的区别"- 掘金](https://juejin.cn/post/7327832105328574514 )

---

## 疑惑四: 依赖数组是怎么比较的
### 概念
- 使用`Object.is`来进行比较,如果依赖数组中任意一值与前一次不用，就会重新执行
- `Object.is`和`===`的唯一区别在于它们处理带符号的 0 和 NaN 值的时候。=== 运算符（和 == 运算符）将数值 -0 和 +0 视为相等，但是会将 NaN 视为彼此不相等。
- `===` 不执行类型转换。它将验证被比较的变量是否具有相同的值和相同的类型。

### 实现`useDeepCompareEffect`
- 先用useRef取得前一次的值，然后再调用深比较函数对比前后的值
- 代码
  ```JavaScript
  import { useRef } from 'react';
  import type { DependencyList, useEffect, useLayoutEffect } from 'react';
  import isEqual from 'lodash/isEqual';

  type EffectHookType = typeof useEffect | typeof useLayoutEffect;
  type CreateUpdateEffect = (hook: EffectHookType) => EffectHookType;

  const depsEqual = (aDeps: DependencyList = [], bDeps: DependencyList = []) => {
    return isEqual(aDeps, bDeps);
  };

  export const createDeepCompareEffect: CreateUpdateEffect = (hook) => (effect, deps) => {
    const ref = useRef<DependencyList>();
    const signalRef = useRef<number>(0);

    // 本地更新的依赖值与缓存的依赖深比较
    if (deps === undefined || !depsEqual(deps, ref.current)) {
      // 将依赖保存一份
      ref.current = deps;
      // 如果发现变更，则改变signalRef的值，是为了触发真正的useEffect
      signalRef.current += 1;
    }

    hook(effect, [signalRef.current]);
  };
  ```

---

## 报错：`useEffect` is called conditionally
  
完整报错如下:
>React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render.  react-hooks/rules-of-hooks

解决方法很简单，只需将useEffect调用移动到组件的顶层，并使用条件语句来决定是否执行其内部的逻辑即可。

---

## useEffect 执行时机
1. 當元件被加入時 (mount)，useEffect 會被第一次執行。
2. 當每次元件重新渲染時，如果 dependencies 的值有改變，先將舊的 props 和 state 執行 cleanup function，再帶著新的 props 和 state 執行 setup function。
3. cleanup function 的程式碼，會在元件生命週期結束 (unmount) 時，執行最後一次。

---

## useLayoutEffect
### 概念
- 执行时机: 在浏览器重绘 (repaints) 前執行,区别于`useEffect`,在浏览器完成布局与绘制之后，在一个延迟事件中被调用
- 可能會造成性能的問題。 因為在 useLayoutEffect 里的程序會阻礙瀏覽器重繪 (repaints) ，太頻繁使用可能會造成整個應用程式緩慢

### 示例
- 代码 
  ```JavaScript
  import { useEffect, useLayoutEffect, useState } from "react";

  export default function App() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (count === 0) {
        const randomNum = 1 + Math.random() * 1000;
        setCount(randomNum);
      }
    }, [count]);

    return <div onClick={() => setCount(0)}>{count}</div>;
  }
  ```
- 解释
  - 原因是，當你每次點擊 div，此時 count 會被更新為 0，畫面會重新渲染變為 0，同時，因為 count 被更新，也會觸發 useEffect 執行。所以在重繪完成之後， useEffect 執行並把 count 更新為另一串隨機數字，畫面也會再渲染一次，因為兩次渲染時間很快，所以造成閃爍。
  - 假設我們把上方程式碼的 useEffect 換成 useLayoutEffect，當你每次點擊 div，此時 count 會被更新為 0，但這時，畫面不會被重新渲染變為 0，而是先等待 useLayoutEffect 內的程式碼執行完畢之後，state 已經更新為新的隨機數字，這時畫面才進行重繪。

### 使用场景
- 設計一個工具提示元件 (tooltip)，它會依照不同條件出現在某元素的上方、下方或旁邊，這種設計條件代表說，我們會需要知道此元素準確的高度位置，才能判斷要將 tooltip 顯示在哪裡。

- 此时React的渲染步驟可以拆分為下
  1. 在任何地方渲染 Tooltip (即使位置不正確)
  2. 測量元素的高度，並決定放置 Tooltip 的位置
  3. 重新渲染畫面，這時 Tooltip 的位置才會是正確的
  4. 如果是使用 useEffect 的話，Tooltip 的位置，可能是從 0 變到 10 的位置，這會造成畫面閃爍、使用者體驗不佳，如果是使用 useLayoutEffect，React 則會在重繪前，就重新計算正確的位置，才渲染畫面。
  
---

## 参考
- [A Complete Guide to useEffect — overreacted](https://overreacted.io/a-complete-guide-to-useeffect/)
- [Source code interpretation of React useEffect_javascript_rAc-React](https://devpress.csdn.net/react/62f64ea5c6770329307fc5f1.html)
- [請解釋 useEffect？與 useLayoutEffect 的區別？｜ExplainThis](https://www.explainthis.io/zh-hant/swe/use-effect-vs-use-layout-effect )