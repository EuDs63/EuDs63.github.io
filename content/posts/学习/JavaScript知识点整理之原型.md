---
title: JavaScript知识点整理之原型
slug: javascript_points_of_protype
date: 2024-09-30T22:56:14+08:00
tags:
  - 笔记
  - 前端
  - web
  - JavaScript
categories:
  - 学习
summary: 自己学习过程中整理的关于JavaScript中原型的知识点
--- 

## proto
### 概念
- `__proto__` 是**每个JavaScript对象都具有**的一个属性，它指向该对象的原型（prototype）。原型链的实现就是通过 `__proto__` 实现的。

### 作用
- 当访问对象的属性或方法时，如果对象本身没有定义，JavaScript 就会沿着原型链（通过 `__proto__`）向上查找，直到找到匹配的属性或方法或者到达原型链的顶端（Object.prototype）为止。

### 慎用
- `__proto__` 是`[[Prototype]]`的因历史原因而留下来的 getter/setter
- 尽管 `__proto__` 在历史上被广泛使用，但它在 ECMAScript 6 中被标记为过时
- 推荐使用 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 来访问和设置对象的原型。

---

## prototype
### 概念
- `.prototype` 是**函数对象特有**的属性。每个函数对象都有一个`.prototype`属性，它指向一个对象。这个对象被称为该函数的原型对象。
- 当使用 `new` 操作符来创建一个实例时，JavaScript 会将实例的`[[Prototype]]`属性指向该函数的`.prototype`所指向的对象，从而实现原型继承。
- 默认的 "prototype" 是一个只有属性 constructor 的对象，属性 constructor 指向函数自身。
  ```JavaScript
  
  function Rabbit() {}

  /* 默认的 prototype
  Rabbit.prototype = { constructor: Rabbit };
  */
  ```

### 作用
- `.prototype` 属性主要用于定义构造函数的原型对象，它包含了实例共享的方法和属性。
- 通过在构造函数的 `.prototype` 对象上添加属性和方法，可以让所有通过该构造函数创建的实例共享这些属性和方法。
- F.prototype 属性仅在 new F 被调用时使用，如果在创建之后，F.prototype 属性有了变化（`F.prototype = <another object>`），那么通过`new F`创建的新对象也将随之拥有新的对象作为`[[Prototype]]`，但已经存在的对象将保持旧有的值。

### 示例:
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

### 补充
- 箭头函数没有 prototype 属性

---

## new
### 定义
- new 运算符创建一个**用户定义的对象类型**的实例或**具有构造函数的内置对象**的实例。 ——（来自于MDN）
- 不可以使用 `new Symbol()`，因为 symbol 是基本数据类型，每个从Symbol()返回的 symbol 值都是唯一的。

### 工作原理
当使用`new`调用构造函数时，会发生以下步骤：

1. 创建一个新的空对象。
2. 将这个新对象的`__proto__`链接到构造函数的`prototype`属性上，建立原型继承关系。
3. 执行构造函数，将`this`绑定到新创建的对象上，允许修改该对象的属性。
4. 如果构造函数没有返回对象，则默认返回创建的对象。

### 简单实现
  ```JavaScript
  function myNew(constructor, ...args) {
    // 1. 创建一个空对象，并将其原型链链接到构造函数的 prototype
    const obj = Object.create(constructor.prototype);

    // 2. 执行构造函数，并将 `this` 绑定到新对象上
    const result = constructor.apply(obj, args);

    // 3. 如果构造函数返回的是对象类型，则返回该对象；否则返回新创建的对象
    return result instanceof Object ? result : obj;
  }

  // 测试用例
  function Car(color) {
      this.color = color;
  }
  Car.prototype.start = function() {
      console.log(this.color + " car start");
  }

  var car = myNew(Car, "black");
  car.color; // black
  
  car.start(); // black car start
  ```

### 代码输出题
```JavaScript
Function.prototype.a = 1;
Object.prototype.b = 2;
function F() {
    //
}
const f = new F();

console.log(F.a); // 1
console.log(F.b); // 2
console.log(f.a); //undefined
console.log(f.b); // 2
console.log(f.prototype); //undefined
console.log(f.__proto__); //{}

```

### 参考
- [深度解析 new 原理及模拟实现 | 木易杨前端进阶](https://muyiy.cn/blog/3/3.5.html)

---

## 原型，原型链和实例的关系
### 原型链（prototype chain）
- 在 JavaScript 中，每个对象都有一个指向其原型的链接，这个链接被称为原型链。
- 当尝试访问对象的属性或方法时，如果该对象本身没有这个属性或方法，JavaScript 引擎会沿着原型链向上查找，直到找到对应的属性或方法，或者查找到达原型链的末端（Object.prototype）。

### 实例 (instance)
- 根据某个类或构造函数创建的具体对象
- 当实例化一个类时，你创建了一个新的对象，该对象继承了类的属性和方法，同时拥有了自己的状态和行为。每个实例都是独立的，它们之间的状态和行为互不影响。
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

### 原型链的性能
在现代引擎中，从性能的角度来看，我们是从对象还是从原型链获取属性都是没区别的。它们（引擎）会记住在哪里找到的该属性，并在下一次请求中重用它。

例如，对于 pockets.glasses 来说，它们（引擎）会记得在哪里找到的 glasses（在 head 中），这样下次就会直接在这个位置进行搜索。并且引擎足够聪明，一旦有内容更改，它们就会自动更新内部缓存，因此，该优化是安全的。

---

## 原生原型 
- 内建对象，像 Array、Date、Function 及其他，都在 prototype 上挂载了方法。
- 在现代编程中，只有一种情况下允许修改原生原型。那就是 polyfilling。

## 使用给定的原型创建对象
### 字面量语法

### Object.create
- `Object.create(proto, [descriptors])`
- 浅拷贝对象及其所有属性描述符（descriptors）
```JavaScript
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

## 参考
- [原型继承](https://zh.javascript.info/prototype-inheritance )
- [F.prototype](https://zh.javascript.info/function-prototype )
- [原生的原型](https://zh.javascript.info/native-prototypes )
- [原型方法，没有proto的对象](https://zh.javascript.info/prototype-methods )