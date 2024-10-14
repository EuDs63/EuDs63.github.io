---
title: JavaScript知识点整理之映射与集合
slug: javascript_points_of_map_and_set
date: 2024-09-28T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
  - JavaScript
categories:
  - 学习
summary: 自己学习过程中整理的关于JavaScript中映射与集合的知识点
--- 

## Map 
### 概念
- 是一个带键的数据项的集合
- 允许任何类型的键（key）

### 常用方法
- new Map() —— 创建 map。
- map.set(key, value) —— 根据键存储值。
- map.get(key) —— 根据键来返回值，如果 map 中不存在对应的 key，则返回 undefined。
- map.has(key) —— 如果 key 存在则返回 true，否则返回 false。
- map.delete(key) —— 删除指定键的值。
- map.clear() —— 清空 map。
- map.size —— 返回当前元素个数。

### 迭代
- 迭代的顺序与插入值的顺序相同。与普通的 Object 不同，Map 保留了此顺序。
- map.keys() —— 遍历并返回一个包含所有键的可迭代对象，
- map.values() —— 遍历并返回一个包含所有值的可迭代对象，
- map.entries() —— 遍历并返回一个包含所有实体 [key, value] 的可迭代对象，for..of 在默认情况下使用的就是这个。
- `map.forEach((value,key,map)=>{})`

### Map 是怎么比较键的？
Map 使用 [SameValueZero](https://tc39.es/ecma262/#sec-samevaluezero) 算法来比较键是否相等。它和严格等于 === 差不多，但区别是 NaN 被看成是等于 NaN。所以 NaN 也可以被用作键。这个算法不能被改变或者自定义。

### Map和Object的区别
- Map可以支持任意JS数据类型作为键名，而Object只能是数值、字符串或者符号
- 内存占用： 不同浏览器下情况不同，Map大约比Object多存储50%的键值对
- 插入性能： 插入速度都不会因为键值对的数量进行线性增加，但对于大量插入操作，Map的性能更佳。
- 查找速度： 如果是少量的键值对，Object的速度更快
- 删除性能： Map在大多数浏览器引擎中删除操作较快

### 初始化
- 传入一个带有键值对的数组（或其它可迭代对象）来进行初始化
 ```javascript
 // 键值对 [key, value] 数组
   let map = new Map([
   ['1',  'str1'],
   [1,    'num1'],
   [true, 'bool1']
   ]);

   alert( map.get('1') ); // str1
 ```
- 使用Object.entries：从对象创建 Map
  ```javascript
    let obj = {
    name: "John",
    age: 30
    };

    let map = new Map(Object.entries(obj));

    alert( map.get('name') ); // John
  ```
- 反过来，使用Object.fromEntries：从 Map 创建对象
  ```javascript
  
    let map = new Map();
    map.set('banana', 1);
    map.set('orange', 2);
    map.set('meat', 4);

    let obj = Object.fromEntries(map.entries()); // 创建一个普通对象（plain object）(*)
    //可以更短
    // let obj = Object.fromEntries(map); // 省掉 .entries()

    // obj = { banana: 1, orange: 2, meat: 4 }

    alert(obj.orange); // 2
  ```

### 实现
可以使用两个数组（一个存放键，一个存放值）来实现。给这种映射设置值时会同时将键和值添加到这两个数组的末尾。从而使得键和值的索引在两个数组中相对应。当从该映射取值的时候，需要遍历所有的键，然后使用索引从存储值的数组中检索出相应的值。

但这样的实现会有两个很大的缺点：

1. 赋值和搜索操作都是 O(n) 的时间复杂度（n 是键值对的个数），因为这两个操作都需要遍历全部整个数组来进行匹配。
2. 可能会导致内存泄漏，因为数组会一直引用着每个键和值。这种引用使得垃圾回收算法不能回收处理他们，即使没有其他任何引用存在了。

### 基于Map的LRU缓存实现
```javascript
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // 用于存储缓存
    }

    get(key) {
        if (!this.cache.has(key)) {
            return -1; // 如果不存在，返回 -1
        }
        // 如果存在，将该键值移到末尾表示最近使用
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            // 如果已存在，先删除旧的
            this.cache.delete(key);
        } else if (this.cache.size === this.capacity) {
            // 如果缓存已满，删除最旧的（第一个）
            this.cache.delete(this.cache.keys().next().value);
        }
        // 添加新值到缓存
        this.cache.set(key, value);
    }
}

// 使用示例
const lruCache = new LRUCache(2); // 创建容量为 2 的 LRU 缓存
lruCache.put(1, 'A'); // 缓存是 {1: 'A'}
lruCache.put(2, 'B'); // 缓存是 {1: 'A', 2: 'B'}
console.log(lruCache.get(1)); // 返回 'A'，缓存变为 {2: 'B', 1: 'A'}
lruCache.put(3, 'C'); // 取消键 2，缓存是 {1: 'A', 3: 'C'}
console.log(lruCache.get(2)); // 返回 -1（未找到）
lruCache.put(4, 'D'); // 取消键 1，缓存是 {3: 'C', 4: 'D'}
console.log(lruCache.get(1)); // 返回 -1（未找到）
console.log(lruCache.get(3)); // 返回 'C'
console.log(lruCache.get(4)); // 返回 'D'
```

---

## WeakMap
### 要求 
- 键必须是可被垃圾回收的
  - 大多数原始数据类型可以任意地被创建，且**没有生命周期**，因此不能作为键
  - 对象和非全局注册的符号都可以作为键，因为它们是可被垃圾回收的

### 特点
- WeakMap 的键对象会强引用其值，直到该键对象被垃圾回收，但从那时起，它会变为弱引用
- 不会阻止垃圾回收，直到垃圾回收器移除了键对象的引用
- 任何值都可以被垃圾回收，只要它们的键对象没有被 WeakMap 以外的地方引用

### 强引用与弱引用
- 对象的弱引用是指该引用**不会阻止** GC 回收这个对象。
- 一个普通的引用（或者说强引用）会将与之对应的对象保存在内存中。
- 只有当该对象没有任何的强引用时，JavaScript 引擎 GC 才会销毁该对象并且回收该对象所占的内存空间。如果上述情况发生了，那么你就无法通过任何的弱引用来获取该对象。

### 作用一: 模拟私有成员
- 好处 
  1. 与`Map`相比，`WeakMap`不持有键对象的强引用，因此元数据与对象本身共享同样的生命周期，**避免内存泄漏**。
  2. 与使用不可枚举对象和/或`Symbol`属性相比，`WeakMap`位于对象外部，没有办法通过像`Object.getOwnPropertySymbols`等的反射方法来检索元数据。
  3. 与闭包相比，构造函数可以复用同一个`WeakMap`对象来创建所有实例，从而节省内存，并且允许同一个类创建的不同实例读取彼此的私有成员。
- 代码:
```JavaScript
let Thing;

{
  const privateScope = new WeakMap();
  let counter = 0;

  Thing = function () {
    this.someProperty = "foo";

    privateScope.set(this, {
      hidden: ++counter,
    });
  };

  Thing.prototype.showPublic = function () {
    return this.someProperty;
  };

  Thing.prototype.showPrivate = function () {
    return privateScope.get(this).hidden;
  };
}

console.log(typeof privateScope);
// "undefined"

const thing = new Thing();

console.log(thing);
// Thing {someProperty: "foo"}

thing.showPublic();
// "foo"

thing.showPrivate();
// 1
```
- 常规写法
```JavaScript
class Thing {
  static #counter = 0;
  #hidden;
  constructor(){
    this.someProperty = "foo";
    this.#hidden = ++Thing.#counter;
  }
  showPublic(){
    return this.someProperty;
  }
  showPrivate(){
    return this.#hidden;
  }
}
console.log(thing);
// Thing {someProperty: "foo"}

thing.showPublic();
// "foo"

thing.showPrivate();
// 1
```

### 作用二: 关联元数据
- 可用于将元数据与对象关联，而不影响对象的生命周期

### 作用三: 缓存
- 缺点:
  - 只有当函数的输入是对象时才有效
  - 即使输入不再传入，结果依然永远保留在缓存中
- 更好的方法: 将 Map 与 WeakRef 对象配对使用

### 参考 
- [WeakMap - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap )

---

## Set
### 概念
- “值的集合”（没有键）
- 每一个值只能出现一次

### 常用方法
- `new Set(iterable)` —— 创建一个 set，如果提供了一个 iterable 对象（通常是数组），将会从数组里面复制值到 set 中。
- `set.add(value)` —— 添加一个值，返回 set 本身
- `set.delete(value)` —— 删除值，如果 value 在这个方法调用的时候存在则返回 true ，否则返回 false。
- `set.has(value)` —— 如果 value 在 set 中，返回 true，否则返回 false。
- `set.clear()` —— 清空 set。
- `set.size` —— 返回元素个数。

### 迭代
- `for..of`
- `forEach`
  - 回调函数有三个参数：一个 value，然后是 同一个值 valueAgain，最后是目标对象
  - **为了与 Map 兼容**
- `set.keys()` —— 遍历并返回一个包含所有值的可迭代对象，
- `set.values()` —— 与`set.keys()`作用相同，这是为了兼容 Map，

### 作用 
- 数组去重：`Array.from(new Set(arr));`

### 参考
- [Set - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set )

---

## WeakSet 
### 概念
- 可被垃圾回收的值的集合，包括对象和非全局注册的符号
- WeakSet 中的值只能出现一次
- WeakSet 是不可枚举的

### 作用一: 检测循环引用
```JavaScript
// 对传入的 subject 对象内部存储的所有内容执行回调
function execRecursively(fn, subject, _refs = new WeakSet()) {
  // 避免无限递归
  if (_refs.has(subject)) {
    return;
  }

  fn(subject);
  if (typeof subject === "object") {
    _refs.add(subject);
    for (const key in subject) {
      execRecursively(fn, subject[key], _refs);
    }
  }
}

const foo = {
  foo: "Foo",
  bar: {
    bar: "Bar",
  },
};

foo.bar.baz = foo; // 循环引用！
execRecursively((obj) => console.log(obj), foo);
```

### 用例
```JavaScript
const ws = new WeakSet();
const foo = {};
const bar = {};

ws.add(foo);
ws.add(bar);

ws.has(foo); // true
ws.has(bar); // true

ws.delete(foo); // 从 set 中删除 foo 对象
ws.has(foo); // false，foo 对象已经被删除了
ws.has(bar); // true，bar 依然存在
```

- 注意，`foo !== bar`。尽管它们是相似的对象，但是它们不是同一个对象。因此，它们都可以被加入到集合中。

### 参考 
- [WeakSet - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet )

## 参考
- [Map and Set（映射和集合）](https://zh.javascript.info/map-set )
- [ES6新增引用类型：Map、WeakMap、Set、WeakSet前言 Map、WeakMap、Set、WeakSet作 - 掘金](https://juejin.cn/post/7003533740341362719 )