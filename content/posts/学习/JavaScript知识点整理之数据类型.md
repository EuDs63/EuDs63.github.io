---
title: JavaScript知识点整理之数据类型
slug: javascript_points_of_data_type
date: 2024-09-27T23:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
  - JavaScript
categories:
  - 学习
summary: 自己学习过程中整理的关于JavaScript中数据类型的知识点
--- 

## 基本类型(值类型)
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
7. 符号（Symbol）：用于表示唯一的标识符。(ES6引入)
8. 永远不会有返回值的类型（Never）：表示那些永远不会有返回值的函数的返回值类型。通常用于抛出异常或无限循环等情况。
9.  任意类型（Any）：表示可以是任何类型的值，通常用于在编写代码时不确定变量的类型，或者需要处理多种类型的情况。

### pattern
- 所有的内建对象都遵循相同的模式（pattern）：
  1. 方法都存储在 prototype 中（Array.prototype、Object.prototype、Date.prototype 等）。
  2. 对象本身只存储数据（数组元素、对象属性、日期）。

### 参考：
- [JavaScript 数据类型和数据结构 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)
- [BigInt](https://zh.javascript.info/bigint)
- [undefined与null的区别 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

---

## null和undefined的区别
```JavaScript
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // true，来自于 rabbit

delete rabbit.jumps;

alert( rabbit.jumps ); // null, 来自于animal

delete animal.jumps;

alert( rabbit.jumps ); // undefined，不再有这样的属性存在
```

---

## 原始值 
### 定义
在 JavaScript 中，原始值（原始数据类型）是一种既非对象也无方法或属性的数据。有 7 种原始数据类型：
1. string 
2. number 
3. bigint 
4. boolean 
5. undefined
6. symbol 
7. null

### 特点 
- 所有原始值都是不可变的，即它们的值不能被修改
- 基本类型没有方法，但仍然表现得像有方法一样。当在原始值上访问属性时，JavaScript 自动将值装入包装对象中，并访问该对象上的属性
- 可以任意地被创建，且没有生命周期，因此不能作为weakmap的键
- 特殊值 null 和 undefined 比较特殊。它们没有对象包装器，所以它们没有方法和属性。并且它们也没有相应的原型。

### 参考:
- [原始值 - MDN Web 文档术语表：Web 相关术语的定义 | MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive )

---

## Symbol 
- Symbol 同时是 JavaScript 里最特殊和最不特殊的东西了。

### 最特殊
- 代码
```JavaScript
  console.log(Symbol('foo') === Symbol('foo'));
  // false
  const symbolOne = Symbol('foo');
  const symbolTwo = Symbol('foo');
  console.log(symbolOne === symbolTwo); // false
  const obj = {};
  obj[symbolOne] = 'hello';
  console.log(obj[symbolTwo]); // undefined
  console.log(obj[symbolOne]); // 'hello'
```

- 传给 Symbol 构造器的字符串只是对它的一个描述，同一个领域下面同一个描述的 symbol 也是独特的。

### 最不特殊
```JavaScript
  const symbolOne = Symbol.for('foo');
  const symbolTwo = Symbol.for('foo');
  console.log(symbolOne === symbolTwo); // true
  const obj = {};
  obj[symbolOne] = 'hello';
  console.log(obj[symbolTwo]); // 'hello'
```

- Symbol.for(str) 新建了一个根据你字符串唯一的 symbol 对象。重点是，跨了领域之后，它还是一样的。。
```JavaScript
  const iframe = document.querySelector('iframe');
  const iframeWindow = iframe.contentWindow;
  console.log(Symbol.for('foo') === iframeWindow.Symbol.for('foo')); // true
```

### 参考
- [javascript - [译] isArray 背后发生了什么？ - 梦里一路飞奔 - SegmentFault 思否](https://segmentfault.com/a/1190000021089487 )

---

## 引用数据类型(对象类型)
### 包括
1. Object
2. Array 
3. Function
4. Date 
5. RegExp

ES6新增
1. Map
2. WeakMap
3. Set
4. WeakSet

### `Object`和`object`的区别
1. `Object`：这是一个内置的构造函数，用于创建对象。例如，你可以使用 new Object() 来创建一个新的对象实例。
2. `object`：这是一个数据类型的名称，表示所有引用类型的对象，包括数组、函数、正则表达式等。它是 JavaScript 中的一种原始类型，用于描述一类数据结构。

### Array 和object的关系
数组在内部也是对象，但它的原型是`Array.prototype`

---

## 类型判断 
### `typeof`: 
- 用于检查变量的数据类型。它返回一个表示变量类型的字符串
- 示例
  ```JavaScript
  let a = {};
  typeof a;
  //'object'
  let b = [];
  typeof b;
  //'object'
  ```
- 缺点: 只能检测8种: es5的string，boolean，number，function，object，undefined es6的symbol，以及最新的bigint
- 历史遗留问题
  - 在 JavaScript 的早期版本中，值的内部类型使用了一个 32 位的标识符，其中某些位被用于表示类型。对于对象和 null，这个标识符的值是相同的，导致 typeof null 返回 'object'
      ```javascript
      typeof null === "object" //true
      typeof null !== "null" // true
      ```

### `instance of`: 
- 用于检查一个对象是否是另一个对象的实例，或者是否属于某个类的实例
- 示例
  ```JavaScript
  class Animal {}
  class Dog extends Animal {}

  const dog = new Dog();
  console.log(dog instanceof Dog); // 返回 true
  console.log(dog instanceof Animal); // 返回 true
  ```

### `Object.toString.call`
```JavaScript
Object.prototype.toString.call(1) // "[object Number]"

Object.prototype.toString.call('hi') // "[object String]"

Object.prototype.toString.call({a:'hi'}) // "[object Object]"

Object.prototype.toString.call([1,'a']) // "[object Array]"

Object.prototype.toString.call(true) // "[object Boolean]"

Object.prototype.toString.call(() => {}) // "[object Function]"

Object.prototype.toString.call(null) // "[object Null]"

Object.prototype.toString.call(undefined) // "[object Undefined]"

Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
```

### 如何实现instanceof?
wip

### 如何确定传递的值是否是一个数组?
- 答: 使用`Array.isArray()`
- `Array.isArray()`的特别之处
  - `Array.isArray()` 拒绝原型链中带有 `Array.prototype`，而实际不是数组的对象，但 `instanceof Array` 会接受。
  - 对在另一个领域里面创建的数组也会返回 true
  - 对Array 的子类也会返回 true
    ```JavaScript
    class SpecialArray extends Array {}
    const specialArray = new SpecialArray();
    Array.isArray(specialArray) // true
    ```
- 领域(realm)
  - 一个领域包含了 JavaScript 的全局对象。
  - 跑在 worker 里面的代码，和跑在页面里面的代码，是属于不同领域的。
  - iframe 之间也是这样（属于不同领域）。但是，同源的 iframe 们共享一个 ECMAScript agent，意味着对象这个东西可以在不同领域之间传递：
- 参考
  - [Array.isArray() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray )
  - [javascript - [译] isArray 背后发生了什么？ - 梦里一路飞奔 - SegmentFault 思否](https://segmentfault.com/a/1190000021089487 )