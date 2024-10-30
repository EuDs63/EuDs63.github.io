---
title: CSS知识点整理
slug: css_points
date: 2024-04-06T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
  - css
categories:
  - 学习
summary: 自己学习过程中整理的关于CSS的知识点
--- 

## 如何理解css
>I like to think of CSS as a collection of layout modes. Each layout mode is an algorithm that can implement or redefine each CSS property. We provide an algorithm with our CSS declarations (key/value pairs), and the algorithm decides how to use them.
>
>In other words, the CSS we write is an input for these algorithms, like arguments passed to a function. If we want to truly feel comfortable with CSS, it's not enough to learn the properties; we have to learn how the algorithms use these properties.

参考[An Interactive Guide to Flexbox in CSS](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/)

---

## 常见的css布局单位
- px: 绝对单位
- em: 相对单位
  - font-size：相对于父元素字体
  - width: 相对于当前元素字体
- rem(root em): 相对单位
  - 相对于根元素，也就是`html`

- 参考: [CSS 中有哪些單位? 該如何使用?｜ExplainThis](https://www.explainthis.io/zh-hant/swe/css-px-em-rem-differences )

---

## viewport
wip
- [viewport配置里的width=device-width和initial-scale=1.0到底是干嘛的 - KyleBlog.cn](https://www.kyleblog.cn/posts/viewport )

---

## orientation 
- portrait: The viewport is in a portrait orientation, i.e., the height is greater than or equal to the width.
- landscape: The viewport is in a landscape orientation, i.e., the width is greater than the height.

- 参考: [orientation - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/orientation )

---

## Visibility
- visible 
- hidden 
- collapse: 只对 table 对象起作用，能移除行或列但不会影响表格的布局。如果这个值用在 table 以外的对象上则表现为 hidden
- inherit

--- 

## Display 
### 分类
- none: 元素不可见，并且不为其保留相应的位置
- block: 表现为一个块级元素（一般情况下独占一行） `<div>、 <h1>、<p>`
- inline: 表现为一个行级元素（一般情况下不独占一行）`<a>、<img>、<span>`
-  inline-block: 结合了行內元素和塊級元素的特點，會像 inline 元素一樣的同行排列，但同時擁有 block 元素可以設定寬高的特性。

### visibility:hidden vs display:none vs opacity:0
- `visibility: hidden;`: 隐藏元素，但是它仍然占用布局中的空间。如果隐藏框的子元素的可见性设置为“可见”，则它们将是可见的。
- `display: none;`: 关闭显示并从文档中完全删除该元素。即使它的HTML仍在源代码中，它也不占用任何空间。即使所有子元素的显示属性均设置为none，也将关闭其显示。
- 具有`opacity: 0`的元素是可以互动的，因为它们**实际上是可见**的，只是非常透明。opacity 属性并不指定一个元素的可见性——它只指定透明度
- 参考: [CSS display:none 和 visibility:hidden 的区别](https://www.freecodecamp.org/chinese/news/css-display-none-and-visibility-hidden-the-difference/ )

---

## BFC v.s IFC
### BFC
- 块级格式上下文 (Block Formatting Context)
- 概念
  1. 一个独立的渲染区域，只有Block-level box参与
  2. 规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。
- 规则
  1. 内部的Box会在垂直方向，一个接一个地放置
  2. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 产生
  1. overflow的值不为visible。(这个是最推荐开启bfc的,副作用最小)
  2. position的值不为relative和static。
  3. display的值为table-cell, table-caption, inline-block中的任何一个。
- 使用场景
  1. 自适应两栏布局
  2. 清除内部浮动
  3. 防止margin重叠
  4. 实现更健壮、更智能的自适应布局。

### IFC
- 内联格式化上下文（inline formatting context）

### 参考
- [区块格式化上下文 - CSS：层叠样式表 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context )
- [什么是BFC？BFC的规则是什么？如何创建BFC？ · Issue #15 · YvetteLau/Step-By-Step](https://github.com/YvetteLau/Step-By-Step/issues/15 )

---

## 盒模型
### 四部分组成
1. 元素内容（content）：
2. 内边距（padding）
3. 边框（border）
4. 外边距（margin）

### 分类
1. W3C 标准盒子模型: width/height 只是内容高度
2. IE 怪异盒子模型: width/height 包含了 padding和 border

### box-sizing
- 语法: `box-sizing: content-box|border-box|inherit:`

---

## CSS中可以和不可以继承的属性
- 具体参见[CSS中可以和不可以继承的属性 - KerwinLee - 博客园](https://www.cnblogs.com/thislbq/p/5882105.html )
- 基本原则:
  - 文本属性和字体属性通常是可以继承的: font-size, font-weight, line-height, color, cursor,letter-spacing等
  - 涉及到盒模型属性，布局属性(例如，display, position)，背景属性普遍是不能继承: display, margin，border，padding，height等
  - 需要特别注意的是元素可见性属性(visibility)是可以继承的
- 验证: 开发者工具，选择具体元素并查看元素选项，若为灰色则不可继承
- 参考
  - [如何确定一个 CSS 属性是否可以被继承基本原则 文本属性和字体方属性通常是可以继承的，盒模型属性，布局属性，背景属性普 - 掘金](https://juejin.cn/post/7065209860400349191 )

---

## 优先级
### 选择器
- id选择器: `#id{}`
- 类选择器: `.class{}`
- 属性选择器: `a[href="ds63.eu.org"]{}`
- 伪类选择器: `::before{}`
- 标签选择器: `span{}`
- 通配选择器: `*{}`

### 规则
1. 最近的祖先样式比其他祖先样式优先级高
2. "直接样式"比"祖先样式"优先级高
3. 优先级顺序: 内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器
4. 计算选择符中 ID 选择器的个数（a），计算选择符中类选择器、属性选择器以及伪类选择器的个数之和（b），计算选择符中标签选择器和伪元素选择器的个数之和（c）。按 a、b、c 的顺序依次比较大小，大的则优先级高，相等则比较下一个。若最后两个的选择符中 a、b、c 都相等，则按照"就近原则"来判断。
5. 属性后插有`!important`的属性拥有最高优先级。若同时插有 !important，则再利用规则 3、4 判断优先级

### 参考
- [CSS 样式优先级 | 菜鸟教程](https://www.runoob.com/w3cnote/css-style-priority.html )
- [请说明 CSS 选择器的优先级｜ExplainThis](https://www.explainthis.io/zh-hans/swe/css-specificity )

---

## position
### `static`
默认值。没有定位，元素出现在正常的流中（忽略top,bottom,left,right,z-index声明）。

### `absolute`
- 生成绝对定位的元素，相对于**值不为static的第一个父元素的paddingbox**进行定位
- 在父元素没有设置相对定位或绝对定位的情况下，元素相对于根元素定位（即html元素）
- 元素会脱离文档流

### `fixed`
- 生成绝对定位的元素，相对于浏览器窗口进行定位。

### `relative`
- 生成相对定位的元素，相对于**其元素本身所在正常位置**进行定位。

### `inherit`
- 规定从父元素继承position属性的值。

### 参考
- [CSS position 相对定位和绝对定位 | 菜鸟教程](https://www.runoob.com/w3cnote/css-position-static-relative-absolute-fixed.html )

---

## 伪类与伪元素
### 伪类
- `:hover`
- `:focus`
- `:first-child`
- `:nth-child(n)`
- LVHA 
  1. `:link`
  2. `:visited`
  3. `:hover`
  4. `:active`

### 伪元素
- 用户无法直接选中或复制 CSS 伪元素: 因为伪元素生成的内容并不是真正的 DOM 元素，而是由浏览器在渲染时动态插入的,这也是伪元素为什么叫“伪”元素。
- `::before`,`::after`
  - Accessibility: Using a ::before pseudo-element to add content is **discouraged**, as it is not reliably accessible to screen readers.
  - `content`
    - 属性:
      - `url`
      - `counter`
      - `attr(X)`: 将元素的 X 属性以字符串形式返回。如果该元素没有 X 属性，则返回一个空字符串
    - 示例
      - `content: url(http://www.mozilla.org/favicon.ico) " MOZILLA: ";`
      - `content: " (" attr(id) ")";` 这里的id即该元素的id
- `::first-letter`
- `::first-line`
- `::selection`: 	选择用户选择的元素部分。

### 参考
- [CSS 伪类](https://www.w3school.com.cn/css/css_pseudo_classes.asp )
- [:link - CSS：层叠样式表 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:link )
- [CSS 伪元素](https://www.w3school.com.cn/css/css_pseudo_elements.asp )
- [::before - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/::before )
- [content - CSS：层叠样式表 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content )

---

## letter-spacing
- 用于设置文本字符的间距表现
- 可继承
- [letter-spacing - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing )

## GRID 
wip

---

## Transforms
- We can use translate to shift an item along in either axis: 
  - x moves side to side, y moves up and down. 
  - Positive values move down and to the right. Negative values move up and to the left.
- the item's in-flow position doesn't change
- `calc`: 示例： `transform: translateX(calc(15% + -8px));`
- 参考: [CSS Transforms tutorial](https://www.joshwcomeau.com/css/transforms/) 

---

## animation
- 示例:
  ```css 
  .cylon_eye {
    animation: 4s linear 0s infinite alternate move_eye;
  }

  @keyframes move_eye {
    from {
      margin-left: -20%;
    }
    to {
      margin-left: 100%;
    }
    }
  ```
- 参考: [animation - CSS：层叠样式表 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation )


---

## 媒体查询
- 语法: `@media (min-width: 30em) and (orientation: landscape) { ... }`
- [使用媒体查询 - CSS：层叠样式表 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_media_queries/Using_media_queries )

---

## 预处理器
- LESS 
- SCSS 
- PostCSS

### less/sass解决了什么问题
wip

### css in js 与 less sass预处理器的好处
wip
- [CSS-in-JS 技术解惑](http://blog.fantasy.codes/css/2021/09/10/css-in-js-debet/ )

---

## 现代化 CSS 开发流程
- 借助@mixin、@extend等预处理器提供的方法，可以复用 css 代码片段，甚至在 css 中写一些逻辑。
- 借助autoprefixer、px2rem等 postcss 工具，不需要写繁琐的前缀和单位转换。
- 借助css module、css scoped等工具，不用考虑样式冲突，以至于不用过多地考虑命名了。
- 借助BEM命名规范，解决命名难
- 参考 
  - [关于TailwindCSS的一些思考 | ShyMean](https://www.shymean.com/article/%E5%85%B3%E4%BA%8ETailwindCSS%E7%9A%84%E4%B8%80%E4%BA%9B%E6%80%9D%E8%80%83 )
  - [CSS — BEM 命名规范Bem 是块（block）、元素（element）、修饰符（modifier）的简写，由 Y - 掘金](https://juejin.cn/post/6844903672162304013 )

---

## TailwindCSS
- 工作原理：扫描所有文件的类名，生成相应的样式，然后将它们写入静态 CSS 文件。
- JIT 引擎（Just-In-Time）:在编译过程才去扫描html 文件，在这个过程中去识别使用了哪些类名，然后才生成对应的样式
- 缺点:
  1. 每个标签的 class 都很长，语义化的可读性；
  2. 如果全都使用原子类来构建页面，则维护起来是很麻烦的 
  3. 选择器嵌套、后代选择器等 css 的特点看起来也是不太好用上了
- 优点:
  1. 通过自定义原子类，能约定好设计规范,规范好标题字号、颜色，这个盒子内边距、外边距之类的属性
  2. 通过[@apply](https://tailwindcss.com/docs/reusing-styles#extracting-classes-with-apply )可以将一堆原子类合并到一个独立的类名中,就能结合原子类的样式复用和语义化类名容易维护的优点,由此一定程度上解决缺点1
  3. 针对维护麻烦的问题，可以将常用组件进行封装, 由此一定程度上解决缺点2
- 缺点:
  1. 每个标签的 class 都很长，语义化的可读性；
  2. 如果全都使用原子类来构建页面，则维护起来是很麻烦的 
  3. 选择器嵌套、后代选择器等 css 的特点看起来也是不太好用上了
- 参考
  - [深入浅出 tailwindcss](https://michaeljier.cn/blog/diving-into-tailwindcss)
  - [关于TailwindCSS的一些思考 | ShyMean](https://www.shymean.com/article/%E5%85%B3%E4%BA%8ETailwindCSS%E7%9A%84%E4%B8%80%E4%BA%9B%E6%80%9D%E8%80%83 )

---

## scroll-timeline 
[scroll-timeline - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-timeline )

---

## 问答题
### 显示小于12px文字
1. 使用transform: scale()
```css 
.small-text {
    font-size: 10px;
    transform: scale(1);
    transform-origin: left top;
}
```
2. 使用-webkit-text-size-adjust
```css 
.small-text {
    -webkit-text-size-adjust: none;
    font-size: 10px;
}

```
3. 使用vw单位
```css 
.small-text {
    font-size: 0.625vw;
}
```
- 参考: [前端面试题，显示小于12px文字Chrome显示小于12px文字 难度: 困难 公司: 百度 标签: CSS 字体大小 - 掘金](https://juejin.cn/post/7419532688972464137 )

### css画三角形
- 等腰三角形
```css 
<style>
  .filled-triangle {
    width: 0px;
    height: 0px;
    border-bottom: 50px solid cyan;
    border-top: 50px solid transparent;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
  }
</style>

```
- 参考: [第207题：CSS 如何实现一个三角形？ · Issue #518 · Advanced-Frontend/Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/518 )

### 如何实现水平垂直居中 
1. **Flexbox**
适用于块级容器中的元素垂直居中。
```css
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh; /* 确保容器有高度 */
}
```

2. **Grid Layout**
```css
.container {
  display: grid;
  place-items: center; /* 同时垂直和水平居中 */
  height: 100vh;
}
```

3. **使用`line-height`（适用于单行文本）**
如果只是文本，使用`line-height`与`height`相等可以达到垂直居中效果。
```css
.container {
  height: 200px;
  line-height: 200px; /* 与容器高度相同 */
  text-align: center; /* 水平居中 */
}
```

4. **绝对定位 + 负边距**
适用于已知元素宽高的情况下：
```css
.container {
  position: relative;
  height: 100vh;
}
.element {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 通过transform偏移居中 */
}
```

5. **`table`布局**
适用于需要兼容旧版浏览器的场景：
```css
.container {
  display: table;
  height: 100vh;
  width: 100%;
}
.element {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
```

6. **CSS Variables（动态适应不同的场景）**
可以结合Flexbox和Grid等方式，动态控制居中的方法。
```css
:root {
  --container-height: 100vh;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--container-height);
}
```

- 参考: [第204题：如何实现元素的水平垂直居中？ · Issue #515 · Advanced-Frontend/Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/515 )


### 脱离文档流
- 含义:
  - 元素脱离文档流之后，将不再在文档流中占据空间，而是处于浮动状态（可以理解为漂浮在文档流的上方）。脱离文档流的元素的定位基于正常的文档流，当一个元素脱离文档流后，依然在文档流中的其他元素将忽略该元素并填补其原先的空间。
- 方法
  1. float 
  2. absolute
  3. fixed
- 参考: [【css】脱离文档流的三种方法 - 十八力丁 - 博客园](https://www.cnblogs.com/Tony-Ding/articles/11928919.html )

### 如何实现响应式
1. 减少使用绝对单位，而是使用相对单位
2. 媒体查询
3. [响应式图片 - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images )
4. [响应式设计 - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Responsive_Design )

### 如何实现固定宽高比
- 参考: [面试官：CSS如何实现固定宽高比 ？ - 掘金](https://juejin.cn/post/6844904070679887886 )

### 实现三栏布局
wip

### 写个css，当文本没有超过容器宽度时居中显示，超过宽度则换行，并左对齐（display:tabel-cell或者width:fit-content，但是忘了）
wip

### 用css实现一个模态窗口，要从窗口下面向上弹的动画
wip

### 如何保证让contextmenu出现在可视区域，如何打开自己的contextmenu
wip

---

## 参考
- [104道 CSS 面试题，助你查漏补缺 - 前端笔记本 - SegmentFault 思否](https://segmentfault.com/a/1190000022021557#item-11)
- [CSS 面试题（山月） - 【布客】八股文知识库](https://bgww.apachecn.org/CSS-%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%88%E5%B1%B1%E6%9C%88%EF%BC%89/)
- [An Interactive Guide to Flexbox in CSS](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/)
- [Flex 布局教程：语法篇 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [flex 笔记（血与泪） - 知乎](https://zhuanlan.zhihu.com/p/91470473)
