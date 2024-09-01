---
title: json的序列化与反序列化
slug: serialization_and_deserialization
date: 2024-08-23T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
categories:
  - 学习
summary: 整理JavaScript知识点时发现内容还挺多，于是干脆独立出来
--- 
## 基本概念
- 序列化
  - 将json对象转换为字符串“序列”
  - `JSON.stringify(value, replacer, space)`
  - 可通过修改对象的toJSON属性，来进一步控制

- 反序列化
  - 将字符串“序列”转换为json对象
  - `JSON.parse(text, reviver)` 

## reviver的理解
### 一个出乎我意料的例子
粗略扫了遍文档，我以为我已经完全掌握了序列化和反序列化，但
[JSON.parse() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse )给了一个出乎我意料的例子:

```javascript
const transformedObj1 = JSON.parse('[1,5,{"s":1}]', (key, value) => {
  return typeof value === "object" ? undefined : value;
});

  console.log(transformedObj1); // undefined

  // const message = [1,2,3] 
  // console.log(typeof message) //object
```

按照我的理解，我以为最终结果会是`[1,5]`。看来自己还是图样，于是请教了ChatGPT老师。

### reviver函数的概念
1. 执行顺序
`JSON.parse` 解析 JSON 字符串时，`reviver` 函数会以深度优先的顺序处理每个键值对。即它会先解析嵌套的对象或数组中的值，然后再解析外层对象或数组。

2. key 和 value 的含义
key: 当前被处理的键（对于数组，key 是索引，最外层对象的 key 是空字符串 ""）。
value: 当前被处理的值，这个值可以是一个基本数据类型（如字符串、数字）或复杂的对象、数组。

3. 可以通过以下例子来理解：
  ```javascript
  const obj = JSON.parse('{"a": 1, "b": {"c": 2, "d": 3}, "e": [4, 5]}', (key, value) => {
    console.log(`key: ${key}, value: ${value}`);
    return value;
  });

  /*
  key: a, value: 1
  key: c, value: 2
  key: d, value: 3
  key: b, value: [object Object]
  key: 0, value: 4
  key: 1, value: 5
  key: e, value: 4,5
  key: , value: [object Object]
  */
  ```

### 回到刚才的例子
理解了reviver回调函数，我就对刚才的例子没有疑问了。

reviver函数里的这段代码执行了五次，而最后的key为`""`,value则为`[1,5,{"s":1}]`。因为在 JavaScript 中，数组（Array）是 object 的一种特殊类型,因此最终结果是`undefined`

而如果想要符合我一开始认为的结果，代码应该这样写：
```javascript
const transformedObj1 = JSON.parse('[1,5,{"s":1}]', (key, value) => {
  if(key!=="")
    return typeof value === "object" ? undefined : value;
  else
    return value
});

console.log(transformedObj1);
```

## JSON.parse(JSON.stringify(obj))
我第一次读到这行代码的时候还觉得奇怪，为什么要这样写，顺手就想改掉。想了下才意识到这是为了实现深拷贝。

### 局限性
但这样写好吗？搜索后我发现有两篇文章将它的局限性写得很透彻了。
- [javascript - 关于JSON.parse()和JSON.stringify()的性能小测试 - 超级有温度的代码 - SegmentFault 思否](https://segmentfault.com/a/1190000018495737 )
- [javascript - 关于 JSON.parse(JSON.stringify(obj)) 实现深拷贝的一些坑 - 超级有温度的代码 - SegmentFault 思否](https://segmentfault.com/a/1190000020297508 )

我将其中的主要内容摘录如下：
1. 只适用于一般数据的拷贝
> 1.如果json里面有时间对象，则序列化结果：时间对象=>字符串的形式；
> 2.如果json里有RegExp、Error对象，则序列化的结果将只得到空对象 RegExp、Error => {}；
> 3.如果json里有 function,undefined，则序列化的结果会把 function,undefined 丢失；
> 4.如果json里有NaN、Infinity和-Infinity，则序列化的结果会变成null；
> 5.如果json里有对象是由构造函数生成的，则序列化的结果会丢弃对象的 constructor；
> 6.如果对象中存在循环引用的情况也无法实现深拷贝
2. 性能问题： 
>能不用JSON.parse()和JSON.stringify()就不用，采用替代方案且性能更优的。PS：特别是需要多次执行的代码块，特别是这个JSON数据比较庞大时

这里的第二点我深有体会，之前我便写过这样一段代码，它将一张100kb左右的图片转码为base64，塞进了json中，并序列化为字符串进行传输，接收端再将其反序列化后提取出来。后来重构代码时，这一段代码就成了提升性能的一大突破口。

### 替代方案
[javascript - 深拷贝的终极探索（99%的人都不知道） - 颜海镜 - SegmentFault 思否](https://segmentfault.com/a/1190000016672263#item-1 )




- 参考 
  - [JSON.parse() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse )
  - [javascript - 关于JSON.parse()和JSON.stringify()的性能小测试 - 超级有温度的代码 - SegmentFault 思否](https://segmentfault.com/a/1190000018495737 )
  - [javascript - 关于 JSON.parse(JSON.stringify(obj)) 实现深拷贝的一些坑 - 超级有温度的代码 - SegmentFault 思否](https://segmentfault.com/a/1190000020297508 )