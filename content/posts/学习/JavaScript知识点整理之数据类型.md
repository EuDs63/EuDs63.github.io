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

---

## Object
### 概念
- 在 JavaScript 中，对象,可以被看作是一组属性的集合。它是唯一可变的值。事实上，函数也是具有额外可调用能力的对象。
- 对象属性名字可以是任意字符串，包括空串。
  - 如果对象属性名字不是合法的 javascript 标识符，它必须用引号包裹。
- 对象的原型（prototype）指向另一个对象或者 null

### 访问和设置Object的属性
- **访问**
  - 点符号表示法 
    - `obj.propertyName`
    - 适用于静态属性名
  - 方括号表示法 
    - `obj["propertyName"]` 
    - 适用于动态属性名或包含特殊字符的属性名
  - 上述二者都属于**属性访问器**(Property accessors)

- **设置**
  - 语法`Object.defineProperty(obj, prop, descriptor)`
  - 示例:
    ```JavaScript
    const obj = {};
    Object.defineProperty(obj, 'hiddenProp', {
      value: 'hidden',
      configurable:false,//default
      enumerable: false,//default
      writable: false //default
    });
    ```
- 设置访问器属性
  - 不能直接定义
  - 示例
    ```JavaScript
      const book = { 
        hideYear: 2004, 
        edition: 1 
      }; 
      Object.defineProperty(book, "year", { 
        get: function(){ 
          return this.hideYear; 
        }, 
        set: function(newValue){ 
          if (newValue > 2004) { 
          this.hideYear = newValue; 
          this.edition += newValue - 2004; 
          } 
        } 
      }); 
      book.year = 2005; 
      alert(book.edition); //2
    ```
- **区别**
  1. 使用属性访问器分配一个值, 添加的属性是**可写、可枚举、可配置的**
  2. 默认情况下，使用`Object.defineProperty() `添加的属性是**不可写、不可枚举和不可配置的**
  3. 若属性为不可配置的话，那么无法再修改其特性

- **删除**
  - 只能删除对象的可配置属性,`delete obj.name;`
  - 若属性为不可配置的话，尝试删除在非严格模式下会被忽略，严格模式下会抛出错误

- 对象注入攻击：[The Dangers of Square Bracket Notation](https://github.com/eslint-community/eslint-plugin-security/blob/main/docs/the-dangers-of-square-bracket-notation.md)

- 参考
  - [js中对象的点语法与方括号语法的区别 - 掘金](https://juejin.cn/post/7215401973842788411)
  - [属性访问器 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Property_accessors)
  - [Object.defineProperty() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
  - [JavaScript对象的数据属性与访问器属性 - 掘金](https://juejin.cn/post/6844903828580466702 )

### 字面量初始化对象语法
- 定义:
  - 一个用大括号（{}）括起来的以逗号分隔的列表，包含了一个对象的零个或多个属性名称和相关值
  - 是 Object.create() 的一种语法糖
- 区别于JSON:
  - JSON 是对象字面语法的一个真子集
- 简写函数名
  ```JavaScript
  const o = {
    property: function (){}
  }
  //等价于
  const o = {
    property(){}
  }
  ```

- 参考： [对象初始化器 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer )

### Object.create()
- 定义: 以一个现有对象作为原型，创建一个新对象
- 语法: `Object.create(proto, propertiesObject)`
- 示例:
  ```JavaScript
  o = Object.create(Object.prototype, {
    // foo 是一个常规数据属性
    foo: {
      writable: true,
      configurable: true,
      value: "hello",
    },
    // bar 是一个访问器属性
    bar: {
      configurable: false,
      get() {
        return 10;
      },
      set(value) {
        console.log("Setting `o.bar` to", value);
      },
    },
  });
  ```
- 特点:
  1. 可以控制每个属性的可枚举性、可配置性等，而这在字面量初始化对象语法中是做不到的
  2. 直接创建了一个以 传入的第一个参数 作为原型的新对象，不涉及构造函数
  3. 由于没有构造函数，不会自动初始化属性，所有属性需要手动添加
- 可用于模拟`new`
  ```JavaScript
  function myNew(constructor,...args){
    const obj = Object.create(constructor.prototype);
    const res = constructor.apply(obj,args);
    return res instanceof Object ? res : obj
  }
  ```
- 参考: [Object.create() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create )


### Object.assign()
- copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.
- 示例 
  ```JavaScript
  var name = 'tom'
  var a = {name:name}
  var b = Object.assign(a)
  console.log(b.name) //tom
  ```
- 参考：[Object.assign() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign )

### 遍历Object
1. for in 和 for of
  - 对于Object，用`for in`来遍历Object的key,但无法用`for of`来遍历value
     ```JavaScript
     const person = {
       name: "Alice",
       age: 30,
       gender: "female"
     }

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
  - `for in`的缺陷 
    1. 会遍历原型链上的可枚举属性
    2. 属性遍历顺序不一定是属性定义顺序
    3. 只会遍历字符串类型的属性键

2. `Object.entries()`
   - returns an array of a given object's own enumerable string-keyed property key-value pairs.
   - 举例:
     ```JavaScript
     const obj = { foo: "bar", baz: 42 };
     console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
     ```
   - 参考：[Object.entries() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
3. `Object.keys()`
4. `Object.values()`
5. `Object.getOwnPropertyNames()`
   - 可以返回对象自身的所有**字符串属性名**，**包括**不可枚举的属性
   - 示例 
     ```JavaScript
      const obj = {};
      Object.defineProperty(obj, 'hiddenProp', {
        value: 'hidden',
        enumerable: false
      });
      obj.visibleProp = 'visible';

      console.log(Object.getOwnPropertyNames(obj));  // 输出 ["hiddenProp", "visibleProp"]
     ```
6. `Object.getOwnPropertyDescriptors()`
   - 可以返回对象自身所有**字符串属性**的名和属性描述符，包括不可枚举的属性
7. `Object.getOwnPropertySymbols()`
   - 获取对象自身的所有 Symbol 属性键
   - 示例:
     ```JavaScript
      const object1 = {};
      const a = Symbol('a');
      const b = Symbol.for('b');

      object1[a] = 'localSymbol';
      object1[b] = 'globalSymbol';
      object1.c = 'a';

      console.log(Object.getOwnPropertySymbols(object1));
      //  [Symbol("a"), Symbol("b")]
      ```

### `Object`和`object`的区别
1. `Object`：这是一个内置的构造函数，用于创建对象。例如，你可以使用`new Object()`来创建一个新的对象实例。
2. `object`：这是一个数据类型的名称，表示所有引用类型的对象，包括数组、函数、正则表达式等。它是 JavaScript 中的一种原始类型，用于描述一类数据结构。

### `Object`和`Map`的区别
- 意外的键
- 安全性: 
  - Map 可以安全地与用户提供的键值一起使用。
  - 可能会导致对象注入攻击,可以通过使用 null 原型对象来缓解
- 键的类型: 
  - Map 的键可以为任何值
  - Object 的键必须为 String 或 Symbol
- 键的顺序
  - Map 对象按照插入的顺序迭代条目、键和值。
  - 没有单一机制可以迭代对象的所有属性
- 大小
  - Map 中的项目数量很容易从其 size 属性中获得
  - 通过获取 Object.keys() 返回的数组的长度
- 迭代
  - Map 是可迭代对象，所以它可以直接迭代。
  - Object 没有实现迭代协议，因此对象默认情况下不能直接通过 JavaScript 的 for...of 语句进行迭代。
- 性能
  - Map在涉及频繁添加和删除键值对的场景中表现更好。
  - Object未针对频繁添加和删除键值对进行优化。
- 序列化和解析
  - Map没有对序列化或解析的原生支持。
  - `JSON.stringify()`, `JSON.parse()`

- 参考: [Object 和 Map 的比较 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#object_%E5%92%8C_map_%E7%9A%84%E6%AF%94%E8%BE%83)

---

## Function
### new Function
- 语法: `let func = new Function ([arg1, arg2, ...argN], functionBody);`
- 环境: 如果我们使用 new Function 创建一个函数，那么该函数的`[[Environment]]`并不指向当前的词法环境，而是指向全局环境,这样做的好处是避免了与使用压缩程序而产生冲突的问题
- 使用场景: 在复杂的 Web 应用程序中，我们需要从服务器获取代码或者动态地从模板编译函数时
- 参考: ["new Function" 语法](https://zh.javascript.info/new-function )