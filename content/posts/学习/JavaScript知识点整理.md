---
title: JavaScript知识点整理
slug: javascript_points
date: 2024-03-06T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
  - JavaScript
categories:
  - 学习
summary: 自己学习过程中整理的关于JavaScript的知识点
--- 
**本文记录了我学习过程中整理的关于JavaScript的知识点,以摘抄为主，绝大部分非原创。未能全部都标明出处，在此致歉**

## 双等号和三等号和Object.is
- `==` 只比较值是否相等。在比较数值之前，它将变量的类型转换为相互匹配
- `===` 不执行类型转换。它将验证被比较的变量是否具有相同的值和相同的类型。
- `Object.is()`
  - 与 == 运算符并不等价: Object.is() 不会对其操作数进行类型转换
  - 也不等价于 === 运算符: 唯一区别在于它们处理带符号的 0 和 NaN 值的时候。=== 运算符（和 == 运算符）将数值 -0 和 +0 视为相等，但是会将 NaN 视为彼此不相等

### 示例
```JavaScript
const number = 1234 
const stringNumber = '1234'  

console.log(number == stringNumber) //true
console.log(number === stringNumber)  //false  

console.log(0 == false) //true
console.log(0 === false) //false 

const str = ""

console.log(str == false) //true
console.log(str === false) //false
```
### 参考 
- [JavaScript Triple Equals Sign VS Double Equals Sign – Comparison Operators Explained with Examples](https://www.freecodecamp.org/news/javascript-triple-equals-sign-vs-double-equals-sign-comparison-operators-explained-with-examples/)

---

## ? and ??
- `?`  可选链操作符（Optional Chaining Operator）
  - 用于简化访问嵌套对象属性时的代码，可以安全地访问深度嵌套的属性，避免因为中间属性不存在而导致的错误。
- `??` 空值合并操作符（Nullish Coalescing Operator），用于提供默认值
  - 当左侧操作数为null或undefined时，返回右侧操作数，否则返回左侧操作数。
  - 与逻辑或（||）操作符不同，空值合并操作符只在左侧操作数为null或undefined时返回右侧操作数，对于其他假值（如0、''等）不会触发返回右侧操作数。
  - [?? "" is a Code Smell / Jordan Eldredge](https://jordaneldredge.com/blog/defaulting-to-empty-string-is-a-code-smell/ )

---

## 静态属性和静态方法
- 静态方法用于实现属于整个类，但不属于该类任何实例的函数。
  ```JavaScript
  class Article {
    constructor(title, date) {
      this.title = title;
      this.date = date;
    }

    // 静态方法
    static compare(articleA, articleB) {
      return articleA.date - articleB.date;
    }
  }
  // 直接将其作为属性赋值的作用相同
  Article.compare = function (articleA, articleB) {
      return articleA.date - articleB.date;
  }
  // 可以在类上调用，而不是在单个对象上
  let article = new Article("HTML", new Date(2019, 1, 1));
  article.compare() /// Error: article.createTodays is not a function
  ```
- 静态属性
  - 等同于直接给类赋值
- 静态属性和方法是可被继承的。
- 参考 
  - [静态属性和静态方法](https://zh.javascript.info/static-properties-methods )

---

## 私有属性
- 私有属性通过添加`#`前缀来创建，在类的外部无法合法地引用。
- 私有属性不是原型继承模型的一部分，因为它们只能在当前类内部被访问，而且不能被子类继承。
- 无法使用方括号表示法动态访问它
- 访问对象中不存在的私有属性，会抛出 TypeError 错误，而不是像普通属性一样返回 undefined
- 参考[私有属性 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/Private_properties)

---

## 序列化与反序列化
- 见[json的序列化与反序列化](https://ds63.eu.org/2024/serialization_and_deserialization)

## 相等性
摘自[真的不可以在 React 组件内部嵌套定义子组件吗？ - PRIN BLOG](https://prin.pw/react-unstable-nested-components/#%E5%BC%95%E7%94%A8%E7%9B%B8%E7%AD%89%E6%80%A7%E4%B8%8E%E7%BB%84%E4%BB%B6%E9%87%8D%E6%B8%B2%E6%9F%93)
- 值相等性 (Value Equality)，即两个值类型一致，内容也一致
- 引用相等性 (Reference Equality)，即两个对象的引用在内存中指向同一块区域
    ```JavaScript
    // 两个长得一样的对象
    const a = { name: 'Anon Tokyo' };
    const b = { name: 'Anon Tokyo' };

    // "引用相等性" 比较 - false
    console.log(a === b);
    console.log(Object.is(a, b));

    // "值相等性" 比较 - true
    console.log(lodash.isEqual(a, b));
    console.log(a.name === b.name);
    ```
- React 在比较节点的 type 时，使用的是`===`严格相等。也就是"引用相等性"

## CommonJS V.S. ES6（ECMAScript 6）
参考[CommonJS vs. ES modules in Node.js - LogRocket Blog](https://blog.logrocket.com/commonjs-vs-es-modules-node-js/)

二者都是JavaScript的模块规范，现代开发中后者用的比较多。

## 模块化
- CommonJS规范用的是`require()`,`exports`组合
  - `require()`本质是函数。需要谁，导入谁，返回值是对象。
  - `exports`本质是对象。想暴露哪个变量，就给exports增加属性就行
  - `module.exports` 是NodeJS实现的`exports`，`module.exports = exports` ，`module.exports`每个文件都有，本质是一个实例，所以最后还是以`module.exports`为准
  - 加载模块是同步的,意味着只有等到对应的模块加载完毕，当前模块中的内容才能被运行
  - 不能直接在浏览器使用，会报错:'require is not defined'。如果非要直接在浏览器中使用的话，需要browserify插件
- ES module用的是`import`,`export`组合
  - `import` 本质是一个关键字。特殊情况下也可以当函数`import()`
  - `export` 本质是关键字。
  - ES imports are hoisted by spec(which Babel follows)
  - 可选择性加载所需的部分，如`import { render } from react`
  - 异步加载:
    有些场景下需要异步加载，比如[Postkid：ReferenceError: navigator is not defined | EuDs's Blog](https://ds63.eu.org/2024/postkid/#referenceerror-navigator-is-not-defined)
    代码示例:
    ```JavaScript
    // 当flag为true的时候才导入某个模块  
    let flag = true  
    if (flag) {  
      // import time from "./module.js" // NG: 一段解析阶段的代码放到了运行阶段去执行
      // 因为是异步加载 非同步 有个返回值 返回值是promise  
      const promise = import("./module.js")   
          .then((res)=>{  
          console.log(res)  
        })  
          .catch()  
    }  
    ```
  - `import`可以在JavaScript可以直接使用，但是如果想直接在script中使用src的方式引入的话，需要指定`type="module"`，声明引入的是一个js模块。
- **可以混用**：`babel`之类的编译会将其统一编译成特定规范,但最好不要混用
- 参考 
  - [彻底搞清楚JS的模块化import/export/require...问题| 旺财的博客](https://chihokyo.com/post/35/)
  - [干货:import和require如何在项目中混用 - 掘金](https://juejin.cn/post/6844904114183208968)
  - [不要混用 import 和 require | 知更鸟](https://robin-front.github.io/2017/07/10/dont-mixin-import-and-require.html)
  - [关于require和import的疑问 | 道廷途说](https://daotin.netlify.app/qe8yn8.html)
  - [几分钟了解js的模块化、IIFE。几分钟了解模块化： 1. CommonJS 2. AMD 3. CMD 4. ES6 - 掘金](https://juejin.cn/post/6969800612519084063 )

---

## IIFE（立即调用函数表达式）
- 参考[IIFE（立即调用函数表达式）| MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/IIFE)
- 一种设计模式
- 示例：
  ```JavaScript
  var foo = 'hello';
  (function(foo){
    console.log(foo);
    var foo = foo || 'world';
    console.log(foo);
  })(foo);
  console.log(foo);
  // 依次输出 hello hello hello
  ```

## 闭包
### 概念
- 闭包是由函数以及声明该函数的词法环境组合而成的，该环境包含了这个闭包创建时作用域内的任何局部变量。

### 示例:
```JavaScript
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12
```

### 作用一:  模拟私有方法
- 代码
  ```JavaScript
  var makeCounter = function () {
    var privateCounter = 0;
    function changeBy(val) {
      privateCounter += val;
    }
    return {
      increment: function () {
        changeBy(1);
      },
      decrement: function () {
        changeBy(-1);
      },
      value: function () {
        return privateCounter;
      },
    };
  };

  var Counter1 = makeCounter();
  var Counter2 = makeCounter();
  console.log(Counter1.value()); /* logs 0 */
  Counter1.increment();
  Counter1.increment();
  console.log(Counter1.value()); /* logs 2 */
  Counter1.decrement();
  console.log(Counter1.value()); /* logs 1 */
  console.log(Counter2.value()); /* logs 0 */
  ```
- 现在可以通过在属性名之前添加# 前缀来创建，在类的外部无法合法地引用

### 参考
- [闭包 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
- [私有属性 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/Private_properties )

---

## 提升
### 会被提升
1. 变量的声明会被提升到当前作用域的顶端
2. 函数声明和初始化都会被提升

### 不会被提升
1. 变量的初始化不会被提升
2. 函数表达式不会被提升

### 顺序
1. 函数提升在变量提升之前
2. 变量被提升过后，先对提升上来的所有对象统一执行一遍声明步骤，然后再对变量执行一次赋值步骤。而执行赋值步骤时，会优先执行函数变量的赋值步骤，再执行普通变量的赋值步骤

### 示例
1. 示例一 
  ```JavaScript
  var foo = 3;
  function hoistVariable() {
    var foo = foo || 5;
    console.log(foo); // 5
  }
  hoistVariable();
  ```
2. 示例二：函数表达式不会被提升
  ```JavaScript
  console.log(square); // undefined
  console.log(square(5)); // square is not a function =》 初始化并未提升，此时 square 值为 undefined
  var square = function (n) { 
    return n * n; 
  }
  ```
3. 示例二: 顺序 
  ```JavaScript
  // 源代码
  function b(){};
  var b = 11;
  typeof b; // number

  //预编译后
  function b;  // => 声明一个function b
  var b;       // =》 声明一个变量 b
  b = (){};    // =》 function b 初始化
  b = 11;      // =》 变量 b 初始化 =》变量初始化没有被提升，还在原位
  typeof b;    // number
  ```
4. 示例三: 顺序
  ```JavaScript
  let a =1;
  function foo(a){
    return (a=a+1);
  }
  var b = foo(a);
  let c = foo(a);
  function foo(a){
    return (a=a+2);
  }
  const d = foo(a)
  console.log(a,b,c,d); //1，3，3，3
  ```

### 参考
- [JavaScript变量提升和函数提升详解](https://segmentfault.com/a/1190000038344251)

---

## Var, Let, Const 
- 参考[Var, Let, and Const – What's the Difference?](https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/)
- **作用域**：var 声明是全局作用域或函数作用域，而 let 和 const 是块作用域。
- **变化**：var 变量可以在其作用域内更新和重新声明；let 变量可以更新但不能重新声明；const 变量既不能更新也不能重新声明。
- **提升**: 它们都被提升到了作用域的顶部。但是，var 变量是用 undefined 初始化的，而 let 和 const 变量不会被初始化,在代码实际执行到声明和初始化语句之前，它们的值是不可访问的。
- **声明**: var 和 let 可以在不初始化的情况下声明，而 const 必须在声明时初始化。
- 示例:
  ```JavaScript
  let greeting = "say Hi";
  let greeting = "say Hello instead"; // error: Identifier 'greeting' has already been declared

  if (true) {
    var y = 20; // y在if块内部可见
    console.log(y); // 输出: 20
  }

  console.log(y); // 输出: 20

  b = 1;
  let b; // Cannot access 'b' before initialization
  ```

## Rest参数 与 Spread 语法
- 参考[Rest 参数与 Spread 语法](https://zh.javascript.info/rest-parameters-spread)
- Rest参数用来从参数列表中获取数组
- Rest 参数必须放到参数列表的末尾
- 箭头函数没有 "arguments"
- spread 语法把数组转换为参数列表
- 举例:
```JavaScript
// Rest参数用来从参数列表中获取数组
let sumAll = (...args) => {
  let sum = 0;
  for(let arg of args)
    sum += arg;
  return sum;
}

sumAll(1,2,3)

// spread 语法把数组转换为参数列表
let array = [0,1,2,3,4]
sumAll(...array)
```

## 深拷贝和浅拷贝
### 数据存储 
1. 基本类型数据保存在在栈内存中
2. 引用类型数据保存在堆内存中，引用数据类型的变量是一个指向堆内存中实际对象的引用，存在栈中

### 浅拷贝
- 定义: 只复制属性指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存，修改对象属性会影响原对象
- 实现一
    ```JavaScript
    function shallowCopy(obj){
      if(typeof obj !== 'object'){
        return obj;
      }
      let newObj = {};
      for(let key in obj){
        if(obj.hasOwnProperty(key)){
          newObj[key] = obj[key]
        }
      }
      return newObj;
    }
    ```
- 实现二
    ```JavaScript
    function shallowCopy(obj){
      return {...obj}
    }

    ```

### 深拷贝
- 定义: 创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会影响原对象
- 实现一 
  - 代码
    ```JavaScript
    function deepCopy(obj){
      if(typeof obj !== 'object'){
        return obj;
      }
      let newObj = obj instanceof Array ? [] : {};
      for(let key in obj){
        if(obj.hasOwnProperty(key)){
          newObj[key] = deepCopy(obj[key]);
        }
      }
      return obj;
    }
    ```
  - 缺陷:
    1. 无法处理循环引用
    2. 递归爆栈
- 实现二:
  - 代码
```JavaScript
function cloneForce(x){
    const uniqueList = []; // 用来去重
    let root = {};
    // 栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];

    while(loopList.length){
        // dfs
        const node = loopList.pop();
        const {parent, key, data} = node;

        // 初始化赋值目标
        let res = parent;
        if(typeof key !== 'undefined'){
            res = parent[key] = {};
        }
        let uniqueData = find(uniqueList, data);
        if(uniqueData){
            // 数据已经存在
            parent[key] = uniqueData.target;
            continue;
        }
        // 数据不存在
        uniqueList.push({
            source: data,
            target: res,
        });
        for(let k in data){
            if(data.hasOwnProperty(k)){
                if(typeof data[k] === 'object'){
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                }else{
                    res[k] = data[k];
                }
            }
        }
    }
    return root;
}

function find(arr, item){
    for(let i = 0; i < arr.length; i++){
        if(arr[i].source === item){
            return arr[i];
        }
    }
}
```

- clone
  ```JavaScript
  let clone = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
  );
  ```

- 参考 
  - [面试官：深拷贝浅拷贝的区别？如何实现一个深拷贝？ | web前端面试 - 面试官系列](https://vue3js.cn/interview/JavaScript/copy.html)

---

## 复制
- 参考 [JavaScript复制内容到剪贴板 - 掘金](https://juejin.cn/post/6844903567480848391)
- 补充：
  1. 上文主要是使用`document.execCommand('copy')`这个方法。但[Document: execCommand() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)显示"This feature is no longer recommended."。
  2. 那该怎么改呢？看[execCommand() is now obsolete, what's the alternative? - Stack Overflow](https://stackoverflow.com/questions/60581285/execcommand-is-now-obsolete-whats-the-alternative)的高票回答:
  >The execCommand() is officially obsolete/deprecated but there's no alternative. 
  >Note that real world user agents (browsers such as Chrome, Firefox and Safari) cannot drop support for execCommand() because so many services require support for it. 

  过几年再看看？

---

## 读取剪贴板
wip

---

## JavaScript编程中常见的代码坏味道
wip

### Pyramid of doom（厄运金字塔）
- [厄运金字塔（编程）- 维基百科 --- Pyramid of doom (programming) - Wikipedia](https://en.wikipedia.org/wiki/Pyramid_of_doom_(programming))

---

## 问题
1. js到dom树的单向绑定

2. [牛客网ACM模式下JavaScript(V8)常见输入输出练习_readline(...).split is not a function-CSDN博客](https://blog.csdn.net/SpringRolls/article/details/116506148 )

3. [JavaScript实现封装、继承、多态JavaScript实现封装、继承、多态 - 掘金](https://juejin.cn/post/6979812535557963784 )

4. `parseInt`
   - [parseInt() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt )
   - 示例代码
     ```JavaScript
     let res = ['1', '2', '100'].map(parseInt);
     console.log(res); // [1, NaN, 4]
     ```
   - 解释
     - 实际上 map 会传递三个参数给 parseInt，而 parseInt 只关心前两个参数：要解析的字符串和进制
     - 因此解析过程如下:
       1. 对第一个元素 '1'，parseInt('1', 0)，0 表示根据输入自动检测进制，结果是 1。
       2. 对第二个元素 '2'，parseInt('2', 1)，1 不是有效的进制，因此结果是 NaN。
       3. 对第三个元素 '100'，parseInt('100', 2)，以二进制解析 '100'，结果是 4。

5. 箭头函数与普通函数的区别
   - 函数体内的 this 对象，就是定义时所在的作用域中的 this 值，而不是使用时所在的对象
   - 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替
   - 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数
   - 不可以使用 new 命令
     - 没有自己的 this，无法调用 call，apply
     - 没有 prototype 属性
   - 参考: [第 58 题：箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？ · Issue #101 · Advanced-Frontend/Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/101 )

6. ES6新特性
   - 引入了let和const
   - 模板字符串: `${}`
   - 箭头函数
   - 函数参数默认值，Rest参数
   - 解构赋值 
   - Promise 
   - 新增Map,Set,WeakMap,WeakSet
   - 迭代器和生成器
     ```JavaScript
     let arr =[1,2,3];
     for(let item of arr){
      console.log(item)
     }

     ```
   - 对象和类


