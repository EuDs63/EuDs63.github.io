---
title: React中的导入导出
slug: import and export in React
date: 2024-04-28T00:20:14+08:00
tags:
  - 笔记
  - 前端
  - web
  - React
categories:
  - 学习
summary: The requested module does not provide an export named 
--- 

**之前对React中的import和export处在一知半解的情况，计划通过此篇来彻底弄清楚。**

## 案例
在`src/components/Section`这个文件夹中有两个文件
```
ContextSection.jsx  
FileSection.jsx  
```

其中每个文件都类似于
```js
export default function ContextSection(){
}
```

我希望写一个`index.js`来统一export，一开始我的写法是
```js
export * from './ContextSection';
export * from './FileSection';
```

我在`'/src/components/Session/index.js'`是这样import的
```js 
import { ContextSession, FileSession } from "/src/components/Session";
```

报错是：
Uncaught SyntaxError: The requested module '/src/components/Session/index.js' does not provide an export named 'ContextSession'

我直接去谷歌报错信息,但查找到的内容都有点牛头不对马嘴。最后是靠好好地看了遍[Importing and Exporting Components – React](https://react.dev/learn/importing-and-exporting-components )才猛然意识到自己哪里错了。

| Syntax  | Export statement                      | Import statement                        |
| ------- | ------------------------------------- | --------------------------------------- |
| Default | `export default function Button() {}` | `import Button from './Button.js';`     |
| Named   | `export function Button() {}`         | `import { Button } from './Button.js';` |

最后我的解决方法是，修改`index.js`为
```js
export { default as ContextSection } from './ContextSection';
export { default as FileSection } from './FileSection';
```

## 进一步
`export { default as FileSection } from './FileSection';` 和`export FileSection  from './FileSection';`的区别在哪呢？以下是ChatGPT的回答：

这两种写法在导出默认导出时有所不同：

1. `export { default as FileSection } from './FileSection';`

   这种写法使用了命名导出（named export）的语法，并且指定了导出的名称为 `FileSection`。它将 `./FileSection` 中的默认导出（使用 `export default` 导出的内容）导出为 `FileSection`。在其他文件中引用时，需要使用相同的名称来导入，例如 `import { FileSection } from './FileSection';`。

2. `export FileSection from './FileSection';`

   这种写法是 ES2021 的新语法，称为**export from**语法，它直接导出了 `./FileSection` 中的默认导出，而无需指定名称。在其他文件中引用时，可以使用任何名称来导入，例如 `import MyFileSection from './FileSection';`。在这种情况下，导入的名称不需要与导出的名称相同。

综上所述，第一种写法强制使用指定的导出名称，而第二种写法更加灵活，允许导入时使用任意名称。

## 参考
- [Importing and Exporting Components – React](https://react.dev/learn/importing-and-exporting-components )