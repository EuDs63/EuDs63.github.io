---
title: 表单学习
tags:
  - web
  - 前端
  - 记录
  - 笔记
categories:
  - 学习
date: 2023-03-30 23:52:16
excerpt: 发现原来表单要做得符合直觉也是有些学问在里面的，遂记录如下。
---
# 表单学习
{% note info %}
偶然间看到了篇不错的文档，[Create Amazing Password Forms](https://www.chromium.org/developers/design-documents/create-amazing-password-forms/),才发现原来表单要做得符合直觉也是有些学问在里面的，遂记录如下。
{% endnote %}

- Group related fields in a single form。
  我之前习惯把注册和登录分开来做，使用的不少网站也是这样。所以就导致了一种情况，在使用浏览器的密码自动保存时，往往注册完后要登录，就得再输一遍代码。但是我还不知道具体要怎么实现。
- Use autocomplete attributes
  autocomplete这个attribute我还是第一次见，查阅文档后，发现这个还蛮有用的。[Password Form Styles that Chromium Understands](https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands/)
  e.g. `<input name=bc autocomplete="section-home homeAddress">`
  ```html
   <input type="text" autocomplete="username"> 
   <input type="password" autocomplete="current-password"> 
   <input type="submit" value="Sign In!"> 
  ```
- autocomplete和autofill的区别
  这个目前还不是很能分得清，查了下有这样的回答
  - autocomplete是HTML5新增的属性，用于指定浏览器是否应该启用表单自动完成功能，以及提供有关字段中预期信息类型的指导。
  - autofill是浏览器自带的自动填充功能，它会根据用户之前输入过的值来预测用户下一次可能输入的值，并在用户输入时自动填充。autofill不仅考虑了之前输入过的值，还考虑了字段的含义和结构。例如，Google Chrome实现了解析输入字段以猜测其类型和结构。
- Use hidden fields for implicit information
  这点我觉得对于我来说挺新鲜的。才知道尽管有些信息没必要让用户输入，但还是有必要需要在表单中所包含，以便于密码管理器。
  
  文档中是这样讲的
  > the user agent is allowed to provide the user with autocompletion values, but does not provide any further information about what kind of data the user might be expected to enter. User agents would have to use heuristics to decide what autocompletion values to suggest.
  所以目前我的理解是，autocomplete用来提升浏览器字段的类型，而autofill用来控制是否使用该功能
  
  *还是第一次看html的文档，不是太能看得下去，因为内容太多了，信息量比较大*



- 参考链接
  - [Create Amazing Password Forms](https://www.chromium.org/developers/design-documents/create-amazing-password-forms/)
  - [Password Form Styles that Chromium Understands](https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands/)
  - [autocomplete](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute)