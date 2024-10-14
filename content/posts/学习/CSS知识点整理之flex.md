---
title: CSS知识点整理之flex
slug: css_points_of_flex
date: 2024-10-10T15:34:14+08:00
tags:
  - 笔记
  - 前端
  - web
  - css
categories:
  - 学习
summary: 自己学习过程中整理的关于CSS中flex的知识点
--- 

## 基本概念
- **Primary axis**: Children will be bunched up at the start of the container.
- **Cross axis**: Children will stretch out to fill the entire container.
- **justify** — to position something along the primary axis.
- **align** — to position something along the cross axis.
- **content** — a group of “stuff” that can be distributed.
- **items** — single items that can be positioned individually

---

## 属性
### `flex-direction` 
- 属性决定主轴的方向（即项目的排列方向）。

### `justify-content` 
- control the distribution of the group along **the primary axis**

### `align-self` 
- change the alignment of a specific child along **the cross axis**

### `align-items`
- a convenient shorthand that automatically sets the alignment on all the children at once

### `flex-grow`
- number,默认为0，不能为负数
- 规定了 flex-grow 项在 flex 容器中分配剩余空间的相对比例
- 剩余空间是 flex 容器的大小减去所有 flex 项的大小加起来的大小
- [flex-grow - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow )

### `flex-shrink`
- number, 默认为1，不难为负数
- The flex shrink factor is multiplied by the flex base size; this distributes negative space in proportion to how much the item can shrink. This prevents smaller items from shrinking to 0px before a larger item is noticeably reduced.
- [flex-shrink - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink )

### `flex-basis`
- 指定了 flex 元素在主轴方向上的初始大小(内容盒)

- flex-basis 优先级比 width(height)高

- 若 `flex-basis` 为 `auto`,则 `width` 设置多少就是多少。
  - 举例 `flex-basis:auto;width: 300px`，则子项就为300px(故意没说宽或者高，因为`flex-direction`可能会变,下文也一样)。若没设置 `width`， 则根据内容撑起来。

- 若 `flex-basis` 为 0 ，根据优先级，那子项就是为0px。更不用说同时设置了具体数值，如:`flex-basis:200px;width:300px`,那子项自然为200px

- [flex-basis - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis )

### flex
- 是`flex-grow`,`flex-shrink`,`flex-basis`的简写
- `flex-basis`，`flex-grow`，`flex-shrink` 三者的关系
  - `flex-basis` 是在 `flex-grow`,`flex-shrink` 之前看的
  - 意思就是 `flex-basis` 设定好了再看另外两者，若空间还有富余，就 `flex-grow`，若空间不够，就`flex-shrink`
- 取值
  1. initial
    - 元素会根据自身宽高设置尺寸。它会缩短自身以适应 flex 容器，但不会伸长并吸收 flex 容器中的额外自由空间来适应 flex 容器。相当于将属性设置为"flex: 0 1 auto"。

  2. auto
    - 元素会根据自身的宽度与高度来确定尺寸，但是会伸长并吸收 flex 容器中额外的自由空间，也会缩短自身来适应 flex 容器。这相当于将属性设置为 "flex: 1 1 auto".

  3. none
    - 元素会根据自身宽高来设置尺寸。它是完全非弹性的：既不会缩短，也不会伸长来适应 flex 容器。相当于将属性设置为"flex: 0 0 auto"。
  
  4. 1
    - `flex-grow:1 , flex-shrink-1, flex-basis-0`的缩写

### `gap` 
- allows us to create space in-between each Flex child

### `margin:auto`
- will gobble up the extra space, and apply it to the element's margin

### `flex-wrap`
wip

---

## 实现两列等高
### 需求描述
两列布局，以较矮的一列为基准，较高的一列超出部分以滚动条形式

### 参考 
- [CSS中，如何处理短内容和长内容？ - 掘金](https://juejin.cn/post/6924826615729881101?from=search-suggest )
- [CSS 网页布局](https://frontend-note.benbinbin.com/article/css/css-layout )
- [Equal height columns with CSS Grid Layout - over any number of rows](https://www.imarketinx.de/artikel/equal-height-columns-with-css-grid-layout.html )
- [纯 CSS 实现横向排序的瀑布流式布局 - The Trivial](https://jessieji.com/2019/pure-css-masonry )
- [Equal Columns With Flexbox: It’s More Complicated Than You Might Think | CSS-Tricks](https://css-tricks.com/equal-columns-with-flexbox-its-more-complicated-than-you-might-think/ )
- [flex 容器宽度被内容撑开的问题 | blog [ YOG WANG ]](https://yogwang.site/2022/CSS-flex-container-stretched-by-content/ )

---

## 实现换行
### 需求描述
文字内容过长，希望它换行，而不是溢出

### 解决过程
1. 第一版代码
    ```jsx 
    <div className="flex flex-col">
        <p className="font-semibold text-lg text-blue-500 truncate">{product.title}111111111111111111111111</p>
    </div>
    ```                    
    这代码怎么调都还是溢出，后来发现删掉外层的flex就好了,改成 
2. 第二版代码
    ```jsx 
    <p className="font-semibold text-lg text-blue-500 overflow-hidden text-ellipsis whitespace-nowrap">
        {product.title}
    </p>
    ```
3. 发现原因在于连续的字母或者数字会被当做一个单词或文本内容，故不会主动换行显示。
4. 另一种解决方案是使用[break-all](https://tailwindcss.com/docs/word-break#break-all )

### 参考
- [flex-wrap - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap )
- [Flex 踩坑指南（文字、图片溢出问题） - Minimum Content Size In CSS Flexbox - 掘金](https://juejin.cn/post/7314507576439472169 )  
- [使用flex 布局时，英文不自动换行 - 北极星333y - 博客园](https://www.cnblogs.com/xinyuyue/p/14371506.html )

---

## 参考
- [An Interactive Guide to Flexbox in CSS](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/)
- [Flex 布局教程：语法篇 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [flex 笔记（血与泪） - 知乎](https://zhuanlan.zhihu.com/p/91470473)