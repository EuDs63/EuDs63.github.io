---
title: JavaScript知识点整理之this
slug: javascript_points_of_this
date: 2024-10-10T00:56:14+08:00
tags:
  - 笔记
  - 前端
  - web
  - JavaScript
categories:
  - 学习
summary: 自己学习过程中整理的关于JavaScript中this的知识点
--- 

## this的判断
### 关键一
- `this`永远指向，（最内层）调用这个包含"this"关键字的函数的对象
- 也就是说: 无论在哪里找到方法：在一个对象还是在原型中。在一个方法调用中，this 始终是点符号`.`前面的对象
- 示例一
    ```JavaScript
    my_element.addEventListener("click", function (e) {
    console.log(this.className); // 输出 my_element 的 className
    console.log(e.currentTarget === this); // 输出 `true`
    });
    ```
- 示例二
    ```JavaScript
    let user = {
    name: "John",
    surname: "Smith",

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
    };

    let admin = {
    __proto__: user,
    isAdmin: true
    };

    alert(admin.fullName); // John Smith (*)

    // setter triggers!
    admin.fullName = "Alice Cooper"; // (**)

    alert(admin.fullName); // Alice Cooper，admin 的内容被修改了
    alert(user.fullName);  // John Smith，user 的内容被保护了
    ```

### 关键二
- 如果函数在最外层直接运行，默认绑定的对象是 window
- 示例
  ```JavaScript
  function test(){
      var a = 1;
      console.log(this.a);
  }

  test(); //undefined
  ```

### 补充
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

  setTimeout(rr,1000); // obj ，而不是window; 因为箭头函数rr的this已经确定了，后面不能更改
  ```

### 参考 
- [Javascript ：this关键字 详解 - 知乎](https://zhuanlan.zhihu.com/p/25349790)
- [javascript - 关于箭头函数里的this - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000039881063)
- [JavaScript深入之重新认识箭头函数的this | 木易杨前端进阶](https://muyiy.cn/blog/3/3.2.html)
- [this - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)
- [Reference Type](https://zh.javascript.info/reference-type)

---

## call、bind、apply
### apply
- 接受两个参数，第一个参数是this的指向，第二个参数是函数接受的参数，以**数组**的形式传入,**必须一次性传入所有参数**
- 当第一个参数为null、undefined的时候，默认指向window(在浏览器中)
- 改变this指向后原函数会**立即执行**，且此方法只是临时改变thi指向一次。
- 示例:
    ```JavaScript
    var arr=[1,10,5,8,3];
    console.log(Math.max.apply(null, arr)); //10
    ```

### call 
- 接受两个参数，第一个参数是this的指向，第二个参数是函数接受的参数，以**参数列表**的形式传入,**必须一次性传入所有参数**
- 当第一个参数为null、undefined的时候，默认指向window(在浏览器中)
- 改变this指向后原函数会**立即执行**，且此方法只是临时改变this指向一次。
- 示例：
  ```JavaScript
  var arr=[1,10,5,8,3];
  console.log(Math.max.call(null,arr[0],arr[1],arr[2],arr[3],arr[4])); //10
  ```

### bind 
- [Function.prototype.bind() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- 接受两个参数，第一个参数是this的指向，如果函数不在严格模式下，null 和 undefined 会被替换为全局对象;
- 第二个参数是函数接受的参数，以**参数列表**的形式传入,**可以分多次传入**
- 改变this指向后**不会立即执行**，而是返回一个**永久改变this指向的函数**
- 可以**二次传参**，但新绑定的 thisArg 值会被忽略
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

### 作用
- 防止原型链污染
- 示例:
  - JavaScript does not protect the property name hasOwnProperty; an object that has a property with this name may return incorrect results
  - The recommended way to overcome this problem is to instead use Object.hasOwn() (in browsers that support it). Other alternatives include using an external hasOwnProperty:
  - 代码 
    ```JavaScript
    const foo = { bar: "Here be dragons" };

    // Use Object.hasOwn() method - recommended
    Object.hasOwn(foo, "bar"); // true

    // Use the hasOwnProperty property from the Object prototype
    Object.prototype.hasOwnProperty.call(foo, "bar"); // true

    // Use another Object's hasOwnProperty
    // and call it with 'this' set to foo
    ({}).hasOwnProperty.call(foo, "bar"); // true
    ```

### 参考
- [彻底弄懂bind，apply，call三者的区别 - 知乎](https://zhuanlan.zhihu.com/p/82340026)
- [Object.prototype.hasOwnProperty() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty )
