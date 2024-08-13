---
title: JavaScript知识点整理
slug: javascript_points
date: 2024-03-06T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
categories:
  - 学习
summary: 自己学习过程中整理的关于JavaScript的知识点
--- 
**本文记录了我学习过程中整理的关于JavaScript的知识点,以摘抄为主，绝大部分非原创。未能全部都标明出处，在此致歉**

## JavaScript基本类型
1. 数值（Number）：用于表示数字，包括整数和浮点数。
2. 字符串（String）：用于表示文本，由单引号或双引号括起来的字符序列。
3. 布尔值（Boolean）：用于表示逻辑值，只有两个取值，true和false。
4. 空值（Null）：表示"没有对象"，即该处不应该有值; `typeof null === "object"`
5. 未定义（Undefined）：表示"缺少值"，就是此处应该有一个值，但是还没有定义
   - 在ES5标准中，`undefined`被设置为不可写
   - 但在其之前，`undefined`实际上是一个全局属性,可以被修改。所以babel会将其编译成`void 0`,来确保兼容性
6. 大整数（BigInt）：用于表示任意精度的整数，通常用于表示超出Number类型范围的整数。
   - 不可以把 bigint 和常规数字类型混合使用
   - 创建 bigint 的方式有两种：在一个整数字面量后面加 n 或者调用 BigInt 函数，该函数从字符串、数字等中生成 bigint
7. 符号（Symbol）：用于表示唯一的标识符。
    ```JavaScript
    console.log(Symbol('foo') === Symbol('foo'));
    // Expected output: false
    ```
8. 永远不会有返回值的类型（Never）：表示那些永远不会有返回值的函数的返回值类型。通常用于抛出异常或无限循环等情况。
9.  任意类型（Any）：表示可以是任何类型的值，通常用于在编写代码时不确定变量的类型，或者需要处理多种类型的情况。

- 参考：
  - [JavaScript 数据类型和数据结构 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)
  - [BigInt](https://zh.javascript.info/bigint)
  - [undefined与null的区别 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

## typeof 和instance of
- `typeof`: 用于检查变量的数据类型。它返回一个表示变量类型的字符串
- `instance of`: 用于检查一个对象是否是另一个对象的实例，或者是否属于某个类的实例
- 示例:
    ```JavaScript
    class Animal {}
    class Dog extends Animal {}

    const dog = new Dog();
    console.log(dog instanceof Dog); // 返回 true
    console.log(dog instanceof Animal); // 返回 true
    ```
- 手写instanceof

## 类型判断 
- type of 
- instance of 
- Object.toString.call 

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

## Object 
- 在 JavaScript 中，对象,可以被看作是一组属性的集合。它是唯一可变的值。事实上，函数也是具有额外可调用能力的对象。
- 对象属性名字可以是任意字符串，包括空串。
  - 如果对象属性名字不是合法的 javascript 标识符，它必须用引号包裹。
- 对象的原型（prototype）指向另一个对象或者 null
- [Object 和 Map 的比较 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#object_%E5%92%8C_map_%E7%9A%84%E6%AF%94%E8%BE%83)
- 对象注入攻击：[The Dangers of Square Bracket Notation](https://github.com/eslint-community/eslint-plugin-security/blob/main/docs/the-dangers-of-square-bracket-notation.md)

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

## 原型
- `__proto__`：
   - `__proto__` 是每个 JavaScript 对象都具有的一个属性，它指向该对象的原型（prototype）。原型链的实现就是通过 `__proto__` 实现的。
   - 当你访问对象的属性或方法时，如果对象本身没有定义，JavaScript 就会沿着原型链（通过 `__proto__`）向上查找，直到找到匹配的属性或方法或者到达原型链的顶端（Object.prototype）为止。
   - 尽管 `__proto__` 在历史上被广泛使用，但它在 ECMAScript 6 中被标记为过时，推荐使用 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 来访问和设置对象的原型。

- `.prototype`：
   - `.prototype` 是**函数对象特有**的属性。每个函数对象都有一个 `.prototype` 属性，它指向一个对象。这个对象被称为该函数的原型对象。
   - 当你使用 `new` 操作符来创建一个实例时，JavaScript 会将实例的 `__proto__` 属性指向该函数的 `.prototype` 所指向的对象，从而实现原型继承。
   - `.prototype` 属性主要用于定义构造函数的原型对象，它包含了实例共享的方法和属性。
   - 通过在构造函数的 `.prototype` 对象上添加属性和方法，可以让所有通过该构造函数创建的实例共享这些属性和方法。

- 示例:
  ```JavaScript
  function a() {
      this.b = 3
  }
  a.prototype.b = 7;
  console.log(b); //undefined
  var t = new a(); //创建一个新的实例
  console.log(b); //undefined
  var b = 2;
  console.log(b) //2
  console.log(t.b); // 3
  console.log(b); // 2
  a();
  console.log(b); //3
  ```

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


## 原型，原型链和实例的关系
- 原型链（prototype chain）
  - 在 JavaScript 中，每个对象都有一个指向其原型的链接，这个链接被称为原型链。
  - 当你尝试访问对象的属性或方法时，如果该对象本身没有这个属性或方法，JavaScript 引擎会沿着原型链向上查找，直到找到对应的属性或方法，或者查找到达原型链的末端（Object.prototype）。
- 实例 (instance)
  - 根据某个类或构造函数创建的具体对象
  - 当你实例化一个类时，你创建了一个新的对象，该对象继承了类的属性和方法，同时拥有了自己的状态和行为。每个实例都是独立的，它们之间的状态和行为互不影响。
- 示例:
  ```JavaScript
  function Fn() {}
  console.log(Fn.prototype) // {}
  Fn.prototype.add = function() {
    this.count++;
    console.log(`this.count: ${this.count}`);
  };

  Fn.prototype.count = 0;

  let fn1 = new Fn();
  fn1.add(); //1
  fn1.add(); //2

  let fn2 = new Fn();
  fn2.add(); //3
  ```

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

## 偏函数

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

## 柯里化(curry)
- 把接收多参的函数转化成可以逐个调用单个参数并返回接收剩下参数的函数
- 实现
  ```JavaScript
  function curry(func) {
    return function curried(...args){
      if args.length >= func.length{
        // func.length：func的参数的数量
        // 如果传入的 args 长度与原始函数所定义的（func.length）相同或者更长
        return func.apply(this,args);
      }
      else{
        return function(...args2){
          // 重新应用 curried，将之前传入的参数与新的参数一起传入。
          return curried.apply(this,args.concat(args2));
        }
      } 
    }
  }
  ```
- 上述代码的限制 
  1. 函数具有固定数量的参数
  2. 使用 rest 参数的函数，例如 f(...args)，不能以这种方式进行柯里化
- 实际使用：lodash 库的 _.curry
- 参考：[柯里化（Currying）](https://zh.javascript.info/currying-partials)

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

## Promise 
### 状态
- 待定（pending）：初始状态，既没有被兑现，也没有被拒绝。
- 已兑现（fulfilled）：意味着操作成功完成。
- 已拒绝（rejected）：意味着操作失败。
### 方法 
- `.then()`:
  - 最多接受两个参数；第一个参数是 Promise 兑现时的回调函数，第二个参数是 Promise 拒绝时的回调函数
  - 返回一个新生成的 Promise 对象，这个对象可被用于链式调用
- `.catch()`其实就是一个没有为 Promise 兑现时的回调函数留出空位的 `.then()`
- `Promise.all()`
  - 特点
    1. 接收一个可迭代对象
    2. 传入的数据中可以是普通数据，也可以是Promise对象
    3. 可迭代对象的promise是并行执行的
    4. 保持输入数组的顺序和输出数组的顺序一致
    5. 传入数组中只要有一个reject，立即返回reject,并带有第一个被拒绝的原因。
    6. 所有数据resolve之后返回一个 Promise
  - 实现：[手写Promise.all - 掘金](https://juejin.cn/post/7006200103157383175)
- `Promise.any()`
  - 当输入的任何一个 Promise 兑现时，这个返回的 Promise 将会兑现，并返回第一个兑现的值。当所有输入 Promise 都被拒绝（包括传递了空的可迭代对象）时，它会以一个包含拒绝原因数组的 AggregateError 拒绝。
### 作用
  - 参考[Promise作用以及基本使用 - 掘金](https://juejin.cn/post/6844903693658259464)
  - 将异步操作以同步操作的流程表达出来，避免层层嵌套的回调函数。表达更清晰高效，也更便于维护。
### 缺点
  1. 一旦新建它就会立即执行，无法中途取消
  2. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
  3. 当处于Pending状态时，无法得知目前进展到哪一个阶段
### 其他 
- 与`setTimeout`的区别
  setTimeout处于宏任务队列，Promise位于微任务队列
- Promise的原理（观察者模式）
### 参考
- [Promise - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Promise.any() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)
- [Promise.all() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [浅析setTimeout与Promise - 掘金](https://juejin.cn/post/6844903655473152008)

## async/await
- 函数前面的关键字 async 有两个作用：
  1. 让这个函数总是返回一个 promise。
  2. 允许在该函数内使用 await。
- Promise 前的关键字 `await` 使 JavaScript 引擎等待该 promise settle，然后：
  1. 如果有 error，就会抛出异常 —— 就像那里调用了 throw error 一样。
  2. 否则，就返回结果
- 示例
  ```JavaScript
  async function f() {
    try {
      let results = await Promise.all([
        fetch(url1),
        fetch(url2)
      ]);
    } catch(err) {
      alert(err);
    }
  }

  f();
  ```
  ```JavaScript
  const arr = [];

  async function add(arr, item) {
      await Promise.resolve();
      arr.push(item);
  }

  (async () => {
  console.log('arr in IIFE1', arr.toString());
  await add(arr, 2);
  console.log('arr in IIFE2', arr.toString());
  })()

  add(arr, 1); 

  (async () => {
  console.log('arr in IIFE3', arr.toString());
  await add(arr, 3);
  console.log('arr in IIFE4', arr.toString());
  })()

  console.log('arr', arr.toString());

  setTimeout(()=>{
    console.log('arr in setTimeout', arr.toString());
  },1000);

  // arr in IIFE1
  // arr in IIFE3
  // arr
  // arr in IIFE2 2,1,3
  // arr in IIFE4 2,1,3
  // arr in setTimeout 2,1,3
  ```
- 参考
  - [async/await](https://zh.javascript.info/async-await)

## 私有属性
- 参考[私有属性 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/Private_properties)
- 私有属性通过添加`#`前缀来创建，在类的外部无法合法地引用。
- 私有属性不是原型继承模型的一部分，因为它们只能在当前类内部被访问，而且不能被子类继承。

## 事件传播的 3 个阶段
1. 捕获阶段（Capturing phase）—— 事件（从 Window）向下走近元素。
2. 目标阶段（Target phase）—— 事件到达目标元素。
3. 冒泡阶段（Bubbling phase）—— 事件从元素上开始冒泡。

## 冒泡 
- 参考[冒泡和捕获](https://zh.javascript.info/bubbling-and-capturing)
- 当一个事件发生在一个元素上，它会首先运行在该元素上的处理程序，然后运行其父元素上的处理程序，然后一直向上到其他祖先上的处理程序。
- 引发事件的那个嵌套层级最深的元素被称为目标元素,可以通过`event.target`访问
- 用于停止冒泡的方法
  1. `event.stopPropagation()`: 停止向上移动，但是当前元素上的其他处理程序都会继续运行
  2. `event.stopImmediatePropagation()` : 停止冒泡，且其他处理程序不会被执行。
- [JavaScript 中那些不会冒泡的事件 - 知乎](https://zhuanlan.zhihu.com/p/164844013)
  1. scroll 
  2. blur & focus
  3. media事件 
  4. mouseLeave & mouseEnter
  5. 注意：mouseout/mouseover **会触发**冒泡

## preventDefault
- 参考[Event：preventDefault() 方法 - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)
- 如果此事件没有被显式处理，它默认的动作也不应该照常执行
- 此事件还是继续传播，除非碰到事件监听器调用 stopPropagation() 或 stopImmediatePropagation()，才停止传播
- 示例:
```JavaScript
window.addEventListener("beforeunload", (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = "";
});
```

## addEventListener
- 语法：
  ```JavaScript
  addEventListener(type, listener)
  addEventListener(type, listener, options)
  addEventListener(type, listener, useCapture) //旧版本的 DOM 的规定
  ```
- `options`
  - capture:boolean
  - once:boolean
  - passive:boolean True -> preventDefault() 不会被调用
  - signal
- [处理过程中 this 的值的问题 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#%E5%A4%84%E7%90%86%E8%BF%87%E7%A8%8B%E4%B8%AD_this_%E7%9A%84%E5%80%BC%E7%9A%84%E9%97%AE%E9%A2%98)
- 参考:
  - [EventTarget: addEventListener() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
  - [滚动事件优化 passive - 孟繁贵 - 博客园](https://www.cnblogs.com/mengfangui/p/11322590.html)

## removeEventListener
- 参考[EventTarget: removeEventListener() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
- 如果同一个事件监听器分别为“事件捕获（capture 为 true）”和“事件冒泡（capture 为 false）”注册了一次，这两个版本的监听器需要分别移除。移除捕获监听器不会影响非捕获版本的相同监听器，反之亦然。
- `options`只有 capture 配置影响 removeEventListener()

## 事件委托
- 事件处理模式之一,也称事件代理
- 对于许多以类似方式处理的元素，不必为每个元素分配一个处理程序，而是将单个处理程序放在它们的共同祖先上
- 在处理程序中，我们获取`event.target`以查看事件实际发生的位置并进行处理。
- 优点:
  1. 减少事件注册，提升性能
  2. 简化了dom节点更新时，相应事件的更新
- 缺点:
  1. 基于冒泡，对于不冒泡的事件不支持
  2. 层级过多，冒泡过程中，可能会被某层阻止掉。
  3. 理论上委托会导致浏览器频繁调用处理函数，虽然很可能不需要处理。所以建议就近委托，比如在table上代理td，而不是在document上代理td
- [React 中的事件委托 - 知乎](https://zhuanlan.zhihu.com/p/165089379)
  - React 借鉴事件委托的方式将大部分事件委托给了 Document 对象
  - 事件委托需要区分捕获和冒泡，有些事件由于没有冒泡过程，只能在捕获阶段进行事件委托
  - 没有进行委托的事件是 Form 事件和 Media 事件，原因是这些事件针对特性类型元素，委托意义不大，React 将其直接注册到了目标对象
  - React 中的事件分为 3 类。
    1. DiscreteEvent：click，blur,focus,submit,tuchStart 等。优先级最低。
    2. UserBlockingEvent：touchMove,mouseMove,scroll,drag,dragOver 等。这些事件会阻塞用户的交互，优先级次之
    3. ContinuousEvent：load,error,loadStart,abort,animationend 等。优先级最高，不会被打断。
- 参考
  - [事件委托](https://zh.javascript.info/event-delegation)
  - [js中的事件委托或事件代理详解 - 掘金](https://juejin.cn/post/6844903589052153869)
  - [React 中的事件委托 - 知乎](https://zhuanlan.zhihu.com/p/165089379)

## setTimeout
- 参考[setTimeout() 全局函数 - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout)
- 参数:
  ```JavaScript
  var timeoutID = setTimeout(func, [delay, arg1, arg2, ...]);
  // timeoutID 可用来作为 clearTimeout() 的参数来清除对应的定时器
  // arg1, ..., argN 可选  当计时结束的时候，将被传递给 func 函数的附加参数。
  ```
- func应是对函数的引用，示例:
```JavaScript
function sayHi() {
  alert('Hello');
}
// 正确
setTimeout(sayHi, 1000);
// 错的！
setTimeout(sayHi(), 1000); //这样传入的是sayHi函数的执行结果:undefined
```
- `delay`默认为0，代表了消息被实际加入到队列的**最小延迟时间**。如果队列中没有其他消息并且栈为空，在这段延迟时间过去之后，消息会被马上处理。
- 在默认情况下，在 `setTimeout()` 内部，this 关键字将被设置为 globalThis，在浏览器中它是 window 对象
- setTimeout为啥不准（线程间通信怎么都会有延迟的）
- 定时器原理setTimeout/setInterval（以前翻过v8的源码，本质上都是二叉堆，与react里的scheduler的实现有异曲同工之处）


## setInterval
- 参数：
  ```JavaScript
  var intervalID = setInterval(func, [delay, arg1, arg2, ...]);
  // intervalID 可用来作为 clearInterval() 的参数来清除对应的定时器
  // arg1, ..., argN 可选  当计时结束的时候，将被传递给 func 函数的附加参数。
  ```
- 每间隔给定的时间周期性执行
- 参考:
  - [setInterval() - Web API 接口 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/setInterval)
  - [调度：setTimeout 和 setInterval](https://zh.javascript.info/settimeout-setinterval)

## 事件循环
- 三种数据结构：
  1. stack: 函数调用形成了一个由若干帧组成的栈
  2. heap: 对象被分配在堆中
  3. queue: 一个待处理消息的消息队列。每一个消息都关联着一个用以处理这个消息的回调函数
- JavaScript 的异步任务根据事件分类分为两种：宏任务（MacroTask）和微任务（MicroTask）
  1. 宏任务 
     - I/O（Mouse Events、Keyboard Events、Network Events）
     - setTimeout、setInterval、setImmediate
     - UI Rendering（HTML Parsing）
     - MessageChannel
     - JavaScript Run
  2. 微任务
     - DOM mutations
     - Promises
  3. 优先级
     - 宏任务的优先级高于微任务
     - 每个宏任务执行完毕后都必须将当前的微任务队列清空
- 参考
  -  [事件循环 - JavaScript Guidebook](https://tsejx.github.io/javascript-guidebook/core-modules/executable-code-and-execution-contexts/concurrency-model/event-loop/)
  -  [浅析setTimeout与Promise - 掘金](https://juejin.cn/post/6844903655473152008)
  -  [JS Visualizer 9000](https://www.jsv9000.app/)

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

## 遍历数组
1. `forEach`
   - `Array.prototype.forEach(function(value, index, arr), thisValue)`
2. `every`
  ```JavaScript
  const arr = [0, 1, 2, 3, 4, 5, 6, 7]
  let a = arr.every((value) => value > -1)//判断数组元素是否都大于-1
  console.log(a);//true
  ```
3. `some()`
  ```JavaScript
  const arr = [0, 1, 2, 3, 4, 5, 6, -7]
  let a = arr.every((value) => value > -1)//判断数组元素是否有小于-1的
  console.log(a);//true
  ```
4. `filter()`
  ```JavaScript
  const arr = [0, 1, 2, 3, 4, 5, 6, 7]
  let newArr = arr.filter((value) => value > 3) //判断数组元素是否大于3
  console.log(newArr); //[ 4, 5, 6, 7 ]
  ```
5. `map()`
  ```JavaScript
  const arr = [0, 1, 2, 3, 4, 5, 6, 7]
  let newArr = arr.map((value) => value * 2) //将数组中每一个元素都乘以2
  console.log(newArr); //[0,  2,  4,  6, 8, 10, 12, 14]
  ```
6. `reduce()`
  ```JavaScript
  const array = [1,2,3,4,5]

  const sumWithInitial = array.reduce(
    (previousValue,currentValue,currentIndex) => 
        previousValue*2 + currentValue - currentIndex,1);

  console.log(sumWithInitial) // 63
  ```
7. `for...in` 和 `for...of`
  - for in 一般用来遍历对象的key、for of 一般用来遍历数组的value
  - 示例：
    ```JavaScript
    var obj  {a:1,b:2,c:3};

    for (let key in obj){
      console.log(key);
    }

    const array = ['a','b','c'];
    for (let val of array){
      console.log(val);
    }
  ```
- 参考:[js遍历数组的10种方法 - 掘金](https://juejin.cn/post/6854573211699380237)
- [javascript - for…in和for…of的用法与区别 - 前端开发随笔 - SegmentFault 思否](https://segmentfault.com/a/1190000022348279)
- [Array.prototype.reduce() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

## 实现forEach, map, filter
- forEach 
```JavaScript
Array.protype.forEach = function(){
  const array = this; // 调用 forEach 方法的数组实例
  const [callbackFn,thisArg] = [].slice.call(arguments);
  if (typeof callbackFn !== 'function'){
    throw new TypeError(callbackFn + 'is not a function')
  }
  for (let i =0;i<ary.length;i++){
    callbackFn.call(thisArg,array[i],i,array);
  }
}
```
- map 
```JavaScript
function map(arr,fn) {
  const res = [];
  arr.forEach((item,i)=>{
    res[i] = fn(item,i);
  })
  return res;
}
```
- filter 
```JavaScript
function filter(arr,fn){
  const res =[];
  arr.forEach((item,i)=>{
    const isOk = fn(item,i);
    if(isOk){
      res.push[item];
    }
  })
  return res;
}
```
- 参考 [超性感的React Hooks（六）自定义hooks的思维方式](https://mp.weixin.qq.com/s/GPcwIPJBc9I_NtixyU-U4Q)

## 数组去重
1. `reduce()`
  ```JavaScript
  const myArray = ["a", "b", "a", "b", "c", "e", "e", "c", "d", "d", "d", "d"];
  const myArrayWithNoDuplicates = myArray.reduce((accumulator, currentValue) => {
    if (!accumulator.includes(currentValue)) {
      return [...accumulator, currentValue];
    }
    return accumulator;
  }, []);

  console.log(myArrayWithNoDuplicates);
  ```
- 参考
  - [JavaScript 数组去重的方法（12 种方法，史上最全） - 前端开发随笔 - SegmentFault 思否](https://segmentfault.com/a/1190000016418021)

## 扁平数组

## 异步请求的竞态问题
### 
- 场景：需多次请求某一api，响应时间不固定。需要渲染的是最后一个请求返回的结果;常见于搜索，分页，选项卡等切换的场景
- 方法一：**忽略**: 计数，然后判断
- 方法二：**取消**: 在连续的请求过程中，每当我发出一个请求，我就将之前正在 pending 的请求的 Promise reject 掉，并且该请求的 XHR 对象执行 abort()；之前的请求 如果已经有响应的不用管它，我们当前的请求的结果会覆盖它的
- 参考:
  - [blog/Blog/如何解决异步请求的竞态问题.md at master · YuArtian/blog](https://github.com/YuArtian/blog/blob/master/Blog/%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E5%BC%82%E6%AD%A5%E8%AF%B7%E6%B1%82%E7%9A%84%E7%AB%9E%E6%80%81%E9%97%AE%E9%A2%98.md)
  - [如何解决前端常见的竞态问题-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/2193937)

## .实现一个事件处理对象，包括绑定，取消，执行功能。（前端笔试题还没看，凉，思路面试官说的）
思路:构造函数里面初始化一个空对象，存储事件名。绑定，取消(对应置空)就在这个数组里面操作。执行先判断是否存在，然后调用apply函数执行回调。

## 2.url的参数提取(这个会)
思路，spilt函数+foreach

3.js到dom树的单向绑定(不会)

## 如果想要promise.all方法里所有promise的状态该怎么办(不会)


## JavaScript编程中常见的代码坏味道
### Pyramid of doom（厄运金字塔）
- [厄运金字塔（编程）- 维基百科 --- Pyramid of doom (programming) - Wikipedia](https://en.wikipedia.org/wiki/Pyramid_of_doom_(programming))


