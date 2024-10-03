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

## 双等号和三等号
- `==` 只比较值是否相等。在比较数值之前，它将变量的类型转换为相互匹配
- `===` 不执行类型转换。它将验证被比较的变量是否具有相同的值和相同的类型。
- 示例
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
- 参考 [JavaScript Triple Equals Sign VS Double Equals Sign – Comparison Operators Explained with Examples](https://www.freecodecamp.org/news/javascript-triple-equals-sign-vs-double-equals-sign-comparison-operators-explained-with-examples/)

## ? and ??
- `?`  可选链操作符（Optional Chaining Operator）
  - 用于简化访问嵌套对象属性时的代码，可以安全地访问深度嵌套的属性，避免因为中间属性不存在而导致的错误。
- `??` 空值合并操作符（Nullish Coalescing Operator），用于提供默认值
  - 当左侧操作数为null或undefined时，返回右侧操作数，否则返回左侧操作数。
  - 与逻辑或（||）操作符不同，空值合并操作符只在左侧操作数为null或undefined时返回右侧操作数，对于其他假值（如0、''等）不会触发返回右侧操作数。
  - [?? "" is a Code Smell / Jordan Eldredge](https://jordaneldredge.com/blog/defaulting-to-empty-string-is-a-code-smell/ )

## Object 
- 在 JavaScript 中，对象,可以被看作是一组属性的集合。它是唯一可变的值。事实上，函数也是具有额外可调用能力的对象。
- 对象属性名字可以是任意字符串，包括空串。
  - 如果对象属性名字不是合法的 javascript 标识符，它必须用引号包裹。
- 对象的原型（prototype）指向另一个对象或者 null
- [Object 和 Map 的比较 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#object_%E5%92%8C_map_%E7%9A%84%E6%AF%94%E8%BE%83)
- 对象注入攻击：[The Dangers of Square Bracket Notation](https://github.com/eslint-community/eslint-plugin-security/blob/main/docs/the-dangers-of-square-bracket-notation.md)

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

## 私有属性
- 参考[私有属性 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/Private_properties)
- 私有属性通过添加`#`前缀来创建，在类的外部无法合法地引用。
- 私有属性不是原型继承模型的一部分，因为它们只能在当前类内部被访问，而且不能被子类继承。

## 访问和设置对象的属性
- **访问**
  - 点符号表示法 
    - `obj.propertyName`
    - 适用于静态属性名
  - 方括号表示法 
    - `obj["propertyName"]` 
    - 适用于动态属性名或包含特殊字符的属性名
  - 上述二者都属于属性访问器(Property accessors)
- **设置**
  - `Object.defineProperty()`
  - 语法
    `Object.defineProperty(obj, prop, descriptor)`
  - 区别
    1. 使用属性访问器分配一个值, 添加的属性是**可写、可枚举、可配置的**
    2. 默认情况下，使用`Object.defineProperty() `添加的属性是**不可写、不可枚举和不可配置的**
- **删除**
  - 只能删除对象的可配置属性
  - `delete obj.name;`
- 参考
  - [js中对象的点语法与方括号语法的区别 - 掘金](https://juejin.cn/post/7215401973842788411)
  - [属性访问器 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Property_accessors)
  - [Object.defineProperty() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

## Object.entries()
- returns an array of a given object's own enumerable string-keyed property key-value pairs.
- eg:
  ```JavaScript
  const obj = { foo: "bar", baz: 42 };
  console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
  ```
- 参考：[Object.entries() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

## Object.assign()
- copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.
- [Object.assign() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign )

## 遍历Object
### for in 和 for of  
- `for in`遍历的是"key"，`for of`遍历的是"value"
  ```JavaScript
  const arr = [1, 2, 3];

  // for...in循环遍历数组的索引
  for (let index in arr) {
    console.log(index); // 输出 0, 1, 2
  }

  // for...of循环遍历数组的值
  for (let value of arr) {
    console.log(value); // 输出 1, 2, 3
  }
  ````
- 用`for in`来遍历Object
  ```JavaScript
  for (let key in person) {
    console.log(key + ': ' + person[key]);
  }
  // name: Alice
  // age: 30
  // gender: female

  for (let val of person){
    console.log(val);
  }
  // TypeError: person is not iterable
  ```
- 总结: `for in` 一般用来遍历对象的key、`for of` 一般用来遍历数组的value

## 序列化与反序列化
- 见[json的序列化与反序列化](https://ds63.eu.org/2024/serialization_and_deserialization)

## new 
- new 运算符创建一个**用户定义的对象类型**的实例或**具有构造函数的内置对象**的实例。 ——（来自于MDN）
- 不可以使用 `new Symbol()`，因为 symbol 是基本数据类型，每个从Symbol()返回的 symbol 值都是唯一的。
- 简单实现:
  ```JavaScript
  function create() {
      var obj = new Object(),
      Con = [].shift.call(arguments);
      obj.__proto__ = Con.prototype;
      Con.apply(obj, arguments);
      return obj;
  };
  // 测试用例
  function Car(color) {
      this.color = color;
  }
  Car.prototype.start = function() {
      console.log(this.color + " car start");
  }

  var car = create(Car, "black");
  car.color; // black
  
  car.start(); // black car start
  ```
- 参考：[深度解析 new 原理及模拟实现 | 木易杨前端进阶](https://muyiy.cn/blog/3/3.5.html)

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

## this
- `this`永远指向，（最内层）调用这个包含"this"关键字的函数的对象,示例:
  ```JavaScript
  my_element.addEventListener("click", function (e) {
    console.log(this.className); // 输出 my_element 的 className
    console.log(e.currentTarget === this); // 输出 `true`
  });

  ```
- 如果函数在最外层直接运行，默认绑定的对象是 window，示例:
  ```JavaScript
  function test(){
      var a = 1;
      console.log(this.a);
  }

  test(); //undefined
  ```
- 对象不构成单独的作用域，而函数有。
- In arrow functions, `this` retains the value of the enclosing lexical context's `this`.
- 箭头函数的this，一旦确定后是不可直接更改的，但可间接更改，示例：
  ```JavaScript
  function test () {
      return () => console.log(this); // 这里箭头函数的this指向test()的this
  }
  let obj = {
      aa: 123,
  }

  let rr = test.call(obj); // test()的this被修改了，导致箭头函数的也跟着修改了

  setTimeout(rr,1000); // obj ，而不是window   因为箭头函数rr的this已经确定了，后面不能更改
  ```

- 参考 
  - [Javascript ：this关键字 详解 - 知乎](https://zhuanlan.zhihu.com/p/25349790)
  - [javascript - 关于箭头函数里的this - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000039881063)
  - [JavaScript深入之重新认识箭头函数的this | 木易杨前端进阶](https://muyiy.cn/blog/3/3.2.html)
  - [this - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)
  - [Reference Type](https://zh.javascript.info/reference-type)

## call、bind、apply的作用和区别
- 参考[彻底弄懂bind，apply，call三者的区别 - 知乎](https://zhuanlan.zhihu.com/p/82340026)
- apply
  - 接受两个参数，第一个参数是this的指向，第二个参数是函数接受的参数，以数组的形式传入
  - 当第一个参数为null、undefined的时候，默认指向window(在浏览器中)
  - 改变this指向后原函数会立即执行，且此方法只是临时改变thi指向一次。
  - 示例:
    ```JavaScript
    var arr=[1,10,5,8,3];
    console.log(Math.max.apply(null, arr)); //10
    ```
- call 
  - 接受两个参数，第一个参数是this的指向，第二个参数是函数接受的参数，以参数列表的形式传入,**必须一次性传入所有参数**
  - 当第一个参数为null、undefined的时候，默认指向window(在浏览器中)
  - 改变this指向后原函数会立即执行，且此方法只是临时改变thi指向一次。
  - 示例：
    ```JavaScript
    var arr=[1,10,5,8,3];
    console.log(Math.max.call(null,arr[0],arr[1],arr[2],arr[3],arr[4])); //10
    ```
- bind 
  - [Function.prototype.bind() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
  - 接受两个参数，第一个参数是this的指向，如果函数不在严格模式下，null 和 undefined 会被替换为全局对象;
  - 第二个参数是函数接受的参数，以参数列表的形式传入,**可以分多次传入**
  - 改变this指向后不会立即执行，而是返回一个永久改变this指向的函数
  - 可以二次传参，但新绑定的 thisArg 值会被忽略
  - 示例：
    ```JavaScript
    var arr=[1,10,5,8,12];
    var max=Math.max.bind(null,arr[0],arr[1],arr[2],arr[3])
    console.log(max(arr[4])); //12，分两次传参
    ```
  - 简易实现
    ```JavaScript
    Function.prototype.bind=function () {
      var _this=this;
      var context=arguments[0];
      var arg=[].slice.call(arguments,1); //将函数调用时传入的参数转换为数组，并且去掉了第一个参数

    return function(){
      arg=[].concat.apply(arg,arguments);
      _this.apply(context,arg);
    }
    };
    ```

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
- 参考[闭包 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
- 闭包是由函数以及声明该函数的词法环境组合而成的，该环境包含了这个闭包创建时作用域内的任何局部变量。
- 示例:
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
- JavaScript 不原生支持私有方法，但可以用闭包来实现：
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

## 提升
- 参考[JavaScript变量提升和函数提升详解](https://segmentfault.com/a/1190000038344251)
- 变量只有声明被提升，初始化不会被提升
- 声明会被提升到当前作用域的顶端
- 示例:
  ```JavaScript
  var foo = 3;
  function hoistVariable() {
    var foo = foo || 5;
    console.log(foo); // 5
  }
  hoistVariable();
  ```
- 函数声明和初始化都会被提升
- 函数表达式不会被提升,示例:
  ```JavaScript
  console.log(square); // undefined
  console.log(square(5)); // square is not a function =》 初始化并未提升，此时 square 值为 undefined
  var square = function (n) { 
    return n * n; 
  }
  ```
- **函数提升在变量提升之前**
- 变量被提升过后，先对提升上来的所有对象统一执行一遍声明步骤，然后再对变量执行一次赋值步骤。而执行赋值步骤时，会优先执行函数变量的赋值步骤，再执行普通变量的赋值步骤。示例:
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

## Var, Let, and Const 
- 参考[Var, Let, and Const – What's the Difference?](https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/)
- **作用域**：var 声明是全局作用域或函数作用域，而 let 和 const 是块作用域。
- **变化**：var 变量可以在其作用域内更新和重新声明；let 变量可以更新但不能重新声明；const 变量既不能更新也不能重新声明。
- **提升**: 它们都被提升到了作用域的顶部。但是，var 变量是用 undefined 初始化的，而 let 和 const 变量不会被初始化。
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
- 数据存储 
  1. 基本类型数据保存在在栈内存中
  2. 引用类型数据保存在堆内存中，引用数据类型的变量是一个指向堆内存中实际对象的引用，存在栈中
- 浅拷贝
  - 只复制属性指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存，修改对象属性会影响原对象
  - 实现
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
- 深拷贝
  - 创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会影响原对象
  - 实现 
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


- 参考 
  - [面试官：深拷贝浅拷贝的区别？如何实现一个深拷贝？ | web前端面试 - 面试官系列](https://vue3js.cn/interview/JavaScript/copy.html)

## 复制
- 参考 [JavaScript复制内容到剪贴板 - 掘金](https://juejin.cn/post/6844903567480848391)
- 补充：
  1. 上文主要是使用`document.execCommand('copy')`这个方法。但[Document: execCommand() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)显示"This feature is no longer recommended."。
  2. 那该怎么改呢？看[execCommand() is now obsolete, what's the alternative? - Stack Overflow](https://stackoverflow.com/questions/60581285/execcommand-is-now-obsolete-whats-the-alternative)的高票回答:
  >The execCommand() is officially obsolete/deprecated but there's no alternative. 
  >Note that real world user agents (browsers such as Chrome, Firefox and Safari) cannot drop support for execCommand() because so many services require support for it. 

  过几年再看看？

## 读取剪贴板


## 问题
1. js到dom树的单向绑定

2. [牛客网ACM模式下JavaScript(V8)常见输入输出练习_readline(...).split is not a function-CSDN博客](https://blog.csdn.net/SpringRolls/article/details/116506148 )

3. [JavaScript实现封装、继承、多态JavaScript实现封装、继承、多态 - 掘金](https://juejin.cn/post/6979812535557963784 )

## JavaScript编程中常见的代码坏味道
### Pyramid of doom（厄运金字塔）
- [厄运金字塔（编程）- 维基百科 --- Pyramid of doom (programming) - Wikipedia](https://en.wikipedia.org/wiki/Pyramid_of_doom_(programming))