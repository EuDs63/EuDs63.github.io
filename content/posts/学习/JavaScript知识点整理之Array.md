---
title: JavaScript知识点整理之Array
slug: javascript_points_of_array
date: 2024-02-25T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
  - JavaScript
categories:
  - 学习
summary: 自己学习过程中整理的关于JavaScript中Array的知识点
--- 

## 初始化
### new 
```javascript
// 新建一个n行n列的二维数组
 const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
```

### Array.from 
- 示例:
```javascript
const data = Array.from({ length: 100 * 1024 }, () => Math.floor(Math.random() * 256))
```

- 格式
```javascript
Array.from(arrayLike)
Array.from(arrayLike, mapFn)
Array.from(arrayLike, mapFn, thisArg)
```

### 参考 
- [将 Base64 编码的数据快速转换为 Uint8Array](https://i.hsfzxjy.site/fast-conversion-from-base64-binary-to-uint8-array/ )
- [Array.from() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from )

---

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
  - 对于数组: `for in`遍历的是index，`for of`遍历的是"value"
    - 示例
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
       ```
  - for..in的缺陷
    1. 会迭代继承的属性,可以使用`obj.hasOwnProperty(key)`进一步判断
       ```JavaScript
       Array.prototype.customMethod = function() {};
       const arr = [10, 20, 30];
       for (let index in arr) {
         console.log(index);  // 输出 0, 1, 2 , customMethod
       }
       ```
    2. 遍历的是字符串类型的索引
      ```JavaScript
      const arr = [10, 20, 30];
      for (let index in arr) {
        console.log(typeof index);  // 输出 "string"
      }
      ```
    3. 不适合遍历稀疏数组
      ```JavaScript
      const arr = [10, , 30];  // 稀疏数组
      for (let index in arr) {
        console.log(index);  // 输出 0, 2 （不会跳过稀疏部分）
      }
      ```

### 参考
- [js遍历数组的10种方法 - 掘金](https://juejin.cn/post/6854573211699380237)
- [javascript - for…in和for…of的用法与区别 - 前端开发随笔 - SegmentFault 思否](https://segmentfault.com/a/1190000022348279)
- [Array.prototype.reduce() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

---

## 实现forEach, map, filter
- forEach 
- wip: [Array.prototype.forEach() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#callbackfn )
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

---

## 数组去重
### reduce()
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

### 参考
- [JavaScript 数组去重的方法（12 种方法，史上最全） - 前端开发随笔 - SegmentFault 思否](https://segmentfault.com/a/1190000016418021)

---

## 扁平数组
### 实现es6中的flatten()
wip

---

## shift与pop
- shift：从数组中删除**第一个**元素，并返回该元素的值。此方法更改数组的长度
- pop: 从数组中删除**最后一个**元素，并返回该元素的值。此方法更改数组的长度

## 参考
- [Array.from() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from )
- [JavaScript 数组去重的方法（12 种方法，史上最全） - 前端开发随笔 - SegmentFault 思否](https://segmentfault.com/a/1190000016418021)